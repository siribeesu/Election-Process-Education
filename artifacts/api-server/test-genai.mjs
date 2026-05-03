import * as genai from "@google/genai";
console.log("Exports of @google/genai:", Object.keys(genai));
try {
  const client = new genai.GoogleGenAI({ apiKey: "test" });
  console.log("Constructor works");
  console.log("Client prototype keys:", Object.keys(Object.getPrototypeOf(client)));
} catch (e) {
  console.log("Error:", e.message);
}
