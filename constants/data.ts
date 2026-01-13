// constants/data.ts

// Service Data Structure
export interface ServiceDetail {
    title: string;
    subtitle: string;
    description: string;
    keyBenefits: string[];
    link?: string; // Optional link for CTA
    linkText?: string; // Optional text for CTA button
}

export interface ServiceDataMap {
    [key: string]: ServiceDetail;
}

export const SERVICES_DATA: ServiceDataMap = {
    nextjs: {
        title: "Next.js / SSR",
        subtitle: "ประสิทธิภาพระดับจรวด (Extreme Speed)",
        description: "เราใช้ Next.js เพื่อให้เว็บไซต์ของคุณมีการทำ SSR หรือ Static Generation ที่สมบูรณ์แบบ ส่งผลให้เว็บไซต์โหลดเร็วอย่างน่าทึ่ง และ Google สามารถจัดทำดัชนี (Index) ได้ดีกว่าเว็บไซต์ที่ใช้ Client-Side Rendering ทั่วไปอย่างมาก เหมาะสำหรับ E-commerce และ Landing Page ที่ต้องการ Conversion สูงสุด",
        keyBenefits: ["Extreme Speed: ประสิทธิภาพเหนือกว่า Framework ทั่วไป 2.5 เท่า", "Built-in SEO: โครงสร้างรองรับการทำ SEO แบบ Native"],
    },
    typescript: {
        title: "TypeScript Mastery",
        subtitle: "ความเสถียรที่ไร้กังวล (Reliable & Maintainable)",
        description: "TypeScript ช่วยให้เราสามารถระบุและแก้ไขข้อผิดพลาดของโค้ดตั้งแต่ขั้นตอนการพัฒนา ทำให้ลด Runtime Error เมื่อระบบถูกใช้งานจริง และทำให้โค้ดเบสของคุณสะอาด ถูกต้องตาม Type ที่กำหนด ทำให้ง่ายต่อการบำรุงรักษาและขยายระบบในอนาคต แม้ทีมงานจะเติบโตขึ้น",
        keyBenefits: ["Zero Type Errors: มั่นใจว่าข้อมูลเข้า-ออกถูกต้องตามที่คาดไว้เสมอ", "Future-Proof: โค้ดที่เขียนง่ายต่อการส่งมอบและบำรุงรักษาโดยทีมอื่น"],
    },
    templates: {
        title: "Microtronic Templates",
        subtitle: "Future-Ready Architecture (Instant Launch)",
        description: "Website Templates ระดับ High-End ที่สร้างด้วย Next.js 15 และ Tailwind CSS ผ่านการรีดประสิทธิภาพ (Performance Optimization) และจัดการโครงสร้าง SEO ระดับ Advanced พร้อมสำหรับการ Scale ธุรกิจในยุค Digital Transformation",
        keyBenefits: ["Enterprise-Grade Code: สถาปัตยกรรมที่สะอาดและขยายได้จริง", "SEO 2.0: โครงสร้างรองรับ algorithms ล่าสุดของ Search Engines"],
        link: "https://microtronic-template.vercel.app/",
        linkText: "สำรวจ Template Store",
    },
};

export const NAV_ITEMS = [
    { label: "บริการ", href: "/service" },
    { label: "สินค้า", href: "/products" },
    { label: "ผลงาน", href: "/portfolio" },
    { label: "ทีมงาน", href: "/staff" },
    { label: "Ecosystem", href: "/ecosystem" },
    { label: "Templates Shop", href: "https://microtronic-template.vercel.app/" },
    { label: "ราคา/Pricing", href: "/pricing" },
    { label: "AI Speak", href: "/speak" },
    { label: "ติดต่อ", href: "/contact" },
];

export const GRADIENT_TEXT_CLASS = "bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400";
export const GLASS_PANEL_CLASS = "bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg";

// ===== SERVICE PAGE DATA STRUCTURES =====

// Template Group (Group I) - Self-Service Solutions
export interface Template {
    id: string;
    name: string;
    tagline: string;
    description: string;
    price: number;
    currency: string;
    features: string[];
    previewImage: string;
    demoLink?: string;
    purchaseLink: string;
}

export const TEMPLATE_GROUP_DATA = {
    headline: "เริ่มต้นธุรกิจออนไลน์ใน 24 ชั่วโมง",
    subheadline: "ด้วย Next.js Templates พรีเมียม เริ่มต้นเพียง 5,000 บาท",
    description: "Templates คุณภาพสูงที่พร้อมใช้งานทันที สร้างด้วย Next.js, TypeScript และ Tailwind CSS ผ่านการปรับจูน Performance และ SEO มาแล้ว ประหยัดเวลาและค่าใช้จ่ายในการพัฒนาได้มากกว่า 80%",
    ctaText: "เลือกซื้อ Template เลย →",
    ctaLink: "https://microtronic-template.vercel.app/",
    benefits: [
        "💰 ประหยัดต้นทุนพัฒนากว่า 50,000+ บาท",
        "⚡ ติดตั้งและใช้งานได้ภายใน 24 ชั่วโมง",
        "🎨 ดีไซน์สวยงาม ทันสมัย และ Responsive 100%",
        "🔍 SEO Ready - โครงสร้างรองรับ Google Search",
        "📱 ใช้งานได้ทุกอุปกรณ์ (Mobile, Tablet, Desktop)",
        "🔧 ซอร์สโค้ดครบถ้วน พร้อมคู่มือติดตั้ง",
    ]
};

export const TEMPLATES_SHOWCASE: Template[] = [
    {
        id: "template-basic",
        name: "Template Basic",
        tagline: "เหมาะสำหรับ SMEs และ Freelancers",
        description: "Landing Page สวยงามสำหรับธุรกิจขนาดเล็กถึงกลาง พร้อม Portfolio Section และ Contact Form (E-commerce เป็นบริการแยกต่างหาก)",
        price: 5000,
        currency: "THB",
        features: [
            "Landing Page แบบ Single & Multi-page",
            "Portfolio/Product Showcase Section",
            "Contact Form พร้อม Email Integration",
            "Responsive Design 100%",
            "SEO Optimized",
            "Dark Mode Support"
        ],
        previewImage: "/templates/basic-preview.png",
        demoLink: "https://microtronic-template.vercel.app/",
        purchaseLink: "https://microtronic-template.vercel.app/templates/basic"
    },
    // เพิ่ม Templates อื่นๆ ในอนาคต
];

// Template Package Combos (เซ็ตคอมโบสุดคุ้ม)
export interface PackageCombo {
    id: string;
    name: string;
    icon: string;
    tagline: string;
    price: number;
    originalPrice: number;
    savings: number;
    recommended?: boolean;
    targetCustomer: string;
    includes: {
        item: string;
        value: number;
        description: string;
    }[];
    features: string[];
    ctaText: string;
    ctaLink: string;
}

export const PACKAGE_COMBOS: PackageCombo[] = [
    {
        id: "starter",
        name: "เซ็ต Starter",
        icon: "🚀",
        tagline: "พร้อมติดตั้ง - เว็บขึ้นทันที",
        price: 7990,
        originalPrice: 8500,
        savings: 510,
        targetCustomer: "ธุรกิจขนาดเล็กที่ไม่ถนัดโค้ด ต้องการเว็บขึ้นออนไลน์ทันที",
        includes: [
            {
                item: "Template Next.js",
                value: 5000,
                description: "Source Code Template คุณภาพสูง"
            },
            {
                item: "ติดตั้งมาตรฐาน",
                value: 2000,
                description: "ติดตั้งและ Deploy บน Vercel/Netlify"
            },
            {
                item: "จัดการ Domain & Hosting",
                value: 1500,
                description: "ตั้งค่า Domain/SSL พื้นฐาน (ไม่รวมค่า Domain/Hosting จริง)"
            }
        ],
        features: [
            "✅ เว็บไซต์พร้อมใช้งานภายใน 1-2 วัน",
            "✅ Deploy บน Vercel (Free Hosting)",
            "✅ SSL Certificate ฟรี",
            "✅ Custom Domain Setup",
            "✅ คู่มือการใช้งานพื้นฐาน"
        ],
        ctaText: "สั่งซื้อเซ็ต Starter",
        ctaLink: "https://microtronic-template.vercel.app/"
    },
    {
        id: "business",
        name: "เซ็ต Business",
        icon: "✨",
        tagline: "พร้อมจัดการ - อัปเดตง่าย",
        price: 12900,
        originalPrice: 13500,
        savings: 600,
        recommended: true,
        targetCustomer: "ผู้ที่ต้องการให้เว็บพร้อมใช้งานระยะยาว พร้อมระบบจัดการเนื้อหา",
        includes: [
            {
                item: "Template Next.js",
                value: 5000,
                description: "Source Code Template"
            },
            {
                item: "ติดตั้งมาตรฐาน",
                value: 2000,
                description: "ติดตั้งและ Deploy"
            },
            {
                item: "เชื่อมต่อ Headless CMS",
                value: 4000,
                description: "ตั้งค่า Sanity/Contentful/Strapi"
            },
            {
                item: "จัดการ Domain & Hosting",
                value: 1500,
                description: "ตั้งค่า Domain/SSL พื้นฐาน"
            },
            {
                item: "การแก้ไขเล็กน้อย",
                value: 1000,
                description: "แก้ไข/ปรับแต่งโค้ดเล็กน้อย (ไม่เกิน 1 ชม.)"
            }
        ],
        features: [
            "✅ ทุกอย่างใน Starter Package",
            "✅ Headless CMS Integration (อัปเดตเนื้อหาง่าย)",
            "✅ Admin Dashboard สำหรับจัดการข้อมูล",
            "✅ การปรับแต่งโค้ดตามต้องการ (1 ชม.)",
            "✅ Training การใช้งาน CMS (30 นาท)"
        ],
        ctaText: "สั่งซื้อเซ็ต Business",
        ctaLink: "https://microtronic-template.vercel.app/"
    },
    {
        id: "premium",
        name: "เซ็ต Premium",
        icon: "💎",
        tagline: "รายปี - ไร้กังวล",
        price: 22900,
        originalPrice: 24500,
        savings: 1600,
        targetCustomer: "องค์กรที่ต้องการความมั่นใจ มีคนดูแลตลอดปี และไม่ต้องกังวลเรื่องเทคนิค",
        includes: [
            {
                item: "Template Next.js",
                value: 5000,
                description: "Source Code Template"
            },
            {
                item: "ติดตั้งมาตรฐาน",
                value: 2000,
                description: "ติดตั้งและ Deploy"
            },
            {
                item: "เชื่อมต่อ Headless CMS",
                value: 4000,
                description: "ตั้งค่า Headless CMS"
            },
            {
                item: "ดูแลและบำรุงรักษา 1 ปี",
                value: 12000,
                description: "อัปเดต Dependencies, แก้ไขบั๊ก, ตรวจสอบความปลอดภัย"
            },
            {
                item: "จัดการ Domain & Hosting",
                value: 1500,
                description: "ตั้งค่า Domain/SSL"
            }
        ],
        features: [
            "✅ ทุกอย่างใน Business Package",
            "✅ บำรุงรักษาตลอด 1 ปีเต็ม",
            "✅ อัปเดต Dependencies ทุกเดือน",
            "✅ แก้ไขบั๊กและปัญหาทางเทคนิค",
            "✅ ตรวจสอบความปลอดภัย (Security Audit)",
            "✅ Support ทาง Email/Line (ตอบภายใน 24 ชม.)",
            "✅ Monthly Report & Analytics"
        ],
        ctaText: "สั่งซื้อเซ็ต Premium",
        ctaLink: "/contact?package=premium"
    }
];

// Enterprise Group (Group II) - Custom Solutions
export interface EnterpriseFeature {
    icon: string;
    title: string;
    description: string;
    roi: string;
}

export const ENTERPRISE_GROUP_DATA = {
    headline: "ยกระดับธุรกิจด้วยโซลูชั่นที่ออกแบบเฉพาะองค์กร",
    subheadline: "เพิ่ม Conversion Rate 30%+ ด้วยระบบที่สร้างตรงตามความต้องการ",
    description: "Custom Enterprise Solution ที่ออกแบบและพัฒนาเฉพาะสำหรับองค์กรของคุณ ตอบโจทย์ทุกความต้องการทางธุรกิจ ด้วยทีมผู้เชี่ยวชาญที่มีประสบการณ์กว่า 10 ปี รับประกันผลลัพธ์ที่วัดผลได้จริง",
    ctaText: "นัดปรึกษาโซลูชั่นฟรี →",
    ctaLink: "/contact?type=enterprise",
    guarantees: [
        "🎯 รับประกัน ROI ภายใน 6 เดือน",
        "⚡ Performance สูงสุด - Load Time < 1.5s",
        "🔒 Security ระดับ Enterprise (SOC 2, GDPR Compliant)",
        "📈 Scalable Architecture รองรับการเติบโต",
        "🤝 Support 24/7 และ SLA Agreement",
        "💼 Training และ Documentation ครบถ้วน",
    ]
};

export const ENTERPRISE_FEATURES: EnterpriseFeature[] = [
    {
        icon: "🚀",
        title: "ประสิทธิภาพสูงสุด",
        description: "ระบบที่ออกแบบเฉพาะสำหรับ Traffic สูง รองรับผู้ใช้งานหลักแสนคนพร้อมกัน ด้วย Architecture แบบ Serverless และ CDN ระดับโลก",
        roi: "+30% Conversion Rate"
    },
    {
        icon: "💎",
        title: "UX/UI ที่โดดเด่น",
        description: "ดีไซน์ที่สร้างขึ้นจากการวิจัย User Behavior และ A/B Testing จริง เพิ่มอัตราการซื้อและลดอัตราการละทิ้งตะกร้าสินค้า",
        roi: "+45% User Engagement"
    },
    {
        icon: "🔗",
        title: "Integration แบบไร้รอยต่อ",
        description: "เชื่อมต่อกับระบบที่มีอยู่ของคุณได้ทั้งหมด (CRM, ERP, Payment Gateway, Analytics) ด้วย API ที่ออกแบบมาอย่างมืออาชีพ",
        roi: "-60% Manual Work"
    },
    {
        icon: "📊",
        title: "Analytics & Insights",
        description: "Dashboard และระบบรายงานที่ให้ข้อมูล Real-time ช่วยในการตัดสินใจทางธุรกิจด้วย Data-Driven Approach",
        roi: "+25% Better Decisions"
    },
    {
        icon: "🛡️",
        title: "ความปลอดภัยระดับสูง",
        description: "Security Architecture ที่ผ่านมาตรฐานสากล พร้อม Penetration Testing, Encryption, และ Compliance Certification",
        roi: "0% Security Incidents"
    },
    {
        icon: "⚙️",
        title: "Maintenance & Support",
        description: "ทีมงานพร้อมดูแลระบบตลอด 24/7 พร้อม SLA Agreement และ Incident Response Time < 15 นาที",
        roi: "99.9% Uptime"
    },
];

// Case Studies (Optional - สำหรับ Enterprise Section)
export const ENTERPRISE_CASE_STUDIES = [
    {
        company: "บริษัทค้าปลีกชั้นนำ",
        industry: "E-commerce",
        result: "เพิ่มยอดขายออนไลน์ 150% ภายใน 3 เดือน",
        challenge: "ระบบเดิมช้า โหลดนาน ลูกค้าละทิ้งตะกร้า",
        solution: "สร้าง Progressive Web App พร้อม Optimized Checkout Flow",
        metrics: {
            conversionIncrease: "+30%",
            loadTimeReduction: "-70%",
            cartAbandonmentReduction: "-40%"
        }
    },
    // เพิ่ม Case Studies อื่นๆ ในอนาคต
];