'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import {
    SiNextdotjs,
    SiVercel,
    SiSupabase,
    SiPostgresql,
    SiGithub,
    SiTypescript,
    SiReact,
    SiGooglecloud,
    SiGoogle
} from 'react-icons/si';
import Link from 'next/link';

// Define Neon Icon manually or use fallback if not available in current react-icons version
// Fallback for Neon: Use Postgres icon with Neon color
const NeonIcon = () => <SiPostgresql className="w-8 h-8 text-green-400" />;

const TECH_STACK = [
    {
        name: 'Next.js 16',
        description: 'The React Framework for the Web. Used for server-side rendering, routing, and API handling.',
        icon: <SiNextdotjs className="w-8 h-8 text-black dark:text-white" />,
        link: 'https://nextjs.org',
        category: 'Framework',
    },
    {
        name: 'Vercel',
        description: 'The platform for frontend developers, providing the infrastructure to deploy at scale.',
        icon: <SiVercel className="w-8 h-8 text-black dark:text-white" />,
        link: 'https://vercel.com',
        category: 'Deployment',
    },
    {
        name: 'Supabase',
        description: 'The open source Firebase alternative. Provides Database, Auth, and Storage.',
        icon: <SiSupabase className="w-8 h-8 text-emerald-500" />,
        link: 'https://supabase.com',
        category: 'Backend',
    },
    {
        name: 'PostgreSQL',
        description: 'The world\'s most advanced open source relational database.',
        icon: <SiPostgresql className="w-8 h-8 text-blue-500" />,
        link: 'https://postgresql.org',
        category: 'Database',
    },
    {
        name: 'Neon',
        description: 'Serverless Postgres built for the cloud. Separates storage and compute.',
        icon: <NeonIcon />,
        link: 'https://neon.tech',
        category: 'Database',
    },
    {
        name: 'GitHub',
        description: 'The complete developer platform to build, scale, and deliver secure software.',
        icon: <SiGithub className="w-8 h-8 text-gray-900 dark:text-white" />,
        link: 'https://github.com',
        category: 'DevOps',
    },
    {
        name: 'Google AI Studio',
        description: 'Rapidly prototype and build generative AI applications with Gemini models.',
        icon: <SiGoogle className="w-8 h-8 text-blue-500" />,
        link: 'https://aistudio.google.com',
        category: 'AI Platform',
    },
    {
        name: 'Gemini 1.5 Pro',
        description: 'Our chosen LLM for complex reasoning and multimodal tasks. Best-in-class performance.',
        // Use Google Icon but Purple for Gemini
        icon: <SiGoogle className="w-8 h-8 text-purple-500" />,
        link: 'https://deepmind.google/technologies/gemini',
        category: 'AI Model',
    },
    {
        name: 'AI Agents',
        description: 'Autonomous agents powered by Cortex & LangChain to automate complex workflows.',
        // Generic Robot Icon for Agents (using Text/Emoji or you can import FaRobot from react-icons/fa)
        icon: <div className="w-8 h-8 flex items-center justify-center font-bold text-2xl">🤖</div>,
        link: '#',
        category: 'Automation',
    },
    {
        name: 'Google Cloud',
        description: 'Scalable and secure cloud infrastructure powering our backend services.',
        icon: <SiGooglecloud className="w-8 h-8 text-blue-600" />,
        link: 'https://cloud.google.com',
        category: 'Infrastructure',
    },
    {
        name: 'TypeScript',
        description: 'JavaScript with syntax for types. Ensures type safety and code reliability.',
        icon: <SiTypescript className="w-8 h-8 text-blue-600" />,
        link: 'https://typescriptlang.org',
        category: 'Language',
    },
    {
        name: 'React 19',
        description: 'The library for web and native user interfaces. Powering the component architecture.',
        icon: <SiReact className="w-8 h-8 text-cyan-400" />,
        link: 'https://react.dev',
        category: 'Library',
    },
];

const TechStackGrid: React.FC = () => {
    return (
        <section className="py-20 bg-slate-900 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-cyan-500 mb-4"
                    >
                        Our Technology Standards
                    </motion.h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        We partner with industry leaders to ensure your application is built on a foundation of reliability, speed, and security.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {TECH_STACK.map((tech, index) => (
                        <motion.a
                            key={tech.name}
                            href={tech.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-6 border border-white/5 hover:border-pink-500/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group relative overflow-hidden"
                        >
                            {/* Hover Gradient Overlay */}
                            <div className="absolute inset-0 bg-linear-to-br from-pink-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-slate-900 rounded-xl border border-white/10 group-hover:border-white/20 transition-colors">
                                        {tech.icon}
                                    </div>
                                    <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">{tech.category}</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">
                                    {tech.name}
                                </h3>
                                <p className="text-sm text-gray-400 mb-4 flex-grow">
                                    {tech.description}
                                </p>
                                <div className="flex items-center text-xs text-cyan-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    Official Partner / Standard <ExternalLink className="w-3 h-3 ml-1" />
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStackGrid;
