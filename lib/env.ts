import { z } from 'zod';

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    // Add other environment variables here as needed
    // NEXT_PUBLIC_API_URL: z.string().url().optional(),
});

export const env = envSchema.parse(process.env);
