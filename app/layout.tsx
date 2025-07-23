// src/app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import NavBar from '@/components/NavBar';
import BottomNavbar from '@/components/BottomNavbar';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground'; // <-- เพิ่มบรรทัดนี้

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
      <body
        className={`${inter.className} min-h-screen relative overflow-hidden bg-[#1A202C]`} // <-- แก้ไข className เพิ่ม relative, overflow-hidden, bg-[#1A202C]
        // คุณเคยมี style={{ ... }} ที่นี่, ตรวจสอบให้แน่ใจว่าได้ลบออกแล้ว
      >
        <AnimatedBackground /> {/* <-- เพิ่มบรรทัดนี้ */}
        {/*
          เนื้อหาเดิมของคุณที่อยู่ตรงนี้ เช่น
          <NavBar />
          <main className="flex-grow">
            {children}
          </main>
          <BottomNavbar />
          <Footer />
          **ยังคงอยู่และไม่ต้องไปยุ่งกับมันตอนนี้**
        */}
        <NavBar />
        <main className="flex-grow">
          {children}
        </main>
        <BottomNavbar />
        <Footer />
      </body>
    </html>
  );
}
