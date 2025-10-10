// src/components/TradingViewSingleTicker.tsx
"use client";

import React, { useEffect, useRef, memo } from 'react';
import GlassmorphismCard from '@/components/GlassmorphismCard';

interface TradingViewSingleTickerProps {
    symbol: string; 
    title: string;
    width?: number; // กำหนดความกว้างเฉพาะ
}

const TradingViewSingleTicker: React.FC<TradingViewSingleTickerProps> = ({ symbol, title, width = 350 }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetId = `tradingview-single-ticker-${symbol.replace(/[:\/]/g, '-')}`; 

    useEffect(() => {
        if (!containerRef.current) {
            return;
        }

        // *** ขั้นตอนที่ 1: ล้าง Container ก่อนโหลด Script ใหม่เสมอ ***
        // นี่คือการป้องกัน DOM Conflict ใน Strict Mode
        containerRef.current.innerHTML = ''; 

        // *** ขั้นตอนที่ 2: สร้าง Script และกำหนด config ***
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
        script.type = "text/javascript";
        script.async = true;
        
        // กำหนด Configuration (อิงจากตัวอย่างของคุณ)
        script.innerHTML = JSON.stringify({
            "symbol": symbol,
            "colorTheme": "dark",
            "isTransparent": true,
            "locale": "th_TH",
            "width": width, 
            "height": "100%", 
        });

        // *** ขั้นตอนที่ 3: แทรก Script เข้าไปใน Container ***
        containerRef.current.appendChild(script);

        // *** ขั้นตอนที่ 4: Cleanup Function ที่ละเอียดกว่า ***
        return () => {
             if (containerRef.current) {
                // 1. ลบ Script tag ที่เราสร้างขึ้น
                const scriptElement = containerRef.current.querySelector('script');
                if (scriptElement) {
                    scriptElement.remove();
                }

                // 2. ล้างเนื้อหา Container ทั้งหมด เพื่อลบ DOM ที่ Widget สร้างขึ้น
                // การทำ innerHTML = '' เป็นวิธีที่เด็ดขาดในการลบโหนดลูกทั้งหมด 
                // ซึ่งช่วยแก้ปัญหา "not a child of this node" ที่ React พยายามลบโหนดที่มันไม่รู้จัก
                containerRef.current.innerHTML = ''; 
             }
        };

    }, [symbol, width]);


    return (
        <GlassmorphismCard className="p-1 sm:p-2 flex flex-col items-start justify-center overflow-hidden h-full">
            <h5 className="text-sm font-light opacity-75 mb-0 px-2 pt-1">{title}</h5>
            {/* กำหนดความสูงขั้นต่ำ/ความสูงตามที่ TradingView ต้องการ 
                และการจัดวางแบบยืดหยุ่น (flex-grow) 
            */}
            <div 
                ref={containerRef} 
                className="tradingview-widget-container w-full min-h-[70px] flex-grow" 
            >
                {/* เราไม่จำเป็นต้องสร้าง div ภายในเพื่อเป็น container__widget 
                    เพราะ TradingView Script จะสร้าง DOM ภายใน ref นี้เอง
                */}
            </div>
        </GlassmorphismCard>
    );
};

export default memo(TradingViewSingleTicker);