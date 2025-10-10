// /app/asset/sup-menu/wallet-tools/paper-wallet/page.tsx
import PaperWalletGenerator from '@/components/wallet-tools/PaperWalletGenerator'; // สมมติว่ามี Component นี้
import GlassmorphismCard from '@/components/GlassmorphismCard';
import GooeyBackground from '@/components/GooeyBackground';

export const metadata = {
    title: 'Paper Wallet Generator | Microtronic',
    description: 'สร้าง Bitcoin Paper Wallet ด้วย Client-Side Generator ที่ปลอดภัย'
};

export default function PaperWalletPage() {
    return (
        // Layout หลัก
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-gradient-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px]">
            <GooeyBackground />
            
            <main className="container mx-auto max-w-7xl flex flex-col gap-8 relative z-10">
                
                {/* Heading หลัก */}
                <h1 className="text-4xl sm:text-5xl font-extrabold text-fuchsia-400 mb-4 tracking-tight">
                    Paper Wallet Generator
                </h1>
                <p className="text-xl mb-4 max-w-2xl">
                    สร้างคู่กุญแจ Bitcoin แบบชุดเดียวที่ออกแบบมาเพื่อการพิมพ์บนกระดาษเพื่อเก็บรักษาแบบ <span className="font-bold">Offline</span> โดยเฉพาะ
                </p>

                {/* Component หลักอยู่ใน Glassmorphism Card */}
                <GlassmorphismCard className="p-6 md:p-8">
                    {/* <PaperWalletGenerator /> // เพิ่ม Component จริงที่นี่ */}
                    <div className="text-center text-lg py-12">
                        <PaperWalletGenerator />
                    </div>
                </GlassmorphismCard>

                <section className="mt-8 space-y-8 max-w-4xl">
                    <h2 className="text-3xl font-bold text-yellow-400 border-b border-gray-600 pb-2">🔑 คุณสมบัติหลัก</h2>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                        <li><span className="font-bold">Private Key (WIF):</span> สร้างกุญแจส่วนตัวในรูปแบบที่ง่ายต่อการนำเข้า</li>
                        <li><span className="font-bold">รองรับการพิมพ์:</span> จัดรูปแบบการแสดงผลให้เหมาะสมกับการพิมพ์บนกระดาษ</li>
                        <li><span className="font-bold">Client-Side Only:</span> การสร้าง Key ทั้งหมดทำงานในเบราว์เซอร์</li>
                    </ul>

                    <h2 className="text-3xl font-bold text-yellow-400 border-b border-gray-600 pb-2">🛡️ เทคโนโลยีและความปลอดภัย</h2>
                    <div className="space-y-4">
                        <p><span className="font-bold">เทคโนโลยี:</span> `window.crypto.getRandomValues()`, `tiny-secp256k1`, `bitcoinjs-lib`</p>
                        <p>
                            <span className="font-bold">หลักการทำงาน:</span> ใช้ <span className="font-bold">CSPRNG</span> ของระบบปฏิบัติการผ่าน `window.crypto` เพื่อสร้างค่าสุ่ม 256 บิตที่ปลอดภัยที่สุด จากนั้นใช้ `bitcoinjs-lib` ในการแปลงเป็น Key Pair
                        </p>
                        <p className="text-red-300 border border-red-500 p-3 rounded-lg">
                            <span className="font-bold">ความปลอดภัย:</span> <span className="font-bold">Private Key จะไม่ถูกส่งไปที่เซิร์ฟเวอร์ใดๆ</span> กรุณาพิมพ์ลงกระดาษ หรือบันทึกในอุปกรณ์ที่ <span className="font-bold">Offline</span> ทันทีหลังสร้างเสร็จ
                        </p>
                    </div>

                    <h2 className="text-3xl font-bold text-yellow-400 border-b border-gray-600 pb-2">📝 วิธีการใช้งาน</h2>
                    <ol className="list-decimal list-inside space-y-2 ml-4">
                        <li><span className="font-bold">เข้าหน้า Offline:</span> (แนะนำอย่างยิ่ง) ปิดการเชื่อมต่ออินเทอร์เน็ตของอุปกรณ์ก่อนใช้งาน</li>
                        <li><span className="font-bold">กดสร้าง:</span> คลิกปุ่มเพื่อสร้าง Key Pair ใหม่</li>
                        <li><span className="font-bold">พิมพ์/บันทึก:</span> ใช้ฟังก์ชัน Print ของเบราว์เซอร์เพื่อพิมพ์หน้านี้ หรือบันทึกข้อมูล Key ไว้ในที่ปลอดภัย</li>
                    </ol>
                </section>
            </main>
        </div>
    );
}