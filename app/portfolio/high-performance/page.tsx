// app/portfolio/high-performance/page.tsx
import GooeyBackground from '@/components/GooeyBackground';
import { Metadata } from 'next';
import Link from 'next/link';
import { GRADIENT_TEXT_CLASS } from '@/constants/data';

export const metadata: Metadata = {
    title: 'High-Performance Web Applications - Microtronic',
    description: 'ผลงานที่ใช้ React Server Components (RSC) และ Next.js App Router เพื่อสร้างเว็บไซต์ที่มีประสิทธิภาพในการโหลดและความเร็วเหนือระดับ',
};

const highPerformanceProjects = [
    {
        title: 'Micro Formula V1.0 (New Product)',
        description: 'ระบบจัดการงานบัญชี (Cloud Accounting) ครบวงจร มาพร้อมแดชบอร์ดสรุปงบการเงินแบบ Real-time, ระบบจัดการรายรับ-รายจ่าย, ทะเบียนลูกค้าและสินค้า, พร้อมรายงานภาษีมูลค่าเพิ่ม (VAT Report) อัตโนมัติ',
        stack: 'Next.js 15, TypeScript, Tailwind CSS, PostgreSQL',
        focus: 'Extreme Performance & Financial Accuracy',
        link: 'https://nextjs-micro-account.vercel.app/',
        github: 'https://github.com/microtronic-thailand/app-micro-formula',
        image: 'https://nextjs-micro-account.vercel.app/og-image.png'
    },
    {
        title: 'หิวจัง (Hiwchung) Restaurant System',
        description: 'ระบบ Order-to-Server แบบ Seamless สำหรับร้านอาหารยุคใหม่ ลูกค้าสแกนสั่งเองผ่าน QR Code ออเดอร์ส่งตรงถึงแม่ครัว พร้อมระบบเสิร์ฟและคิดเงินที่รวดเร็ว ลดความผิดพลาดและเพิ่มรอบการขาย',
        stack: 'Next.js App Router, Real-time WebSockets, PostgreSQL',
        focus: 'High Concurrent Ordering & Zero-Lag UX',
        github: 'https://github.com/microtronic-thailand/hiwchung-app'
    },
    {
        title: 'Enterprise E-commerce Platform',
        description: 'ระบบร้านค้าออนไลน์ขนาดใหญ่ที่รองรับทราฟฟิกมหาศาล พร้อมระบบค้นหาที่รวดเร็วและการเชื่อมต่อคลังสินค้าแบบ Real-time',
        stack: 'Next.js App Router, RSC, Tailwind CSS',
        focus: 'Page Load Time < 500ms'
    },
];

export default function HighPerformancePage() {
    return (
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-linear-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px] relative overflow-hidden">
            <GooeyBackground />

            <main className="container mx-auto max-w-7xl flex flex-col gap-8 relative z-10">
                <header>
                    <h1 className={`text-4xl font-extrabold sm:text-6xl mb-4 ${GRADIENT_TEXT_CLASS}`}>
                        🚀 High-Performance Web Apps
                    </h1>
                    <p className="text-xl text-gray-200 max-w-3xl leading-relaxed">
                        เราเน้นการใช้สถาปัตยกรรม <span className="font-bold text-blue-300">RSC-First</span> เพื่อให้แอปพลิเคชันของคุณโหลดเร็วที่สุด มอบประสบการณ์ผู้ใช้ที่ยอดเยี่ยม และเป็นมิตรกับ SEO ก้าวข้ามขีดจำกัดของเว็บแอปพลิเคชันแบบเดิมๆ
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
                    {highPerformanceProjects.map((project, index) => (
                        <div
                            key={index}
                            className="group p-8 bg-white/5 rounded-2xl backdrop-blur-xl shadow-2xl border border-white/10 hover:border-blue-400/50 transition-all duration-500 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <h2 className="text-3xl font-bold text-white group-hover:text-blue-300 transition-colors uppercase tracking-tight">
                                        {project.title}
                                    </h2>
                                    {project.link && (
                                        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-bold rounded-full border border-blue-500/30">
                                            LIVE NOW
                                        </span>
                                    )}
                                </div>
                                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                                    {project.description}
                                </p>
                                <div className="space-y-3 mb-8">
                                    <div className="flex items-center gap-2">
                                        <span className="text-blue-400 font-mono text-sm">STACK:</span>
                                        <span className="text-gray-100 text-sm font-medium">{project.stack}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-fuchsia-400 font-mono text-sm">FOCUS:</span>
                                        <span className="text-gray-100 text-sm font-medium">{project.focus}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 mt-auto">
                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition shadow-lg shadow-blue-900/40"
                                    >
                                        Visit Website
                                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                )}
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition border border-white/20"
                                    >
                                        Source Code
                                        <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                        </svg>
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 flex justify-center">
                    <Link href="/portfolio" className="text-xl font-bold text-white hover:text-blue-300 flex items-center gap-2 group transition-all">
                        <span className="group-hover:-translate-x-2 transition-transform">←</span>
                        กลับสู่หน้า Portfolio หลัก
                    </Link>
                </div>
            </main>
        </div>
    );
}