// app/portfolio/innovation-control/page.tsx
import GooeyBackground from '@/components/GooeyBackground';
import { Metadata } from 'next';
import Link from 'next/link';
import { GRADIENT_TEXT_CLASS } from '@/constants/data';

export const metadata: Metadata = {
    title: 'Innovation & Universal Control - Microtronic',
    description: 'ผลงาน Proof-of-Concept และการวิจัยที่ก้าวล้ำ เช่น การเชื่อมต่อเว็บไซต์กับฮาร์ดแวร์ภายนอก (Web Serial/USB/Bluetooth) และการประยุกต์ใช้ AI',
};

const innovationProjects = [
    {
        title: 'Micro Smart Home IoT',
        description: 'ระบบควบคุมบ้านอัศจริยที่เชื่อมต่อผ่าน Web Dashboard และ Mobile App รองรับการสั่งงานด้วยเสียงและการตั้งค่า Automation ตามเงื่อนไขต่างๆ',
        stack: 'React, Node.js, MQTT, ESP32, C++',
        focus: 'Seamless Hardware Integration',
        icon: '🏠'
    },
    {
        title: 'Smart Farm Precision Agriculture',
        description: 'โซลูชันเพื่อการเกษตรแม่นยำสูง วัดค่าดิน น้ำ อากาศ แบบ Real-time และควบคุมระบบให้น้ำ/ปุ๋ยอัตโนมัติผ่านระบบ Cloud',
        stack: 'Next.js, Python, InfluxDB, LoRaWAN',
        focus: 'Data-Driven Agriculture',
        icon: '🚜'
    },
    {
        title: 'Web Serial Hardware Controller',
        description: 'โปรเจกต์วิจัยการควบคุมอุปกรณ์โรงงานผ่าน Browser โดยตรงไม่ต้องผ่าน Driver กลาง เพิ่มความสะดวกในการซ่อมบำรุงและวินิจฉัย',
        stack: 'Web Serial API, React, TypeScript',
        focus: 'Direct Hardware Access',
        icon: '⚙️'
    }
];

export default function InnovationControlPage() {
    return (
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-linear-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px] relative overflow-hidden">
            <GooeyBackground />

            <main className="container mx-auto max-w-7xl flex flex-col gap-8 relative z-10">
                <header>
                    <h1 className={`text-4xl font-extrabold sm:text-6xl mb-4 ${GRADIENT_TEXT_CLASS}`}>
                        💡 Innovation & Control
                    </h1>
                    <p className="text-xl text-gray-200 max-w-3xl leading-relaxed">
                        ทลายกำแพงระหว่างโลกดิจิทัลและโลกกายภาพ เราก้าวข้ามขีดจำกัดของเว็บแอปพลิเคชันสู่นวัตกรรมที่ควบคุมและสื่อสารกับฮาร์ดแวร์และ AI ได้อย่างราบรื่น
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                    {innovationProjects.map((project, index) => (
                        <div
                            key={index}
                            className="group p-8 bg-white/5 rounded-2xl backdrop-blur-xl shadow-2xl border border-white/10 hover:border-fuchsia-400/50 transition-all duration-500"
                        >
                            <div className="text-5xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                                {project.icon}
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight group-hover:text-fuchsia-300 transition-colors">
                                {project.title}
                            </h2>
                            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                                {project.description}
                            </p>
                            <div className="space-y-2">
                                <div className="text-xs font-mono text-fuchsia-400 uppercase tracking-widest">Stack</div>
                                <div className="text-xs font-medium text-white/80">{project.stack}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 flex justify-center">
                    <Link href="/portfolio" className="text-xl font-bold text-white hover:text-fuchsia-300 flex items-center gap-2 group transition-all">
                        <span className="group-hover:-translate-x-2 transition-transform">←</span>
                        กลับสู่หน้า Portfolio หลัก
                    </Link>
                </div>
            </main>
        </div>
    );
}