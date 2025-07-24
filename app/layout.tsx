// src/app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import NavBar from '@/components/NavBar';
import BottomNavbar from '@/components/BottomNavbar';
import Footer from '@/components/Footer';
// ไม่ต้อง import styles from '../app/styles/background.module.css'; หรืออะไรทำนองนั้น

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
      <body className={`${inter.className} min-h-screen relative`}>

        {/* --- ส่วนของพื้นหลังแอนิเมชัน (วงกลม) --- */}
        <div className="absolute inset-0 z-[-1]">
          <div className="relative w-full h-full">
            {/* ตรงนี้ให้ลบ 'styles.' ออกไป */}
            <div className={`absolute gradient-circle-global circle-1-global`}></div>
            <div className={`absolute gradient-circle-global circle-2-global`}></div>
            <div className={`absolute gradient-circle-global circle-3-global`}></div>
            <div className={`absolute gradient-circle-global circle-4-global`}></div>
            {/* สามารถเพิ่มวงกลมได้อีกตามต้องการ */}
          </div>
        </div>

        {/* --- SVG Filters (จำเป็นสำหรับเอฟเฟกต์ Gooey) --- */}
        <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true" focusable="false">
          <defs>
            <filter id="gooey-filter">
              <feGaussianBlur in="SourceGraphic" stdDeviation="60" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 30 -15
              " result="goo" />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>

        {/* Container สำหรับเนื้อหาหลัก */}
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
