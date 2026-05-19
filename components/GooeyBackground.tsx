// components/GooeyBackground.tsx
import React from 'react';

/**
 * GooeyBackground Component: สร้างเอฟเฟกต์พื้นหลังแบบ Blobs
 * โดยใช้ Custom Colors จาก tailwind.config.ts และ CSS Animation
 * วาง Component นี้ไว้ใน page.tsx ด้วยตำแหน่ง fixed/absolute
 */
const GooeyBackground: React.FC = () => {
    return (
        // Container ที่ครอบคลุมทั้ง viewport และซ่อน overflow เพื่อซ่อนขอบของ Blobs ที่เคลื่อนที่
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 opacity-70">
            
            {/* Blob 1: Orange/Light Orange */}
            <div 
                className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full 
                           bg-linear-to-br from-g1-start to-g1-end 
                           filter blur-3xl opacity-30 mix-blend-lighten 
                           animate-blob animation-delay-0"
            />
            
            {/* Blob 2: Purple/Blue */}
            <div 
                className="absolute top-2/3 right-1/4 w-64 h-64 sm:w-[400px] sm:h-[400px] rounded-full 
                           bg-linear-to-br from-g2-start to-g2-end 
                           filter blur-3xl opacity-30 mix-blend-lighten 
                           animate-blob animation-delay-2000"
            />

            {/* Blob 3: Pink/Light Pink */}
            <div 
                className="absolute bottom-1/4 left-1/2 w-48 h-48 sm:w-80 sm:h-80 rounded-full 
                           bg-linear-to-br from-g3-start to-g3-end 
                           filter blur-3xl opacity-30 mix-blend-lighten 
                           animate-blob animation-delay-4000"
            />
            
            {/* Blob 4: Teal/Lime Green */}
            <div 
                className="absolute top-1/2 left-1/4 w-72 h-72 sm:w-[500px] sm:h-[500px] rounded-full 
                           bg-linear-to-br from-g4-start to-g4-end 
                           filter blur-3xl opacity-30 mix-blend-lighten 
                           animate-blob animation-delay-6000"
            />
        </div>
    );
};

export default GooeyBackground;