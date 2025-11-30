// app/projects/[slug]/page.tsx
import GooeyBackground from '@/components/GooeyBackground';
import { Metadata } from 'next';
import React from 'react';

// 1. **การแก้ไข Type Error หลัก:**
// กำหนด Type ของ Props สำหรับ Page Component อย่างถูกต้อง
// - 'params' คือ Object ที่มี key เป็นชื่อของโฟลเดอร์ Dynamic Route (ในที่นี้คือ 'slug')
// - Type นี้ไม่ใช่ Promise ซึ่งจะช่วยแก้ปัญหา Build Error ที่เกิดขึ้น
interface ProjectPageProps {
    params: {
        slug: string;
    };
    searchParams?: {
        [key: string]: string | string[] | undefined;
    };
}

// 2. ฟังก์ชัน generateMetadata (เป็นทางเลือก)
// ฟังก์ชันนี้ต้องเป็น async และคืนค่าเป็น Promise<Metadata>
// แต่ Type ของ Props ที่รับเข้ามา (ProjectPageProps) ยังคงเป็น Object
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { slug } = params;
    
    // เราสามารถใช้ slug เพื่อดึงข้อมูลสำหรับ metadata ได้
    // เช่น ดึงชื่อโปรเจกต์จากฐานข้อมูลโดยใช้ slug
    
    // ตัวอย่างการคืนค่า Metadata
    return {
        title: `Microtronic - ผลงาน: ${slug.replace(/-/g, ' ').toUpperCase()}`,
        description: `รายละเอียดและกรณีศึกษาของโปรเจกต์ ${slug}`,
    };
}


// 3. Page Component
// Component ต้องรับ Props ด้วย Type ที่ถูกต้อง (ProjectPageProps)
export default function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = params;

    return (
        // ใช้ Layout ที่กำหนดไว้ในแนวทางโดยรวม
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-gradient-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px]">
            <GooeyBackground />

            <main className="container mx-auto max-w-7xl flex flex-col gap-8">
                <header className="text-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-300">
                        Work Showcase: {slug.replace(/-/g, ' ').toUpperCase()}
                    </h1>
                    <p className="text-xl text-gray-300">
                        หน้าสำหรับแสดงรายละเอียดของโปรเจกต์ที่มี slug เป็น `{slug}`
                    </p>
                </header>

                <section className="mt-8 bg-white/10 backdrop-blur-lg p-6 md:p-10 rounded-xl shadow-2xl border border-white/20">
                    <h2 className="text-3xl font-bold mb-4">ข้อมูลเบื้องต้น</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <p><strong>ประเภทงาน:</strong> เว็บไซต์องค์กร</p>
                        <p><strong>เทคโนโลยี:</strong> Next.js, TypeScript, Tailwind CSS</p>
                        <p><strong>สถานะ:</strong> เสร็จสมบูรณ์</p>
                        <p><strong>ลิงก์:</strong> <a href="#" target="_blank" rel="noopener noreferrer" className="text-pink-300 hover:text-pink-200 underline">ดูตัวอย่างเว็บไซต์</a></p>
                    </div>
                </section>
                
                {/* สามารถเพิ่มส่วนรายละเอียด เนื้อหา รูปภาพ และ Case Study ได้ที่นี่ */}

            </main>
        </div>
    );
}
