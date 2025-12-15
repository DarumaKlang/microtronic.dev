import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google AI Studio Client
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || ''; // Use NEXT_PUBLIC for client-side demo, or server-side env for security

// Note: In a real production app, never expose API keys on the client.
// We should use Server Actions or API Routes to proxy requests.
// For this demo/setup, we will assume a Server Action approach.

const genAI = new GoogleGenerativeAI(apiKey);

export const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

// Configuration for generation
export const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
};
