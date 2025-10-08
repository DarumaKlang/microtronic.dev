// src/app/asset/hardware-wallet/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import GooeyBackground from '@/components/GooeyBackground'; // นำเข้า GooeyBackground ตามคำแนะนำ

export const metadata: Metadata = {
    title: 'Hardware Wallet: ความปลอดภัยสูงสุดสำหรับ Crypto - Microtronic',
    description: 'ทำความเข้าใจหลักการทำงาน โครงสร้างความปลอดภัย ข้อดี-ข้อเสีย และความจำเป็นของ Hardware Wallet สำหรับการเก็บรักษา Bitcoin',
};

// Component เสริมสำหรับแสดงคุณสมบัติด้านความปลอดภัย
interface FeatureCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => (
    <div className="p-6 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm shadow-lg transition-transform duration-300 hover:translate-y-[-4px] flex flex-col items-start gap-3">
        <div className="text-4xl text-yellow-300 mb-2">{icon}</div>
        <h4 className="text-xl font-bold text-fuchsia-300">{title}</h4>
        <p className="text-sm opacity-90">{description}</p>
    </div>
);

// Component สำหรับแสดงโครงสร้างความปลอดภัยในรูปแบบตาราง/รายการ
interface SecurityRowProps {
    element: string;
    functionality: string;
    securityBenefit: string;
    isHeader?: boolean;
}

const SecurityRow: React.FC<SecurityRowProps> = ({ element, functionality, securityBenefit, isHeader = false }) => {
    const baseClasses = "py-3 px-2 border-b border-white/20 break-words";
    const headerClasses = isHeader ? "font-bold bg-white/10 text-lg" : "opacity-90 text-sm";
    
    return (
        <div className={`grid grid-cols-3 gap-1 ${headerClasses}`}>
            <div className={`${baseClasses} col-span-1`}>{element}</div>
            <div className={`${baseClasses} col-span-1`}>{functionality}</div>
            <div className={`${baseClasses} col-span-1`}>{securityBenefit}</div>
        </div>
    );
};


export default function HardwareWalletPage() {
    return (
        // ใช้การจัดวางเนื้อหา, Tailwind CSS utility classes, และ GooeyBackground เสมอ
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-gradient-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px]">
            <GooeyBackground />

            <main className="container mx-auto max-w-7xl flex flex-col gap-12">
                
                {/* Header Section */}
                <section className="text-center w-full">
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4 text-fuchsia-400">
                        Hardware Wallet
                    </h1>
                    <h2 className="text-2xl sm:text-3xl font-light opacity-95">
                        การรักษาความปลอดภัยสูงสุดสำหรับ Bitcoin และ Crypto
                    </h2>
                    <p className="mt-6 max-w-4xl mx-auto text-lg opacity-90 p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-fuchsia-500/50">
                        Hardware Wallet คือ <strong className="text-yellow-300">อุปกรณ์ทางกายภาพ</strong> ที่สร้างขึ้นมาโดยเฉพาะเพื่อจัดเก็บ 
                        <strong className="text-yellow-300">กุญแจส่วนตัว (Private Keys)</strong> ของคุณในสภาพแวดล้อมที่ <strong className="font-bold text-green-300">ตัดขาดจากอินเทอร์เน็ต (Offline)</strong> 
                        ถือเป็นวิธีที่ปลอดภัยที่สุดในการเก็บรักษาสินทรัพย์ดิจิทัล
                    </p>
                </section>

                {/* --- 1. หลักการทำงาน: ความปลอดภัยแบบ "Air-Gapped" --- */}
                <section className="w-full">
                    <h3 className="text-3xl font-bold mb-6 border-b-2 border-fuchsia-500 pb-2">
                        1. หลักการทำงาน: ความปลอดภัยแบบ "Air-Gapped" 🛡️
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FeatureCard
                            title="การจัดเก็บแบบออฟไลน์"
                            description="Private Key ถูกสร้างและจัดเก็บไว้ภายในชิปที่ปลอดภัย (Secure Element Chip) ของอุปกรณ์ โดยไม่มีการเปิดเผยต่อคอมพิวเตอร์ที่เชื่อมต่ออยู่"
                            icon={<span aria-label="Chip">💾</span>}
                        />
                        <FeatureCard
                            title="การเซ็นชื่อธุรกรรม (Offline Signing)"
                            description="การอนุมัติ (Signing) ธุรกรรมเกิดขึ้นภายในตัว Hardware Wallet เท่านั้น และส่งกลับมาเฉพาะลายเซ็นดิจิทัลที่ปลอดภัยแล้ว"
                            icon={<span aria-label="Sign">✍️</span>}
                        />
                        <FeatureCard
                            title="การป้อนรหัส PIN"
                            description="ต้องป้อนรหัส PIN บนหน้าจอของอุปกรณ์โดยตรงก่อนการเซ็นชื่อ ป้องกันการเข้าถึงโดยมัลแวร์บนคอมพิวเตอร์"
                            icon={<span aria-label="PIN">🔢</span>}
                        />
                    </div>
                </section>

                {/* --- 2. โครงสร้างความปลอดภัยของ Hardware Wallet --- */}
                <section className="w-full mt-8">
                    <h3 className="text-3xl font-bold mb-6 border-b-2 border-fuchsia-500 pb-2">
                        2. โครงสร้างความปลอดภัยของ Hardware Wallet 🧱
                    </h3>
                    <div className="w-full overflow-x-auto bg-white/10 p-4 rounded-xl shadow-lg">
                        <div className="min-w-[700px]">
                            <SecurityRow
                                element="องค์ประกอบ"
                                functionality="หน้าที่"
                                securityBenefit="ความสำคัญด้านความปลอดภัย"
                                isHeader={true}
                            />
                            <SecurityRow
                                element="Secure Element Chip"
                                functionality="จัดเก็บ Private Key และ Seed Phrase"
                                securityBenefit="ป้องกันการเข้าถึงทางกายภาพ/การดึงกุญแจออกจากชิป"
                            />
                            <SecurityRow
                                element="หน้าจอ (Display)"
                                functionality="แสดงรายละเอียดธุรกรรม (ผู้รับ, จำนวนเงิน)"
                                securityBenefit="ตรวจสอบด้วยตาเปล่า ป้องกันการโจมตีแบบ Man-in-the-Middle"
                            />
                            <SecurityRow
                                element="ปุ่มยืนยัน (Physical Buttons)"
                                functionality="ใช้เพื่อยืนยันการทำธุรกรรม"
                                securityBenefit="ต้องมีการกระทำทางกายภาพ เพื่อป้องกันการเซ็นชื่อโดยไม่ได้รับอนุญาต"
                            />
                        </div>
                    </div>
                </section>

                {/* --- 3. ข้อดีและข้อเสีย --- */}
                <section className="w-full mt-8">
                    <h3 className="text-3xl font-bold mb-6 border-b-2 border-fuchsia-500 pb-2">
                        3. ข้อดีและข้อเสีย ⚖️
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Pros Card */}
                        <div className="p-6 rounded-xl border-2 border-green-500 bg-green-500/20 backdrop-blur-sm shadow-xl">
                            <h4 className="text-2xl font-extrabold mb-3 text-green-300">ข้อดี (Pros) ✅</h4>
                            <ul className="list-disc list-inside space-y-2 text-sm opacity-95">
                                <li><strong className="font-semibold">ความปลอดภัยสูงสุด:</strong> เกราะป้องกันที่ดีที่สุดต่อมัลแวร์, ไวรัส, และการแฮ็ก</li>
                                <li><strong className="font-semibold">ควบคุมสมบูรณ์:</strong> คุณคือผู้ควบคุม Private Key (Non-Custodial) อย่างแท้จริง</li>
                                <li><strong className="font-semibold">การกู้คืน:</strong> กู้คืนสินทรัพย์ทั้งหมดได้ง่าย ๆ ด้วย Seed Phrase หากอุปกรณ์หายหรือชำรุด</li>
                                <li><strong className="font-semibold">ตรวจสอบอิสระ:</strong> หน้าจอช่วยให้คุณมั่นใจว่าธุรกรรมถูกต้องก่อนเซ็นชื่อ</li>
                            </ul>
                        </div>
                        {/* Cons Card */}
                        <div className="p-6 rounded-xl border-2 border-red-500 bg-red-500/20 backdrop-blur-sm shadow-xl">
                            <h4 className="text-2xl font-extrabold mb-3 text-red-300">ข้อเสีย (Cons) ❌</h4>
                            <ul className="list-disc list-inside space-y-2 text-sm opacity-95">
                                <li><strong className="font-semibold">ต้นทุน:</strong> มีค่าใช้จ่ายในการซื้ออุปกรณ์ (ไม่ฟรีเหมือน Software Wallet)</li>
                                <li><strong className="font-semibold">ความซับซ้อน:</strong> มีขั้นตอนการตั้งค่าและการใช้งานมากกว่า Hot Wallet เล็กน้อย</li>
                                <li><strong className="font-semibold">ความเสี่ยงจากการจัดส่ง:</strong> ต้องระวังการสั่งซื้อจากแหล่งที่ไม่น่าเชื่อถือ (Supply Chain Attack)</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* --- 4. ตัวอย่าง Hardware Wallet ที่เป็นที่นิยม --- */}
                <section className="w-full mt-8">
                    <h3 className="text-3xl font-bold mb-6 border-b-2 border-fuchsia-500 pb-2">
                        4. ตัวอย่าง Hardware Wallet ที่เป็นที่นิยม 🌟
                    </h3>
                    <ul className="space-y-4 text-lg">
                        <li className="p-4 bg-white/10 rounded-lg border-l-4 border-blue-400">
                            <strong className="font-semibold block mb-1 text-blue-300">Ledger Nano S / X:</strong> แบรนด์ที่ได้รับความนิยมมากที่สุด มีหลายรุ่นให้เลือกใช้
                        </li>
                        <li className="p-4 bg-white/10 rounded-lg border-l-4 border-green-400">
                            <strong className="font-semibold block mb-1 text-green-300">Trezor Model One / T:</strong> เน้นการเป็น Open Source เพื่อเพิ่มความโปร่งใสของโค้ด
                        </li>
                        <li className="p-4 bg-white/10 rounded-lg border-l-4 border-yellow-400">
                            <strong className="font-semibold block mb-1 text-yellow-300">Coldcard:</strong> ความปลอดภัยระดับสูงสุดสำหรับผู้เชี่ยวชาญ ใช้งานแบบ "Air-Gapped" ได้อย่างสมบูรณ์
                        </li>
                    </ul>
                </section>

                {/* --- 5. การจัดการ Seed Phrase (หัวใจสำคัญ) --- */}
                <section className="w-full mt-8 p-8 bg-white/10 rounded-xl shadow-2xl backdrop-blur-lg border border-white/20">
                    <h3 className="text-3xl font-bold mb-4 text-red-400">
                        5. การจัดการ Seed Phrase (หัวใจสำคัญ) 🔑
                    </h3>
                    <p className="text-lg font-light max-w-4xl mx-auto opacity-95 mb-4">
                        Seed Phrase (วลีเมล็ดพันธุ์) คือการสำรองข้อมูลสุดท้ายในการกู้คืนสินทรัพย์ของคุณ
                    </p>
                    <ul className="space-y-3 text-left max-w-3xl mx-auto">
                        <li className="text-lg"><strong className="font-semibold text-red-300">จดด้วยมือเท่านั้น:</strong> ห้ามบันทึก Seed Phrase ลงในอุปกรณ์ดิจิทัลใด ๆ เด็ดขาด</li>
                        <li className="text-lg"><strong className="font-semibold text-red-300">เก็บในที่ปลอดภัย:</strong> จัดเก็บในสถานที่ปลอดภัยหลายแห่งที่แยกจากกัน อาจพิจารณาใช้วัสดุที่ทนทานต่อไฟและน้ำ</li>
                        <li className="text-lg"><strong className="font-semibold text-red-300">ห้ามถ่ายรูป:</strong> ไม่ควรถ่ายรูปหรือแชร์ Seed Phrase ของคุณให้ใครเห็น</li>
                    </ul>
                </section>

                <footer className="w-full mt-12 text-center text-sm opacity-70">
                    <p>
                        ข้อสรุป: หากคุณถือครองสินทรัพย์ดิจิทัลในปริมาณมาก Hardware Wallet เป็นการลงทุนที่จำเป็นที่สุดสำหรับการรับประกันความปลอดภัยในระยะยาว
                    </p>
                </footer>

            </main>
        </div>
    );
}