import { GoogleGenAI } from "@google/genai";

if (!process.env.AI_INTEGRATIONS_GEMINI_BASE_URL) {
  throw new Error(
    "AI_INTEGRATIONS_GEMINI_BASE_URL must be set. Did you forget to provision the Gemini AI integration?",
  );
}

if (!process.env.AI_INTEGRATIONS_GEMINI_API_KEY) {
  throw new Error(
    "AI_INTEGRATIONS_GEMINI_API_KEY must be set. Did you forget to provision the Gemini AI integration?",
  );
}

const apiKey = process.env.AI_INTEGRATIONS_GEMINI_API_KEY;
const baseUrl = process.env.AI_INTEGRATIONS_GEMINI_BASE_URL;

// If baseUrl is provided, we try to extract the version if it's appended (e.g. .../v1beta)
// Otherwise we use defaults.
let effectiveBaseUrl = baseUrl;
let apiVersion = "v1beta"; // Default to v1beta for features like gemini-2.0-flash

if (baseUrl) {
  if (baseUrl.endsWith("/v1beta")) {
    effectiveBaseUrl = baseUrl.replace("/v1beta", "");
    apiVersion = "v1beta";
  } else if (baseUrl.endsWith("/v1")) {
    effectiveBaseUrl = baseUrl.replace("/v1", "");
    apiVersion = "v1";
  }
}

export const ai = new GoogleGenAI({
  apiKey,
});


