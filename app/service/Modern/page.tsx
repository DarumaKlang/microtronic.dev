import GooeyBackground from '@/components/GooeyBackground';
import Link from 'next/link';

// เมตาดาต้าสำหรับหน้านี้ (สำหรับ SEO)
export const metadata = {
    title: 'เทคโนโลยีและดีไซน์ทันสมัย - Microtronic',
    description: 'ใช้เทคโนโลยีล่าสุดและดีไซน์ที่ล้ำสมัย เพื่อให้เว็บไซต์ของคุณโดดเด่นและสร้างความประทับใจด้วย Next.js และ Vercel.',
};

export default function ModernPage() {
    return (
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 text-white pt-[120px] pb-[100px] relative overflow-hidden">
            {/* พื้นหลัง Gooey และ Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-bg-start via-blue-900 to-fuchsia-800 opacity-95 z-0"></div>
            <GooeyBackground />
            
            <main className="container mx-auto max-w-7xl flex flex-col gap-16 relative z-10">

                {/* Hero Section */}
                <section className="text-center py-16 border-b border-fuchsia-400/30">
                    <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tighter mb-6 text-fuchsia-400 drop-shadow-xl">
                        ดีไซน์และเทคโนโลยีทันสมัย ✨
                    </h1>
                    <p className="text-xl sm:text-3xl font-light max-w-4xl mx-auto opacity-95 text-gray-200">
                        ใช้เทคโนโลยีล่าสุดและดีไซน์ที่ล้ำสมัย เพื่อให้เว็บไซต์ของคุณโดดเด่นและสร้างความประทับใจ
                    </p>
                </section>

                {/* ส่วนเนื้อหาหลัก - Glassmorphism */}
                <section className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 sm:p-12 shadow-[0_0_60px_rgba(255,100,255,0.15)] border border-white/30 transform transition duration-500 hover:scale-[1.01]">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-fuchsia-300 border-b border-fuchsia-300/50 pb-4">
                        ก้าวล้ำนำเทรนด์ด้วยเทคโนโลยีที่พิสูจน์แล้ว
                    </h2>
                    <div className="space-y-8 text-lg text-gray-300 leading-relaxed">
                        <p>
                            ในโลกดิจิทัลที่เปลี่ยนแปลงอย่างรวดเร็ว การตามหลังคู่แข่งไม่ใช่ทางเลือก <span className="font-semibold text-yellow-300">ความทันสมัย</span> จึงเป็นสิ่งสำคัญที่เราฝังอยู่ในทุกโปรเจกต์ ตั้งแต่แนวคิดไปจนถึงการ Deploy.
                        </p>
                        <blockquote className="border-l-4 border-fuchsia-500 pl-6 py-2 italic text-gray-200 bg-black/10 p-4 rounded-lg">
                            <p>
                                เราใช้ <span className="font-bold text-lg text-white bg-blue-600/50 px-2 py-0.5 rounded">Next.js</span> สำหรับการเรนเดอร์ที่มีประสิทธิภาพ, <span className="font-bold text-lg text-pink-300">Tailwind CSS</span> สำหรับดีไซน์ที่ปรับเปลี่ยนได้และสวยงามรวดเร็ว, และ <span className="font-bold text-lg text-green-400">Vercel</span> สำหรับการ Deploy ที่ไร้รอยต่อ.
                            </p>
                        </blockquote>
                        <p>
                            เราไม่เพียงแต่นำเสนอดีไซน์ที่ดึงดูดสายตา แต่ยังรวมถึง <span className="font-semibold text-fuchsia-300">ประสบการณ์ผู้ใช้ (UX)</span> ที่ใช้งานง่าย มีปฏิสัมพันธ์ และทำงานได้อย่างสมบูรณ์แบบบนทุกอุปกรณ์.
                        </p>
                    </div>
                </section>

                {/* ประโยชน์หลัก (Grid) - ใช้ Card Component ที่เราสร้างไว้ */}
                <section className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
                    <Card icon="🎨" title="ดีไซน์ที่สร้างความประทับใจ" description="สุนทรียภาพที่ล้ำสมัย สะอาดตา และเน้นความเรียบง่าย (Minimalism) เพื่อสร้างแบรนด์ที่น่าจดจำและดึงดูดผู้ใช้." />
                    <Card icon="💻" title="เทคโนโลยี Cutting-Edge" description="ใช้ React 19, Next.js 15, TypeScript และ Vercel เพื่อความเร็ว, ความเสถียร และความสามารถในการปรับขนาดในอนาคต." />
                    <Card icon="📱" title="Responsive & Adaptive" description="เว็บไซต์ที่ปรับเข้ากับทุกหน้าจออย่างสมบูรณ์แบบ ทั้งมือถือ แท็บเล็ต และเดสก์ท็อป โดยไม่สูญเสียคุณภาพและประสิทธิภาพ." />
                    <Card icon="🚀" title="นวัตกรรมและการเพิ่มประสิทธิภาพ" description="การนำเทคนิคใหม่ๆ มาใช้ เช่น Server Components และการจัดการ Asset ที่ดีที่สุด เพื่อความเร็วในการโหลดที่เหนือกว่าคู่แข่ง." />
                </section>
                
                {/* Call to Action - ปุ่มที่มีสไตล์โดดเด่น */}
                <section className="text-center pt-8 pb-4">
                    <p className="text-2xl mb-8 font-light text-gray-100">
                        สร้างความโดดเด่นให้กับแบรนด์ของคุณด้วยเว็บไซต์ที่ทันสมัยและล้ำหน้าที่สุด
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block px-12 py-5 font-extrabold text-xl rounded-full text-white shadow-2xl transition duration-500 transform 
                                   bg-gradient-to-r from-blue-500 to-fuchsia-500 hover:from-fuchsia-500 hover:to-blue-500
                                   hover:scale-110 active:scale-105 active:shadow-inner tracking-wider ring-4 ring-fuchsia-400/50 hover:ring-white/70"
                    >
                        ก้าวสู่โลกดิจิทัลที่ทันสมัย 💡
                    </Link>
                </section>

            </main>
        </div>
    );
}


// Component Card สำหรับการแสดงประโยชน์ (ใช้สี fuchsia ในส่วน hover)
interface CardProps {
    icon: string;
    title: string;
    description: string;
}

const Card = ({ icon, title, description }: CardProps) => (
    <div className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/10 hover:border-fuchsia-500 transition duration-300 transform hover:-translate-y-2 relative overflow-hidden">
        <div className="absolute inset-0 bg-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative">
            <div className="text-5xl mb-4 p-2 inline-block bg-fuchsia-500/20 rounded-lg transform transition duration-300 group-hover:rotate-6">
                {icon}
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-fuchsia-200 group-hover:text-white transition-colors duration-300">{title}</h3>
            <p className="opacity-80 text-gray-300">{description}</p>
        </div>
    </div>
);