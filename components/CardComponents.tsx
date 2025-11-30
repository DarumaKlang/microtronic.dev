// components/CardComponents.tsx
import React from 'react';
import { MessageCircle } from 'lucide-react'; 
// นำเข้า CLASS ที่แชร์กันมาจากไฟล์ Constants
import { GLASS_PANEL_CLASS } from '@/constants/data'; 

// --- 3. PRESENTATIONAL COMPONENTS ---

// Component 3.1: TestimonialCard
export interface TestimonialCardProps {
    quote: string;
    name: string;
    title: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, title }) => (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-2xl transition-all hover:scale-[1.02] transform duration-300">
        <MessageCircle className="w-8 h-8 text-fuchsia-400 mb-4" />
        {/* ใช้ &quot; เพื่อป้องกัน react/no-unescaped-entities */}
        <p className="text-lg italic mb-4">&quot;{quote}&quot;</p>
        <div className="text-right">
            <p className="font-bold text-lg">{name}</p>
            <p className="text-sm text-gray-300">{title}</p>
        </div>
    </div>
);

// Component 3.2: FeatureItem
export interface FeatureItemProps {
    // แก้ไข Type ให้ถูกต้องสำหรับ Lucide Icons เพื่อป้องกัน Error/Warning
    icon: React.FC<React.SVGProps<SVGSVGElement>>; 
    title: string;
    description: string;
    colorClass: string;
    hoverBorder: string;
}

export const FeatureItem: React.FC<FeatureItemProps> = ({ icon: Icon, title, description, colorClass, hoverBorder }) => (
    // ใช้ GLASS_PANEL_CLASS ที่ Import มา
    <div className={`flex flex-col items-start text-left p-8 rounded-3xl transition-all duration-300 transform hover:translate-y-[-5px] hover:${hoverBorder} ${GLASS_PANEL_CLASS}`}>
        <Icon className={`w-10 h-10 mb-4 ${colorClass}`} />
        <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-gray-400">{description}</p>
    </div>
);