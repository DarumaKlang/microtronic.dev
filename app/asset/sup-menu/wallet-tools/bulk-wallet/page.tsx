// /app/asset/sup-menu/wallet-tools/bulk-wallet/page.tsx
import BulkWalletGenerator from '@/components/wallet-tools/BulkWalletGenerator';
import GlassmorphismCard from '@/components/GlassmorphismCard';
import GooeyBackground from '@/components/GooeyBackground';

export const metadata = {
    title: 'Bulk Wallet Generator | Microtronic',
    description: 'สร้าง Bitcoin Wallet หลายชุดพร้อมกันอย่างรวดเร็วและปลอดภัย'
};

export default function BulkWalletPage() {
    return (
        // Layout หลัก
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-gradient-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px]">
            <GooeyBackground />
            
            <main className="container mx-auto max-w-7xl flex flex-col gap-8 relative z-10">
                
                {/* Heading หลัก */}
                <h1 className="text-4xl sm:text-5xl font-extrabold text-fuchsia-400 mb-4 tracking-tight">
                    Bulk Wallet Generator
                </h1>
                <p className="text-xl mb-4 max-w-2xl">
                    เครื่องมือสำหรับการสร้าง Bitcoin Wallet จำนวนมากพร้อมกันในครั้งเดียว เหมาะสำหรับ Paper Wallet ที่ต้องการปริมาณ
                </p>

                {/* Component หลักอยู่ใน Glassmorphism Card */}
                <GlassmorphismCard className="p-6 md:p-8">
                    {/* <BulkWalletGenerator /> // เพิ่ม Component จริงที่นี่ */}
                    <div className="text-center text-lg py-12">
                        <BulkWalletGenerator />
                    </div>
                </GlassmorphismCard>

                <section className="mt-8 space-y-8 max-w-4xl">
                    <h2 className="text-3xl font-bold text-yellow-400 border-b border-gray-600 pb-2">🔑 คุณสมบัติหลัก</h2>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                        <li><span className="font-bold">สร้างชุดใหญ่:</span> สามารถสร้าง Wallet ได้ตั้งแต่ 1 ถึง 100 ชุดต่อการคลิก</li>
                        <li><span className="font-bold">รูปแบบ Legacy:</span> สร้างที่อยู่ Bitcoin ในรูปแบบ Legacy (P2PKH)</li>
                        <li><span className="font-bold">Client-Side:</span> การคำนวณทั้งหมดเกิดขึ้นในเบราว์เซอร์ของผู้ใช้</li>
                    </ul>

                    <h2 className="text-3xl font-bold text-yellow-400 border-b border-gray-600 pb-2">🛡️ เทคโนโลยีและความปลอดภัย</h2>
                    <div className="space-y-4">
                        <p>
                            <span className="font-bold">เทคโนโลยี:</span> `window.crypto.getRandomValues()`, `tiny-secp256k1`, `bitcoinjs-lib`
                        </p>
                        <p>
                            <span className="font-bold">หลักการทำงาน:</span> ใช้ <span className="font-bold">CSPRNG</span> ในการสร้างค่าสุ่มสำหรับ Private Key แต่ละชุดโดยเฉพาะ เพื่อรับประกันความเป็นอิสระและความปลอดภัยของ Key ทุกตัว
                        </p>
                        <p className="text-red-300 border border-red-500 p-3 rounded-lg">
                            <span className="font-bold">ความปลอดภัย:</span> <span className="font-bold">Private Key จะไม่ถูกส่งไปที่เซิร์ฟเวอร์ใดๆ</span> ต้องบันทึก Private Key ด้วยตัวเอง และควรล้างข้อมูลในตารางหลังใช้งานเสร็จ
                        </p>
                    </div>

                    <h2 className="text-3xl font-bold text-yellow-400 border-b border-gray-600 pb-2">📝 วิธีการใช้งาน</h2>
                    <ol className="list-decimal list-inside space-y-2 ml-4">
                        <li><span className="font-bold">กำหนดจำนวน:</span> ระบุจำนวน Wallet ที่ต้องการสร้าง</li>
                        <li><span className="font-bold">สร้าง:</span> กดปุ่มเพื่อสร้างและแสดงผลลัพธ์ในตาราง</li>
                        <li><span className="font-bold">บันทึก & ตรวจสอบ:</span> คัดลอก Private Key และ Address ทั้งหมด และควรนำไปตรวจสอบกับเครื่องมืออื่นเพื่อยืนยันความถูกต้องก่อนใช้งานจริง</li>
                    </ol>
                </section>
            </main>
        </div>
    );
}