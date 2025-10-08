// app/strategies/page.tsx
import GlassmorphismCard from '@/components/GlassmorphismCard';
import GooeyBackground from '@/components/GooeyBackground'; // นำเข้า GooeyBackground

import type { Metadata } from 'next';

// กำหนด Metadata สำหรับหน้า Strategies
export const metadata: Metadata = {
    title: 'Strategies | กลยุทธ์การเทรด Spot และ Arbitrage เพื่อทำกำไรสูงสุด',
    description: 'รวมกลยุทธ์การเทรดคริปโตแบบ Spot, Swing Trading, Day Trading, Trend Following, Arbitrage และการบริหารความเสี่ยงอย่างมืออาชีพ',
};

export default function StrategiesPage() {
    return (
        // Layout หลัก
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-gradient-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px]">
            <GooeyBackground />
            
            <main className="container mx-auto max-w-7xl flex flex-col gap-8">
                
                {/* Heading หลัก */}
                <h1 className="text-4xl sm:text-5xl font-extrabold text-fuchsia-400 mb-4 tracking-tight">
                    Strategies : กลยุทธ์การเทรด Spot และ Arbitrage เพื่อทำกำไรสูงสุด
                </h1>
                
                {/* บทนำ */}
                <p className="text-lg font-light max-w-4xl opacity-90 border-l-4 border-fuchsia-500 pl-4 py-1">
                    การเทรดแบบ <strong className="font-semibold text-fuchsia-300">Spot</strong> คือการซื้อและขายสินทรัพย์ทันทีโดยไม่มี Leverage ซึ่งจำเป็นต้องผสานระหว่าง <strong className="font-semibold text-fuchsia-300">การวิเคราะห์ตลาด</strong> และ <strong className="font-semibold text-fuchsia-300">การบริหารความเสี่ยง</strong>
                </p>

                {/* --- 1. กลยุทธ์หลักในการเทรด Spot (ตามสภาวะตลาด) --- */}
                <h2 className="text-3xl sm:text-4xl font-bold mt-8 mb-4 border-b border-gray-700 pb-2">
                    1. กลยุทธ์ทำกำไรในตลาดขาขึ้นและไซด์เวย์ (Spot Active Strategies)
                </h2>
                <p className="text-md opacity-80">
                    กลยุทธ์เหล่านี้เน้นการซื้อ-ขายทำกำไรในระยะสั้นถึงกลาง โดยใช้ประโยชน์จากความผันผวนของราคา :
                </p>

                {/* 1.1 Trend Following */}
                <div className="bg-gray-700/50 p-6 rounded-lg shadow-xl backdrop-blur-sm border border-gray-700">
                    <h3 className="text-2xl font-semibold mb-2 text-fuchsia-300">1.1 Trend Following (การเทรดตามแนวโน้ม)</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                        <li><strong className="text-fuchsia-200">แนวคิด :</strong> เข้าซื้อเมื่อมีการยืนยัน <strong className="font-semibold">แนวโน้มขาขึ้น (Uptrend)</strong> และถือยาว</li>
                        <li><strong className="text-yellow-300">สภาวะตลาดที่เหมาะสม :</strong> <strong className="font-bold">เทรนด์ขาขึ้น</strong> ที่แข็งแกร่งเท่านั้น</li>
                    </ul>
                </div>

                {/* 1.2 Swing Trading */}
                <div className="bg-gray-700/50 p-6 rounded-lg shadow-xl backdrop-blur-sm border border-gray-700">
                    <h3 className="text-2xl font-semibold mb-2 text-fuchsia-300">1.2 Swing Trading (การเทรดตามรอบสวิง)</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                        <li><strong className="text-fuchsia-200">แนวคิด :</strong> จับรอบการเคลื่อนไหวของราคาระยะสั้นถึงกลาง</li>
                        <li><strong className="text-yellow-300">สภาวะตลาดที่เหมาะสม :</strong> <strong className="font-bold">ตลาดที่มีรอบสวิง</strong> หรือ <strong className="font-bold">เทรนด์ขาขึ้นที่อ่อนแรง</strong></li>
                    </ul>
                </div>
                
                {/* 1.3 Range Trading */}
                <div className="bg-gray-700/50 p-6 rounded-lg shadow-xl backdrop-blur-sm border border-gray-700">
                    <h3 className="text-2xl font-semibold mb-2 text-fuchsia-300">1.3 Range Trading (การเทรดในกรอบ)</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                        <li><strong className="text-fuchsia-200">แนวคิด :</strong> ซื้อที่แนวรับและขายที่แนวต้านซ้ำๆ ภายในกรอบราคา</li>
                        <li><strong className="text-yellow-300">สภาวะตลาดที่เหมาะสม :</strong> <strong className="font-bold">ตลาดไซด์เวย์ (Sideways Market)</strong> หรือ <strong className="font-bold">ตลาดรวมตัว (Consolidation)</strong></li>
                    </ul>
                </div>

                {/* 1.4 Breakout Trading */}
                <div className="bg-gray-700/50 p-6 rounded-lg shadow-xl backdrop-blur-sm border border-gray-700">
                    <h3 className="text-2xl font-semibold mb-2 text-fuchsia-300">1.4 Breakout Trading (การเทรดตามการทะลุ)</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                        <li><strong className="text-fuchsia-200">แนวคิด :</strong> เข้าซื้อทันทีเมื่อราคาทะลุ <strong className="font-semibold">แนวต้าน</strong> พร้อม Volume สูง</li>
                        <li><strong className="text-yellow-300">สภาวะตลาดที่เหมาะสม :</strong> <strong className="font-bold">ช่วงเปลี่ยนสภาวะ</strong> จากไซด์เวย์เข้าสู่ <strong className="font-bold">เทรนด์ใหม่</strong></li>
                    </ul>
                </div>

                {/* 1.5 Day Trading / Scalping */}
                <div className="bg-gray-700/50 p-6 rounded-lg shadow-xl backdrop-blur-sm border border-gray-700">
                    <h3 className="text-2xl font-semibold mb-2 text-fuchsia-300">1.5 Day Trading / Scalping (การเทรดรายวัน / เก็บกำไรสั้น)</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                        <li><strong className="font-semibold">Scalping :</strong> ซื้อ-ขายในระยะเวลาอันสั้นมาก</li>
                        <li><strong className="text-yellow-300">สภาวะตลาดที่เหมาะสม :</strong> <strong className="font-bold">ทุกสภาวะตลาด</strong> ที่มี <strong className="font-bold">ความผันผวนสูง</strong> ในกรอบเวลาสั้น ๆ</li>
                    </ul>
                </div>

                {/* --- 2. กลยุทธ์ทำกำไรในตลาดขาลง (Bear Market Strategies) (ส่วนที่เพิ่มใหม่) --- */}
                <h2 className="text-3xl sm:text-4xl font-bold mt-8 mb-4 border-b border-red-700 pb-2 text-red-300">
                    2. กลยุทธ์ทำกำไรในตลาดขาลง (Bear Market Strategies)
                </h2>
                <p className="text-lg font-light max-w-4xl opacity-90 border-l-4 border-red-500 pl-4 py-1">
                    สำหรับตลาด Spot วิธีทำกำไรหลักในตลาดขาลงคือการ **ซื้อสะสม (Accumulate)** เพื่อรอการดีดตัวของราคา โดยอาศัยการบริหารความเสี่ยงและวินัยที่เข้มงวด
                </p>

                {/* 2.1 DCA */}
                <div className="bg-gray-700/50 p-6 rounded-lg shadow-xl backdrop-blur-sm border border-gray-700">
                    <h3 className="text-2xl font-semibold mb-2 text-red-300">2.1 ซื้อขายแบบถัวเฉลี่ยต้นทุน (<strong className="font-bold">DCA</strong>)</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                        <li><strong className="text-red-200">หลักการ :</strong> ซื้อคริปโตในปริมาณเงินที่เท่ากัน เป็นประจำตามช่วงเวลาที่กำหนด</li>
                        <li><strong className="text-red-200">ประโยชน์ :</strong> ช่วยลดความเสี่ยงจากความผันผวน และทำให้ได้ <strong className="font-semibold">ต้นทุนเฉลี่ยที่ต่ำลง</strong> เมื่อเทียบกับการซื้อครั้งเดียว</li>
                        <li><strong className="text-yellow-300">สภาวะตลาดที่เหมาะสม :</strong> <strong className="font-bold">เทรนด์ขาลง</strong> หรือ <strong className="font-bold">ตลาดรวมตัว</strong> ในกรอบเวลาใหญ่</li>
                    </ul>
                </div>

                {/* 2.2 ลงทุนในเหรียญระยะยาว */}
                <div className="bg-gray-700/50 p-6 rounded-lg shadow-xl backdrop-blur-sm border border-gray-700">
                    <h3 className="text-2xl font-semibold mb-2 text-red-300">2.2 ลงทุนในเหรียญที่มีศักยภาพระยะยาว</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                        <li><strong className="text-red-200">หลักการ :</strong> เลือกคริปโตที่เชื่อมั่นว่ามีศักยภาพในการเติบโตในอนาคต โดยอาศัย <strong className="font-semibold">Fundamental Analysis</strong></li>
                        <li><strong className="text-red-200">การปฏิบัติ :</strong> อาจพิจารณา <strong className="font-semibold">ขายบางส่วน</strong> ของสถานะซื้อที่มีอยู่ เพื่อนำเงินไปซื้อเหรียญอื่นที่มีโอกาสฟื้นตัวสูงกว่า</li>
                        <li><strong className="text-yellow-300">สภาวะตลาดที่เหมาะสม :</strong> <strong className="font-bold">เทรนด์ขาลง</strong> ที่กินเวลานาน (Bear Market)</li>
                    </ul>
                </div>
                
                <h3 className="text-xl font-semibold mt-4 mb-2 text-red-300">ข้อควรระวังในตลาดขาลง</h3>
                <ul className="list-disc list-outside space-y-4 ml-8 text-md">
                    <li><strong className="font-semibold">อย่าช้อนซื้อทันที :</strong> การคาดการณ์จุดต่ำสุด (Bottom) นั้นทำได้ยากมาก</li>
                    <li><strong className="font-semibold">ทำใจให้สงบ :</strong> ควบคุมอารมณ์ และหลีกเลี่ยงการตัดสินใจด้วยอารมณ์ร้อน (Panic Selling/Buying)</li>
                    <li><strong className="font-semibold">การกระจายพอร์ต :</strong> กระจายความเสี่ยงในคริปโตเคอร์เรนซีหลาย ๆ ประเภท</li>
                </ul>

                {/* --- 3. เครื่องมือและวิธีคาดการณ์แนวโน้มตลาด (TA/FA) (เดิมส่วนที่ 2) --- */}
                <h2 className="text-3xl sm:text-4xl font-bold mt-8 mb-4 border-b border-gray-700 pb-2">
                    3. เครื่องมือวิเคราะห์: คาดการณ์แนวโน้มตลาด
                </h2>
                {/* ... (เนื้อหา TA/FA ตามเดิม) ... */}
                <p className="text-md opacity-80">
                    การคาดการณ์แนวโน้มอาศัยทั้ง <strong className="font-semibold">Technical Analysis (TA)</strong> และ <strong className="font-semibold">Fundamental Analysis (FA)</strong>
                </p>
                
                <h3 className="text-2xl font-semibold mt-4 mb-2 text-fuchsia-300">3.1 การวิเคราะห์ทางเทคนิค (Technical Analysis - TA)</h3>
                <div className="overflow-x-auto">
                    <div className="min-w-[600px] border border-gray-600 rounded-lg overflow-hidden">
                        <div className="grid grid-cols-3 bg-gray-700 font-bold p-3 text-sm">
                            <span>ประเภทเครื่องมือ</span>
                            <span>เครื่องมือหลัก</span>
                            <span>หน้าที่และสัญญาณสำคัญ</span>
                        </div>
                        <div className="grid grid-cols-3 p-3 border-t border-gray-600 hover:bg-gray-800/50 transition-colors text-sm">
                            <span className="font-medium">แนวโน้ม (Trend)</span>
                            <span><strong className="font-semibold">Moving Averages (MA)</strong></span>
                            <span>ระบุทิศทางแนวโน้ม : <strong className="font-semibold text-green-400">Golden Cross</strong> คือสัญญาณซื้อ</span>
                        </div>
                        <div className="grid grid-cols-3 p-3 border-t border-gray-600 hover:bg-gray-800/50 transition-colors text-sm">
                            <span></span>
                            <span><strong className="font-semibold">Trend Lines / S&R</strong></span>
                            <span>กำหนด <strong className="font-semibold">แนวรับ</strong> และ <strong className="font-semibold">แนวต้าน</strong></span>
                        </div>
                        <div className="grid grid-cols-3 p-3 border-t border-gray-600 hover:bg-gray-800/50 transition-colors text-sm">
                            <span className="font-medium">โมเมนตัม (Momentum)</span>
                            <span><strong className="font-semibold">Relative Strength Index (RSI)</strong></span>
                            <span>วัดความเร็วและความแรง : Overbought (&gt;70), Oversold (&lt;30)</span>
                        </div>
                        <div className="grid grid-cols-3 p-3 border-t border-gray-600 hover:bg-gray-800/50 transition-colors text-sm">
                            <span></span>
                            <span><strong className="font-semibold">MACD</strong></span>
                            <span>สัญญาณซื้อเมื่อเส้น MACD ตัดขึ้นเหนือ Signal Line</span>
                        </div>
                        <div className="grid grid-cols-3 p-3 border-t border-gray-600 hover:bg-gray-800/50 transition-colors text-sm">
                            <span className="font-medium">ปริมาณ (Volume)</span>
                            <span><strong className="font-semibold">On-Balance Volume (OBV)</strong></span>
                            <span>ใช้ยืนยันความแข็งแกร่งของแนวโน้ม</span>
                        </div>
                    </div>
                </div>

                <h3 className="text-2xl font-semibold mt-8 mb-2 text-fuchsia-300">3.2 การวิเคราะห์ปัจจัยพื้นฐาน (Fundamental Analysis - FA)</h3>
                <ul className="list-disc list-inside space-y-4 ml-4 text-md">
                    <li>
                        <strong className="font-semibold">ข่าวสารและกฎหมาย :</strong> ติดตามการเปลี่ยนแปลงกฎหมาย, การยอมรับของสถาบัน
                    </li>
                    <li>
                        <strong className="font-semibold">กิจกรรมของโปรเจกต์ :</strong> ติดตามโร้ดแมป (<strong className="font-semibold">Roadmap</strong>), <strong className="font-semibold">On-chain Activity</strong>
                    </li>
                    <li>
                        <strong className="font-semibold">เศรษฐกิจมหภาค :</strong> การตัดสินใจอัตราดอกเบี้ยของ Fed
                    </li>
                </ul>


                {/* --- 4. กลยุทธ์เจาะลึกสำหรับคู่เทรดหลัก (เดิมส่วนที่ 3) --- */}
                <h2 className="text-3xl sm:text-4xl font-bold mt-8 mb-4 border-b border-gray-700 pb-2">
                    4. กลยุทธ์เจาะลึกสำหรับคู่เทรดหลัก
                </h2>
                <p className="text-md opacity-80">
                    การประยุกต์ใช้กลยุทธ์ตามลักษณะของคู่เหรียญหลัก :
                </p>

                <div className="overflow-x-auto">
                    <div className="min-w-[700px] border border-gray-600 rounded-lg overflow-hidden">
                        <div className="grid grid-cols-4 bg-gray-700 font-bold p-3 text-sm">
                            <span>คู่เทรด</span>
                            <span>ลักษณะตลาดที่ควรใช้</span>
                            <span>เครื่องมือวิเคราะห์หลัก</span>
                            <span>กลยุทธ์เน้นทำกำไร</span>
                        </div>
                        <div className="grid grid-cols-4 p-3 border-t border-gray-600 hover:bg-gray-800/50 transition-colors text-sm">
                            <strong className="font-semibold">BTC/USDT</strong>
                            <span>ผู้นำตลาด มีแนวโน้มชัดเจน</span>
                            <span>Moving Averages (MA)</span>
                            <span><strong className="font-semibold">สะสมซื้อ (Accumulate) :</strong> ใช้ DCA เมื่อราคาแตะแนวรับสำคัญ</span>
                        </div>
                        <div className="grid grid-cols-4 p-3 border-t border-gray-600 hover:bg-gray-800/50 transition-colors text-sm">
                            <strong className="font-semibold">ETH/USDT</strong>
                            <span>ตาม BTC แต่มีปัจจัยเฉพาะตัว</span>
                            <span>RSI / MACD</span>
                            <span><strong className="font-semibold">Swing Trade :</strong> จับรอบสั้น-กลาง</span>
                        </div>
                        <div className="grid grid-cols-4 p-3 border-t border-gray-600 hover:bg-gray-800/50 transition-colors text-sm">
                            <strong className="font-semibold">SOL/USDT</strong>
                            <span>ความผันผวนสูง ขับเคลื่อนด้วยข่าวสาร</span>
                            <span>Volume & Price Action</span>
                            <span><strong className="font-semibold">Breakout & Momentum :</strong> ซื้อเมื่อราคาทะลุแนวต้านพร้อม Volume ที่สูง</span>
                        </div>
                        <div className="grid grid-cols-4 p-3 border-t border-gray-600 hover:bg-gray-800/50 transition-colors text-sm">
                            <strong className="font-semibold">USDT/THB</strong>
                            <span>ตัวแยก (Buffer) ระหว่างเงินบาทกับคริปโต</span>
                            <span>อัตราแลกเปลี่ยน <strong className="font-semibold">USD/THB</strong></span>
                            <span><strong className="font-semibold">พักเงิน/รอจังหวะ :</strong> ใช้เป็นที่พักเงิน</span>
                        </div>
                    </div>
                </div>

                {/* --- 5. กลยุทธ์ Arbitrage (เดิมส่วนที่ 4) --- */}
                <h2 className="text-3xl sm:text-4xl font-bold mt-8 mb-4 border-b border-gray-700 pb-2">
                    5. กลยุทธ์ Arbitrage (การทำกำไรจากส่วนต่างราคา)
                </h2>
                <p className="text-md font-light opacity-90 border-l-4 border-fuchsia-500 pl-4 py-1">
                    <strong className="font-semibold text-fuchsia-300">กลยุทธ์ Arbitrage</strong> คือ การซื้อสินทรัพย์เดียวกันในตลาดหนึ่งและขายในอีกตลาดหนึ่งพร้อมกัน เพื่อทำกำไรจากส่วนต่างของราคา
                </p>

                <h3 className="text-xl font-semibold mt-4 mb-2 text-fuchsia-300">หลักการทำงานและสภาวะตลาดที่เหมาะสม</h3>
                <ul className="list-decimal list-inside space-y-2 ml-4 text-md">
                    <li><strong className="font-semibold">ระบุความแตกต่างของราคา :</strong> ค้นหาสินทรัพย์ที่มีราคาต่างกันเล็กน้อยในตลาดที่แตกต่างกัน</li>
                    <li><strong className="font-semibold">ดำเนินการซื้อขายพร้อมกัน :</strong> ซื้อสินทรัพย์ในตลาดที่ถูกกว่า และขายในตลาดที่แพงกว่า</li>
                    <li><strong className="text-yellow-300">สภาวะตลาดที่เหมาะสม :</strong> <strong className="font-bold">ตลาดที่มีประสิทธิภาพต่ำ</strong> หรือ <strong className="font-bold">ช่วงที่มีความผันผวนสูงมาก</strong> ทำให้เกิดส่วนต่างราคาชั่วคราว</li>
                </ul>
                
                <h3 className="text-xl font-semibold mt-4 mb-2 text-fuchsia-300">ข้อดีและข้อจำกัดของ Arbitrage</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-700/30 rounded-lg">
                        <strong className="block mb-2 text-lg text-green-300">✅ ข้อดีของกลยุทธ์</strong>
                        <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                            <li><strong className="font-semibold">เสี่ยงต่ำ :</strong> ในทางทฤษฎีถือเป็นการเก็งกำไรที่มีความเสี่ยงต่ำ</li>
                            <li><strong className="font-semibold">ทำกำไรได้ในทุกสภาวะตลาด :</strong> สามารถทำกำไรได้ทั้งขาขึ้นและขาลง</li>
                        </ul>
                    </div>
                    <div className="p-4 bg-red-700/30 rounded-lg">
                        <strong className="block mb-2 text-lg text-red-300">❌ ความเสี่ยงและข้อจำกัด</strong>
                        <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                            <li><strong className="font-semibold">ต้องใช้ความเร็ว :</strong> โอกาสเกิดขึ้นและหายไปอย่างรวดเร็ว</li>
                            <li><strong className="font-semibold">ค่าใช้จ่าย :</strong> ต้นทุนการทำธุรกรรมอาจลดทอนกำไร</li>
                            <li><strong className="font-semibold">เครื่องมือ :</strong> ต้องอาศัยอัลกอริทึมความถี่สูง (HFT) ที่ทันสมัย</li>
                            <li><strong className="font-semibold">นักลงทุนรายย่อย :</strong> ใช้ประโยชน์ได้ยาก เพราะต้องอาศัยการซื้อขายปริมาณมาก</li>
                        </ul>
                    </div>
                </div>

                {/* --- 6. การบริหารความเสี่ยง (เดิมส่วนที่ 5) --- */}
                <h2 className="text-3xl sm:text-4xl font-bold mt-8 mb-4 border-b border-fuchsia-500 pb-2 text-red-400">
                    6. การบริหารความเสี่ยง (<strong className="font-bold">Risk Management</strong>) ⚠️
                </h2>
                <p className="text-xl font-medium text-red-300">
                    การบริหารความเสี่ยงเป็นกุญแจสำคัญสู่การทำกำไรสูงสุดในระยะยาว :
                </p>
                <ul className="list-disc list-outside space-y-4 ml-8 text-md">
                    <li>
                        <strong className="font-semibold">ใช้คำสั่ง Stop-Loss เสมอ :</strong> ตั้งจุดตัดขาดทุนที่แน่นอนเพื่อจำกัดการสูญเสีย
                    </li>
                    <li>
                        <strong className="font-semibold">กำหนดขนาดสถานะ (Position Sizing) :</strong> ไม่ควรเสี่ยงเงินเกินกว่า <strong className="font-semibold">1-3%</strong> ของพอร์ตทั้งหมดต่อการเทรดหนึ่งครั้ง
                    </li>
                    <li>
                        <strong className="font-semibold">กระจายความเสี่ยง (Diversification) :</strong> ไม่ทุ่มเงินทั้งหมดในเหรียญเดียว
                    </li>
                    <li>
                        <strong className="font-semibold">มีวินัย :</strong> ยึดมั่นในกลยุทธ์ที่วางไว้และไม่ตัดสินใจตามอารมณ์ (<strong className="font-semibold">FOMO/FUD</strong>)
                    </li>
                    <li>
                        <strong className="font-semibold">Take Profit (TP) แบบแบ่งส่วน :</strong> เมื่อราคาถึงเป้าหมาย ให้ขายทำกำไรเป็นส่วน ๆ และตั้ง <strong className="font-semibold">Trailing Stop-Loss</strong> สำหรับส่วนที่เหลือเพื่อรันกำไรต่อไป
                    </li>
                </ul>

                <p className="mt-8 italic text-center opacity-70">
                    โปรดจำไว้ว่าการเทรดทุกรูปแบบมีความเสี่ยง ควรศึกษาข้อมูลและฝึกฝนอย่างสม่ำเสมอ
                </p>
            </main>
        </div>
    );
}