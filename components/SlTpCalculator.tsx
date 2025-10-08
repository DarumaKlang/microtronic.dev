// src/components/SlTpCalculator.tsx
"use client";

import React, { useState, useMemo } from 'react';
import GlassmorphismCard from '@/components/GlassmorphismCard';
import GooeyBackground from '@/components/GooeyBackground'; // นำเข้า GooeyBackground

// ฟังก์ชันช่วยในการจัดรูปแบบตัวเลข: แก้ไขให้รับค่าเป็น number หรือ undefined ได้
const formatPrice = (num: number | undefined, decimalPlaces: number = 4) => {
    if (num === undefined || isNaN(num)) return 'N/A';
    return num.toLocaleString('en-US', {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
    });
};

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
            // แก้ไข: ลบ Invalid Character (LaTeX)
            return { isValid: false, errorMessage: 'ราคาเข้าซื้อ (P_Entry) ต้องสูงกว่าราคา Stop-Loss (P_SL) สำหรับ Long Position.' };
        }

        // 1. คำนวณ Risk per Unit (R_Unit)
        const R_Unit = P_Entry - P_SL;

        // 2. คำนวณ Take Profit Price (P_TP)
        const P_TP = P_Entry + (R_Unit * RR);

        // 3. คำนวณระยะห่าง TP (TP_Unit)
        const TP_Unit = P_TP - P_Entry;

        return {
            isValid: true,
            R_Unit,
            P_TP,
            TP_Unit,
            P_Entry, // ส่งกลับค่า P_Entry และ P_SL เพื่อให้ง่ายต่อการแสดงผล
            P_SL,
            errorMessage: undefined,
        };
    }, [entryPrice, stopLossPrice, riskRewardRatio]);

    const inputClass = "w-full p-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 transition-all text-white placeholder-white/50";
    const labelClass = "block text-sm font-medium mb-1 opacity-90";
    const resultTitleClass = "text-lg font-semibold mb-1 text-fuchsia-400";
    const resultValueClass = "text-xl font-extrabold";

    const results = calculationResults.isValid ? calculationResults : null;

    return (
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-gradient-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px]">
            <GooeyBackground />

            <main className="container mx-auto max-w-7xl flex flex-col gap-8">

                {/* ใช้ GlassmorphismCard สำหรับเนื้อหาหลัก */}
                <GlassmorphismCard className="p-6 md:p-10 w-full max-w-4xl mx-auto space-y-8">
                    <h3 className="text-3xl font-bold mb-6 text-center text-white">เครื่องมือคำนวณ SL/TP Price (Long Position)</h3>
                    <p className="text-center text-white/80 mb-8">ช่วยคำนวณราคา Take Profit (TP) ตามอัตราส่วน Risk/Reward</p>

                    <div className="grid grid-cols-1 gap-6 mb-10">
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
                                placeholder="เช่น 15.00 USD"
                            />
                        </div>
                        {/* Input P_SL */}
                        <div>
                            <label htmlFor="stopLossPrice" className={labelClass}>ราคา Stop-Loss (P_SL)</label>
                            <input
                                id="stopLossPrice"
                                type="number"
                                min="0.0001"
                                step="0.0001"
                                value={stopLossPrice}
                                onChange={(e) => setStopLossPrice(e.target.value)}
                                className={inputClass}
                                placeholder="เช่น 14.50 USD"
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
                                placeholder="เช่น 3.0 (หมายถึง 3:1)"
                            />
                        </div>
                    </div>

                    {/* ส่วนแสดงผลลัพธ์หลัก */}
                    {results ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-b border-white/20 py-6 mb-8 text-center">
                                <div className="p-3 bg-fuchsia-800/10 rounded-lg">
                                    <p className={resultTitleClass}>ความเสี่ยงต่อหน่วย (R_Unit)</p>
                                    {/* แก้ไข: ใช้ results.R_Unit */}
                                    <p className={resultValueClass}>{formatPrice(results.R_Unit, 4)} USD</p>
                                    <p className="text-xs opacity-70 mt-1">(P_Entry - P_SL)</p>
                                </div>
                                <div className="p-3 bg-fuchsia-800/10 rounded-lg">
                                    <p className={resultTitleClass}>ระยะห่าง TP (TP_Unit)</p>
                                    {/* แก้ไข: ใช้ results.TP_Unit */}
                                    <p className={resultValueClass}>{formatPrice(results.TP_Unit, 4)} USD</p>
                                    <p className="text-xs opacity-70 mt-1">(R_Unit x R/R)</p>
                                </div>
                            </div>

                            <div className="mt-6 text-center">
                                <h4 className="text-xl font-bold mb-3 text-white/90">สรุปแผนการเทรด (R/R: {riskRewardRatio}:1)</h4>
                                <div className="grid grid-cols-3 gap-2">
                                    <div className="p-3 rounded-lg bg-green-700/30">
                                        <p className="text-sm font-semibold text-green-300">Take Profit (P_TP)</p>
                                        {/* แก้ไข: ใช้ results.P_TP */}
                                        <p className="text-xl font-bold">{formatPrice(results.P_TP)}</p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-blue-700/30">
                                        <p className="text-sm font-semibold text-blue-300">Entry Price (P_Entry)</p>
                                        {/* แก้ไข: ใช้ results.P_Entry */}
                                        <p className="text-xl font-bold">{formatPrice(results.P_Entry)}</p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-red-700/30">
                                        <p className="text-sm font-semibold text-red-300">Stop Loss (P_SL)</p>
                                        {/* แก้ไข: ใช้ results.P_SL */}
                                        <p className="text-xl font-bold">{formatPrice(results.P_SL)}</p>
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
                                {/* แก้ไข: ใช้ errorMessage จาก calculationResults */}
                                {calculationResults.errorMessage || 'ค่าทั้งหมดต้องมากกว่าศูนย์ และราคาเข้าซื้อต้องสูงกว่า Stop-Loss'}
                            </p>
                        </div>
                    )}
                </GlassmorphismCard>
            </main>
        </div>
    );
}