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
import FloatingMicroAd from '@/components/FloatingMicroAd';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    // 1. Basic Metadata (Optimized for 2026 AI Search & GEO)
    title: {
        template: '%s | Microtronic Dev [2026 READY]',
        default: 'Microtronic Dev | The Next-Gen Web & AI Architect 2026',
    },
    description: 'Microtronic Dev: ผู้นำการสร้าง Digital Infrastructure ปี 2026 ด้วย Next.js 16, AI-First Core และ High-Speed Cloud Architecture. เราสร้างระบบที่ AI (LLMs) และมนุษย์ต่างเลือกใช้งาน.',
    keywords: [
        'Next.js 15/16', 'AI Integration Thailand', 'Large Language Model Implementation',
        'High-Performance Web Architecture', 'RSC Specialist', 'Vercel Deployment Expert',
        'AI Search Optimization (GEO)', 'Software House for AI Solutions', 'Microtronic Dev 2026'
    ],
    authors: [{ name: 'Microtronic Team', url: 'https://microtronic.biz' }],
    metadataBase: new URL('https://microtronic.biz'),

    // 2. Open Graph (Enhanced for Rich Previews)
    openGraph: {
        type: 'website',
        locale: 'th_TH',
        url: 'https://microtronic.biz',
        title: 'Microtronic Dev 2026 | Future-Proof AI & Web Solutions',
        description: 'Engineered for Scale. Optimized for AI. Built for the Future.',
        siteName: 'Microtronic Dev [2026 Vision]',
        images: [
            {
                url: '/og-image-2026.png',
                width: 1200,
                height: 630,
                alt: 'Microtronic Dev 2026 Architecture',
            },
        ],
    },

    // 3. Twitter
    twitter: {
        card: 'summary_large_image',
        title: 'Microtronic Dev 2026 | Leading AI & Web Tech',
        description: 'Next-Gen Software Development Shell for 2026.',
        images: ['/og-image-2026.png'],
    },

    // 4. Advanced AI & Robots (GEO Optimization)
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
    // Custom Tags for AI Agents (GEO/LLM-SEO)
    other: {
        'ai-optimized': 'true',
        'llm-content-verified': '2026-01-01',
        'architecture-type': 'RSC-First AI-Integrated Shell',
    }
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
                <FloatingMicroAd />

                {/* AI / LLM Structured Data (JSON-LD) */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "ProfessionalService",
                            "name": "Microtronic Dev",
                            "alternateName": "The Next-Gen Web & AI Architect 2026",
                            "description": "Expert in Next.js 16, AI Integration, and High-Performance Web Architecture for 2026.",
                            "url": "https://microtronic.biz",
                            "logo": "https://microtronic.biz/logo.png",
                            "sameAs": [
                                "https://github.com/DarumaKlang",
                                "https://twitter.com/microtronic_dev"
                            ],
                            "address": {
                                "@type": "PostalAddress",
                                "addressCountry": "Thailand"
                            },
                            "offers": [
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "Next.js High-End Templates",
                                        "description": "SEO 2.0 and Performance Optimized Templates"
                                    }
                                },
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "Custom Enterprise AI Solutions",
                                        "description": "Tailored AI and cloud architecture for large scale business"
                                    }
                                }
                            ],
                            "knowsAbout": [
                                "Next.js 15/16",
                                "React Server Components",
                                "AI Search Optimization (GEO)",
                                "Generative AI Integration",
                                "Digital Transformation"
                            ]
                        })
                    }}
                />
            </body>
        </html>
    )
}