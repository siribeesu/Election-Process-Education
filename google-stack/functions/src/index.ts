import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { collections } from "./db";

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

const ELECTION_SYSTEM_PROMPT = `You are a knowledgeable and nonpartisan Civic Guide AI assistant for an Election Education website. Your purpose is to help citizens understand the democratic process and exercise their right to vote... (truncated for brevity, keep full in final)`;

// Helper to convert Firestore ID to numeric if needed, but we'll use strings for simplicity where possible.
// The existing API returns numeric IDs. We'll simulate this or adapt.
// For now, let's use strings as Firestore does.

// Health Check
app.get("/api/healthz", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Election Stats
app.get("/api/election/stats", (_req, res) => {
  res.json({
    registeredVoters: 161400000,
    voterTurnout2020: 66.8,
    voterTurnout2022: 46.7,
    statesWithSameDayRegistration: 21,
    statesWithVoteByMail: 8,
    mythsBusted: 8,
  });
});

// Election Myths
app.get("/api/election/myths", (_req, res) => {
  res.json([
    { id: 1, myth: "Non-citizens can vote in federal elections.", fact: "Only U.S. citizens can vote in federal elections. States and municipalities may have different rules for local elections.", source: "USA.gov" },
    // ... add all 8 myths from the original
  ]);
});

// Voter Journey
app.get("/api/election/voter-journey", (req, res) => {
  const state = (req.query.state as string) || "US";
  // ... (replicate logic from original voter-journey.ts)
  res.json({ state, steps: [] }); 
});

// Gemini Conversations
app.get("/api/gemini/conversations", async (req, res) => {
  try {
    const snapshot = await collections.conversations.orderBy("createdAt").get();
    const all = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: "Failed to list conversations" });
  }
});

app.post("/api/gemini/conversations", async (req, res) => {
  try {
    const { title } = req.body;
    const doc = await collections.conversations.add({
      title: title || "New Conversation",
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    res.status(201).json({ id: doc.id, title });
  } catch (err) {
    res.status(500).json({ error: "Failed to create conversation" });
  }
});

app.get("/api/gemini/conversations/:id", async (req, res) => {
  try {
    const doc = await collections.conversations.doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ error: "Not found" });
    
    const messagesSnapshot = await doc.ref.collection("messages").orderBy("createdAt").get();
    const messages = messagesSnapshot.docs.map(m => ({ id: m.id, ...m.data() }));
    
    res.json({ id: doc.id, ...doc.data(), messages });
  } catch (err) {
    res.status(500).json({ error: "Failed to get conversation" });
  }
});

app.post("/api/gemini/conversations/:id/messages", async (req, res) => {
  // ... (Implement SSE streaming with Gemini and Firestore)
  res.end();
});

export const api = functions.https.onRequest(app);
