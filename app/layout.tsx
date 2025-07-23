// src/app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import NavBar from '@/components/NavBar';
import BottomNavbar from '@/components/BottomNavbar';
import Footer from '@/components/Footer';

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
      <body className={`${inter.className} min-h-screen
        bg-radial-at-center
        from-[#0E0B16]     // สีดำ-น้ำเงินเข้มมาก (จากจุดศูนย์กลาง)
        via-[#1A182E]     // โทนน้ำเงินเข้ม
        via-[#2A2040]     // โทนม่วงเข้มขึ้น
        via-[#3E386D]     // โทนม่วงน้ำเงิน
        via-[#5F52A0]     // โทนน้ำเงินม่วงสว่างขึ้นเล็กน้อย
        via-[#8C7BBF]     // โทนฟ้า-ม่วง
        to-[#C3B8D9]      // โทนชมพูอ่อนมากเกือบขาว (ที่ขอบนอก)
        // ถ้าอยากให้ขอบนอกกลับไปมืดอีกครั้ง สามารถใช้สีดำใน to-[] แล้วปรับ via stops ให้เหมาะสม
      `}>
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
