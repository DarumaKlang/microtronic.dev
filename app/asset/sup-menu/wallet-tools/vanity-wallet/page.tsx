// /app/asset/sup-menu/wallet-tools/vanity-wallet/page.tsx
import VanityWalletGenerator from '@/components/wallet-tools/VanityWalletGenerator';
import GlassmorphismCard from '@/components/GlassmorphismCard';
import GooeyBackground from '@/components/GooeyBackground';

export const metadata = {
    title: 'Vanity Wallet Generator | Microtronic',
    description: 'ค้นหา Bitcoin Address ที่ขึ้นต้นด้วยคำนำหน้าตามสั่งอย่างมีประสิทธิภาพ'
};

export default function VanityWalletPage() {
    return (
        // Layout หลัก
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-gradient-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px]">
            <GooeyBackground />
            
            <main className="container mx-auto max-w-7xl flex flex-col gap-8 relative z-10">
                
                {/* Heading หลัก */}
                <h1 className="text-4xl sm:text-5xl font-extrabold text-fuchsia-400 mb-4 tracking-tight">
                    Vanity Wallet Generator
                </h1>
                <p className="text-xl mb-4 max-w-2xl">
                    เครื่องมือค้นหา Bitcoin Address (P2PKH) ที่มีคำนำหน้า (Prefix) ที่คุณกำหนดเองได้ โดยใช้เทคนิคการสุ่มที่รวดเร็ว
                </p>

                {/* Component หลักอยู่ใน Glassmorphism Card */}
                <GlassmorphismCard className="p-6 md:p-8">
                    {/* <VanityWalletGenerator /> // เพิ่ม Component จริงที่นี่ */}
                    <div className="text-center text-lg py-12">
                        <VanityWalletGenerator />
                    </div>
                </GlassmorphismCard>

                <section className="mt-8 space-y-8 max-w-4xl">
                    <h2 className="text-3xl font-bold text-yellow-400 border-b border-gray-600 pb-2">🔑 คุณสมบัติหลัก</h2>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                        <li><span className="font-bold">กำหนด Prefix:</span> สามารถระบุคำนำหน้าของ Address ที่ต้องการได้ (เช่น `1Micro`)</li>
                        <li><span className="font-bold">ประสิทธิภาพสูง:</span> แสดงจำนวนการพยายามค้นหา (Attempts) และความเร็วในการค้นหา</li>
                        <li><span className="font-bold">Client-Side Random:</span> การสุ่ม Private Key ทุกครั้งใช้ค่าสุ่มที่ปลอดภัย</li>
                    </ul>

                    <h2 className="text-3xl font-bold text-yellow-400 border-b border-gray-600 pb-2">🛡️ เทคโนโลยีและความปลอดภัย</h2>
                    <div className="space-y-4">
                        <p>
                            <span className="font-bold">เทคโนโลยี:</span> <span className="font-bold">Web Worker</span>, `tiny-secp256k1`, `bitcoinjs-lib`
                        </p>
                        <p>
                            <span className="font-bold">หลักการทำงาน:</span> ใช้ <span className="font-bold">Web Worker</span> ในการทำซ้ำการสุ่ม Private Key ใน Background Thread ทำให้ <span className="font-bold">UI ไม่ค้าง</span> และสามารถค้นหาได้อย่างต่อเนื่อง
                        </p>
                        <p className="text-red-300 border border-red-500 p-3 rounded-lg">
                            <span className="font-bold">ความปลอดภัย:</span> การสร้าง Private Key และการตรวจสอบ Prefix <span className="font-bold">เกิดขึ้นใน Web Worker ของเบราว์เซอร์เท่านั้น</span> ไม่มีการส่งข้อมูล Key ใดๆ ออกไปภายนอก
                        </p>
                    </div>

                    <h2 className="text-3xl font-bold text-yellow-400 border-b border-gray-600 pb-2">📝 วิธีการใช้งาน</h2>
                    <ol className="list-decimal list-inside space-y-2 ml-4">
                        <li><span className="font-bold">ระบุคำนำหน้า:</span> พิมพ์คำที่คุณต้องการให้ Address ขึ้นต้น (ไม่รวมเลข `1` นำหน้า)</li>
                        <li><span className="font-bold">เริ่มค้นหา:</span> กดปุ่ม <span className="font-bold">"ค้นหา"</span> และรอจนกว่า Address ที่ต้องการจะถูกค้นพบ</li>
                        <li><span className="font-bold">บันทึก:</span> เมื่อพบแล้ว ให้รีบ Copy และบันทึก Private Key (WIF) ไว้ในที่ปลอดภัยทันที</li>
                    </ol>
                </section>
            </main>
        </div>
    );
}