// src/components/CoinGeckoTicker.tsx
"use client";

import React, { useEffect, useRef, useState } from 'react';
import GlassmorphismCard from '@/components/GlassmorphismCard';

interface CoinGeckoTickerProps {
    coinId: string; 
    currency: string; 
    title: string;
}

const CoinGeckoTicker: React.FC<CoinGeckoTickerProps> = ({ coinId, currency, title }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false); // ใช้เพื่อบังคับ Render
    const widgetId = `coingecko-widget-${coinId}-${currency}`;

    useEffect(() => {
        setIsMounted(true);
        if (!containerRef.current) {
            return;
        }

        // 1. ล้าง Container ก่อนโหลด Script ใหม่ (ช่วยแก้ปัญหาการซ้อนทับใน Strict Mode)
        containerRef.current.innerHTML = ''; 

        const script = document.createElement('script');
        script.src = 'https://widgets.coingecko.com/coingecko-coin-ticker-widget.js';
        script.type = 'text/javascript';
        script.async = true;
        script.id = widgetId;
        
        // กำหนด Attributes สำหรับ CoinGecko Widget
        script.setAttribute('coin-id', coinId);
        script.setAttribute('currency', currency);
        script.setAttribute('locale', 'th');
        script.setAttribute('font-color', '#FFFFFF'); 
        // ใช้สีเข้มเพื่อให้ Widget แสดงผลชัดเจนบนพื้นหลังโปร่งแสงของเรา
        script.setAttribute('background-color', '#1f2937'); 

        containerRef.current.appendChild(script);

        // 2. ฟังก์ชัน Cleanup: ใช้ innerHTML = '' ใน Cleanup
        // เพื่อให้แน่ใจว่า DOM ที่ Script ภายนอกสร้างขึ้นจะถูกลบออกทั้งหมดเมื่อ Component ถูก Unmount
        return () => {
             if (containerRef.current) {
                // *** การแก้ไข: ล้าง Container เพื่อป้องกัน NotFoundError ***
                containerRef.current.innerHTML = '';
             }
        };

    }, [coinId, currency, widgetId]);


    return (
        <GlassmorphismCard className="p-1 sm:p-2 flex flex-col items-start justify-center h-[120px] overflow-hidden">
            <h5 className="text-sm font-light opacity-75 mb-0 px-2 pt-1">{title}</h5>
            {/* กำหนดความสูงที่ชัดเจน 80px ให้กับพื้นที่ Widget */}
            <div 
                ref={containerRef} 
                className="coingecko-widget-container w-full h-[80px] pt-1" 
            >
                {/* Fallback/Loading indicator */}
                {!isMounted && (
                    <div className="flex items-center justify-center h-full text-sm opacity-50">
                        กำลังโหลด...
                    </div>
                )}
            </div>
        </GlassmorphismCard>
    );
};

export default CoinGeckoTicker;