export interface ProjectStep {
    id: string;
    label: string;
    description: string;
    status: 'completed' | 'current' | 'upcoming';
}

export interface StaffProject {
    id: string;
    name: string;
    description: string;
    status: 'completed' | 'ongoing';
    repo?: string; // e.g., "DarumaKlang/microtronic.dev"
    steps?: ProjectStep[];
}

export interface StaffMember {
    id: string;
    name: string;
    role: string;
    githubUsername: string; // To fetch profile image: https://github.com/[username].png
    email?: string;
    bio: string;
    projects: StaffProject[];
}

export const STAFF_DATA: StaffMember[] = [
    {
        id: 'grids-micro',
        name: 'GridsMicro',
        role: 'Chief Executive Officer',
        githubUsername: 'GridsMicro',
        email: 'grids@microtronic.biz',
        bio: 'Leading the vision and strategy for Microtronic and its core platforms.',
        projects: [
            {
                id: 'p-smartfarm',
                name: 'Smart Farm Platform',
                description: 'The core platform for Microtronic Smart Farm solutions.',
                status: 'ongoing',
                repo: 'microtronic-thailand/smartfarm-platform'
            }
        ]
    },
    {
        id: 'daruma-klang',
        name: 'DarumaKlang',
        role: 'Lead Architect',
        githubUsername: 'DarumaKlang',
        email: 'k.net.game01@gmail.com',
        bio: 'ผู้ออกแบบและดูแลระบบหลักของ Microtronic.biz Official เน้นสถาปัตยกรรมประสิทธิภาพสูงและการส่งมอบโซลูชันที่ยั่งยืน',
        projects: [
            {
                id: 'p-micro-official',
                name: 'Microtronic.biz Official',
                description: 'V1.0 Released - ระบบเว็บหลักของบริษัทที่พัฒนาและปรับปรุงประสิทธิภาพอย่างต่อเนื่อง',
                status: 'ongoing',
                repo: 'DarumaKlang/microtronic.dev'
            }
        ]
    },
    {
        id: 'web-shardow',
        name: 'WebShardow',
        role: 'Full Stack Developer',
        githubUsername: 'WebShardow',
        email: 'gridsdev.web@gmail.com',
        bio: 'Expert in high-performance web accounting and formula engines.',
        projects: [
            {
                id: 'p-acc-main',
                name: 'Micro Account',
                description: 'The primary accounting platform developed with Next.js.',
                status: 'completed',
                repo: 'microtronic-thailand/nextjs-micro-account'
            },
            {
                id: 'p-formula',
                name: 'Micro Formula Engine',
                description: 'High-performance engine for manufacturing formulas.',
                status: 'ongoing',
                repo: 'microtronic-thailand/app-micro-formula'
            },
            {
                id: 'p-formula-engine',
                name: 'Formula Core Engine',
                description: 'The backend calculation engine for micro formula.',
                status: 'ongoing',
                repo: 'microtronic-thailand/app-micro-formula-engins'
            },
            {
                id: 'p-formula-docs',
                name: 'Formula Dev Docs',
                description: 'Technical documentation for the formula ecosystem.',
                status: 'ongoing',
                repo: 'microtronic-thailand/app-micro-formula-dev-docs'
            },
            {
                id: 'p-formula-manual',
                name: 'Formula Manual',
                description: 'User manual and instructional guides.',
                status: 'ongoing',
                repo: 'microtronic-thailand/app-micro-formula-manual-docs'
            }
        ]
    },
    {
        id: 'iamdevweb',
        name: 'IAmDevWeb',
        role: 'Staff Developer',
        githubUsername: 'IAmDevWeb',
        email: 'k.net.game03@gmail.com',
        bio: 'Specialist in modern web interfaces.',
        projects: []
    },
    {
        id: 'grids-web',
        name: 'GridsWeb',
        role: 'Staff Developer',
        githubUsername: 'GridsWeb',
        email: 'grids.web@gmail.com',
        bio: 'Developer building interconnected web solutions.',
        projects: []
    },
    {
        id: 'micro-app-design',
        name: 'MicroAppDesign',
        role: 'UI/UX Designer & Developer',
        githubUsername: 'MicroAppDesign',
        email: 'grids.bitcoin@gmail.com',
        bio: 'Focusing on intuitive design and user experiences.',
        projects: []
    },
    {
        id: 'futharke',
        name: 'Futharke',
        role: 'Software Engineer',
        githubUsername: 'Futharke',
        email: 'futharke@gmail.com',
        bio: 'Specializing in robust software architecture.',
        projects: []
    },
    {
        id: 'micro-auto-pirot',
        name: 'MicroAutoPirot',
        role: 'Automation Engineer',
        githubUsername: 'MicroAutoPirot',
        email: 'grids.bitcoin.sub1@gmail.com',
        bio: 'Developing automated systems and control logic.',
        projects: []
    },
    {
        id: 'divergent-z',
        name: 'Divergent-Z',
        role: 'Software Developer',
        githubUsername: 'Divergent-Z',
        email: 'devg.discourse@gmail.com',
        bio: 'Researching and developing innovative software solutions.',
        projects: []
    },
    {
        id: 'insurgent-dev',
        name: 'Insurgent-Dev',
        role: 'Software Developer',
        githubUsername: 'Insurgent-Dev',
        email: 'grids.bitcoin.sub2@gmail.com',
        bio: 'Focusing on high-performance development and system integration.',
        projects: []
    },
    {
        id: 'ega-klang',
        name: 'EgaKlang',
        role: 'Software Developer',
        githubUsername: 'EgaKlang',
        email: 'grids.bitcoin.sub3@gmail.com',
        bio: 'Developer focused on sustainable and efficient code solutions.',
        projects: []
    }
];
