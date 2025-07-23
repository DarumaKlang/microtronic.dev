// src/app/layout.tsx
import './globals.css'; // Global styles
import { Inter } from 'next/font/google'; // Google Font
import NavBar from '../components/NavBar'; // Top Navigation Bar
import BottomNavbar from '@/components/BottomNavbar'; // Bottom Navigation Bar
import Footer from '../components/Footer'; // Footer component (if applicable)

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
      {/* ใช้ Class สำหรับ Background Gradient ใหม่ที่เรากำหนดใน tailwind.config.js */}
      <body className={`${inter.className} bg-my-new-gradient`}>
        <NavBar /> {/* เมนูด้านบน */}
        <main className="flex-grow"> {/* เพิ่ม flex-grow เพื่อให้เนื้อหาหลักขยายเต็มที่ */}
          {children} {/* เนื้อหาของแต่ละ Page */}
        </main>
        <BottomNavbar /> {/* เมนูด้านล่าง */}
        <Footer /> {/* Footer */}
      </body>
    </html>
  );
}
