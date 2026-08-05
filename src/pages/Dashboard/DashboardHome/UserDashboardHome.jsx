import React, { useEffect, useState } from 'react';
import { FaTrophy, FaCoins, FaClipboardList } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import MyParticipated from './MyParticipated';

const UserDashboardHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [stats, setStats] = useState({
        registered: 0,
        spending: 0,
        wins: 0
    });

    useEffect(() => {
        if (!user?.email) return;

        axiosSecure.get(`/payments?email=${user?.email}`)
            .then(res => {
                const totalSpending = res.data.reduce((sum, item) => sum + item.amount, 0);
                setStats(prev => ({ ...prev, spending: totalSpending, registered: res.data.length }));
            })
            .catch(err => console.error("Error fetching payment stats:", err));

        axiosSecure.get(`/contests/candidate?candidateEmail=${user?.email}&submitStatus=prize-delivered`)
            .then(res => {
                setStats(prev => ({ ...prev, wins: res.data.length }));
            })
            .catch(err => console.error("Error fetching win stats:", err));
    }, [user?.email, axiosSecure]);

    return (
        <div className="bg-slate-50 p-4 sm:p-6 md:p-8 min-h-screen text-slate-800">
            {/* Header Section */}
            <div className="mb-6 sm:mb-8">
                <h2 className="font-bold text-slate-900 text-2xl sm:text-3xl tracking-tight">
                    Welcome back, <span className="text-blue-600">{user?.displayName || 'User'}</span>!
                </h2>
                <p className="mt-1 text-slate-500 text-xs sm:text-sm md:text-base">
                    Here is what's happening with your contests today.
                </p>
            </div>

            {/* Stats Section */}
            <div className="gap-4 sm:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8 sm:mb-10">
                {/* Registered Contests */}
                <div className="flex justify-between items-center bg-white shadow-sm hover:shadow-md p-5 sm:p-6 border-blue-500 border-slate-200 border-b-4 sm:border-b-0 sm:border-l-4 rounded-2xl transition-all duration-200">
                    <div className="min-w-0">
                        <p className="font-medium text-slate-500 text-xs sm:text-sm truncate uppercase tracking-wider">Registered</p>
                        <h3 className="mt-1 font-black text-slate-900 text-2xl sm:text-3xl">{stats.registered}</h3>
                        <p className="mt-1 text-slate-400 text-xs">Total Contests Joined</p>
                    </div>
                    <div className="bg-blue-50 ml-3 p-3.5 sm:p-4 rounded-xl text-blue-600 shrink-0">
                        <FaClipboardList className="w-6 sm:w-7 h-6 sm:h-7" />
                    </div>
                </div>

                {/* Total Spending */}
                <div className="flex justify-between items-center bg-white shadow-sm hover:shadow-md p-5 sm:p-6 border-indigo-500 border-slate-200 border-b-4 sm:border-b-0 sm:border-l-4 rounded-2xl transition-all duration-200">
                    <div className="min-w-0">
                        <p className="font-medium text-slate-500 text-xs sm:text-sm truncate uppercase tracking-wider">Spending</p>
                        <h3 className="mt-1 font-black text-slate-900 text-2xl sm:text-3xl">${stats.spending}</h3>
                        <p className="mt-1 text-slate-400 text-xs">Total Fees Paid</p>
                    </div>
                    <div className="bg-indigo-50 ml-3 p-3.5 sm:p-4 rounded-xl text-indigo-600 shrink-0">
                        <FaCoins className="w-6 sm:w-7 h-6 sm:h-7" />
                    </div>
                </div>

                {/* Winning Count */}
                <div className="flex justify-between items-center sm:col-span-2 lg:col-span-1 bg-white shadow-sm hover:shadow-md p-5 sm:p-6 border-amber-500 border-slate-200 border-b-4 sm:border-b-0 sm:border-l-4 rounded-2xl transition-all duration-200">
                    <div className="min-w-0">
                        <p className="font-medium text-slate-500 text-xs sm:text-sm truncate uppercase tracking-wider">Wins</p>
                        <h3 className="mt-1 font-black text-slate-900 text-2xl sm:text-3xl">{stats.wins}</h3>
                        <p className="mt-1 text-slate-400 text-xs">Prizes Won</p>
                    </div>
                    <div className="bg-amber-50 ml-3 p-3.5 sm:p-4 rounded-xl text-amber-500 shrink-0">
                        <FaTrophy className="w-6 sm:w-7 h-6 sm:h-7" />
                    </div>
                </div>
            </div>

            {/* Profile Brief Section */}
            <div className="flex sm:flex-row flex-col items-center sm:items-start md:items-center gap-4 sm:gap-6 bg-white shadow-sm mb-8 sm:mb-10 p-5 sm:p-6 md:p-8 border border-slate-200 rounded-2xl sm:text-left text-center">
                <div className="relative shrink-0">
                    <img 
                        src={user?.photoURL || "https://via.placeholder.com/150"} 
                        alt="User Avatar" 
                        className="p-1 border-2 border-blue-500 rounded-full w-20 sm:w-24 h-20 sm:h-24 object-cover"
                    />
                </div>
                <div className="min-w-0">
                    <h3 className="font-bold text-slate-900 text-xl sm:text-2xl truncate">{user?.displayName || 'User Name'}</h3>
                    <p className="mt-0.5 text-slate-500 text-xs sm:text-sm truncate">{user?.email || 'No email provided'}</p>
                    <div className="inline-flex items-center bg-blue-50 mt-3 px-3 py-1 border border-blue-200 rounded-full font-medium text-blue-700 text-xs">
                        Verified Participant
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

export default UserDashboardHome;