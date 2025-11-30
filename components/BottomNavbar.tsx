// components/BottomNavbar.tsx
"use client";

import Link from 'next/link';
import { Home, Zap, Users, PhoneCall, Briefcase } from 'lucide-react'; // นำเข้าไอคอน

/**
 * BottomNavbar Component (Mobile CTA Bar)
 */
export default function BottomNavbar() {
    return (
        // ใช้ fixed bottom เพื่อให้ติดอยู่ด้านล่าง
        <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden 
                        bg-gray-900/90 backdrop-blur-md border-t border-fuchsia-800/50 
                        shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
            <div className="flex justify-around items-center h-16">

                {/* Home */}
                <Link href="/" className="flex flex-col items-center justify-center text-xs text-gray-300 hover:text-cyan-400 transition-colors">
                    <Home className="w-5 h-5 mb-1" />
                    หน้าหลัก
                </Link>
                
                {/* Services/Marketing */}
                <Link href="/marketing" className="flex flex-col items-center justify-center text-xs text-gray-300 hover:text-cyan-400 transition-colors">
                    <Zap className="w-5 h-5 mb-1" />
                    บริการ
                </Link>

                {/* Main CTA (ให้เด่นที่สุด) */}
                <Link 
                    href="/contact" 
                    className="flex flex-col items-center justify-center -translate-y-2 
                                bg-cyan-500 text-gray-900 w-16 h-16 rounded-full 
                                shadow-2xl shadow-cyan-500/50 
                                transition-transform duration-300 hover:scale-[1.15]"
                    title="นัดปรึกษาฟรี!"
                >
                    <PhoneCall className="w-6 h-6" />
                    <span className="text-[10px] font-bold mt-1">ติดต่อ!</span>
                </Link>
                
                {/* About */}
                <Link href="/about" className="flex flex-col items-center justify-center text-xs text-gray-300 hover:text-cyan-400 transition-colors">
                    <Users className="w-5 h-5 mb-1" />
                    เกี่ยวกับเรา
                </Link>

                {/* Portfolio */}
                <Link href="/portfolio" className="flex flex-col items-center justify-center text-xs text-gray-300 hover:text-cyan-400 transition-colors">
                    <Briefcase className="w-5 h-5 mb-1" />
                    ผลงาน
                </Link>
            </div>
        </nav>
    );
}