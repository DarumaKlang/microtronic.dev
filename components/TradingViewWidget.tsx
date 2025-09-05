"use client";

import React, { useEffect, useRef, memo } from 'react';

/**
 * TradingViewWidget Component
 * A React component that embeds the TradingView Market Overview widget.
 * This widget displays real-time cryptocurrency and market data.
 * The script is dynamically created and appended to the container on component mount.
 */
const TradingViewWidget: React.FC = memo(() => {
    const container = useRef<HTMLDivElement | null>(null); // Use useRef to hold a reference to the container div

    useEffect(
        () => {
            // Create a script element to embed the TradingView widget
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
            script.type = "text/javascript";
            script.async = true;
            script.innerHTML = `
        {
          "colorTheme": "dark",
          "dateRange": "3M",
          "locale": "th_TH",
          "largeChartUrl": "",
          "isTransparent": true,
          "showFloatingTooltip": false,
          "plotLineColorGrowing": "rgba(41, 98, 255, 1)",
          "plotLineColorFalling": "rgba(41, 98, 255, 1)",
          "gridLineColor": "rgba(240, 243, 250, 0)",
          "scaleFontColor": "#DBDBDB",
          "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
          "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
          "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
          "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
          "symbolActiveColor": "rgba(41, 98, 255, 0.12)",
          "tabs": [
            {
              "title": "ASSETS",
              "symbols": [
                {
                  "s": "INDEX:BTCUSD",
                  "d": "Tradingview",
                  "base-currency-logoid": "crypto/XTVCBTC",
                  "currency-logoid": "country/US"
                },
                {
                  "s": "INDEX:ETHUSD",
                  "d": "Tradingview",
                  "base-currency-logoid": "crypto/XTVCETH",
                  "currency-logoid": "country/US"
                },
                {
                  "s": "CRYPTO:SOLUSD",
                  "d": "Tradingview",
                  "base-currency-logoid": "crypto/XTVCSOL",
                  "currency-logoid": "country/US"
                },
                {
                  "s": "BINANCE:BTCUSDT",
                  "d": "Binance Exchange",
                  "base-currency-logoid": "crypto/XTVCBTC",
                  "currency-logoid": "crypto/XTVCUSDT"
                },
                {
                  "s": "BINANCE:ETHUSDT",
                  "d": "Binance Exchange",
                  "base-currency-logoid": "crypto/XTVCETH",
                  "currency-logoid": "crypto/XTVCUSDT"
                },
                {
                  "s": "BINANCE:SOLUSDT",
                  "d": "Binance Exchange",
                  "base-currency-logoid": "crypto/XTVCSOL",
                  "currency-logoid": "crypto/XTVCUSDT"
                },
                {
                  "s": "OKX:BTCUSDT",
                  "d": "OKX Exchange",
                  "base-currency-logoid": "crypto/XTVCBTC",
                  "currency-logoid": "crypto/XTVCUSDT"
                },
                {
                  "s": "OKX:ETHUSDT",
                  "d": "OKX Exchange",
                  "base-currency-logoid": "crypto/XTVCETH",
                  "currency-logoid": "crypto/XTVCUSDT"
                },
                {
                  "s": "OKX:SOLUSDT",
                  "d": "OKX Exchange",
                  "base-currency-logoid": "crypto/XTVCSOL",
                  "currency-logoid": "crypto/XTVCUSDT"
                },
                {
                  "s": "BITKUB:BTCTHB",
                  "d": "Bitkub Exchange",
                  "base-currency-logoid": "crypto/XTVCBTC",
                  "currency-logoid": "country/TH"
                },
                {
                  "s": "BITKUB:ETHTHB",
                  "d": "Bitkub Exchange",
                  "base-currency-logoid": "crypto/XTVCETH",
                  "currency-logoid": "country/TH"
                },
                {
                  "s": "BITKUB:SOLTHB",
                  "d": "Bitkub Exchange",
                  "base-currency-logoid": "crypto/XTVCSOL",
                  "currency-logoid": "country/TH"
                }
              ]
            }
          ],
          "support_host": "https://www.tradingview.com",
          "backgroundColor": "#0f0f0f",
          "width": "400",
          "height": "550",
          "showSymbolLogo": true,
          "showChart": false
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
            <div className="tradingview-widget-copyright"><a href="https://th.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a></div>
        </div>
    );
});

export default TradingViewWidget;
