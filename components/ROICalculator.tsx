'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target } from 'lucide-react';

const ROICalculator: React.FC = () => {
    const [revenue, setRevenue] = useState<number>(1000000); // 1M THB
    const [loadTime, setLoadTime] = useState<number>(5); // 5 seconds

    const results = useMemo(() => {
        // Industry standard: Every 1s delay reduces conversion by 7%
        const currentLossRate = (loadTime - 1.5) * 0.07;
        const potentialRevenue = revenue / (1 - Math.max(0, currentLossRate));
        const lift = potentialRevenue - revenue;

        return {
            lift: Math.round(lift),
            efficiency: Math.round(Math.max(0, currentLossRate * 100))
        };
    }, [revenue, loadTime]);

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-4">
                <div className="p-8 md:p-12 rounded-3xl bg-slate-900/50 border border-white/10 backdrop-blur-xl relative group">
                    <div className="absolute -top-6 -right-6 w-12 h-12 hidden sm:flex bg-blue-600 rounded-full items-center justify-center text-white shadow-xl shadow-blue-500/20 group-hover:scale-110 transition-transform">
                        <TrendingUp size={24} />
                    </div>

                    <header className="mb-12 text-center">
                        <h2 className="text-2xl font-black mb-4">2026 STRATEGIC ROI</h2>
                        <p className="text-gray-400 text-sm italic">คำนวณมูลค่าที่ธุรกิจของคุณ &ldquo;เสียไป&rdquo; จากประสิทธิภาพเดิม</p>
                    </header>

                    <div className="grid md:grid-cols-2 gap-12 min-w-0">
                        <div className="space-y-8">
                            {/* Revenue Input */}
                            <div>
                                <label className="block text-xs font-mono font-bold text-blue-400 mb-3 uppercase tracking-tighter">รายได้รายปีปัจจุบัน (THB)</label>
                                <input
                                    type="range"
                                    min="100000"
                                    max="50000000"
                                    step="100000"
                                    value={revenue}
                                    onChange={(e) => setRevenue(Number(e.target.value))}
                                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                />
                                <div className="mt-2 text-2xl font-black font-mono">฿{revenue.toLocaleString()}</div>
                            </div>

                            {/* Load Time Input */}
                            <div>
                                <label className="block text-xs font-mono font-bold text-pink-400 mb-3 uppercase tracking-tighter">ความเร็วการโหลดปัจจุบัน (วินาที)</label>
                                <input
                                    type="range"
                                    min="0.5"
                                    max="10"
                                    step="0.1"
                                    value={loadTime}
                                    onChange={(e) => setLoadTime(Number(e.target.value))}
                                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
                                />
                                <div className="mt-2 text-2xl font-black font-mono">{loadTime}s <span className="text-xs text-gray-500">{loadTime > 2 ? '⚠️ Inefficient' : '🚀 Good'}</span></div>
                            </div>
                        </div>

                        <div className="bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/5 flex flex-col justify-center text-center min-w-0 overflow-hidden">
                            <div className="text-sm font-bold text-gray-500 uppercase mb-2">Potential Revenue Lift</div>
                            {/* FIX #4: แสดง feedback ที่ดีกว่าเมื่อ load time ดีอยู่แล้ว */}
                            {results.lift > 0 ? (
                                <motion.div
                                    className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400 break-words"
                                    key={results.lift}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    +฿{results.lift.toLocaleString()}
                                </motion.div>
                            ) : (
                                <motion.div
                                    className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-green-400"
                                    key="optimal"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    🚀 Optimal
                                </motion.div>
                            )}
                            <div className="mt-4 text-[10px] text-gray-500 leading-relaxed">
                                {results.lift > 0 ? (
                                    <>
                                        เมื่อเป้าหมายคือโหลดเร็ว <span className="text-blue-400 font-bold">1.5s</span> <br />
                                        คุณกำลังเสียโอกาสทางการขายไปประมาณ <span className="text-pink-400 font-bold">{results.efficiency}%</span>
                                    </>
                                ) : (
                                    <span className="text-emerald-400 font-bold">ระบบของคุณเร็วกว่า 1.5s แล้ว — ยอดเยี่ยมมาก</span>
                                )}
                            </div>

                            <button className="mt-8 py-3 bg-white text-slate-950 rounded-xl font-bold text-sm hover:scale-105 transition-transform flex items-center justify-center gap-2 w-full max-w-xs mx-auto">
                                <Target size={16} />
                                วางแผนเอาคืน (Consult Strategy)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ROICalculator;
