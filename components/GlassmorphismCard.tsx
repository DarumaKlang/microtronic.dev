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
        bg-white bg-opacity-10
        backdrop-filter backdrop-blur-lg
        border border-opacity-20 border-white
        rounded-xl
        shadow-lg
        p-6
        ${className || ''}
      `}
    >
      {children}
    </div>
  );
};

export default GlassmorphismCard;
