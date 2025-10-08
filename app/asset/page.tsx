// app/asset/page.tsx
import GlassmorphismCard from '@/components/GlassmorphismCard';
import GooeyBackground from '@/components/GooeyBackground'; // นำเข้า GooeyBackground
import Link from 'next/link';

export default function AssetPage() {
    return (
        // ใช้ GooeyBackground สำหรับพื้นหลังของหน้าทั้งหมด
        <div className="relative min-h-screen text-white pt-[80px] pb-[100px] overflow-hidden">
            <GooeyBackground />

            <main className="relative z-10 container mx-auto p-4 sm:p-8">

                <h1 className="text-4xl font-bold mb-8 text-center drop-shadow-lg">
                    การลงทุนและสินทรัพย์
                </h1>

                {/* ตัวอย่างการใช้งาน GlassmorphismCard สำหรับแสดงเนื้อหาแต่ละส่วน */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Card ที่ 1: โลกแห่ง Bitcoin (แปลงเป็น Link) */}
                    <Link href="/asset/bitcoin" className="block w-full transition duration-300 transform hover:scale-[1.03] cursor-pointer group">
                        <GlassmorphismCard>
                            <h2 className="text-2xl font-bold mb-4 text-g1-start">โลกแห่ง Bitcoin 🚀</h2>
                            <p className="text-gray-200">
                                ข้อมูลเชิงลึกเกี่ยวกับ <strong>Bitcoin</strong> และเทคโนโลยีที่ปฏิวัติวงการอย่าง <strong>Blockchain</strong> รวมถึง Lightning Network (Layer 2)
                            </p>
                        </GlassmorphismCard>
                    </Link>

                    {/* Card ที่ 2 */}
                    <Link href="/asset/digital-wallet" className="block w-full transition duration-300 transform hover:scale-[1.03] cursor-pointer group">

                        <GlassmorphismCard className="w-full">
                            <h2 className="text-2xl font-bold mb-4">Digital Wallet</h2>
                            <p className="text-gray-200">
                                Digital Wallet : ประตูสู่โลกสินทรัพย์ดิจิทัล ครอบคลุมการแยกประเภท เทคโนโลยีเบื้องหลัง ข้อดี-ข้อเสีย และความน่าเชื่อถือ
                            </p>
                        </GlassmorphismCard>
                    </Link>
                    
                    {/* Card ที่ 3 */}
                    <Link href="/asset/hardware-wallet" className="block w-full transition duration-300 transform hover:scale-[1.03] cursor-pointer group">
                        <GlassmorphismCard className="w-full">
                            <h2 className="text-2xl font-bold mb-4">Hardware Wallet</h2>
                            <p className="text-gray-200">
                                Hardware Wallet : ความปลอดภัยสูงสุดสำหรับการเก็บรักษาสินทรัพย์ดิจิทัล ด้วยการออกแบบที่ทนทานและการป้องกันขั้นสูง
                            </p>
                        </GlassmorphismCard>
                    </Link>
                        {/* คุณสามารถเพิ่ม GlassmorphismCard อื่นๆ ได้ที่นี่ */}

                </div>
            </main>
        </div>
    );
}