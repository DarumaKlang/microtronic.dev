// app/finance/capital-gains/page.tsx
import GooeyBackground from '@/components/GooeyBackground';
import GlassmorphismCard from '@/components/GlassmorphismCard';

export default function CapitalGainsPage() {
    return (
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-gradient-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px]">
            <GooeyBackground />

            <main className="container mx-auto max-w-7xl flex flex-col gap-8">
                
                <h1 className="text-4xl sm:text-5xl font-extrabold text-fuchsia-400 mb-4 tracking-tight">
                    Capital Gains: กำไรระยะสั้น vs ระยะยาว
                </h1>
                
                <p className="text-xl opacity-90">
                    ยินดีครับ! นี่คือคำอธิบายที่กระชับและชัดเจนเกี่ยวกับ **Short-Term Capital Gains** และ **Long-Term Capital Gains** ซึ่งมีความสำคัญมากในการคำนวณภาษีกำไรจากการลงทุนครับ
                </p>

                <GlassmorphismCard className="p-6 md:p-10">

                    {/* Capital Gains คืออะไร? */}
                    <h2 className="text-3xl font-bold mb-4 text-fuchsia-300">
                        📈 Capital Gains คืออะไร?
                    </h2>
                    <p className="mb-6 text-lg">
                        <span className="font-semibold">Capital Gain</span> คือ **กำไร** ที่เกิดขึ้นจากการขายทรัพย์สิน (Asset) เช่น หุ้น พันธบัตร อสังหาริมทรัพย์ หรือสินทรัพย์ดิจิทัล ในราคาที่สูงกว่าต้นทุนที่คุณซื้อมา
                    </p>
                    <p className="mb-8 text-lg">
                        Capital Gains จะถูกแบ่งออกเป็น 2 ประเภทหลัก โดยพิจารณาจาก **ระยะเวลาที่คุณถือครองสินทรัพย์นั้นๆ** ก่อนที่จะขายออกไป
                    </p>

                    {/* Short-Term Capital Gains */}
                    <div className="border-t border-fuchsia-600/50 pt-8 mt-8">
                        <h3 className="text-2xl font-bold mb-3 text-green-300">
                            ⏱️ 1. Short-Term Capital Gains (กำไรระยะสั้น)
                        </h3>
                        <p className="mb-4 text-lg">
                            **Short-Term Capital Gains** คือ กำไรที่ได้จากการขายสินทรัพย์ที่คุณถือครองไว้เป็นระยะเวลา **1 ปี (365 วัน) หรือน้อยกว่า**
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4 mb-6">
                            <li>
                                <span className="font-semibold">ระยะเวลาถือครอง:</span> **≤ 1 ปี**
                            </li>
                            <li>
                                <span className="font-semibold">อัตราภาษี:</span> มักจะถูกนำไปรวมกับ **รายได้ปกติ (Ordinary Income)** ของคุณ เช่น เงินเดือน และจะถูกคำนวณภาษีตามอัตราภาษีเงินได้บุคคลธรรมดาปกติ ซึ่งโดยทั่วไปแล้วอัตราภาษีจะ <span className="text-red-400">**สูงกว่า**</span> Long-Term Capital Gains
                            </li>
                        </ul>
                    </div>

                    {/* Long-Term Capital Gains */}
                    <div className="border-t border-fuchsia-600/50 pt-8 mt-8">
                        <h3 className="text-2xl font-bold mb-3 text-blue-300">
                            ⏳ 2. Long-Term Capital Gains (กำไรระยะยาว)
                        </h3>
                        <p className="mb-4 text-lg">
                            **Long-Term Capital Gains** คือ กำไรที่ได้จากการขายสินทรัพย์ที่คุณถือครองไว้เป็นระยะเวลา **มากกว่า 1 ปี**
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4 mb-6">
                            <li>
                                <span className="font-semibold">ระยะเวลาถือครอง:</span> **มากกว่า 1 ปี**
                            </li>
                            <li>
                                <span className="font-semibold">อัตราภาษี:</span> โดยส่วนใหญ่แล้วจะได้รับอัตราภาษีพิเศษที่ <span className="text-green-400">**ต่ำกว่า**</span> อัตราภาษีเงินได้ปกติ ทั้งนี้ขึ้นอยู่กับกฎหมายภาษีของแต่ละประเทศ
                            </li>
                        </ul>
                    </div>
                </GlassmorphismCard>
                
                <GlassmorphismCard className="p-6 md:p-10 mt-8">
                    <h3 className="text-2xl font-bold mb-6 text-yellow-300">
                        🔑 สรุปความแตกต่างที่สำคัญที่สุด
                    </h3>
                    
                    {/* ตารางสรุป */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-white/20">
                            <thead>
                                <tr className="bg-white/10">
                                    <th className="px-6 py-3 text-left text-sm font-medium text-white/80 uppercase tracking-wider">
                                        คุณสมบัติ
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-white/80 uppercase tracking-wider">
                                        Short-Term Capital Gains
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-white/80 uppercase tracking-wider">
                                        Long-Term Capital Gains
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap font-semibold">ระยะเวลาถือครอง</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-red-300">1 ปี หรือน้อยกว่า</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-green-300">มากกว่า 1 ปี</td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap font-semibold">อัตราภาษี</td>
                                    <td className="px-6 py-4 whitespace-nowrap">อัตราภาษีเงินได้ปกติ (สูงกว่า)</td>
                                    <td className="px-6 py-4 whitespace-nowrap">อัตราภาษีพิเศษ (ต่ำกว่า)</td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap font-semibold">วัตถุประสงค์</td>
                                    <td className="px-6 py-4">มักใช้กับนักเทรด (Trader)</td>
                                    <td className="px-6 py-4">มักใช้กับนักลงทุน (Investor)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <p className="mt-8 text-lg text-white/80 border-t border-white/20 pt-4">
                        <span className="font-semibold text-fuchsia-300">โดยสรุป:</span> รัฐบาลมักจะให้สิทธิประโยชน์ทางภาษีสำหรับ **Long-Term Capital Gains** เพื่อจูงใจให้ผู้คนลงทุนในตลาดและถือครองสินทรัพย์ในระยะยาว ซึ่งเป็นการช่วยสร้างเสถียรภาพและพัฒนาเศรษฐกิจครับ
                    </p>
                </GlassmorphismCard>

            </main>
        </div>
    );
}