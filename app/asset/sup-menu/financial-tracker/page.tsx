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