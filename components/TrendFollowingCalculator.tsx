// src/components/TrendFollowingCalculator.tsx
"use client";

import React, { useState, useMemo } from 'react';
import GlassmorphismCard from '@/components/GlassmorphismCard';
import GooeyBackground from '@/components/GooeyBackground'; // นำเข้า GooeyBackground

export default function TrendFollowingCalculator() {
    // 1. กำหนด State สำหรับ Input
    const [totalCapital, setTotalCapital] = useState<number | string>(10000); // C_Total
    const [riskPercent, setRiskPercent] = useState<number | string>(1); // R_Percent (เป็น %)
    const [entryPrice, setEntryPrice] = useState<number | string>(50); // P_Entry
    const [atrValue, setAtrValue] = useState<number | string>(2.5); // ATR
    const [atrMultiplier, setAtrMultiplier] = useState<number | string>(2); // ATR Multiplier
    const [riskRewardRatio, setRiskRewardRatio] = useState<number | string>(3); // R/R

    // ฟังก์ชันคำนวณหลัก
    const calculationResults = useMemo(() => {
        const C_Total = Number(totalCapital);
        const R_Percent = Number(riskPercent);
        const P_Entry = Number(entryPrice);
        const ATR = Number(atrValue);
        const ATR_Multiplier = Number(atrMultiplier);
        const RR = Number(riskRewardRatio);

        // ตรวจสอบค่าที่ไม่สมบูรณ์
        if (C_Total <= 0 || R_Percent <= 0 || P_Entry <= 0 || ATR <= 0 || ATR_Multiplier <= 0 || RR <= 0) {
            return { isValid: false, errorMessage: 'กรุณาป้อนข้อมูลที่ถูกต้อง (ค่าต้องมากกว่าศูนย์).' };
        }

        // 1. คำนวณ Stop-Loss Price (P_SL)
        const R_Unit = ATR * ATR_Multiplier;
        const P_SL = P_Entry - R_Unit; // สำหรับ Long Position (Buy)

        // ตรวจสอบความสมเหตุสมผลของจุด Stop-Loss
        if (P_SL <= 0) {
            return { isValid: false, errorMessage: 'ราคา Stop-Loss ที่คำนวณได้ต่ำเกินไป กรุณาลองปรับค่า ATR หรือ ATR Multiplier' };
        }

        // 2. คำนวณ Risk per Trade (R_Trade)
        const R_Trade = C_Total * (R_Percent / 100);

        // 3. คำนวณ Position Size (Q_Size)
        const Q_Size = R_Trade / R_Unit;

        // 4. คำนวณ Take Profit Price (P_TP)
        const P_TP = P_Entry + (R_Unit * RR);

        // คำนวณกำไรที่คาดหวัง (Expected Profit)
        const expectedProfit = R_Trade * RR;

        return {
            isValid: true,
            R_Trade,
            P_SL,
            R_Unit,
            Q_Size,
            P_TP,
            expectedProfit,
            errorMessage: undefined,
        };
    }, [totalCapital, riskPercent, entryPrice, atrValue, atrMultiplier, riskRewardRatio]);

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
    const C_Total = Number(totalCapital); // ใช้สำหรับแสดงผล

    return (
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-gradient-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px]">
            <GooeyBackground />

            <main className="container mx-auto max-w-7xl flex flex-col gap-8">

                {/* ใช้ GlassmorphismCard สำหรับเนื้อหาหลัก */}
                <GlassmorphismCard className="p-6 md:p-10 w-full max-w-4xl mx-auto space-y-8">
                    <h3 className="text-3xl font-bold mb-6 text-center text-white">เครื่องมือคำนวณ Trend Following Position Sizer (ATR-based)</h3>
                    <p className="text-center text-white/80 mb-8">ใช้ ATR เพื่อกำหนดจุด Stop-Loss และ Position Size อย่างเป็นระบบ</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                        {/* Input C_Total */}
                        <div>
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
                            <label htmlFor="riskPercent" className={labelClass}>ความเสี่ยงต่อการเทรด (R_Percent %)</label>
                            <input
                                id="riskPercent"
                                type="number"
                                min="0.1"
                                step="0.1"
                                value={riskPercent}
                                onChange={(e) => setRiskPercent(e.target.value)}
                                className={inputClass}
                                placeholder="เช่น 1% (R-Risk)"
                            />
                        </div>
                        {/* Input P_Entry */}
                        <div>
                            <label htmlFor="entryPrice" className={labelClass}>ราคาเข้าซื้อ (P_Entry)</label>
                            <input
                                id="entryPrice"
                                type="number"
                                min="0.0001"
                                step="0.0001"
                                value={entryPrice}
                                onChange={(e) => setEntryPrice(e.target.value)}
                                className={inputClass}
                                placeholder="เช่น 50.00 USD"
                            />
                        </div>
                        {/* Input ATR */}
                        <div>
                            <label htmlFor="atrValue" className={labelClass}>ค่า ATR (Average True Range)</label>
                            <input
                                id="atrValue"
                                type="number"
                                min="0.0001"
                                step="0.0001"
                                value={atrValue}
                                onChange={(e) => setAtrValue(e.target.value)}
                                className={inputClass}
                                placeholder="เช่น 2.50 USD"
                            />
                        </div>
                        {/* Input ATR Multiplier */}
                        <div>
                            <label htmlFor="atrMultiplier" className={labelClass}>ตัวคูณ ATR (ATR Multiplier)</label>
                            <input
                                id="atrMultiplier"
                                type="number"
                                min="1"
                                step="0.5"
                                value={atrMultiplier}
                                onChange={(e) => setAtrMultiplier(e.target.value)}
                                className={inputClass}
                                placeholder="เช่น 2 (ATR-based Stop)"
                            />
                        </div>
                        {/* Input R/R */}
                        <div>
                            <label htmlFor="riskRewardRatio" className={labelClass}>อัตราส่วน Risk-Reward (R/R)</label>
                            <input
                                id="riskRewardRatio"
                                type="number"
                                min="1"
                                step="0.5"
                                value={riskRewardRatio}
                                onChange={(e) => setRiskRewardRatio(e.target.value)}
                                className={inputClass}
                                placeholder="เช่น 3 (หมายถึง 3:1)"
                            />
                        </div>
                    </div>

                    {/* ส่วนแสดงผลลัพธ์หลัก */}
                    {results ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-b border-white/20 py-6 mb-8 text-center">
                                <div className="p-3 bg-fuchsia-800/10 rounded-lg">
                                    <p className={resultTitleClass}>ความเสี่ยงต่อการเทรด (R_Trade)</p>
                                    {/* แก้ไข: ใช้ results.R_Trade โดยไม่ติด error */}
                                    <p className={resultValueClass}>{formatNumber(results.R_Trade, 2)} USD</p>
                                    <p className="text-xs opacity-70 mt-1">({riskPercent}% ของ C_Total)</p>
                                </div>
                                <div className="p-3 bg-fuchsia-800/10 rounded-lg">
                                    <p className={resultTitleClass}>ขนาด Position (Q_Size)</p>
                                    {/* แก้ไข: ใช้ results.Q_Size โดยไม่ติด error */}
                                    <p className={resultValueClass}>{formatNumber(results.Q_Size, 4)} หน่วย</p>
                                    {/* บรรทัดที่ 183 ที่เกิด Error 18048: ใช้ results.Q_Size! */}
                                    <p className="text-xs opacity-70 mt-1">มูลค่ารวม: {formatNumber(results.Q_Size! * Number(entryPrice), 2)} USD</p>
                                </div>
                                <div className="p-3 bg-fuchsia-800/10 rounded-lg">
                                    <p className={resultTitleClass}>ความเสี่ยงต่อหน่วย (R_Unit Dollar)</p>
                                    {/* แก้ไข: ใช้ results.R_Unit โดยไม่ติด error */}
                                    <p className={resultValueClass}>{formatNumber(results.R_Unit, 2)} USD</p>
                                    <p className="text-xs opacity-70 mt-1">(ATR x {atrMultiplier})</p>
                                </div>
                            </div>

                            <div className="mt-6 text-center">
                                <h4 className="text-xl font-bold mb-3 text-white/90">สรุปแผนการเทรด (R/R: {riskRewardRatio}:1)</h4>
                                <div className="grid grid-cols-3 gap-2">
                                    <div className="p-3 rounded-lg bg-green-700/30">
                                        <p className="text-sm font-semibold text-green-300">Take Profit (P_TP)</p>
                                        {/* แก้ไข: ใช้ results.P_TP โดยไม่ติด error */}
                                        <p className="text-lg font-bold">{formatNumber(results.P_TP, 4)} USD</p>
                                        {/* แก้ไข: ใช้ results.expectedProfit โดยไม่ติด error */}
                                        <p className="text-xs opacity-70 mt-1">กำไรที่คาดหวัง: {formatNumber(results.expectedProfit, 2)} USD</p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-blue-700/30">
                                        <p className="text-sm font-semibold text-blue-300">Entry Price (P_Entry)</p>
                                        <p className="text-lg font-bold">{formatNumber(Number(entryPrice), 4)} USD</p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-red-700/30">
                                        <p className="text-sm font-semibold text-red-300">Stop Loss (P_SL)</p>
                                        {/* แก้ไข: ใช้ results.P_SL โดยไม่ติด error */}
                                        <p className="text-lg font-bold">{formatNumber(results.P_SL, 4)} USD</p>
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
                                {calculationResults.errorMessage || 'ค่าทั้งหมดต้องมากกว่าศูนย์. โปรดตรวจสอบว่าระยะ Stop-Loss ที่คำนวณได้ไม่เกินราคาเข้าซื้อ.'}
                            </p>
                        </div>
                    )}
                </GlassmorphismCard>
            </main>
        </div>
    );
}