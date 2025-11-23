// src/app/portfolio/page.tsx (อัปเดต)
import React from 'react';
import { Metadata } from 'next';
import GooeyBackground from '@/components/GooeyBackground'; 
import BlogCard from '@/components/BlogCard'; // 👈 ใช้ BlogCard ใหม่
import { workExamples } from '@/components/WorkData'; 

// ... (Metadata เหมือนเดิม) ...

export default function PortfolioPage() {
    return (
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-gradient-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px]">
            <GooeyBackground />

            <main className="container mx-auto max-w-7xl flex flex-col gap-12 z-10 relative"> 
                <header className="text-center pt-8 pb-4">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tighter">
                        ผลงานทั้งหมดของเรา
                    </h1>
                    <p className="text-xl opacity-80 max-w-3xl mx-auto">
                        รวบรวมโครงการที่เราทำอย่างละเอียด คลิกเพื่ออ่านเรื่องราวเบื้องหลังทั้งหมด
                    </p>
                </header>

                {/* 🎯 แสดงผลงานโดยใช้ BlogCard */}
                <section className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {workExamples.map((work, index) => (
                            <BlogCard key={index} work={work} />
                        ))}
                    </div>
                </section>
                
            </main>
        </div>
    );
}