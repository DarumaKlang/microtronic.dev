// src/components/FinancialTracker.tsx
import React from 'react';
import Link from 'next/link';
import GooeyBackground from '@/components/GooeyBackground'; 
import GlassmorphismCard from '@/components/GlassmorphismCard';
import TradingViewWidget from './TradingViewWidget'; 

// (สมมติ) นำเข้า type 
interface ExchangeRateData {
    symbol: string; 
    rate: number;
    change: number; 
    isUp: boolean; 
}

interface SectorPerformance {
    sector: string;
    performance: string;
}

interface FinancialTrackerData {
    thbUsd: ExchangeRateData;
    goldUsd: ExchangeRateData; 
    goldThb: ExchangeRateData;
    btcUsdt: ExchangeRateData; // ใช้ชื่อเดิม แต่ข้อมูลอาจเป็น BTC/USD ชั่วคราว
    ethUsdt: ExchangeRateData; // ใช้ชื่อเดิม แต่ข้อมูลอาจเป็น ETH/USD ชั่วคราว
    solUsdt: ExchangeRateData; 
    usdtThb: ExchangeRateData; 
    sectorPerformance: SectorPerformance[];
}

// ----------------------------------------------------------------------
// API Configuration & Helpers
// ... (ส่วนเดิม) ...
const REVALIDATE_TIME = 60; 
const SECTOR_REVALIDATE_TIME = 86400; 

const ALPHA_VANTAGE_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const COIN_API_KEY = process.env.COIN_API_KEY;
const API_BASE_URL_AV = 'https://www.alphavantage.co/query';
const API_BASE_URL_COIN = 'https://rest.coinapi.io/v1';

const DEFAULT_DATA_FALLBACK: FinancialTrackerData = {
    thbUsd: { symbol: 'USD/THB', rate: 36.52, change: -0.15, isUp: false },
    goldUsd: { symbol: 'GOLD/USD', rate: 2350.50, change: 15.20, isUp: true },
    goldThb: { symbol: 'ทองคำแท่ง (บาท)', rate: 41200.00, change: 250.00, isUp: true },
    btcUsdt: { symbol: 'BTC/USD (Fallback)', rate: 68000.00, change: 1250.50, isUp: true }, // เปลี่ยนชื่อใน Fallback เล็กน้อย
    ethUsdt: { symbol: 'ETH/USD (Fallback)', rate: 3500.00, change: 80.00, isUp: true },
    solUsdt: { symbol: 'SOL/USDT', rate: 150.00, change: -5.00, isUp: false },
    usdtThb: { symbol: 'USDT/THB', rate: 36.50, change: -0.02, isUp: false },
    sectorPerformance: [
        { sector: 'Technology', performance: '+1.25%' },
        { sector: 'Health Care', performance: '-0.45%' },
    ] as SectorPerformance[]
};

// Helper: Alpha Vantage (ไม่เปลี่ยน)
function formatAlphaVantageForex(data: any, symbol: string): ExchangeRateData {
    if (!data || !data['Realtime Currency Exchange Rate']) {
        throw new Error(`Invalid Alpha Vantage Forex data for ${symbol}`);
    }
    const rawRate = parseFloat(data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
    const change = 0.00; 
    const isUp = true; 
    return { symbol: symbol, rate: rawRate, change: change, isUp: isUp };
}

async function fetchAlphaVantageData(from: string, to: string, symbol: string): Promise<ExchangeRateData> {
    if (!ALPHA_VANTAGE_KEY) throw new Error("ALPHA_VANTAGE_API_KEY is not set.");
    const url = `${API_BASE_URL_AV}?function=CURRENCY_EXCHANGE_RATE&from_currency=${from}&to_currency=${to}&apikey=${ALPHA_VANTAGE_KEY}`;
    const response = await fetch(url, { next: { revalidate: REVALIDATE_TIME } });
    if (!response.ok) {
        throw new Error(`Failed to fetch Alpha Vantage data for ${symbol}: ${response.statusText}`);
    }
    const data = await response.json();
    if (data['Error Message'] || data['Note'] || Object.keys(data).length === 0) {
        console.error(`Alpha Vantage Error for ${symbol}:`, data);
        throw new Error(`Alpha Vantage API Limit/Error: ${data['Note'] || data['Error Message'] || 'Empty response'}`);
    }
    return formatAlphaVantageForex(data, symbol);
}

// 2. ดึงข้อมูล Crypto/Commodity (ใช้ CoinAPI) (ไม่เปลี่ยนฟังก์ชัน แต่เปลี่ยนการเรียก)
async function fetchCoinAPICrypto(base: string, quote: string, symbol: string): Promise<ExchangeRateData> {
    if (!COIN_API_KEY) throw new Error("COIN_API_KEY is not set.");
    const url = `${API_BASE_URL_COIN}/exchangerate/${base}/${quote}`;
    const response = await fetch(url, { 
        headers: { 'X-CoinAPI-Key': COIN_API_KEY as string },
        next: { revalidate: REVALIDATE_TIME } 
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch CoinAPI data for ${symbol}: ${response.statusText}`);
    }
    const data = await response.json();
    if (data.error || !data.rate) {
        console.error(`CoinAPI Error for ${symbol}:`, data);
        // เพิ่มการตรวจสอบ Free Plan Error
        if (data.error && data.error.includes('Subscription limited')) {
            throw new Error(`CoinAPI Error: Free Plan limit reached or Ticker access denied. Symbol: ${symbol}`);
        }
        throw new Error(`CoinAPI Error: ${data.error || 'Rate not found'}`);
    }
    const change = 0.0000;
    const isUp = true; 
    return { symbol: symbol, rate: data.rate, change: change, isUp: isUp };
}

// 3. ดึงข้อมูล Sector Performance (ไม่เปลี่ยน)
async function fetchSectorPerformance(): Promise<SectorPerformance[]> {
    if (!ALPHA_VANTAGE_KEY) return [];
    const url = `${API_BASE_URL_AV}?function=SECTOR&apikey=${ALPHA_VANTAGE_KEY}`;
    const response = await fetch(url, { next: { revalidate: SECTOR_REVALIDATE_TIME } });
    if (!response.ok) {
        console.error("Failed to fetch Sector Performance");
        return [];
    }
    const data = await response.json();
    if (data['Error Message'] || data['Note']) {
        console.error("Alpha Vantage Sector Error:", data);
        return [];
    }
    const sectorData = data['Rank A: Real Time Performance'];
    if (!sectorData) return [];
    const result: SectorPerformance[] = [];
    for (const sector in sectorData) {
        result.push({
            sector: sector.replace(/^\d+\. /, ''),
            performance: sectorData[sector],
        });
    }
    return result;
}


// ----------------------------------------------------------------------
// ฟังก์ชันรวมการดึงข้อมูลหลัก (แก้ไขการเรียก Ticker Crypto)
// ----------------------------------------------------------------------

async function fetchFinancialData(): Promise<FinancialTrackerData> {

    try {
        const [
            thbUsdResult, 
            goldUsdResult, 
            btcUsdResult, // <--- ใช้ USD
            ethUsdResult, // <--- ใช้ USD
            solUsdtResult,
            usdtThbResult,
            sectorPerformanceResult
        ] = await Promise.allSettled([
            // แถว 1
            fetchAlphaVantageData('USD', 'THB', 'USD/THB'),
            fetchCoinAPICrypto('XAU', 'USD', 'GOLD/USD'),     

            // แถว 2: เปลี่ยนเป็น /USD เพื่อเพิ่มโอกาสสำเร็จ
            fetchCoinAPICrypto('BTC', 'USD', 'BTC/USD'), // BTC/USD
            fetchCoinAPICrypto('ETH', 'USD', 'ETH/USD'), // ETH/USD
            fetchCoinAPICrypto('SOL', 'USDT', 'SOL/USDT'),
            fetchCoinAPICrypto('USDT', 'THB', 'USDT/THB'), 
            
            // อื่นๆ
            fetchSectorPerformance(),
        ]);
        
        // ใช้ Fallback Data ในกรณีที่ Promise ล้มเหลว (Rejected)
        const thbUsd = thbUsdResult.status === 'fulfilled' ? thbUsdResult.value : DEFAULT_DATA_FALLBACK.thbUsd;
        const goldUsd = goldUsdResult.status === 'fulfilled' ? goldUsdResult.value : DEFAULT_DATA_FALLBACK.goldUsd;
        // NOTE: ต้องเปลี่ยน Symbol กลับให้ตรงกับที่ Component ต้องการ (แต่ข้อมูลเป็น /USD)
        const btcUsdt = btcUsdResult.status === 'fulfilled' ? { ...btcUsdResult.value, symbol: 'BTC/USD' } : DEFAULT_DATA_FALLBACK.btcUsdt;
        const ethUsdt = ethUsdResult.status === 'fulfilled' ? { ...ethUsdResult.value, symbol: 'ETH/USD' } : DEFAULT_DATA_FALLBACK.ethUsdt;
        const solUsdt = solUsdtResult.status === 'fulfilled' ? solUsdtResult.value : DEFAULT_DATA_FALLBACK.solUsdt;
        const usdtThb = usdtThbResult.status === 'fulfilled' ? usdtThbResult.value : DEFAULT_DATA_FALLBACK.usdtThb;
        const sectorPerformance = sectorPerformanceResult.status === 'fulfilled' ? sectorPerformanceResult.value : DEFAULT_DATA_FALLBACK.sectorPerformance;

        const goldThb = DEFAULT_DATA_FALLBACK.goldThb; 
        
        return {
            thbUsd,
            goldUsd,
            goldThb,
            btcUsdt,
            ethUsdt,
            solUsdt,
            usdtThb,
            sectorPerformance,
        };
    } catch (error) {
        console.error("Critical error during primary data fetch:", error);
        return DEFAULT_DATA_FALLBACK;
    }
}


// ----------------------------------------------------------------------
// Component Display Logic (ไม่เปลี่ยน)
// ----------------------------------------------------------------------

// Helper Component สำหรับแสดงอัตราแลกเปลี่ยน
const RateDisplay: React.FC<{ data: ExchangeRateData }> = ({ data }) => {
    const isPositive = data.isUp;
    const colorClass = isPositive ? 'text-green-400' : 'text-red-400';
    const arrow = isPositive ? '▲' : '▼';

    const formatNumber = (num: number | undefined | null, decimals: number = 2) => {
        if (num === undefined || num === null || isNaN(num)) return '-';
        return num.toLocaleString('th-TH', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    };

    const decimalCount = (
        data.symbol.includes('USDT') || 
        data.symbol.includes('BTC') || 
        data.symbol.includes('ETH') || 
        data.symbol.includes('SOL')
    ) && !data.symbol.includes('THB') ? 4 : 2;

    return (
        <GlassmorphismCard className="p-4 sm:p-6 flex flex-col items-start min-h-[120px] justify-center">
            <h5 className="text-sm font-light opacity-75 mb-1">{data.symbol}</h5>
            <div className="flex items-end gap-2">
                <p className="text-2xl sm:text-3xl font-bold">
                    {formatNumber(data.rate, decimalCount)}
                </p>
            </div>
            <p className={`text-md font-semibold ${colorClass} mt-1`}>
                {arrow} {formatNumber(Math.abs(data.change), decimalCount)}
            </p>
        </GlassmorphismCard>
    );
};

export default async function FinancialTracker() {
    
    const data = await fetchFinancialData(); 
    const usingFallback = data.thbUsd.rate === DEFAULT_DATA_FALLBACK.thbUsd.rate && data.thbUsd.change === DEFAULT_DATA_FALLBACK.thbUsd.change;
    
    return (
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-gradient-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px]">
            <GooeyBackground />

            <main className="container mx-auto max-w-7xl flex flex-col gap-12">
                <header className="text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
                        Microtronic Financial Tracker 💰
                    </h1>
                    <p className="text-xl sm:text-2xl font-light opacity-90 max-w-3xl mx-auto">
                        อัตราแลกเปลี่ยนและข้อมูลตลาดสำคัญแบบ Real-Time
                    </p>
                    {usingFallback && (
                        <p className="text-red-400 mt-4 text-lg">
                            ⚠️ การดึงข้อมูล API ล้มเหลวหรือ API Key อาจไม่ถูกต้อง! **กำลังแสดงข้อมูลจำลอง**
                        </p>
                    )}
                </header>

                {/* ส่วนแสดงอัตราแลกเปลี่ยนหลัก */}
                <section>
                    <h3 className="text-3xl font-bold mb-6">อัตราแลกเปลี่ยนและสินทรัพย์หลัก</h3>
                    
                    {/* แถวที่ 1: Forex, Commodity, และ Stablecoin/THB */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                        <RateDisplay data={data.thbUsd} />
                        <RateDisplay data={data.goldUsd} />
                        <RateDisplay data={data.goldThb} />
                        <RateDisplay data={data.usdtThb} />
                    </div>

                    {/* แถวที่ 2: Crypto Pairs (ตอนนี้ถูกเปลี่ยนเป็น /USD ชั่วคราว) */}
                    <h3 className="text-2xl font-bold mb-4 mt-8">คู่เทรดคริปโตเคอร์เรนซีหลัก (Crypto/USD)</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <RateDisplay data={data.btcUsdt} />
                        <RateDisplay data={data.ethUsdt} />
                        <RateDisplay data={data.solUsdt} />
                        {/* ช่องที่ 4 ว่าง */}
                    </div>
                </section>

                {/* ส่วนแสดง TradingView Widgets */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8">
                    {/* Widget ทองคำโลก: XAU/USD Chart */}
                    <div className="h-[400px]">
                        <TradingViewWidget
                            symbol="FX_IDC:XAUUSD"
                            widgetType="chart"
                            title="ราคาทองคำโลก (XAU/USD) Chart"
                            description="การเคลื่อนไหวของราคาทองคำโลกเทียบกับดอลลาร์สหรัฐฯ"
                            height={400}
                        />
                    </div>

                    {/* Widget หุ้นราย Sector: Sector Performance Hotlists */}
                    <div className="h-[400px]">
                        <TradingViewWidget
                            symbol="NYSE:SPY" 
                            widgetType="sector-performance"
                            title="ประสิทธิภาพรายภาคส่วนของตลาดหุ้น"
                            description="การเปลี่ยนแปลงของภาคส่วนหุ้นหลักในตลาดโลก (TradingView Hotlist)"
                            height={400}
                        />
                    </div>
                </section>

                {/* ส่วนแสดงข้อมูลเพิ่มเติม (เช่น หุ้นราย Sector จาก API) */}
                <section className="mt-8">
                    <h3 className="text-3xl font-bold mb-6">สรุปผลประกอบการรายภาคส่วน (Alpha Vantage)</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {data.sectorPerformance.map((item, index) => (
                            <GlassmorphismCard key={index} className="p-4 text-center">
                                <h4 className="text-lg font-semibold">{item.sector}</h4>
                                <p className={`text-xl font-bold ${item.performance.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                                    {item.performance}
                                </p>
                            </GlassmorphismCard>
                        ))}
                    </div>
                    <p className="mt-4 text-sm opacity-70">
                        ข้อมูล Sector Performance ดึงมาจาก Alpha Vantage API (ข้อมูล ณ สิ้นวัน)
                    </p>
                </section>

            </main>
        </div>
    );
}