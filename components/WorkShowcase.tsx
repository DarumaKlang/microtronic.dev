import React from 'react';
import Image from 'next/image'; // FIX: นำเข้า Image จาก Next.js

export interface WorkItem {
    src: string;
    alt: string;
}

// Interface ที่แก้ไขให้ title และ description เป็น Optional แล้ว
export interface WorkShowcaseProps {
    works: WorkItem[];
    title?: string;       
    description?: string; 
    className?: string;
}

export function WorkShowcase({ works, title, description, className = '' }: WorkShowcaseProps) {
    return (
        <div className={`space-y-4 ${className}`}>
            {title && <h3 className="text-2xl font-bold text-center">{title}</h3>}
            {description && <p className="text-center text-gray-400">{description}</p>}
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {works.map((work, index) => (
                    // FIX: เพิ่ม relative เพื่อให้ Image ที่มี fill สามารถทำงานได้
                    <div key={index} className="aspect-square bg-gray-700/50 rounded-lg overflow-hidden border border-white/10 hover:border-pink-500 transition duration-300 relative">
                        {/* FIX: เปลี่ยน img เป็น Image เพื่อการ optimize รูปภาพ */}
                        <Image 
                            src={work.src} 
                            alt={work.alt} 
                            fill={true} 
                            sizes="(max-width: 768px) 50vw, 33vw" // เพื่อประสิทธิภาพการโหลด
                            className="object-cover"
                            priority={index < 2} // ให้รูปภาพ 2 รูปแรกโหลดเร็วขึ้น
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}