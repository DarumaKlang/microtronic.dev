// app/page.tsx
'use client';

// --- 1. Imports ---
import React, { useState } from 'react';
// Import Icons: ลบไอคอนที่ไม่ได้ใช้ เช่น MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Code
import { Sparkles, Zap, Shield, MessageCircle } from 'lucide-react'; 
// นำเข้า GooeyBackground Component
import GooeyBackground from '@/components/GooeyBackground'; 

// --- 2. DATA & CONSTANTS ---
// Service Data Structure
interface ServiceDetail {
    title: string;
    subtitle: string;
    description: string;
    keyBenefits: string[];
}

interface ServiceDataMap {
    [key: string]: ServiceDetail;
}

const SERVICES_DATA: ServiceDataMap = {
    nextjs: {
        title: "Next.js / SSR",
        subtitle: "ประสิทธิภาพระดับจรวด (Extreme Speed)",
        // แก้ไข: Escape อัญประกาศคู่ (") เป็น &quot;
        description: "เราใช้ Next.js เพื่อให้เว็บไซต์ของคุณมีการทำ SSR หรือ Static Generation ที่สมบูรณ์แบบ ส่งผลให้เว็บไซต์โหลดเร็วอย่างน่าทึ่ง และ Google สามารถจัดทำดัชนี (Index) ได้ดีกว่าเว็บไซต์ที่ใช้ Client-Side Rendering ทั่วไปอย่างมาก เหมาะสำหรับ E-commerce และ Landing Page ที่ต้องการ Conversion สูงสุด",
        // แก้ไข: Escape อัญประกาศคู่ (") เป็น &quot;
        keyBenefits: ["Extreme Speed: ประสิทธิภาพเหนือกว่า Framework ทั่วไป 2.5 เท่า", "Built-in SEO: โครงสร้างรองรับการทำ SEO แบบ Native"],
    },
    typescript: {
        title: "TypeScript Mastery",
        subtitle: "ความเสถียรที่ไร้กังวล (Reliable & Maintainable)",
        // แก้ไข: Escape อัญประกาศคู่ (") เป็น &quot;
        description: "TypeScript ช่วยให้เราสามารถระบุและแก้ไขข้อผิดพลาดของโค้ดตั้งแต่ขั้นตอนการพัฒนา ทำให้ลด Runtime Error เมื่อระบบถูกใช้งานจริง และทำให้โค้ดเบสของคุณสะอาด ถูกต้องตาม Type ที่กำหนด ทำให้ง่ายต่อการบำรุงรักษาและขยายระบบในอนาคต แม้ทีมงานจะเติบโตขึ้น",
        // แก้ไข: Escape อัญประกาศคู่ (") เป็น &quot;
        keyBenefits: ["Zero Type Errors: มั่นใจว่าข้อมูลเข้า-ออกถูกต้องตามที่คาดไว้เสมอ", "Future-Proof: โค้ดที่เขียนง่ายต่อการส่งมอบและบำรุงรักษาโดยทีมอื่น"],
    },
};

const GRADIENT_TEXT_CLASS = "bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400";
const GLASS_PANEL_CLASS = "bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg";


// --- 3. PRESENTATIONAL COMPONENTS ---

// Component 3.1: TestimonialCard
interface TestimonialCardProps {
    quote: string;
    name: string;
    title: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, title }) => (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-2xl transition-all hover:scale-[1.02] transform duration-300">
        <MessageCircle className="w-8 h-8 text-fuchsia-400 mb-4" />
        {/* แก้ไข: Escape อัญประกาศคู่ (") เป็น &quot; */}
        <p className="text-lg italic mb-4">&quot;{quote}&quot;</p>
        <div className="text-right">
            <p className="font-bold text-lg">{name}</p>
            <p className="text-sm text-gray-300">{title}</p>
        </div>
    </div>
);

// Component 3.2: FeatureItem
interface FeatureItemProps {
    // แก้ไข: กำหนด Type ที่ชัดเจนแทน any
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    title: string;
    description: string;
    colorClass: string;
    hoverBorder: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon: Icon, title, description, colorClass, hoverBorder }) => (
    <div className={`flex flex-col items-start text-left p-8 rounded-3xl transition-all duration-300 transform hover:translate-y-[-5px] hover:${hoverBorder} ${GLASS_PANEL_CLASS}`}>
        <Icon className={`w-10 h-10 mb-4 ${colorClass}`} />
        <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-gray-400">{description}</p>
    </div>
);


// --- 4. LAYOUT COMPONENTS (Sections) ---

// Component 4.2: HeroSection
const HeroSection: React.FC = () => (
    <section className="text-center pt-8">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight max-w-4xl mx-auto">
            ยกระดับ <span className={GRADIENT_TEXT_CLASS}>Web Application</span> ของคุณด้วยเทคโนโลยีแห่งอนาคต
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mt-6 max-w-3xl mx-auto">
            Microtronic Dev. ผสาน <span className="text-cyan-400">Next.js</span> และ <span className="text-blue-400">TypeScript</span> เพื่อส่งมอบความเร็ว ความเสถียร และดีไซน์ระดับโลก
        </p>
        <a 
            href="#contact"
            className="inline-block mt-10 px-10 py-4 text-xl font-extrabold rounded-full bg-pink-600 text-white hover:bg-pink-500 transition duration-300 transform hover:scale-105 shadow-2xl shadow-pink-600/50"
        >
            รับแผนกลยุทธ์ฟรี
        </a>
    </section>
);

// Component 4.3: FeaturesSection
const FeaturesSection: React.FC = () => (
    <section id="features">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-200">ทำไมต้อง Microtronic?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureItem 
                icon={Zap} 
                title="ประสิทธิภาพระดับจรวด" 
                description="สร้างด้วย Next.js และ Vercel เพื่อความเร็วในการโหลดที่เหนือกว่า, SEO ที่ยอดเยี่ยม และคะแนน Lighthouse 100/100"
                colorClass="text-pink-400"
                hoverBorder="border-pink-500/50"
            />
            <FeatureItem 
                icon={Shield} 
                title="ความเสถียรที่ไร้กังวล" 
                description="ใช้ TypeScript อย่างเคร่งครัด ลด Bug ใน Production ได้มากกว่า 38% ทำให้ระบบมีความน่าเชื่อถือและบำรุงรักษาง่ายในระยะยาว"
                colorClass="text-cyan-400"
                hoverBorder="border-cyan-500/50"
            />
            <FeatureItem 
                icon={Sparkles} 
                title="ดีไซน์ที่เปลี่ยนเป็นยอดขาย" 
                description="การออกแบบ UI/UX ระดับมืออาชีพที่ผ่านการวิเคราะห์ข้อมูล เน้นความสวยงาม ใช้งานง่าย และอัตราการแปลงที่สูง (Conversion Rate)"
                colorClass="text-purple-400"
                hoverBorder="border-purple-500/50"
            />
        </div>
    </section>
);

// Component 4.4: ServicesSection
interface ServicesSectionProps {
    services: ServiceDataMap;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
    const serviceKeys = Object.keys(services) as (keyof ServiceDataMap)[];
    const [activeService, setActiveService] = useState<keyof ServiceDataMap>(serviceKeys[0] || 'nextjs');
    const currentService = services[activeService];

    return (
        <section id="services">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-200">บริการของเราที่สร้างผลกระทบ</h2>
            <div className={`${GLASS_PANEL_CLASS} p-8 rounded-3xl`}>
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {serviceKeys.map((key) => {
                        const isActive = activeService === key;
                        const buttonClass = isActive 
                            ? 'bg-pink-600 text-white shadow-xl shadow-pink-600/30'
                            : 'bg-transparent border border-gray-600 text-gray-300 hover:bg-white/10';

                        return (
                            <button
                                key={key}
                                onClick={() => setActiveService(key)}
                                className={`px-8 py-3 rounded-full font-semibold text-lg transition-all ${buttonClass}`}
                            >
                                {services[key].title}
                            </button>
                        );
                    })}
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 min-h-[300px] animate-in fade-in duration-500">
                    <h3 className="text-4xl font-extrabold text-pink-400">{currentService.title}</h3>
                    <p className="text-xl font-semibold text-cyan-400 mb-4">{currentService.subtitle}</p>
                    <p className="text-gray-300 mb-6">{currentService.description}</p>
                    
                    <h4 className="text-lg font-bold text-white mb-2">ประโยชน์หลัก:</h4>
                    <ul className="space-y-2 text-gray-400 list-inside">
                        {currentService.keyBenefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <span className="text-green-400 text-lg">✓</span> 
                                <span>{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

// Component 4.5: TestimonialsSection
const TestimonialsSection: React.FC = () => (
    <section id="testimonials">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-200">พวกเขาพูดถึงเรา</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
                quote="เว็บไซต์ที่สร้างโดย Microtronic มีประสิทธิภาพสูงและส่งผลต่อยอดขายอย่างชัดเจน การร่วมงานราบรื่นและมืออาชีพมาก"
                name="อัญชลี จ."
                title="ผู้ก่อตั้ง E-commerce Platform"
            />
            <TestimonialCard
                quote="การทำงานด้าน UX นั้นยอดเยี่ยม เว็บไซต์ที่ได้มาเหนือความคาดหวังและใช้งานได้จริง"
                name="ดารารัตน์ ช."
                title="เจ้าของธุรกิจ E-learning"
            />
            <TestimonialCard
                quote="การย้ายระบบมาใช้ Next.js/Vercel โดย Microtronic ทำให้ต้นทุนลดลงและประสิทธิภาพเพิ่มขึ้นอย่างมาก"
                name="พงศกร ส."
                title="ผู้บริหารด้าน IT"
            />
        </div>
    </section>
);

// Component 4.6: CTASection
const CTASection: React.FC = () => (
    <section id="contact" className="text-center bg-fuchsia-700 p-12 rounded-2xl shadow-2xl transform transition-all duration-500 hover:shadow-fuchsia-400/50">
        <h2 className="text-4xl font-bold mb-4">หยุดคาดเดา เริ่มสร้างผลลัพธ์</h2>
        <p className="text-xl mb-6 text-gray-200">ติดต่อเราวันนี้ เพื่อรับการวิเคราะห์เว็บไซต์และแผนกลยุทธ์การพัฒนาที่ออกแบบมาเพื่อคุณโดยเฉพาะ</p>
        <a 
            href="#" 
            className="px-10 py-4 text-xl font-extrabold rounded-full bg-white text-fuchsia-700 hover:bg-gray-100 transition duration-300 transform hover:scale-110 shadow-lg"
        >
            คุยกับผู้เชี่ยวชาญของเรา
        </a>
    </section>
);


// --- 5. MAIN APPLICATION COMPONENT (Home) ---

export default function Home() {
    return (
        // ใช้ Custom Color Gradient: from-bg-start, to-bg-end (กำหนดใน tailwind.config.ts)
        <div className="font-sans min-h-screen p-8 sm:p-20 bg-linear-to-br from-bg-start via-indigo-900 to-bg-end text-white pt-[120px] pb-[100px] relative">
            
            {/* **เพิ่ม GooeyBackground Component ตาม Guideline** */}
            <GooeyBackground />
            
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 mt-8 relative z-10">
                <HeroSection />
                <FeaturesSection />
                <ServicesSection services={SERVICES_DATA} />
                <TestimonialsSection />
                <CTASection />
            </main>
        </div>
    );
}