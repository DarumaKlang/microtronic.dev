import GooeyBackground from '@/components/GooeyBackground';
import Link from 'next/link';

// เมตาดาต้าสำหรับหน้านี้ (สำหรับ SEO)
export const metadata = {
    title: 'บริการเว็บไซต์มืออาชีพ - Microtronic',
    description: 'รับออกแบบและพัฒนาเว็บไซต์ด้วยมาตรฐานสูงสุด เพื่อให้เว็บไซต์ของคุณมีประสิทธิภาพและน่าเชื่อถือด้วย Next.js และ TypeScript.',
};

export default function ProfessionalPage() {
    return (
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 text-white pt-[120px] pb-[100px] relative overflow-hidden">
            {/* พื้นหลัง Gooey และ Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-bg-start via-blue-900 to-fuchsia-800 opacity-95 z-0"></div>
            <GooeyBackground />
            
            <main className="container mx-auto max-w-7xl flex flex-col gap-16 relative z-10">

                {/* Hero Section */}
                <section className="text-center py-16 border-b border-blue-400/30">
                    <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tighter mb-6 text-blue-400 drop-shadow-xl">
                        บริการเว็บไซต์มืออาชีพ 👔
                    </h1>
                    <p className="text-xl sm:text-3xl font-light max-w-4xl mx-auto opacity-95 text-gray-200">
                        รับออกแบบและพัฒนาเว็บไซต์ด้วยมาตรฐานสูงสุด เพื่อให้เว็บไซต์ของคุณมีประสิทธิภาพและน่าเชื่อถือ
                    </p>
                </section>

                {/* ส่วนเนื้อหาหลัก - Glassmorphism */}
                <section className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 sm:p-12 shadow-[0_0_60px_rgba(100,200,255,0.15)] border border-white/30 transform transition duration-500 hover:scale-[1.01]">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-blue-300 border-b border-blue-300/50 pb-4">
                        คุณภาพคือหัวใจของความสำเร็จ
                    </h2>
                    <div className="space-y-8 text-lg text-gray-300 leading-relaxed">
                        <p>
                            ความเป็นมืออาชีพของเราไม่ได้จำกัดอยู่แค่การส่งมอบงาน แต่รวมถึง <span className="font-semibold text-yellow-300">กระบวนการที่โปร่งใส</span> การสื่อสารที่ชัดเจน และการเขียนโค้ดที่ถูกต้องตามหลักมาตรฐานสากล.
                        </p>
                        <blockquote className="border-l-4 border-blue-500 pl-6 py-2 italic text-gray-200 bg-black/10 p-4 rounded-lg">
                            <p>
                                <span className="font-extrabold text-xl text-blue-400">Microtronic</span> ใช้ <span className="font-bold text-lg text-white bg-blue-600/50 px-2 py-0.5 rounded">TypeScript</span> เพื่อลดข้อผิดพลาดในโค้ด และใช้สถาปัตยกรรม <span className="font-bold text-lg text-green-400">Next.js App Router</span> เพื่อสร้างโครงสร้างที่ <span className="font-bold text-lg text-pink-300">ปรับขนาดได้และดูแลรักษาง่าย</span> ในระยะยาว.
                            </p>
                        </blockquote>
                        <p>
                            เราให้ความสำคัญกับ <span className="font-semibold text-blue-300">ความปลอดภัย (Security)</span>, <span className="font-semibold text-blue-300">การเข้าถึง (Accessibility - WCAG)</span> และ <span className="font-semibold text-blue-300">SEO</span> ในทุกบรรทัดโค้ดที่พัฒนา.
                        </p>
                    </div>
                </section>

                {/* ประโยชน์หลัก (Grid) - ใช้ Card Component ที่เราสร้างไว้ */}
                <section className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
                    <Card icon="✅" title="คุณภาพโค้ดระดับโลก" description="การเขียนโค้ดที่สะอาด มีการทำ Document และใช้ Best Practices ของ Next.js และ Vercel ทำให้เว็บไซต์ของคุณเสถียรและยืดหยุ่น." />
                    <Card icon="🔒" title="ความปลอดภัยที่เชื่อถือได้" description="การใช้ TypeScript และการจัดการ Environment Variables อย่างเคร่งครัด รวมถึงการ Deploy บน Vercel ที่ปลอดภัย." />
                    <Card icon="📈" title="SEO และ Performance" description="เว็บไซต์ถูกออกแบบให้โหลดเร็วและรองรับ SEO ตั้งแต่เริ่มต้น ช่วยให้ธุรกิจของคุณเป็นที่รู้จักและเติบโตได้ง่ายขึ้น." />
                    <Card icon="👥" title="การทำงานร่วมกันอย่างมืออาชีพ" description="กระบวนการพัฒนาที่เป็นระบบ มีการวางแผนงาน (Agile/Scrum) และการสื่อสารที่รวดเร็วและตรงไปตรงมา." />
                </section>
                
                {/* Call to Action - ปุ่มที่มีสไตล์โดดเด่น */}
                <section className="text-center pt-8 pb-4">
                    <p className="text-2xl mb-8 font-light text-gray-100">
                        ยกระดับเว็บไซต์ของคุณสู่มาตรฐานองค์กรชั้นนำด้วยความเชี่ยวชาญจาก Microtronic
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block px-12 py-5 font-extrabold text-xl rounded-full text-white shadow-2xl transition duration-500 transform 
                                   bg-gradient-to-r from-blue-500 to-fuchsia-500 hover:from-fuchsia-500 hover:to-blue-500
                                   hover:scale-110 active:scale-105 active:shadow-inner tracking-wider ring-4 ring-blue-400/50 hover:ring-white/70"
                    >
                        เริ่มต้นความเป็นมืออาชีพ 💼
                    </Link>
                </section>

            </main>
        </div>
    );
}


// Component Card สำหรับการแสดงประโยชน์ (คัดลอกมาจากหน้าที่แล้วเพื่อให้ใช้งานได้ทันที)
interface CardProps {
    icon: string;
    title: string;
    description: string;
}

const Card = ({ icon, title, description }: CardProps) => (
    <div className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/10 hover:border-blue-500 transition duration-300 transform hover:-translate-y-2 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative">
            <div className="text-5xl mb-4 p-2 inline-block bg-blue-500/20 rounded-lg transform transition duration-300 group-hover:rotate-6">
                {icon}
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-blue-200 group-hover:text-white transition-colors duration-300">{title}</h3>
            <p className="opacity-80 text-gray-300">{description}</p>
        </div>
    </div>
);