// src/components/NavBar.tsx
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function NavBar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMainDropdownOpen, setIsMainDropdownOpen] = useState(false);
    const [isWalletToolsDropdownOpen, setIsWalletToolsDropdownOpen] = useState(false);

    // ************************************************
    // จัดการ overflow ของ Body เพื่อซ่อนแถบเลื่อนหลัก
    // ************************************************
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    // ฟังก์ชันปิดเมนูทั้งหมด
    const closeAllMenus = () => {
        setIsMobileMenuOpen(false);
        setIsMainDropdownOpen(false);
        setIsWalletToolsDropdownOpen(false);
    };

    // Class สำหรับเมนูย่อย (Desktop)
    const dropdownClasses = "absolute top-full left-0 mt-2 w-52 bg-gray-900/70 backdrop-blur-md rounded-lg shadow-xl z-30 border border-gray-700/50";
    const linkClasses = "block px-4 py-2 hover:bg-fuchsia-600/50 transition duration-150";

    const toggleMainDropdown = () => {
        setIsMainDropdownOpen(prev => !prev);
        setIsWalletToolsDropdownOpen(false);
    };

    const toggleWalletToolsDropdown = () => {
        setIsWalletToolsDropdownOpen(prev => !prev);
        setIsMainDropdownOpen(false);
    };

    return (
        // Navbar Theme: Glassmorphism (z-50)
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/70 backdrop-blur-lg p-4 text-white shadow-lg border-b border-gray-700/50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo/ชื่อเว็บไซต์ */}
                <Link href="/" className="text-xl font-bold z-20 text-fuchsia-400">
                    Microtronic
                </Link>

                {/* เมนูสำหรับ Desktop */}
                <div className="hidden md:flex space-x-4 items-center">
                    <Link href="/" className="hover:text-fuchsia-300 transition duration-150">หน้าหลัก</Link>
                    <Link href="/about" className="hover:text-fuchsia-300 transition duration-150">เกี่ยวกับเรา</Link>

                    {/* 1. เมนูดรอปดาวน์สำหรับ บริการ/เครื่องมือ (Desktop) */}
                    <div className="relative">
                        <button
                            onClick={toggleMainDropdown}
                            className="hover:text-fuchsia-300 focus:outline-none flex items-center gap-1 transition duration-150"
                        >
                            บริการ/เครื่องมือ {isMainDropdownOpen ? '▲' : '▼'}
                        </button>

                        {isMainDropdownOpen && (
                            <div className={dropdownClasses}>
                                <Link
                                    href="/asset" className={`${linkClasses} rounded-t-lg`} onClick={closeAllMenus}>การลงทุน</Link>
                                <Link
                                    href="/asset/sup-menu/strategies" className={linkClasses} onClick={closeAllMenus}>กลยุทธ์การลงทุน</Link>
                                <Link
                                    href="/asset/sup-menu/financial-tracker" className={linkClasses} onClick={closeAllMenus}>Financial Tracker</Link>
                                <Link
                                    href="/asset/sup-menu" className={`${linkClasses} rounded-b-lg`} onClick={closeAllMenus}>เครื่องมือทั้งหมด</Link>
                            </div>
                        )}
                    </div>

                    <Link href="/contact" className="hover:text-fuchsia-300 transition duration-150">ติดต่อ</Link>
                </div>

                {/* ปุ่ม Hamburger/Close สำหรับ Mobile (ควบคุมการเปิด-ปิด) */}
                <div className="md:hidden z-20">
                    <button
                        onClick={() => {
                            // การคลิกปุ่มนี้จะสลับค่า isMobileMenuOpen
                            // เมื่อ isMobileMenuOpen เป็น true (เมนูเปิด) การคลิกครั้งต่อไปจะปิดเมนู
                            setIsMobileMenuOpen(!isMobileMenuOpen);
                            // ตรวจสอบให้แน่ใจว่าปิด Dropdown ย่อยเสมอเมื่อปิดเมนูหลัก
                            if (isMobileMenuOpen) {
                                setIsMainDropdownOpen(false);
                            }
                        }}
                        className="text-white focus:outline-none text-2xl p-1"
                    >
                        {/* แสดง '✕' เมื่อเมนูเปิด, แสดง '☰' เมื่อเมนูปิด */}
                        {isMobileMenuOpen ? '✕' : '☰'}
                    </button>
                </div>
            </div>

            {/* เมนู Mobile แบบ Full-screen Overlay (แก้ไข: ปรับ Glassmorphism) */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-md text-white pt-[72px] w-full z-10">

                    {/* ส่วนรายการเมนู Mobile (Accordion Style) */}
                    <div className="flex flex-col items-start px-8 py-4 space-y-4 text-m bg-gray-900/70 backdrop-blur-md rounded-lg shadow-xl z-30 border border-gray-700/50">
                        <Link href="/" className="hover:text-fuchsia-300" onClick={closeAllMenus}>หน้าหลัก</Link>
                        <Link href="/about" className="hover:text-fuchsia-300" onClick={closeAllMenus}>เกี่ยวกับเรา</Link>
                        <Link href="/buddha" className="hover:text-fuchsia-300" onClick={closeAllMenus}>พุทธศาสนา</Link>
                        <Link href="/astrology" className="hover:text-fuchsia-300" onClick={closeAllMenus}>โหราศาสตร์</Link>

                        {/* เมนูดรอปดาวน์สำหรับ บริการ/เครื่องมือ (Mobile - Accordion) */}
                        <div className="w-full">
                            <button
                                onClick={() => setIsMainDropdownOpen(!isMainDropdownOpen)}
                                className="w-full text-left hover:text-fuchsia-300 focus:outline-none text-lg py-1"
                            >
                                บริการ/เครื่องมือ {isMainDropdownOpen ? '▲' : '▼'}
                            </button>
                            {isMainDropdownOpen && (
                                <div className="ml-4 p-4 space-y-4 absolute left-4 mt-2 w-60 bg-gray-900/70 backdrop-blur-md rounded-lg shadow-xl z-30 border border-gray-700/50">
                                    {/* ลิงก์ย่อยเหล่านี้ใช้ onClick={closeAllMenus} ซึ่งจะปิดเมนูทั้งหมดเมื่อคลิก */}
                                    <Link href="/asset" className="block hover:text-fuchsia-300" onClick={closeAllMenus}>การลงทุน</Link>
                                    <Link href="/asset/sup-menu/strategies" className="block hover:text-fuchsia-300" onClick={closeAllMenus}>กลยุทธ์การลงทุน</Link>
                                    <Link href="/asset/sup-menu/financial-tracker" className="block hover:text-fuchsia-300" onClick={closeAllMenus}>Financial Tracker</Link>
                                    <Link href="/asset/sup-menu" className="block hover:text-fuchsia-300" onClick={closeAllMenus}>เครื่องมือช่วยเหลือทั้งหมด</Link>
                                </div>
                            )}
                        </div>

                        <Link href="/contact" className="hover:text-fuchsia-300" onClick={closeAllMenus}>ติดต่อ</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}