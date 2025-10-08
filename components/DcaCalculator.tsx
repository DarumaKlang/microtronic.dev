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