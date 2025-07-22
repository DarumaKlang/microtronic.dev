"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLnbitsDropdownOpen, setIsLnbitsDropdownOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4 text-white"> {/* สีพื้นหลัง NavBar */}
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/ชื่อเว็บไซต์ */}
        <Link href="/" className="text-xl font-bold z-20"> {/* เพิ่ม z-index ให้ Logo อยู่ด้านบนสุดเสมอ */}
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
              <div className="absolute top-full left-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-10"> {/* ใช้สีเดียวกับ Mobile Menu Background */}
                <Link
                  href="https://your-lnbits-url-1.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 hover:bg-gray-600 rounded-t-md"
                  onClick={() => setIsLnbitsDropdownOpen(false)}
                >
                  LNbits Service A
                </Link>
                <Link
                  href="https://your-lnbits-url-2.com"
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
        <div className="md:hidden z-20"> {/* เพิ่ม z-index ให้ปุ่ม Hamburger อยู่ด้านบนเมนูที่เปิด */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white focus:outline-none text-2xl">
            {isMobileMenuOpen ? '✕' : '☰'} {/* เปลี่ยนไอคอนเป็น X เมื่อเปิดเมนู */}
          </button>
        </div>
      </div>

      {/* เมนู Mobile แบบ Full-screen (เปิดเมื่อ isMobileMenuOpen เป็นจริง) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-gray-800 text-white z-10 overflow-y-auto"> {/* fixed, inset-0 เพื่อให้คลุมทั้งหน้าจอ */}
          <div className="container mx-auto p-4 flex justify-end"> {/* สำหรับปุ่มปิด (X) */}
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-white focus:outline-none text-3xl">
              ✕
            </button>
          </div>
          <div className="flex flex-col items-center justify-center h-full space-y-8 text-2xl pt-16 pb-8"> {/* ปรับ pt-16 และ pb-8 เพื่อให้มีระยะห่างด้านบนและล่าง */}
            <Link href="/" className="hover:text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>
              หน้าหลัก
            </Link>
            <Link href="/about" className="hover:text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>
              เกี่ยวกับเรา
            </Link>

            {/* เมนูดรอปดาวน์สำหรับบริการ LNbits (Mobile) - ทำเป็น Accordion แทน Dropdown เพื่อให้เหมาะกับ Mobile */}
            <div className="w-full text-center">
              <button
                onClick={() => setIsLnbitsDropdownOpen(!isLnbitsDropdownOpen)}
                className="w-full py-2 hover:text-gray-300 focus:outline-none text-2xl"
              >
                บริการ LNbits {isLnbitsDropdownOpen ? '▲' : '▼'}
              </button>
              {isLnbitsDropdownOpen && (
                <div className="mt-2 space-y-4"> {/* ปรับ space-y สำหรับระยะห่างลิงก์ย่อย */}
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
