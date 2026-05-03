import { useState, useCallback, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getGetGeminiConversationQueryKey } from "@workspace/api-client-react";

interface Message {
  id: string | number;
  role: "user" | "assistant";
  content: string;
  createdAt?: string;
}

/**
 * @hook useGeminiChat
 * @description Atomic hook to manage SSE streaming state for Gemini conversations.
 * Handles optimistic updates, buffer management, and server synchronization.
 */
export function useGeminiChat(activeConvId: string | null) {
  const queryClient = useQueryClient();
  const [localMessages, setLocalMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const streamAbortController = useRef<AbortController | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || !activeConvId || isStreaming) return;

    setIsStreaming(true);
    streamAbortController.current = new AbortController();

    // Optimistic Update
    const userMsg: Message = { 
      id: Date.now(), 
      role: "user", 
      content: content.trim(), 
      createdAt: new Date().toISOString() 
    };
    const assistantMsgId = Date.now() + 1;
    const assistantMsg: Message = { 
      id: assistantMsgId, 
      role: "assistant", 
      content: "", 
      createdAt: new Date().toISOString() 
    };

    setLocalMessages(prev => [...prev, userMsg, assistantMsg]);

    try {
      const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
      const response = await fetch(`${BASE}/api/gemini/conversations/${activeConvId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: content.trim() }),
        signal: streamAbortController.current.signal
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const json = JSON.parse(line.slice(6));
            if (json.done) break;
            if (json.content) {
              setLocalMessages(prev =>
                prev.map(m => m.id === assistantMsgId
                  ? { ...m, content: m.content + json.content }
                  : m
                )
              );
            }
          } catch (e) {
            // Partial chunk parse error - wait for next chunk
          }
        }
      }
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.log("Stream aborted");
      } else {
        console.error("Chat error:", error);
      }
    } finally {
      setIsStreaming(false);
      // Ensure local state is synced with truth from server
      queryClient.invalidateQueries({ queryKey: getGetGeminiConversationQueryKey(activeConvId) });
    }
  }, [activeConvId, isStreaming, queryClient]);

  return {
    localMessages,
    setLocalMessages,
    isStreaming,
    sendMessage,
    abort: () => streamAbortController.current?.abort()
  };
}
