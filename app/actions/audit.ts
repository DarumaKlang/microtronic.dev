'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export async function generateBusinessAudit(businessIdea: string) {
    if (!apiKey) {
        return {
            error: true,
            message: "API Key not configured."
        };
    }

    try {
        const model = genAI.getGenerativeModel({
            model: 'gemini-flash-latest',
            systemInstruction: `
                You are the "AI Business Architect" for Microtronic Dev (a High-Performance Web & AI Agency).
                Your goal is to provide a professional, tech-forward, and deep business audit for potential clients.
                
                When a user describes their business idea or URL:
                1. Analyze the technical feasibility.
                2. Identify 3 critical "Revenue Leakages" they might face without a high-performance system (e.g., slow load times, poor SEO, lack of AI automation).
                3. Propose a "2026 Ready" Tech Stack (Next.js, AI, etc.) that solves these leaks.
                4. End with a strong Call to Action (CTA) to contact Microtronic Dev for a "Deep Strategy Session".
                
                Tone: Professional, Visionary, Data-Driven, Corporate yet Innovative.
                Language: Thai (mainly), with technical English terms.
                Format: Use Markdown for headers and bullet points.
            `
        });

        const prompt = `Analyze this business/idea: "${businessIdea}". Create a focused Business Architecture Audit Report.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return {
            error: false,
            message: text
        };
    } catch (error: any) {
        console.error("Audit Generation Error:", error);
        return {
            error: true,
            message: "ขออภัยครับ ระบบประมวลผลการวิเคราะห์ขัดข้องชั่วคราว"
        };
    }
}
