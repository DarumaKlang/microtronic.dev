// app/asset/page.tsx
import GlassmorphismCard from '@/components/GlassmorphismCard';
import GooeyBackground from '@/components/GooeyBackground'; // นำเข้า GooeyBackground
import TradingViewWidget from '@/components/TradingViewWidget';
import TradingViewNewWidget from '@/components/TradingViewNewsWidget';
import GridCalculator from '@/components/GridCalculator';
import DcaCalculator from '@/components/DcaCalculator';

export default function GridCalculatorPage() {
    return (
        // ใช้ GooeyBackground สำหรับพื้นหลังของหน้าทั้งหมด
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-gradient-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px]">
            <GooeyBackground />

            <main className="container mx-auto max-w-7xl flex flex-col gap-8">

                {/* Heading หลัก */}
                <h1 className="text-4xl sm:text-5xl font-extrabold text-fuchsia-400 mb-4 tracking-tight">
                    Tools for Trading Strategies
                </h1>

                {/* ตัวอย่างการใช้งาน GlassmorphismCard สำหรับแสดงเนื้อหาแต่ละส่วน */}
                <div className='mt-12'>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-fuchsia-300 mb-4 border-b border-fuchsia-600/50 pb-2">
                        💡 Grid Calculator : วางแผนการเทรด Grid อย่างมืออาชีพ
                    </h1>
                    <p className="text-lg mb-4">
                        Grid Trading เป็นกลยุทธ์ที่ทรงพลังในการทำกำไรจาก <span className="font-semibold text-yellow-300">ความผันผวนด้านข้าง (Sideways)</span> ของตลาด เครื่องมือนี้ช่วยให้คุณสามารถออกแบบและสร้างแผนผังระดับราคาซื้อ-ขาย (Buy/Sell Levels) ได้อย่างรวดเร็วและแม่นยำ
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-8">
                        <div className="p-3 bg-white/20 rounded-lg">
                            <h3 className="font-bold text-lg text-fuchsia-300">1. เลือกกลยุทธ์</h3>
                            <p>ตัดสินใจระหว่าง <span className="font-semibold">Arithmetic</span> (ระยะห่างคงที่) หรือ <span className="font-semibold">Geometric</span> (เปอร์เซ็นต์คงที่)</p>
                        </div>
                        <div className="p-3 bg-white/20 rounded-lg">
                            <h3 className="font-bold text-lg text-fuchsia-300">2. คำนวณรวดเร็ว</h3>
                            <p>ป้อน 4 ข้อมูลหลัก เครื่องมือจะประมาณการกำไรสุทธิและระดับราคาให้คุณทันที</p>
                        </div>
                        <div className="p-3 bg-white/20 rounded-lg">
                            <h3 className="font-bold text-lg text-fuchsia-300">3. นำไปใช้งาน</h3>
                            <p>นำรายการจุดราคา Buy/Sell ไปตั้ง Limit Order ใน Exchange ของคุณได้ทันที</p>
                        </div>
                    </div>

                    {/* Big Card ที่ 1 */}
                    <GlassmorphismCard className="w-full">
                        <h2 className="text-2xl font-bold mb-4">เครื่องมือ GridCalculator</h2>
                        <GridCalculator />
                    </GlassmorphismCard>

                </div>

                <div className='mt-12'>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-fuchsia-300 mb-4 border-b border-fuchsia-600/50 pb-2">
                        🛠️ Bear Market DCA Strategy Calculator
                    </h1>
                    <p className="text-lg mb-4">
                        เครื่องมือวางแผนการเข้าซื้อแบบ Dollar-Cost Averaging (DCA) โดยใช้ระดับราคาที่ลดลงเพื่อลดต้นทุนเฉลี่ย ควบคู่กับการตั้งเป้าทำกำไรระยะสั้นและการจำกัดความเสี่ยง
                    </p>
                    
                    {/* Big Card ที่ 2 */}
                    <GlassmorphismCard className="w-full">
                        <h2 className="text-2xl font-bold mb-4">เครื่องมือ Bear Market DCA Calculator</h2>
                        <DcaCalculator />
                    </GlassmorphismCard>

                </div>
            </main>

        </div>
    );
}