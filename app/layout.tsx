// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // ตรวจสอบให้แน่ใจว่าได้ import global styles

// Import Components ของคุณ
import NavBar from '../components/NavBar'; // สมมติว่ามี
import BottomNavbar from '../components/BottomNavbar'; // สมมติว่ามี
import Footer from '../components/Footer'; // สมมติว่ามี

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Microtronic Home",
  description: "Your landing page for Microtronic services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-linear-to-b from-[#212F58] via-[#4A1B6B] to-[#7B1F7B]`}>
        <NavBar /> {/* เมนูด้านบน */}
        <main className="flex-grow"> {/* เพิ่ม flex-grow เพื่อให้เนื้อหาหลักขยายเต็มที่ */}
          {children} {/* เนื้อหาของแต่ละ Page */}
        </main>
        <BottomNavbar /> {/* เมนูด้านล่าง */}
        <Footer /> {/* Footer component */}
      </body>
    </html>
  );
}
