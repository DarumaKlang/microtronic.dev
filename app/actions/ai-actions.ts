// app/actions/ai-actions.ts

"use server"; 

import { ZodError } from "zod";
import { GoogleGenerativeAI } from "@google/generative-ai";
// <<<< แก้ไข: Import Schema และ Type จากไฟล์ใหม่
import { AiPromptInputSchema, ValidationErrors } from './types'; 

// -------------------------
// 1. Streaming Helper
// -------------------------
async function* streamGemini(prompt: string): AsyncGenerator<string> {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    // แก้ไข: ใช้ Model Name ที่ถูกต้อง
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); 
    const result = await model.generateContentStream(prompt);

    for await (const chunk of result.stream) {
        const text = chunk.text();
        if (text) yield text;
    }
}

// -------------------------
// 2. Server Action (Async Function ที่ถูก Export เพียงตัวเดียว)
// -------------------------
export async function processAiPrompt(formData: FormData) {
    try {
        const parsed = AiPromptInputSchema.parse({
            prompt: formData.get("prompt"),
            targetLanguage: formData.get("targetLanguage") || "English",
            provider: formData.get("provider") || "gemini", 
        });

        const fullPrompt = `Translate to ${parsed.targetLanguage}:\n${parsed.prompt}`;

        const stream = streamGemini(fullPrompt);

        return stream;
        
    } catch (error) {
        if (error instanceof ZodError) {
            const flat = error.flatten();
            return { status: 400, fieldErrors: flat.fieldErrors } as ValidationErrors; 
        }
        
        console.error("AI Server Action Error:", error);
        return { status: 500, error: "Internal Server Error" };
    }
}