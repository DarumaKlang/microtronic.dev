// app/tools/doc-generator/page.tsx

import { AiDocGeneratorForm } from '@/components/tools/AiDocGeneratorForm';
import { Metadata } from 'next';

// Server Component for SEO and layout (Performance 🚀)

export const metadata: Metadata = {
    title: 'AI Documentation Generator - Microtronic Tools',
    description: 'Secure and fast AI tool to generate documentation for Next.js and TypeScript projects.',
};

/**
 * Main Page for the AI Documentation Generator Tool
 * Adheres to Architecture Standard (app/tools/[name]/page.tsx)
 */
export default function DocGeneratorPage() {
    return (
        // Mobile-First container styling
        <div className="flex justify-center items-start min-h-screen py-10 px-4 bg-gray-50">
            <div className="w-full max-w-2xl">
                <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-900">
                    AI Doc Generator
                </h1>
                <p className="text-center text-gray-600 mb-8">
                    Utilize Next.js Server Actions for a secure, high-performance experience.
                </p>

                {/* Render the Tool Component */}
                <AiDocGeneratorForm />

            </div>
        </div>
    );
}