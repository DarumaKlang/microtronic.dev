// components/FooterSection.tsx
import React from 'react';
// นำเข้า Icons ทั้งหมดที่ใช้ใน Footer
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Code } from 'lucide-react';
import Link from 'next/link';
// นำเข้า NAV_ITEMS จาก Constants
import { NAV_ITEMS } from '@/constants/data';

/**
 * FooterSection Component: ส่วนท้ายของหน้า Landing Page
 */
const FooterSection: React.FC = () => (
    <footer className="mt-24 bg-slate-800/50 border-t border-white/10 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">

            {/* Column 1: Logo & Mission */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-linear-to-br from-pink-500 to-cyan-500 rounded flex items-center justify-center text-sm font-bold">M</div>
                    <span className="font-extrabold text-xl tracking-tight text-white">Microtronic Dev.</span>
                </div>
                <p className="text-sm text-gray-400">
                    เราสร้างสรรค์ Web Application ที่รวดเร็ว ปลอดภัย และนำมาซึ่งผลลัพธ์ทางธุรกิจที่ยั่งยืน
                </p>
                {/* Microtronic Special Line: The Ultimate Version */}
                <div className="mt-4 flex items-center gap-2">
                    {/* ใช้สีชมพู (pink) สำหรับ Icon เพื่อสร้าง Contrast กับข้อความหลัก */}
                    <Code className="w-4 h-4 text-pink-500 shrink-0" />

                    {/* ข้อความ: เน้นจุดขายหลักด้วยสไตล์โค้ด Monospace และสี Cyan ที่สว่าง */}
                    <span className="text-cyan-400 text-xs font-mono font-semibold transition duration-300 hover:text-pink-400 cursor-default">
                        {'// Type-Safe Speed: Stability is the Ultimate Feature.'}
                    </span>
                </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
                <h4 className="text-lg font-semibold mb-4 text-white">ลิงก์ด่วน</h4>
                <ul className="space-y-2">
                    {/* The original NAV_ITEMS.map is replaced by static Link components as per instruction */}
                    <li>
                        <Link href="/about" className="text-sm text-gray-400 hover:text-pink-400 transition duration-200">เกี่ยวกับเรา</Link>
                    </li>
                    <li>
                        <Link href="/services" className="text-sm text-gray-400 hover:text-pink-400 transition duration-200">บริการของเรา</Link>
                    </li>
                    <li>
                        <Link href="/portfolio" className="text-sm text-gray-400 hover:text-pink-400 transition duration-200">ผลงาน</Link>
                    </li>
                    <li>
                        <Link href="/contact" className="text-sm text-gray-400 hover:text-pink-400 transition duration-200">ติดต่อเรา</Link>
                    </li>
                    {/* New Standards & Tech link added */}
                    <li>
                        <Link href="/suppliers" className="text-sm text-gray-400 hover:text-pink-400 transition duration-200">มาตรฐานและเทคโนโลยี</Link>
                    </li>
                    <li>
                        <Link href="/terms" className="text-sm text-gray-400 hover:text-pink-400 transition duration-200">ข้อกำหนดและข้อตกลง</Link>
                    </li>
                </ul>
            </div>

            {/* Column 3: Contact Info */}
            <div>
                <h4 className="text-lg font-semibold mb-4 text-white">ติดต่อเรา</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-cyan-400" />
                        <span>กรุงเทพมหานคร, ประเทศไทย (สำนักงานใหญ่)</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-cyan-400" />
                        <span>+66 65-541-9166 (สำหรับธุรกิจ)</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-cyan-400" />
                        <a href="mailto:grids@microtronic.biz" className="hover:text-pink-400 transition duration-200">grids@microtronic.biz</a>
                    </li>
                </ul>
            </div>

            {/* Column 4: Social Media */}
            <div>
                <h4 className="text-lg font-semibold mb-4 text-white">ติดตามเรา</h4>
                <div className="flex space-x-4">
                    <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-blue-500 transition duration-200">
                        <Facebook className="w-6 h-6" />
                    </a>
                    <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-cyan-400 transition duration-200">
                        <Twitter className="w-6 h-6" />
                    </a>
                    <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-indigo-400 transition duration-200">
                        <Linkedin className="w-6 h-6" />
                    </a>
                </div>
            </div>
        </div>

        <div className="mt-12 text-center border-t border-white/5 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-sm text-gray-500">
                    © 2026 Microtronic Dev. สงวนลิขสิทธิ์ทั้งหมด | สร้างสรรค์ด้วย Next.js และ TypeScript
                </p>
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">
                    <span>CRAFTED WITH</span>
                    <span className="text-pink-500 animate-pulse text-sm">❤️</span>
                    <span>IN THAILAND</span>
                </div>
            </div>
        </div>
    </footer>
);

export default FooterSection;