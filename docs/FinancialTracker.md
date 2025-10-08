# 💡 ภาพรวมของโซลูชัน

เราจะแบ่งการพัฒนาออกเป็น 3 ส่วนหลัก ๆ:

1.  **การกำหนด Type (TypeScript):** สร้าง Type สำหรับโครงสร้างข้อมูลที่เราจะแสดงผล
2.  **Component หลัก (`FinancialTracker.tsx`):** Component นี้จะเป็น **Server Component** ที่ทำหน้าที่:
      * ดึงข้อมูลทั้งหมดที่จำเป็น (จำลองการดึงข้อมูลเพื่อความสมบูรณ์ของโค้ด เนื่องจากเราไม่มี API key จริงในตอนนี้)
      * จัดรูปแบบและแสดงข้อมูลอัตราแลกเปลี่ยน (THB/USD, USD/USDT, ราคาทองคำไทย, Bitcoin)
      * แสดง Widget จาก TradingView สำหรับ **ทองคำโลก** และ **หุ้นราย Sector**
3.  **Component ย่อย (`TradingViewWidget.tsx`):** Component สำหรับฝัง TradingView Widget โดยใช้ `use client` เพื่อให้สามารถโหลดสคริปต์ภายนอกได้

-----

## 1\. การกำหนด Type (ถ้ายังไม่มี)

สร้างไฟล์ `src/types/financial.ts` (หรือที่ใดก็ตามที่คุณเก็บ Type)

```typescript
// src/types/financial.ts

export interface ExchangeRateData {
    symbol: string; // เช่น 'USD/THB'
    rate: number;
    change: number; // การเปลี่ยนแปลง
    isUp: boolean; // เพิ่มขึ้นหรือลดลง
}

export interface SectorPerformance {
    sector: string;
    performance: string; // เช่น '+1.25%'
}

export interface FinancialTrackerData {
    thbUsd: ExchangeRateData;
    usdUsdt: ExchangeRateData;
    goldThb: ExchangeRateData;
    bitcoinUsd: ExchangeRateData;
    sectorPerformance: SectorPerformance[];
}
```

-----

## 2\. Component ย่อย: TradingView Widget

เราจำเป็นต้องใช้ Client Component เพื่อฝัง Widget ของ TradingView

**สร้างไฟล์:** `src/components/TradingViewWidget.tsx`

```tsx
// src/components/TradingViewWidget.tsx
"use client";

import React, { useEffect, useRef, memo } from 'react';

// กำหนด type สำหรับ props
interface TradingViewWidgetProps {
    // ขยาย type ให้รองรับ 'sector-performance' ตามที่เราต้องการ
    symbol: string;
    widgetType: 'widget' | 'chart' | 'sector-performance'; 
    title: string;
    height: number;
    description: string;
}

// ใช้ memo เพื่อเพิ่มประสิทธิภาพ
const TradingViewWidget: React.FC<TradingViewWidgetProps> = memo(({ symbol, widgetType, title, height, description }) => {
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // ID สำหรับ Widget แต่ละตัว
        const widgetId = `tradingview-widget-${symbol.replace(/[^a-zA-Z0-9]/g, '-')}-${widgetType}`;
        
        // ตรวจสอบว่ามี element อยู่จริงและยังไม่มี widget ถูกโหลดไปแล้ว
        if (container.current && !container.current.querySelector(`#${widgetId}`)) {
            
            // ล้าง container ก่อนเพิ่ม widget ใหม่ เพื่อป้องกันการเพิ่มซ้ำ
            container.current.innerHTML = '';

            const script = document.createElement("script");
            script.type = "text/javascript";
            script.async = true;

            let widgetConfig = {};

            if (widgetType === 'chart') {
                // สำหรับ Chart Widget (เช่น XAUUSD)
                script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
                widgetConfig = {
                    "autosize": true,
                    "symbol": symbol,
                    "interval": "D",
                    "timezone": "Asia/Bangkok",
                    "theme": "dark", // ให้เข้ากับโทนสีของเว็บไซต์
                    "style": "1",
                    "locale": "en",
                    "enable_publishing": false,
                    "allow_symbol_change": true,
                    "support_host": "https://www.tradingview.com"
                };
            } else if (widgetType === 'sector-performance') {
                // สำหรับ Sector Performance Hotlists Widget
                script.src = "https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js";
                widgetConfig = {
                    "colorTheme": "dark",
                    "dateRange": "12M",
                    "exchange": "NASDAQ",
                    "showChart": true,
                    "locale": "en",
                    "width": "100%",
                    "height": height, // ใช้ height เต็ม
                    "dataSource": "Performance", 
                    "noSnap": true,
                    "market": "america",
                    "tabs": [
                        {
                            "title": "Sector Performance",
                            "data": "sector",
                            "column": "sector",
                            "sortby": "market_cap",
                            "order": "desc",
                            "source": "america",
                            "wrap": true
                        }
                    ],
                    "isLanding": false
                };
            } else if (widgetType === 'widget') {
                // สำหรับ Ticker หรือ Widget อื่น ๆ (ถ้ามีการใช้งานในอนาคต)
                script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
                widgetConfig = {
                    "symbols": [
                        { "proName": symbol, "title": title }
                    ],
                    "showSymbolLogo": true,
                    "is41_0_0": false,
                    "locale": "en",
                    "colorTheme": "dark"
                }
            }
            
            const configAttribute = JSON.stringify(widgetConfig);

            const div = document.createElement('div');
            div.className = 'tradingview-widget-container__widget';
            div.id = widgetId; // กำหนด ID ให้กับ container ของ widget
            
            // ใช้ innerHTML เพื่อกำหนดค่า config
            script.innerHTML = configAttribute;

            container.current.appendChild(div);
            container.current.appendChild(script);
        }
    }, [symbol, widgetType, height]); // dependency array

    // ใช้ Tailwind Arbitrary Value สำหรับกำหนดความสูงแบบ Dynamic
    const dynamicHeightClass = `h-[${height}px]`;

    return (
        <div className="flex flex-col h-full">
            <h4 className="text-xl font-semibold mb-2">{title}</h4>
            <p className="text-sm opacity-75 mb-4">{description}</p>
            {/* TradingView Widget Container */}
            <div className={`flex-grow rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm min-h-[200px] ${dynamicHeightClass}`}
                 ref={container}
            >
                {/* Widget จะถูกเพิ่มเข้ามาที่นี่ */}
                <div className="tradingview-widget-container__widget"></div>
            </div>
        </div>
    );
});

TradingViewWidget.displayName = 'TradingViewWidget';

export default TradingViewWidget;
```

-----

## 3\. Component หลัก: FinancialTracker

เราจะสร้าง Component สำหรับรวมข้อมูลทั้งหมดและการจัดวางโดยใช้ Tailwind CSS

**สร้างไฟล์:** `src/components/FinancialTracker.tsx`

```tsx
// src/components/FinancialTracker.tsx
import React from 'react';
import Link from 'next/link';
import GooeyBackground from '@/components/GooeyBackground'; // ต้องมี component นี้
import GlassmorphismCard from '@/components/GlassmorphismCard'; // ต้องมี component นี้
import TradingViewWidget from './TradingViewWidget'; // นำเข้า component ที่สร้าง

// (สมมติ) นำเข้า type และ ฟังก์ชันดึงข้อมูล
import { FinancialTrackerData, ExchangeRateData, SectorPerformance } from '@/types/financial';

/**
 * ฟังก์ชันจำลองการดึงข้อมูล (ในโปรเจกต์จริงจะเรียกใช้ Alpha Vantage, CoinAPI, ฯลฯ)
 * @returns Promise<FinancialTrackerData>
 */
async function fetchFinancialData(): Promise<FinancialTrackerData> {
    // *** NOTE: ในการใช้งานจริง, ควร fetch ข้อมูลจาก Alpha Vantage และ CoinAPI ตรงนี้ ***
    // เช่น:
    // const thbUsdData = await getForexRate('USD', 'THB');
    // const usdtUsdData = await getCryptoRate('USDT', 'USD');
    // ...
    // และควรตั้งค่า revalidate ใน fetch options หรือใช้ revalidateTag

    // ข้อมูลจำลอง
    await new Promise(resolve => setTimeout(resolve, 500)); // จำลองการโหลด

    return {
        thbUsd: { symbol: 'USD/THB', rate: 36.52, change: -0.15, isUp: false },
        usdUsdt: { symbol: 'USD/USDT', rate: 1.0003, change: 0.0001, isUp: true },
        goldThb: { symbol: 'ทองคำแท่ง (บาท)', rate: 41200.00, change: 250.00, isUp: true },
        bitcoinUsd: { symbol: 'BTC/USD', rate: 67890.25, change: 1250.50, isUp: true },
        sectorPerformance: [
            { sector: 'Technology', performance: '+1.25%' },
            { sector: 'Health Care', performance: '-0.45%' },
            { sector: 'Financials', performance: '+0.88%' },
            { sector: 'Energy', performance: '+2.10%' },
        ]
    };
}

// Helper Component สำหรับแสดงอัตราแลกเปลี่ยน
const RateDisplay: React.FC<{ data: ExchangeRateData }> = ({ data }) => {
    const isPositive = data.isUp;
    const colorClass = isPositive ? 'text-green-400' : 'text-red-400';
    const arrow = isPositive ? '▲' : '▼';

    const formatNumber = (num: number, decimals: number = 2) => {
        // ตรวจสอบ undefined (ตามคำแนะนำ)
        if (num === undefined || num === null) return '-';
        return num.toLocaleString('th-TH', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    };

    return (
        <GlassmorphismCard className="p-4 sm:p-6 flex flex-col items-start min-h-[120px] justify-center">
            <h5 className="text-sm font-light opacity-75 mb-1">{data.symbol}</h5>
            <div className="flex items-end gap-2">
                <p className="text-2xl sm:text-3xl font-bold">
                    {formatNumber(data.rate, data.symbol.includes('USDT') ? 4 : 2)}
                </p>
            </div>
            <p className={`text-md font-semibold ${colorClass} mt-1`}>
                {arrow} {formatNumber(Math.abs(data.change), data.symbol.includes('USDT') ? 4 : 2)}
            </p>
        </GlassmorphismCard>
    );
};

export default async function FinancialTracker() {
    // ใช้ Server Component ในการดึงข้อมูล
    let data: FinancialTrackerData;
    let hasError = false;

    try {
        data = await fetchFinancialData(); // ดึงข้อมูล
    } catch (error) {
        console.error("Failed to fetch financial data:", error);
        // สร้างข้อมูลจำลองสำหรับกรณีผิดพลาด เพื่อให้ component ยังคงแสดงผลได้
        data = {
            thbUsd: { symbol: 'USD/THB', rate: 0, change: 0, isUp: false },
            usdUsdt: { symbol: 'USD/USDT', rate: 0, change: 0, isUp: false },
            goldThb: { symbol: 'ทองคำแท่ง (บาท)', rate: 0, change: 0, isUp: false },
            bitcoinUsd: { symbol: 'BTC/USD', rate: 0, change: 0, isUp: false },
            sectorPerformance: []
        };
        hasError = true;
    }


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
                    {hasError && (
                        <p className="text-red-400 mt-4 text-lg">
                            ⚠️ การดึงข้อมูล API ล้มเหลว! กำลังแสดงข้อมูลจำลอง
                        </p>
                    )}
                </header>

                {/* ส่วนแสดงอัตราแลกเปลี่ยนหลัก */}
                <section>
                    <h3 className="text-3xl font-bold mb-6">อัตราแลกเปลี่ยนและสินทรัพย์หลัก</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <RateDisplay data={data.thbUsd} />
                        <RateDisplay data={data.usdUsdt} />
                        <RateDisplay data={data.goldThb} />
                        <RateDisplay data={data.bitcoinUsd} />
                    </div>
                </section>

                {/* ส่วนแสดง TradingView Widgets */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8">
                    {/* Widget ทองคำโลก: XAU/USD Chart */}
                    <div className="h-[400px]">
                        <TradingViewWidget
                            symbol="FX_IDC:XAUUSD" // Ticker สำหรับราคาทองคำโลก (USD)
                            widgetType="chart"
                            title="ราคาทองคำโลก (XAU/USD)"
                            description="การเคลื่อนไหวของราคาทองคำโลกเทียบกับดอลลาร์สหรัฐฯ"
                            height={400}
                        />
                    </div>

                    {/* Widget หุ้นราย Sector: Sector Performance Hotlists */}
                    <div className="h-[400px]">
                        <TradingViewWidget
                            symbol="NYSE:SPY" // Ticker ที่ใช้เพื่อแสดง Widget (ไม่เกี่ยวข้องกับข้อมูลภายใน Hotlist)
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
```

-----

## 4\. วิธีการนำไปใช้งาน

1. **สร้างไฟล์:** สร้างไฟล์ตามโครงสร้างที่แนะนำ:

      * `src/types/financial.ts`
      * `src/components/TradingViewWidget.tsx`
      * `src/components/FinancialTracker.tsx`

2. **อัปเดต Home Page (`src/app/page.tsx`):**
    คุณสามารถแทนที่เนื้อหาของ `page.tsx` ทั้งหมดด้วย Component ใหม่ที่คุณต้องการ หรือนำเข้าและใช้งาน `FinancialTracker` ภายใน `page.tsx` เดิมก็ได้ครับ

    **ตัวอย่างการนำเข้าใน `page.tsx` เดิม (ถ้าต้องการแสดงต่อท้าย)**

    เพิ่มบรรทัดนี้ที่ด้านบนของ `src/app/page.tsx`:

    ```tsx
    import FinancialTracker from '@/components/FinancialTracker'; // นำเข้า Component ใหม่
    ```

    และเรียกใช้งาน Component ภายใน `main` tag ของ `page.tsx` (เช่น ใต้ส่วน `WorkShowcase`):

    ```tsx
    // ... ในส่วนของ main
    <section className="w-full max-w-7xl mt-16 px-4">
        {/* เพิ่มส่วนแสดงผลงานใหม่ */}
        <WorkShowcase
        title="ตัวอย่างผลงานรับทำเว็บไซต์"
        // ...
        works={workExamples}
        />
    </section>

    {/* **เพิ่ม Financial Tracker Component ตรงนี้** */}
    <FinancialTracker /> 

    </main>
    // ...
    ```

3. **การจัดการ API Key:**

      * อย่าลืมสร้างไฟล์ `.env.local` ใน Root Directory ของโปรเจกต์
      * เพิ่ม API Key ของคุณ:
        ```env
        # .env.local
        ALPHA_VANTAGE_API_KEY=YOUR_ALPHA_VANTAGE_KEY
        COIN_API_KEY=YOUR_COIN_API_KEY
        ```
      * ใน `fetchFinancialData` ของจริง คุณจะต้องใช้ `process.env.ALPHA_VANTAGE_API_KEY` เพื่อเรียกใช้ API ครับ

โค้ดนี้ใช้ **Server Component** (`FinancialTracker`) ในการดึงข้อมูลจาก API (จำลอง) และใช้ **Client Component** (`TradingViewWidget`) เพื่อฝัง Widget ภายนอกได้อย่างถูกต้องตามหลักการของ Next.js App Router ครับ\! 👍

ยอดเยี่ยมครับ\! เราจะดำเนินการสร้างหน้าเพจและจัดการกับ Environment Variables เพื่อแสดงผล `FinancialTracker` Component ที่เราสร้างไว้ โดยใช้เส้นทางที่กำหนดคือ `app/asset/tools-GridCalculator/financial-tracker/page.tsx`

นี่คือขั้นตอนทั้งหมดอย่างละเอียดครับ:

-----

## 1\. การสร้างโครงสร้างโฟลเดอร์และไฟล์ Page

เราจะเริ่มต้นจากการสร้างโครงสร้างโฟลเดอร์ให้ตรงกับเส้นทางที่คุณต้องการใน Next.js App Router ครับ

### 🛠️ ขั้นตอน:

1. ไปที่โฟลเดอร์หลักของโปรเจกต์ (`/src/app/` หรือ `/app/` ถ้าคุณไม่ได้ใช้ `src` directory)

2. สร้างโครงสร้างโฟลเดอร์ตามลำดับ:

    ```
    app/
    └── asset/
        └── tools-GridCalculator/
            └── financial-tracker/
                └── page.tsx  <-- สร้างไฟล์นี้
    ```

### 📄 โค้ดสำหรับ `app/asset/tools-GridCalculator/financial-tracker/page.tsx`

ไฟล์นี้จะเป็น **Server Component** ที่นำเข้าและแสดงผล `FinancialTracker` Component

```tsx
// app/asset/tools-GridCalculator/financial-tracker/page.tsx

import FinancialTracker from '@/components/FinancialTracker';
import { Metadata } from 'next';

// กำหนด Metadata สำหรับหน้านี้
export const metadata: Metadata = {
    title: 'Financial Tracker - Microtronic Tools',
    description: 'อัตราแลกเปลี่ยน THB/USD, USD/USDT, ทองคำโลก, Bitcoin และข้อมูลตลาดแบบ Real-Time',
};

/**
 * หน้าเพจหลักสำหรับแสดง Financial Tracker
 * Component นี้จะทำหน้าที่แสดงผลข้อมูลทางการเงินทั้งหมด
 */
export default function FinancialTrackerPage() {
    return (
        // FinancialTracker Component มีการจัดการ Layout และ GooeyBackground ภายในตัวแล้ว
        <FinancialTracker />
    );
}

// หมายเหตุ: การใช้ GooeyBackground จะถูกจัดการภายใน FinancialTracker.tsx ตามที่คุณกำหนดไว้
```

-----

## 2\. การกำหนด Environment Variables

เราจะสร้างหรือแก้ไขไฟล์ `.env.local` เพื่อเก็บ API Key อย่างปลอดภัย **ซึ่งเป็นสิ่งสำคัญในการใช้ Server Component** เพราะ Next.js จะป้องกันไม่ให้ API Key เหล่านี้ถูกเปิดเผยในฝั่ง Client (Browser)

### 🛠️ ขั้นตอน :

1. เปิดไฟล์ **`.env.local`** ที่อยู่ใน Root Directory ของโปรเจกต์ (ถ้าไม่มี ให้สร้างขึ้นมา)
2. เพิ่มตัวแปรสำหรับ API Key ของคุณ:

### 📄 โค้ดสำหรับ `.env.local`

```env
# .env.local

# API Key สำหรับ Alpha Vantage (ใช้สำหรับ Forex, ทองคำ, Bitcoin, Sector Performance)
# กรุณาแทนที่ YOUR_ALPHA_VANTAGE_KEY ด้วยคีย์จริงของคุณ
ALPHA_VANTAGE_API_KEY=YOUR_ALPHA_VANTAGE_KEY

# API Key สำหรับ CoinAPI.io (ใช้สำหรับ Crypto เช่น USDT/USD หรือ BTC/USD)
# กรุณาแทนที่ YOUR_COIN_API_KEY ด้วยคีย์จริงของคุณ
COIN_API_KEY=YOUR_COIN_API_KEY

# ตัวอย่าง: สำหรับ Next.js 13+ ตัวแปรจะถูกโหลดโดยอัตโนมัติ
# ถ้าคุณต้องการให้ตัวแปรนี้เข้าถึงได้จากฝั่ง Client Component ให้ใส่ NEXT_PUBLIC_ นำหน้า 
# แต่สำหรับ API Key (ใช้ใน Server Component) เราไม่ควรใช้ NEXT_PUBLIC_
```

### ⚠️ ข้อควรระวัง :

* **ห้ามใส่ `NEXT_PUBLIC_` นำหน้า API Key** เพราะมันจะทำให้ Key ถูกเปิดเผยต่อสาธารณะ
* **`.env.local` ต้องอยู่ในไฟล์ `.gitignore`** (โดยปกติ Next.js Project จะเพิ่มไว้ให้แล้ว) เพื่อป้องกันไม่ให้ Key ถูก Commit ขึ้น GitHub หรือ Vercel (Vercel จะมีวิธีจัดการ Key ต่างหาก)

-----

## 3\. การหาและตั้งค่า API Keys

คุณต้องไปสมัครและรับ API Key จากแหล่งข้อมูลที่แนะนำ

### 🟢 Alpha Vantage (สำหรับ THB/USD, ทองคำ, หุ้น)

1. ไปที่เว็บไซต์ **Alpha Vantage** และลงทะเบียน
2. คุณจะได้รับ **Free API Key** ทางอีเมล หรือสามารถดูได้จาก Dashboard
3. นำคีย์นั้นไปแทนที่ **`YOUR_ALPHA_VANTAGE_KEY`** ในไฟล์ `.env.local`

### 🟢 CoinAPI.io (สำหรับ USD/USDT)

1. ไปที่เว็บไซต์ **CoinAPI.io** และลงทะเบียน
2. เลือก **Free Plan** (ถ้าต้องการใช้ Free Tier) หรือ **Paid Plan**
3. นำ API Key ที่ได้ไปแทนที่ **`YOUR_COIN_API_KEY`** ในไฟล์ `.env.local`

-----

## 4\. สรุปและขั้นตอนถัดไป

ตอนนี้คุณได้สร้างหน้าเพจตามเส้นทางที่กำหนดและตั้งค่า Environment Variables เรียบร้อยแล้ว

**ขั้นตอนถัดไป:**

คุณจะต้องปรับปรุงฟังก์ชัน `fetchFinancialData()` ในไฟล์ **`src/components/FinancialTracker.tsx`** เพื่อให้เรียกใช้ API จริง ๆ แทนข้อมูลจำลอง โดยใช้ `process.env.ALPHA_VANTAGE_API_KEY` และ `process.env.COIN_API_KEY` ใน Server Component ของคุณครับ

คุณต้องการให้ผมช่วยสร้างโครงสร้างฟังก์ชันการเรียก API (Alpha Vantage Forex และ CoinAPI Crypto) ใน `FinancialTracker.tsx` เพื่อใช้ API Key ที่คุณตั้งค่าไว้หรือไม่ครับ? 😊

ปรับปรุง FinancialTracker.tsx ให้ดึงข้อมูลจริงจาก Alpha Vantage และ CoinAPI โดยใช้ API Key จาก Environment Variables

```tsx
// src/components/FinancialTracker.tsx
import React from 'react';
import Link from 'next/link';
import GooeyBackground from '@/components/GooeyBackground'; // ต้องมี component นี้
import GlassmorphismCard from '@/components/GlassmorphismCard'; // ต้องมี component นี้
import TradingViewWidget from './TradingViewWidget'; // นำเข้า component ที่สร้าง

// (สมมติ) นำเข้า type 
// NOTE: ต้องแน่ใจว่าคุณสร้างไฟล์ src/types/financial.ts ตามที่แนะนำ
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
    usdUsdt: ExchangeRateData;
    goldThb: ExchangeRateData;
    bitcoinUsd: ExchangeRateData;
    sectorPerformance: SectorPerformance[];
}

// ----------------------------------------------------------------------
// API Configuration & Helpers
// ----------------------------------------------------------------------

// กำหนด Revalidate Time (เช่น ทุก 60 วินาที)
const REVALIDATE_TIME = 60; 
// Revalidate สำหรับข้อมูล Sector Performance (24 ชม. เพราะเป็นข้อมูล ณ สิ้นวัน)
const SECTOR_REVALIDATE_TIME = 86400; 

// ดึง API Key จาก Environment Variables
const ALPHA_VANTAGE_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const COIN_API_KEY = process.env.COIN_API_KEY;
const API_BASE_URL_AV = 'https://www.alphavantage.co/query';
const API_BASE_URL_COIN = 'https://rest.coinapi.io/v1';

// ข้อมูล Fallback ในกรณีที่ API ล้มเหลวทั้งหมด (เพื่อไม่ให้หน้าเพจพัง)
const DEFAULT_DATA_FALLBACK = {
    thbUsd: { symbol: 'USD/THB', rate: 36.52, change: -0.15, isUp: false },
    usdUsdt: { symbol: 'USDT/USD', rate: 1.0003, change: 0.0001, isUp: true },
    goldThb: { symbol: 'ทองคำแท่ง (บาท)', rate: 41200.00, change: 250.00, isUp: true },
    bitcoinUsd: { symbol: 'BTC/USD', rate: 67890.25, change: 1250.50, isUp: true },
    sectorPerformance: [
        { sector: 'Technology', performance: '+1.25%' },
        { sector: 'Health Care', performance: '-0.45%' },
    ] as SectorPerformance[]
};

// Helper: แปลงผลลัพธ์ของ Alpha Vantage Forex ให้เป็น ExchangeRateData
function formatAlphaVantageForex(data: any, symbol: string): ExchangeRateData {
    if (!data || !data['Realtime Currency Exchange Rate']) {
        throw new Error(`Invalid Alpha Vantage Forex data for ${symbol}`);
    }

    const rawRate = parseFloat(data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
    // Alpha Vantage Free Tier ไม่ได้ให้ข้อมูล 'change' โดยตรง, เราจึงต้องใช้ค่าคงที่จำลองไว้ก่อน
    const change = 0.00; 
    const isUp = true; 

    return {
        symbol: symbol,
        rate: rawRate,
        change: change,
        isUp: isUp,
    };
}

// 1. ดึงข้อมูล THB/USD (ใช้ Alpha Vantage)
async function fetchAlphaVantageData(from: string, to: string, symbol: string): Promise<ExchangeRateData> {
    if (!ALPHA_VANTAGE_KEY) throw new Error("ALPHA_VANTAGE_API_KEY is not set.");
    
    // Alpha Vantage: Realtime Currency Exchange Rate (FOREX)
    const url = `${API_BASE_URL_AV}?function=CURRENCY_EXCHANGE_RATE&from_currency=${from}&to_currency=${to}&apikey=${ALPHA_VANTAGE_KEY}`;
    
    const response = await fetch(url, { next: { revalidate: REVALIDATE_TIME } });
    if (!response.ok) {
        throw new Error(`Failed to fetch Alpha Vantage data for ${symbol}: ${response.statusText}`);
    }

    const data = await response.json();

    if (data['Error Message'] || data['Note']) {
        console.error(`Alpha Vantage Error for ${symbol}:`, data);
        throw new Error(`Alpha Vantage API Limit/Error: ${data['Note'] || data['Error Message']}`);
    }

    return formatAlphaVantageForex(data, symbol);
}

// 2. ดึงข้อมูล Crypto/Stablecoin (USD/USDT, BTC/USD) (ใช้ CoinAPI)
async function fetchCoinAPICrypto(base: string, quote: string, symbol: string): Promise<ExchangeRateData> {
    if (!COIN_API_KEY) throw new Error("COIN_API_KEY is not set.");
    
    // CoinAPI: Exchange Rate
    const url = `${API_BASE_URL_COIN}/exchangerate/${base}/${quote}`;
    
    const response = await fetch(url, { 
        headers: { 'X-CoinAPI-Key': COIN_API_KEY as string }, // ใช้ as string เพื่อให้ TypeScript ไม่กังวล
        next: { revalidate: REVALIDATE_TIME } 
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch CoinAPI data for ${symbol}: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.error) {
        console.error(`CoinAPI Error for ${symbol}:`, data);
        throw new Error(`CoinAPI Error: ${data.error}`);
    }

    // CoinAPI ให้แค่ 'rate' ไม่มี 'change' โดยตรง เราจะใช้ค่าคงที่จำลองไว้ก่อน
    const change = 0.0000;
    const isUp = true; 

    return {
        symbol: symbol,
        rate: data.rate,
        change: change,
        isUp: isUp,
    };
}

// 3. ดึงข้อมูล Sector Performance (ใช้ Alpha Vantage)
async function fetchSectorPerformance(): Promise<SectorPerformance[]> {
    if (!ALPHA_VANTAGE_KEY) return []; // คืนค่าว่างถ้าไม่มี Key

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
    
    // แปลง Object ให้เป็น Array ที่มี Sector Name และ Performance
    for (const sector in sectorData) {
        result.push({
            sector: sector.replace(/^\d+\. /, ''), // ลบตัวเลขลำดับที่นำหน้าชื่อ Sector
            performance: sectorData[sector],
        });
    }

    return result;
}


// ----------------------------------------------------------------------
// ฟังก์ชันรวมการดึงข้อมูลหลัก
// ----------------------------------------------------------------------

async function fetchFinancialData(): Promise<FinancialTrackerData> {
    let hasError = false;

    try {
        const [
            thbUsdResult, 
            usdUsdtResult, 
            bitcoinUsdResult, 
            sectorPerformanceResult
        ] = await Promise.allSettled([
            // 1. THB/USD (เรียก USD/THB)
            fetchAlphaVantageData('USD', 'THB', 'USD/THB'), 

            // 2. USD/USDT (เรียก USDT/USD)
            fetchCoinAPICrypto('USDT', 'USD', 'USDT/USD'), 

            // 3. Bitcoin/USD 
            fetchCoinAPICrypto('BTC', 'USD', 'BTC/USD'),
            
            // 4. Sector Performance
            fetchSectorPerformance(),
        ]);
        
        // ใช้ Fallback Data ในกรณีที่ Promise ล้มเหลว (Rejected)
        const thbUsd = thbUsdResult.status === 'fulfilled' ? thbUsdResult.value : DEFAULT_DATA_FALLBACK.thbUsd;
        const usdUsdt = usdUsdtResult.status === 'fulfilled' ? usdUsdtResult.value : DEFAULT_DATA_FALLBACK.usdUsdt;
        const bitcoinUsd = bitcoinUsdResult.status === 'fulfilled' ? bitcoinUsdResult.value : DEFAULT_DATA_FALLBACK.bitcoinUsd;
        const sectorPerformance = sectorPerformanceResult.status === 'fulfilled' ? sectorPerformanceResult.value : DEFAULT_DATA_FALLBACK.sectorPerformance;

        // NOTE: ทองคำไทย (THB) ใช้ข้อมูล Fallback เพราะต้องใช้ API เฉพาะหรือคำนวณจาก XAU/USD * THB/USD
        const goldThb = DEFAULT_DATA_FALLBACK.goldThb; 

        if (thbUsdResult.status === 'rejected' || usdUsdtResult.status === 'rejected' || bitcoinUsdResult.status === 'rejected') {
            hasError = true;
        }
        
        return {
            thbUsd,
            usdUsdt,
            goldThb,
            bitcoinUsd,
            sectorPerformance,
        };
    } catch (error) {
        console.error("Critical error during primary data fetch:", error);
        hasError = true;
        return DEFAULT_DATA_FALLBACK;
    } finally {
        // สามารถจัดการ state 'hasError' ได้ถ้าต้องการ
    }
}


// ----------------------------------------------------------------------
// Component Display Logic
// ----------------------------------------------------------------------

// Helper Component สำหรับแสดงอัตราแลกเปลี่ยน
const RateDisplay: React.FC<{ data: ExchangeRateData }> = ({ data }) => {
    const isPositive = data.isUp;
    const colorClass = isPositive ? 'text-green-400' : 'text-red-400';
    const arrow = isPositive ? '▲' : '▼';

    const formatNumber = (num: number | undefined | null, decimals: number = 2) => {
        // ตรวจสอบ undefined หรือ null (ตามคำแนะนำ)
        if (num === undefined || num === null || isNaN(num)) return '-';
        return num.toLocaleString('th-TH', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    };

    // กำหนดจำนวนทศนิยมตามประเภทสกุลเงิน
    const decimalCount = data.symbol.includes('USDT') || data.symbol.includes('BTC') ? 4 : 2;

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
    
    const data = await fetchFinancialData(); // ดึงข้อมูล API ใน Server Component
    // ตรวจสอบว่ามีการใช้ข้อมูล Fallback หรือไม่ (ถ้าอัตราแลกเปลี่ยนหลักเป็นค่าเริ่มต้น)
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
                            ⚠️ การดึงข้อมูล API ล้มเหลวหรือ API Key อาจไม่ถูกต้อง! กำลังแสดงข้อมูลจำลอง
                        </p>
                    )}
                </header>

                {/* ส่วนแสดงอัตราแลกเปลี่ยนหลัก */}
                <section>
                    <h3 className="text-3xl font-bold mb-6">อัตราแลกเปลี่ยนและสินทรัพย์หลัก</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <RateDisplay data={data.thbUsd} />
                        <RateDisplay data={data.usdUsdt} />
                        <RateDisplay data={data.goldThb} />
                        <RateDisplay data={data.bitcoinUsd} />
                    </div>
                </section>

                {/* ส่วนแสดง TradingView Widgets */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8">
                    {/* Widget ทองคำโลก: XAU/USD Chart */}
                    <div className="h-[400px]">
                        <TradingViewWidget
                            symbol="FX_IDC:XAUUSD" // Ticker สำหรับราคาทองคำโลก (USD)
                            widgetType="chart"
                            title="ราคาทองคำโลก (XAU/USD)"
                            description="การเคลื่อนไหวของราคาทองคำโลกเทียบกับดอลลาร์สหรัฐฯ"
                            height={400}
                        />
                    </div>

                    {/* Widget หุ้นราย Sector: Sector Performance Hotlists */}
                    <div className="h-[400px]">
                        <TradingViewWidget
                            symbol="NYSE:SPY" // Ticker ที่ใช้เพื่อแสดง Widget (ไม่เกี่ยวข้องกับข้อมูลภายใน Hotlist)
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
```
