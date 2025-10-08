// components/TradingViewAdvancedChart.tsx
"use client";

import React, { useEffect, useRef, memo } from 'react';

/**
 * TradingViewAdvancedChart Component
 * This React component embeds the TradingView advanced chart widget.
 * It dynamically loads the script to display real-time stock and market data with technical analysis tools.
 */
const TradingViewAdvancedChart: React.FC = memo(() => {
    const container = useRef<HTMLDivElement | null>(null);

    useEffect(
        () => {
            // Create a script element to embed the TradingView widget
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
            script.type = "text/javascript";
            script.async = true;
            script.innerHTML = `
        {
          "autosize": true,
          "symbol": "BINANCE:BTCUSDT",
          "interval": "D",
          "support_host": "https://www.tradingview.com",
          "timezone": "exchange",
          "theme": "dark",
          "style": "1",
          "withdateranges": true,
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "save_image": false,
          "studies": [
            "ROC@tv-basicstudies",
            "StochasticRSI@tv-basicstudies",
            "MASimple@tv-basicstudies"
          ],\
          "show_popup_button": true,
          "popup_width": "1000",
          "popup_height": "650"
        }`;

            // Append the script to the container div
            if (container.current) {
                container.current.appendChild(script);
            }
        },
        [] // Empty dependency array ensures this effect runs only once on mount
    );

    return (
        // แก้ไข: เปลี่ยน inline style เป็น Tailwind classes
        <div className="tradingview-widget-container h-[93%] w-full" ref={container}>
            {/* แก้ไข: เปลี่ยน inline style เป็น Tailwind classes (ใช้ arbitrary value สำหรับ calc) */}
            <div className="tradingview-widget-container__widget h-[calc(100%-32px)] w-full"></div>
            <div className="tradingview-widget-copyright">
                <a
                    href="https://www.tradingview.com/"
                    rel="noopener nofollow"
                    target="_blank"
                >
                    <span className="blue-text">Track all markets on TradingView</span>
                </a>
            </div>
        </div>
    );
});

export default TradingViewAdvancedChart;
