import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { MdOutlineAssignmentTurnedIn } from 'react-icons/md';
import { FaArrowRight } from 'react-icons/fa';
import SpinnerLoader from '../../SpinnerLoader';

const ContestManagement = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: contests = [], isLoading } = useQuery({
        queryKey: ['contests-management-list'],
        queryFn: async () => {
            const res = await axiosSecure.get('/contests-with-submissions-count');
            return res.data;
        }
    });

    if (isLoading) {
        return <div> <SpinnerLoader /> </div>;
    }

    return (
        <div className="space-y-6 text-slate-900">
            {/* Header */}
            <div className="bg-white shadow-sm p-6 border border-slate-200 rounded-2xl">
                <h2 className="flex items-center gap-2 font-bold text-slate-800 text-2xl">
                    <MdOutlineAssignmentTurnedIn className="text-purple-600" /> Contest Management
                </h2>
                <p className="mt-1 text-slate-500 text-sm">
                    Select a contest category to review submissions and declare winners.
                </p>
            </div>

            {/* Contest Grid */}
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {contests.map((contest) => (
                    <div key={contest._id} className="flex flex-col justify-between bg-white shadow-sm hover:shadow-md p-5 border border-slate-200 rounded-2xl transition-all">
                        <div>
                            <span className="inline-block bg-purple-50 px-3 py-1 rounded-full font-semibold text-purple-700 text-xs">
                                {contest.category || 'General'}
                            </span>
                            <h3 className="mt-3 font-bold text-slate-800 text-lg line-clamp-2">
                                {contest.title}
                            </h3>
                        </div>

                        <div className="flex justify-between items-center mt-6 pt-4 border-slate-100 border-t">
                            <div>
                                <p className="text-slate-400 text-xs">Submissions</p>
                                <p className="font-bold text-purple-600 text-lg">
                                    {contest.submissionCount || 0} Entries
                                </p>
                            </div>

                            <button
                                onClick={() => navigate(`/dashboard/contest-submissions/${contest._id}`)}
                                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl font-medium text-white text-sm transition-colors cursor-pointer"
                            >
                                <span>View List</span>
                                <FaArrowRight className="size-3.5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContestManagement;