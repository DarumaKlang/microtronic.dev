// app/portfolio/page.tsx
import GooeyBackground from '@/components/GooeyBackground';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { GRADIENT_TEXT_CLASS, GLASS_PANEL_CLASS } from '@/constants/data';

export const metadata: Metadata = {
    title: 'Portfolio - Microtronic: High-Performance Web Solutions',
    description: 'ผลงานการออกแบบและพัฒนาเว็บไซต์ของ Microtronic ที่เน้น Next.js App Router, Typescript, และประสิทธิภาพระดับ RSC-First',
};

const portfolioCategories = [
    {
        icon: '🚀',
        title: 'High-Performance Web Applications',
        description: 'เน้นความเร็วในการโหลด (Page Load Time) และใช้ประโยชน์จาก React Server Components เพื่อประสิทธิภาพสูงสุด',
        href: '/portfolio/high-performance',
        colors: 'bg-blue-600/20 hover:bg-blue-600/40',
    },
    {
        icon: '⚙️',
        title: 'Backend & Data Excellence',
        description: 'การจัดการข้อมูลที่ปลอดภัย มีประสิทธิภาพ และน่าเชื่อถือ ด้วยการใช้ ORM และ Database สมัยใหม่',
        href: '/portfolio/backend-data',
        colors: 'bg-emerald-600/20 hover:bg-emerald-600/40',
    },
    {
        icon: '💡',
        title: 'Innovation & Control',
        description: 'โครงการนวัตกรรมล้ำสมัย เช่น Web Serial/USB และการใช้ AI เข้ามาช่วยเพิ่มศักยภาพของเว็บแอปพลิเคชัน',
        href: '/portfolio/innovation-control',
        colors: 'bg-pink-600/20 hover:bg-pink-600/40',
    },
];

export default function PortfolioPage() {
    return (
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white pt-[120px] pb-[100px] relative overflow-hidden">
            <GooeyBackground />

            <main className="container mx-auto max-w-7xl flex flex-col gap-16 relative z-10">
                <header className="text-center space-y-6">
                    <h1 className={`text-5xl font-extrabold tracking-tight sm:text-7xl ${GRADIENT_TEXT_CLASS}`}>
                        Our Next-Gen Portfolio
                    </h1>
                    <p className="mt-4 text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                        สะท้อนความเชี่ยวชาญด้าน Next.js App Router, TypeScript, และ High-Performance Development
                        <br />
                        <span className="text-blue-300 font-semibold italic text-lg">"ผลงานที่พิสูจน์ได้ด้วยความเร็วและความสำเร็จของธุรกิจคุณ"</span>
                    </p>
                </header>

                {/* New Product Launch Section */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px flex-1 bg-white/20"></div>
                        <h2 className="text-2xl font-bold uppercase tracking-widest text-blue-300">New Product Release</h2>
                        <div className="h-px flex-1 bg-white/20"></div>
                    </div>

                    <div className={`group relative grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-3xl ${GLASS_PANEL_CLASS} border-white/20 shadow-2xl`}>
                        <div className="p-8 lg:p-12 flex flex-col justify-center">
                            <span className="text-pink-400 font-bold tracking-tighter mb-2">SaaS SOLUTION</span>
                            <h3 className="text-4xl font-black mb-4">Micro Formula V1.0</h3>
                            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                                ไม่ใช่แค่ผลงาน แต่คือ <strong>โปรดักซ์ใหม่ล่าสุดของเรา!</strong> ระบบจัดการงานบัญชีที่ออกแบบมาเพื่อธุรกิจยุคใหม่ ยกระดับการจัดการงบการเงินด้วย Cloud Native Performance
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <a
                                    href="https://nextjs-micro-account.vercel.app/"
                                    target="_blank"
                                    className="px-8 py-3 bg-white text-blue-900 font-bold rounded-full hover:bg-blue-50 transition transform hover:scale-105 active:scale-95 shadow-xl"
                                >
                                    เข้าชมหน้า Landing Page
                                </a>
                                <Link
                                    href="/portfolio/high-performance"
                                    className="px-8 py-3 bg-blue-600/50 backdrop-blur-md text-white font-bold rounded-full hover:bg-blue-600/70 transition border border-white/20"
                                >
                                    Technical Specs
                                </Link>
                            </div>
                        </div>
                        <div className="bg-slate-800 relative min-h-[400px] flex items-center justify-center overflow-hidden">
                            <Image
                                src="/micro-formula-logo.png"
                                alt="Micro Formula"
                                fill
                                className="object-cover opacity-60 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                        </div>
                    </div>
                </section>

                {/* Categories Grid */}
                <section>
                    <h2 className="text-3xl font-bold mb-10 text-center">สำรวจตามหมวดหมู่</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {portfolioCategories.map((category) => (
                            <Link
                                key={category.title}
                                href={category.href}
                                className={`p-8 rounded-2xl shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${category.colors} border border-white/10 hover:border-white/40 flex flex-col justify-between group`}
                            >
                                <div>
                                    <div className="text-6xl mb-6 transform group-hover:rotate-12 transition-transform">{category.icon}</div>
                                    <h3 className="text-2xl font-black mb-4 tracking-tight">{category.title}</h3>
                                    <p className="text-gray-100 text-sm leading-relaxed opacity-90">
                                        {category.description}
                                    </p>
                                </div>
                                <div className="mt-8 text-sm font-bold flex items-center gap-2 group-hover:gap-4 transition-all text-white/50 group-hover:text-white">
                                    Expand Architecture <span className="text-xl">→</span>
                                </div>
                            </Link>
                        ))}

                        {/* Future Forge Placeholder */}
                        <div className="p-8 rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-center group cursor-wait hover:border-blue-500/30 transition-all duration-500">
                            <div className="text-5xl mb-6 grayscale group-hover:grayscale-0 transition-all">⛩️</div>
                            <h3 className="text-xl font-bold text-gray-500 group-hover:text-blue-400">Future Forge</h3>
                            <p className="text-gray-600 text-xs mt-2">
                                กำลังเจียระไนโปรเจกต์ใหม่...<br />
                                (Ready for Q2 2026)
                            </p>
                        </div>
                    </div>
                </section>

                {/* Trust & Future Commitment */}
                <section className={`p-10 ${GLASS_PANEL_CLASS} rounded-3xl text-center border-white/20`}>
                    <h2 className="text-3xl font-bold mb-6">ความมุ่งมั่นและก้าวต่อไปของเรา</h2>
                    <div className="max-w-4xl mx-auto space-y-6">
                        <p className="text-lg text-gray-200 leading-relaxed">
                            เราไม่เคยกดหยุดการพัฒนา ทุกโครงการที่เราสร้างขึ้นคือการผสมผสานระหว่างเทคโนโลยีที่ดีที่สุดและการแก้ปัญหาทางธุรกิจที่ตรงจุด
                        </p>
                        <div className="inline-block px-6 py-3 bg-white/10 rounded-full border border-white/20 text-blue-300 font-semibold animate-pulse">
                            🚨 พบกับผลงานใหม่ๆ อีกมากมาย เร็วๆ นี้! เราเตรียมเปิดตัวโครงการนวัตกรรมอีก 5+ โปรเจกต์ในไตรมาสถัดไป
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}