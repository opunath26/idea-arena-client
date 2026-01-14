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
       
        axiosSecure.get(`/payments?email=${user?.email}`)
            .then(res => {
                const totalSpending = res.data.reduce((sum, item) => sum + item.amount, 0);
                setStats(prev => ({ ...prev, spending: totalSpending, registered: res.data.length }));
            });

        
        axiosSecure.get(`/contests/candidate?candidateEmail=${user?.email}&submitStatus=prize-delivered`)
            .then(res => {
                setStats(prev => ({ ...prev, wins: res.data.length }));
            });
    }, [user?.email, axiosSecure]);

    return (
        <div className="p-6">
            <div className="mb-8">
                <h2 className="font-bold text-3xl">Welcome back, {user?.displayName}!</h2>
                <p className="text-gray-500">Here is what's happening with your contests today.</p>
            </div>

            {/* Stats Section */}
            <div className="gap-6 grid grid-cols-1 md:grid-cols-3 mb-10">
                {/* Registered Contests */}
                <div className="bg-primary shadow text-primary-content stats">
                    <div className="stat">
                        <div className="text-3xl stat-figure">
                            <FaClipboardList />
                        </div>
                        <div className="opacity-80 text-primary-content stat-title">Registered</div>
                        <div className="stat-value">{stats.registered}</div>
                        <div className="opacity-70 text-primary-content stat-desc">Total Contests Joined</div>
                    </div>
                </div>

                {/* Total Spending */}
                <div className="bg-secondary shadow text-secondary-content stats">
                    <div className="stat">
                        <div className="text-3xl stat-figure">
                            <FaCoins />
                        </div>
                        <div className="opacity-80 text-secondary-content stat-title">Spending</div>
                        <div className="stat-value">${stats.spending}</div>
                        <div className="opacity-70 text-secondary-content stat-desc">Total Fees Paid</div>
                    </div>
                </div>

                {/* Winning Count */}
                <div className="bg-accent shadow text-accent-content stats">
                    <div className="stat">
                        <div className="text-3xl stat-figure">
                            <FaTrophy />
                        </div>
                        <div className="opacity-80 text-accent-content stat-title">Wins</div>
                        <div className="stat-value">{stats.wins}</div>
                        <div className="opacity-70 text-accent-content stat-desc">Prizes Won</div>
                    </div>
                </div>
            </div>

            {/* Profile Brief Section */}
            <div className="flex items-center gap-6 bg-white shadow-sm p-8 border rounded-2xl">
                <div className="avatar">
                    <div className="rounded-full ring ring-primary ring-offset-2 ring-offset-base-100 w-24">
                        <img src={user?.photoURL || "https://via.placeholder.com/150"} alt="User" />
                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-2xl">{user?.displayName}</h3>
                    <p className="text-gray-500">{user?.email}</p>
                    <div className="mt-2 badge-outline badge">Verified Participant</div>
                </div>
            </div>

        <MyParticipated />

        </div>
    );
};

export default UserDashboardHome;