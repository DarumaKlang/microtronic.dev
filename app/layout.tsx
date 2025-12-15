import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from '@/components/NavBar'
// BottomNavbar ถูกลบออกเนื่องจากไม่มีการใช้งานหรือโค้ดให้ตรวจสอบ (จะใช้ Footer แทน)
// import BottomNavbar from '@/components/BottomNavbar' 

// These styles apply to every route in the application
import './globals.css'

// IMPORT FooterSection (สมมติว่าคุณมี FooterSection หรือ Footer ที่จะใช้แทน BottomNavbar)
// เนื่องจากเรามีไฟล์ Footer.tsx ที่แนบมา ผมจะเรียกใช้ Footer ที่สร้างไว้ก่อนหน้านี้
import FooterSection from '@/components/FooterSection';
import AIChatbot from '@/components/AIChatbot';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    // 1. Basic Metadata
    title: {
        template: '%s | Microtronic Dev.',
        default: 'Microtronic Dev. | Web & AI Solutions', // Default Title
    },
    description: 'ผู้เชี่ยวชาญด้านการพัฒนาเว็บไซต์ด้วย Next.js, AI Integration และ Web3 Solutions ที่เน้นความเร็ว ความปลอดภัย และ UX/UI ระดับพรีเมียม',
    keywords: ['Next.js', 'React', 'Web Development', 'AI Integration', 'Web3', 'Thailand', 'Software House'],
    authors: [{ name: 'Microtronic Team', url: 'https://microtronic.biz' }],
    metadataBase: new URL('https://microtronic.biz'), // Set base URL for relative links

    // 2. Open Graph (Facebook, LinkedIn)
    openGraph: {
        type: 'website',
        locale: 'th_TH',
        url: 'https://microtronic.biz',
        title: 'Microtronic Dev. | Web & AI Solutions for Future Business',
        description: 'ยกระดับธุรกิจของคุณด้วยเว็บไซต์ประสิทธิภาพสูงและโซลูชัน AI อัจฉริยะ',
        siteName: 'Microtronic Dev.',
        images: [
            {
                url: '/og-image.png', // Generated AI Image
                width: 1200,
                height: 630,
                alt: 'Microtronic Dev. Preview',
            },
        ],
    },

    // 3. Twitter Card
    twitter: {
        card: 'summary_large_image',
        title: 'Microtronic Dev. | Web & AI Solutions',
        description: 'รับทำเว็บไซต์ Next.js และ AI Integration มาตรฐานสากล',
        images: ['/og-image.png'], // ใช้รูปเดียวกับ OG
    },

    // 4. Robots
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        // กำหนดภาษา และใช้ class เพื่อตั้งค่าพื้นฐานของ Dark Mode
        <html lang="th" className={`bg-slate-900 text-white ${inter.className}`}>
            <body>
                <NavBar />
                <main>{children}</main> {/* เพิ่ม <main> เพื่อให้เป็นโครงสร้างที่ดี */}
                <FooterSection /> {/* ใช้ Footer แทน BottomNavbar */}
                <AIChatbot />
            </body>
        </html>
    )
}