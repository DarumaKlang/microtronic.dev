// app/portfolio/innovation-control/page.tsx
import GooeyBackground from '@/components/GooeyBackground';
import { Metadata } from 'next';
// ... (Metadata และ Projects Data ที่เกี่ยวข้อง)

export const metadata: Metadata = {
    title: 'Innovation & Universal Control - Microtronic',
    description: 'ผลงาน Proof-of-Concept และการวิจัยที่ก้าวล้ำ เช่น การเชื่อมต่อเว็บไซต์กับฮาร์ดแวร์ภายนอก (Web Serial/USB/Bluetooth) และการประยุกต์ใช้ AI',
};

// (ข้อมูล Projects Data คล้ายด้านบน)

export default function InnovationControlPage() {
    return (
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-linear-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px]">
            <GooeyBackground />

            <main className="container mx-auto max-w-7xl flex flex-col gap-8 relative z-10">
                <h1 className="text-4xl font-extrabold sm:text-5xl text-fuchsia-300">
                    💡 Innovation & Universal Control
                </h1>
                {/* ... (เนื้อหาและ list ของ Projects) */}
            </main>
        </div>
    );
}