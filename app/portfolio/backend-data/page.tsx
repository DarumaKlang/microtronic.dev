// app/portfolio/backend-data/page.tsx
import GooeyBackground from '@/components/GooeyBackground';
import { Metadata } from 'next';
// ... (Metadata และ Projects Data ที่เกี่ยวข้อง)

export const metadata: Metadata = {
    title: 'Backend & Data Engineering Excellence - Microtronic',
    description: 'ผลงานที่แสดงความเชี่ยวชาญในการจัดการข้อมูล การสร้าง API ที่ปลอดภัย และการใช้ ORM (Prisma/Drizzle) ร่วมกับ PostgreSQL',
};

// (ข้อมูล Projects Data คล้ายด้านบน)

export default function BackendDataPage() {
    return (
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-linear-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px]">
            <GooeyBackground />

            <main className="container mx-auto max-w-7xl flex flex-col gap-8 relative z-10">
                <h1 className="text-4xl font-extrabold sm:text-5xl text-green-300">
                    ⚙️ Backend & Data Engineering Excellence
                </h1>
                {/* ... (เนื้อหาและ list ของ Projects) */}
            </main>
        </div>
    );
}