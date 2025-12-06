// app/page.tsx
import Link from 'next/link';

// Component จำลองสำหรับ SaaS Showcase ที่จะสร้างในภายหลัง
// import SaaSSection from '@/src/components/SaaSSection';

export default function HomePage() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-4 md:p-12">

            {/* Hero Section - Goal 1.1, 2.2, 2.3 */}
            <section className="text-center max-w-4xl mb-20 space-y-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-indigo-500">
                    Next.js 14 | RSC-First Architecture
                </p>

                <h1 className="text-5xl sm:text-7xl font-extrabold text-gray-900 leading-tight">
                    🚀 เพิ่ม Conversion <span className="text-green-600">15%</span>
                    <br className="hidden md:inline" />
                    ด้วย <span className="text-indigo-600">Next.js Data Flow</span> ที่เร็วกว่า
                </h1>

                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    เราสร้างและปรับปรุง **SaaS สำหรับ SMEs** โดยเฉพาะ โดยเน้นที่ **Performance (TTI/CLS)** และการออกแบบที่ผลักดันให้เกิดยอดขาย/Lead
                </p>

                {/* CTA Group: Quick Win (Consult) + Deep Trust (Audit) */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                    <Link
                        href="/contact"
                        className="px-8 py-3 text-lg font-bold text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 transition-colors"
                    >
                        🔥 รับคำปรึกษาเร่งด่วน (Quick Win)
                    </Link>
                    <Link
                        href="/audit"
                        className="px-8 py-3 text-lg font-semibold text-indigo-600 bg-white border-2 border-indigo-600 rounded-lg shadow-md hover:bg-indigo-50 transition-colors"
                    >
                        📊 ขอ Free Performance Audit (Deep Trust)
                    </Link>
                </div>
            </section>

            {/* Showcase Components (Will be added in later steps) */}
            {/* <SaaSSection /> */}
            {/* <WorkShowcase /> */}

        </main>
    );
}