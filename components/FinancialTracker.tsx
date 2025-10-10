// src/components/FinancialTracker.tsx
import React from 'react';
import GooeyBackground from '@/components/GooeyBackground';
import TradingViewWidget from './TradingViewWidget';
import TradingViewSingleTicker from './TradingViewSingleTicker'; // นำเข้า Ticker Component ที่ถูกแก้ไขแล้ว

// เนื่องจากเราเปลี่ยนไปใช้ Widget แทน API/Mock Data แล้ว ฟังก์ชันดึงข้อมูลจึงไม่จำเป็นต้องใช้งาน
// แต่จะคงไว้ในรูปแบบ Server Component เพื่อให้โครงสร้าง Next.js App Router สมบูรณ์
async function fetchFinancialData() {
    return {};
}

export default async function FinancialTracker() {

    // เรียกใช้ฟังก์ชันเปล่าเพื่อคงโครงสร้าง Server Component
    await fetchFinancialData();

    // Tickers สำหรับ TradingView Single Ticker (แถวที่ 1)
    // เลือก 4 Tickers หลักที่ต้องการแสดงผลใน Grid 4 คอลัมน์
    const row1Tickers = [
        { symbol: 'BINANCE:BTCUSDT', title: 'Bitcoin / USDT' },
        { symbol: 'BINANCE:ETHUSDT', title: 'Ethereum / USDT' },
        { symbol: 'BINANCE:SOLUSDT', title: 'Solana / USDT' },
        { symbol: 'CRYPTOCAP:TOTAL', title: 'ตลาดรวม (Total Market)' },
    ];

    const displayTickers = row1Tickers.slice(0, 4); // แสดง 4 ตัวแรกใน Grid 4 คอลัมน์

    return (
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-gradient-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px]">
            <GooeyBackground />

            <main className="container mx-auto max-w-7xl flex flex-col gap-12">
                <header className="text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
                        Microtronic Financial Tracker 💰 (Widget Ticker)
                    </h1>
                    <p className="text-xl sm:text-2xl font-light opacity-90 max-w-3xl mx-auto">
                        ราคาแบบ Real-Time ดึงโดยตรงจาก TradingView
                    </p>
                </header>

                {/* ส่วนแสดงอัตราแลกเปลี่ยนหลัก (ใช้ TradingView Single Ticker) */}
                <section>
                    <h3 className="text-3xl font-bold mb-6">อัตราแลกเปลี่ยนและสินทรัพย์หลัก</h3>

                    {/* แถวที่ 1: Single Ticker Card */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                        {displayTickers.map((ticker, index) => (
                            <TradingViewSingleTicker
                                key={`tv-single-${index}`}
                                symbol={ticker.symbol}
                                title={ticker.title}
                            />
                        ))}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                        <TradingViewSingleTicker symbol={'FX_IDC:USDTHB'} title={'USD/THB'} />
                        <TradingViewSingleTicker symbol={'BITKUB:USDTTHB'} title={'USDT/THB'} />
                        <TradingViewSingleTicker symbol={'COINBASE:USDTUSD'} title={'USDT/USD'} />
                        <TradingViewSingleTicker symbol={'FX_IDC:XAUUSD'} title={'ทองคำ (XAU/USD)'} />
                    </div>

                    {/*
                    หากคุณต้องการ Ticker เพิ่มเติม สามารถสร้างแถวเพิ่มได้
                    ตัวอย่างเช่น:
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                        <TradingViewSingleTicker symbol={'FX_IDC:USDTHB'} title={'USD/THB'} />
                        <TradingViewSingleTicker symbol={'FX_IDC:USDTHB'} title={'USD/THB'} />
                    </div>
                    */}

                </section>

                <h3 className="text-3xl font-bold">เครื่องมือวิเคราะห์</h3>

                {/* ส่วนแสดง TradingView Widgets (Chart และ Sector Performance) */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* กราฟ XAU/USD */}
                    <div className="h-[400px]">
                        <TradingViewWidget
                            symbol="FX_IDC:XAUUSD"
                            widgetType="chart"
                            title="ราคาทองคำโลก (XAU/USD) Chart"
                            description="การเคลื่อนไหวของราคาทองคำโลกเทียบกับดอลลาร์สหรัฐฯ"
                            height={400}
                        />
                    </div>
                    {/* Sector Performance Hotlist */}
                    <div className="h-[400px]">
                        <TradingViewWidget
                            symbol="CRYPTOCAP:TOTAL"
                            widgetType="chart"
                            title="ภาพรวมประสิทธิภาพของตลาดคริปโต"
                            description="การเปลี่ยนแปลงของตลาดคริปโต ในช่วง 24 ชั่วโมงที่ผ่านมา"
                            height={400}
                        />
                    </div>
                </section>

            </main>
        </div>
    );
}