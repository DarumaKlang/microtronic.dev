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
      {/* body: ลบ overflow-hidden ออก, เพิ่ม min-h-screen และ relative */}
      <body className={`${inter.className} min-h-screen relative bg-[#1A202C]`}>

        {/* Animated Background อยู่ด้านหลังสุด (z-[-50] ใน AnimatedBackground.tsx) */}
        <AnimatedBackground />

        {/* Container สำหรับเนื้อหาหลัก (NavBar, Main, Footer) ที่จะเลื่อนได้ */}
        {/* relative z-10: อยู่เหนือ AnimatedBackground */}
        {/* flex flex-col min-h-screen: จัด layout ให้ main ขยายได้ */}
        {/* pb-[64px]: เพิ่ม padding ด้านล่างเพื่อไม่ให้เนื้อหาถูก BottomNavbar ทับ (h-16 ของ BottomNavbar คือ 64px) */}
        <div className="relative z-10 flex flex-col min-h-screen pb-[64px]">
          <NavBar />
          {/* main: เพิ่ม overflow-y-auto เพื่อให้เนื้อหาใน main เลื่อนได้ */}
          <main className="flex-grow overflow-y-auto">
            {children}
          </main>
          <Footer />
        </div>

        {/* BottomNavbar: อยู่ด้านนอก div เนื้อหาหลัก และไม่ต้องส่ง className ให้มันอีก */}
        {/* เพราะ BottomNavbar มี fixed positioning ในไฟล์มันเองแล้ว (และมี z-50) */}
        <BottomNavbar />
      </body>
    </html>
  );
}
