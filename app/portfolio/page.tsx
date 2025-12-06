// app/portfolio/page.tsx
import GooeyBackground from '@/components/GooeyBackground';
import Link from 'next/link';
import { Metadata } from 'next';

// กำหนด Metadata สำหรับ SEO
export const metadata: Metadata = {
    title: 'Portfolio - Microtronic: High-Performance Web Solutions',
    description: 'ผลงานการออกแบบและพัฒนาเว็บไซต์ของ Microtronic ที่เน้น Next.js App Router, Typescript, และประสิทธิภาพระดับ RSC-First',
};

// ข้อมูลสำหรับ Portfolio Categories
const portfolioCategories = [
    {
        icon: '🚀',
        title: 'High-Performance Web Applications (RSC-First)',
        description: 'ผลงานที่เน้นความเร็วในการโหลด (Page Load Time) และใช้ประโยชน์จาก React Server Components เพื่อประสิทธิภาพที่เหนือกว่าคู่แข่ง',
        href: '/portfolio/high-performance',
        colors: 'bg-indigo-700 hover:bg-indigo-600',
    },
    {
        icon: '⚙️',
        title: 'Backend & Data Engineering Excellence (ORM-Driven)',
        description: 'การจัดการข้อมูลที่ปลอดภัย มีประสิทธิภาพ และน่าเชื่อถือ ด้วยการใช้ ORM (Prisma/Drizzle) และฐานข้อมูล PostgreSQL',
        href: '/portfolio/backend-data',
        colors: 'bg-green-700 hover:bg-green-600',
    },
    {
        icon: '💡',
        title: 'Innovation & Universal Control (The Future)',
        description: 'โครงการ Proof-of-Concept และนวัตกรรมล้ำสมัย เช่น การผสาน Web App เข้ากับโลกกายภาพผ่าน Web Serial/USB และการใช้ AI/Wasm',
        href: '/portfolio/innovation-control',
        colors: 'bg-fuchsia-700 hover:bg-fuchsia-600',
    },
];

export default function PortfolioPage() {
    return (
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-linear-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px]">
            <GooeyBackground />

            <main className="container mx-auto max-w-7xl flex flex-col gap-12 relative z-10">

                <header className="text-center mb-8">
                    <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-fuchsia-300">
                        Our Next-Gen Portfolio
                    </h1>
                    <p className="mt-4 text-xl text-gray-200 max-w-3xl mx-auto">
                        สะท้อนความเชี่ยวชาญด้าน Next.js App Router, TypeScript, และ High-Performance Development
                    </p>
                </header>

                {/* Grid แสดงหมวดหมู่ */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {portfolioCategories.map((category) => (
                        <Link 
                            key={category.title} 
                            href={category.href} 
                            className={`p-6 rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-[1.03] ${category.colors} border border-transparent hover:border-white/50 flex flex-col justify-between`}
                        >
                            <div>
                                <div className="text-6xl mb-4">{category.icon}</div>
                                <h2 className="text-2xl font-bold mb-3">{category.title}</h2>
                                <p className="text-gray-200 text-sm">
                                    {category.description}
                                </p>
                            </div>
                            <div className="mt-4 text-sm font-semibold flex items-center">
                                ดูผลงานในหมวดนี้ →
                            </div>
                        </Link>
                    ))}
                </div>

                {/* ส่วนสรุปความเชื่อมั่น */}
                <section className="mt-10 p-8 bg-white/10 backdrop-blur-sm rounded-xl shadow-inner border border-white/20">
                    <h2 className="text-3xl font-bold mb-3">ทำไมต้องเลือกเรา?</h2>
                    <p className="text-lg text-gray-100">
                        เราใช้เทคโนโลยีที่ล้ำหน้าที่สุด (Next.js RSC) เพื่อสร้างเว็บแอปพลิเคชันที่รวดเร็ว ปลอดภัย และมี Scalability สูง เพื่อให้ธุรกิจของคุณเติบโตได้อย่างยั่งยืน
                    </p>
                </section>

            </main>
        </div>
    );
}