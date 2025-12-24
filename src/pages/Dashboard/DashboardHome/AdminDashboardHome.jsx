import React, { useEffect, useState } from 'react';
import { FaUsers, FaLayerGroup, FaDollarSign, FaUserShield } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

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
        <div className="bg-gray-50 p-6 min-h-screen">
            <div className="mb-8">
                <h2 className="font-bold text-gray-800 text-3xl">Admin Overview</h2>
                <p className="text-gray-500">Global statistics and platform performance metrics.</p>
            </div>

            {/* Admin Stats Grid */}
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-10">
                
                {/* Total Revenue Card */}
                <div className="flex items-center gap-4 bg-white shadow-md p-6 border-green-500 border-b-4 rounded-xl">
                    <div className="bg-green-100 p-4 rounded-full text-green-600">
                        <FaDollarSign size={24} />
                    </div>
                    <div>
                        <p className="font-bold text-gray-500 text-sm uppercase tracking-wider">Total Revenue</p>
                        <h3 className="font-black text-2xl">${adminStats.totalRevenue}</h3>
                    </div>
                </div>

                {/* Total Users Card */}
                <div className="flex items-center gap-4 bg-white shadow-md p-6 border-blue-500 border-b-4 rounded-xl">
                    <div className="bg-blue-100 p-4 rounded-full text-blue-600">
                        <FaUsers size={24} />
                    </div>
                    <div>
                        <p className="font-bold text-gray-500 text-sm uppercase tracking-wider">Total Users</p>
                        <h3 className="font-black text-2xl">{adminStats.totalUsers}</h3>
                    </div>
                </div>

                {/* Total Contests Card */}
                <div className="flex items-center gap-4 bg-white shadow-md p-6 border-purple-500 border-b-4 rounded-xl">
                    <div className="bg-purple-100 p-4 rounded-full text-purple-600">
                        <FaLayerGroup size={24} />
                    </div>
                    <div>
                        <p className="font-bold text-gray-500 text-sm uppercase tracking-wider">Total Contests</p>
                        <h3 className="font-black text-2xl">{adminStats.totalContests}</h3>
                    </div>
                </div>

                {/* Pending Approvals Card */}
                <div className="flex items-center gap-4 bg-white shadow-md p-6 border-orange-500 border-b-4 rounded-xl">
                    <div className="bg-orange-100 p-4 rounded-full text-orange-600">
                        <FaUserShield size={24} />
                    </div>
                    <div>
                        <p className="font-bold text-gray-500 text-sm uppercase tracking-wider">Pending Action</p>
                        <h3 className="font-black text-2xl">{adminStats.pendingApprovals}</h3>
                    </div>
                </div>
            </div>

            {/* Quick Actions or System Health */}
            <div className="gap-6 grid grid-cols-1 lg:grid-cols-3">
                <div className="lg:col-span-2 bg-white shadow-sm p-8 border rounded-2xl">
                    <h3 className="mb-4 font-bold text-xl">System Status</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span>Database Connection</span>
                            <span className="text-white badge badge-success">Stable</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Stripe API</span>
                            <span className="text-white badge badge-success">Active</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Firebase Auth Service</span>
                            <span className="text-white badge badge-success">Online</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 shadow-lg p-8 rounded-2xl text-white">
                    <h3 className="mb-2 font-bold text-xl">Management Note</h3>
                    <p className="text-indigo-100 text-sm leading-relaxed">
                        As an admin, you have the power to promote users to 'Creators' and approve submitted contests. Always verify the contest price and images before approving.
                    </p>
                    <button className="bg-white hover:bg-indigo-50 mt-6 py-3 rounded-xl w-full font-bold text-indigo-700 transition-colors">
                        Review Contests
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardHome;