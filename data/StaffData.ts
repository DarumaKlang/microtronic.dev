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
    link?: string; // e.g., "https://example.com"
    landingPage?: string; // e.g., "https://landing.example.com"
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
            },
            {
                id: 'p-micro-account',
                name: 'Micro-Account',
                description: 'ระบบบัญชีออนไลน์',
                status: 'ongoing',
                repo: 'GridsMicro/Micro-Account',
                link: 'https://micro-account.vercel.app/',
                landingPage: 'https://micro-account-page.vercel.app/'
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
            },
            {
                id: 'p-micro-headless-cms',
                name: 'Micro Headless CMS (Ultra Premium v1.5)',
                description: 'ระบบจัดการเนื้อหา (CMS) ระดับ High-end ที่มีความเร็วสูง สวยหรู และยืดหยุ่น ออกแบบมาเพื่อธุรกิจสตาร์ตอัปและพอร์ตโฟลิโอรุ่นใหม่ สร้างด้วย Next.js 15, Tailwind CSS 4 และ Prisma.',
                status: 'completed',
                repo: 'WebShardow/Micro-Headless-CMS',
                link: 'https://micro-headless-cms.vercel.app/',
                landingPage: 'https://micro-headless-cms.vercel.app/'
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
    },
    {
        id: 'ghost-micro',
        name: 'GhostMicro',
        role: 'Autopilot Specialist / Maintainer',
        githubUsername: 'GhostMicro',
        bio: 'ผู้ดูแลโครงการ THAP firmware autopilot มุ่งมั่นสร้างเทคโนโลยี Autopilot ฝีมือคนไทยเพื่อสนับสนุนงานสาธารณกุศลและกู้ภัย',
        projects: [
            {
                id: 'thap-fw',
                name: 'THAP firmware autopilot',
                description: 'Open source autopilot firmware for rescue robots and UAVs.',
                status: 'ongoing',
                repo: 'GhostMicro/micro-ai-robot-thap-firmware'
            },
            {
                id: 'iot-smart-farm',
                name: 'Micro IoT Smart Farm',
                description: 'Precision agriculture IoT system for farm management.',
                status: 'ongoing',
                repo: 'GhostMicro/micro-iot-smart-farm'
            },
            {
                id: 'iot-smart-home',
                name: 'Micro IoT Smart Home',
                description: 'Integrated home automation and control system.',
                status: 'ongoing',
                repo: 'GhostMicro/micro-iot-smart-home'
            },
            {
                id: 'iot-dashboard',
                name: 'Micro IoT Dashboard & Hardware Controller',
                description: 'Centralized IoT monitoring and hardware control dashboard.',
                status: 'ongoing',
                repo: 'GhostMicro/micro-iot-dashboard-hub',
                link: 'https://micro-iot-dashboard-hub.vercel.app/'
            }
        ]
    }
];
