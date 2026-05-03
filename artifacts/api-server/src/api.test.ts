import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";

// Set required env vars BEFORE importing app
process.env.AI_INTEGRATIONS_GEMINI_BASE_URL = "http://mock-ai.com";
process.env.AI_INTEGRATIONS_GEMINI_API_KEY = "mock-key";

import app from "./app";

// Mock the Gemini integration to avoid throwing errors on import
vi.mock("@workspace/integrations-gemini-ai", () => ({
  ai: {
    models: {
      generateContentStream: vi.fn().mockResolvedValue({
        [Symbol.asyncIterator]: async function* () {
          yield { text: "Mock" };
        }
      })
    }
  }
}));

describe("API Server Integration Tests", () => {
  it("GET /api/healthz - should return 200 OK", async () => {
    const res = await request(app).get("/api/healthz");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });

  it("GET /api/election/voter-journey - should return data for a valid state", async () => {
    const res = await request(app).get("/api/election/voter-journey?state=MH");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("steps");
  });

  it("POST /api/gemini/conversations - should fail validation with missing title", async () => {
    const res = await request(app).post("/api/gemini/conversations").send({});
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Validation failed");
  });

  it("POST /api/gemini/conversations - should create a conversation with valid title", async () => {
    const res = await request(app)
      .post("/api/gemini/conversations")
      .send({ title: "Test Conversation" });
    
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.title).toBe("Test Conversation");
  });

  it("GET /api/gemini/conversations - should list conversations", async () => {
    const res = await request(app).get("/api/gemini/conversations");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
