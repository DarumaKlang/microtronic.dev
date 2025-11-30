// app/portfolio/[slug]/page.tsx

import GooeyBackground from '@/components/GooeyBackground';
import { Metadata, ResolvingMetadata } from 'next';
import React from 'react';

// 1. กำหนด Type สำหรับ Dynamic Route Parameters
interface ParamsType {
    slug: string; 
}

// 2. กำหนด Type สำหรับ Props ของ generateMetadata 
// (ใน Next.js 14+ ควรใช้ ResolvingMetadata สำหรับ Type ที่ถูกต้องของ generateMetadata)
interface GenerateMetadataProps {
    params: ParamsType;
    searchParams: { [key: string]: string | string[] | undefined };
}

// 3. กำหนด Type สำหรับ Props ของ Page Component
// เราใช้ Type ที่สะอาดที่สุดเพื่อหลีกเลี่ยง Type Conflict
interface PortfolioSlugPageProps {
    params: ParamsType;
    searchParams?: { [key: string]: string | string[] | undefined };
}


// 4. generateMetadata (ใช้ Type ที่ถูกต้อง)
export async function generateMetadata(
    { params }: GenerateMetadataProps, 
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = params;
    
    // เราสามารถใช้ parent.title เพื่อรับค่า metadata จาก layout ได้
    const parentMetadata = await parent;

    return {
        title: `Microtronic - ผลงาน: ${slug.replace(/-/g, ' ').toUpperCase()}`,
        description: `รายละเอียดและกรณีศึกษาของโปรเจกต์ ${slug}`,
        openGraph: {
            title: `Portfolio | ${slug}`,
            //...
        }
    };
}


// 5. Page Component (ใช้ Type ที่ถูกต้อง)
// 🚨 การแก้ไขเชิงรุก: บางครั้งการใช้ Type alias/interface ในฟังก์ชันตรงๆ ช่วยแก้ไข Type Inference Bug ได้
// หรือเปลี่ยนให้ function เป็น async หากคุณต้องการเรียกใช้ fetch API (แม้ว่าคุณจะยังไม่ใช้ก็ตาม)
export default function ProjectPage({ params }: PortfolioSlugPageProps) {
    const { slug } = params;

    return (
        // ใช้ Layout และสไตล์ที่คุณกำหนด
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
            </main>
        </div>
    );
}