# 💡 สูตรคำนวณสำหรับ Day Trading / Scalping

เราจะใช้หลักการบริหารความเสี่ยงแบบ **Percent of Capital** ซึ่งเป็นมาตรฐานของเทรดเดอร์มืออาชีพ:

| พารามิเตอร์ | ความหมาย | ตัวอย่างกำหนดค่า |
| :--- | :--- | :--- |
| **$C_{\text{Total}}$** | ทุนรวมในพอร์ต | $10,000 USD$ |
| **$R_{\text{Percent}}$** | ความเสี่ยงสูงสุดต่อการเทรด (Percent of Capital) | $1\%$ |
| **$P_{\text{Entry}}$** | ราคาเข้าซื้อ | $1.50 USD$ |
| **$P_{\text{SL}}$** | ราคา Stop-Loss (ราคาที่ยอมตัดขาดทุน) | $1.45 USD$ |
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

### 💻 โค้ดและคำแนะนำการใช้งาน

### 1\. การสร้าง Component `ScalpingCalculator.tsx`

สร้างไฟล์ใหม่ที่ `src/components/ScalpingCalculator.tsx` แล้วคัดลอกโค้ดด้านล่างนี้:

```tsx
// src/components/ScalpingCalculator.tsx
"use client";

import React, { useState, useMemo } from 'react';
import GlassmorphismCard from '@/components/GlassmorphismCard';

export default function ScalpingCalculator() {
    // 1. กำหนด State สำหรับ Input
    const [totalCapital, setTotalCapital] = useState<number | string>(10000); // C_Total
    const [riskPercent, setRiskPercent] = useState<number | string>(1); // R_Percent (เป็น %)
    const [entryPrice, setEntryPrice] = useState<number | string>(1.50); // P_Entry
    const [stopLossPrice, setStopLossPrice] = useState<number | string>(1.45); // P_SL
    const [riskRewardRatio, setRiskRewardRatio] = useState<number | string>(2); // R/R

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

        // ตรวจสอบความสมเหตุสมผลของจุดเข้าและจุด Stop-Loss (P_Entry ต้องมากกว่า P_SL)
        if (P_Entry <= P_SL) {
            return { isValid: false, errorMessage: 'ราคาเข้าซื้อ (Entry) ต้องสูงกว่าราคา Stop-Loss (SL) สำหรับการ Long Position.' };
        }

        // 1. คำนวณ Risk per Trade (R_Trade)
        const R_Trade = C_Total * (R_Percent / 100);

        // 2. คำนวณ Risk per Unit (R_Unit)
        const R_Unit = P_Entry - P_SL;

        // 3. คำนวณ Position Size (Q_Size)
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

    // ฟังก์ชันช่วยในการจัดรูปแบบตัวเลข: แก้ไขให้รับค่าเป็น number หรือ undefined ได้
    const formatNumber = (num: number | undefined, decimalPlaces: number = 2) => {
        if (num === undefined || isNaN(num)) return 'N/A';
        return num.toLocaleString('en-US', {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces,
        });
    };

    const inputClass = "w-full p-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 transition-all text-white placeholder-white/50";
    const labelClass = "block text-sm font-medium mb-1 opacity-90";
    const resultTitleClass = "text-xl font-bold mb-1 text-fuchsia-400";
    const resultValueClass = "text-2xl font-extrabold";

    // การสร้างตัวแปร Type Narrowing เพื่อให้โค้ดสะอาดขึ้น
    const results = calculationResults.isValid ? calculationResults : null;

    return (
        <GlassmorphismCard className="p-6 md:p-10 w-full max-w-4xl">
            <h3 className="text-3xl font-bold mb-6 text-center text-white">เครื่องมือคำนวณ Scalping/Day Trading Position Sizer</h3>
            <p className="text-center text-white/80 mb-8">จัดการความเสี่ยงด้วยการกำหนด Position Size ที่แม่นยำ</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {/* Input C_Total */}
                <div>
                    {/* แก้ไข: ลบ $C_{\text{Total}}$ ออก */}
                    <label htmlFor="totalCapital" className={labelClass}>ทุนรวมในพอร์ต (C_Total)</label>
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
                    {/* แก้ไข: ลบ $R_{\text{Percent}}$ ออก */}
                    <label htmlFor="riskPercent" className={labelClass}>ความเสี่ยงต่อการเทรด (R_Percent %)</label>
                    <input
                        id="riskPercent"
                        type="number"
                        min="0.1"
                        step="0.1"
                        value={riskPercent}
                        onChange={(e) => setRiskPercent(e.target.value)}
                        className={inputClass}
                        placeholder="เช่น 1% (แนะนำไม่เกิน 2%)"
                    />
                </div>
                {/* Input P_Entry */}
                <div>
                    {/* แก้ไข: ลบ $P_{\text{Entry}}$ ออก */}
                    <label htmlFor="entryPrice" className={labelClass}>ราคาเข้าซื้อ (P_Entry)</label>
                    <input
                        id="entryPrice"
                        type="number"
                        min="0.0001"
                        step="0.0001"
                        value={entryPrice}
                        onChange={(e) => setEntryPrice(e.target.value)}
                        className={inputClass}
                        placeholder="เช่น 1.50"
                    />
                </div>
                {/* Input P_SL */}
                <div>
                    {/* แก้ไข: ลบ $P_{\text{SL}}$ ออก */}
                    <label htmlFor="stopLossPrice" className={labelClass}>ราคา Stop-Loss (P_SL)</label>
                    <input
                        id="stopLossPrice"
                        type="number"
                        min="0.0001"
                        step="0.0001"
                        value={stopLossPrice}
                        onChange={(e) => setStopLossPrice(e.target.value)}
                        className={inputClass}
                        placeholder="เช่น 1.45"
                    />
                </div>
                {/* Input R/R */}
                <div className="md:col-span-2">
                    <label htmlFor="riskRewardRatio" className={labelClass}>อัตราส่วน Risk-Reward (R/R)</label>
                    <input
                        id="riskRewardRatio"
                        type="number"
                        min="1"
                        step="0.5"
                        value={riskRewardRatio}
                        onChange={(e) => setRiskRewardRatio(e.target.value)}
                        className={inputClass}
                        placeholder="เช่น 2 (หมายถึง 2:1)"
                    />
                </div>
            </div>

            {/* ส่วนแสดงผลลัพธ์หลัก */}
            {results ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-b border-white/20 py-6 mb-8 text-center">
                        <div className="p-3 bg-fuchsia-800/10 rounded-lg">
                            <p className={resultTitleClass}>ความเสี่ยงต่อการเทรด (R_Trade)</p>
                            {/* แก้ไข: ใช้ results!.R_Trade เพื่อยืนยันว่าเป็น number */}
                            <p className={resultValueClass}>{formatNumber(results.R_Trade, 2)} USD</p>
                            <p className="text-xs opacity-70 mt-1">(R_Percent: {riskPercent}%)</p>
                        </div>
                        <div className="p-3 bg-fuchsia-800/10 rounded-lg">
                            <p className={resultTitleClass}>ขนาด Position (Q_Size)</p>
                            {/* แก้ไข: ใช้ results!.Q_Size เพื่อยืนยันว่าเป็น number */}
                            <p className={resultValueClass}>{formatNumber(results.Q_Size, 4)} หน่วย</p>
                            {/* บรรทัดที่ 172 ที่แจ้ง Error: ใช้ results!.Q_Size */}
                            {/* ใช้ results!.Q_Size เพื่อยืนยันว่าเป็น number ก่อนคูณ */}
                            <p className="text-xs opacity-70 mt-1">ซื้อได้ {formatNumber(results.Q_Size! * Number(entryPrice), 2)} USD</p>
                        </div>
                        <div className="p-3 bg-fuchsia-800/10 rounded-lg">
                            <p className={resultTitleClass}>จุดขายทำกำไร (P_TP)</p>
                            {/* แก้ไข: ใช้ results!.P_TP */}
                            <p className={resultValueClass}>{formatNumber(results.P_TP, 4)} USD</p>
                            {/* แก้ไข: ใช้ results!.expectedProfit */}
                            <p className="text-xs opacity-70 mt-1">กำไรที่คาดหวัง: {formatNumber(results.expectedProfit, 2)} USD</p>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <h4 className="text-xl font-bold mb-3 text-white/90">สรุปแผนการเทรด</h4>
                        <div className="grid grid-cols-3 gap-2">
                            <div className="p-3 rounded-lg bg-green-700/30">
                                <p className="text-sm font-semibold text-green-300">Take Profit</p>
                                {/* แก้ไข: ใช้ results!.P_TP */}
                                <p className="text-lg font-bold">{formatNumber(results.P_TP, 4)}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-blue-700/30">
                                <p className="text-sm font-semibold text-blue-300">Entry Price</p>
                                <p className="text-lg font-bold">{formatNumber(Number(entryPrice), 4)}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-red-700/30">
                                <p className="text-sm font-semibold text-red-300">Stop Loss</p>
                                <p className="text-lg font-bold">{formatNumber(Number(stopLossPrice), 4)}</p>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                // ... (ส่วน Error Message) ...
                <div className="text-center p-8 bg-red-800/20 rounded-lg">
                    <p className="text-red-400 font-bold text-lg">
                        ⚠️ กรุณาป้อนข้อมูลที่ถูกต้อง:
                    </p>
                    <p className="text-sm mt-2 opacity-80">
                        {calculationResults.errorMessage || 'ค่าทั้งหมดต้องมากกว่าศูนย์ และราคาเข้าซื้อต้องมากกว่า Stop-Loss'}
                    </p>
                </div>
            )}
        </GlassmorphismCard>
    );
}
```

-----

### 2\. การสร้าง Component Page: `src/app/asset/day-trading/page.tsx`

สร้างโฟลเดอร์ `day-trading` ภายใน `src/app/asset/` และสร้างไฟล์ `page.tsx` ภายในนั้น:

```tsx
// src/app/asset/day-trading/page.tsx
import GooeyBackground from '@/components/GooeyBackground';
import ScalpingCalculator from '@/components/ScalpingCalculator'; // นำเข้าเครื่องมือคำนวณ Scalping

export default function DayTradingPage() {
    return (
        // การจัดวางเนื้อหาและพื้นหลังตามแนวทางที่คุณกำหนด
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-gradient-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px]">
            <GooeyBackground />

            <main className="container mx-auto max-w-7xl flex flex-col gap-10">

                <section className="text-center mb-8">
                    <h1 className="text-5xl font-extrabold mb-4 text-fuchsia-400 drop-shadow-lg">
                        ⚡ Day Trading & Scalping Position Sizer
                    </h1>
                    <p className="text-xl font-light opacity-90 max-w-4xl mx-auto">
                        เครื่องมือคำนวณขนาด Position และจุดทำกำไร/ตัดขาดทุน 
                        เพื่อจำกัดความเสี่ยงไม่ให้เกิน $R_{\text{Percent}}$ ต่อการเทรดอย่างเคร่งครัด
                    </p>
                </section>

                <section className="w-full flex justify-center">
                    <ScalpingCalculator />
                </section>

            </main>
        </div>
    );
}
```

ตอนนี้คุณจะมีเครื่องมือคำนวณสำหรับการเทรดแบบ Day Trading/Scalping ที่เน้นการบริหารความเสี่ยงโดยเฉพาะ และแยกหน้าออกจาก DCA อย่างเป็นระเบียบเรียบร้อยที่เส้นทาง **/asset/day-trading** ครับ\!
