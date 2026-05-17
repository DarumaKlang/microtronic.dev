'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Cpu, Globe, Zap, Sparkles } from 'lucide-react';
import { GRADIENT_TEXT_CLASS, GLASS_PANEL_CLASS } from '@/constants/data';

const HeroSectionAI: React.FC = () => {
    return (
        <section className="relative py-20 overflow-hidden group">
            {/* Animated Background Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity duration-1000">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 blur-[120px] rounded-full animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 blur-[120px] rounded-full animate-pulse [animation-delay:2s]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className={`rounded-[40px] p-8 md:p-16 ${GLASS_PANEL_CLASS} border-white/10 relative overflow-hidden`}>
                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-pink-500/30 rounded-tr-[40px]"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-cyan-500/30 rounded-bl-[40px]"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-bold tracking-widest uppercase"
                            >
                                <Cpu className="w-4 h-4" />
                                AI-First Architecture
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-6xl font-black leading-tight"
                            >
                                Beyond Code, We Build <span className={GRADIENT_TEXT_CLASS}>Intelligence.</span>
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-xl"
                            >
                                ในปี 2026 เว็บไซต์ไม่ใช่แค่หน้าตา แต่คือ &quot;สมอง&quot; ของธุรกิจ เราหลอมรวม AI Agents เข้ากับโครงสร้าง Next.js 16 เพื่อสร้างระบบที่เรียนรู้และเติบโตไปกับคุณ
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-wrap gap-6"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center border border-pink-500/20 font-bold text-pink-500 shadow-lg shadow-pink-500/10">1</div>
                                    <span className="text-gray-300 font-medium tracking-tight whitespace-nowrap">LLM Integration</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 font-bold text-cyan-500 shadow-lg shadow-cyan-500/10">2</div>
                                    <span className="text-gray-300 font-medium tracking-tight whitespace-nowrap">Neural UI/UX</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 font-bold text-purple-500 shadow-lg shadow-purple-500/10">3</div>
                                    <span className="text-gray-300 font-medium tracking-tight whitespace-nowrap">GEO Optimized</span>
                                </div>
                            </motion.div>

                            <div className="mt-10">
                                <Link
                                    href="/products"
                                    className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-white text-slate-900 font-bold hover:bg-gray-100 transition duration-300 shadow-lg"
                                >
                                    สำรวจผลิตภัณฑ์ AI ของเรา
                                </Link>
                            </div>
                        </div>
                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="relative z-10 grid grid-cols-2 gap-4"
                            >
                                <div className={`p-6 rounded-3xl ${GLASS_PANEL_CLASS} border-white/5 space-y-4 hover:border-pink-500/30 transition-all`}>
                                    <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-400">
                                        <Zap className="w-6 h-6" />
                                    </div>
                                    <div className="text-2xl font-bold">1ms</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Prediction Latency</div>
                                </div>
                                <div className={`p-6 rounded-3xl ${GLASS_PANEL_CLASS} border-white/5 space-y-4 translate-y-8 hover:border-cyan-500/30 transition-all`}>
                                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                                        <Globe className="w-6 h-6" />
                                    </div>
                                    <div className="text-2xl font-bold">99.9%</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Global Accuracy</div>
                                </div>
                                <div className={`p-6 rounded-3xl ${GLASS_PANEL_CLASS} border-white/5 space-y-4 hover:border-purple-500/30 transition-all col-span-2`}>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                                            <Sparkles className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="text-xl font-bold">Self-Evolving Code</div>
                                            <div className="text-xs text-gray-500">Autonomous optimization for the next generation.</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSectionAI;
