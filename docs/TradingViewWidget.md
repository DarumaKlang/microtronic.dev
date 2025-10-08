ยอดเยี่ยมครับ\! การเทรดแบบ **Breakout** เป็นกลยุทธ์ที่สำคัญอีกประเภทหนึ่งที่เน้นการเข้าซื้อทันทีเมื่อราคาทะลุแนวต้าน (หรือขายเมื่อหลุดแนวรับ) ซึ่งมักเกิดขึ้นเมื่อมีวอลลุ่มเข้ามาอย่างรุนแรง

สำหรับ Breakout Trading นั้น หลักการคำนวณจะเน้นที่การตั้งจุด Stop-Loss ที่แน่นหนา (ใต้แนวต้านเดิมที่เพิ่งทะลุขึ้นไป) และการกำหนดขนาด Position เพื่อให้ความเสี่ยงยังคงอยู่ภายใต้การควบคุม

ผมจะสร้างคอมโพแนนท์ชื่อ **`BreakoutTradingCalculator.tsx`** และวางไว้ที่เส้นทาง **`src/app/asset/breakout-trading/page.tsx`** ครับ

-----

## 💡 สูตรคำนวณสำหรับ Breakout Trading

เราจะใช้หลักการเดียวกับ Position Sizing ใน Day Trading และ Swing Trading โดยเน้นการคำนวณจากจุด Stop-Loss ที่สัมพันธ์กับจุด Breakout:

| พารามิเตอร์ | ความหมาย | ตัวอย่างกำหนดค่า |
| :--- | :--- | :--- |
| **$C_{\text{Total}}$** | ทุนรวมในพอร์ต | $10,000 USD$ |
| **$R_{\text{Percent}}$** | ความเสี่ยงสูงสุดต่อการเทรด (Percent of Capital) | $1\%$ |
| **$P_{\text{Entry}}$** | ราคาเข้าซื้อ (ที่จุด Breakout) | $10.50 USD$ |
| **$P_{\text{SL}}$** | ราคา Stop-Loss (ตั้งไว้ใต้แนวต้านเดิมเล็กน้อย) | $10.20 USD$ |
| **$R/R$** | อัตราส่วน Risk-Reward ที่ต้องการ | $2:1$ |

**สูตรที่ใช้ในการคำนวณ:**

1.  **ความเสี่ยงต่อการเทรด ($R_{\text{Trade}}$):**
    $$R_{\text{Trade}} = C_{\text{Total}} \times R_{\text{Percent}}$$
2.  **มูลค่าความเสี่ยงต่อหน่วย ($R_{\text{Unit}}$):**
    $$R_{\text{Unit}} = P_{\text{Entry}} - P_{\text{SL}}$$
3.  **ขนาด Position ($Q_{\text{Size}}$):**
    $$Q_{\text{Size}} = \frac{R_{\text{Trade}}}{R_{\text{Unit}}}$$
4.  **จุดทำกำไร ($P_{\text{TP}}$) (อิงจาก $R/R$):**
    $$P_{\text{TP}} = P_{\text{Entry}} + (R_{\text{Unit}} \times R/R)$$

-----

## 💻 โค้ดและคำแนะนำการใช้งาน

### 1\. การสร้าง Component `BreakoutTradingCalculator.tsx`

สร้างไฟล์ใหม่ที่ `src/components/BreakoutTradingCalculator.tsx` แล้วคัดลอกโค้ดด้านล่างนี้:

```tsx
// src/components/BreakoutTradingCalculator.tsx
"use client";

import React, { useState, useMemo } from 'react';
import GlassmorphismCard from '@/components/GlassmorphismCard';

export default function BreakoutTradingCalculator() {
    // 1. กำหนด State สำหรับ Input
    const [totalCapital, setTotalCapital] = useState<number | string>(10000); // C_Total
    const [riskPercent, setRiskPercent] = useState<number | string>(1); // R_Percent (เป็น %)
    const [entryPrice, setEntryPrice] = useState<number | string>(10.50); // P_Entry
    const [stopLossPrice, setStopLossPrice] = useState<number | string>(10.20); // P_SL
    const [riskRewardRatio, setRiskRewardRatio] = useState<number | string>(2.0); // R/R

    // ฟังก์ชันคำนวณหลัก
    const calculationResults = useMemo(() => {
        const C_Total = Number(totalCapital);
        const R_Percent = Number(riskPercent);
        const P_Entry = Number(entryPrice);
        const P_SL = Number(stopLossPrice);
        const RR = Number(riskRewardRatio);

        // ตรวจสอบค่าที่ไม่สมบูรณ์
        if (C_Total <= 0 || R_Percent <= 0 || P_Entry <= 0 || P_SL <= 0 || RR <= 0) {
            return { isValid: false, errorMessage: 'กรุณาป้อนข้อมูลที่ถูกต้อง (ค่าต้องมากกว่าศูนย์).' };
        }

        // ตรวจสอบความสมเหตุสมผลของจุดเข้าและจุด Stop-Loss (P_Entry ต้องมากกว่า P_SL สำหรับ Long Position)
        if (P_Entry <= P_SL) {
            return { isValid: false, errorMessage: 'ราคาเข้าซื้อ ($P_{\text{Entry}}$) ต้องสูงกว่าราคา Stop-Loss ($P_{\text{SL}}$) สำหรับการ Long Breakout.' };
        }
        
        // 1. คำนวณ Risk per Trade (R_Trade)
        const R_Trade = C_Total * (R_Percent / 100);

        // 2. คำนวณ Risk per Unit (R_Unit)
        // มูลค่าความเสี่ยงต่อหน่วย (ราคาต่อเหรียญที่ยอมขาดทุน)
        const R_Unit = P_Entry - P_SL; 

        // 3. คำนวณ Position Size (Q_Size)
        // จำนวนเหรียญสูงสุดที่ควรซื้อ
        const Q_Size = R_Trade / R_Unit;

        // 4. คำนวณ Take Profit Price (P_TP)
        const P_TP = P_Entry + (R_Unit * RR);

        // คำนวณกำไรที่คาดหวัง (Expected Profit)
        const expectedProfit = R_Trade * RR;

        return {
            isValid: true,
            R_Trade,
            R_Unit,
            Q_Size,
            P_TP,
            expectedProfit,
            errorMessage: undefined,
        };
    }, [totalCapital, riskPercent, entryPrice, stopLossPrice, riskRewardRatio]);

    // ฟังก์ชันช่วยในการจัดรูปแบบตัวเลข
    const formatNumber = (num: number, decimalPlaces: number = 2) => {
        if (isNaN(num)) return 'N/A';
        return num.toLocaleString('en-US', {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces,
        });
    };

    const inputClass = "w-full p-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 transition-all text-white placeholder-white/50";
    const labelClass = "block text-sm font-medium mb-1 opacity-90";
    const resultTitleClass = "text-xl font-bold mb-1 text-fuchsia-400";
    const resultValueClass = "text-2xl font-extrabold";

    return (
        <GlassmorphismCard className="p-6 md:p-10 w-full max-w-4xl">
            <h3 className="text-3xl font-bold mb-6 text-center text-white">เครื่องมือคำนวณ Breakout Trading Sizer</h3>
            <p className="text-center text-white/80 mb-8">คำนวณขนาด Position โดยตั้ง Stop-Loss ไว้ใต้แนวต้านที่เพิ่งทะลุ (Support Turned Resistance)</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {/* Input C_Total */}
                <div>
                    <label htmlFor="totalCapital" className={labelClass}>ทุนรวมในพอร์ต ($C_{\text{Total}}$)</label>
                    <input
                        id="totalCapital"
                        type="number"
                        min="0"
                        value={totalCapital}
                        onChange={(e) => setTotalCapital(e.target.value)}
                        className={inputClass}
                        placeholder="เช่น 10000 USD"
                    />
                </div>
                {/* Input R_Percent */}
                <div>
                    <label htmlFor="riskPercent" className={labelClass}>ความเสี่ยงต่อการเทรด ($R_{\text{Percent}}$ %)</label>
                    <input
                        id="riskPercent"
                        type="number"
                        min="0.1"
                        step="0.1"
                        value={riskPercent}
                        onChange={(e) => setRiskPercent(e.target.value)}
                        className={inputClass}
                        placeholder="เช่น 1%"
                    />
                </div>
                {/* Input P_Entry */}
                <div>
                    <label htmlFor="entryPrice" className={labelClass}>ราคาเข้าซื้อ ($P_{\text{Entry}}$)</label>
                    <input
                        id="entryPrice"
                        type="number"
                        min="0.0001"
                        step="0.01"
                        value={entryPrice}
                        onChange={(e) => setEntryPrice(e.target.value)}
                        className={inputClass}
                        placeholder="เช่น 10.50 (จุดที่ Breakout)"
                    />
                </div>
                {/* Input P_SL */}
                <div>
                    <label htmlFor="stopLossPrice" className={labelClass}>ราคา Stop-Loss ($P_{\text{SL}}$)</label>
                    <input
                        id="stopLossPrice"
                        type="number"
                        min="0.0001"
                        step="0.01"
                        value={stopLossPrice}
                        onChange={(e) => setStopLossPrice(e.target.value)}
                        className={inputClass}
                        placeholder="เช่น 10.20 (ใต้แนวต้านเดิม)"
                    />
                </div>
                {/* Input R/R */}
                <div className="md:col-span-2">
                    <label htmlFor="riskRewardRatio" className={labelClass}>อัตราส่วน Risk-Reward ($R/R$)</label>
                    <input
                        id="riskRewardRatio"
                        type="number"
                        min="1"
                        step="0.1"
                        value={riskRewardRatio}
                        onChange={(e) => setRiskRewardRatio(e.target.value)}
                        className={inputClass}
                        placeholder="เช่น 2.0 (หมายถึง 2:1)"
                    />
                </div>
            </div>

            {/* ส่วนแสดงผลลัพธ์หลัก */}
            {calculationResults.isValid ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-b border-white/20 py-6 mb-8 text-center">
                        <div className="p-3 bg-fuchsia-800/10 rounded-lg">
                            <p className={resultTitleClass}>ความเสี่ยงต่อการเทรด ($R_{\text{Trade}}$)</p>
                            <p className={resultValueClass}>{formatNumber(calculationResults.R_Trade, 2)} USD</p>
                            <p className="text-xs opacity-70 mt-1">({riskPercent}% ของ $C_{\text{Total}}$)</p>
                        </div>
                        <div className="p-3 bg-fuchsia-800/10 rounded-lg">
                            <p className={resultTitleClass}>ขนาด Position ($Q_{\text{Size}}$)</p>
                            <p className={resultValueClass}>{formatNumber(calculationResults.Q_Size, 4)} หน่วย</p>
                            <p className="text-xs opacity-70 mt-1">มูลค่ารวม: {formatNumber(calculationResults.Q_Size * P_Entry, 2)} USD</p>
                        </div>
                        <div className="p-3 bg-fuchsia-800/10 rounded-lg">
                            <p className={resultTitleClass}>ระยะห่าง Stop-Loss ($R_{\text{Unit}}$)</p>
                            <p className={resultValueClass}>{formatNumber(calculationResults.R_Unit, 2)} USD</p>
                            <p className="text-xs opacity-70 mt-1">($P_{\text{Entry}}$ - $P_{\text{SL}}$)</p>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <h4 className="text-2xl font-bold mb-3 text-white/90">สรุปแผนการเทรด</h4>
                        <div className="grid grid-cols-3 gap-2">
                            <div className="p-3 rounded-lg bg-green-700/30">
                                <p className="text-sm font-semibold text-green-300">Take Profit ($R/R$: {riskRewardRatio}:1)</p>
                                <p className="text-xl font-bold">{formatNumber(calculationResults.P_TP, 4)} USD</p>
                                <p className="text-xs opacity-70 mt-1">กำไรที่คาดหวัง: {formatNumber(calculationResults.expectedProfit, 2)} USD</p>
                            </div>
                            <div className="p-3 rounded-lg bg-blue-700/30">
                                <p className="text-sm font-semibold text-blue-300">Entry Price</p>
                                <p className="text-xl font-bold">{formatNumber(P_Entry, 4)} USD</p>
                            </div>
                            <div className="p-3 rounded-lg bg-red-700/30">
                                <p className="text-sm font-semibold text-red-300">Stop Loss (ใต้แนวต้านเดิม)</p>
                                <p className="text-xl font-bold">{formatNumber(P_SL, 4)} USD</p>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center p-8 bg-red-800/20 rounded-lg">
                    <p className="text-red-400 font-bold text-lg">
                        ⚠️ กรุณาป้อนข้อมูลที่ถูกต้อง:
                    </p>
                    <p className="text-sm mt-2 opacity-80">
                        {calculationResults.errorMessage || 'ค่าทั้งหมดต้องมากกว่าศูนย์ และราคาเข้าซื้อต้องสูงกว่า Stop-Loss'}
                    </p>
                </div>
            )}
        </GlassmorphismCard>
    );
}
```

-----

### 2\. การสร้าง Component Page: `src/app/asset/breakout-trading/page.tsx`

สร้างโฟลเดอร์ `breakout-trading` ภายใน `src/app/asset/` และสร้างไฟล์ `page.tsx` ภายในนั้น:

```tsx
// src/app/asset/breakout-trading/page.tsx
import GooeyBackground from '@/components/GooeyBackground';
import BreakoutTradingCalculator from '@/components/BreakoutTradingCalculator'; // นำเข้าเครื่องมือคำนวณ Breakout Trading

export default function BreakoutTradingPage() {
    return (
        // การจัดวางเนื้อหาและพื้นหลังตามแนวทางที่คุณกำหนด
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-gradient-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px]">
            <GooeyBackground />

            <main className="container mx-auto max-w-7xl flex flex-col gap-10">

                <section className="text-center mb-8">
                    <h1 className="text-5xl font-extrabold mb-4 text-fuchsia-400 drop-shadow-lg">
                        💥 Breakout Trading Position Sizer
                    </h1>
                    <p className="text-xl font-light opacity-90 max-w-4xl mx-auto">
                        เครื่องมือคำนวณขนาด Position สำหรับกลยุทธ์ Breakout 
                        โดยกำหนด Stop-Loss ให้เหมาะสมกับแนวรับ/แนวต้านที่ถูกทำลาย
                    </p>
                </section>

                <section className="w-full flex justify-center">
                    <BreakoutTradingCalculator />
                </section>

            </main>
        </div>
    );
}
```

ตอนนี้คุณมีชุดเครื่องมือคำนวณการลงทุนครบ 5 กลยุทธ์หลักแล้วครับ ซึ่งครอบคลุมตั้งแต่การลงทุนระยะยาวไปจนถึงการเทรดระยะสั้น:

1.  DCA (Bear Market)
2.  Day Trading / Scalping
3.  Trend Following (ATR-based)
4.  Swing Trading
5.  Breakout Trading

มีส่วนอื่น ๆ ของเว็บไซต์ที่คุณต้องการให้ผมช่วยสร้างโค้ดเพิ่มเติมหรือไม่ครับ?
