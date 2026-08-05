import React, { useEffect, useState } from 'react';
import { FaUsers, FaLayerGroup, FaDollarSign, FaUserShield } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import MyParticipated from './MyParticipated';

const AdminDashboardHome = () => {
    const axiosSecure = useAxiosSecure();
    const [adminStats, setAdminStats] = useState({
        totalUsers: 0,
        totalContests: 0,
        totalRevenue: 0,
        pendingApprovals: 0
    });

    useEffect(() => {
        axiosSecure.get('/users')
            .then(res => {
                setAdminStats(prev => ({ ...prev, totalUsers: res.data.length }));
            });

        axiosSecure.get('/contests')
            .then(res => {
                const contests = res.data;
                const pending = contests.filter(c => c.status !== 'approved').length;
                setAdminStats(prev => ({ ...prev, totalContests: contests.length, pendingApprovals: pending }));
            });

        axiosSecure.get('/payments')
            .then(res => {
                const revenue = res.data.reduce((sum, payment) => sum + payment.amount, 0);
                setAdminStats(prev => ({ ...prev, totalRevenue: revenue }));
            });
    }, [axiosSecure]);

    return (
        <div className="bg-slate-50 p-4 sm:p-6 md:p-8 min-h-screen text-slate-800">
            {/* Header Section */}
            <div className="mb-6 sm:mb-8">
                <h2 className="font-bold text-slate-900 text-2xl sm:text-3xl">Admin Overview</h2>
                <p className="mt-1 text-slate-500 text-xs sm:text-sm md:text-base">
                    Global statistics and platform performance metrics.
                </p>
            </div>

            {/* Admin Stats Grid */}
            <div className="gap-4 sm:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8 sm:mb-10">
                
                {/* Total Revenue Card */}
                <div className="flex items-center gap-4 bg-white shadow-sm hover:shadow-md p-4 sm:p-6 border-emerald-500 border-slate-200 border-b-4 rounded-2xl transition-shadow">
                    <div className="bg-emerald-100 p-3.5 sm:p-4 rounded-xl text-emerald-600 shrink-0">
                        <FaDollarSign className="w-5 sm:w-6 h-5 sm:h-6" />
                    </div>
                    <div className="min-w-0">
                        <p className="font-bold text-slate-500 text-xs sm:text-sm truncate uppercase tracking-wider">Total Revenue</p>
                        <h3 className="font-black text-slate-900 text-xl sm:text-2xl">${adminStats.totalRevenue}</h3>
                    </div>
                </div>

                {/* Total Users Card */}
                <div className="flex items-center gap-4 bg-white shadow-sm hover:shadow-md p-4 sm:p-6 border-blue-500 border-slate-200 border-b-4 rounded-2xl transition-shadow">
                    <div className="bg-blue-100 p-3.5 sm:p-4 rounded-xl text-blue-600 shrink-0">
                        <FaUsers className="w-5 sm:w-6 h-5 sm:h-6" />
                    </div>
                    <div className="min-w-0">
                        <p className="font-bold text-slate-500 text-xs sm:text-sm truncate uppercase tracking-wider">Total Users</p>
                        <h3 className="font-black text-slate-900 text-xl sm:text-2xl">{adminStats.totalUsers}</h3>
                    </div>
                </div>

                {/* Total Contests Card */}
                <div className="flex items-center gap-4 bg-white shadow-sm hover:shadow-md p-4 sm:p-6 border-purple-500 border-slate-200 border-b-4 rounded-2xl transition-shadow">
                    <div className="bg-purple-100 p-3.5 sm:p-4 rounded-xl text-purple-600 shrink-0">
                        <FaLayerGroup className="w-5 sm:w-6 h-5 sm:h-6" />
                    </div>
                    <div className="min-w-0">
                        <p className="font-bold text-slate-500 text-xs sm:text-sm truncate uppercase tracking-wider">Total Contests</p>
                        <h3 className="font-black text-slate-900 text-xl sm:text-2xl">{adminStats.totalContests}</h3>
                    </div>
                </div>

                {/* Pending Approvals Card */}
                <div className="flex items-center gap-4 bg-white shadow-sm hover:shadow-md p-4 sm:p-6 border-amber-500 border-slate-200 border-b-4 rounded-2xl transition-shadow">
                    <div className="bg-amber-100 p-3.5 sm:p-4 rounded-xl text-amber-600 shrink-0">
                        <FaUserShield className="w-5 sm:w-6 h-5 sm:h-6" />
                    </div>
                    <div className="min-w-0">
                        <p className="font-bold text-slate-500 text-xs sm:text-sm truncate uppercase tracking-wider">Pending Action</p>
                        <h3 className="font-black text-slate-900 text-xl sm:text-2xl">{adminStats.pendingApprovals}</h3>
                    </div>
                </div>
            </div>

            {/* System Health & Management Note */}
            <div className="gap-6 grid grid-cols-1 lg:grid-cols-3 mb-8 sm:mb-10">
                <div className="lg:col-span-2 bg-white shadow-sm p-5 sm:p-8 border border-slate-200 rounded-2xl">
                    <h3 className="mb-4 font-bold text-slate-900 text-lg sm:text-xl">System Status</h3>
                    <div className="space-y-4 text-xs sm:text-sm">
                        <div className="flex justify-between items-center bg-slate-50/50 p-2.5 border border-slate-100 rounded-lg">
                            <span className="font-medium text-slate-700">Database Connection</span>
                            <span className="bg-emerald-600 px-3 py-1 rounded-full text-white text-xs">Stable</span>
                        </div>
                        <div className="flex justify-between items-center bg-slate-50/50 p-2.5 border border-slate-100 rounded-lg">
                            <span className="font-medium text-slate-700">Stripe API</span>
                            <span className="bg-emerald-600 px-3 py-1 rounded-full text-white text-xs">Active</span>
                        </div>
                        <div className="flex justify-between items-center bg-slate-50/50 p-2.5 border border-slate-100 rounded-lg">
                            <span className="font-medium text-slate-700">Firebase Auth Service</span>
                            <span className="bg-emerald-600 px-3 py-1 rounded-full text-white text-xs">Online</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-between bg-gradient-to-br from-indigo-600 to-purple-700 shadow-md p-6 sm:p-8 rounded-2xl text-white">
                    <div>
                        <h3 className="mb-2 font-bold text-lg sm:text-xl">Management Note</h3>
                        <p className="text-indigo-100 text-xs sm:text-sm leading-relaxed">
                            As an admin, you have the power to promote users to 'Creators' and approve submitted contests. Always verify the contest price and images before approving.
                        </p>
                    </div>
                    <button className="bg-white hover:bg-indigo-50 mt-6 py-2.5 sm:py-3 border-none rounded-xl w-full font-bold text-indigo-700 text-xs sm:text-sm transition-colors cursor-pointer">
                        Review Contests
                    </button>
                </div>
            </div>

            {/* Participated Section */}
            <div className="bg-white shadow-sm p-4 sm:p-6 border border-slate-200 rounded-2xl overflow-hidden">
                <MyParticipated />
            </div>
        </div>
    );
};

export default AdminDashboardHome;