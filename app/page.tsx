// app/page.tsx
import React from 'react';

import HomeHeroSection from "@/components/HomeHeroSection"; // 👈 นำเข้า Component ใหม่
import HomeServiceShowcase from "@/components/HomeServiceShowcase"; // 👈 นำเข้า Component ใหม่
import HomeCoreServicesSection from "@/components/HomeCoreServicesSection"; // 👈 นำเข้า Component ใหม่
import { workExamples } from '@/components/WorkData'; // นำเข้าข้อมูลผลงาน
import { WorkShowcase } from '@/components/WorkShowcase'; // 👈 import component ใหม่
import HomeFooterLinks from '@/components/HomeFooterLinks'; // 👈 นำเข้า Component ใหม่

export default function Home() {

    return (
        // ใช้ class สำหรับ gradient background และ text-white ตามที่คุณต้องการ
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 gap-16 sm:p-20 bg-gradient-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px]">

            <main className="flex flex-col gap-[32px] row-start-2 items-center w-full">
                {/* 1. Hero Section ใหม่ */}
                <HomeHeroSection />

                {/* 2. ส่วน Service Cards */}
                <HomeServiceShowcase />

                {/* 3. ส่วน "บริการของเรา" (Core Services) */}
                <HomeCoreServicesSection />

                {/* 4. ส่วนแสดงผลงาน */}
                <section className="w-full max-w-7xl mt-16 px-4">
                    {/* เพิ่มส่วนแสดงผลงานใหม่ */}
                    <WorkShowcase
                        title="ตัวอย่างผลงานรับทำเว็บไซต์"
                        description="เราสร้างสรรค์เว็บไซต์ที่ตอบโจทย์ธุรกิจของคุณ ไม่ว่าจะเป็นเว็บไซต์องค์กร E-commerce หรือ Portfolio ด้วยดีไซน์ที่ทันสมัยและใช้งานง่ายบนทุกอุปกรณ์"
                        works={workExamples}
                    />
                </section>
            </main>

            {/* 3. เรียกใช้ Component HomeFooterLinks แทนโค้ด Footer เดิม */}
            <HomeFooterLinks /> {/* 👈 ใช้ Component ใหม่ที่สร้างขึ้น */}
        </div>
    );
}
