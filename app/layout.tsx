// src/app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import NavBar from '@/components/NavBar';
import BottomNavbar from '@/components/BottomNavbar';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';

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
      {/* ลบ overflow-hidden ออกจาก body */}
      <body className={`${inter.className} min-h-screen relative bg-[#1A202C]`}> {/* <-- ลบ overflow-hidden ออก */}
        {/* Animated Background อยู่ด้านหลังสุด */}
        <AnimatedBackground />

        {/* เนื้อหาหลักของคุณ */}
        {/* เพิ่ม div ครอบเนื้อหาหลักพร้อม z-10 และ flex properties */}
        <div className="relative z-10 flex flex-col min-h-screen"> {/* <-- เพิ่ม div นี้เข้ามาอีกครั้งตามที่เคยแนะนำ */}
          <NavBar />
          {/* เพิ่ม overflow-y-auto ให้กับ main */}
          <main className="flex-grow overflow-y-auto"> {/* <-- เพิ่ม overflow-y-auto ที่นี่ */}
            {children}
          </main>
          <Footer />
          <BottomNavbar />
        </div> {/* <-- ปิด div นี้ */}
      </body>
    </html>
  );
}
