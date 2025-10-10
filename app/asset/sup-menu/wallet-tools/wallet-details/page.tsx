// /app/asset/sup-menu/wallet-tools/wallet-details/page.tsx
import WalletDetailsChecker from '@/components/wallet-tools/WalletDetailsChecker';
import GlassmorphismCard from '@/components/GlassmorphismCard';
import GooeyBackground from '@/components/GooeyBackground';

export const metadata = {
    title: 'Wallet Details Checker | Microtronic',
    description: 'ตรวจสอบความถูกต้องของ Private Key และ Address ทุกรูปแบบ'
};

export default function WalletDetailsPage() {
    return (
        // Layout หลัก
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-gradient-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px]">
            <GooeyBackground />
            
            <main className="container mx-auto max-w-7xl flex flex-col gap-8 relative z-10">
                
                {/* Heading หลัก */}
                <h1 className="text-4xl sm:text-5xl font-extrabold text-fuchsia-400 mb-4 tracking-tight">
                    Wallet Details Checker
                </h1>
                <p className="text-xl mb-4 max-w-2xl">
                    เครื่องมือตรวจสอบความถูกต้องของ Bitcoin Private Key (WIF) และ Public Address (ทุกประเภท) รวมถึงการคำนวณ Address ที่เชื่อมโยง
                </p>

                {/* Component หลักอยู่ใน Glassmorphism Card */}
                <GlassmorphismCard className="p-6 md:p-8">
                    {/* <WalletDetailsChecker /> // เพิ่ม Component จริงที่นี่ */}
                    <div className="text-center text-lg py-12">
                        <WalletDetailsChecker />
                    </div>
                </GlassmorphismCard>

                <section className="mt-8 space-y-8 max-w-4xl">
                    <h2 className="text-3xl font-bold text-yellow-400 border-b border-gray-600 pb-2">🔑 คุณสมบัติหลัก</h2>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                        <li><span className="font-bold">ตรวจสอบ WIF:</span> ยืนยันว่า Private Key (WIF) มี Checksum ที่ถูกต้อง</li>
                        <li><span className="font-bold">รองรับ Address ครบ:</span> ตรวจสอบ Legacy (P2PKH), P2SH, และ Native SegWit (Bech32)</li>
                        <li><span className="font-bold">แสดง Address เชื่อมโยง:</span> คำนวณและแสดง Address ทั้งหมดที่ Derivation มาจาก Private Key ที่ป้อน</li>
                    </ul>

                    <h2 className="text-3xl font-bold text-yellow-400 border-b border-gray-600 pb-2">🛡️ เทคโนโลยีและความปลอดภัย</h2>
                    <div className="space-y-4">
                        <p>
                            <span className="font-bold">เทคโนโลยี:</span> `bitcoinjs-lib` (address validation, WIF import)
                        </p>
                        <p>
                            <span className="font-bold">หลักการทำงาน:</span> ใช้ฟังก์ชันการตรวจสอบมาตรฐานของ `bitcoinjs-lib` ในการยืนยัน Checksum และรูปแบบของ Key หรือ Address นั้นๆ
                        </p>
                        <p className="text-red-300 border border-red-500 p-3 rounded-lg">
                            <span className="font-bold">ความปลอดภัย:</span> ข้อมูล Private Key ที่คุณป้อนจะถูกประมวลผลและตรวจสอบ <span className="font-bold">ภายในเบราว์เซอร์ของคุณทันที</span> ไม่มีการส่ง Private Key ออกไปยังเซิร์ฟเวอร์ใดๆ
                        </p>
                    </div>

                    <h2 className="text-3xl font-bold text-yellow-400 border-b border-gray-600 pb-2">📝 วิธีการใช้งาน</h2>
                    <ol className="list-decimal list-inside space-y-2 ml-4">
                        <li><span className="font-bold">ป้อนข้อมูล:</span> กรอก Private Key (WIF) หรือ Public Address ที่คุณต้องการตรวจสอบ</li>
                        <li><span className="font-bold">คลิกตรวจสอบ:</span> กดปุ่มเพื่อประมวลผล</li>
                        <li><span className="font-bold">ดูผลลัพธ์:</span> ระบบจะแสดงสถานะความถูกต้อง ประเภทของ Key/Address และรายการ Address อื่นๆ ที่เชื่อมโยง</li>
                    </ol>
                </section>
            </main>
        </div>
    );
}