// app/portfolio/[slug]/page.tsx
// This file is a Server Component by default in Next.js App Router

import { WorkExample, WORK_DATA } from '@/data/WorkData'; // Import your data
import { getReadmeContent } from '@/lib/github'; // Your GitHub fetching function

// Function to simulate ORM/DB Data Fetching (must be ASYNC)
// This function runs entirely on the server
async function fetchProjectData(slug: string): Promise<WorkExample | undefined> {
    // In a real application, this is where you'd call your ORM (e.g., Prisma, Mongoose)
    // const project = await prisma.project.findUnique({ where: { slug } });

    // For now, we simulate by finding data from the WORK_DATA array
    const project = WORK_DATA.find(work => work.slug === slug);
    return project;
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
    const project = await fetchProjectData(params.slug); // <-- Data fetched on the server (RSC)

    if (!project) {
        return <h1>Project Not Found</h1>;
    }

    // Example of using another server function (like your getReadmeContent)
    const readme = await getReadmeContent(project.slug);

    return (
        <main className="container mx-auto">
            <h1>{project.title}</h1>
            {/* Display new metrics */}
            <div className="metrics-panel">
                <p>Load Time: {project.metrics.pageLoadTimeSeconds}s</p>
                <p>Lighthouse: {project.metrics.lighthouseScore}/100</p>
                <p>Traffic: {project.metrics.trafficSupport}</p>
            </div>

            {/* The rest of the content */}
            <p>{project.fullContent}</p>
            <div dangerouslySetInnerHTML={{ __html: readme }} />
        </main>
    );
}