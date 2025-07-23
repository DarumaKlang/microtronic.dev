import './globals.css'; // ตรวจสอบให้แน่ใจว่า import global styles ของคุณ

// Import Components ที่จะอยู่ใน Layout
import { Inter } from 'next/font/google';
import NavBar from '../components/NavBar'; // เราจะสร้าง NavBar component นี้ทีหลัง
import BottomNavbar from '@/components/BottomNavbar';
import Footer from '../components/Footer'; // หรือ Footer ถ้ามี

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
      <body className={inter.className}>
        <NavBar /> {/* เมนูจะอยู่ตรงนี้ */}
        <main>
          {children}
          <BottomNavbar />
        </main> {/* นี่คือส่วนที่เนื้อหาของแต่ละ Page จะแสดง */}
        <Footer /> {/* Footer */}
      </body>
    </html>
  );
}
