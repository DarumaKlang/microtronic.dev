// components/NavBar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NAV_ITEMS, GRADIENT_TEXT_CLASS } from '@/constants/data';

const NavBar: React.FC = () => (
    <header className="fixed top-0 w-full z-50 bg-slate-900/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-linear-to-br from-pink-500 to-cyan-500 rounded flex items-center justify-center font-bold text-lg">
                    <Image src="/images/cyberpunk-logo.jpg" alt="Cyberpunk Microtronic Logo" width={32} height={32} />
                </div>
                <Link href="/" className="font-extrabold text-2xl tracking-tight hover:text-white transition duration-300">
                    Microtronic <span className={GRADIENT_TEXT_CLASS}>Dev</span>
                </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
                {NAV_ITEMS.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="text-gray-300 hover:text-white font-medium transition duration-300 hover:underline hover:underline-offset-4"
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>

            <Link
                href="/contact"
                className="px-4 py-2 text-sm md:px-6 md:py-3 md:text-lg font-bold rounded-full bg-pink-600 text-white hover:bg-pink-500 transition duration-300 transform active:scale-95 shadow-lg"
            >
                Start Project
            </Link>
        </div>
    </header>
);

export default NavBar;
