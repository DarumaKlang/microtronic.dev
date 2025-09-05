# Template

```typescript

// app/asset/page.tsx
import GlassmorphismCard from '@/components/GlassmorphismCard';
import GooeyBackground from '@/components/GooeyBackground'; // นำเข้า GooeyBackground

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
                    {/* Card ที่ 1 */}
                    <GlassmorphismCard className="w-full">
                        <h2 className="text-2xl font-bold mb-4">Bitcoin</h2>
                        <p className="text-gray-200">
                            ข้อมูลเกี่ยวกับ Bitcoin และเทคโนโลยี Lightning Network ที่คุณสนใจ
                        </p>
                    </GlassmorphismCard>

                    {/* Card ที่ 2 */}
                    <GlassmorphismCard className="w-full">
                        <h2 className="text-2xl font-bold mb-4">ตลาดหลักทรัพย์</h2>
                        <p className="text-gray-200">
                            ข้อมูลเกี่ยวกับการลงทุนในตลาดหลักทรัพย์และหุ้น
                        </p>
                    </GlassmorphismCard>
                    
                    {/* Card ที่ 3 */}
                    <GlassmorphismCard className="w-full">
                        <h2 className="text-2xl font-bold mb-4">สินทรัพย์ดิจิทัลอื่นๆ</h2>
                        <p className="text-gray-200">
                            ข้อมูลเกี่ยวกับ Ethereum, Stablecoins และสินทรัพย์ดิจิทัลอื่นๆ
                        </p>
                    </GlassmorphismCard>

                    {/* คุณสามารถเพิ่ม GlassmorphismCard อื่นๆ ได้ที่นี่ */}
                </div>
            </main>
        </div>
    );
}
```
