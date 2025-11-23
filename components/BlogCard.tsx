// src/components/BlogCard.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { WorkExample } from './WorkData'; // นำเข้า Interface

interface BlogCardProps {
    work: WorkExample;
}

const BlogCard: React.FC<BlogCardProps> = ({ work }) => {
    // ลิงก์ไปยัง Dynamic Route: /portfolio/[slug]
    const detailLink = `/portfolio/${work.slug}`; 

    return (
        <Link 
            href={detailLink} 
            className="block rounded-lg overflow-hidden shadow-xl transform transition-transform duration-300 hover:scale-[1.03] hover:shadow-fuchsia-500/50 bg-gray-800 border border-gray-700 hover:border-fuchsia-500"
        >
            <div className="relative w-full aspect-video bg-gray-700">
                <Image
                    src={work.src}
                    alt={work.alt}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="transition-opacity duration-500"
                />
            </div>
            <div className="p-6 text-left">
                <h4 className="text-xl font-bold mb-2 text-fuchsia-400 truncate">
                    {work.alt}
                </h4>
                <p className="text-sm text-gray-300 mb-4 line-clamp-3">
                    {work.summary}
                </p>
                <div className="text-fuchsia-500 font-semibold hover:text-fuchsia-400 transition-colors">
                    อ่านข้อมูลโครงการ →
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;