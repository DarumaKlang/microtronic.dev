// components/CTASection.tsx
import React from 'react';
import Link from 'next/link';

/**
 * CTASection Component: ส่วน Call to Action ที่โดดเด่น
 */
const CTASection: React.FC = () => (
    <section id="contact" className="text-center bg-fuchsia-700 p-8 sm:p-12 rounded-2xl shadow-2xl transform transition-all duration-500 hover:shadow-fuchsia-400/50">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">หยุดคาดเดา เริ่มสร้างผลลัพธ์</h2>
        <p className="text-base sm:text-xl mb-6 text-gray-200 max-w-3xl mx-auto">
            ติดต่อเราวันนี้ เพื่อรับการวิเคราะห์เว็บไซต์และแผนกลยุทธ์การพัฒนาที่ออกแบบมาเพื่อคุณโดยเฉพาะ
        </p>
        <Link
            href="/contact"
            className="mx-auto block w-full max-w-[280px] whitespace-normal px-8 py-4 text-lg sm:text-xl font-extrabold rounded-full bg-white text-fuchsia-700 hover:bg-gray-100 transition duration-300 transform hover:scale-110 shadow-lg text-center"
        >
            คุยกับผู้เชี่ยวชาญ
        </Link>
    </section>
);

export default CTASection;