// src/app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import NavBar from '@/components/NavBar';
import BottomNavbar from '@/components/BottomNavbar';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground'; // Import Component ใหม่

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
        {/* เรียกใช้ Component AnimatedBackground ที่นี่ */}
        <AnimatedBackground />

        {/* เนื้อหาหลักของเว็บ (อยู่เหนือ Background) */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <NavBar />
          <main className="flex-grow">
            {children}
          </main>
          <BottomNavbar />
          <Footer />
        </div>
      </body>
    </html>
  );
}
