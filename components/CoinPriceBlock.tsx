"use client";

import React, { useEffect } from 'react';

/**
 * Component สำหรับแสดงวิดเจ็ตราคาเหรียญแบบ Block จาก CoinMarketCap
 */
interface CoinPriceBlockProps {
    coins?: string; // เปลี่ยนเป็น optional เพราะจะมีค่า default
    currency?: string; // เปลี่ยนเป็น optional
    theme?: 'light' | 'dark'; // เปลี่ยนเป็น optional
    transparent?: boolean; // เปลี่ยนเป็น optional
    showSymbolLogo?: boolean; // เปลี่ยนเป็น optional
    className?: string; // เพิ่ม className เพื่อให้สามารถปรับแต่งภายนอกได้ง่าย
}

// ใช้ Default Parameters เพื่อแก้ไข Property 'defaultProps' does not exist error
export const CoinPriceBlock: React.FC<CoinPriceBlockProps> = ({
    coins = "1,1027,825,5426", // ค่า Default
    currency = "USD", // ค่า Default
    theme = "dark", // ค่า Default
    transparent = true, // ค่า Default
    showSymbolLogo = true, // ค่า Default
    className = "", // ค่า Default
}) => {
    // ใช้ useEffect เพื่อโหลดสคริปต์ของ CoinMarketCap เมื่อ component ถูกโหลด
    useEffect(() => {
        // ตรวจสอบว่าสคริปต์ยังไม่ถูกโหลดเพื่อหลีกเลี่ยงการโหลดซ้ำ
        const scriptId = 'coinmarketcap-price-block-script';
        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.type = 'text/javascript';
            script.src = 'https://files.coinmarketcap.com/static/widget/coinPriceBlock.js';
            script.async = true;
            document.head.appendChild(script);
        }
    }, []);

    // attributes ต่างๆ จะถูกอ่านโดยสคริปต์ของ CoinMarketCap
    // ใช้ Tailwind classes แทน inline styles
    return (
        <div 
            id="coinmarketcap-widget-coin-price-block" 
            data-coins={coins} 
            data-currency={currency}
            data-theme={theme}
            data-transparent={transparent ? 'true' : 'false'}
            data-show-symbol-logo={showSymbolLogo ? 'true' : 'false'}
            // รวม Tailwind CSS classes และ className ที่รับเข้ามา
            className={`w-full max-w-lg mx-auto shadow-xl rounded-lg overflow-hidden h-[300px] ${className}`} 
            // หมายเหตุ: วิดเจ็ตนี้จะปรับความสูงเองส่วนใหญ่ แต่เราสามารถกำหนดความสูงขั้นต่ำได้ผ่าน Tailwind เช่น h-[300px]
        />
    );
};