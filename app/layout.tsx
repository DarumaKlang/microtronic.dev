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
      <body
        className={`${inter.className} min-h-screen`}
        style={{
          // ชั้นบน: Radial gradient ตรงกลางเป็นสีสว่าง แล้วค่อยๆ มืดลง (อาจจะใช้ opacity ช่วย)
          // สามารถปรับเป็นโทนสีเข้มได้
          backgroundImage: `
            radial-gradient(circle at center, rgba(100, 50, 150, 0.2) 0%, rgba(20, 10, 30, 0.8) 70%, rgba(0, 0, 0, 0.9) 100%),
            linear-gradient(180deg, #1A202C 0%, #2D3748 50%, #3C366B 100%)
          `,
          // เพิ่ม background-blend-mode เพื่อผสมผสานกัน
          backgroundBlendMode: 'overlay', // หรือ multiply, screen, lighten, darken, etc.
        }}
      >
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
