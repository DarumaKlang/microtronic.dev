'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Volume2, ExternalLink, Code2 } from 'lucide-react';
import { GRADIENT_TEXT_CLASS, GLASS_PANEL_CLASS } from '@/constants/data';

const DevToolsSection: React.FC = () => {
    return (
        <section className="relative py-24 px-4 overflow-hidden" id="tools">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        Tools for <span className={GRADIENT_TEXT_CLASS}>Developers</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 text-lg max-w-2xl mx-auto"
                    >
                        We build more than just websites. We build the tools that empower creators to build the future.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Tool Card: AI Speak */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -10 }}
                        className={`${GLASS_PANEL_CLASS} rounded-3xl p-8 relative overflow-hidden group border-white/5 hover:border-pink-500/30 transition-all`}
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 blur-3xl -mr-16 -mt-16 group-hover:bg-pink-500/20 transition-all"></div>

                        <div className="w-16 h-16 bg-pink-500/10 rounded-2xl flex items-center justify-center mb-6 border border-pink-500/20">
                            <Volume2 className="w-8 h-8 text-pink-400" />
                        </div>

                        <h3 className="text-2xl font-bold mb-4">AI Speak (TTS)</h3>
                        <p className="text-gray-400 mb-8 max-w-sm">
                            Generate hyper-realistic voiceovers for free using Microsoft Edge&apos;s neural TTS. Supporting Thai, English, Japanese and more.
                        </p>

                        <Link
                            href="/speak"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-pink-600/20"
                        >
                            Try AI Speak
                            <ExternalLink className="w-4 h-4" />
                        </Link>
                    </motion.div>

                    {/* Placeholder for more tools */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className={`${GLASS_PANEL_CLASS} rounded-3xl p-8 border-dashed border-white/10 flex flex-col items-center justify-center text-center opacity-60`}
                    >
                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                            <Code2 className="w-8 h-8 text-gray-500" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">More Tools Coming Soon</h3>
                        <p className="text-gray-500 text-sm">
                            We&apos;re constantly expanding our repertoire of AI-powered utilities.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default DevToolsSection;
