// src/app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import NavBar from '@/components/NavBar';
import BottomNavbar from '@/components/BottomNavbar';
import Footer from '@/components/Footer';
// import AnimatedBackground from '@/components/AnimatedBackground'; // ไม่ต้อง import แล้ว

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Microtronic Home',
  description: 'Your landing page for Microtronic services',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* body: ลบ bg-[#1A202C] ออก, เพราะ background จะมาจาก globals.css โดยตรง */}
      <body className={`${inter.className} min-h-screen relative`}>

        {/* --- ส่วนของพื้นหลังแอนิเมชัน (วงกลม) --- */}
        {/* วงกลมเหล่านี้จะถูกจัดวางเป็น absolute และถูกควบคุมด้วย CSS ใน globals.css */}
        <div className="absolute inset-0 z-[-1]"> {/* z-[-1] เพื่อให้อยู่ด้านหลังสุดของเนื้อหา */}
          <div className="relative w-full h-full"> {/* ใช้ relative เพื่อให้วงกลม absolute อ้างอิงได้ */}
            <div className={`absolute ${styles['gradient-circle-global']} ${styles['circle-1-global']}`}></div>
            <div className={`absolute ${styles['gradient-circle-global']} ${styles['circle-2-global']}`}></div>
            <div className={`absolute ${styles['gradient-circle-global']} ${styles['circle-3-global']}`}></div>
            <div className={`absolute ${styles['gradient-circle-global']} ${styles['circle-4-global']}`}></div>
            {/* สามารถเพิ่มวงกลมได้อีกตามต้องการ */}
          </div>
        </div>

        {/* --- SVG Filters (จำเป็นสำหรับเอฟเฟกต์ Gooey) --- */}
        {/* ควรวางไว้ใน DOM สักที่หนึ่ง เช่นใน body แต่ซ่อนไว้ */}
        <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true" focusable="false">
          <defs>
            <filter id="gooey-filter">
              <feGaussianBlur in="SourceGraphic" stdDeviation="60" result="blur" /> {/* ปรับ stdDeviation ได้ตามความชอบ */}
              <feColorMatrix in="blur" mode="matrix" values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 30 -15  /* ปรับค่าเหล่านี้เพื่อควบคุมความเข้มของเอฟเฟกต์ */
              " result="goo" />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>

        {/* Container สำหรับเนื้อหาหลัก (NavBar, Main, Footer) */}
        {/* relative z-10: อยู่เหนือพื้นหลังแอนิเมชัน */}
        <div className="relative z-10 flex flex-col min-h-screen pb-[64px]">
          <NavBar />
          <main className="flex-grow overflow-y-auto">
            {children}
          </main>
          <Footer />
        </div>

        <BottomNavbar />
      </body>
    </html>
  );
}
