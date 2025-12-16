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
// ข้อมูลโครงสร้างราคา - อัปเดตตตาม Package Combos
const pricingPlans = [
    {
        name: 'Starter Kit',
        description: 'เว็บไซต์โปรไฟล์/Landing Page สำหรับธุรกิจขนาดเล็ก (Ready to Deploy)',
        price: '7,990 บาท', // จากเดิม 8,500
        tech: 'Next.js + Tailwind CSS',
        isPrimary: false,
        features: [
            'Source Code Template (เลือกได้)',
            'ติดตั้งและ Deploy บน Vercel ฟรี',
            'ตั้งค่า Domain Name ส่วนตัว',
            'แถมฟรี! SSL Certificate (https)',
            'คู่มือการใช้งานพื้นฐาน'
        ],
        icon: Zap,
    },
    {
        name: 'Business Set',
        description: 'เว็บไซต์บริษัทพร้อมระบบจัดการเนื้อหา (CMS) แก้ไขข้อมูลได้เอง',
        price: '12,900 บาท', // จากเดิม 13,500
        tech: 'Next.js + Headless CMS',
        isPrimary: true, // Best Seller
        features: [
            'ทุกอย่างใน Starter Kit',
            'เชื่อมต่อระบบจัดการเนื้อหา (CMS)',
            'Admin Dashboard แก้ไขข้อมูลง่าย',
            'สอนการใช้งานระบบ 30 นาที',
            'บริการปรับแต่งโค้ดเล็กน้อย (1 ชม.)'
        ],
        icon: Star,
    },
    {
        name: 'Premium Kit',
        description: 'โซลูชั่นไร้กังวล ดูแลรักษาและอัปเดตระบบให้ตลอด 1 ปี',
        price: '22,900 บาท', // จากเดิม 24,500
        tech: 'Full Managed Service',
        isPrimary: false,
        features: [
            'ทุกอย่างใน Business Set',
            'บริการดูแลรักษา (Maintenance) 1 ปี',
            'อัปเดต Dependencies และความปลอดภัย',
            'แก้ไขบั๊กและตรวจสอบระบบรายเดือน',
            'Support ระดับ Priority (Line OA)'
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

                {/* Custom Enterprise Section - แยกออกมาให้ชัดเจน */}
                <section className="mt-8 pt-8 border-t border-gray-700">
                    <div className="bg-gradient-to-r from-emerald-900/40 to-blue-900/40 border border-emerald-500/30 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"></div>

                        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                            <div>
                                <h2 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400">
                                    Custom Enterprise Solution
                                </h2>
                                <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                                    สำหรับองค์กรที่ต้องการระบบที่ซับซ้อน รองรับ Traffic สูง และมีความปลอดภัยระดับ Enterprise
                                    เราออกแบบ Architecture ใหม่ทั้งหมดเพื่อธุรกิจของคุณโดยเฉพาะ
                                </p>
                                <ul className="space-y-3 mb-8">
                                    {[
                                        'Custom Design & UX/UI ที่ออกแบบเฉพาะแบรนด์',
                                        'Database Design & High Performance API',
                                        'ระบบ Payment Gateway & E-commerce เต็มรูปแบบ',
                                        'ระบบหลังบ้าน (Back-office) ที่ซับซ้อน',
                                        'SLA Guarantee & 24/7 Support'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-200">
                                            <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">✓</div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/contact?type=enterprise"
                                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-xl bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white shadow-lg shadow-emerald-600/30 transition-all duration-200"
                                >
                                    นัดปรึกษาโครงการ (ฟรี)
                                </Link>
                            </div>

                            <div className="bg-black/30 rounded-2xl p-8 border border-white/10 text-center">
                                <p className="text-gray-400 mb-2">งบประมาณเริ่มต้น</p>
                                <div className="text-5xl sm:text-6xl font-black text-white mb-4 tracking-tight">
                                    120,000<span className="text-2xl text-emerald-400 align-top">+</span>
                                </div>
                                <p className="text-emerald-400 font-bold text-xl mb-6">บาท / โครงการ</p>
                                <p className="text-sm text-gray-500 border-t border-white/10 pt-4">
                                    *ราคาประเมินตามขอบเขตงาน (Scope of Work)<br />
                                    ระยะเวลาพัฒนา 4-8 สัปดาห์
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}