// src/app/layout.tsx
import './globals.css'; // Global styles
import { Inter } from 'next/font/google'; // Google Font
import NavBar from '@/components/NavBar'; // Top Navigation Bar
import BottomNavbar from '@/components/BottomNavbar'; // Bottom Navigation Bar
import Footer from '@/components/Footer'; // Footer component (ถ้ามี)
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
        <AnimatedBackground />

        <div className="relative z-10 flex flex-col min-h-screen">
          <NavBar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <BottomNavbar />
        </div>
      </body>
    </html>
  );
}
