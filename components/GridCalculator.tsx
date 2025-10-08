// src/components/GridCalculator.tsx
'use client'; 

import React, { useState, useMemo } from 'react';
import GooeyBackground from '@/components/GooeyBackground'; // สำหรับพื้นหลัง
import GlassmorphismCard from '@/components/GlassmorphismCard'; // สำหรับ Card ที่ใช้แสดงเนื้อหาหลัก

// 1. กำหนด Types และ Mode
type GridMode = 'Arithmetic' | 'Geometric';

interface GridResult {
    price: number;
    type: 'Buy' | 'Sell';
}

interface CalculationResult {
    stepSize: number;   
    stepPercent: number; 
    avgBuyPrice: number;
    btcPerOrder: number;
    estProfitPerCycle: number;
    gridLevels: GridResult[];
}

// 2. ฟังก์ชันคำนวณหลักที่รองรับ 2 โหมด (ไม่มีการเปลี่ยนแปลงตรรกะ)
const calculateGrid = (
    P_Max: number, 
    P_Min: number, 
    N: number, 
    totalInvestment: number, 
    mode: GridMode, // รับ Grid Mode
    feeRate: number = 0.001
): CalculationResult | null => {
    
    // ตรวจสอบความถูกต้องของ Input
    if (P_Max <= P_Min || N <= 1 || N % 2 !== 0 || totalInvestment <= 0) {
        return null; 
    }

    const numBuyOrders = N / 2; 
    const investmentPerOrder = totalInvestment / numBuyOrders; 
    
    let gridLevels: GridResult[] = [];
    let stepSizeValue = 0; 
    let stepPercentValue = 0; 

    if (mode === 'Arithmetic') {
        const range = P_Max - P_Min;
        stepSizeValue = range / (N - 1); 
        
        for (let i = 1; i <= N; i++) {
            const price = P_Min + (i - 1) * stepSizeValue;
            // Buy Orders จะอยู่ในช่วงราคาต่ำ (P_Min ถึงกึ่งกลาง)
            // Sell Orders จะอยู่ในช่วงราคาสูง (กึ่งกลางถึง P_Max)
            const type = i <= numBuyOrders ? 'Buy' : 'Sell'; 
            gridLevels.push({ price: parseFloat(price.toFixed(2)), type });
        }

    } else {
        const growthRate = Math.pow(P_Max / P_Min, 1 / (N - 1));
        stepPercentValue = (growthRate - 1) * 100; 

        for (let i = 1; i <= N; i++) {
            const price = P_Min * Math.pow(growthRate, i - 1);
            const type = i <= numBuyOrders ? 'Buy' : 'Sell'; 
            gridLevels.push({ price: parseFloat(price.toFixed(2)), type });
        }
    }
    
    let totalBuyPrice = 0;
    gridLevels.filter(g => g.type === 'Buy').forEach(g => {
        totalBuyPrice += g.price;
    });

    const avgBuyPrice = totalBuyPrice / numBuyOrders; 
    // ใช้ราคาซื้อเฉลี่ยในการคำนวณจำนวน BTC ต่อออเดอร์ (ตามหลักการของบาง Grid Bot)
    const btcPerOrder = investmentPerOrder / avgBuyPrice; 

    // คำนวณกำไรต่อรอบตามหลักการ Grid Trading: Q_buy * Price_step * (1 - fee)
    const estimatedStepPriceDiff = mode === 'Arithmetic' 
        ? stepSizeValue 
        : avgBuyPrice * (Math.pow(P_Max/P_Min, 1/(N-1)) - 1); 
    
    const estProfitPerCycle = btcPerOrder * estimatedStepPriceDiff * (1 - feeRate);

    return {
        stepSize: parseFloat(stepSizeValue.toFixed(2)),
        stepPercent: parseFloat(stepPercentValue.toFixed(4)),
        avgBuyPrice: parseFloat(avgBuyPrice.toFixed(2)),
        btcPerOrder: parseFloat(btcPerOrder.toFixed(6)),
        estProfitPerCycle: parseFloat(estProfitPerCycle.toFixed(4)),
        gridLevels: gridLevels.reverse(), // กลับลำดับเพื่อให้ราคา P_Max อยู่ด้านบน
    };
};

// 3. ฟังก์ชันจัดรูปแบบตัวเลข (นำมาจาก DcaCalculator)
const formatNumber = (num: number, decimalPlaces: number = 2) => {
    if (isNaN(num)) return 'N/A';
    return num.toLocaleString('en-US', {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
    });
};

// --- Component ย่อยสำหรับ Input ---
const InputGroup: React.FC<{ 
    label: string, 
    value: number, 
    setter: (v: number) => void, 
    step?: number,
    id: string, 
    placeholder?: string,
}> = ({ label, value, setter, step = 1000, id, placeholder }) => {
    // กำหนดสไตล์ Input ให้เป็น Glassmorphism Dark Theme
    const inputClass = "mt-1 block w-full rounded-md bg-white/10 border border-white/20 shadow-sm focus:border-fuchsia-400 focus:ring-fuchsia-400 text-base p-2.5 text-white placeholder-white/50 transition-all";
    const labelClass = "block text-base font-semibold text-white mb-1 opacity-90";
    
    return (
        <div>
            <label htmlFor={id} className={labelClass}>
                {label}
            </label>
            <input
                id={id} 
                type="number"
                value={value}
                onChange={(e) => setter(parseFloat(e.target.value) || 0)}
                step={step}
                title={label} 
                placeholder={placeholder || 'เช่น ' + value.toLocaleString()} 
                min={0}
                className={inputClass}
            />
        </div>
    );
};

// --- Component สำหรับเลือก Grid Mode ---
const GridModeSelector: React.FC<{ mode: GridMode, setMode: (m: GridMode) => void }> = ({ mode, setMode }) => {
    const modes: { id: GridMode, label: string, description: string }[] = [
        { id: 'Arithmetic', label: 'Arithmetic Grid', description: 'ระยะห่างราคาเท่ากัน (Price Step)' },
        { id: 'Geometric', label: 'Geometric Grid', description: 'เปอร์เซ็นต์ระยะห่างเท่ากัน (% Step)' },
    ];

    return (
        <div className="space-y-3">
            <h3 className="text-base font-semibold text-white opacity-90">รูปแบบ Grid Mode:</h3>
            <div className="flex flex-col sm:flex-row gap-4">
                {modes.map((m) => {
                    const isChecked = mode === m.id;
                    return (
                        <div key={m.id} className="w-full relative"> 
                            <input
                                type="radio"
                                id={m.id}
                                name="grid-mode"
                                value={m.id}
                                checked={isChecked}
                                onChange={() => setMode(m.id)} 
                                role="radio" 
                                aria-checked={
                                    (isChecked ? "true" : "false") as "true" | "false"
                                } 
                                className="absolute opacity-0 w-full h-full z-10 cursor-pointer" 
                                title={`เลือก ${m.label}`} 
                            />
                            
                            {/* ปรับสไตล์ Label ให้เป็น Glassmorphism Dark Theme */}
                            <label
                                htmlFor={m.id}
                                className={`p-4 border rounded-xl transition-all duration-200 block h-full select-none
                                    bg-white/5 backdrop-blur-sm 
                                    ${isChecked 
                                        ? 'border-fuchsia-400 shadow-lg ring-2 ring-fuchsia-400' 
                                        : 'border-white/20 hover:border-fuchsia-400/50'
                                    }`}
                            >
                                <span className="font-bold text-white">{m.label}</span>
                                <p className="text-sm text-white/70 mt-0.5">{m.description}</p>
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


// 4. Component หลักสำหรับ UI
export default function GridCalculator() {
    const [mode, setMode] = useState<GridMode>('Arithmetic'); 
    const [pMax, setPMax] = useState(130000);
    const [pMin, setPMin] = useState(120000);
    const [numGrids, setNumGrids] = useState(10);
    const [investment, setInvestment] = useState(10000);
    const [fee, setFee] = useState(0.1); 
    
    const calculation = useMemo(() => {
        return calculateGrid(pMax, pMin, numGrids, investment, mode, fee / 100);
    }, [pMax, pMin, numGrids, investment, fee, mode]);

    const baseCurrencyPlaceholder = 'USDT';
    const coinPlaceholder = 'BTC';

    return (
        // โครงสร้างหน้าตามที่กำหนด
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-gradient-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px]">
            <GooeyBackground />

            <main className="container mx-auto max-w-7xl flex flex-col gap-8">
                
                {/* ใช้ GlassmorphismCard สำหรับเนื้อหาหลัก */}
                <GlassmorphismCard className="p-6 md:p-10 w-full max-w-4xl mx-auto space-y-8">

                    {/* หัวข้อหลัก */}
                    <h1 className="text-3xl font-extrabold text-fuchsia-400 border-b border-white/20 pb-4 text-center">
                        Grid Trading Calculator 📊
                    </h1>
                    <p className='text-center text-white/80'>เครื่องมือวางแผนการซื้อขาย Grid Bot สำหรับตลาด Sideways</p>

                    {/* Grid Mode Selector */}
                    <GridModeSelector mode={mode} setMode={setMode} />
                    
                    {/* Input Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputGroup id="pMax" label={`ราคาเพดานสูงสุด (P Max, ${baseCurrencyPlaceholder})`} value={pMax} setter={setPMax} placeholder="130000" />
                        <InputGroup id="pMin" label={`ราคาพื้นต่ำสุด (P Min, ${baseCurrencyPlaceholder})`} value={pMin} setter={setPMin} placeholder="120000" />
                        <InputGroup id="numGrids" label="จำนวน Grid Lines (N, ต้องเป็นเลขคู่)" value={numGrids} setter={setNumGrids} step={2} placeholder="10" />
                        <InputGroup id="investment" label={`เงินลงทุนรวม (${baseCurrencyPlaceholder})`} value={investment} setter={setInvestment} placeholder="10000" />
                        <InputGroup id="fee" label="ค่าธรรมเนียม (Fee Rate, %)" value={fee} setter={setFee} step={0.01} placeholder="0.1" />
                    </div>

                    {/* Result Section */}
                    {calculation ? (
                        <div className="mt-6 border-t border-white/20 pt-6 space-y-4">
                            <h2 className="text-2xl font-bold text-fuchsia-400">สรุปการคำนวณ ({mode} Mode) 🧠</h2>
                            
                            {/* Summary Card */}
                            <div className="bg-white/5 p-4 rounded-xl shadow-lg border border-white/20 space-y-2">
                                {mode === 'Arithmetic' ? (
                                    <p className="text-lg">
                                        <span className="font-bold text-white">ระยะห่างต่อไม้ (Step Size):</span> <span className="text-sky-400 font-mono">{formatNumber(calculation.stepSize, 2)} {baseCurrencyPlaceholder}</span>
                                    </p>
                                ) : (
                                    <p className="text-lg">
                                        <span className="font-bold text-white">เปอร์เซ็นต์ห่างต่อไม้ (Step %):</span> <span className="text-sky-400 font-mono">{formatNumber(calculation.stepPercent, 4)}%</span>
                                    </p>
                                )}
                                <p className="text-lg">
                                    <span className="font-bold text-white">กำไรคาดการณ์ต่อ 1 รอบ (Net Profit):</span> <span className="text-green-400 font-extrabold">{formatNumber(calculation.estProfitPerCycle, 4)} {baseCurrencyPlaceholder}</span>
                                    
                                </p>
                                <p className="text-sm text-white/70 pt-1">
                                    <span className="text-fuchsia-300">*ราคาซื้อเฉลี่ย:</span> {formatNumber(calculation.avgBuyPrice, 2)} {baseCurrencyPlaceholder} | 
                                    <span className="text-fuchsia-300"> ปริมาณต่อไม้:</span> {formatNumber(calculation.btcPerOrder, 6)} {coinPlaceholder}
                                </p>
                            </div>

                            {/* Grid Level Table */}
                            <h3 className="text-xl font-bold mt-6 border-t border-white/20 pt-4 text-fuchsia-300">รายการจุดราคา ({numGrids} ไม้)</h3>
                            <div className="max-h-96 overflow-y-auto border border-white/20 rounded-lg shadow-xl">
                                <table className="min-w-full divide-y divide-white/20">
                                    <thead className="bg-white/10 sticky top-0 shadow-sm backdrop-blur-sm">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-fuchsia-400 uppercase tracking-wider">ลำดับ</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-fuchsia-400 uppercase tracking-wider">ราคา ({baseCurrencyPlaceholder})</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-fuchsia-400 uppercase tracking-wider">คำสั่ง</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/10">
                                        {calculation.gridLevels.map((item, index) => (
                                            <tr key={index} className={item.type === 'Sell' ? 'bg-green-800/20 hover:bg-green-800/40 transition-colors' : 'bg-red-800/20 hover:bg-red-800/40 transition-colors'}>
                                                <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-white/90">{numGrids - index}</td>
                                                <td className="px-6 py-3 whitespace-nowrap text-sm text-white font-mono">{formatNumber(item.price, 2)}</td>
                                                <td className={`px-6 py-3 whitespace-nowrap text-sm font-bold ${item.type === 'Sell' ? 'text-green-400' : 'text-red-400'}`}>
                                                    {item.type}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <p className="text-red-400 font-bold mt-4 p-4 bg-red-800/40 border border-red-500 rounded-lg">
                            ⚠️ โปรดกรอกข้อมูลให้ถูกต้อง: P Max ต้องมากกว่า P Min, **จำนวน Grid Lines (N)** ต้องเป็น **เลขคู่**, และเงินลงทุนต้องมากกว่า 0
                        </p>
                    )}
                </GlassmorphismCard>
            </main>
        </div>
    );
}