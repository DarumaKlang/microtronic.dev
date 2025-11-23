// src/components/HomeHeroSection.tsx
import Link from 'next/link';
import React from 'react';

export default function HomeHeroSection() {
    return (
        <section className="w-full flex justify-center max-w-7xl">
            <div className="flex flex-col items-center text-center p-8 sm:p-16 gap-8">
                {/* ข้อความหลัก */}
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                    รับออกแบบจัดทำเว็บไซต์อย่าง<br className="sm:hidden" />มืออาชีพและทันสมัย
                </h2>
                <p className="text-lg sm:text-xl font-light max-w-2xl opacity-90">
                    เราสร้างสรรค์เว็บไซต์ที่ยืดหยุ่น ใช้งานง่าย และเป็นมิตรกับสิ่งแวดล้อม ด้วยเทคโนโลยีล่าสุด
                </p>

                {/* ปุ่ม Call-to-Action */}
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* 1. ลิงก์ไปยังหน้า Portfolio ที่สร้างใหม่ */}
                    <Link
                        href="/portfolio"
                        className="px-8 py-3 bg-fuchsia-600 text-white font-semibold rounded-full shadow-lg hover:bg-fuchsia-700 transition-colors duration-300"
                    >
                        ดูผลงานของเรา
                    </Link>
                    {/* 2. ลิงก์ไปยังหน้า Contact */}
                    <Link
                        href="/contact"
                        className="px-8 py-3 text-white font-semibold rounded-full border border-white hover:bg-white hover:text-fuchsia-800 transition-colors duration-300"
                    >
                        ติดต่อเรา
                    </Link>
                </div>
            </div>
        </section>
    );
}