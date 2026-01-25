// app/portfolio/innovation-control/page.tsx
import GooeyBackground from '@/components/GooeyBackground';
import { Metadata } from 'next';
import Link from 'next/link';
import { GRADIENT_TEXT_CLASS } from '@/constants/data';

export const metadata: Metadata = {
    title: 'Innovation & Universal Control - Microtronic',
    description: 'ผลงาน Proof-of-Concept และการวิจัยที่ก้าวล้ำ เช่น การเชื่อมต่อเว็บไซต์กับฮาร์ดแวร์ภายนอก (Web Serial/USB/Bluetooth) และการประยุกต์ใช้ AI',
};

interface InnovationProject {
    title: string;
    description: string;
    stack: string;
    focus: string;
    icon: string;
    github?: string;
    link?: string;
}

const innovationProjects: InnovationProject[] = [
    {
        title: 'Micro Smart Home IoT',
        description: 'ระบบควบคุมบ้านอัศจริยที่เชื่อมต่อผ่าน Web Dashboard และ Mobile App รองรับการสั่งงานด้วยเสียงและการตั้งค่า Automation ตามเงื่อนไขต่างๆ',
        stack: 'React, Node.js, MQTT, ESP32, C++',
        focus: 'Seamless Hardware Integration',
        icon: '🏠',
        github: 'https://github.com/GhostMicro/micro-iot-smart-home'
    },
    {
        title: 'Smart Farm Precision Agriculture',
        description: 'โซลูชันเพื่อการเกษตรแม่นยำสูง วัดค่าดิน น้ำ อากาศ แบบ Real-time และควบคุมระบบให้น้ำ/ปุ๋ยอัตโนมัติผ่านระบบ Cloud',
        stack: 'Next.js, Python, InfluxDB, LoRaWAN',
        focus: 'Data-Driven Agriculture',
        icon: '🚜',
        github: 'https://github.com/GhostMicro/micro-iot-smart-farm'
    },
    {
        title: 'Micro IoT Dashboard & Hardware Controller',
        description: 'ศูนย์กลางการจัดการและแสดงผลข้อมูล IoT แบบ Real-time พร้อมความสามารถในการควบคุมฮาร์ดแวร์ผ่าน Browser โดยตรง (Web Serial) เพื่อความสะดวกในการวิจัยและวินิจฉัยอุปกรณ์',
        stack: 'Next.js, Tailwind CSS, Web Serial API, MQTT, WebSocket',
        focus: 'Real-time Control & Data Visualization',
        icon: '📊',
        github: 'https://github.com/GhostMicro/micro-iot-dashboard-hub',
        link: 'https://micro-iot-dashboard-hub.vercel.app/'
    },
    {
        title: 'THAP firmware autopilot',
        description: 'เครื่องมือช่วยเหลือในการพัฒนาระบบ autopilot สำหรับ robot และ uav ของไทย เพื่อสนับสนุนงานบรรเทาสาธารณภัยและกู้ภัย',
        stack: 'C++, Autopilot, Firmware, Robotics',
        focus: 'Public Safety & Rescue Operations',
        icon: '🚁',
        github: 'https://github.com/GhostMicro/micro-ai-robot-thap-firmware'
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
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="text-xs font-mono text-fuchsia-400 uppercase tracking-widest">Stack</div>
                                    <div className="text-xs font-medium text-white/80">{project.stack}</div>
                                </div>
                                <div className="flex flex-wrap gap-3 mt-4">
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-bold rounded-lg transition shadow-lg shadow-fuchsia-900/40"
                                        >
                                            Visit Website
                                            <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    )}
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg transition border border-white/20 group/btn"
                                        >
                                            Source Code
                                            <svg className="w-3 h-3 ml-2 transform group-hover/btn:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                            </svg>
                                        </a>
                                    )}
                                </div>
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