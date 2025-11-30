import React, { HTMLAttributes, PropsWithChildren } from 'react';

// FIX: Extend HTMLAttributes<HTMLDivElement> เพื่อรับ className และ props HTML อื่นๆ
export interface GlassmorphismCardProps extends HTMLAttributes<HTMLDivElement> {}

export default function GlassmorphismCard({ 
    className, 
    children, 
    ...rest 
}: PropsWithChildren<GlassmorphismCardProps>) {

    // สไตล์ Glassmorphism หลัก
    const defaultStyles = "bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg";

    return (
        <div 
            className={`${defaultStyles} ${className}`} 
            {...rest} 
        >
            {children}
        </div>
    );
}