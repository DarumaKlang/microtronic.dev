"use client"; // แจ้งให้ Next.js ทราบว่านี่คือ Client Component

import Link from 'next/link';
import { useState } from 'react';

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // สำหรับเมนู Hamburger
  const [isLnbitsDropdownOpen, setIsLnbitsDropdownOpen] = useState(false); // สำหรับ Dropdown ของ LNbits

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/ชื่อเว็บไซต์ */}
        <Link href="/" className="text-xl font-bold">
          Microtronic
        </Link>

        {/* เมนูสำหรับ Desktop */}
        <div className="hidden md:flex space-x-4 items-center"> {/* เพิ่ม items-center เพื่อจัดตำแหน่งแนวตั้ง */}
          <Link href="/" className="hover:text-gray-300">
            หน้าหลัก
          </Link>
          <Link href="/about" className="hover:text-gray-300">
            เกี่ยวกับเรา
          </Link>

          {/* เมนูดรอปดาวน์สำหรับบริการ LNbits */}
          <div className="relative">
            <button
              onClick={() => setIsLnbitsDropdownOpen(!isLnbitsDropdownOpen)}
              className="hover:text-gray-300 focus:outline-none"
            >
              บริการ LNbits ▼ {/* เพิ่มสามเหลี่ยมชี้ลงเพื่อแสดงว่าเป็น Dropdown */}
            </button>
            {isLnbitsDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-10">
                <Link
                  href="https://your-lnbits-url-1.com" // URL บริการ LNbits ตัวแรก
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 hover:bg-gray-600 rounded-t-md"
                  onClick={() => setIsLnbitsDropdownOpen(false)} // ปิด Dropdown เมื่อคลิก
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
                {/* เพิ่มลิงก์ LNbits อื่นๆ ที่นี่ */}
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

        {/* เมนู Hamburger สำหรับ Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white focus:outline-none">
            ☰
          </button>
        </div>
      </div>

      {/* เมนู Hamburger Dropdown สำหรับ Mobile (แสดงเมื่อ isMobileMenuOpen เป็นจริง) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-700 mt-2 p-4 space-y-2">
          <Link href="/" className="block hover:text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>
            หน้าหลัก
          </Link>
          <Link href="/about" className="block hover:text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>
            เกี่ยวกับเรา
          </Link>

          {/* เมนูดรอปดาวน์สำหรับบริการ LNbits ใน Mobile */}
          <div>
            <button
              onClick={() => setIsLnbitsDropdownOpen(!isLnbitsDropdownOpen)}
              className="block w-full text-left py-2 hover:text-gray-300 focus:outline-none"
            >
              บริการ LNbits ▼
            </button>
            {isLnbitsDropdownOpen && (
              <div className="ml-4 space-y-2"> {/* เยื้องเข้าไปด้านในเล็กน้อย */}
                <Link
                  href="https://your-lnbits-url-1.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 hover:bg-gray-600"
                  onClick={() => { setIsMobileMenuOpen(false); setIsLnbitsDropdownOpen(false); }}
                >
                  LNbits Service A
                </Link>
                <Link
                  href="https://your-lnbits-url-2.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 hover:bg-gray-600"
                  onClick={() => { setIsMobileMenuOpen(false); setIsLnbitsDropdownOpen(false); }}
                >
                  LNbits Service B
                </Link>
                <Link
                  href="https://your-lnbits-url-3.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 hover:bg-gray-600"
                  onClick={() => { setIsMobileMenuOpen(false); setIsLnbitsDropdownOpen(false); }}
                >
                  LNbits Service C
                </Link>
              </div>
            )}
          </div>

          <Link href="/contact" className="block hover:text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>
            ติดต่อ
          </Link>
        </div>
      )}
    </nav>
  );
}
