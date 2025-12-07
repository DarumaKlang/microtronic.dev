// src/app/pricing/page.tsx

import GooeyBackground from '@/components/GooeyBackground';
import Link from 'next/link';
import { Metadata } from 'next'; // นำเข้า Metadata
import { ChevronRight, Zap, Code, Star, Heart } from 'lucide-react'; // นำเข้าไอคอนจาก lucide-react

// 3.2: SEO สำหรับหน้า Pricing
export const metadata: Metadata = {
    title: 'แผนราคาและบริการพัฒนาเว็บไซต์ Next.js | Microtronic',
    description: 'ราคา Full Service Web Development ด้วย Next.js และ TypeScript สำหรับ SMEs และ E-commerce ตั้งแต่ 15,000 บาท พร้อมโค้ดเริ่มต้นราคาประหยัด',
    keywords: ['ราคาเว็บไซต์ Next.js', 'Web Development Pricing', 'Full Service Web SME', 'Next.js E-commerce ราคา'],
};


// ข้อมูลโครงสร้างราคา
const pricingPlans = [
    {
        name: 'Landing Page / One-Page',
        description: 'เว็บไซต์หน้าเดียวจบ ครบทุกอย่าง (Full Service)',
        price: '15,000 - 25,000 บาท',
        tech: 'Next.js/TS/Tailwind',
        isPrimary: false,
        features: [
            '1 หน้าเว็บไซต์หลัก (Full Service)',
            'เน้น Conversion และประสิทธิภาพสูง (Lighthouse 95+)',
            'Responsive Design',
            'รวมบริการติดตั้งและ Deploy บน Vercel',
            'ออกแบบตาม Brand Identity (Basic)'
        ],
        icon: Zap,
    },
    {
        name: 'Corporate / Multi-Page',
        description: 'เว็บไซต์ธุรกิจแบบหลายหน้า (Full Service)',
        price: '30,000 - 60,000 บาท',
        tech: 'Next.js/TS/Tailwind + CMS',
        isPrimary: true, // เน้นแพ็กเกจนี้
        features: [
            '5-7 หน้าเว็บไซต์ (Full Service)',
            'มีระบบจัดการเนื้อหา (CMS) ใช้งานง่าย',
            'รองรับ SEO ขั้นสูง (On-page Optimization)',
            'รวมบริการติดตั้งและ Deploy',
            'รับประกัน Support 3 เดือน'
        ],
        icon: Star,
    },
    {
        name: 'Pro-Platform / E-commerce',
        description: 'เว็บไซต์/แพลตฟอร์มที่มีระบบ Login และ Database',
        price: '60,000 - 150,000+ บาท',
        tech: 'Next.js/TS/Backend/DB',
        isPrimary: false,
        features: [
            'ระบบสมาชิก/Login/Authentication',
            'ระบบฐานข้อมูล (Database) และ ORM',
            'E-commerce หรือ ระบบจอง/จัดการพิเศษ',
            'ความปลอดภัยสูง (Security First)',
            'Custom Feature Development'
        ],
        icon: Heart,
    },
];

// Component สำหรับ Pricing Card (เน้นการใช้ Tailwind CSS)
const PricingCard: React.FC<{ plan: typeof pricingPlans[0] }> = ({ plan }) => {
    const CardIcon = plan.icon;
    const primaryClasses = plan.isPrimary
        ? 'border-fuchsia-400 ring-4 ring-fuchsia-500/50 bg-white/5 backdrop-blur-sm'
        : 'border-blue-700 bg-white/3 backdrop-blur-xs';

    return (
        <div className={`
            relative flex flex-col p-6 rounded-3xl shadow-2xl transition-all duration-300 transform hover:scale-[1.03]
            border ${primaryClasses}
            text-white h-full
        `}>
            {plan.isPrimary && (
                <div className="absolute top-0 right-0 -mt-4 -mr-4 px-4 py-1 bg-fuchsia-600 rounded-full text-sm font-bold shadow-lg transform rotate-6">
                    แนะนำ!
                </div>
            )}
            <div className="mb-4 flex items-center gap-3">
                <CardIcon className="w-8 h-8 text-fuchsia-400" />
                <h3 className="text-2xl font-extrabold">{plan.name}</h3>
            </div>
            <p className="text-gray-300 text-sm mb-4 grow">{plan.description}</p>

            <div className="my-6">
                <p className="text-4xl font-black text-white">{plan.price}</p>
                <p className="text-sm text-gray-400 mt-1">เริ่มต้นด้วย {plan.tech}</p>
            </div>

            <ul className="space-y-3 text-sm mb-8">
                {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-1 text-fuchsia-400 shrink-0" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            {/* CTA 2 (Authority/Deep Trust) - มุ่งไปที่การติดต่อ */}
            <Link
                href="/contact"
                className={`
                    mt-auto block w-full text-center py-3 rounded-xl font-bold transition-colors duration-200
                    ${plan.isPrimary
                        ? 'bg-fuchsia-500 hover:bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-500/50'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }
                `}
            >
                เริ่มต้นโปรเจกต์
            </Link>
        </div>
    );
};

// Component หลักสำหรับหน้า Pricing
export default function PricingPage() {
    return (
        // แก้ไข class 'bg-linear-to-br' เป็น 'bg-gradient-to-br'
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-linear-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px] relative overflow-hidden">
            <GooeyBackground />

            <main className="container mx-auto max-w-7xl flex flex-col gap-12 relative z-10">

                {/* Header Section */}
                <header className="text-center max-w-3xl mx-auto">
                    <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-linear-to-r from-fuchsia-400 to-blue-300">
                        แผนราคาที่เหมาะสมกับคุณ
                    </h1>
                    <p className="text-xl text-gray-300">
                        ไม่ว่าคุณจะเป็นธุรกิจขนาดเล็ก หรือองค์กรขนาดใหญ่ เรามีแผนพัฒนาเว็บไซต์ Next.js/TypeScript ที่ตอบโจทย์งบประมาณและเป้าหมายของคุณ
                    </p>
                </header>

                {/* Pricing Cards - Full Service */}
                <section className="grid md:grid-cols-3 gap-8">
                    {pricingPlans.map((plan, index) => (
                        <PricingCard key={index} plan={plan} />
                    ))}
                </section>

                {/* Add-ons & Template Codes Section */}
                <section className="mt-8 pt-8 border-t border-gray-700">
                    <h2 className="text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-linear-to-r from-blue-300 to-fuchsia-400">
                        บริการเสริม & โค้ดเริ่มต้น (DIY Options)
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* 4. Advanced Integration */}
                        <div className="p-6 rounded-2xl border border-blue-700 bg-white/5 text-white shadow-xl transition-transform hover:scale-[1.02]">
                            <div className="flex items-center gap-3 mb-3">
                                <Zap className="w-6 h-6 text-fuchsia-400" />
                                <h3 className="text-xl font-bold">4. Advanced Integration</h3>
                            </div>
                            <p className="text-gray-300 mb-4 grow">
                                ระบบเชื่อมโยง Social Media, API ภายนอก, หรือระบบพิเศษอื่นๆ (เช่น LNbits Integration)
                            </p>
                            <div className="text-3xl font-black text-white mb-6">
                                เริ่มต้น 8,000 บาท
                            </div>
                            <p className="text-sm text-gray-400">
                                (ราคาต่อฟังก์ชัน, ต้องมีแพ็กเกจหลัก 1-3)
                            </p>
                        </div>

                        {/* 5.1 Micro-Template (HTML Only) - CTA 1: Quick Win/Budget */}
                        <div className="p-6 rounded-2xl border border-blue-700 bg-white/5 text-white shadow-xl flex flex-col transition-transform hover:scale-[1.02]">
                            <div className="flex items-center gap-3 mb-3">
                                <Code className="w-6 h-6 text-blue-300" />
                                <h3 className="text-xl font-bold">5.1 Micro-Template (HTML Only)</h3>
                            </div>
                            <p className="text-gray-300 mb-4 grow">
                                โค้ดดิบ HTML/CSS/JS ธรรมดา (1 หน้า) สำหรับผู้ที่ต้องการโค้ดราคาประหยัด
                            </p>
                            <div className="text-3xl font-black text-white mb-6">
                                990 - 1,500 บาท
                            </div>
                            <p className="text-sm text-red-400 mb-6">
                                (โค้ดดิบ DIY: ไม่มีติดตั้ง, ไม่มี Deploy, ไม่มี Support)
                            </p>
                            <Link href="/templates/micro" className="mt-auto block w-full text-center py-3 rounded-xl font-bold transition-colors duration-200 bg-gray-600 hover:bg-gray-700 text-white">
                                ดูตัวอย่าง & ซื้อโค้ด
                            </Link>
                        </div>

                        {/* 5.2 Starter Template (Next.js Code) - CTA 1: Quick Win/Tech-savvy */}
                        <div className="p-6 rounded-2xl border border-blue-700 bg-white/5 text-white shadow-xl flex flex-col transition-transform hover:scale-[1.02]">
                            <div className="flex items-center gap-3 mb-3">
                                <Code className="w-6 h-6 text-blue-300" />
                                <h3 className="text-xl font-bold">5.2 Starter Template (Next.js Code)</h3>
                            </div>
                            <p className="text-gray-300 mb-4 grow">
                                โค้ดดิบ Next.js/TS/Tailwind (1 หน้า) สำหรับนักพัฒนาที่ต้องการ Tech Stack ที่ดีที่สุด
                            </p>
                            <div className="text-3xl font-black text-white mb-6">
                                2,900 บาท
                            </div>
                            <p className="text-sm text-red-400 mb-6">
                                (โค้ดดิบ DIY: ไม่มีติดตั้ง, ไม่มี Deploy, ไม่มี Support)
                            </p>
                            <Link href="/templates/starter" className="mt-auto block w-full text-center py-3 rounded-xl font-bold transition-colors duration-200 bg-blue-500 hover:bg-blue-600 text-white">
                                ดูตัวอย่าง & ซื้อโค้ด
                            </Link>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}