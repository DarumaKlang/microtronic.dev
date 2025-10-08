# 💡 ภาพรวมของโซลูชัน

ผมจะสร้างคอมโพแนนท์ชื่อ **`DcaCalculator.tsx`** ซึ่งเป็นคอมโพแนนท์ที่ฝั่งผู้ใช้ (Client Component) เนื่องจากต้องมีการจัดการ State และการคำนวณตามการเปลี่ยนแปลงของ Input Component จะถูกออกแบบด้วย **Tailwind CSS** และนำเสนอผลลัพธ์ในรูปแบบตารางที่ชัดเจน

**ขั้นตอนการพัฒนา:**

1.  สร้างไฟล์ `DcaCalculator.tsx` ใน `src/components/`
2.  ใช้ `useState` ของ React เพื่อจัดการ Input จากผู้ใช้
3.  ใช้ฟังก์ชันการคำนวณเพื่อหา:
      * **ราคาเข้าซื้อแต่ละไม้:** $P_{\text{Wood } k} = P_{\text{Current}} \times (1 - D_{\text{Level}} \times (k-1))$
      * **จำนวนเหรียญที่ได้:** $Q_{k} = \frac{I_{\text{Per Wood}}}{P_{\text{Wood } k}}$
      * **ต้นทุนเฉลี่ย ($P_{\text{Avg}}$):** $P_{\text{Avg}} = \frac{I_{\text{Total}}}{Q_{\text{Total}}}$
      * **จุดขายทำกำไร ($P_{\text{TP}}$):** $P_{\text{TP}} = P_{\text{Avg}} \times (1 + G_{\text{Target}})$
      * **จุด Stop-Loss ($P_{\text{MaxLoss}}$):** $P_{\text{MaxLoss}} = P_{\text{Avg}} \times (1 - L_{\text{Max}})$
4.  นำเข้าและแสดงผลในหน้าหลัก `app/page.tsx`

-----

### 💻 โค้ดและคำแนะนำการใช้งาน

### 1\. การสร้าง Component `DcaCalculator.tsx`

สร้างไฟล์ใหม่ที่ `src/components/DcaCalculator.tsx` แล้วคัดลอกโค้ดด้านล่างนี้:

```tsx
// src/components/DcaCalculator.tsx
"use client";

import React, { useState, useMemo } from 'react';
import GlassmorphismCard from '@/components/GlassmorphismCard';
import GooeyBackground from '@/components/GooeyBackground'; // สำหรับพื้นหลัง

// กำหนดประเภทข้อมูลสำหรับแผนการเข้าซื้อ
interface WoodPlan {
    k: number;
    priceLevel: number;
    investmentAmount: number;
    quantity: number;
}

export default function DcaCalculator() {
    // 1. กำหนด State สำหรับ Input
    const [currentPrice, setCurrentPrice] = useState<number | string>(100); // P_Current
    const [totalInvestment, setTotalInvestment] = useState<number | string>(10000); // I_Total
    const [numberOfWoods, setNumberOfWoods] = useState<number | string>(5); // N
    const [discountLevel, setDiscountLevel] = useState<number | string>(10); // D_Level (เป็น %)
    const [profitTarget, setProfitTarget] = useState<number | string>(10); // G_Target (เป็น %)
    const [maxLoss, setMaxLoss] = useState<number | string>(40); // L_Max (เป็น %)

    // ฟังก์ชันคำนวณหลัก
    const calculationResults = useMemo(() => {
        // ตัวแปรที่ใช้ในการคำนวณทั้งหมดต้องเป็น CamelCase ที่ถูกต้อง
        const pCurrent = Number(currentPrice);
        const iTotal = Number(totalInvestment);
        const N = Number(numberOfWoods);
        const discountLevelPercent = Number(discountLevel);
        const profitTargetPercent = Number(profitTarget);
        const maxLossPercent = Number(maxLoss);

        // ตรวจสอบค่าที่เป็น 0 หรือไม่สมบูรณ์
        if (pCurrent <= 0 || iTotal <= 0 || N <= 0 || discountLevelPercent < 0 || profitTargetPercent < 0 || maxLossPercent <= 0) {
            return {
                isValid: false,
                woodPlan: [],
                totalQuantity: 0,
                averageCost: 0,
                takeProfitPrice: 0,
                maxLossPrice: 0,
            };
        }

        const iPerWood = iTotal / N; // เงินลงทุนต่อไม้
        const discountLevelDecimal = discountLevelPercent / 100;
        const profitTargetDecimal = profitTargetPercent / 100;
        const maxLossDecimal = maxLossPercent / 100;

        const woodPlan: WoodPlan[] = [];
        let totalQuantity = 0;

        for (let k = 1; k <= N; k++) {
            // คำนวณราคาเข้าซื้อ: P_Current * (1 - (k-1) * D_Level)
            const priceLevel = pCurrent * (1 - (k - 1) * discountLevelDecimal);

            if (priceLevel <= 0) {
                return {
                    isValid: false,
                    woodPlan: [],
                    totalQuantity: 0,
                    averageCost: 0,
                    takeProfitPrice: 0,
                    maxLossPrice: 0,
                    errorMessage: `ระดับส่วนลด ${discountLevelPercent}% ต่อไม้ ทำให้ราคาระดับไม้ที่ ${k} เป็น 0 หรือติดลบ. กรุณาลดระดับส่วนลด.`,
                };
            }

            const quantity = iPerWood / priceLevel;
            totalQuantity += quantity;

            woodPlan.push({
                k,
                priceLevel,
                investmentAmount: iPerWood,
                quantity,
            });
        }

        // คำนวณต้นทุนเฉลี่ย
        const averageCost = iTotal / totalQuantity;

        // คำนวณจุดทำกำไร
        const takeProfitPrice = averageCost * (1 + profitTargetDecimal);

        // คำนวณจุด Stop-Loss
        const maxLossPrice = averageCost * (1 - maxLossDecimal);

        return {
            isValid: true,
            woodPlan,
            totalQuantity,
            averageCost,
            takeProfitPrice,
            maxLossPrice,
            errorMessage: undefined,
        };
    }, [currentPrice, totalInvestment, numberOfWoods, discountLevel, profitTarget, maxLoss]);

    // ฟังก์ชันช่วยในการจัดรูปแบบตัวเลข
    const formatNumber = (num: number, decimalPlaces: number = 2) => {
        if (isNaN(num)) return 'N/A';
        return num.toLocaleString('en-US', {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces,
        });
    };

    // ใช้ค่าที่แปลงเป็นตัวเลขแล้วในการแสดงผลเท่านั้น
    const iTotal = Number(totalInvestment);

    const inputClass = "w-full p-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 transition-all text-white placeholder-white/50";
    const labelClass = "block text-sm font-medium mb-1 opacity-90";
    const resultTitleClass = "text-xl font-bold mb-2 text-fuchsia-400";
    const resultValueClass = "text-2xl font-extrabold";

    return (
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-gradient-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px]">
            <GooeyBackground />

            <main className="container mx-auto max-w-7xl flex flex-col gap-8">

                {/* ใช้ GlassmorphismCard สำหรับเนื้อหาหลัก */}
                <GlassmorphismCard className="p-6 md:p-10 w-full max-w-4xl mx-auto space-y-8">

                    {/* หัวข้อหลัก */}
                    <h1 className="text-3xl font-extrabold text-fuchsia-400 border-b border-white/20 pb-4 text-center">
                        เครื่องมือคำนวณ DCA (ตลาดหมี)
                    </h1>
                    <p className='text-center text-white/80'>วางแผนการเข้าซื้ออย่างเป็นระบบ เพื่อลดต้นทุนเฉลี่ยและบริหารความเสี่ยง</p>

                    {/* Input fields */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        {/* Input P_Current */}
                        <div>
                            {/* ✨ แก้ไข: ลบสัญลักษณ์ LaTeX ออกจาก label */}
                            <label htmlFor="currentPrice" className={labelClass}>ราคาปัจจุบัน (P Current)</label>
                            <input
                                id="currentPrice"
                                type="number"
                                min="0"
                                step="0.01"
                                value={currentPrice}
                                onChange={(e) => setCurrentPrice(e.target.value)}
                                className={inputClass}
                                placeholder="เช่น 100"
                            />
                        </div>
                        {/* Input I_Total */}
                        <div>
                            {/* ✨ แก้ไข: ลบสัญลักษณ์ LaTeX ออกจาก label */}
                            <label htmlFor="totalInvestment" className={labelClass}>เงินลงทุนรวม (I Total)</label>
                            <input
                                id="totalInvestment"
                                type="number"
                                min="0"
                                value={totalInvestment}
                                onChange={(e) => setTotalInvestment(e.target.value)}
                                className={inputClass}
                                placeholder="เช่น 10000 USD"
                            />
                        </div>
                        {/* Input N */}
                        <div>
                            {/* ✨ แก้ไข: ลบสัญลักษณ์ LaTeX ออกจาก label */}
                            <label htmlFor="numberOfWoods" className={labelClass}>จำนวนไม้ (N)</label>
                            <input
                                id="numberOfWoods"
                                type="number"
                                min="1"
                                step="1"
                                value={numberOfWoods}
                                onChange={(e) => setNumberOfWoods(e.target.value)}
                                className={inputClass}
                                placeholder="เช่น 5"
                            />
                        </div>
                        {/* Input D_Level */}
                        <div>
                            {/* ✨ แก้ไข: ลบสัญลักษณ์ LaTeX ออกจาก label */}
                            <label htmlFor="discountLevel" className={labelClass}>ระดับส่วนลดต่อไม้ (D Level %)</label>
                            <input
                                id="discountLevel"
                                type="number"
                                min="0"
                                step="1"
                                value={discountLevel}
                                onChange={(e) => setDiscountLevel(e.target.value)}
                                className={inputClass}
                                placeholder="เช่น 10%"
                            />
                        </div>
                        {/* Input G_Target */}
                        <div>
                            {/* ✨ แก้ไข: ลบสัญลักษณ์ LaTeX ออกจาก label */}
                            <label htmlFor="profitTarget" className={labelClass}>เป้าหมายกำไร (G Target %)</label>
                            <input
                                id="profitTarget"
                                type="number"
                                min="1"
                                step="1"
                                value={profitTarget}
                                onChange={(e) => setProfitTarget(e.target.value)}
                                className={inputClass}
                                placeholder="เช่น 10%"
                            />
                        </div>
                        {/* Input L_Max */}
                        <div>
                            {/* ✨ แก้ไข: ลบสัญลักษณ์ LaTeX ออกจาก label */}
                            <label htmlFor="maxLoss" className={labelClass}>ขาดทุนสูงสุดที่รับได้ (L Max %)</label>
                            <input
                                id="maxLoss"
                                type="number"
                                min="1"
                                step="1"
                                value={maxLoss}
                                onChange={(e) => setMaxLoss(e.target.value)}
                                className={inputClass}
                                placeholder="เช่น 40%"
                            />
                        </div>
                    </div>

                    {/* ส่วนแสดงผลลัพธ์หลัก */}
                    {calculationResults.isValid ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-b border-white/20 py-6 mb-8 text-center">
                                <div>
                                    {/* ✨ แก้ไข: ลบสัญลักษณ์ LaTeX ออกจาก Result Title */}
                                    <p className={resultTitleClass}>ต้นทุนเฉลี่ย (P Avg)</p>
                                    <p className={resultValueClass}>{formatNumber(calculationResults.averageCost)} USD</p>
                                </div>
                                <div>
                                    {/* ✨ แก้ไข: ลบสัญลักษณ์ LaTeX ออกจาก Result Title */}
                                    <p className={resultTitleClass}>จุดขายทำกำไร (P TP)</p>
                                    <p className={resultValueClass}>{formatNumber(calculationResults.takeProfitPrice)} USD</p>
                                    {/* ✨ แก้ไข: ลบสัญลักษณ์ LaTeX ออกจากคำอธิบาย */}
                                    <p className="text-xs opacity-70 mt-1">กำไร {profitTarget}% จาก P Avg</p>
                                </div>
                                <div>
                                    {/* ✨ แก้ไข: ลบสัญลักษณ์ LaTeX ออกจาก Result Title */}
                                    <p className={resultTitleClass}>จุด Stop-Loss (P MaxLoss)</p>
                                    <p className={resultValueClass}>{formatNumber(calculationResults.maxLossPrice)} USD</p>
                                    {/* ✨ แก้ไข: ลบสัญลักษณ์ LaTeX ออกจากคำอธิบาย */}
                                    <p className="text-xs opacity-70 mt-1">ขาดทุน {maxLoss}% จาก I Total</p>
                                </div>
                            </div>

                            {/* ตารางแผนการเข้าซื้อ */}
                            {/* ✨ แก้ไข: ลบสัญลักษณ์ LaTeX ออกจากหัวข้อ */}
                            <h4 className="text-2xl font-bold mb-4 text-white">แผนการเข้าซื้อ (N: {numberOfWoods} ไม้)</h4>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-white/20">
                                    <thead>
                                        <tr className="text-left text-sm font-semibold text-fuchsia-400 uppercase tracking-wider">
                                            <th className="p-3">ไม้ที่ (k)</th>
                                            {/* ✨ แก้ไข: ลบสัญลักษณ์ LaTeX ออกจาก header */}
                                            <th className="p-3">ระดับราคาเข้าซื้อ (P Wood k)</th>
                                            <th className="p-3">เงินลงทุน (USD)</th>
                                            {/* ✨ แก้ไข: ลบสัญลักษณ์ LaTeX ออกจาก header */}
                                            <th className="p-3">จำนวนเหรียญที่ได้ (Q k)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/10">
                                        {calculationResults.woodPlan.map((wood) => (
                                            <tr key={wood.k} className="hover:bg-white/5 transition-colors duration-150">
                                                <td className="p-3 font-medium">{wood.k}</td>
                                                <td className="p-3">{formatNumber(wood.priceLevel)}</td>
                                                <td className="p-3">{formatNumber(wood.investmentAmount, 0)}</td>
                                                <td className="p-3">{formatNumber(wood.quantity, 4)}</td>
                                            </tr>
                                        ))}
                                        <tr className="bg-fuchsia-800/20 font-bold">
                                            <td className="p-3">รวม</td>
                                            <td className="p-3"></td>
                                            <td className="p-3">{formatNumber(iTotal, 0)}</td>
                                            <td className="p-3">{formatNumber(calculationResults.totalQuantity, 4)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (
                        <div className="text-center p-8 bg-red-800/20 rounded-lg">
                            <p className="text-red-400 font-bold text-lg">
                                ⚠️ กรุณาป้อนข้อมูลให้ถูกต้องและครบถ้วน:
                            </p>
                            <p className="text-sm mt-2 opacity-80">
                                {calculationResults.errorMessage || 'ค่าทั้งหมดต้องมากกว่าศูนย์ (ยกเว้นระดับส่วนลดสามารถเป็น 0 ได้).'}
                            </p>
                        </div>
                    )}
                </GlassmorphismCard>
            </main>
        </div>
    );
}
```

-----

### 2\. การใช้งานในหน้า `app/page.tsx`

เราจะนำเข้าและใช้งานคอมโพแนนท์ **`DcaCalculator`** ในไฟล์ `app/page.tsx` ของคุณ

#### `app/page.tsx` (โค้ดที่อัปเดต)

1.  **นำเข้า Component:** เพิ่ม `import DcaCalculator from '@/components/DcaCalculator';`
2.  **ใช้งาน Component:** แทรก `<DcaCalculator />` ในส่วน `<main>` ของหน้าหลัก

<!-- end list -->

```tsx
// app/page.tsx
import Image from "next/image";
import GlassmorphismCard from '@/components/GlassmorphismCard';
import { ServiceCard } from '@/components/ServiceCard';
import { WorkShowcase } from '@/components/WorkShowcase'; 
import GooeyBackground from '@/components/GooeyBackground'; // นำเข้า GooeyBackground
import DcaCalculator from '@/components/DcaCalculator'; // ✨ นำเข้า Component ใหม่

export default function Home() {

    {/* ตัวอย่างข้อมูลผลงานสำหรับ Component WorkShowcase */}
    const workExamples = [
        { src: '/images/work-1.png', alt: 'เว็บไซต์องค์กร 1' },
        { src: '/images/work-2.png', alt: 'เว็บไซต์องค์กร 2' },
        { src: '/images/work-3.png', alt: 'เว็บไซต์องค์กร 3' },
        { src: '/images/work-4.png', alt: 'เว็บไซต์องค์กร 4' },
        { src: '/images/work-5.png', alt: 'เว็บไซต์องค์กร 5' },
        { src: '/images/work-6.png', alt: 'เว็บไซต์องค์กร 6' },
    ];

    return (
        // ใช้ class สำหรับ gradient background และ text-white ตามที่คุณต้องการ
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-gradient-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px]">
            <GooeyBackground /> {/* ✨ เพิ่ม GooeyBackground */}

            <main className="container mx-auto max-w-7xl flex flex-col gap-8">

                {/* Hero Section ใหม่สำหรับเว็บไซต์บริษัท */}
                <section className="w-full flex justify-center max-w-7xl">
                    <div className="flex flex-col items-center text-center p-8 sm:p-16 gap-8">
                        {/* ข้อความหลัก */}
                        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                            รับออกแบบจัดทำเว็บไซต์อย่าง<br className="sm:hidden" />มืออาชีพและทันสมัย
                        </h2>
                        <p className="text-lg sm:text-xl font-light max-w-2xl opacity-90">
                            เราสร้างสรรค์เว็บไซต์ที่ยืดหยุ่น ใช้งานง่าย และเป็นมิตรกับสิ่งแวดล้อม ด้วยเทคโนโลยีล่าสุด
                        </p>

                        {/* ปุ่ม Call-to-Action */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="/portfolio"
                                className="px-8 py-3 bg-fuchsia-600 text-white font-semibold rounded-full shadow-lg hover:bg-fuchsia-700 transition-colors duration-300"
                            >
                                ดูผลงานของเรา
                            </a>
                            <a
                                href="/contact"
                                className="px-8 py-3 text-white font-semibold rounded-full border border-white hover:bg-white hover:text-fuchsia-800 transition-colors duration-300"
                            >
                                ติดต่อเรา
                            </a>
                        </div>
                    </div>
                </section>

                {/* ✨ ส่วนเครื่องมือคำนวณ DCA ใหม่ */}
                <section className="w-full flex justify-center">
                    <DcaCalculator />
                </section>
                {/* ---------------------------------- */}

                {/* Card ใหม่สำหรับ "บริษัทมหาชน" (รูปขวา, เนื้อหาซ้าย - ใส่ reverse={true}) */}
                <ServiceCard
                    imageSrc="/images/public-company.png"
                    imageAlt="เว็บไซต์สำหรับบริษัทมหาชน"
                    title="บริการรับทำเว็บไซต์ บริษัทมหาชน"
                    description="เป็นบริการรับทำเว็บไซต์บริษัทมหาชน ซึ่งมีระบบจัดเก็บข้อมูลนักลงทุน สัมพันธ์กิจกรรม CSR ความยั่งยืน ซึ่งมีส่วนต่างจากครบล่วนตามกฎเกณฑ์ของตลาดหลักทรัพย์ ระบบหลังบ้านใช้งานง่าย สามารถอัปเดตข้อมูลต่างๆ ได้เอง เช่นหนังสือเชิญชวนประชุมผู้ถือหุ้น"
                    linkText="อ่านเพิ่มเติม"
                    linkHref="/public-company-service"
                    reverse={true} // เพิ่ม prop นี้เพื่อสลับฝั่ง
                />

                {/* ส่วน Real Estate Website */}
                <ServiceCard
                    imageSrc="/images/real-estate.png" // Replace with your image path
                    imageAlt="Real Estate Website"
                    title="Real Estate Website"
                    description="บริการรับทำเว็บไซต์นายหน้าอสังหาริมทรัพย์ ระบบจัดการง่าย หากใช้ MS Word ก็สามารถใช้งานได้เลย สามารถเพิ่มทรัพย์ได้ไม่จำกัด ลงรูปได้ไม่จำกัด ระบบพัฒนามาจาก WordPress ช่วยทำให้เว็บไซต์ของคุณติด SEO ที่ดีที่สุด เมื่อเทียบกับระบบเขียนเอง"
                    linkText="อ่านเพิ่มเติม"
                    linkHref="/real-estate-service"
                />

                {/* Card สำหรับ "SEO" (รูปภาพขวา) */}
                <ServiceCard
                    imageSrc="/images/seo-service.png" // ต้องมีไฟล์ภาพนี้ใน public/images
                    imageAlt="บริการรับทำ SEO"
                    title="บริการรับทำ SEO"
                    description="หยุดการแข่งขันที่ไม่มีที่สิ้นสุดด้วยการติดอันดับบน Google อย่างยั่งยืน! เราคือผู้เชี่ยวชาญด้าน **SEO สายขาว** ที่มีประสบการณ์ยาวนานกว่า 10 ปี มั่นใจได้ว่าเว็บไซต์ของคุณจะขึ้นหน้าแรกอย่างถาวร หากไม่ติดอันดับตามที่ตกลงกันไว้ **เรายินดีคืนเงินเต็มจำนวน** เพื่อพิสูจน์ความจริงใจ!"
                    linkText="อ่านเพิ่มเติม"
                    linkHref="/seo-service"
                    reverse={true}
                />

                {/* Card สำหรับ "Google Ads" (รูปภาพซ้าย) */}
                <ServiceCard
                    imageSrc="/images/google-ads.png" // ต้องมีไฟล์ภาพนี้ใน public/images
                    imageAlt="บริการรับทำ Google Ads"
                    title="บริการรับทำ Google Ads"
                    description="อยากได้ลูกค้าใหม่ทันทีใช่ไหม? เราพร้อมช่วยคุณ! บริการ **Google Ads** ของเราจะทำให้สินค้าและบริการของคุณปรากฏบนหน้าแรกของ Google ในทันที ดึงดูดลูกค้าที่มีความต้องการซื้อสูงเข้ามาในเว็บไซต์ของคุณโดยตรง ช่วยเพิ่มยอดขายและสร้างการรับรู้แบรนด์ได้อย่างรวดเร็วในราคาที่คุ้มค่าที่สุด"
                    linkText="อ่านเพิ่มเติม"
                    linkHref="/google-ads-service"
                />

                {/* Card ใหม่สำหรับ "Corporate Website" (รูปภาพขวา) */}
                <ServiceCard
                    imageSrc="/images/corporate-website.png" // ต้องมีไฟล์ภาพนี้ใน public/images
                    imageAlt="เว็บไซต์องค์กร"
                    title="Corporate Website"
                    description="สร้างความน่าเชื่อถือและความประทับใจให้องค์กรของคุณด้วยเว็บไซต์ที่ออกแบบอย่างมืออาชีพ มาพร้อมระบบหลังบ้านที่ใช้งานง่าย และฟังก์ชันครบครัน เช่น ข่าวสาร, คลังรูปภาพ, และระบบจัดการเพจที่ช่วยให้คุณอัปเดตข้อมูลได้เอง มีการออกแบบที่สวยงาม รองรับทุกอุปกรณ์ และสอดคล้องกับนโยบาย PDPA"
                    linkText="อ่านเพิ่มเติม"
                    linkHref="/corporate-website-service"
                    reverse={true}
                />

                {/* ส่วน "บริการของเรา" ใหม่ที่ใช้โครงสร้างจากเว็บไซต์ตัวอย่าง */}
                <section className="w-full max-w-7xl mt-16 px-4">
                    <h3 className="text-3xl font-bold text-center mb-12">บริการของเรา</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* การ์ดบริการ: มืออาชีพ */}
                        <GlassmorphismCard>
                            <div className="flex flex-col items-center text-center p-4">
                                <div className="w-16 h-16 mb-4 rounded-full bg-fuchsia-600 flex items-center justify-center">
                                    {/* Placeholder for icon */}
                                    <span className="text-3xl">✨</span>
                                </div>
                                <h4 className="text-xl font-bold mb-2">มืออาชีพ</h4>
                                <p className="text-sm opacity-80">
                                    รับออกแบบและพัฒนาเว็บไซต์ด้วยมาตรฐานสูงสุด เพื่อให้เว็บไซต์ของคุณมีประสิทธิภาพและน่าเชื่อถือ
                                </p>
                            </div>
                        </GlassmorphismCard>

                        {/* การ์ดบริการ: ทันสมัย */}
                        <GlassmorphismCard>
                            <div className="flex flex-col items-center text-center p-4">
                                <div className="w-16 h-16 mb-4 rounded-full bg-fuchsia-600 flex items-center justify-center">
                                    {/* Placeholder for icon */}
                                    <span className="text-3xl">🚀</span>
                                </div>
                                <h4 className="text-xl font-bold mb-2">ทันสมัย</h4>
                                <p className="text-sm opacity-80">
                                    ใช้เทคโนโลยีล่าสุดและดีไซน์ที่ล้ำสมัย เพื่อให้เว็บไซต์ของคุณโดดเด่นและสร้างความประทับใจ
                                </p>
                            </div>
                        </GlassmorphismCard>

                        {/* การ์ดบริการ: ยืดหยุ่น */}
                        <GlassmorphismCard>
                            <div className="flex flex-col items-center text-center p-4">
                                <div className="w-16 h-16 mb-4 rounded-full bg-fuchsia-600 flex items-center justify-center">
                                    {/* Placeholder for icon */}
                                    <span className="text-3xl">⚙️</span>
                                </div>
                                <h4 className="text-xl font-bold mb-2">ยืดหยุ่น</h4>
                                <p className="text-sm opacity-80">
                                    เว็บไซต์ที่ปรับขนาดได้ตามความต้องการของธุรกิจ และสามารถรองรับการใช้งานบนทุกอุปกรณ์
                                </p>
                            </div>
                        </GlassmorphismCard>

                        {/* การ์ดบริการ: เป็นมิตรกับสิ่งแวดล้อม */}
                        <GlassmorphismCard>
                            <div className="flex flex-col items-center text-center p-4">
                                <div className="w-16 h-16 mb-4 rounded-full bg-fuchsia-600 flex items-center justify-center">
                                    {/* Placeholder for icon */}
                                    <span className="text-3xl">🌿</span>
                                </div>
                                <h4 className="text-xl font-bold mb-2">เป็นมิตรกับสิ่งแวดล้อม</h4>
                                <p className="text-sm opacity-80">
                                    การออกแบบที่เน้นประสิทธิภาพ ช่วยลดการใช้พลังงานของเซิร์ฟเวอร์ และลดผลกระทบต่อสิ่งแวดล้อม
                                </p>
                            </div>
                        </GlassmorphismCard>
                    </div>
                </section>

                <section className="w-full max-w-7xl mt-16 px-4">
                    {/* เพิ่มส่วนแสดงผลงานใหม่ */}
                    <WorkShowcase
                    title="ตัวอย่างผลงานรับทำเว็บไซต์"
                    description="เราสร้างสรรค์เว็บไซต์ที่ตอบโจทย์ธุรกิจของคุณ ไม่ว่าจะเป็นเว็บไซต์องค์กร E-commerce หรือ Portfolio ด้วยดีไซน์ที่ทันสมัยและใช้งานง่ายบนทุกอุปกรณ์"
                    works={workExamples}
                    />
                </section>

            </main>

            <footer className="w-full flex flex-col sm:flex-row items-center justify-center sm:justify-between max-w-7xl text-xs text-center opacity-75 gap-2 sm:gap-0">
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="/file-text.svg"
                        alt="File icon"
                        width={16}
                        height={16}
                    />
                    Learn
                </a>
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="/window.svg"
                        alt="Window icon"
                        width={16}
                        height={16}
                    />
                    Examples
                </a>
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="/globe.svg"
                        alt="Globe icon"
                        width={16}
                        height={16}
                    />
                    Go to nextjs.org →
                </a>
            </footer>
        </div>
    );
}
```

ตอนนี้คุณจะมีเครื่องมือคำนวณ DCA ที่สมบูรณ์แบบบนหน้าหลักของคุณ ซึ่งช่วยให้ผู้ใช้เห็นภาพแผนการลงทุนและจุดบริหารความเสี่ยงได้อย่างชัดเจนครับ\! หากมีส่วนอื่นที่ต้องการเพิ่มเติม แจ้งได้เลยนะครับ\!
