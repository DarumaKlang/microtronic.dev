import React from 'react';
import type { Metadata } from 'next';
import GooeyBackground from '@/components/GooeyBackground';
import TemplateGroupSection from '@/components/TemplateGroupSection';
import EnterpriseGroupSection from '@/components/EnterpriseGroupSection';

// SEO Metadata
export const metadata: Metadata = {
    title: 'บริการพัฒนาเว็บไซต์ - Templates & Custom Solutions | Microtronic',
    description: 'เลือกระหว่าง Templates สำเร็จรูป 5,000 บาท หรือ Custom Enterprise Solution สำหรับองค์กรขนาดใหญ่ รับประกัน ROI และผลลัพธ์ที่วัดผลได้',
    keywords: ['Next.js Template', 'Website Template Thailand', 'Custom Web Development', 'Enterprise Solution', 'Web Development Bangkok'],
    openGraph: {
        title: 'Microtronic Services - Templates & Enterprise Solutions',
        description: 'เริ่มต้นธุรกิจออนไลน์ใน 24 ชม. หรือสร้างระบบองค์กรระดับ Enterprise',
        images: ['/og-service.png'],
        url: 'https://microtronic.biz/service',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'บริการพัฒนาเว็บไซต์ | Microtronic',
        description: 'Templates 5,000 บาท หรือ Custom Enterprise Solution',
        images: ['/og-service.png'],
    }
};

/**
 * Service Page - แยก 2 กลุ่มบริการชัดเจน
 * Group I: Templates & Starter Kits (Self-Service)
 * Group II: Custom Enterprise Solutions (High-Touch)
 */
export default function ServicePage() {
    return (
        <div className="min-h-screen bg-slate-900 text-white pt-24 pb-16 relative overflow-hidden">
            {/* Background Effect */}
            <GooeyBackground />

            {/* Main Content */}
            <main className="relative z-10">
                {/* Hero Section */}
                <section className="text-center py-16 px-4 mb-12">
                    <div className="max-w-5xl mx-auto">
                        <h1 className="text-6xl sm:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-emerald-400 leading-tight">
                            บริการที่ตอบโจทย์<br />ทุกขนาดธุรกิจ
                        </h1>
                        <p className="text-2xl text-gray-300 mb-8 leading-relaxed">
                            เลือกบริการที่เหมาะสมกับคุณ:<br />
                            <span className="text-pink-400 font-semibold">Templates สำเร็จรูป</span> สำหรับ SMEs หรือ{' '}
                            <span className="text-emerald-400 font-semibold">Custom Solution</span> สำหรับองค์กร
                        </p>

                        {/* Quick Navigation */}
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="#templates"
                                className="px-8 py-3 rounded-full border-2 border-pink-500 text-pink-300 hover:bg-pink-500/10 transition-all font-semibold"
                            >
                                📦 Templates (5,000 บาท)
                            </a>
                            <a
                                href="#enterprise"
                                className="px-8 py-3 rounded-full border-2 border-emerald-500 text-emerald-300 hover:bg-emerald-500/10 transition-all font-semibold"
                            >
                                🏢 Enterprise Solutions
                            </a>
                        </div>
                    </div>
                </section>

                {/* Divider */}
                <div className="max-w-7xl mx-auto px-4 mb-12">
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
                </div>

                {/* Group I: Templates Section */}
                <TemplateGroupSection />

                {/* Divider */}
                <div className="max-w-7xl mx-auto px-4 my-16">
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
                    <div className="text-center py-8">
                        <p className="text-gray-400 text-lg">
                            หรือต้องการโซลูชั่นที่ออกแบบเฉพาะสำหรับองค์กร?
                        </p>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
                </div>

                {/* Group II: Enterprise Section */}
                <EnterpriseGroupSection />

                {/* Comparison Section (Optional - เพิ่มในอนาคต) */}
                <section className="max-w-7xl mx-auto px-4 py-16">
                    <h2 className="text-4xl font-bold text-center mb-12 text-white">
                        ยังไม่แน่ใจว่าควรเลือกแบบไหน?
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Templates Column */}
                        <div className="bg-white/5 backdrop-blur-sm border border-pink-500/30 rounded-2xl p-8">
                            <h3 className="text-2xl font-bold text-pink-300 mb-4">
                                🎯 เลือก Templates ถ้าคุณ...
                            </h3>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-start gap-2">
                                    <span className="text-pink-400">✓</span>
                                    <span>ต้องการเปิดตัวเว็บไซต์เร็วที่สุด (ภายใน 1-2 วัน)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-pink-400">✓</span>
                                    <span>มีงบประมาณจำกัด (ต่ำกว่า 10,000 บาท)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-pink-400">✓</span>
                                    <span>ธุรกิจขนาดเล็ก-กลาง (SME, Freelancer, Startup)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-pink-400">✓</span>
                                    <span>ต้องการ Self-Service และปรับแต่งเองได้</span>
                                </li>
                            </ul>
                        </div>

                        {/* Enterprise Column */}
                        <div className="bg-white/5 backdrop-blur-sm border border-emerald-500/30 rounded-2xl p-8">
                            <h3 className="text-2xl font-bold text-emerald-300 mb-4">
                                🏢 เลือก Enterprise ถ้าคุณ...
                            </h3>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-400">✓</span>
                                    <span>ต้องการ Custom Features เฉพาะธุรกิจ</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-400">✓</span>
                                    <span>ต้องการ Integration กับระบบที่มีอยู่ (CRM, ERP)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-400">✓</span>
                                    <span>องค์กรขนาดกลาง-ใหญ่ หรือมี Traffic สูง</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-emerald-400">✓</span>
                                    <span>ต้องการ Support 24/7 และ SLA Agreement</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}
