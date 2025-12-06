// app/portfolio/high-performance/page.tsx
import GooeyBackground from '@/components/GooeyBackground';
import { Metadata } from 'next';
import Link from 'next/link';

// กำหนด Metadata สำหรับ SEO

export const metadata: Metadata = {
    title: 'High-Performance Web Applications - Microtronic',
    description: 'ผลงานที่ใช้ React Server Components (RSC) และ Next.js App Router เพื่อสร้างเว็บไซต์ที่มีประสิทธิภาพในการโหลดและความเร็วเหนือระดับ',
};

// ข้อมูลผลงานตัวอย่าง (ในอนาคตอาจดึงจาก API/DB)
const highPerformanceProjects = [
    { title: 'Enterprise E-commerce Platform', stack: 'Next.js App Router, RSC, Tailwind CSS', focus: 'Page Load Time < 500ms' },
    { title: 'Marketing Site with Static Generation', stack: 'Next.js Static Export, Vercel Edge', focus: '100% Core Web Vitals Score' },
    { title: 'Custom Analytics Dashboard', stack: 'RSC, Drizzle ORM, PostgreSQL', focus: 'Low Client-Side Overhead' },
];

export default function HighPerformancePage() {
    return (
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-linear-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px]">
            <GooeyBackground />

            <main className="container mx-auto max-w-7xl flex flex-col gap-8 relative z-10">

                <h1 className="text-4xl font-extrabold sm:text-5xl text-blue-300">
                    🚀 High-Performance Web Applications
                </h1>
                <p className="text-xl text-gray-200">
                    เราเน้นการใช้สถาปัตยกรรม RSC-First เพื่อให้แอปพลิเคชันของคุณโหลดเร็วที่สุด มอบประสบการณ์ผู้ใช้ที่ยอดเยี่ยม และเป็นมิตรกับ SEO
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {highPerformanceProjects.map((project, index) => (
                        <div key={index} className="p-6 bg-white/10 rounded-lg backdrop-blur-sm shadow-xl border border-blue-400/50">
                            <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
                            <p className="text-sm font-mono text-fuchsia-300 mb-2">Stack: {project.stack}</p>
                            <p className="text-gray-300">จุดเด่น: {project.focus}</p>
                            {/* ในอนาคตเราจะเพิ่ม Link ไปยังหน้า Project Detail ที่นี่ */}
                        </div>
                    ))}
                </div>

                <Link href="/portfolio" className="mt-8 text-lg font-semibold text-blue-400 hover:text-blue-200 transition duration-150">
                    ← กลับสู่หน้า Portfolio หลัก
                </Link>
            </main>
        </div>
    );
}