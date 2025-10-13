// src/components/HomeFooterLinks.tsx
import React from 'react';

/**
 * Component สำหรับแสดงลิงก์ส่วนท้ายของหน้าหลัก
 * ใช้ Bootstrap Icons และคลาส Tailwind CSS สำหรับจัดรูปแบบ
 */
export default function HomeFooterLinks() {
    return (
        <footer className="w-full flex flex-col sm:flex-row items-center justify-center sm:justify-between row-start-3 max-w-7xl text-xs text-center opacity-75 gap-2 sm:gap-0">
            {/* Link 1: Learn (bi-file-earmark-text) */}
            <a
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
            >
                <i
                    aria-hidden
                    className="bi bi-file-earmark-text text-white text-base"
                ></i>
                Learn
            </a>

            {/* Link 2: Examples (bi-window) */}
            <a
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
            >
                <i
                    aria-hidden
                    className="bi bi-window text-white text-base"
                ></i>
                Examples
            </a>

            {/* Link 3: Go to nextjs.org → (bi-globe) */}
            <a
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
            >
                <i
                    aria-hidden
                    className="bi bi-globe text-white text-base"
                ></i>
                Go to nextjs.org →
            </a>
        </footer>
    );
}