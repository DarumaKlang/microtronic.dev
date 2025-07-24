// components/GlassmorphismCard.tsx
import React from 'react';

interface GlassmorphismCardProps {
    children: React.ReactNode;
    className?: string;
}

const GlassmorphismCard: React.FC<GlassmorphismCardProps> = ({ children, className }) => {
    return (
        <div
            className={`
                relative
                // ใช้ Arbitrary values สำหรับ background-color
                bg-[rgba(255,255,255,0.10)] // สีขาวโปร่งใส 5%
                backdrop-filter backdrop-blur-3xl
                // ใช้ Arbitrary values สำหรับ border-color และความหนา
                border border-[rgba(255,255,255,0.15)] // ขอบสีขาวโปร่งใส 10%
                rounded-xl
                shadow-lg
                p-6
                ${className || ''}
            `}
            // ลบ style attribute ออกไป เพราะเราย้ายมาใช้คลาส Tailwind แล้ว
            // style={{
            //     backgroundColor: 'rgba(255, 255, 255, 0.05)',
            //     border: '1px solid rgba(255, 255, 255, 0.1)',
            // }}
        >
            {children}
        </div>
    );
};

export default GlassmorphismCard;
