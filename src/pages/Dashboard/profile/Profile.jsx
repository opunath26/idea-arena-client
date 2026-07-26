import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { 
    FaUserCircle, 
    FaUserShield, 
    FaBriefcase, 
    FaEnvelope, 
    FaCalendarAlt, 
    FaEdit, 
    FaTrophy, 
    FaCheckCircle, 
    FaPaperPlane,
    FaClock
} from 'react-icons/fa';

const Profile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isEditing, setIsEditing] = useState(false);

    // Fetch dynamic role
    const { data: roleData, isLoading: isRoleLoading } = useQuery({
        queryKey: ['userRole', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}/role`);
            return res.data;
        }
    });

    const role = roleData?.role || 'user';

    // Fetch user stats/payments or activity
    const { data: userPayments = [] } = useQuery({
        queryKey: ['userPayments', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-payments/${user?.email}`);
            return res.data;
        }
    });

    return (
        <div className="bg-slate-50/50 p-4 sm:p-6 lg:p-8 min-h-screen">
            <div className="space-y-8 mx-auto max-w-5xl">
                
                {/* Header Profile Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative bg-white shadow-slate-200/50 shadow-xl p-6 sm:p-8 border border-slate-100 rounded-3xl overflow-hidden"
                >
                    {/* Top Decorative Banner Accent */}
                    <div className="top-0 left-0 absolute bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 w-full h-24"></div>

                    <div className="z-10 relative flex sm:flex-row flex-col justify-between sm:items-end gap-6 pt-8 sm:pt-4">
                        <div className="flex sm:flex-row flex-col items-center sm:items-end gap-5 sm:text-left text-center">
                            
                            {/* Profile Image with Ring */}
                            <div className="relative">
                                <img 
                                    src={user?.photoURL || "https://i.ibb.co/mJR9QPG/placeholder.png"} 
                                    alt="Profile Avatar" 
                                    className="bg-white shadow-lg p-1 rounded-2xl ring-4 ring-purple-500/20 w-28 h-28 object-cover"
                                />
                                <span className="right-1 bottom-1 absolute bg-emerald-500 rounded-full ring-2 ring-white w-4 h-4"></span>
                            </div>

                            {/* User Info */}
                            <div className="space-y-1">
                                <h1 className="font-black text-slate-900 text-2xl sm:text-3xl tracking-tight">
                                    {user?.displayName || "User Name"}
                                </h1>
                                <p className="flex justify-center sm:justify-start items-center gap-2 font-medium text-slate-500 text-sm">
                                    <FaEnvelope className="text-purple-500 text-xs" /> {user?.email}
                                </p>
                                
                                {/* Dynamic Role Badge */}
                                <div className="pt-2">
                                    <span className="inline-flex items-center gap-1.5 bg-purple-50 px-3 py-1 border border-purple-200 rounded-full font-bold text-purple-700 text-xs uppercase tracking-wider">
                                        {role === 'admin' && <FaUserShield className="text-purple-600" />}
                                        {role === 'candidate' && <FaBriefcase className="text-purple-600" />}
                                        {role === 'user' && <FaUserCircle className="text-purple-600" />}
                                        Role: {role}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Action Edit Button */}
                        <button 
                            onClick={() => setIsEditing(!isEditing)}
                            className="inline-flex justify-center items-center gap-2 bg-slate-100 hover:bg-slate-200 px-5 py-2.5 rounded-xl font-semibold text-slate-700 text-sm active:scale-95 transition-all cursor-pointer"
                        >
                            <FaEdit className="text-purple-600" />
                            {isEditing ? "Cancel Editing" : "Edit Profile"}
                        </button>
                    </div>
                </motion.div>

                {/* Role Specific Quick Stats */}
                <div className="gap-4 sm:gap-6 grid grid-cols-1 sm:grid-cols-3">
                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white shadow-sm p-5 border border-slate-100 rounded-2xl"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-slate-500 text-xs uppercase tracking-wide">Contests Joined / Paid</p>
                                <h3 className="mt-1 font-extrabold text-slate-900 text-2xl">{userPayments.length}</h3>
                            </div>
                            <div className="flex justify-center items-center bg-purple-50 rounded-xl w-12 h-12 text-purple-600">
                                <FaTrophy className="text-xl" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="bg-white shadow-sm p-5 border border-slate-100 rounded-2xl"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-slate-500 text-xs uppercase tracking-wide">Account Status</p>
                                <h3 className="mt-1 font-extrabold text-emerald-600 text-2xl">Active</h3>
                            </div>
                            <div className="flex justify-center items-center bg-emerald-50 rounded-xl w-12 h-12 text-emerald-600">
                                <FaCheckCircle className="text-xl" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white shadow-sm p-5 border border-slate-100 rounded-2xl"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-slate-500 text-xs uppercase tracking-wide">Member Since</p>
                                <h3 className="mt-1 font-bold text-slate-900 text-lg">
                                    {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}
                                </h3>
                            </div>
                            <div className="flex justify-center items-center bg-indigo-50 rounded-xl w-12 h-12 text-indigo-600">
                                <FaCalendarAlt className="text-xl" />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Personal Information & Activity Details */}
                <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
                    
                    {/* User Details / Edit Form */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="lg:col-span-2 bg-white shadow-sm p-6 border border-slate-100 rounded-3xl"
                    >
                        <h2 className="mb-6 font-bold text-slate-900 text-xl">Account Details</h2>

                        {isEditing ? (
                            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                                <div>
                                    <label className="block mb-1.5 font-semibold text-slate-700 text-xs">Full Name</label>
                                    <input 
                                        type="text" 
                                        defaultValue={user?.displayName} 
                                        className="bg-slate-50 px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-purple-600 w-full text-slate-800 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1.5 font-semibold text-slate-700 text-xs">Photo URL</label>
                                    <input 
                                        type="text" 
                                        defaultValue={user?.photoURL} 
                                        className="bg-slate-50 px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-purple-600 w-full text-slate-800 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1.5 font-semibold text-slate-700 text-xs">Email Address (Read Only)</label>
                                    <input 
                                        type="email" 
                                        value={user?.email || ''} 
                                        disabled 
                                        className="bg-slate-100 px-4 py-2.5 border border-slate-200 rounded-xl w-full text-slate-500 text-sm cursor-not-allowed"
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    className="bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-500/20 px-6 py-2.5 rounded-xl font-bold text-white text-sm active:scale-95 transition-all cursor-pointer"
                                >
                                    Save Changes
                                </button>
                            </form>
                        ) : (
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between items-center py-2.5 border-slate-100 border-b">
                                    <span className="font-medium text-slate-500">Display Name</span>
                                    <span className="font-semibold text-slate-900">{user?.displayName || "Not set"}</span>
                                </div>
                                <div className="flex justify-between items-center py-2.5 border-slate-100 border-b">
                                    <span className="font-medium text-slate-500">Email Address</span>
                                    <span className="font-semibold text-slate-900">{user?.email}</span>
                                </div>
                                <div className="flex justify-between items-center py-2.5 border-slate-100 border-b">
                                    <span className="font-medium text-slate-500">Assigned System Role</span>
                                    <span className="font-bold text-purple-600 capitalize">{role}</span>
                                </div>
                                <div className="flex justify-between items-center py-2.5">
                                    <span className="font-medium text-slate-500">Email Verification</span>
                                    <span className={`font-semibold ${user?.emailVerified ? 'text-emerald-600' : 'text-amber-600'}`}>
                                        {user?.emailVerified ? 'Verified' : 'Unverified'}
                                    </span>
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Recent Payment / Contest Participation */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white shadow-sm p-6 border border-slate-100 rounded-3xl"
                    >
                        <h2 className="mb-4 font-bold text-slate-900 text-xl">Recent Payments</h2>
                        
                        {userPayments.length > 0 ? (
                            <div className="space-y-3">
                                {userPayments.slice(0, 4).map((pay, idx) => (
                                    <div key={pay._id || idx} className="bg-slate-50 p-3 rounded-2xl">
                                        <div className="flex justify-between items-start">
                                            <span className="max-w-[150px] font-bold text-slate-800 text-xs truncate">
                                                {pay.contestTitle || "Contest Entry"}
                                            </span>
                                            <span className="font-extrabold text-emerald-600 text-xs">
                                                ${pay.amount}
                                            </span>
                                        </div>
                                        <p className="mt-1 text-[11px] text-slate-500">
                                            Trx: <span className="font-mono">{pay.transactionId?.slice(0, 10)}...</span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-8 text-slate-400 text-center">
                                <FaClock className="mx-auto mb-2 text-2xl" />
                                <p className="text-xs">No recent contest payments found.</p>
                            </div>
                        )}
                    </motion.div>

                </div>

            </div>
        </div>
    );
};

export default Profile;