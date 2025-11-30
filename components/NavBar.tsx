// components/NavBar.tsx
'use client'; // เนื่องจากมีการใช้ Link และ interactive elements

import React from 'react';
import Link from 'next/link';
// นำเข้า Constants สำหรับ Navigation Items และ Gradient Text Class
import { NAV_ITEMS, GRADIENT_TEXT_CLASS } from '@/constants/data'; 

/**
 * Navbar Component เวอร์ชันใหม่สำหรับ Landing Page
 */
const NavBar: React.FC = () => (
    <header className="fixed top-0 w-full z-50 bg-slate-900/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            {/* Logo/Brand */}
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-linear-to-br from-pink-500 to-cyan-500 rounded flex items-center justify-center font-bold text-lg">M</div>
                <Link href="/" className="font-extrabold text-2xl tracking-tight hover:text-white transition duration-300">
                    Microtronic <span className={GRADIENT_TEXT_CLASS}>Dev</span>
                </Link>
            </div>
            
            {/* Navigation Menu (Desktop) */}
            <nav className="hidden md:flex items-center space-x-6">
                {NAV_ITEMS.map((item) => (
                    <a 
                        key={item.href}
                        // ใช้ <a> สำหรับ Anchor Links (#) บนหน้าเดียวกัน
                        href={item.href}
                        className="text-gray-300 hover:text-white font-medium transition duration-300 hover:underline hover:underline-offset-4"
                    >
                        {item.label}
                    </a>
                ))}
            </nav>
            
            {/* Call to Action Button */}
            <a 
                href="#contact"
                className="px-6 py-3 text-lg font-bold rounded-full bg-pink-600 text-white hover:bg-pink-500 transition duration-300 transform active:scale-95 shadow-lg"
            >
                Start Project
            </a>
        </div>
    </header>
);

export default NavBar;