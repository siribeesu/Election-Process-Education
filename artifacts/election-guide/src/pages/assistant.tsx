import { useState, useRef, useEffect } from "react";
import { 
  useListGeminiConversations, 
  useCreateGeminiConversation, 
  useGetGeminiConversation,
  useDeleteGeminiConversation,
  getListGeminiConversationsQueryKey,
  getGetGeminiConversationQueryKey
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Send, Bot, User, Trash2, Plus, MessageSquare, Loader2 } from "lucide-react";
import { useGeminiChat } from "@/hooks/useGeminiChat";

/**
 * @component Assistant
 * @description A high-fidelity AI-powered conversational interface for Indian civic education.
 * Integrates with Google Gemini via an SSE-based streaming backend to provide real-time,
 * nonpartisan election information.
 */
export default function Assistant() {
  const queryClient = useQueryClient();
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { 
    localMessages, 
    setLocalMessages, 
    isStreaming, 
    sendMessage 
  } = useGeminiChat(activeConvId);

  const { data: conversations, isLoading: loadingConvs } = useListGeminiConversations();
  
  const createConv = useCreateGeminiConversation();
  const deleteConv = useDeleteGeminiConversation();

  const { data: conversationData, isLoading: loadingMessages } = useGetGeminiConversation(
    activeConvId || "",
    { 
      query: { 
        enabled: !!activeConvId,
        queryKey: getGetGeminiConversationQueryKey(activeConvId || "")
      } 
    }
  );

  // Sync local messages with server when loaded
  useEffect(() => {
    if (conversationData && !isStreaming) {
      setLocalMessages(conversationData.messages as any);
    }
  }, [conversationData, isStreaming, setLocalMessages]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [localMessages]);

  /**
   * Initializes a new conversation context.
   * Invalidates conversation list to ensure UI consistency.
   */
  const handleNewConversation = async () => {
    const res = await createConv.mutateAsync({ data: { title: "New Conversation" } });
    queryClient.invalidateQueries({ queryKey: getListGeminiConversationsQueryKey() });
    setActiveConvId(res.id);
  };

  const handleDeleteConversation = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await deleteConv.mutateAsync({ id });
    queryClient.invalidateQueries({ queryKey: getListGeminiConversationsQueryKey() });
    if (activeConvId === id) setActiveConvId(null);
  };

  /**
   * Delegates message handling to the specialized useGeminiChat hook.
   */
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;
    const content = input.trim();
    setInput("");
    await sendMessage(content);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl h-[calc(100vh-4rem)] flex gap-6">
      {/* Sidebar */}
      <Card 
        role="navigation"
        aria-label="Conversation history"
        className="w-80 flex flex-col h-[calc(100vh-8rem)] rounded-xl border-slate-200 shadow-sm hidden md:flex"
      >
        <div className="p-4 border-b border-slate-100 flex gap-2">
          <Button 
            onClick={handleNewConversation} 
            className="w-full justify-start" 
            variant="default"
            aria-label="Start a new chat session"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Chat
          </Button>
        </div>
        <ScrollArea className="flex-1 p-2">
          <div className="space-y-1">
            {loadingConvs ? (
              <div className="p-4 text-center text-sm text-muted-foreground flex items-center justify-center">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Loading...
              </div>
            ) : conversations?.map(conv => (
              <button
                key={conv.id}
                onClick={() => setActiveConvId(conv.id)}
                aria-current={activeConvId === conv.id ? "true" : undefined}
                className={`w-full text-left px-3 py-3 rounded-lg text-sm flex items-center group transition-colors ${
                  activeConvId === conv.id ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <MessageSquare className={`h-4 w-4 mr-3 shrink-0 ${activeConvId === conv.id ? 'text-primary' : 'text-slate-400'}`} />
                <span className="truncate flex-1">{conv.title || "New Conversation"}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
                  onClick={(e) => handleDeleteConversation(conv.id, e)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </button>
            ))}
          </div>
        </ScrollArea>
      </Card>

      {/* Main Chat Area */}
      <Card className="flex-1 flex flex-col h-[calc(100vh-8rem)] rounded-xl border-slate-200 shadow-sm overflow-hidden bg-white">
        {!activeConvId ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50/50">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <Bot className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Indian Civic AI Assistant</h2>
            <p className="text-slate-500 max-w-md mb-8">
              Ask me anything about voter registration, polling stations, EPIC cards, or the upcoming Lok Sabha and State elections.
            </p>
            <Button onClick={handleNewConversation} size="lg">
              Start a Conversation
            </Button>
          </div>
        ) : (
          <>
            <div 
              ref={scrollRef}
              role="log"
              aria-live="polite"
              aria-label="Chat messages"
              className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6"
            >
              {loadingMessages ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : localMessages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-slate-400 italic">
                  Start by asking a question about Indian elections...
                </div>
              ) : (
                localMessages.map((msg, idx) => (
                    <article 
                      key={msg.id || idx} 
                      aria-label={`${msg.role} message`}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                          msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                        </div>
                        <div className={`px-4 py-3 rounded-2xl ${
                          msg.role === 'user' 
                            ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                            : 'bg-slate-50 border border-slate-100 text-slate-800 rounded-tl-sm'
                        }`}>
                          <div className="whitespace-pre-wrap leading-relaxed text-[15px]">
                            {msg.content}
                            {isStreaming && msg.role === 'assistant' && idx === localMessages.length - 1 && (
                              <span 
                                className="inline-block w-1.5 h-4 ml-1 align-middle bg-primary animate-pulse" 
                                aria-label="Thinking..."
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                ))
              )}
            </div>
            
            <div className="p-4 bg-white border-t border-slate-100">
              <form 
                onSubmit={handleSendMessage} 
                className="relative flex items-center max-w-4xl mx-auto"
                aria-label="Send message to AI assistant"
              >
                <Input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Voter ID, polling stations, election dates..."
                  className="pr-12 h-12 bg-slate-50 border-slate-200 focus-visible:ring-primary/20 rounded-full"
                  disabled={isStreaming}
                  aria-label="Type your civic question"
                  aria-busy={isStreaming}
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  disabled={!input.trim() || isStreaming}
                  className="absolute right-1.5 h-9 w-9 rounded-full"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4 ml-0.5" />
                </Button>
              </form>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
