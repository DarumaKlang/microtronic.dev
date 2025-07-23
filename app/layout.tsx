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
      {/* Radial Gradient โทนเข้มจากภาพตัวอย่าง */}
      <body className={`${inter.className} min-h-screen bg-radial from-[#1A202C] via-[#2D3748] via-[#3C366B] to-[#4A1B6B]`}>
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
