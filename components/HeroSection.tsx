// components/HeroSection.tsx
import React from 'react';
// นำเข้า GRADIENT_TEXT_CLASS จากไฟล์ Constants
import { GRADIENT_TEXT_CLASS } from '@/constants/data'; 
import Link from 'next/link';

/**
 * HeroSection Component: ส่วนหัวของหน้า Landing Page
 */
const HeroSection: React.FC = () => (
    <section className="text-center pt-8">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight max-w-4xl mx-auto">
            ยกระดับ <span className={GRADIENT_TEXT_CLASS}>Web Application</span> ของคุณด้วยเทคโนโลยีแห่งอนาคต
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mt-6 max-w-3xl mx-auto">
            Microtronic Dev. ผสาน <span className="text-cyan-400">Next.js</span> และ <span className="text-blue-400">TypeScript</span> เพื่อส่งมอบความเร็ว ความเสถียร และดีไซน์ระดับโลก
        </p>
        <Link 
            href="/contact"
            className="inline-block mt-10 px-10 py-4 text-xl font-extrabold rounded-full bg-pink-600 text-white hover:bg-pink-500 transition duration-300 transform hover:scale-105 shadow-2xl shadow-pink-600/50"
        >
            รับแผนกลยุทธ์ฟรี
        </Link>
    </section>
);

export default HeroSection;