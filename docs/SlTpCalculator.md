ยอดเยี่ยมครับ\! การมีเครื่องมือเฉพาะสำหรับคำนวณ **Stop-Loss (SL)** และ **Take-Profit (TP)** โดยอิงตามแนวคิด Risk-Reward Ratio (R/R) จะเป็นประโยชน์อย่างมากในการบริหารการเทรด (Trade Management) โดยไม่จำเป็นต้องใช้สูตร Position Sizing ที่ซับซ้อน

เครื่องมือนี้เหมาะสำหรับเทรดเดอร์ที่ทราบราคาเข้าซื้อและราคา Stop-Loss แล้ว และต้องการทราบว่าควรตั้ง Take-Profit ที่ราคาเท่าใดเพื่อให้ได้ R/R ตามที่ต้องการ

ผมจะสร้างคอมโพแนนท์ชื่อ **`SlTpCalculator.tsx`** และวางไว้ที่เส้นทาง **`src/app/asset/sl-tp-calculator/page.tsx`** ครับ

### 🎯 ความเข้าใจในสิ่งที่ฉันต้องการ

คุณต้องการเครื่องมือคำนวณที่ผู้ใช้ป้อนข้อมูลหลัก 3 อย่าง และเครื่องมือจะคำนวณราคา Take-Profit ที่ต้องการ:

1.  **ราคาเข้าซื้อ ($P_{\text{Entry}}$)**
2.  **ราคา Stop-Loss ($P_{\text{SL}}$)**
3.  **อัตราส่วน Risk-Reward ที่ต้องการ ($R/R$)**

-----

## 💡 สูตรคำนวณ SL/TP (อิงตาม R/R)

เราจะเน้นไปที่การคำนวณ **ระยะห่างของราคา** ระหว่าง Entry กับ SL เพื่อกำหนดระยะห่างของ TP กับ Entry

| พารามิเตอร์ | ความหมาย | ตัวอย่างกำหนดค่า |
| :--- | :--- | :--- |
| **$P_{\text{Entry}}$** | ราคาเข้าซื้อ | $15.00 USD$ |
| **$P_{\text{SL}}$** | ราคา Stop-Loss | $14.50 USD$ |
| **$R/R$** | อัตราส่วน Risk-Reward ที่ต้องการ | $3:1$ |

**สูตรที่ใช้ในการคำนวณ:**

1.  **มูลค่าความเสี่ยงต่อหน่วย ($R_{\text{Unit}}$):**
    $$R_{\text{Unit}} = P_{\text{Entry}} - P_{\text{SL}}$$
2.  **มูลค่ากำไรต่อหน่วยที่ต้องการ ($P_{\text{Unit}}$):**
    $$P_{\text{Unit}} = R_{\text{Unit}} \times R/R$$
3.  **จุดทำกำไร ($P_{\text{TP}}$):**
    $$P_{\text{TP}} = P_{\text{Entry}} + P_{\text{Unit}}$$

-----

## 💻 โค้ดและคำแนะนำการใช้งาน

### 1\. การสร้าง Component `SlTpCalculator.tsx`

สร้างไฟล์ใหม่ที่ `src/components/SlTpCalculator.tsx` แล้วคัดลอกโค้ดด้านล่างนี้:

```tsx
// src/components/SlTpCalculator.tsx
"use client";

import React, { useState, useMemo } from 'react';
import GlassmorphismCard from '@/components/GlassmorphismCard';

export default function SlTpCalculator() {
    // 1. กำหนด State สำหรับ Input
    const [entryPrice, setEntryPrice] = useState<number | string>(15.00); // P_Entry
    const [stopLossPrice, setStopLossPrice] = useState<number | string>(14.50); // P_SL
    const [riskRewardRatio, setRiskRewardRatio] = useState<number | string>(3); // R/R

    // ฟังก์ชันคำนวณหลัก
    const calculationResults = useMemo(() => {
        const P_Entry = Number(entryPrice);
        const P_SL = Number(stopLossPrice);
        const RR = Number(riskRewardRatio);

        // ตรวจสอบค่าที่ไม่สมบูรณ์
        if (P_Entry <= 0 || P_SL <= 0 || RR <= 0) {
            return { isValid: false, errorMessage: 'กรุณาป้อนราคาเข้าซื้อ, Stop-Loss, และ Risk/Reward Ratio ที่ถูกต้อง (ค่าต้องมากกว่าศูนย์).' };
        }

        // ตรวจสอบความสมเหตุสมผลของจุดเข้าและจุด Stop-Loss (P_Entry ต้องมากกว่า P_SL สำหรับ Long Position)
        if (P_Entry <= P_SL) {
            return { isValid: false, errorMessage: 'ราคาเข้าซื้อ ($P_{\text{Entry}}$) ต้องสูงกว่าราคา Stop-Loss ($P_{\text{SL}}$) สำหรับ Long Position.' };
        }
        
        // 1. คำนวณ Risk per Unit (R_Unit) - ระยะห่างของราคา
        const R_Unit = P_Entry - P_SL; 

        // 2. คำนวณ Profit per Unit (P_Unit) - ระยะห่างของกำไรที่ต้องการ
        const P_Unit = R_Unit * RR;

        // 3. คำนวณ Take Profit Price (P_TP)
        const P_TP = P_Entry + P_Unit;

        return {
            isValid: true,
            R_Unit,
            P_Unit,
            P_TP,
            errorMessage: undefined,
        };
    }, [entryPrice, stopLossPrice, riskRewardRatio]);

    // ฟังก์ชันช่วยในการจัดรูปแบบตัวเลข (ใช้ทศนิยม 4 ตำแหน่งสำหรับราคา)
    const formatPrice = (num: number) => {
        if (isNaN(num)) return 'N/A';
        return num.toLocaleString('en-US', {
            minimumFractionDigits: 4,
            maximumFractionDigits: 4,
        });
    };

    const formatUnit = (num: number) => {
        if (isNaN(num)) return 'N/A';
        return num.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 4,
        });
    };

    const inputClass = "w-full p-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 transition-all text-white placeholder-white/50";
    const labelClass = "block text-sm font-medium mb-1 opacity-90";
    const resultTitleClass = "text-xl font-bold mb-1 text-fuchsia-400";
    const resultValueClass = "text-2xl font-extrabold";

    return (
        <GlassmorphismCard className="p-6 md:p-10 w-full max-w-4xl">
            <h3 className="text-3xl font-bold mb-6 text-center text-white">เครื่องมือคำนวณ Stop-Loss & Take-Profit</h3>
            <p className="text-center text-white/80 mb-8">กำหนดจุด Take-Profit ให้สอดคล้องกับ Risk-Reward Ratio ที่ต้องการ</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
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
                        placeholder="เช่น 15.00"
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
                        placeholder="เช่น 14.50"
                    />
                </div>
                {/* Input R/R */}
                <div>
                    <label htmlFor="riskRewardRatio" className={labelClass}>อัตราส่วน Risk-Reward ($R/R$)</label>
                    <input
                        id="riskRewardRatio"
                        type="number"
                        min="1"
                        step="0.1"
                        value={riskRewardRatio}
                        onChange={(e) => setRiskRewardRatio(e.target.value)}
                        className={inputClass}
                        placeholder="เช่น 3 (หมายถึง 3:1)"
                    />
                </div>
            </div>

            {/* ส่วนแสดงผลลัพธ์หลัก */}
            {calculationResults.isValid ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-b border-white/20 py-6 mb-8 text-center">
                        <div className="p-3 bg-fuchsia-800/10 rounded-lg">
                            <p className={resultTitleClass}>ความเสี่ยงต่อหน่วย ($R_{\text{Unit}}$)</p>
                            <p className={resultValueClass}>{formatUnit(calculationResults.R_Unit)} USD</p>
                            <p className="text-xs opacity-70 mt-1">($P_{\text{Entry}}$ - $P_{\text{SL}}$)</p>
                        </div>
                        <div className="p-3 bg-fuchsia-800/10 rounded-lg">
                            <p className={resultTitleClass}>กำไรต่อหน่วยที่ต้องการ ($P_{\text{Unit}}$)</p>
                            <p className={resultValueClass}>{formatUnit(calculationResults.P_Unit)} USD</p>
                            <p className="text-xs opacity-70 mt-1">($R_{\text{Unit}} \times R/R$)</p>
                        </div>
                        <div className="p-3 bg-fuchsia-800/10 rounded-lg">
                            <p className={resultTitleClass}>จุดขายทำกำไร ($P_{\text{TP}}$)</p>
                            <p className={resultValueClass}>{formatPrice(calculationResults.P_TP)} USD</p>
                            <p className="text-xs opacity-70 mt-1">ตั้งที่ R/R {riskRewardRatio}:1</p>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <h4 className="text-2xl font-bold mb-3 text-white/90">สรุปแผนการเทรด</h4>
                        <div className="grid grid-cols-3 gap-2">
                            <div className="p-3 rounded-lg bg-green-700/30">
                                <p className="text-sm font-semibold text-green-300">Take Profit</p>
                                <p className="text-xl font-bold">{formatPrice(calculationResults.P_TP)}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-blue-700/30">
                                <p className="text-sm font-semibold text-blue-300">Entry Price</p>
                                <p className="text-xl font-bold">{formatPrice(P_Entry)}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-red-700/30">
                                <p className="text-sm font-semibold text-red-300">Stop Loss</p>
                                <p className="text-xl font-bold">{formatPrice(P_SL)}</p>
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

### 2\. การสร้าง Component Page: `src/app/asset/sl-tp-calculator/page.tsx`

สร้างโฟลเดอร์ `sl-tp-calculator` ภายใน `src/app/asset/` และสร้างไฟล์ `page.tsx` ภายในนั้น:

```tsx
// src/app/asset/sl-tp-calculator/page.tsx
import GooeyBackground from '@/components/GooeyBackground';
import SlTpCalculator from '@/components/SlTpCalculator'; // นำเข้าเครื่องมือคำนวณ SL/TP

export default function SlTpPage() {
    return (
        // การจัดวางเนื้อหาและพื้นหลังตามแนวทางที่คุณกำหนด
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-gradient-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px]">
            <GooeyBackground />

            <main className="container mx-auto max-w-7xl flex flex-col gap-10">

                <section className="text-center mb-8">
                    <h1 className="text-5xl font-extrabold mb-4 text-fuchsia-400 drop-shadow-lg">
                        🎯 SL/TP Finder (Risk-Reward Based)
                    </h1>
                    <p className="text-xl font-light opacity-90 max-w-4xl mx-auto">
                        เครื่องมือคำนวณจุด Take-Profit โดยอัตโนมัติ 
                        เพื่อให้ทุกการเทรดมีอัตราส่วน Risk-Reward ที่ชัดเจนและสม่ำเสมอ
                    </p>
                </section>

                <section className="w-full flex justify-center">
                    <SlTpCalculator />
                </section>

            </main>
        </div>
    );
}
```

ตอนนี้คุณมีเครื่องมือคำนวณ **SL/TP** ที่ใช้งานง่ายและตรงตามความต้องการในการบริหารการเทรดแล้วครับ\! หากต้องการความช่วยเหลือในการรวมเครื่องมือคำนวณทั้งหมดเข้าไว้ในหน้า `src/app/asset/page.tsx` เพื่อให้เป็นศูนย์รวมเครื่องมือ (Tool Hub) แจ้งได้เลยนะครับ\!
