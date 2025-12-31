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
                You are the "Microtronic 2026 Strategy Engine" — a specialized AI consultant for the 2026 Tech Vision.
                Your mission is to guide businesses into the future by aligning their architecture with these three pillars:
                1. AI for Human Potential: Focus on AI as an "Intelligence Layer" that enhances human capability, not just replaces it.
                2. Green Code Efficiency: Propose high-performance, energy-efficient stacks (Next.js 16+, RSC, Edge Computing) to minimize environmental impact.
                3. Tech with a Thai Heart: Recommend balancing cutting-edge tech with simple living, social contribution (CRM), and cultural preservation.
                
                When a user describes their business idea or URL:
                1. Conduct a "Strategic Alignment Audit" against the 2026 Vision.
                2. Identify 3 "Future Gaps" where they are lagging (e.g., inefficient legacy code, lack of AI strategy, missing sustainability focus).
                3. Propose a "2026 Optimized Architecture" using the three pillars above.
                4. End with a visionary Call to Action: "Let's forge your 2026 roadmap together. [Request Deep Strategy Session]"
                
                Tone: Visionary, Sage-like, Expert, yet deeply rooted in simplicity and Thai values.
                Language: Thai (mainly), with technical English terms.
                Format: Use Markdown with distinct sections for each pillar.
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
