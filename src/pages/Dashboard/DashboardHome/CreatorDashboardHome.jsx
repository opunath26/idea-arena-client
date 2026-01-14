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
        
        axiosSecure.get(`/contests?email=${user?.email}`)
            .then(res => {
                const contests = res.data;
                const total = contests.length;
                const pending = contests.filter(c => c.status !== 'approved').length; // আপনার ফিল্ড নাম অনুযায়ী (status বা submitStatus)
                const completed = contests.filter(c => c.submitStatus === 'prize-delivered').length;
                
            
                const participants = contests.reduce((sum, c) => sum + (c.participantsCount || 0), 0);

                setStats({
                    totalContests: total,
                    pendingContests: pending,
                    totalParticipants: participants,
                    completedContests: completed
                });
            });
    }, [user?.email, axiosSecure]);

    return (
        <div className="bg-gray-50 p-6 min-h-screen">
            <div className="mb-8">
                <h2 className="font-bold text-gray-800 text-3xl">Creator Statistics</h2>
                <p className="text-gray-500">Track your created contests and participant engagement.</p>
            </div>

            {/* Stats Cards Section */}
            <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-10">
                
                {/* Total Contests */}
                <div className="flex justify-between items-center bg-white shadow-sm p-6 border-blue-500 border-l-4 rounded-xl">
                    <div>
                        <p className="font-medium text-gray-500 text-sm uppercase">Total Created</p>
                        <h3 className="font-bold text-2xl">{stats.totalContests}</h3>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                        <FaChartBar size={24} />
                    </div>
                </div>

                {/* Pending Approval */}
                <div className="flex justify-between items-center bg-white shadow-sm p-6 border-yellow-500 border-l-4 rounded-xl">
                    <div>
                        <p className="font-medium text-gray-500 text-sm uppercase">Pending Approval</p>
                        <h3 className="font-bold text-2xl">{stats.pendingContests}</h3>
                    </div>
                    <div className="bg-yellow-100 p-3 rounded-full text-yellow-600">
                        <FaHourglassHalf size={24} />
                    </div>
                </div>

                {/* Total Participants */}
                <div className="flex justify-between items-center bg-white shadow-sm p-6 border-green-500 border-l-4 rounded-xl">
                    <div>
                        <p className="font-medium text-gray-500 text-sm uppercase">Total Participants</p>
                        <h3 className="font-bold text-2xl">{stats.totalParticipants}</h3>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full text-green-600">
                        <FaUsers size={24} />
                    </div>
                </div>

                {/* Completed Contests */}
                <div className="flex justify-between items-center bg-white shadow-sm p-6 border-purple-500 border-l-4 rounded-xl">
                    <div>
                        <p className="font-medium text-gray-500 text-sm uppercase">Winners Declared</p>
                        <h3 className="font-bold text-2xl">{stats.completedContests}</h3>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                        <FaCheckCircle size={24} />
                    </div>
                </div>
            </div>

            {/* Additional Info / Action Area */}
            <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
                <div className="bg-white shadow-sm p-6 border rounded-xl">
                    <h3 className="mb-4 font-bold text-lg">Quick Tip</h3>
                    <p className="text-gray-600">
                        Keep your contest descriptions clear and detailed to attract more high-quality submissions. 
                        Check the "My Created Contests" tab to manage participants.
                    </p>
                </div>
                <div className="bg-gradient-to-r from-primary to-blue-600 shadow-md p-6 rounded-xl text-white">
                    <h3 className="mb-2 font-bold text-lg">Want to reach more people?</h3>
                    <p className="opacity-90 mb-4">Make sure your contest status is 'Approved' by the admin to show up on the homepage.</p>
                    <button className="border-white btn-outline text-white btn btn-sm">Learn More</button>
                </div>
            </div>

        <MyParticipated />

        </div>
    );
};

export default CreatorDashboardHome;