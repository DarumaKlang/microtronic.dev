import type { Metadata } from 'next'
//

import NavBar from '@/components/NavBar'
// BottomNavbar ถูกลบออกเนื่องจากไม่มีการใช้งานหรือโค้ดให้ตรวจสอบ (จะใช้ Footer แทน)
// import BottomNavbar from '@/components/BottomNavbar' 

// These styles apply to every route in the application
import './globals.css'
//

// IMPORT Footer Component (สมมติว่าคุณมี FooterSection หรือ Footer ที่จะใช้แทน BottomNavbar)
// เนื่องจากเรามีไฟล์ Footer.tsx ที่แนบมา ผมจะเรียกใช้ Footer ที่สร้างไว้ก่อนหน้านี้
import Footer from '@/components/Footer'; 

export const metadata: Metadata = {
    // อัปเดต Title และ Description ให้ตรงกับแบรนด์
    title: 'Microtronic Dev. | Next.js & TypeScript Expert',
    description: 'บริการพัฒนาระบบเว็บไซต์ด้วย Next.js และ TypeScript ที่เน้นความเร็ว ความเสถียร และความปลอดภัยของข้อมูล',
}
//

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        // กำหนดภาษา และใช้ class เพื่อตั้งค่าพื้นฐานของ Dark Mode
        <html lang="th" className="bg-slate-900 text-white"> 
            <body>
                <NavBar />
                <main>{children}</main> {/* เพิ่ม <main> เพื่อให้เป็นโครงสร้างที่ดี */}
                <Footer /> {/* ใช้ Footer แทน BottomNavbar */}
            </body>
        </html>
    )
}