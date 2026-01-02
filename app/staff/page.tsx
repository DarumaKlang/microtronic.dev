import React from 'react';
import GooeyBackground from '@/components/GooeyBackground';
import { STAFF_DATA } from '@/data/StaffData';
import { StaffCard } from '@/components/StaffCard';
import { GRADIENT_TEXT_CLASS } from '@/constants/data';

export const metadata = {
    title: 'Our Staff - Microtronic',
    description: 'Meet the team behind Microtronic high-performance web solutions.',
};

export default function StaffPage() {
    return (
        <div className="min-h-screen bg-slate-900 text-white pt-32 pb-16 relative overflow-hidden">
            <GooeyBackground />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <header className="text-center mb-16 space-y-4">
                    <h1 className={`text-5xl font-extrabold tracking-tight sm:text-7xl ${GRADIENT_TEXT_CLASS}`}>
                        Our Dedicated Team
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        A group of 11+ passionate creators pushing the boundaries of what's possible in web and IoT technology.
                    </p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {STAFF_DATA.map((staff) => (
                        <StaffCard key={staff.id} staff={staff} />
                    ))}
                </div>
            </main>
        </div>
    );
}
