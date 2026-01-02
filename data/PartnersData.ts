export interface Partner {
    id: string;
    name: string;
    description: string;
    iconType: 'logo' | 'icon';
    iconUrl?: string; // For public logos
    category: 'Cloud' | 'Infrastructure' | 'Development' | 'AI' | 'OS';
}

export const PARTNERS_DATA: Partner[] = [
    {
        id: 'google',
        name: 'Google Cloud / AI Studio',
        description: 'Providing high-performance cloud infrastructure and generative AI models.',
        iconType: 'logo',
        category: 'Cloud',
    },
    {
        id: 'microsoft',
        name: 'Microsoft / Azure',
        description: 'Empowering our development with enterprise-grade solutions and tools.',
        iconType: 'logo',
        category: 'Cloud',
    },
    {
        id: 'vercel',
        name: 'Vercel',
        description: 'Our primary deployment platform for high-performance frontend applications.',
        iconType: 'logo',
        category: 'Development',
    },
    {
        id: 'github',
        name: 'GitHub',
        description: 'The world\'s leading software development and collaboration platform.',
        iconType: 'logo',
        category: 'Development',
    },
    {
        id: 'tailwind',
        name: 'Tailwind CSS',
        description: 'The utility-first CSS framework for rapid and consistent UI development.',
        iconType: 'logo',
        category: 'Development',
    },
    {
        id: 'ubuntu',
        name: 'Ubuntu / Canonical',
        description: 'The foundation for our high-performance server environments.',
        iconType: 'logo',
        category: 'OS',
    },
    {
        id: 'openai',
        name: 'OpenAI',
        description: 'Advanced AI models for enhancing our intelligent web solutions.',
        iconType: 'logo',
        category: 'AI',
    }
];
