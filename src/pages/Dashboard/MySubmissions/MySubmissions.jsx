import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaPaperPlane, FaExternalLinkAlt, FaVideo, FaFileAlt } from 'react-icons/fa';

const MySubmissions = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: submissions = [], isLoading } = useQuery({
        queryKey: ['mySubmissions', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/submissions?email=${user?.email}`);
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="text-purple-600 loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="space-y-6 bg-slate-50 p-4 sm:p-6 md:p-8 min-h-screen text-slate-800">
            {/* Header Section */}
            <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4 bg-white shadow-sm p-4 sm:p-6 border border-slate-200 rounded-2xl">
                <div>
                    <h2 className="flex items-center gap-2 font-bold text-slate-900 text-xl sm:text-2xl tracking-tight">
                        <FaPaperPlane className="text-purple-600 shrink-0" /> My Submissions
                    </h2>
                    <p className="mt-1 text-slate-500 text-xs sm:text-sm">
                        Track all contest entries and tasks you have submitted.
                    </p>
                </div>
                <div className="inline-flex items-center bg-purple-50 px-3.5 py-1.5 border border-purple-200 rounded-xl font-semibold text-purple-700 text-xs sm:text-sm shrink-0">
                    Total Submissions: {submissions.length}
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-white shadow-sm border border-slate-200 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[680px] text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-100/80 border-slate-200 border-b font-semibold text-slate-600 text-xs uppercase tracking-wider">
                                <th className="px-4 py-3.5 w-12 text-center">#</th>
                                <th className="px-4 py-3.5">Contest & Title</th>
                                <th className="px-4 py-3.5">Submission Links</th>
                                <th className="px-4 py-3.5">Submitted Date</th>
                                <th className="px-4 py-3.5 text-center">Status</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                            {submissions.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="py-12 font-medium text-slate-400 text-center">
                                        You haven't submitted any contest entries yet.
                                    </td>
                                </tr>
                            ) : (
                                submissions.map((sub, index) => (
                                    <tr key={sub._id} className="hover:bg-slate-50/80 transition-colors">
                                        <th className="px-4 py-3.5 font-medium text-slate-400 text-center">{index + 1}</th>
                                        <td className="px-4 py-3.5 max-w-[250px]">
                                            <p className="font-semibold text-purple-700 text-xs truncate">
                                                {sub.contestTitle || 'Contest'}
                                            </p>
                                            <p className="font-bold text-slate-800 text-sm truncate">
                                                {sub.title}
                                            </p>
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <div className="flex flex-wrap items-center gap-2">
                                                {sub.projectLink && (
                                                    <a 
                                                        href={sub.projectLink} 
                                                        target="_blank" 
                                                        rel="noreferrer"
                                                        className="inline-flex items-center gap-1 bg-purple-50 hover:bg-purple-100 px-2.5 py-1 border border-purple-200 rounded-lg text-purple-700 text-xs transition-colors"
                                                    >
                                                        <FaExternalLinkAlt className="size-3" /> Project
                                                    </a>
                                                )}
                                                {sub.fileLink && (
                                                    <a 
                                                        href={sub.fileLink} 
                                                        target="_blank" 
                                                        rel="noreferrer"
                                                        className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 border border-slate-300 rounded-lg text-slate-700 text-xs transition-colors"
                                                    >
                                                        <FaFileAlt className="size-3" /> File
                                                    </a>
                                                )}
                                                {sub.videoLink && (
                                                    <a 
                                                        href={sub.videoLink} 
                                                        target="_blank" 
                                                        rel="noreferrer"
                                                        className="inline-flex items-center gap-1 bg-rose-50 hover:bg-rose-100 px-2.5 py-1 border border-rose-200 rounded-lg text-rose-700 text-xs transition-colors"
                                                    >
                                                        <FaVideo className="size-3" /> Video
                                                    </a>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3.5 text-slate-500 text-xs">
                                            {sub.submittedAt ? new Date(sub.submittedAt).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className="px-4 py-3.5 text-center">
                                            <span className="inline-block bg-emerald-50 px-2.5 py-1 border border-emerald-200 rounded-full font-semibold text-emerald-700 text-xs capitalize">
                                                Submitted
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MySubmissions;