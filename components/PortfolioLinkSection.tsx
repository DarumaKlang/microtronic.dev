// components/PortfolioLinkSection.tsx
'use client'
// ใช้ 'use client' เนื่องจากเราต้องการให้มันสามารถมี interactivity ได้ (เช่น hover/transition)
// แต่ในกรณีนี้เราสามารถให้มันเป็น Server Component ได้เลย หากไม่มี state
import Link from 'next/link';
import { Briefcase } from 'lucide-react'; // ใช้ icon กระเป๋าเอกสารจาก lucide-react

// Server Component
export default function PortfolioLinkSection() {
    return (
        <section className="py-16 md:py-24 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-pink-500 mb-6">
                ผลงานของเรา: ประสิทธิภาพที่พูดแทนเรา
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
                สำรวจ Portfolio ที่สร้างขึ้นด้วย Next.js App Router และสถาปัตยกรรม RSC-First เพื่อความเร็วและความเสถียรสูงสุด
            </p>
            
            <Link 
                href="/portfolio" 
                className="inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold text-white bg-fuchsia-800 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 hover:bg-fuchsia-700 ring-2 ring-fuchsia-500/50"
            >
                <Briefcase className="w-6 h-6" />
                ดู Portfolio ทั้งหมด
            </Link>
        </section>
    );
}