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
      <body className={`${inter.className} min-h-screen relative bg-[#1A202C]`}>
        {/* Animated Background อยู่ด้านหลังสุด */}
        <AnimatedBackground />

        {/* Container สำหรับเนื้อหาหลัก (NavBar, Main, Footer) ที่จะเลื่อนได้ */}
        {/* เพิ่ม padding-bottom- เพื่อให้เนื้อหาไม่ถูก BottomNavbar ทับ */}
        <div className="relative z-10 flex flex-col min-h-screen pb-16"> {/* <-- เพิ่ม pb-16 (หรือค่าที่เหมาะสม) */}
          <NavBar />
          <main className="flex-grow overflow-y-auto">
            {children}
          </main>
          <Footer />
          {/* BottomNavbar ถูกย้ายออกไปอยู่ด้านนอก div นี้ */}
        </div>

        {/* BottomNavbar ถูกตรึงไว้ที่ด้านล่างสุดของจอเสมอ */}
        {/* fixed: ตรึงตำแหน่ง, bottom-0: อยู่ขอบล่าง, left-0 right-0: กว้างเต็มจอ, z-50: อยู่ด้านบนสุด */}
        <BottomNavbar className="fixed bottom-0 left-0 right-0 z-50" /> {/* <-- ย้ายมาตรงนี้และเพิ่ม class */}
      </body>
    </html>
  );
}
