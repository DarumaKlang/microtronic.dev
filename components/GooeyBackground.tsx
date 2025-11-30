// components/GooeyBackground.tsx (Updated to use Tailwind CSS)
"use client";

import React from 'react';

/**
 * GooeyBackground Component
 * สร้างพื้นหลังแบบเคลื่อนไหว (Gooey/Blob) โดยใช้ Tailwind CSS Animation
 * (ต้องมีการเพิ่ม keyframes ใน tailwind.config.ts)
 */
export default function GooeyBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            
            {/* 1. Blob สี Cyan (มุมซ้ายบน) */}
            <div 
                className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply opacity-20 filter blur-3xl animate-blob-slow"
                style={{ animationDelay: '2s' }}
            ></div>

            {/* 2. Blob สี Fuchsia (ตรงกลาง) */}
            <div 
                className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-fuchsia-500 rounded-full mix-blend-multiply opacity-20 filter blur-3xl animate-blob-medium"
                style={{ animationDelay: '4s' }}
            ></div>

            {/* 3. Blob สี Blue (มุมขวาบน) */}
            <div 
                className="absolute top-[-50px] right-[-50px] w-[500px] h-[500px] bg-blue-500 rounded-full mix-blend-multiply opacity-10 filter blur-3xl animate-blob-fast"
                style={{ animationDelay: '0s' }}
            ></div>

            {/* 4. Blob สี Cyan/Pink (ด้านล่าง) */}
            <div 
                className="absolute bottom-[-200px] left-[20%] w-[600px] h-[600px] bg-pink-500 rounded-full mix-blend-multiply opacity-15 filter blur-3xl animate-blob-medium"
                style={{ animationDelay: '6s' }}
            ></div>
        </div>
    );
}