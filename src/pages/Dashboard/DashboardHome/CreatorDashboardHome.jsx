import React, { useEffect, useState } from 'react';
import { FaChartBar, FaHourglassHalf, FaUsers, FaCheckCircle } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import MyParticipated from './MyParticipated';

const CreatorDashboardHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [stats, setStats] = useState({
        totalContests: 0,
        pendingContests: 0,
        totalParticipants: 0,
        completedContests: 0
    });

    useEffect(() => {
        if (!user?.email) return;

        axiosSecure.get(`/contests?email=${user?.email}`)
            .then(res => {
                const contests = res.data || [];
                const total = contests.length;
                const pending = contests.filter(c => c.status !== 'approved').length;
                const completed = contests.filter(c => c.submitStatus === 'prize-delivered').length;
                
                const participants = contests.reduce((sum, c) => sum + (c.participantsCount || 0), 0);

                setStats({
                    totalContests: total,
                    pendingContests: pending,
                    totalParticipants: participants,
                    completedContests: completed
                });
            })
            .catch(err => console.error("Error fetching creator stats:", err));
    }, [user?.email, axiosSecure]);

    return (
        <div className="bg-slate-50 p-4 sm:p-6 md:p-8 min-h-screen text-slate-800">
            {/* Header Section */}
            <div className="mb-6 sm:mb-8">
                <h2 className="font-bold text-slate-900 text-2xl sm:text-3xl">Creator Statistics</h2>
                <p className="mt-1 text-slate-500 text-xs sm:text-sm md:text-base">
                    Track your created contests and participant engagement.
                </p>
            </div>

            {/* Stats Cards Section */}
            <div className="gap-4 sm:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8 sm:mb-10">
                
                {/* Total Contests */}
                <div className="flex justify-between items-center bg-white shadow-sm hover:shadow-md p-4 sm:p-6 border-blue-500 border-slate-200 border-b-4 sm:border-b-0 sm:border-l-4 rounded-2xl transition-shadow">
                    <div className="min-w-0">
                        <p className="font-medium text-slate-500 text-xs sm:text-sm truncate uppercase tracking-wider">Total Created</p>
                        <h3 className="mt-1 font-black text-slate-900 text-xl sm:text-2xl">{stats.totalContests}</h3>
                    </div>
                    <div className="bg-blue-100 ml-2 p-3 sm:p-3.5 rounded-xl text-blue-600 shrink-0">
                        <FaChartBar className="w-5 sm:w-6 h-5 sm:h-6" />
                    </div>
                </div>

                {/* Pending Approval */}
                <div className="flex justify-between items-center bg-white shadow-sm hover:shadow-md p-4 sm:p-6 border-amber-500 border-slate-200 border-b-4 sm:border-b-0 sm:border-l-4 rounded-2xl transition-shadow">
                    <div className="min-w-0">
                        <p className="font-medium text-slate-500 text-xs sm:text-sm truncate uppercase tracking-wider">Pending Approval</p>
                        <h3 className="mt-1 font-black text-slate-900 text-xl sm:text-2xl">{stats.pendingContests}</h3>
                    </div>
                    <div className="bg-amber-100 ml-2 p-3 sm:p-3.5 rounded-xl text-amber-600 shrink-0">
                        <FaHourglassHalf className="w-5 sm:w-6 h-5 sm:h-6" />
                    </div>
                </div>

                {/* Total Participants */}
                <div className="flex justify-between items-center bg-white shadow-sm hover:shadow-md p-4 sm:p-6 border-emerald-500 border-slate-200 border-b-4 sm:border-b-0 sm:border-l-4 rounded-2xl transition-shadow">
                    <div className="min-w-0">
                        <p className="font-medium text-slate-500 text-xs sm:text-sm truncate uppercase tracking-wider">Total Participants</p>
                        <h3 className="mt-1 font-black text-slate-900 text-xl sm:text-2xl">{stats.totalParticipants}</h3>
                    </div>
                    <div className="bg-emerald-100 ml-2 p-3 sm:p-3.5 rounded-xl text-emerald-600 shrink-0">
                        <FaUsers className="w-5 sm:w-6 h-5 sm:h-6" />
                    </div>
                </div>

                {/* Completed Contests */}
                <div className="flex justify-between items-center bg-white shadow-sm hover:shadow-md p-4 sm:p-6 border-purple-500 border-slate-200 border-b-4 sm:border-b-0 sm:border-l-4 rounded-2xl transition-shadow">
                    <div className="min-w-0">
                        <p className="font-medium text-slate-500 text-xs sm:text-sm truncate uppercase tracking-wider">Winners Declared</p>
                        <h3 className="mt-1 font-black text-slate-900 text-xl sm:text-2xl">{stats.completedContests}</h3>
                    </div>
                    <div className="bg-purple-100 ml-2 p-3 sm:p-3.5 rounded-xl text-purple-600 shrink-0">
                        <FaCheckCircle className="w-5 sm:w-6 h-5 sm:h-6" />
                    </div>
                </div>
            </div>

            {/* Quick Tip & Action Area */}
            <div className="gap-6 grid grid-cols-1 lg:grid-cols-2 mb-8 sm:mb-10">
                <div className="bg-white shadow-sm p-5 sm:p-6 border border-slate-200 rounded-2xl">
                    <h3 className="mb-2 sm:mb-3 font-bold text-slate-900 text-base sm:text-lg">Quick Tip</h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        Keep your contest descriptions clear and detailed to attract more high-quality submissions. 
                        Check the "My Created Contests" tab to manage participants.
                    </p>
                </div>
                <div className="flex flex-col justify-between bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md p-5 sm:p-6 rounded-2xl text-white">
                    <div>
                        <h3 className="mb-2 font-bold text-base sm:text-lg">Want to reach more people?</h3>
                        <p className="mb-4 text-blue-100 text-xs sm:text-sm leading-relaxed">
                            Make sure your contest status is 'Approved' by the admin to show up on the homepage.
                        </p>
                    </div>
                    <div>
                        <button className="bg-white/10 hover:bg-white/20 px-4 py-2 border border-white/40 hover:border-white rounded-xl font-medium text-white text-xs sm:text-sm transition-colors cursor-pointer">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>

            {/* Participated Section */}
            <div className="bg-white shadow-sm p-4 sm:p-6 border border-slate-200 rounded-2xl overflow-hidden">
                <MyParticipated />
            </div>
        </div>
    );
};

export default CreatorDashboardHome;