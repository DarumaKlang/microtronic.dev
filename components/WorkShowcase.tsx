// src/components/WorkShowcase.tsx
import Image from 'next/image';
import Link from 'next/link'; // 1. Import Link
import React from 'react';

// กำหนด type ของ props สำหรับแต่ละรูปภาพ (อัปเดต Interface)
interface WorkImage {
    src: string;
    alt: string;
    href: string; // 2. เพิ่ม href: string เพื่อรองรับลิงก์
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
                    // 3. ใช้ Link Component ครอบส่วนแสดงผลงานทั้งหมด
                    <Link 
                        key={index} 
                        href={work.href} // ใช้ค่า href จากข้อมูล
                        target="_blank" // แนะนำให้เปิดในแท็บใหม่สำหรับลิงก์ภายนอก
                        rel="noopener noreferrer"
                        // ปรับ class ให้เป็นการ์ดที่ดูน่าสนใจเมื่อถูกโฉบ (Hover)
                        className="block rounded-lg overflow-hidden shadow-xl transform transition-transform duration-300 hover:scale-[1.03] hover:shadow-fuchsia-500/50" 
                    >
                        <div className="relative w-full aspect-video bg-gray-700"> 
                            <Image
                                src={work.src}
                                alt={work.alt}
                                fill
                                // ปรับ objectFit จาก 'contain' เป็น 'cover' เพื่อให้รูปภาพเต็มพื้นที่การ์ด
                                style={{ objectFit: 'cover' }} 
                                // ลบ class 'p-4' ออก เพื่อให้รูปภาพเต็มพื้นที่
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="transition-opacity duration-500"
                            />
                            {/* เพิ่ม Overlay สำหรับ Alt text เมื่อ Hover เพื่อ User Experience ที่ดีขึ้น */}
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 opacity-0 hover:opacity-100 p-4">
                                <p className="text-sm font-semibold truncate w-full text-white">{work.alt}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};