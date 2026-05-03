import { Router, type IRouter } from "express";
import { getDb, FieldValue } from "../../lib/firebase";
import { ai } from "@workspace/integrations-gemini-ai";
import { SendGeminiMessageBody, CreateGeminiConversationBody } from "@workspace/api-zod";
import { validateRequest } from "../../middlewares/validate-request";
import { z } from "zod";

const router: IRouter = Router();

const ELECTION_SYSTEM_PROMPT = `You are a knowledgeable and nonpartisan Civic Guide AI assistant for an Indian Election Education website. Your purpose is to help Indian citizens understand the democratic process and exercise their right to vote in the world's largest democracy.

You provide:
- Clear, accurate information about voter registration (Voter ID/EPIC card), polling stations, and EVM/VVPAT procedures.
- Nonpartisan explanations of how Indian elections work (Lok Sabha, Rajya Sabha, State Legislative Assemblies/Vidhan Sabha, etc.)
- Definitions of Indian civic terms (Constituency, Model Code of Conduct, NOTA, etc.)
- State-specific voting information when asked (Delhi, Maharashtra, Karnataka, etc.)
- Information about how to research candidates via official ECI sources or apps like KYC (Know Your Candidate).
- Guidance on voting rights and how to address issues via the C-VIGIL app or ECI helplines.

You always:
- Cite official sources like the Election Commission of India (eci.gov.in) and National Voters' Service Portal (nvsp.in).
- Remain strictly nonpartisan — never endorse or disparage any political party (BJP, INC, AAP, etc.) or candidate.
- Encourage civic participation and voter registration among all eligible Indian citizens.
- Clarify voting myths with facts (e.g., about EVM security).
- Respect the diverse cultural and political landscape of India.

You never:
- Endorse or criticize any political party, candidate, or ideology.
- Share personal political opinions.
- Make predictions about election results or exit polls before official announcements.
- Spread misinformation or unverified rumors.

If asked about something outside Indian civic education and voting, politely redirect to election-related topics.`;

interface ConversationDoc {
  id: string;
  title: string;
  createdAt: any;
}

interface MessageDoc {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: any;
}

/**
 * @route GET /api/gemini/conversations
 * @description Retrieves a list of all active AI conversations.
 */
router.get("/gemini/conversations", async (req, res) => {
  try {
    const db = await getDb();
    const snapshot = await db.collection("conversations").get();
    const all = (snapshot.docs as any[]).map((doc) => ({ id: doc.id, ...doc.data() } as ConversationDoc));
    res.json(all);
  } catch (err: unknown) {
    const error = err as Error;
    req.log.error({ err }, "Failed to list conversations");
    res.status(500).json({ 
      error: "Failed to list conversations",
      message: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined
    });
  }
});

// POST /api/gemini/conversations
router.post(
  "/gemini/conversations", 
  validateRequest(z.object({ body: CreateGeminiConversationBody })),
  async (req, res) => {
    try {
      const db = await getDb();
      const body = req.body;
    const docRef = await db.collection("conversations").add({
      title: body.title,
      createdAt: FieldValue.serverTimestamp(),
    });
    // docRef is a MemDocRef — call .get() directly on it
    const doc = await docRef.get();
    res.status(201).json({ id: docRef.id, ...doc.data() });
  } catch (err) {
    req.log.error({ err }, "Failed to create conversation");
    res.status(500).json({ error: "Failed to create conversation" });
  }
});

/**
 * @route GET /api/gemini/conversations/:id
 * @description Retrieves a specific conversation including its message history.
 */
router.get("/gemini/conversations/:id", async (req, res) => {
  try {
    const db = await getDb();
    const doc = await db.collection("conversations").doc(req.params.id).get();
    if (!doc.exists) {
      res.status(404).json({ error: "Conversation not found" });
      return;
    }
    const msgsSnapshot = await db.collection("conversations").doc(req.params.id).collection("messages").get();
    const msgs = (msgsSnapshot.docs as any[]).map((m) => ({ id: m.id, ...m.data() } as MessageDoc));
    res.json({ id: doc.id, ...doc.data(), messages: msgs });
  } catch (err: unknown) {
    req.log.error({ err }, "Failed to get conversation");
    res.status(500).json({ error: "Failed to get conversation" });
  }
});

// DELETE /api/gemini/conversations/:id
router.delete("/gemini/conversations/:id", async (req, res) => {
  try {
    const db = await getDb();
    const docRef = db.collection("conversations").doc(req.params.id);
    const doc = await docRef.get();
    if (!doc.exists) {
      res.status(404).json({ error: "Conversation not found" });
      return;
    }
    await docRef.delete();
    res.status(204).end();
  } catch (err) {
    req.log.error({ err }, "Failed to delete conversation");
    res.status(500).json({ error: "Failed to delete conversation" });
  }
});

// GET /api/gemini/conversations/:id/messages
router.get("/gemini/conversations/:id/messages", async (req, res) => {
  try {
    const db = await getDb();
    const msgsSnapshot = await db.collection("conversations").doc(req.params.id).collection("messages").get();
    const msgs = (msgsSnapshot.docs as any[]).map((m) => ({ id: m.id, ...m.data() } as MessageDoc));
    res.json(msgs);
  } catch (err) {
    req.log.error({ err }, "Failed to list messages");
    res.status(500).json({ error: "Failed to list messages" });
  }
});

// POST /api/gemini/conversations/:id/messages (SSE streaming)
router.post(
  "/gemini/conversations/:id/messages",
  validateRequest(z.object({ body: SendGeminiMessageBody })),
  async (req, res) => {
    try {
      const db = await getDb();
      const body = req.body;
    const docRef = db.collection("conversations").doc(req.params.id);
    const doc = await docRef.get();

    if (!doc.exists) {
      res.status(404).json({ error: "Conversation not found" });
      return;
    }

    // Save user message
    await docRef.collection("messages").add({
      role: "user",
      content: body.content,
      createdAt: FieldValue.serverTimestamp(),
    });

    // Get conversation history
    const historySnapshot = await docRef.collection("messages").get();
    const history = (historySnapshot.docs as any[]).map((m) => m.data() as MessageDoc);

    // Set SSE headers
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    if (!ai) {
      req.log.error("Gemini AI instance is null. Check GEMINI_API_KEY.");
      res.status(503).json({ error: "AI Service Unavailable" });
      return;
    }

    const chatMessages = [
      { role: "user" as const, parts: [{ text: ELECTION_SYSTEM_PROMPT }] },
      { role: "model" as const, parts: [{ text: "Understood. I'm your nonpartisan Civic Guide AI. I'm here to help you understand elections, voting procedures, and civic participation in India. What would you like to know?" }] },
      ...history.map((m) => ({
        role: (m.role === "assistant" ? "model" : "user") as "user" | "model",
        parts: [{ text: m.content }],
      })),
    ];

    const stream = await ai.models.generateContentStream({
      model: "gemini-2.0-flash",
      contents: chatMessages,
      config: { maxOutputTokens: 8192 },
    });

    let fullResponse = "";
    for await (const chunk of stream) {
      const text = chunk?.text;
      if (text) {
        fullResponse += text;
        res.write(`data: ${JSON.stringify({ content: text })}\n\n`);
      }
    }

    // Save assistant message
    await docRef.collection("messages").add({
      role: "assistant",
      content: fullResponse,
      createdAt: FieldValue.serverTimestamp(),
    });

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (err) {
    req.log.error({ err }, "Failed to send message");
    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to send message" });
    } else {
      res.write(`data: ${JSON.stringify({ error: "Stream error" })}\n\n`);
      res.end();
    }
  }
});

export default router;
