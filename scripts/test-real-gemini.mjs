import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function testGemini() {
  const apiKey = process.env.AI_INTEGRATIONS_GEMINI_API_KEY;
  const baseUrl = process.env.AI_INTEGRATIONS_GEMINI_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta';

  console.log('Testing Gemini with:');
  console.log('API Key:', apiKey ? '***' + apiKey.slice(-4) : 'MISSING');
  console.log('Base URL:', baseUrl);

  if (!apiKey) {
    console.error('No API Key found in .env');
    return;
  }

  const ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      apiVersion: '',
      baseUrl: baseUrl,
    },
  });

  try {
    console.log('Sending request to Gemini...');
    const stream = await ai.models.generateContentStream({
      model: 'gemini-1.5-flash',
      contents: [{ role: 'user', parts: [{ text: 'Hello, who are you?' }] }],
    });

    console.log('Response stream started:');
    for await (const chunk of stream) {
      process.stdout.write(chunk.text || '');
    }
    console.log('\nSuccess!');
  } catch (error) {
    console.error('Gemini error:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', await error.response.json());
    }
  }
}

testGemini();
