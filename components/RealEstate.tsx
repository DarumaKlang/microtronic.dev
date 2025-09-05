// src/components/ServiceCard.tsx
import Image from 'next/image';
import Link from 'next/link';

interface ServiceCardProps {
    imageSrc: string;
    imageAlt: string;
    title: string;
    description: string;
    linkText: string;
    linkHref: string;
}

export const ServiceCard = ({
    imageSrc,
    imageAlt,
    title,
    description,
    linkText,
    linkHref,
}: ServiceCardProps) => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center p-8 bg-white rounded-lg shadow-lg max-w-7xl mx-auto">
            {/* Image Section */}
            <div className="relative w-full md:w-1/2 p-4">
                {/* The 'src' and 'alt' attributes will be passed as props */}
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    width={700}
                    height={400}
                    layout="responsive"
                    objectFit="contain"
                    className="rounded-lg"
                />
                {/* Background circle effect - requires a parent with relative positioning */}
                <div className="absolute inset-0 bg-blue-100 opacity-50 rounded-full blur-3xl -z-10" />
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 p-4 text-center md:text-left">
                <h2 className="text-3xl font-bold text-blue-800 mb-4">
                    {title}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                    {description}
                </p>
                <Link href={linkHref}>
                    <a className="inline-block px-6 py-3 border border-blue-500 text-blue-500 rounded-full font-medium transition-colors hover:bg-blue-500 hover:text-white">
                        {linkText}
                    </a>
                </Link>
            </div>
        </div>
    );
};