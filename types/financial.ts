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