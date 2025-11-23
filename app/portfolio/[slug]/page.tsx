// app/portfolio/[slug]/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import GooeyBackground from '@/components/GooeyBackground';
import { workExamples, getWorkBySlug } from '@/components/WorkData';

interface ProjectPageProps {
    params: {
        slug: string;
    };
}

/**
 * ฟังก์ชันสร้าง Static Paths สำหรับ SEO และ Build Time
 */
export async function generateStaticParams() {
    return workExamples.map((work) => ({
        slug: work.slug,
    }));
}

/**
 * กำหนด Metadata แบบ Dynamic
 * (ต้องเป็น async function เสมอ)
 */
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    // 🔑 วิธีแก้ปัญหาสำหรับ Next.js 15.x: await ที่ Object params ก่อน Destructure
    // เพื่อหลีกเลี่ยงข้อความ Error 'params should be awaited'
    const { slug } = await params; 
    const work = getWorkBySlug(slug); 

    if (!work) {
        return {
            title: 'ไม่พบโครงการ',
        };
    }

    return {
        title: `${work.alt} - รายละเอียดโครงการ | Microtronic`,
        description: work.summary,
    };
}


// Component Page ต้องเป็น async function สำหรับ Server Component
export default async function ProjectDetailPage({ params }: ProjectPageProps) {
    // 1. ค้นหาข้อมูลโครงการจาก slug
    // 🔑 วิธีแก้ปัญหาสำหรับ Next.js 15.x: await ที่ Object params ก่อน Destructure
    const { slug } = await params; 

    const work = getWorkBySlug(slug); 

    // 2. ถ้าไม่พบ slug ให้แสดงหน้า Not Found
    if (!work) {
        notFound(); 
    }

    return (
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-gradient-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px]">
            <GooeyBackground />

            <main className="container mx-auto max-w-7xl flex flex-col gap-10 z-10 relative">
                {/* ปุ่มกลับไปหน้า Portfolio */}
                <Link 
                    href="/portfolio" 
                    className="text-fuchsia-400 hover:text-white transition-colors self-start mb-4 font-semibold"
                >
                    ← กลับไปยังหน้าผลงานทั้งหมด
                </Link>

                {/* ส่วนหัวโครงการ */}
                <header className="text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tighter">
                        {work.alt}
                    </h1>
                    <p className="text-xl opacity-80 max-w-4xl mx-auto">
                        {work.summary}
                    </p>
                </header>

                {/* รูปภาพหลัก */}
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-2xl">
                    <Image
                        src={work.src}
                        alt={`ภาพรวมโครงการ ${work.alt}`}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="100vw"
                    />
                </div>

                {/* เนื้อหาฉบับเต็ม */}
                <article className="prose prose-invert max-w-none lg:prose-xl mx-auto text-left">
                    <div dangerouslySetInnerHTML={{ __html: work.fullContent.replace(/\n/g, '<br/>') }} />
                </article>

                {/* ปุ่มลิงก์ไปยังเว็บไซต์จริง */}
                <a
                    href={work.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="self-center px-8 py-3 bg-fuchsia-600 text-white font-semibold rounded-full shadow-lg hover:bg-fuchsia-700 transition-colors duration-300 mt-8"
                >
                    เยี่ยมชมเว็บไซต์จริง →
                </a>
            </main>
        </div>
    );
}