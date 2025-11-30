// components/TestimonialsSection.tsx
import React from 'react';
// นำเข้า TestimonialCard ที่เราสร้างไว้แล้วใน CardComponents
import { TestimonialCard } from '@/components/CardComponents'; 

/**
 * TestimonialsSection Component: ส่วนแสดงคำรับรองจากลูกค้า
 */
const TestimonialsSection: React.FC = () => (
    <section id="testimonials">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-200">พวกเขาพูดถึงเรา</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
                quote="เว็บไซต์ที่สร้างโดย Microtronic มีประสิทธิภาพสูงและส่งผลต่อยอดขายอย่างชัดเจน การร่วมงานราบรื่นและมืออาชีพมาก"
                name="อัญชลี จ."
                title="ผู้ก่อตั้ง E-commerce Platform"
            />
            <TestimonialCard
                quote="การทำงานด้าน UX นั้นยอดเยี่ยม เว็บไซต์ที่ได้มาเหนือความคาดหวังและใช้งานได้จริง"
                name="ดารารัตน์ ช."
                title="เจ้าของธุรกิจ E-learning"
            />
            <TestimonialCard
                quote="การย้ายระบบมาใช้ Next.js/Vercel โดย Microtronic ทำให้ต้นทุนลดลงและประสิทธิภาพเพิ่มขึ้นอย่างมาก"
                name="พงศกร ส."
                title="ผู้บริหารด้าน IT"
            />
        </div>
    </section>
);

export default TestimonialsSection;