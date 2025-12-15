import React from 'react';
import { Metadata } from 'next';
import TechStackGrid from '@/components/TechStackGrid';
import GooeyBackground from '@/components/GooeyBackground';

export const metadata: Metadata = {
    title: 'Technology Partners & Standards',
    description: 'Our certified technology stack including Next.js, Vercel, Supabase, and more.',
};

export default function SuppliersPage() {
    return (
        <div className="min-h-screen bg-slate-900 text-white pt-24 pb-16 relative">
            <GooeyBackground />

            <main className="relative z-10">
                {/* Page Header */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
                        Powering Your Future
                        <span className="block text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-cyan-500 text-3xl md:text-5xl mt-2">
                            With World-Class Standards
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        We rely on a robust ecosystem of industry-standard technologies to ensure stability, security, and scalability for every project.
                    </p>
                </div>

                {/* Tech Stack Grid */}
                <TechStackGrid />

            </main>
        </div>
    );
}
