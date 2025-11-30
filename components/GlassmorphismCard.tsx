// components/GlassmorphismCard.tsx
import React from 'react';

export interface GlassmorphismCardProps {
    children: React.ReactNode;
}

/**
 * GlassmorphismCard Component
 * ใช้เป็น Wrapper สำหรับส่วนเนื้อหาที่ต้องการ Style Glassmorphism 
 * (bg-white/10, backdrop-blur, border)
 */
export default function GlassmorphismCard({ children }: GlassmorphismCardProps) {
    return (
        <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-xl transition-all duration-300 hover:shadow-fuchsia-400/50 h-full">
            {children}
        </div>
    );
}