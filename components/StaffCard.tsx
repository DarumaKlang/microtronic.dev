import { STAFF_DATA, StaffMember } from '@/data/StaffData';
import Link from 'next/link';
import { GLASS_PANEL_CLASS } from '@/constants/data';
import { ExternalLink, Mail } from 'lucide-react';
import { StaffImage } from './StaffImage';

interface StaffCardProps {
    staff: StaffMember;
}

export const StaffCard: React.FC<StaffCardProps> = ({ staff }) => {
    return (
        <Link href={`/staff/${staff.id}`}>
            <div className={`${GLASS_PANEL_CLASS} p-6 rounded-3xl transition-all duration-300 hover:scale-[1.03] hover:border-blue-500/50 group cursor-pointer h-full flex flex-col items-center text-center`}>
                <div className="mb-6">
                    <StaffImage username={staff.githubUsername} name={staff.name} size="small" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{staff.name}</h3>
                <p className="text-blue-400 font-medium mb-2">{staff.role}</p>

                {staff.email && (
                    <div className="flex items-center text-gray-400 text-xs mb-4">
                        <Mail className="w-3 h-3 mr-1" /> {staff.email}
                    </div>
                )}

                <p className="text-gray-400 text-sm line-clamp-2 mb-6">{staff.bio}</p>
                <div className="mt-auto flex items-center text-blue-300 text-sm font-bold group-hover:text-blue-200">
                    View Projects <ExternalLink className="ml-2 w-4 h-4" />
                </div>
            </div>
        </Link>
    );
};
