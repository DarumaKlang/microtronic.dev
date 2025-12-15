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
        subtitle: "พร้อมใช้งานทันที (Instant Launch)",
        description: "บริการจำหน่าย Website Templates คุณภาพสูงที่สร้างด้วย Next.js และ Tailwind CSS ที่ผ่านการปรับจูน Performance และ SEO มาแล้ว พร้อมใช้งานสำหรับธุรกิจหลากหลายประเภท ไม่ว่าจะเป็น E-commerce, Portfolio, หรือ Corporate Website",
        keyBenefits: ["Premium Design: ดีไซน์สวยงาม ทันสมัย และ Responsive", "SEO Ready: โครงสร้างรองรับ SEO 100% เริ่มต้นธุรกิจได้ทันที"],
        link: "https://microtronic-template.vercel.app/",
        linkText: "เลือกซื้อ Template",
    },
};

export const NAV_ITEMS = [
    { label: "คุณสมบัติ", href: "#features" },
    { label: "บริการ", href: "#services" },
    { label: "Templates Shop", href: "https://microtronic-template.vercel.app/" },
    { label: "ราคา/Pricing", href: "/pricing" },
    { label: "คำรับรอง", href: "#testimonials" },
    { label: "ติดต่อ", href: "contact" },
];

export const GRADIENT_TEXT_CLASS = "bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400";
export const GLASS_PANEL_CLASS = "bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg";