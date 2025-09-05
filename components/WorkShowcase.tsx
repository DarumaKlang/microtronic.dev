// src/components/WorkShowcase.tsx
import Image from 'next/image';
import React from 'react';

// กำหนด type ของ props สำหรับแต่ละรูปภาพ
interface WorkImage {
    src: string;
    alt: string;
}

// กำหนด type ของ props สำหรับ component WorkShowcase
interface WorkShowcaseProps {
    title: string;
    description: string;
    works: WorkImage[];
}

export const WorkShowcase: React.FC<WorkShowcaseProps> = ({ title, description, works }) => {
    return (
        <section className="w-full max-w-7xl mx-auto mt-16 px-4 py-8 text-center">
            {/* ส่วนหัวข้อและคำอธิบาย */}
            <h3 className="text-3xl font-bold mb-4 text-white">
                {title}
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto mb-12">
                {description}
            </p>

            {/* Grid สำหรับแสดงรูปภาพผลงาน */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {works.map((work, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-xl transform transition-transform duration-300 hover:scale-105">
                            <Image
                                src={work.src}
                                alt={work.alt}
                                fill
                                style={{ objectFit: 'contain' }}
                                className="p-4" // เพิ่ม padding ให้รูปภาพเพื่อให้ไม่ติดขอบ
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};