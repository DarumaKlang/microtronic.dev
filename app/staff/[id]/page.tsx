import React from 'react';
import { STAFF_DATA } from '@/data/StaffData';
import GooeyBackground from '@/components/GooeyBackground';
import Image from 'next/image';
import { GLASS_PANEL_CLASS, GRADIENT_TEXT_CLASS } from '@/constants/data';
import { ProjectProgress } from '@/components/ProjectProgress';
import { ArrowLeft, CheckCircle, Hammer } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRepoMilestones, getGitHubUserInfo } from '@/lib/github';
import { ProjectStep } from '@/data/StaffData';
import { Mail } from 'lucide-react';
import { StaffImage } from '@/components/StaffImage';

interface PageProps {
    params: { id: string };
}

export default async function StaffDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const staff = STAFF_DATA.find(s => s.id === id);

    if (!staff) {
        notFound();
    }

    const completedProjects = staff.projects.filter(p => p.status === 'completed');
    const ongoingProjects = staff.projects.filter(p => p.status === 'ongoing');

    // Fetch GitHub User Info
    const githubUser = await getGitHubUserInfo(staff.githubUsername);
    const displayEmail = staff.email || githubUser?.email;
    const displayBio = staff.bio || githubUser?.bio;

    // Fetch GitHub data for ongoing projects
    const ongoingProjectsWithData = await Promise.all(ongoingProjects.map(async (project) => {
        if (project.repo) {
            const milestones = await getRepoMilestones(project.repo);
            if (milestones && milestones.length > 0) {
                const steps: ProjectStep[] = milestones.map(m => ({
                    id: m.id.toString(),
                    label: m.title,
                    description: m.description || 'No description provided.',
                    status: m.state === 'closed' ? 'completed' : (m.state === 'open' ? 'current' : 'upcoming')
                }));

                // Logic to set only ONE 'current' step if multiple are open
                // In GitHub milestones, multiple can be open. We'll mark the first open one as 'current' and others as 'upcoming'
                let foundCurrent = false;
                const refinedSteps = steps.map(step => {
                    if (step.status === 'current') {
                        if (!foundCurrent) {
                            foundCurrent = true;
                            return step;
                        }
                        return { ...step, status: 'upcoming' as const };
                    }
                    return step;
                });

                return { ...project, steps: refinedSteps };
            }
        }
        return project;
    }));

    return (
        <div className="min-h-screen bg-slate-900 text-white pt-32 pb-16 relative">
            <GooeyBackground />

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <Link href="/staff" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 font-medium">
                    <ArrowLeft className="mr-2 w-4 h-4" /> Back to Team
                </Link>

                {/* Profile Header */}
                <section className={`${GLASS_PANEL_CLASS} p-8 lg:p-12 rounded-[2rem] border-white/10 mb-12 flex flex-col md:flex-row gap-12 items-center md:items-start`}>
                    <div className="flex-shrink-0">
                        <StaffImage username={staff.githubUsername} name={staff.name} size="large" />
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className={`text-4xl lg:text-5xl font-black mb-4 ${GRADIENT_TEXT_CLASS}`}>
                            {staff.name}
                        </h1>
                        <p className="text-2xl text-blue-400 font-bold mb-4">{staff.role}</p>

                        {displayEmail && (
                            <a href={`mailto:${displayEmail}`} className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-6 group">
                                <Mail className="w-5 h-5 mr-2 group-hover:text-pink-400 transition-colors" />
                                <span className="text-lg">{displayEmail}</span>
                            </a>
                        )}

                        <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">{displayBio}</p>
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Ongoing Projects */}
                    <section className="space-y-8">
                        <div className="flex items-center gap-3">
                            <Hammer className="w-6 h-6 text-blue-400" />
                            <h2 className="text-2xl font-bold">Ongoing Projects</h2>
                        </div>

                        {ongoingProjectsWithData.length > 0 ? (
                            ongoingProjectsWithData.map(project => (
                                <div key={project.id} className={`${GLASS_PANEL_CLASS} p-6 rounded-3xl border-blue-500/20`}>
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-blue-300">{project.name}</h3>
                                            {project.repo && (
                                                <a
                                                    href={`https://github.com/${project.repo}`}
                                                    target="_blank"
                                                    className="text-xs text-gray-500 hover:text-blue-400 transition-colors"
                                                >
                                                    github.com/{project.repo}
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-gray-400 text-sm mb-6">{project.description}</p>

                                    {project.steps && project.steps.length > 0 && (
                                        <div className="mt-8 border-t border-white/5 pt-8">
                                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6">Progress Stages (via GitHub)</h4>
                                            <ProjectProgress steps={project.steps} />
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 italic">No current ongoing projects.</p>
                        )}
                    </section>

                    {/* Completed Projects */}
                    <section className="space-y-8">
                        <div className="flex items-center gap-3">
                            <CheckCircle className="w-6 h-6 text-emerald-400" />
                            <h2 className="text-2xl font-bold">Completed Projects</h2>
                        </div>

                        <div className="space-y-4">
                            {completedProjects.length > 0 ? (
                                completedProjects.map(project => (
                                    <div key={project.id} className={`${GLASS_PANEL_CLASS} p-6 rounded-3xl border-emerald-500/10 hover:border-emerald-500/30 transition-colors`}>
                                        <h3 className="text-xl font-bold text-emerald-400">{project.name}</h3>
                                        <p className="text-gray-400 text-sm mt-1">{project.description}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 italic">No completed projects yet.</p>
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
