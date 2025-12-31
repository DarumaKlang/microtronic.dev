'use client';

import React from 'react';
import { motion } from 'framer-motion';

const insights = [
    "🚀 [ARCH] NEXT.JS 16 READY: EDGE RUNTIME IS THE NEW STANDARD",
    "🌿 [GREEN] HIGH-PERFORMANCE CODE REDUCES CARBON FOOTPRINT BY 40%",
    "🇹🇭 [HEART] TECH WITH THAI HEART: SIMPLICITY IS THE ULTIMATE SOPHISTICATION",
    "🤖 [AI] BEYOND CHATTING: AI AS AN INTELLIGENCE LAYER FOR EVERY SPRINT",
    "💎 [UX] GLASSMORPHISM 2.0: THE FUTURE IS TRANSPARENT",
    "⚡ [SPEED] 100MS LCP IS THE NEW 2026 BENCHMARK",
    "⛩️ [STRATEGY] BUILD FOR THE FUTURE, BUT REMEMBER YOUR ROOTS"
];

const StrategicTicker: React.FC = () => {
    return (
        <div className="w-full bg-blue-600/10 border-y border-white/5 py-2 overflow-hidden whitespace-nowrap relative z-20 backdrop-blur-sm">
            <motion.div
                className="inline-block"
                animate={{
                    x: [0, -1000],
                }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 30,
                        ease: "linear",
                    },
                }}
            >
                <div className="flex items-center gap-12">
                    {[...insights, ...insights].map((text, index) => (
                        <span
                            key={index}
                            className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
                            {text}
                        </span>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default StrategicTicker;
