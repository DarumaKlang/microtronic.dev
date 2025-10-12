// /app/asset/sup-menu/wallet-tools/split-wallet/page.tsx

// ❌ ลบ Static Import ของ SplitWalletGenerator เดิมออก
// import SplitWalletGenerator from '@/components/wallet-tools/SplitWalletGenerator'; 
// 💡 เพิ่ม Import ของ Client Wrapper ตัวใหม่ที่เราสร้างขึ้น
import SplitWalletDynamicLoader from '@/components/wallet-tools/SplitWalletDynamicLoader'; 

import GlassmorphismCard from '@/components/GlassmorphismCard';
import GooeyBackground from '@/components/GooeyBackground';

export const metadata = {
    title: 'Split Wallet (Multisig) Generator | Microtronic',
    description: 'สร้าง Bitcoin Multisignature Wallet (M-of-N) เพื่อความปลอดภัยสูงสุด'
};

export default function SplitWalletPage() {
    return (
        // Layout หลัก
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-gradient-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px]">
            <GooeyBackground />
            
            <main className="container mx-auto max-w-7xl flex flex-col gap-8 relative z-10">
                
                {/* Heading หลัก */}
                <h1 className="text-4xl sm:text-5xl font-extrabold text-fuchsia-400 mb-4 tracking-tight">
                    Split Wallet Generator (Multisig M-of-N)
                </h1>
                <p className="text-xl mb-4 max-w-3xl">
                    สร้างที่อยู่ <span className="font-bold">Multisignature Wallet</span> (P2SH) ที่ต้องใช้กุญแจส่วนตัวจำนวน <span className="font-bold">M ดอกจาก N ดอกทั้งหมด</span> ในการใช้จ่าย
                </p>

                {/* Component หลักอยู่ใน Glassmorphism Card */}
                <GlassmorphismCard className="p-6 md:p-8">
                    {/* 💡 เรียกใช้ Dynamic Loader แทน SplitWalletGenerator เดิม */}
                    <SplitWalletDynamicLoader />
                </GlassmorphismCard>

                <section className="mt-8 space-y-8 max-w-4xl">
                    <h2 className="text-3xl font-bold text-yellow-400 border-b border-gray-600 pb-2">🔑 คุณสมบัติหลัก</h2>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                        <li><span className="font-bold">Multisig M-of-N:</span> สร้าง Address ที่ต้องการ Key จำนวน M จาก Key ทั้งหมด N ดอก</li>
                        <li><span className="font-bold">Client-Side:</span> การสร้าง Key ทั้งหมดเกิดขึ้นบนเบราว์เซอร์ของคุณ</li>
                        <li><span className="font-bold">ความสุ่ม:</span> ใช้ Cryptographically Secure Pseudo-Random Number Generator (CSPRNG) เพื่อสร้าง Private Key ที่ปลอดภัย</li>
                    </ul>

                    <h2 className="text-3xl font-bold text-red-400 border-b border-gray-600 pb-2">🛡️ ความปลอดภัยและหลักการทำงาน</h2>
                    <div className="space-y-4">
                        <p>
                            <span className="font-bold">เทคโนโลยี:</span> Bitcoin Script (multisig p2sh), `tiny-secp256k1`, <span className="font-bold">Buffer Polyfill</span>
                        </p>
                        <p>
                            <span className="font-bold">หลักการทำงาน:</span> สร้าง Key Pair N ดอกแบบสุ่ม จากนั้นรวม Public Key เข้ากับเงื่อนไข M-of-N เพื่อสร้าง <span className="font-bold">Redeem Script</span> และ Hash เป็น P2SH Address
                        </p>
                        <p className="text-red-300 border border-red-500 p-3 rounded-lg">
                            <span className="font-bold">ความปลอดภัย:</span> เพิ่มความทนทานต่อความสูญเสีย (Resilience) และการถูกโจมตี Key ทั้งหมดถูกสร้างและเก็บใน Client-Side
                        </p>
                    </div>

                    <h2 className="text-3xl font-bold text-yellow-400 border-b border-gray-600 pb-2">📝 วิธีการใช้งาน</h2>
                    <ol className="list-decimal list-inside space-y-2 ml-4">
                        <li><span className="font-bold">กำหนด M และ N:</span> ป้อนจำนวนกุญแจที่ต้องการ (M) และจำนวนทั้งหมด (N)</li>
                        <li><span className="font-bold">สร้าง:</span> กดปุ่ม ระบบจะแสดง Address และ Private Key N ดอก</li>
                        <li><span className="font-bold">เก็บ Key แยก:</span> <span className="font-bold">ต้อง</span> เก็บ Private Key ทั้ง N ดอกไว้ในสถานที่ <span className="font-bold">แยกจากกัน</span> เพื่อกระจายความเสี่ยง</li>
                    </ol>
                </section>
            </main>
        </div>
    );
}