// components/HeroSectionROI.tsx
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

// Key Marketing Data
const HERO_CONTENT = {
    headline: "FUTURE READY TECH: ยกระดับธุรกิจของคุณสู่ปี 2026 🚀",
    subhead: "เราคือผู้นำด้าน High-Performance Web Architecture ในไทย มอบประสบการณ์ที่เร็วกว่าด้วย Next.js 16 + AI Integration เพื่อผลลัพธ์ทางธุรกิจที่จับต้องได้จริง",
    proof: "พิสูจน์แล้ว! ด้วยคะแนน Core Web Vitals 100/100 ในทุกโปรเจกต์ปี 2025 (Ready for 2026)",
    cta2Text: "คุยเรื่องกลยุทธ์ Tech 2026",
    cta2Link: "/contact?type=consultation",
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