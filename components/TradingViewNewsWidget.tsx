"use client";

import React, { useEffect, useRef, memo } from 'react';

/**
 * TradingViewNewsWidget Component
 * This React component embeds the TradingView timeline news widget.
 * It dynamically loads the script to display real-time cryptocurrency news.
 */
const TradingViewNewsWidget: React.FC = memo(() => {
    const container = useRef<HTMLDivElement | null>(null);

    useEffect(
        () => {
            // Create a script element to embed the TradingView widget
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
            script.type = "text/javascript";
            script.async = true;
            script.innerHTML = `
        {
          "displayMode": "regular",
          "feedMode": "market",
          "colorTheme": "dark",
          "isTransparent": true,
          "locale": "th_TH",
          "market": "crypto",
          "width": "400",
          "height": "550"
        }`;

            // Append the script to the container div
            if (container.current) {
                container.current.appendChild(script);
            }
        },
        [] // Empty dependency array ensures this effect runs only once on mount
    );

    return (
        <div className="tradingview-widget-container" ref={container}>
            <div className="tradingview-widget-container__widget"></div>
            <div className="tradingview-widget-copyright">
                <a
                    href="https://th.tradingview.com/news-flow/?priority=top_stories"
                    rel="noopener nofollow"
                    target="_blank"
                >
                    <span className="blue-text">Track all markets on TradingView</span>
                </a>
            </div>
        </div>
    );
});

export default TradingViewNewsWidget;
