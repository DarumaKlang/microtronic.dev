// src/app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import NavBar from '@/components/NavBar'; // Top Navigation Bar
import BottomNavbar from '@/components/BottomNavbar'; // Bottom Navigation Bar
import Footer from '@/components/Footer'; // Footer component (ถ้ามี, หรืออาจจะรวมใน BottomNavbar)
import AnimatedBackground from '@/components/AnimatedBackground'; // Component สำหรับ Background เคลื่อนไหว

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
      <body className={`${inter.className} min-h-screen relative overflow-hidden bg-[#1A202C]`}>
        {/* Animated Background อยู่ด้านล่างสุด */}
        <AnimatedBackground />

        {/* Container สำหรับเนื้อหาหลักของเว็บทั้งหมด */}
        {/* ใช้ flex และ flex-col เพื่อจัดเรียง NavBar, Main, BottomNavbar ในแนวตั้ง */}
        {/* min-h-screen เพื่อให้เนื้อหาหลักครอบคลุมทั้งหน้าจอ และเพื่อให้ BottomNavbar อยู่ด้านล่างสุด */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <NavBar /> {/* เมนูด้านบน */}
          <main className="flex-grow"> {/* เนื้อหาหลักจะขยายเต็มพื้นที่ที่เหลือ */}
            {children} {/* เนื้อหาของแต่ละ Page จะถูก Render ที่นี่ */}
          </main>
          {/* Footer และ BottomNavbar อยู่ด้านล่าง */}
          <Footer /> {/* ถ้า Footer แยกจาก BottomNavbar */}
          <BottomNavbar /> {/* เมนูด้านล่างสุด */}
        </div>
      </body>
    </html>
  );
}
