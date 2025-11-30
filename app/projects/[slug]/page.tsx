// app/projects/[slug]/page.tsx

// 1. กำหนด Type สำหรับ Props ของ Page Component อย่างถูกต้อง
// ชื่อ Type อาจจะเป็น ProjectPageProps ตามที่คุณใช้ใน Error
interface ProjectPageProps {
    params: {
        slug: string; // นี่คือชื่อโฟลเดอร์ใน Dynamic Route (เช่น [slug])
    };
    searchParams?: {
        [key: string]: string | string[] | undefined;
    };
}

// 2. ถ้าคุณมี generateMetadata, ให้ตรวจสอบ Type ของมันด้วย
import type { Metadata } from 'next';

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    // ในตัวอย่างนี้ เราใช้ Type เดียวกับ Page Props ได้
    return {
        title: `Project: ${params.slug}`,
        description: `Details of project ${params.slug}`,
    };
}

// 3. Page Component: ต้องเป็น async function ถ้าคุณต้องการเรียกใช้ fetch
import GooeyBackground from '@/components/GooeyBackground'; // ต้องมี component นี้
import React from 'react';

// ใช้ Type ที่เรากำหนดไว้ด้านบน
export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = params;

    // TODO: ลอง fetch ข้อมูลจาก slug ตรงนี้

    return (
        // ใช้ Layout ที่กำหนดไว้ในแนวทางโดยรวม
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-gradient-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px]">
            <GooeyBackground />

            <main className="container mx-auto max-w-7xl flex flex-col gap-8">
                <h1 className="text-4xl font-bold">รายละเอียดโปรเจกต์: {slug}</h1>
                <p>นี่คือหน้าสำหรับแสดงรายละเอียดของโปรเจกต์ที่มี slug เป็น `{slug}`</p>
                {/* เพิ่มเนื้อหาของโปรเจกต์ที่นี่ */}
            </main>
        </div>
    );
}
