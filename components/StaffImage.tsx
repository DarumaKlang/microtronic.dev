'use client';

import Image from 'next/image';
import { useState } from 'react';
import { User } from 'lucide-react';

interface StaffImageProps {
    username: string;
    name: string;
    size: 'small' | 'large';
}

export const StaffImage: React.FC<StaffImageProps> = ({ username, name, size }) => {
    const [imgError, setImgError] = useState(false);

    const sizeClasses = size === 'large' ? 'w-48 h-48 rounded-3xl' : 'w-32 h-32 rounded-full';
    const iconSize = size === 'large' ? 'w-24 h-24' : 'w-16 h-16';

    return (
        <div className={`relative ${sizeClasses} overflow-hidden border-4 border-blue-500/30 bg-slate-800 flex items-center justify-center transition-colors group-hover:border-blue-500`}>
            {!imgError ? (
                <Image
                    src={`https://github.com/${username}.png`}
                    alt={name}
                    fill
                    className="object-cover"
                    onError={() => setImgError(true)}
                />
            ) : (
                <User className={`${iconSize} text-slate-500`} />
            )}
        </div>
    );
};
