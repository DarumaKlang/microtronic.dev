// components/NavBar.tsx (เวอร์ชันล่าสุด)
"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function NavBar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const closeMenus = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 p-4 text-white shadow-lg border-b border-fuchsia-800/50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo/ชื่อเว็บไซต์ */}
                <Link href="/" className="text-xl font-extrabold z-20 text-fuchsia-400 hover:text-fuchsia-300 transition-colors">
                    Microtronic
                </Link>

                {/* เมนูสำหรับ Desktop */}
                <div className="hidden md:flex space-x-6 items-center">
                    
                    <Link href="/" className="hover:text-fuchsia-400 transition-colors">
                        หน้าหลัก
                    </Link>

                    {/* ลิงก์ Marketing Page ที่เน้น Solutions */}
                    <Link href="/marketing" className="hover:text-fuchsia-400 transition-colors">
                        บริการ/Solutions
                    </Link>

                    <Link href="/about" className="hover:text-fuchsia-400 transition-colors">
                        เกี่ยวกับเรา
                    </Link>
                    
                    {/* ปุ่ม CTA ติดต่อ (Desktop) - ให้เด่นที่สุด */}
                    <Link 
                        href="/contact" 
                        className="px-4 py-2 font-bold rounded-full bg-cyan-500 text-gray-900 hover:bg-cyan-400 transition-colors duration-300 transform hover:scale-105 shadow-xl"
                    >
                        นัดปรึกษาฟรี!
                    </Link>
                </div>

                {/* ปุ่ม Hamburger สำหรับ Mobile */}
                <div className="md:hidden z-20">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white focus:outline-none text-2xl">
                        {isMobileMenuOpen ? '✕' : '☰'}
                    </button>
                </div>
            </div>

            {/* เมนู Mobile แบบ Full-screen */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-gray-900 text-white z-10 overflow-y-auto pt-[60px]"> 
                    <div className="flex flex-col items-start px-8 py-8 space-y-4 text-xl"> 
                        <Link href="/" className="hover:text-fuchsia-400" onClick={closeMenus}>
                            หน้าหลัก
                        </Link>
                        
                        <Link href="/marketing" className="hover:text-fuchsia-400" onClick={closeMenus}>
                            บริการ/Solutions
                        </Link>

                        <Link href="/about" className="hover:text-fuchsia-400" onClick={closeMenus}>
                            เกี่ยวกับเรา
                        </Link>

                        {/* ปุ่ม CTA ติดต่อ (Mobile) */}
                        <Link 
                            href="/contact" 
                            className="mt-6 px-4 py-2 w-full text-center font-bold rounded-full bg-cyan-500 text-gray-900 hover:bg-cyan-400 transition-colors duration-300"
                            onClick={closeMenus}
                        >
                            นัดปรึกษาฟรี!
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
