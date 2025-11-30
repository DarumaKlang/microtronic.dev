// app/page.tsx

// เนื่องจาก ServicesSection ใช้ useState เราจึงจำเป็นต้องคง 'use client' ไว้
'use client'; 

import React from 'react';
// Import Components ที่เราแยกออกมาใช้
import GooeyBackground from '@/components/GooeyBackground'; 
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import FooterSection from '@/components/FooterSection'; 

// เนื่องจาก Component ที่เรา Import มาแล้วจัดการ Data และ Style Classs ภายในตัวเอง
// เราจึงไม่จำเป็นต้อง Import constants ต่างๆ เช่น SERVICES_DATA, GRADIENT_TEXT_CLASS 
// หรือ Icons ต่างๆ ที่เคยมีอยู่ในไฟล์นี้อีกต่อไป

export default function Home() {
    return (
        // div หลักของหน้า: กำหนด Background Gradient (จาก tailwind.config.ts) และ Padding
        // Note: pt-[120px] ถูกกำหนดเพื่อให้มีช่องว่างสำหรับ Fixed Navbar
        <div className="min-h-screen bg-slate-900 text-white pt-24 pb-16 relative"> 
            
            {/* 1. Component พื้นหลังแบบ Gooey Effect (ต้องสร้างในขั้นตอนต่อไป) */}
            {/* Component นี้จะถูกวางไว้เป็น Absolute/Fixed position ให้อยู่ด้านหลังเนื้อหาหลัก (z-10) */}
            <GooeyBackground />
            
            {/* 2. เนื้อหาหลักของหน้า (Main Content) */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 mt-8 relative z-10">
                
                <HeroSection />
                
                <FeaturesSection />
                
                <ServicesSection />
                
                <TestimonialsSection />
                
                <CTASection />
                
            </main>
            
            {/* 3. ส่วนท้ายของหน้า (Footer) */}
            <FooterSection />
            
        </div>
    );
}