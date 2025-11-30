// components/CTASection.tsx
import React from 'react';
import Link from 'next/link';

/**
 * CTASection Component: ส่วน Call to Action ที่โดดเด่น
 */
const CTASection: React.FC = () => (
    <section id="contact" className="text-center bg-fuchsia-700 p-12 rounded-2xl shadow-2xl transform transition-all duration-500 hover:shadow-fuchsia-400/50">
        <h2 className="text-4xl font-bold mb-4">หยุดคาดเดา เริ่มสร้างผลลัพธ์</h2>
        <p className="text-xl mb-6 text-gray-200">ติดต่อเราวันนี้ เพื่อรับการวิเคราะห์เว็บไซต์และแผนกลยุทธ์การพัฒนาที่ออกแบบมาเพื่อคุณโดยเฉพาะ</p>
        <Link
            href="/contact" // <--- ยืนยันแล้ว: ชี้ไปที่ /contact (คุยกับผู้เชี่ยวชาญของเรา)
            className="px-10 py-4 text-xl font-extrabold rounded-full bg-white text-fuchsia-700 hover:bg-gray-100 transition duration-300 transform hover:scale-110 shadow-lg"
        >
            คุยกับผู้เชี่ยวชาญของเรา
        </Link>
    </section>
);

export default CTASection;