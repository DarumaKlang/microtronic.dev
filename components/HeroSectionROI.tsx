// components/HeroSectionROI.tsx
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

// Key Marketing Data
const HERO_CONTENT = {
    headline: "หยุดเสียลูกค้าไปกับเว็บไซต์ที่ช้า! 🚀 เพิ่ม Conversion 15% ด้วย High-Performance Web",
    subhead: "เราสร้างเว็บไซต์ที่ได้คะแนน Core Web Vitals 95+ โดยใช้ Next.js Server Components (RSC) และ Vercel เพื่อให้เว็บไซต์ของคุณเร็วขึ้น 300% และ SEO Friendly โดยสมบูรณ์",
    proof: "พิสูจน์แล้ว! ลูกค้า SMEs ของเราเห็น Page Load Time ลดลงเฉลี่ยเหลือ 0.9 วินาที (ดูตัวเลขจริงใน Portfolio)",
    cta2Text: "ขอคำปรึกษาเชิงลึกเรื่อง ROI",
    cta2Link: "/contact?type=consultation",

    // --- Lead Magnet Component Commented Out ---
    // cta1Text: "ทดลองใช้เครื่องมือฟรีของเรา", 
    // cta1Link: "/free-tool",
};

// This Component runs on the Server by default (RSC)
export default function HeroSectionROI() {
    return (
        <section className="text-center pt-8">
            <div className="container mx-auto px-4 text-center">

                {/* Main Headline (H1 - Focus on ROI) */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
                    {HERO_CONTENT.headline}
                </h1>

                {/* Subhead (Technical Value Prop) */}
                <p className="max-w-3xl mx-auto text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8">
                    {HERO_CONTENT.subhead}
                </p>

                {/* Social Proof Statement */}
                <p className="max-w-2xl mx-auto text-lg text-indigo-600 font-semibold mb-10 dark:text-indigo-400">
                    {HERO_CONTENT.proof}
                </p>

                {/* CTA Buttons (Now only showing CTA 2) */}
                <div className="flex flex-col md:flex-row justify-center gap-4">

                    {/* ---------------------------------------------------- */}
                    {/* CTA 1 (Agility/Quick Win) - COMMENTED OUT FOR FUTURE */}
                    {/*
          <Link 
            href={HERO_CONTENT.cta1Link} 
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 ease-in-out md:text-lg"
          >
            {HERO_CONTENT.cta1Text}
            <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
          */}
                    {/* ---------------------------------------------------- */}

                    {/* CTA 2 (Authority/Deep Trust - Now the primary focus) */}
                    <Link
                        href={HERO_CONTENT.cta2Link}
                        // ใช้ Style ของปุ่มหลัก เพื่อให้โดดเด่น แม้จะมีปุ่มเดียว
                        className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 ease-in-out md:text-lg"
                    >
                        {HERO_CONTENT.cta2Text}
                        <ChevronRight className="ml-2 h-5 w-5" />
                    </Link>

                </div>
            </div>
        </section>
    );
}