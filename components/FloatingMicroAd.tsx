'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Sparkles, X, ArrowRight, BarChart3 } from 'lucide-react';

const FloatingMicroAd = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    useEffect(() => {
        // Show after 3 seconds
        const timer = setTimeout(() => setIsVisible(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    if (isMinimized) {
        return (
            <button
                onClick={() => setIsMinimized(false)}
                className="fixed bottom-6 right-6 z-[60] p-4 bg-blue-600 rounded-full shadow-2xl hover:scale-110 transition-transform animate-bounce"
            >
                <BarChart3 className="w-6 h-6 text-white" />
            </button>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 z-[60] max-w-[320px] w-[90vw] animate-in slide-in-from-bottom duration-500">
            <div className="relative group bg-slate-900/90 backdrop-blur-2xl border border-blue-500/30 rounded-2xl p-6 shadow-2xl shadow-blue-500/20 overflow-hidden">
                {/* Close Button */}
                <button
                    onClick={() => setIsMinimized(true)}
                    className="absolute top-2 right-2 p-1 text-gray-500 hover:text-white transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>

                {/* Animated Background Glow */}
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-600/20 blur-[80px] group-hover:bg-blue-600/40 transition-all duration-700" />

                <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-blue-500/50 shadow-lg shadow-blue-500/20">
                            <Image
                                src="/micro-formula-logo.png"
                                alt="Micro Formula Logo"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <div className="text-blue-400 font-mono text-[10px] font-bold uppercase tracking-widest leading-none mb-1">
                                2026 NEW YEAR RELEASE
                            </div>
                            <h4 className="text-xl font-black text-white leading-tight">
                                Micro Formula
                            </h4>
                        </div>
                    </div>

                    <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                        เตรียมพร้อมรับปีใหม่ด้วยระบบบัญชีอัจฉริยะที่หลอมรวม AI เข้ากับงานการเงินอย่างลงตัวที่สุด
                    </p>

                    <div className="flex flex-col gap-2">
                        <a
                            href="https://nextjs-micro-account.vercel.app/"
                            target="_blank"
                            className="w-full py-3 bg-white text-slate-900 font-black rounded-xl text-center flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
                        >
                            ลองใช้งานฟรี
                            <ArrowRight className="w-4 h-4" />
                        </a>
                        <p className="text-[9px] text-center text-gray-500 font-mono">
                            {'// SECURE_CLOUD_NATIVE_SAAS'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FloatingMicroAd;
