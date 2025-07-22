"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLnbitsDropdownOpen, setIsLnbitsDropdownOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/ชื่อเว็บไซต์ */}
        <Link href="/" className="text-xl font-bold z-20">
          Microtronic
        </Link>

        {/* เมนูสำหรับ Desktop */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link href="/" className="hover:text-gray-300">
            หน้าหลัก
          </Link>
          <Link href="/about" className="hover:text-gray-300">
            เกี่ยวกับเรา
          </Link>

          {/* เมนูดรอปดาวน์สำหรับบริการ LNbits (Desktop) */}
          <div className="relative">
            <button
              onClick={() => setIsLnbitsDropdownOpen(!isLnbitsDropdownOpen)}
              className="hover:text-gray-300 focus:outline-none"
            >
              บริการ LNbits ▼
            </button>
            {isLnbitsDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-10">
                <Link
                  href="https://your-lnbits-url-1.com" // URL บริการ LNbits ตัวแรก
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 hover:bg-gray-600 rounded-t-md"
                  onClick={() => setIsLnbitsDropdownOpen(false)}
                >
                  LNbits Service A
                </Link>
                <Link
                  href="https://your-lnbits-url-2.com" // URL บริการ LNbits ตัวที่สอง
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 hover:bg-gray-600"
                  onClick={() => setIsLnbitsDropdownOpen(false)}
                >
                  LNbits Service B
                </Link>
                <Link
                  href="https://your-lnbits-url-3.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 hover:bg-gray-600 rounded-b-md"
                  onClick={() => setIsLnbitsDropdownOpen(false)}
                >
                  LNbits Service C
                </Link>
              </div>
            )}
          </div>

          <Link href="/contact" className="hover:text-gray-300">
            ติดต่อ
          </Link>
        </div>

        {/* ปุ่ม Hamburger สำหรับ Mobile (แสดงเฉพาะบนมือถือ) */}
        <div className="md:hidden z-20">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white focus:outline-none text-2xl">
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* เมนู Mobile แบบ Full-screen (เปิดเมื่อ isMobileMenuOpen เป็นจริง) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-gray-800 text-white z-10 overflow-y-auto">
          {/* ส่วนสำหรับปุ่มปิด (X) - อยู่ด้านขวาบนเหมือนเดิม */}
          <div className="container mx-auto p-4 flex justify-end">
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-white focus:outline-none text-3xl">
              
            </button>
          </div>
          {/* ส่วนรายการเมนู - จัดให้อยู่ซ้ายบนและลดขนาดตัวอักษร */}
          <div className="flex flex-col items-start px-8 py-8 space-y-4 text-m"> {/* เปลี่ยน items-center เป็น items-start, px-8 เพื่อ padding ซ้ายขวา, py-4 เพื่อ padding บนล่าง, space-y-4 เพื่อระยะห่างระหว่างลิงก์, text-m เพื่อลดขนาดตัวอักษร */}
            <Link href="/" className="hover:text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>
              หน้าหลัก
            </Link>
            <Link href="/about" className="hover:text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>
              เกี่ยวกับเรา
            </Link>

            {/* เมนูดรอปดาวน์สำหรับบริการ LNbits (Mobile) - ทำเป็น Accordion */}
            <div className="w-full"> {/* w-full เพื่อให้ปุ่มเต็มความกว้าง */}
              <button
                onClick={() => setIsLnbitsDropdownOpen(!isLnbitsDropdownOpen)}
                className="w-full text-left py-2 hover:text-gray-300 focus:outline-none text-m" // ลดขนาดตัวอักษรปุ่ม
              >
                บริการ LNbits {isLnbitsDropdownOpen ? '▲' : '▼'}
              </button>
              {isLnbitsDropdownOpen && (
                <div className="ml-4 py-4 space-y-4"> {/* เยื้องเข้าไปด้านในเล็กน้อย */}
                  <Link
                    href="https://your-lnbits-url-1.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-gray-300"
                    onClick={() => { setIsMobileMenuOpen(false); setIsLnbitsDropdownOpen(false); }}
                  >
                    LNbits Service A
                  </Link>
                  <Link
                    href="https://your-lnbits-url-2.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-gray-300"
                    onClick={() => { setIsMobileMenuOpen(false); setIsLnbitsDropdownOpen(false); }}
                  >
                    LNbits Service B
                  </Link>
                  <Link
                    href="https://your-lnbits-url-3.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-gray-300"
                    onClick={() => { setIsMobileMenuOpen(false); setIsLnbitsDropdownOpen(false); }}
                  >
                    LNbits Service C
                  </Link>
                </div>
              )}
            </div>

            <Link href="/contact" className="hover:text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>
              ติดต่อ
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
