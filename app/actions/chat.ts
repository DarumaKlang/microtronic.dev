'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini on the server side
// We use NEXT_PUBLIC_GEMINI_API_KEY if available, but ideally this should be a secret key (GEMINI_API_KEY)
// For this setup, we fall back to the one effectively available.
const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

// Chat interface
export interface ChatMessage {
    role: 'user' | 'model';
    parts: string;
}

export async function chatWithGemini(history: ChatMessage[], newMessage: string) {
    if (!apiKey) {
        return {
            error: true,
            message: "API Key not configured. Please check your environment variables."
        };
    }

    try {
        // Use gemini-flash-latest (Standard Production Model) to avoid "Limit 0" quota issues on experimental models
        const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

        // Start a chat session with history
        const chat = model.startChat({
            history: history.map(msg => ({
                role: msg.role,
                parts: [{ text: msg.parts }]
            })),
            generationConfig: {
                maxOutputTokens: 1000,
            },
        });

        // Send the new message
        const result = await chat.sendMessage(newMessage);
        const response = await result.response;
        const text = response.text();

        return {
            error: false,
            message: text
        };
    } catch (error: any) {
        console.error("Gemini API Error:", error);

        let userMessage = "ขออภัยครับ ระบบ AI ขัดข้องชั่วคราว ลองใหม่อีกครั้งนะครับ";

        // Handle Rate Limiting (429) specifically
        if (error.message?.includes('429') || error.status === 429) {
            userMessage = "ขณะนี้มีผู้ใช้งานจำนวนมาก (API Quota Exceeded) กรุณารอสักครู่แล้วลองใหม่ครับ";
        }

        return {
            error: true,
            message: userMessage
        };
    }
}
