// components/Footer.tsx

// ไม่จำเป็นต้องใช้ "use client";

export default function Footer() {
    return (
        // ปรับปรุงสไตล์ให้เป็น Darker background และใช้สีแบรนด์
        <footer className="bg-gray-900 pt-16 pb-12 border-t border-fuchsia-800/50 text-white text-sm">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

                    {/* คอลัมน์ที่ 1: Branding และ Contact */}
                    <div>
                        <h4 className="text-xl font-extrabold mb-4 text-fuchsia-400">Microtronic</h4>
                        <p className="text-gray-400 mb-4">
                            สร้างสรรค์โซลูชันดิจิทัลแห่งอนาคต ด้วย Next.js, TypeScript และเทคโนโลยี Lightning Network
                        </p>
                        <p className="text-gray-400">
                            อีเมล: contact@microtronic.biz
                        </p>
                    </div>

                    {/* คอลัมน์ที่ 2: บริการหลัก (Marketing Focus) */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">บริการหลัก</h4>
                        <ul className="space-y-2">
                            <li><a href="/marketing" className="hover:text-fuchsia-400 transition-colors">รับทำเว็บไซต์องค์กร</a></li>
                            <li><a href="/public-company-service" className="hover:text-fuchsia-400 transition-colors">เว็บไซต์บริษัทมหาชน</a></li>
                            <li><a href="/seo-service" className="hover:text-fuchsia-400 transition-colors">บริการทำ SEO สายขาว</a></li>
                            <li><a href="/google-ads-service" className="hover:text-fuchsia-400 transition-colors">บริหาร Google Ads</a></li>
                        </ul>
                    </div>

                    {/* คอลัมน์ที่ 3: ข้อมูลบริษัท */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">บริษัท</h4>
                        <ul className="space-y-2">
                            <li><a href="/about" className="hover:text-fuchsia-400 transition-colors">เกี่ยวกับเรา</a></li>
                            <li><a href="/asset" className="hover:text-fuchsia-400 transition-colors">ผลงานของเรา</a></li>
                            <li><a href="/contact" className="hover:text-fuchsia-400 transition-colors">ติดต่อเรา</a></li>
                            <li><a href="/privacy-policy" className="hover:text-fuchsia-400 transition-colors">นโยบายความเป็นส่วนตัว</a></li>
                        </ul>
                    </div>

                    {/* คอลัมน์ที่ 4: ลิงก์เฉพาะทาง (LNbits/Crypto) */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">นวัตกรรม</h4>
                        <ul className="space-y-2">
                            <li><a href="https://your-lnbits-url-1.com" target="_blank" rel="noopener noreferrer" className="hover:text-fuchsia-400 transition-colors">LNbits Service A</a></li>
                            <li><a href="/buddha" className="hover:text-fuchsia-400 transition-colors">พุทธศาสนา (Utility)</a></li>
                            <li><a href="/astrology" className="hover:text-fuchsia-400 transition-colors">โหราศาสตร์ (Utility)</a></li>
                            <li><a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="hover:text-fuchsia-400 transition-colors">Next.js Framework</a></li>
                        </ul>
                    </div>

                </div>

                {/* ส่วนลิขสิทธิ์ */}
                <div className="mt-12 pt-6 border-t border-fuchsia-800/50 text-center">
                    <p className="text-gray-500">&copy; {new Date().getFullYear()} Microtronic. All rights reserved. | Built with Next.js and Vercel.</p>
                </div>
            </div>
        </footer>
    );
}