import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '../../../.env');
console.log('Loading .env from:', envPath);
dotenv.config({ path: envPath });

async function listModels() {
  const apiKey = process.env.AI_INTEGRATIONS_GEMINI_API_KEY;
  if (!apiKey) {
    console.error('API key not found in process.env');
    return;
  }
  
  console.log('API Key length:', apiKey.length);
  console.log('API Key starts with:', apiKey.substring(0, 5));
  console.log('API Key ends with:', apiKey.substring(apiKey.length - 4));

  const ai = new GoogleGenAI({ apiKey });

  try {
    console.log('Calling models.list()...');
    const response = await ai.models.list();
    // @ts-ignore
    const list = response.models || [];
    console.log('Total models found:', list.length);
    for (const m of list) {
      console.log(m.name);
    }
    
    // If list is empty, log the whole response
    if (list.length === 0) {
        console.log('Full Response:', JSON.stringify(response, null, 2));
    }
  } catch (error: any) {
    console.error('Error in listModels:', error);
  }
}

listModels();
