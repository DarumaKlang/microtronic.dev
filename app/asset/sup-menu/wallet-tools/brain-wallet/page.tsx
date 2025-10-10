// /app/asset/sup-menu/wallet-tools/brain-wallet/page.tsx
import BrainWalletGenerator from '@/components/wallet-tools/BrainWalletGenerator';
import GlassmorphismCard from '@/components/GlassmorphismCard';
import GooeyBackground from '@/components/GooeyBackground';

export const metadata = {
    title: 'Brain Wallet Generator | Microtronic',
    description: 'สร้าง Private Key จากวลีหรือประโยคที่คุณจำได้ (คำเตือน: ไม่ปลอดภัย)'
};

export default function BrainWalletPage() {
    return (
        // Layout หลัก
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-gradient-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px]">
            <GooeyBackground />
            
            <main className="container mx-auto max-w-7xl flex flex-col gap-8 relative z-10">
                
                {/* Heading หลัก */}
                <h1 className="text-4xl sm:text-5xl font-extrabold text-red-400 mb-4 tracking-tight">
                    Brain Wallet Generator (คำเตือน: ไม่แนะนำ)
                </h1>
                <p className="text-xl mb-4 max-w-3xl text-yellow-300">
                    เครื่องมือนี้สร้าง Private Key จากวลีหรือข้อความที่คุณป้อน
                    <span className="font-bold">เราไม่แนะนำให้ใช้งาน Brain Wallet เนื่องจากความเสี่ยงสูง</span> โปรดใช้เพื่อวัตถุประสงค์ในการศึกษาหรือทดสอบเท่านั้น
                </p>

                {/* Component หลักอยู่ใน Glassmorphism Card */}
                <GlassmorphismCard className="p-6 md:p-8">
                    {/* <BrainWalletGenerator /> // เพิ่ม Component จริงที่นี่ */}
                    <div className="text-center text-lg py-12">
                        <BrainWalletGenerator />
                    </div>
                </GlassmorphismCard>

                <section className="mt-8 space-y-8 max-w-4xl">
                    <h2 className="text-3xl font-bold text-yellow-400 border-b border-gray-600 pb-2">🔑 คุณสมบัติหลัก</h2>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                        <li><span className="font-bold">แปลงวลีเป็น Key:</span> ใช้ SHA-256 ในการ Hash วลีที่ผู้ใช้ป้อน เพื่อสร้าง Private Key</li>
                        <li><span className="font-bold">Client-Side Hash:</span> การคำนวณ Hash ทั้งหมดเกิดขึ้นบนเครื่องของผู้ใช้</li>
                    </ul>

                    <h2 className="text-3xl font-bold text-red-400 border-b border-gray-600 pb-2">🚨 ความเสี่ยงและความปลอดภัย (สำคัญมาก)</h2>
                    <div className="space-y-4">
                        <p>
                            <span className="font-bold">เทคโนโลยี:</span> SHA-256 Hashing, `tiny-secp256k1`, `bitcoinjs-lib`
                        </p>
                        <p className="text-red-300 border border-red-500 p-3 rounded-lg font-bold">
                            <span className="font-bold">ความเสี่ยงหลัก:</span> วลีที่มนุษย์จำได้มักจะมีความซ้ำซ้อนและสามารถเดาได้ง่าย (Low Entropy) ทำให้ผู้โจมตีใช้เทคนิค <span className="font-bold">Brute-force</span> ในการค้นหา Private Key ของคุณได้อย่างรวดเร็ว
                        </p>
                        <p>
                            <span className="font-bold">หลักการทำงาน:</span> วลีจะถูก Hash ด้วย SHA-256 เพื่อนำมาใช้เป็น Private Key โดยตรง ซึ่งไม่ได้มาจากค่าสุ่มที่ปลอดภัย
                        </p>
                    </div>

                    <h2 className="text-3xl font-bold text-yellow-400 border-b border-gray-600 pb-2">📝 วิธีการใช้งาน (เพื่อการศึกษาเท่านั้น)</h2>
                    <ol className="list-decimal list-inside space-y-2 ml-4">
                        <li><span className="font-bold">ป้อนวลี:</span> ป้อนวลีหรือประโยคที่คุณต้องการ</li>
                        <li><span className="font-bold">สร้าง:</span> กดปุ่มเพื่อสร้าง Private Key และ Address ที่ได้จากวลีนั้น</li>
                        <li><span className="font-bold">ศึกษา:</span> สังเกตว่าวลีที่แตกต่างกันเพียงเล็กน้อยก็ส่งผลให้เกิด Private Key ที่แตกต่างกันอย่างสิ้นเชิง</li>
                    </ol>
                </section>
            </main>
        </div>
    );
}