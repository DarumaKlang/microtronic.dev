// src/app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import NavBar from '@/components/NavBar';
import BottomNavbar from '@/components/BottomNavbar';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground'; // ต้องแน่ใจว่า import บรรทัดนี้อยู่

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
        {/* Animated Background อยู่ด้านหลังสุด */}
        <AnimatedBackground />

        {/* ส่วนนี้คือการแก้ไข: เพิ่ม div ครอบเนื้อหาหลักทั้งหมด */}
        {/* relative z-10: ทำให้เนื้อหานี้อยู่เหนือ AnimatedBackground (ซึ่งมี z-index: 0) */}
        {/* flex flex-col min-h-screen: เพื่อจัดเรียง content ในแนวตั้งและให้สูงเต็มจอ */}
        <div className="relative z-10 flex flex-col min-h-screen"> {/* <-- เพิ่ม div นี้ */}
          <NavBar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <BottomNavbar />
        </div> {/* <-- ปิด div นี้ */}
      </body>
    </html>
  );
}
