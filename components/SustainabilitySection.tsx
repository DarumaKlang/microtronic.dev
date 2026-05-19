'use client';

import React from 'react';
import { Globe, Leaf, Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const pillars = [
    {
        title: 'AI Changing the World',
        description: 'เราสร้าง Intelligence Layer ที่ช่วยเพิ่มศักยภาพมนุษย์และขับเคลื่อนธุรกิจสู่พรมแดนใหม่',
        icon: Globe,
        color: 'text-blue-400',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/20'
    },
    {
        title: 'Green Energy & Sustainability',
        description: 'ยึดมั่นนโยบาย Green Code เพื่อลดการใช้พลังงาน Compute และสนับสนุนอนาคตที่ยั่งยืน',
        icon: Leaf,
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/20'
    },
    {
        title: 'Tech with a Thai Heart',
        description: 'การผสมผสานเทคโนโลยีล้ำสมัยเข้ากับวิถีชีวิตไทยที่เรียบง่ายและการอนุรักษ์วัฒนธรรม',
        icon: Heart,
        color: 'text-pink-400',
        bg: 'bg-pink-500/10',
        border: 'border-pink-500/20'
    }
];

export default function SustainabilitySection() {
    return (
        <section className="relative py-24 px-4 overflow-hidden">
            {/* Soft Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black mb-6 bg-clip-text text-transparent bg-linear-to-b from-white to-gray-500">
                        OUR_2026_VISION
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        ถึงแม้เราจะก้าวไปไกลด้วยเทคโนโลยีที่ล้ำหน้าที่สุด แต่เราไม่เคยลืมรากเหง้าและความรับผิดชอบต่อโลกใบนี้
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {pillars.map((pillar, index) => {
                        const Icon = pillar.icon;
                        const isGreenPillar = pillar.title.includes('Green');
                        return (
                            <div
                                key={index}
                                className={`p-8 rounded-3xl backdrop-blur-xl border ${pillar.border} ${pillar.bg} group hover:scale-105 transition-all duration-500 flex flex-col justify-between`}
                            >
                                <div>
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${pillar.bg} border ${pillar.border} transform group-hover:rotate-12 transition-transform`}>
                                        <Icon className={`w-7 h-7 ${pillar.color}`} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tighter">
                                        {pillar.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed mb-6">
                                        {pillar.description}
                                    </p>
                                </div>

                                {isGreenPillar ? (
                                    <div className="mt-4 p-4 rounded-2xl bg-black/20 border border-white/5">
                                        <div className="flex justify-between text-[10px] font-mono font-bold text-emerald-400 mb-2 uppercase">
                                            <span>Green Code Efficiency</span>
                                            <span>98%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full w-full bg-linear-to-r from-emerald-500 to-cyan-500 animate-pulse" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-1 w-12 bg-white/20 rounded-full group-hover:w-full transition-all duration-500" />
                                )}
                            </div>
                        )
                    })}
                </div>

                <div className="mt-16 p-8 rounded-3xl border border-white/5 bg-white/[0.02] flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 flex items-center justify-center bg-slate-800 font-bold text-xl">
                            🇹🇭
                        </div>
                        <div>
                            <h4 className="font-bold text-white">Social Contribution & CRM</h4>
                            <p className="text-sm text-gray-500">มุ่งมั่นช่วยเหลือสังคมและการอนุรักษ์สิ่งแวดล้อมควบคู่ไปกับงานบริการ</p>
                        </div>
                    </div>
                    <Link
                        href="/contact"
                        className="flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-full font-bold hover:bg-blue-400 transition-colors"
                    >
                        ร่วมสนับสนุนวิสัยทัศน์
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
