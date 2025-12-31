import React from 'react';
import type { Metadata } from 'next';
import GooeyBackground from '@/components/GooeyBackground';
import TemplateGroupSection from '@/components/TemplateGroupSection';
import EnterpriseGroupSection from '@/components/EnterpriseGroupSection';

// SEO Metadata
export const metadata: Metadata = {
    title: 'บริการพัฒนาเว็บไซต์ - Templates & Custom Solutions | Microtronic',
    description: 'เลือกระหว่าง Templates สำเร็จรูป 5,000 บาท หรือ Custom Enterprise Solution สำหรับองค์กรขนาดใหญ่ รับประกัน ROI และผลลัพธ์ที่วัดผลได้',
    keywords: ['Next.js Template', 'Website Template Thailand', 'Custom Web Development', 'Enterprise Solution', 'Web Development Bangkok'],
    openGraph: {
        title: 'Microtronic Services - Templates & Enterprise Solutions',
        description: 'เริ่มต้นธุรกิจออนไลน์ใน 24 ชม. หรือสร้างระบบองค์กรระดับ Enterprise',
        images: ['/og-service.png'],
        url: 'https://microtronic.biz/service',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'บริการพัฒนาเว็บไซต์ | Microtronic',
        description: 'Templates 5,000 บาท หรือ Custom Enterprise Solution',
        images: ['/og-service.png'],
    }
};

import { Terminal, Shield, Zap, Globe, Cpu, Layers } from 'lucide-react';

/**
 * Service Page - Futuristic Tech Style
 */
export default function ServicePage() {
    return (
        <div className="min-h-screen bg-slate-900 text-white pt-24 pb-16 relative overflow-hidden">
            {/* Background Effect */}
            <GooeyBackground />

            {/* Matrix-like background pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none font-mono text-[10px] leading-none overflow-hidden select-none">
                {Array.from({ length: 50 }).map((_, i) => (
                    <div key={i} className="whitespace-nowrap">
                        {Array.from({ length: 20 }).map((_, j) => (
                            <span key={j} className="mr-8">
                                01011010_SYSTEM_INITIALIZED_NEXT_JS_V15_HYDRATION_ACTIVE_REWRITING_FUTURE_
                            </span>
                        ))}
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <main className="relative z-10">
                {/* Hero Section */}
                <section className="text-center py-20 px-4 mb-12">
                    <div className="max-w-5xl mx-auto">
                        <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 font-mono text-xs font-bold uppercase tracking-[0.3em]">
                            Future-Proof Development Shell
                        </div>
                        <h1 className="text-6xl sm:text-8xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 leading-tight tracking-tighter">
                            CORE SERVICES
                        </h1>
                        <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
                            เราไม่ได้แค่ทำเว็บ แต่เรา <span className="text-white italic">"Architecting the Future"</span> ด้วยเทคโนโลยียุคใหม่ที่รีดประสิทธิภาพสูงสุดถึงขีดสุด
                        </p>

                        {/* Quick Navigation Cards */}
                        <div className="flex flex-wrap justify-center gap-6">
                            <a
                                href="#templates"
                                className="group px-8 py-4 rounded-2xl bg-slate-800/50 border border-pink-500/30 hover:border-pink-500 transition-all flex items-center gap-3 backdrop-blur-md"
                            >
                                <Zap className="w-5 h-5 text-pink-400 group-hover:scale-125 transition-transform" />
                                <div className="text-left">
                                    <div className="text-[10px] font-mono text-pink-500/70 uppercase tracking-widest">Rapid Deploy</div>
                                    <div className="font-bold">Next.js Templates</div>
                                </div>
                            </a>
                            <a
                                href="#enterprise"
                                className="group px-8 py-4 rounded-2xl bg-slate-800/50 border border-emerald-500/30 hover:border-emerald-500 transition-all flex items-center gap-3 backdrop-blur-md"
                            >
                                <Cpu className="w-5 h-5 text-emerald-400 group-hover:scale-125 transition-transform" />
                                <div className="text-left">
                                    <div className="text-[10px] font-mono text-emerald-500/70 uppercase tracking-widest">Custom Engine</div>
                                    <div className="font-bold">Enterprise Solutions</div>
                                </div>
                            </a>
                        </div>
                    </div>
                </section>

                {/* Group I: Templates Section */}
                <TemplateGroupSection />

                {/* Tech Stat Divider */}
                <div className="max-w-7xl mx-auto px-4 my-20">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-white/5 bg-white/[0.02] backdrop-blur-sm rounded-3xl">
                        {[
                            { label: 'Uptime', val: '99.9%' },
                            { label: 'Latency', val: '< 100ms' },
                            { label: 'Security', val: 'AES-256' },
                            { label: 'Engines', val: 'Next15/TS' },
                        ].map((stat, i) => (
                            <div key={i} className="text-center font-mono">
                                <div className="text-gray-500 text-[10px] uppercase mb-1 tracking-widest">{stat.label}</div>
                                <div className="text-xl font-bold text-blue-400">{stat.val}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Group II: Enterprise Section */}
                <EnterpriseGroupSection />

                {/* Decision Terminal */}
                <section className="max-w-7xl mx-auto px-4 py-24">
                    <div className="bg-black/40 border border-white/10 rounded-3xl p-1 lg:p-2 overflow-hidden shadow-2xl">
                        <div className="bg-slate-900 rounded-2xl p-8 md:p-12">
                            <h2 className="text-3xl md:text-5xl font-black mb-12 text-center flex items-center justify-center gap-4">
                                <Terminal className="w-8 h-8 md:w-12 md:h-12 text-blue-500" />
                                DECISION LOGIC
                            </h2>

                            <div className="grid md:grid-cols-2 gap-12">
                                {/* Templates Column */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <Layers className="w-6 h-6 text-pink-500" />
                                        <h3 className="text-2xl font-bold text-white uppercase tracking-tighter">IF (need_speed === true)</h3>
                                    </div>
                                    <ul className="space-y-4 font-mono text-sm text-gray-400">
                                        <li className="flex items-start gap-3">
                                            <span className="text-pink-500">{'>'}</span>
                                            <span>Deploy ใน 24ชม. (Production Ready)</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-pink-500">{'>'}</span>
                                            <span>Low Budget Entry (5,000 THB)</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-pink-500">{'>'}</span>
                                            <span>Optimal for Startups & Freelancers</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Enterprise Column */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <Shield className="w-6 h-6 text-emerald-500" />
                                        <h3 className="text-2xl font-bold text-white uppercase tracking-tighter">ELSE (complex_needs === true)</h3>
                                    </div>
                                    <ul className="space-y-4 font-mono text-sm text-gray-400">
                                        <li className="flex items-start gap-3">
                                            <span className="text-emerald-500">{'>'}</span>
                                            <span>Custom API & Database Orchestration</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-emerald-500">{'>'}</span>
                                            <span>High-Traffic Scaling (CDN/Edge)</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-emerald-500">{'>'}</span>
                                            <span>24/7 Monitoring & Dedicated Support</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

