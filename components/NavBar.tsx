"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function NavBar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // isMainDropdownOpen ควบคุมเมนูหลัก "บริการ/เครื่องมือ"
    const [isMainDropdownOpen, setIsMainDropdownOpen] = useState(false);
    // State สำหรับเมนูย่อย "Wallet Tools" (ใช้สำหรับ Desktop/Mobile)
    const [isWalletToolsDropdownOpen, setIsWalletToolsDropdownOpen] = useState(false);

    // ฟังก์ชันปิดเมนูทั้งหมด
    const closeAllMenus = () => {
        setIsMobileMenuOpen(false);
        setIsMainDropdownOpen(false);
        setIsWalletToolsDropdownOpen(false);
    };

    // Class สำหรับเมนูย่อย (Glassmorphism Style)
    const dropdownClasses = "absolute top-full left-0 mt-2 w-52 bg-gray-900/70 backdrop-blur-md rounded-lg shadow-xl z-30 border border-gray-700/50";
    const linkClasses = "block px-4 py-2 hover:bg-fuchsia-600/50 transition duration-150";

    // ฟังก์ชันสำหรับเปิด/ปิด Dropdown บริการ/เครื่องมือ (Desktop)
    const toggleMainDropdown = () => {
        setIsMainDropdownOpen(prev => !prev);
        // ปิด Wallet Tools เมื่อเปิด/ปิดเมนูหลัก
        setIsWalletToolsDropdownOpen(false);
    };

    // ฟังก์ชันสำหรับเปิด/ปิด Dropdown Wallet Tools (Desktop)
    const toggleWalletToolsDropdown = () => {
        setIsWalletToolsDropdownOpen(prev => !prev);
        // ปิดเมนูหลักเมื่อเปิด/ปิด Wallet Tools
        setIsMainDropdownOpen(false);
    };

    return (
        // Navbar Theme: Glassmorphism (bg-gray-900/70 + backdrop-blur-lg)
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

                    {/* 2. เมนูดรอปดาวน์สำหรับ Wallet Tools (Desktop) */}
                    <div className="relative">
                        <button
                            // 🎯 แก้ไข: ใช้ toggleWalletToolsDropdown แทน
                            onClick={toggleWalletToolsDropdown}
                            className="hover:text-fuchsia-300 focus:outline-none flex items-center gap-1 transition duration-150"
                        >
                            Wallet Tools {isWalletToolsDropdownOpen ? '▲' : '▼'}
                        </button>

                        {/* Submenu Content */}
                        {isWalletToolsDropdownOpen && (
                            // 🎯 แก้ไข: ใช้ dropdownClasses เพื่อให้เป็น Glassmorphism Dropdown Card
                            <div className={dropdownClasses}> 
                                <Link href="/asset/sup-menu/wallet-tools/paper-wallet" className={`${linkClasses} rounded-t-lg`} onClick={closeAllMenus}>
                                    Paper Wallet
                                </Link>
                                <Link href="/asset/sup-menu/wallet-tools/bulk-wallet" className={linkClasses} onClick={closeAllMenus}>
                                    Bulk Wallet
                                </Link>
                                <Link href="/asset/sup-menu/wallet-tools/brain-wallet" className={linkClasses} onClick={closeAllMenus}>
                                    Brain Wallet
                                </Link>
                                <Link href="/asset/sup-menu/wallet-tools/vanity-wallet" className={linkClasses} onClick={closeAllMenus}>
                                    Vanity Wallet
                                </Link>
                                <Link href="/asset/sup-menu/wallet-tools/split-wallet" className={linkClasses} onClick={closeAllMenus}>
                                    Split Wallet (Multisig)
                                </Link>
                                <Link href="/asset/sup-menu/wallet-tools/wallet-details" className={`${linkClasses} rounded-b-lg`} onClick={closeAllMenus}>
                                    Wallet Details Checker
                                </Link>
                            </div>
                        )}
                    </div>

                    <Link href="/contact" className="hover:text-fuchsia-300 transition duration-150">ติดต่อ</Link>
                </div>

                {/* ปุ่ม Hamburger สำหรับ Mobile */}
                <div className="md:hidden z-20">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white focus:outline-none text-2xl">
                        {/* 🛑 FIX: เมื่อเมนูเปิด ให้ซ่อน '✕' ตัวนี้ไว้ เพื่อใช้ '✕' ที่อยู่ใน Overlay เท่านั้น */}
                        {isMobileMenuOpen ? <span className="text-xl h-6 w-6 inline-block opacity-0">...</span> : '☰'}
                    </button>
                </div>
            </div>

            {/* เมนู Mobile แบบ Full-screen */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-gray-900/90 backdrop-blur-md text-white z-10 overflow-y-auto pt-4">
                    {/* 🛑 ปุ่มปิด (X) ที่อยู่ใน Overlay (เป็นตัวหลักในการปิดเมนู) */}
                    <div className="container mx-auto p-4 flex justify-end">
                        <button onClick={() => setIsMobileMenuOpen(false)} className="text-white focus:outline-none text-3xl">
                            ✕
                        </button>
                    </div>

                    {/* ส่วนรายการเมนู Mobile (Accordion Style) */}
                    <div className="flex flex-col items-start px-8 py-4 space-y-4 text-m">
                        <Link href="/" className="hover:text-fuchsia-300" onClick={closeAllMenus}>หน้าหลัก</Link>
                        <Link href="/about" className="hover:text-fuchsia-300" onClick={closeAllMenus}>เกี่ยวกับเรา</Link>
                        <Link href="/buddha" className="hover:text-fuchsia-300" onClick={closeAllMenus}>พุทธศาสนา</Link>
                        <Link href="/astrology" className="hover:text-fuchsia-300" onClick={closeAllMenus}>โหราศาสตร์</Link>

                        {/* เมนูดรอปดาวน์สำหรับ บริการ/เครื่องมือ (Mobile - Accordion) */}
                        <div className="w-full">
                            <button
                                onClick={() => setIsMainDropdownOpen(!isMainDropdownOpen)}
                                className="w-full text-left hover:text-fuchsia-300 focus:outline-none text-lg"
                            >
                                บริการ/เครื่องมือ {isMainDropdownOpen ? '▲' : '▼'}
                            </button>
                            {isMainDropdownOpen && (
                                <div className="ml-4 py-2 space-y-2">
                                    <Link href="/asset" className="block hover:text-fuchsia-300" onClick={closeAllMenus}>การลงทุน</Link>
                                    <Link href="/asset/sup-menu/strategies" className="block hover:text-fuchsia-300" onClick={closeAllMenus}>กลยุทธ์การลงทุน</Link>
                                    <Link href="/asset/sup-menu/financial-tracker" className="block hover:text-fuchsia-300" onClick={closeAllMenus}>Financial Tracker</Link>
                                    <Link href="/asset/sup-menu" className="block hover:text-fuchsia-300" onClick={closeAllMenus}>เครื่องมือช่วยเหลือทั้งหมด</Link>

                                    {/* Submenu Wallet Tools (Mobile) */}
                                    <div className="w-full mt-2">
                                        <button
                                            // 🎯 แก้ไข: ปรับการควบคุม State ใน Mobile Menu ให้ถูกต้อง
                                            onClick={() => setIsWalletToolsDropdownOpen(!isWalletToolsDropdownOpen)}
                                            className="w-full text-left hover:text-fuchsia-300 focus:outline-none text-base font-semibold"
                                        >
                                            Wallet Tools {isWalletToolsDropdownOpen ? '▲' : '▼'}
                                        </button>
                                        {isWalletToolsDropdownOpen && (
                                            <div className="ml-4 py-2 space-y-2 text-sm">
                                                <Link href="/asset/sup-menu/wallet-tools/paper-wallet" className="block hover:text-fuchsia-300" onClick={closeAllMenus}>Paper Wallet</Link>
                                                <Link href="/asset/sup-menu/wallet-tools/bulk-wallet" className="block hover:text-fuchsia-300" onClick={closeAllMenus}>Bulk Wallet</Link>
                                                <Link href="/asset/sup-menu/wallet-tools/brain-wallet" className="block hover:text-fuchsia-300" onClick={closeAllMenus}>Brain Wallet</Link>
                                                <Link href="/asset/sup-menu/wallet-tools/vanity-wallet" className="block hover:text-fuchsia-300" onClick={closeAllMenus}>Vanity Wallet</Link>
                                                <Link href="/asset/sup-menu/wallet-tools/split-wallet" className="block hover:text-fuchsia-300" onClick={closeAllMenus}>Split Wallet (Multisig)</Link>
                                                <Link href="/asset/sup-menu/wallet-tools/wallet-details" className="block hover:text-fuchsia-300" onClick={closeAllMenus}>Wallet Details Checker</Link>
                                            </div>
                                        )}
                                    </div>
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