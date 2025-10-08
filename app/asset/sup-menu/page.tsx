// app/asset/page.tsx
import GlassmorphismCard from '@/components/GlassmorphismCard';
import GooeyBackground from '@/components/GooeyBackground'; // นำเข้า GooeyBackground
// import TradingViewAdvancedChart from '@/components/TradingViewAdvancedChart'; // **ลบออกตามคำขอ**
import GridCalculator from '@/components/GridCalculator';
import DcaCalculator from '@/components/DcaCalculator';

// นำเข้าเครื่องมือคำนวณที่เหลือ
import SlTpCalculator from '@/components/SlTpCalculator';
import ScalpingCalculator from '@/components/ScalpingCalculator';
import SwingTradingCalculator from '@/components/SwingTradingCalculator';
import TrendFollowingCalculator from '@/components/TrendFollowingCalculator';
import BreakoutTradingCalculator from '@/components/BreakoutTradingCalculator';


export default function AssetToolsPage() {
    return (
        // ใช้ GooeyBackground สำหรับพื้นหลังของหน้าทั้งหมด
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-gradient-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px]">
            <GooeyBackground />

            <main className="container mx-auto max-w-7xl flex flex-col gap-8">

                {/* Heading หลัก */}
                <h1 className="text-4xl sm:text-5xl font-extrabold text-fuchsia-400 mb-4 tracking-tight">
                    Tools for Trading Strategies
                </h1>
                <p className="text-xl opacity-90">ชุดเครื่องมือคำนวณสำหรับนักลงทุนและนักเทรดเพื่อช่วยในการวางแผนการเข้า-ออกตลาด และบริหารความเสี่ยง</p>

                {/* 1. SL/TP Price Calculator (ย้ายมาอยู่บนสุด) */}
                <div className='mt-12'>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-fuchsia-300 mb-4 border-b border-fuchsia-600/50 pb-2">
                        🎯 SL/TP Price Calculator (Risk/Reward)
                    </h1>
                    <p className="text-lg mb-4">
                        คำนวณราคา Take Profit (TP) อัตโนมัติโดยกำหนดจาก Risk/Reward Ratio และ Stop-Loss (SL) ที่แน่นอน
                    </p>
                    <GlassmorphismCard className="w-full">
                        <SlTpCalculator />
                    </GlassmorphismCard>
                </div>

                {/* 2. Scalping Calculator */}
                <div className='mt-12'>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-fuchsia-300 mb-4 border-b border-fuchsia-600/50 pb-2">
                        ⚡ Scalping Position Size Calculator
                    </h1>
                    <p className="text-lg mb-4">
                        คำนวณขนาด Position Size สำหรับการเทรดแบบ Scalping เพื่อควบคุมความเสี่ยงตามเปอร์เซ็นต์ของทุนรวมต่อการเทรด
                    </p>
                    <GlassmorphismCard className="w-full">
                        <h2 className="text-2xl font-bold mb-4">เครื่องมือ Scalping Position Size Calculator (Short-Term)</h2>
                        <ScalpingCalculator />
                    </GlassmorphismCard>
                </div>

                {/* 3. Grid Calculator (ถูกเลื่อนอันดับลงมา) */}
                <div className='mt-12'>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-fuchsia-300 mb-4 border-b border-fuchsia-600/50 pb-2">
                        💡 Grid Calculator : วางแผนการเทรด Grid
                    </h1>
                    <p className="text-lg mb-4">
                        เครื่องมือคำนวณการตั้ง Buy/Sell Limit Order แบบ Grid เพื่อให้ครอบคลุมช่วงราคาที่ต้องการและคำนวณความเสี่ยง
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
                        <div className="p-3 bg-white/20 rounded-lg">
                            <h3 className="font-bold text-lg text-fuchsia-300">1. กำหนดเป้าหมาย</h3>
                            <p>กำหนดช่วงราคาสูงสุด-ต่ำสุด และจำนวน Grid ที่ต้องการ</p>
                        </div>
                        <div className="p-3 bg-white/20 rounded-lg">
                            <h3 className="font-bold text-lg text-fuchsia-300">2. คำนวณอัตโนมัติ</h3>
                            <p>รับรายการจุดราคาพร้อมจำนวนเงินที่ควรใช้ต่อ Grid</p>
                        </div>
                        <div className="p-3 bg-white/20 rounded-lg">
                            <h3 className="font-bold text-lg text-fuchsia-300">3. นำไปใช้งาน</h3>
                            <p>นำรายการจุดราคา Buy/Sell ไปตั้ง Limit Order ใน Exchange ของคุณได้ทันที</p>
                        </div>
                    </div>
                    <GlassmorphismCard className="w-full">
                        <h2 className="text-2xl font-bold mb-4">เครื่องมือ GridCalculator (Short-Term, DCA)</h2>
                        <GridCalculator />
                    </GlassmorphismCard>
                </div>

                {/* 4. Bear Market DCA Strategy Calculator (ถูกเลื่อนอันดับลงมา) */}
                <div className='mt-12'>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-fuchsia-300 mb-4 border-b border-fuchsia-600/50 pb-2">
                        🛠️ Bear Market DCA Strategy Calculator
                    </h1>
                    <p className="text-lg mb-4">
                        เครื่องมือวางแผนการเข้าซื้อแบบ Dollar-Cost Averaging (DCA) โดยใช้ระดับราคาที่ลดลงเพื่อลดต้นทุนเฉลี่ย
                    </p>
                    <GlassmorphismCard className="w-full">
                        <h2 className="text-2xl font-bold mb-4">เครื่องมือ Bear Market DCA Calculator (Down-Trend, Long-Term, DCA)</h2>
                        <DcaCalculator />
                    </GlassmorphismCard>
                </div>

                {/* 5. Swing Trading Calculator */}
                <div className='mt-12'>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-fuchsia-300 mb-4 border-b border-fuchsia-600/50 pb-2">
                        🎢 Swing Trading Calculator
                    </h1>
                    <p className="text-lg mb-4">
                        คำนวณขนาด Position Size และ TP/SL สำหรับกลยุทธ์ Swing Trading โดยใช้ Stop-Loss ใต้แนวรับสำคัญ
                    </p>
                    <GlassmorphismCard className="w-full">
                        <h2 className="text-2xl font-bold mb-4">เครื่องมือ Swing Trading Calculator (sideway)</h2>
                        <SwingTradingCalculator />
                    </GlassmorphismCard>
                </div>

                {/* 6. Breakout Trading Calculator */}
                <div className='mt-12'>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-fuchsia-300 mb-4 border-b border-fuchsia-600/50 pb-2">
                        🚀 Breakout Trading Calculator
                    </h1>
                    <p className="text-lg mb-4">
                        เครื่องมือบริหารความเสี่ยงและคำนวณขนาด Position Size สำหรับกลยุทธ์ Breakout โดยใช้ Stop-Loss ใต้แนวต้านเดิม
                    </p>
                    <GlassmorphismCard className="w-full">
                        <h2 className="text-2xl font-bold mb-4">เครื่องมือ Breakout Trading Calculator (Sideway-Up)</h2>
                        <BreakoutTradingCalculator />
                    </GlassmorphismCard>
                </div>

                {/* 7. Trend Following Calculator */}
                <div className='mt-12'>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-fuchsia-300 mb-4 border-b border-fuchsia-600/50 pb-2">
                        📈 Trend Following (ATR-based) Calculator
                    </h1>
                    <p className="text-lg mb-4">
                        เครื่องมือคำนวณ Position Size และ Stop-Loss/Take Profit โดยอิงจากค่า Average True Range (ATR) เพื่อการเทรดตามแนวโน้ม
                    </p>
                    <GlassmorphismCard className="w-full">
                        <h2 className="text-2xl font-bold mb-4">เครื่องมือ Trend Following (ATR-based) Calculator (Up-Trend)</h2>
                        <TrendFollowingCalculator />
                    </GlassmorphismCard>
                </div>

            </main>
        </div>
    );
}