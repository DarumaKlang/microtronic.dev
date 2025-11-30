// components/FeaturesSection.tsx
import React from 'react';
// นำเข้า FeatureItem ที่เราสร้างไว้แล้ว
import { FeatureItem } from '@/components/CardComponents'; 
// นำเข้า Icons ที่ใช้ใน Section นี้
import { Sparkles, Zap, Shield } from 'lucide-react'; 

/**
 * FeaturesSection Component: ส่วนที่แสดงคุณสมบัติหลักของบริการ
 */
const FeaturesSection: React.FC = () => (
    <section id="features">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-200">ทำไมต้อง Microtronic?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureItem 
                icon={Zap} 
                title="ประสิทธิภาพระดับจรวด" 
                description="สร้างด้วย Next.js และ Vercel เพื่อความเร็วในการโหลดที่เหนือกว่า, SEO ที่ยอดเยี่ยม และคะแนน Lighthouse 100/100"
                colorClass="text-pink-400"
                hoverBorder="border-pink-500/50"
            />
            <FeatureItem 
                icon={Shield} 
                title="ความเสถียรที่ไร้กังวล" 
                description="ใช้ TypeScript อย่างเคร่งครัด ลด Bug ใน Production ได้มากกว่า 38% ทำให้ระบบมีความน่าเชื่อถือและบำรุงรักษาง่ายในระยะยาว"
                colorClass="text-cyan-400"
                hoverBorder="border-cyan-500/50"
            />
            <FeatureItem 
                icon={Sparkles} 
                title="ดีไซน์ที่เปลี่ยนเป็นยอดขาย" 
                description="การออกแบบ UI/UX ระดับมืออาชีพที่ผ่านการวิเคราะห์ข้อมูล เน้นความสวยงาม ใช้งานง่าย และอัตราการแปลงที่สูง (Conversion Rate)"
                colorClass="text-purple-400"
                hoverBorder="border-purple-500/50"
            />
        </div>
    </section>
);

export default FeaturesSection;