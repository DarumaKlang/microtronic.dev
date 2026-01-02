import React from 'react';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { ProjectStep } from '@/data/StaffData';

interface ProjectProgressProps {
    steps: ProjectStep[];
}

export const ProjectProgress: React.FC<ProjectProgressProps> = ({ steps }) => {
    return (
        <div className="space-y-6">
            {steps.map((step, index) => (
                <div key={step.id} className="relative flex gap-4">
                    {/* Line between steps */}
                    {index !== steps.length - 1 && (
                        <div className="absolute left-[11px] top-6 w-[2px] h-full bg-slate-700" />
                    )}

                    <div className="relative z-10 flex-shrink-0 mt-1">
                        {step.status === 'completed' ? (
                            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                        ) : step.status === 'current' ? (
                            <Clock className="w-6 h-6 text-blue-500 animate-pulse" />
                        ) : (
                            <Circle className="w-6 h-6 text-slate-600" />
                        )}
                    </div>

                    <div className="pb-4">
                        <h4 className={`font-bold ${step.status === 'current' ? 'text-blue-400' : 'text-white'}`}>
                            {step.label}
                        </h4>
                        <p className="text-gray-400 text-sm">{step.description}</p>
                        {step.status === 'current' && (
                            <span className="inline-block mt-2 px-2 py-0.5 bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider rounded border border-blue-500/30">
                                In Progress
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};
