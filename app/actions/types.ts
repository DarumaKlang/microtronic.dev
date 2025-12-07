// app/actions/types.ts

import { z } from "zod";

// 1. Input Schema (ใช้ใน Server และ Client)
export const AiPromptInputSchema = z.object({
    prompt: z.string().min(5),
    targetLanguage: z.enum(["Thai", "English"]).default("English"),
    provider: z.enum(["gemini"]).default("gemini"),
});

// 2. Export Type สำหรับ Validation Errors (ใช้ใน Client Component)
export type ValidationErrors = {
    status: 400;
    fieldErrors: Record<string, string[] | undefined>;
};