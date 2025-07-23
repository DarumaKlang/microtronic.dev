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
        from-[#0E0B16]
        via-[#1A182E]
        via-[#2A2040]
        via-[#3E386D]
        via-[#5F52A0]
        via-[#8C7BBF]
        to-[#C3B8D9]
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
