// src/app/asset/crypto-analysis/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
// GooeyBackground และ GlassmorphismCard ถูกนำเข้าตามที่โค้ดก่อนหน้ากำหนด (สมมติว่า GooeyBackground มีอยู่จริง)
// เราจะใช้ GooeyBackground และนำเข้า GlassmorphismCard แต่ใช้สไตล์ที่กำหนดเองเพื่อให้คุณควบคุมรูปลักษณ์ได้ง่าย
import GooeyBackground from '@/components/GooeyBackground';
import GlassmorphismCard from '@/components/GlassmorphismCard';

// Metadata สำหรับหน้านี้
export const metadata: Metadata = {
    title: 'Crypto Market Analysis | Microtronic',
    description: 'แนวทางการวิเคราะห์ตลาดคริปโต 3 เสาหลัก: Fundamental, Technical, และ On-Chain พร้อมกลยุทธ์ลงทุนปลอดภัย',
};

// Component สำหรับการ์ดวิเคราะห์หลัก (Glassmorphism Style)
interface AnalysisCardProps {
    title: string;
    icon: string;
    description: string;
    children: React.ReactNode;
}

const AnalysisCard: React.FC<AnalysisCardProps> = ({ title, icon, description, children }) => (
    // ใช้สไตล์ Glassmorphism ที่กำหนดเองเพื่อให้ดูสวยงามและเข้ากับธีม
    <div className="bg-white/10 p-6 rounded-2xl shadow-2xl border border-fuchsia-400/30 backdrop-blur-lg transition-all duration-300 hover:shadow-fuchsia-500/50 hover:scale-[1.03] flex flex-col">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-2xl font-bold mb-3 text-fuchsia-300">{title}</h3>
        <p className="text-sm opacity-90 mb-4 flex-grow">{description}</p>
        <div className="mt-auto pt-4 border-t border-white/20">
            {children}
        </div>
    </div>
);

// Component สำหรับหัวข้อกลยุทธ์
interface StrategyPointProps {
    title: string;
    icon: string;
    content: string;
}

const StrategyPoint: React.FC<StrategyPointProps> = ({ title, icon, content }) => (
    <div className="flex items-start space-x-4 p-4 border-l-4 border-fuchsia-500 rounded-md bg-white/5 hover:bg-white/10 transition-colors">
        <div className="text-3xl flex-shrink-0">{icon}</div>
        <div>
            <h4 className="text-xl font-bold text-white mb-1">{title}</h4>
            <p className="text-base opacity-85">{content}</p>
        </div>
    </div>
);


// Component หลักสำหรับหน้า Crypto Market Analysis
export default function CryptoAnalysisPage() {
    return (
        // ใช้ class สำหรับ gradient background และ text-white ตามธีมของหน้าแรก
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-gradient-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px]">
            {/* GooeyBackground ถูกนำมาใช้เพื่อให้พื้นหลังดูมีมิติ */}
            {/* หาก GooeyBackground ยังไม่มีโค้ด โปรเจกต์จะไม่ Error แต่จะไม่เห็น effect */}
            <GooeyBackground />

            <main className="container mx-auto max-w-7xl flex flex-col gap-16 relative z-10">
                {/* Header Section */}
                <header className="text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-fuchsia-400">
                        แนวทางการวิเคราะห์ตลาดคริปโต 📈
                    </h1>
                    <p className="text-lg sm:text-xl font-light max-w-3xl mx-auto opacity-90">
                        การวิเคราะห์ตลาดคริปโตนั้นแตกต่างจากตลาดการเงินแบบดั้งเดิม เพราะนอกจากจะต้องพิจารณาปัจจัยพื้นฐานและราคาแล้ว
                        ยังต้องเจาะลึกไปถึงกิจกรรมที่เกิดขึ้นบนบล็อกเชนโดยตรงด้วย แนวทางการวิเคราะห์หลักมี <strong>3 เสา</strong> ได้แก่ <strong>Fundamental Analysis (FA), Technical Analysis (TA)</strong> และ <strong>On-Chain Analysis (OCA)</strong>
                    </p>
                </header>

                {/* 3 เสาหลักของการวิเคราะห์ */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">

                    {/* Card 1: Fundamental Analysis */}
                    <AnalysisCard
                        title="1. การวิเคราะห์ปัจจัยพื้นฐาน (FA)"
                        icon="🌱"
                        description="การประเมินมูลค่าที่แท้จริงและศักยภาพในระยะยาวของโครงการบล็อกเชนหรือเหรียญนั้น ๆ"
                    >
                        <h4 className="font-semibold text-fuchsia-300 mt-4 mb-2">🔹 การประเมินโครงการ</h4>
                        <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                            <li><strong>Use Case และการแก้ปัญหา:</strong> โครงการมีจุดประสงค์และการใช้งานจริงที่ชัดเจนหรือไม่?</li>
                            <li><strong>ทีมงานและพันธมิตร:</strong> ความน่าเชื่อถือและการพัฒนาโค้ดอย่างต่อเนื่อง</li>
                        </ul>
                        <h4 className="font-semibold text-fuchsia-300 mt-4 mb-2">🔹 Tokenomics</h4>
                        <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                            <li><strong>อุปทาน (Supply):</strong> Max Supply และ Vesting Schedule</li>
                            <li><strong>การกระจายเหรียญ (Distribution):</strong> อยู่ในมือของ Whales หรือรายย่อย</li>
                        </ul>
                    </AnalysisCard>

                    {/* Card 2: Technical Analysis */}
                    <AnalysisCard
                        title="2. การวิเคราะห์ทางเทคนิค (TA)"
                        icon="📊"
                        description="การใช้ข้อมูลราคาและปริมาณการซื้อขายในอดีต เพื่อคาดการณ์ทิศทางราคาและหาจังหวะในการเข้าออกตลาด"
                    >
                        <h4 className="font-semibold text-fuchsia-300 mt-4 mb-2">🔹 Indicators</h4>
                        <ul className="list-disc list-inside text-sm space-y-2 mt-4 ml-4">
                            <li><strong>เครื่องชี้วัด (Indicators):</strong> <strong>RSI</strong> (Overbought/Oversold) และ <strong>MACD</strong></li>
                        </ul>
                        <h4 className="font-semibold text-fuchsia-300 mt-4 mb-2">🔹 Trend</h4>
                        <ul className="list-disc list-inside text-sm space-y-2 mt-4 ml-4 mb-1">
                            <li><strong>แนวโน้ม (Trend):</strong> ใช้ <strong>Moving Averages (MA 50, MA 200)</strong></li>
                            <li><strong>แนวรับและแนวต้าน (S&R):</strong> ระดับราคาสำคัญที่มีแรงซื้อหรือแรงขาย</li>
                        </ul>
                    </AnalysisCard>

                    {/* Card 3: On-Chain Analysis */}
                    <AnalysisCard
                        title="3. การวิเคราะห์ On-Chain (OCA)"
                        icon="🔗"
                        description="การใช้ประโยชน์จากความโปร่งใสของบล็อกเชน เพื่อวิเคราะห์พฤติกรรมของผู้เข้าร่วมตลาดที่แท้จริง"
                    >
                        <table className="w-full text-left text-sm mt-4 mb-10 border-collapse">
                            <thead>
                                <tr className="border-b border-fuchsia-500/50">
                                    <th className="py-2 pr-2 font-bold">ตัวชี้วัด</th>
                                    <th className="py-2 pl-2 font-bold">สัญญาณการตีความ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-white/10">
                                    <td className="py-2 pr-2">Exchange Net Flow</td>
                                    <td className="py-2 pl-2">ติดลบ = <strong>Bullish</strong>, เป็นบวก = <strong>Bearish</strong></td>
                                </tr>
                                <tr className="border-b border-white/10">
                                    <td className="py-2 pr-2">Active Addresses</td>
                                    <td className="py-2 pl-2">จำนวนเพิ่มขึ้น = <strong>สัญญาณดีต่อพื้นฐาน</strong></td>
                                </tr>
                                <tr>
                                    <td className="py-2 pr-2">SOPR</td>
                                    <td className="py-2 pl-2">ประเมินกำไร/ขาดทุนโดยรวมของนักลงทุน</td>
                                </tr>
                            </tbody>
                        </table>
                    </AnalysisCard>
                </section>

                {/* กลยุทธ์การลงทุนที่ปลอดภัย - ใช้ Glassmorphism/Card Style ที่เข้ากัน */}
                <section className="mt-8 bg-white/10 p-4 rounded-2xl shadow-2xl border border-fuchsia-500/50 backdrop-blur-md">
                    <h2 className="text-3xl font-bold mt-4 mb-6 text-fuchsia-400 text-center">
                        🔑 กลยุทธ์การลงทุนที่ปลอดภัย
                    </h2>
                    <div className="space-y-6 max-w-4xl mx-auto">
                        <StrategyPoint
                            title="กระจายความเสี่ยง (Diversification)"
                            icon="⚖️"
                            content="ไม่ควรนำเงินทั้งหมดไปลงทุนในเหรียญเดียว ควรกระจายไปยังสินทรัพย์ที่มีความเสี่ยงต่างกัน และลงทุนในสินทรัพย์ที่อยู่บนระบบนิเวศของ <strong>Bitcoin/Lightning Network</strong>"
                        />
                        <StrategyPoint
                            title="กำหนดขนาดการลงทุน (Position Sizing)"
                            icon="📐"
                            content="ลงทุนด้วยเงินจำนวนน้อย และตั้งเป้าหมายการลงทุนที่ชัดเจน (เช่น <strong>ถือระยะยาว</strong> หรือ <strong>เก็งกำไรระยะสั้น</strong>)"
                        />
                        <StrategyPoint
                            title="ติดตามข่าวสารมหภาค (Macro News)"
                            icon="📰"
                            content="ตลาดคริปโตผูกติดอยู่กับสภาพคล่องและนโยบายการเงินของโลก โดยเฉพาะการเคลื่อนไหวของ<strong>ธนาคารกลางสหรัฐฯ (Fed)</strong>"
                        />
                    </div>
                    <p className="mt-8 text-center text-lg italic opacity-80">
                        การผสมผสานการวิเคราะห์ทั้งสามเสาหลักจะช่วยให้คุณมีมุมมองที่รอบด้านในการตัดสินใจลงทุนครับ
                    </p>
                </section>

            </main>
        </div>
    );
}