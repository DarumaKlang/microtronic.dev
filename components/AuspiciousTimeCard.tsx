// src/components/AuspiciousTimeCard.tsx
import React from 'react';

interface AuspiciousTimeCardProps {
    time: string;
    auspicious: string;
    samTaUp?: string;
    samTaRam?: string;
}

const AuspiciousTimeCard: React.FC<AuspiciousTimeCardProps> = ({
    time,
    auspicious,
    samTaUp,
    samTaRam
}) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md text-purple-600">
            <p className="font-bold text-lg">{time}</p>
            <p className="text-gray-600 text-sm mt-2">{auspicious}</p>

            {samTaUp && (
                <div className="mt-4 border-t pt-2">
                    <p className="font-bold text-base text-purple-600">ยามสามตา:</p>
                    <p className="text-sm text-gray-700">ข้างขึ้น: {samTaUp}</p>
                    <p className="text-sm text-gray-700">ข้างแรม: {samTaRam}</p>
                </div>
            )}
        </div>
    );
};

export default AuspiciousTimeCard;