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