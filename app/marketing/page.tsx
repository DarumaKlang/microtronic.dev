// app/marketing/page.tsx
'use client';

// การนำเข้า Component และ Icon
// ตรวจสอบให้แน่ใจว่า path สำหรับ GooeyBackground ถูกต้องตามการตั้งค่า path alias ของคุณ (เช่น '@/components/GooeyBackground')
import GooeyBackground from '@/components/GooeyBackground'; 
import { Sparkles, Zap, Shield, Rocket, MessageCircle } from 'lucide-react'; // ใช้ lucide-react สำหรับไอคอน
import Link from 'next/link';

// Component ย่อย: Card สำหรับรีวิวลูกค้า
const TestimonialCard: React.FC<{ quote: string; name: string; title: string }> = ({ quote, name, title }) => (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-2xl transition-all hover:scale-[1.02] transform duration-300">
        <MessageCircle className="w-8 h-8 text-fuchsia-400 mb-4" />
        <p className="text-lg italic mb-4">"{quote}"</p>
        <div className="text-right">
            <p className="font-bold text-lg">{name}</p>
            <p className="text-sm text-gray-300">{title}</p>
        </div>
    </div>
);

// Component ย่อย: Feature Item สำหรับคุณสมบัติหลัก
const FeatureItem: React.FC<{ icon: React.FC<any>; title: string; description: string }> = ({ icon: Icon, title, description }) => (
    <div className="flex flex-col items-center text-center p-6 border border-white/20 rounded-xl bg-white/5 backdrop-blur-sm shadow-lg hover:bg-white/10 transition duration-300">
        <Icon className="w-10 h-10 text-cyan-400 mb-4" />
        <h3 className="text-2xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-300">{description}</p>
    </div>
);


// Component หลัก: Marketing Landing Page
export default function MarketingPage() {
    return (
        // การจัดวางเนื้อหา, โดยการใช้ Tailwind CSS utility classes และ GooeyBackground component
        <div className="font-sans min-h-screen p-8 mb-8 mt-8 sm:p-20 bg-gradient-to-br from-blue-980 via-blue-900 to-fuchsia-800 text-white pt-[120px] pb-[100px]">
            <GooeyBackground />

            <main className="container mx-auto max-w-7xl flex flex-col gap-24 relative z-10">

                {/* 1. HERO SECTION: พาดหัวที่ดึงดูดและ CTA เร่งด่วน */}
                <section className="text-center pt-10 pb-10">
                    <p className="text-fuchsia-400 uppercase tracking-widest text-sm mb-4 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 mr-2" />
                        Microtronic: พลังแห่ง Next.js และ Lightning Network
                    </p>
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                        สร้าง <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">แพลตฟอร์มระดับโลก</span> <br className="hidden md:inline" /> ที่พร้อมรับการเติบโต
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                        เราคือพันธมิตรในการสร้างโซลูชันดิจิทัลแห่งอนาคต ด้วยความเชี่ยวชาญในเทคโนโลยีล่าสุด เพื่อความเร็ว ความปลอดภัย และนวัตกรรมทางการเงิน
                    </p>
                    <div className="flex justify-center flex-wrap gap-4">
                        <Link 
                            href="/contact" 
                            className="px-8 py-3 text-lg font-bold rounded-full bg-cyan-500 hover:bg-cyan-600 transition duration-300 transform hover:scale-105 shadow-2xl shadow-cyan-500/50"
                        >
                            นัดปรึกษาฟรี! (CTA หลัก)
                        </Link>
                        <Link 
                            href="/asset" 
                            className="px-8 py-3 text-lg font-bold rounded-full border border-white/50 hover:bg-white/10 transition duration-300"
                        >
                            ดูผลงานที่ผ่านมา
                        </Link>
                    </div>
                </section>

                {/* 2. KEY FEATURES: แสดงคุณสมบัติหลักเพื่อสร้างความแตกต่าง */}
                <section>
                    <h2 className="text-4xl font-bold text-center mb-12">เอกลักษณ์ของ Microtronic</h2>
                    <div className="grid md:grid-cols-3 gap-10">
                        <FeatureItem
                            icon={Zap}
                            title="สุดยอดความเร็ว (Performance)"
                            description="ใช้ Vercel และ Next.js ในการ Deploy เว็บไซต์ให้โหลดเร็วที่สุดในทุกอุปกรณ์ ลด Bounce Rate และเพิ่ม SEO Score"
                        />
                        <FeatureItem
                            icon={Shield}
                            title="การชำระเงินแห่งอนาคต"
                            description="ผสานรวม Bitcoin/Lightning Network ผ่าน LNbits ทำให้เว็บไซต์ของคุณพร้อมสำหรับเศรษฐกิจดิจิทัลทั่วโลก"
                        />
                        <FeatureItem
                            icon={Rocket}
                            title="การพัฒนาที่ยืดหยุ่น"
                            description="ด้วย Typescript และ App Router ทำให้โค้ดสะอาด ปลอดภัย และปรับขนาดได้ง่าย รองรับการขยายตัวทางธุรกิจ"
                        />
                    </div>
                </section>

                {/* 3. TESTIMONIALS: สร้างความน่าเชื่อถือ (Social Proof) */}
                <section className="bg-white/5 backdrop-blur-sm p-12 rounded-2xl border border-white/20 shadow-inner">
                    <h2 className="text-4xl font-bold text-center mb-12">ลูกค้าของเราคือข้อพิสูจน์ถึงความสำเร็จ</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* ตัวอย่าง Testimonial 1 */}
                        <TestimonialCard
                            quote="โซลูชันที่รวดเร็วและเป็นมืออาชีพ! การทำ Transaction ผ่าน Lightning Network กลายเป็นเรื่องง่ายสำหรับธุรกิจของเรา"
                            name="ภาณุวัฒน์ ก."
                            title="CTO, บริษัท FinTech Start-up"
                        />
                        {/* ตัวอย่าง Testimonial 2 */}
                        <TestimonialCard
                            quote="ความใส่ใจในรายละเอียดของ UI/UX นั้นยอดเยี่ยม เว็บไซต์ที่ได้มาเหนือความคาดหวังและใช้งานได้จริง"
                            name="ดารารัตน์ ช."
                            title="เจ้าของธุรกิจ E-learning"
                        />
                        {/* ตัวอย่าง Testimonial 3 */}
                        <TestimonialCard
                            quote="การย้ายระบบมาใช้ Next.js/Vercel โดย Microtronic ทำให้ต้นทุนลดลงและประสิทธิภาพเพิ่มขึ้นอย่างมาก"
                            name="พงศกร ส."
                            title="ผู้บริหารด้าน IT"
                        />
                    </div>
                </section>

                {/* 4. FINAL CTA: กระตุ้นการดำเนินการครั้งสุดท้ายที่ชัดเจน */}
                <section className="text-center bg-fuchsia-700 p-12 rounded-xl shadow-2xl transform transition-all duration-500 hover:shadow-fuchsia-400/50">
                    <h2 className="text-4xl font-bold mb-4">หยุดคาดเดา เริ่มสร้างผลลัพธ์</h2>
                    <p className="text-xl mb-6">ติดต่อเราวันนี้ เพื่อรับการวิเคราะห์เว็บไซต์และแผนกลยุทธ์การพัฒนาที่ออกแบบมาเพื่อคุณโดยเฉพาะ</p>
                    <Link 
                        href="/contact" 
                        className="px-10 py-4 text-xl font-extrabold rounded-full bg-white text-fuchsia-700 hover:bg-gray-100 transition duration-300 transform hover:scale-110"
                    >
                        คุยกับผู้เชี่ยวชาญของเรา
                    </Link>
                </section>

            </main>
        </div>
    );
}