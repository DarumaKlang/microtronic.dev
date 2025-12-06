// src/components/WorkData.ts

// 1. กำหนด Interface ใหม่เพื่อเพิ่ม Measurable Metrics
export interface WorkExample {
    id: number;
    title: string;
    description: string;
    tags: string[];
    imagePath: string;
    link: string;
    // เพิ่ม Metrics ที่เน้นประสิทธิภาพและ ROI (Goal 1.3)
    metrics: {
        lighthouseScore: number; // คะแนน Lighthouse Performance
        conversionRateIncrease: number; // การเพิ่มขึ้นของ Conversion Rate (%)
        serverSideDataFetchTime: string; // เวลาในการดึงข้อมูลฝั่งเซิร์ฟเวอร์ (RSC/Server Action)
    };
}

// 2. ข้อมูล Portfolio ที่ได้รับการปรับปรุง
export const workExamples: WorkExample[] = [
    {
        id: 1,
        title: 'แพลตฟอร์ม SaaS: ระบบจัดการการจอง A',
        description: 'พัฒนาและปรับโครงสร้างระบบจองด้วย Next.js RSC เพื่อรองรับผู้ใช้งานพร้อมกัน 10,000+ ราย พร้อมลด Load Time ลง 60%',
        tags: ['Next.js 14', 'RSC', 'Server Actions', 'PostgreSQL'],
        imagePath: '/images/work/project_a.jpg',
        link: 'https://example-a.com',
        metrics: {
            lighthouseScore: 98, // เน้น Performance
            conversionRateIncrease: 18, // เน้น ROI
            serverSideDataFetchTime: '55ms', // เน้น Speed (RSC)
        },
    },
    {
        id: 2,
        title: 'E-Commerce สำหรับ SME B',
        description: 'ย้ายจาก WordPress/WooCommerce มาเป็น Next.js Commerce เพื่อเพิ่มความเร็วในการโหลดสินค้าและปรับปรุง SEO',
        tags: ['E-Commerce', 'Next.js', 'SEO', 'Tailwind CSS'],
        imagePath: '/images/work/project_b.jpg',
        link: 'https://example-b.com',
        metrics: {
            lighthouseScore: 92,
            conversionRateIncrease: 11.5, // เน้น ROI
            serverSideDataFetchTime: '120ms', // เน้น Speed
        },
    },
    // ... เพิ่มตัวอย่างอื่นๆ ที่มี Metrics ครบถ้วน
];