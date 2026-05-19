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

                {/* FIX #1: เปลี่ยนจาก text-gray-700 (Light Mode) เป็น text-gray-300 เพื่อให้อ่านได้บน Dark Background */}
                <p className="max-w-3xl mx-auto text-xl md:text-2xl text-gray-300 mb-8">
                    {HERO_CONTENT.subhead}
                </p>

                {/* FIX #1: เปลี่ยนจาก text-indigo-600 เป็น text-blue-400 ให้เข้ากับ Dark Mode */}
                <p className="max-w-2xl mx-auto text-lg text-blue-400 font-semibold mb-10">
                    {HERO_CONTENT.proof}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col md:flex-row justify-center gap-4">
                    {/* FIX #1: เปลี่ยนจาก bg-indigo-600 เป็น bg-blue-600 ให้สอดคล้องกับ Design System */}
                    <Link
                        href={HERO_CONTENT.cta2Link}
                        className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-blue-600 hover:bg-blue-500 transition duration-150 ease-in-out md:text-lg shadow-blue-500/20"
                    >
                        {HERO_CONTENT.cta2Text}
                        <ChevronRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}