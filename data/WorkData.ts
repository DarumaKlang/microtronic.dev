// src/data/WorkData.ts หรือ app/data/WorkData.ts

export interface PerformanceMetrics {
    // Time taken for the page to become interactive (in seconds)
    pageLoadTimeSeconds: number;
    // Google Lighthouse Performance Score (out of 100)
    lighthouseScore: number;
    // Monthly Traffic or supported concurrent users (e.g., "150k Users/Month")
    trafficSupport: string;
}

export interface WorkExample {
    slug: string;
    title: string;
    summary: string;
    fullContent: string;
    // New Required Field: Performance Metrics
    metrics: PerformanceMetrics;
}

export const WORK_DATA: WorkExample[] = [
    {
        slug: 'vessuyan',
        title: 'Vessuyan (Trading Platform)',
        summary: 'A high-performance SaaS platform built for real-time data analysis.',
        fullContent: 'Vessuyan is built on a custom Next.js stack utilizing Server Components for optimal data loading...',
        metrics: {
            pageLoadTimeSeconds: 0.85,
            lighthouseScore: 98,
            trafficSupport: '150,000 Users/Month',
        },
    },
    {
        slug: 'hostel-in-the-city',
        title: 'Hostel In The City (Booking System)',
        summary: 'A fast and secure booking system solution for the hospitality industry.',
        fullContent: 'Optimized for fast mobile bookings and integrated with third-party payment gateways.',
        metrics: {
            pageLoadTimeSeconds: 1.2,
            lighthouseScore: 92,
            trafficSupport: '5,000 Bookings/Month',
        },
    },
    {
        slug: 'vcomm-lighting',
        title: 'Vcomm Lighting (Corporate Website)',
        summary: 'A modern corporate showcase website with deep SEO integration.',
        fullContent: 'Redesigned for better conversion and information accessibility.',
        metrics: {
            pageLoadTimeSeconds: 0.95,
            lighthouseScore: 95,
            trafficSupport: '10,000 Organic Visitors/Month',
        },
    },
];