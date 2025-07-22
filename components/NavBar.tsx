"use client"; // แจ้งให้ Next.js ทราบว่านี่คือ Client Component

import Link from 'next/link'; // ใช้ Link จาก next/link สำหรับ Internal Navigation
import { useState } from 'react'; // ตัวอย่าง: ถ้า NavBar มีสถานะ (เช่น เมนู Hamburger)

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false); // ตัวอย่างสำหรับเมนู Hamburger

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/ชื่อเว็บไซต์ */}
        <Link href="/" className="text-xl font-bold">
          Microtronic
        </Link>

        {/* เมนูสำหรับ Desktop */}
        <div className="hidden md:flex space-x-4">
          <Link href="/" className="hover:text-gray-300">
            หน้าหลัก
          </Link>
          <Link href="/about" className="hover:text-gray-300">
            เกี่ยวกับเรา
          </Link>
          {/* ลิงก์ไปยังบริการ LNbits ในอนาคต */}
          <a
            href="https://your-lnbits-service-url.com" // แทนที่ด้วย URL จริงของ LNbits ในอนาคต
            target="_blank" // เปิดในแท็บใหม่
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            บริการ LNbits
          </a>
          <Link href="/contact" className="hover:text-gray-300">
            ติดต่อ
          </Link>
        </div>

        {/* เมนู Hamburger สำหรับ Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            {/* คุณสามารถใช้ไอคอน Hamburger ที่นี่ได้ */}
            ☰
          </button>
        </div>
      </div>

      {/* เมนู Hamburger Dropdown สำหรับ Mobile (แสดงเมื่อ isOpen เป็นจริง) */}
      {isOpen && (
        <div className="md:hidden bg-gray-700 mt-2 p-4 space-y-2">
          <Link href="/" className="block hover:text-gray-300" onClick={() => setIsOpen(false)}>
            หน้าหลัก
          </Link>
          <Link href="/about" className="block hover:text-gray-300" onClick={() => setIsOpen(false)}>
            เกี่ยวกับเรา
          </Link>
          <a
            href="https://your-lnbits-service-url.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            บริการ LNbits
          </a>
          <Link href="/contact" className="block hover:text-gray-300" onClick={() => setIsOpen(false)}>
            ติดต่อ
          </Link>
        </div>
      )}
    </nav>
  );
}