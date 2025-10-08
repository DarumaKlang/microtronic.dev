"use client";

import React, { useEffect } from 'react';

/**
 * Component สำหรับแสดงวิดเจ็ตราคาเหรียญแบบเลื่อน (Marquee) จาก CoinMarketCap
 */
interface CoinMarqueeProps {
    coins?: string;
    currency?: string;
    theme?: 'light' | 'dark';
    transparent?: boolean;
    showSymbolLogo?: boolean;
    customSpeedClass?: string;
    className?: string; // เพิ่ม className สำหรับปรับแต่งภายนอก
}

const CMC_MARQUEE_SCRIPT_URL = "https://files.coinmarketcap.com/static/widget/coinMarquee.js";
const MARQUEE_ID = "coinmarketcap-widget-marquee";

// ใช้ Default Parameters เพื่อแก้ไข Property 'defaultProps' does not exist error
export const CoinMarquee: React.FC<CoinMarqueeProps> = ({
    coins = "1,1027,825,5426",
    currency = "USD",
    theme = "light",
    transparent = false,
    showSymbolLogo = true,
    customSpeedClass = 'slow-marquee', // class สำหรับปรับความเร็ว
    className = "", // class ภายนอก
}) => {
    
    useEffect(() => {
        // ตรวจสอบว่าสคริปต์ยังไม่ถูกโหลด
        const scriptId = 'coinmarketcap-marquee-script';
        if (!document.getElementById(scriptId)) {
             const script = document.createElement('script');
             script.id = scriptId;
             script.type = 'text/javascript';
             script.src = CMC_MARQUEE_SCRIPT_URL;
             script.async = true;
             document.head.appendChild(script);
        }
    }, []);

    return (
        // ใช้ class ที่กำหนดใน globals.css เพื่อควบคุมความเร็ว และใช้ Tailwind class สำหรับ layout
        <div className={`w-full overflow-hidden ${customSpeedClass} ${className}`}>
            <div 
                id={MARQUEE_ID} 
                data-coins={coins}
                data-currency={currency}
                data-theme={theme}
                data-transparent={transparent ? 'true' : 'false'}
                data-show-symbol-logo={showSymbolLogo ? 'true' : 'false'}
                // Note: สคริปต์ของ CMC จะจัดการ style ของตัวมันเอง
            />
        </div>
    );
};