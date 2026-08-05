import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaMagnifyingGlass, FaTrashCan, FaTrophy, FaCreditCard } from 'react-icons/fa6';
import { TbEdit } from 'react-icons/tb';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyContests = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: contests = [], refetch } = useQuery({
        queryKey: ['myContests', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests?email=${user.email}`);
            return res.data;
        }
    });

    const handleContestDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this contest!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/contests/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: "Your contest has been deleted.",
                                showConfirmButton: false,
                                timer: 2000
                            });
                        }
                    });
            }
        });
    };

    const handlePayment = async (contest) => {
        const paymentInfo = {
            contestCreationFee: contest.contestCreationFee,
            contestId: contest._id,
            creatorEmail: contest.creatorEmail,
            contestTitle: contest.contestTitle
        };
        const res = await axiosSecure.post('/payment-checkout-session', paymentInfo);
        window.location.assign(res.data.url);
    };

    return (
        <div className="space-y-6 bg-slate-50 p-4 sm:p-6 md:p-8 min-h-screen text-slate-800">
            {/* Header Section */}
            <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4 bg-white shadow-sm p-4 sm:p-6 border border-slate-200 rounded-2xl">
                <div>
                    <h2 className="flex items-center gap-2 font-bold text-slate-900 text-xl sm:text-2xl tracking-tight">
                        <FaTrophy className="text-purple-600 shrink-0" /> My Contests
                    </h2>
                    <p className="mt-1 text-slate-500 text-xs sm:text-sm">
                        View, manage, track, and pay for all your created contests.
                    </p>
                </div>
                <div className="inline-flex items-center bg-purple-50 px-3.5 py-1.5 border border-purple-200 rounded-xl font-semibold text-purple-700 text-xs sm:text-sm shrink-0">
                    Total Contests: {contests.length}
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-white shadow-sm border border-slate-200 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[680px] text-left border-collapse">
                        {/* Table Head */}
                        <thead>
                            <tr className="bg-slate-100/80 border-slate-200 border-b font-semibold text-slate-600 text-xs uppercase tracking-wider">
                                <th className="px-4 py-3.5 w-12 text-center">#</th>
                                <th className="px-4 py-3.5">Contest Title</th>
                                <th className="px-4 py-3.5">Creation Fee</th>
                                <th className="px-4 py-3.5">Payment</th>
                                <th className="px-4 py-3.5">Tracking ID</th>
                                <th className="px-4 py-3.5">Submit Status</th>
                                <th className="px-4 py-3.5 text-center">Actions</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                            {contests.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="py-12 font-medium text-slate-400 text-center">
                                        You haven't created any contests yet.
                                    </td>
                                </tr>
                            ) : (
                                contests.map((contest, index) => (
                                    <tr key={contest._id} className="hover:bg-slate-50/80 transition-colors">
                                        <th className="px-4 py-3.5 font-medium text-slate-400 text-center">{index + 1}</th>
                                        <td className="px-4 py-3.5 max-w-[200px] sm:max-w-xs font-semibold text-slate-800 truncate">
                                            {contest.contestTitle}
                                        </td>
                                        <td className="px-4 py-3.5 font-bold text-emerald-600">
                                            ${contest.contestCreationFee}
                                        </td>
                                        <td className="px-4 py-3.5">
                                            {contest.paymentStatus === 'paid' ? (
                                                <span className="inline-flex items-center bg-emerald-50 px-2.5 py-1 border border-emerald-200 rounded-full font-semibold text-emerald-700 text-xs">
                                                    Paid
                                                </span>
                                            ) : (
                                                <button
                                                    onClick={() => handlePayment(contest)}
                                                    className="inline-flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 shadow-xs px-3 py-1.5 border border-transparent rounded-lg font-medium text-white text-xs transition-colors"
                                                >
                                                    <FaCreditCard className="size-3" /> Pay Now
                                                </button>
                                            )}
                                        </td>
                                        <td className="px-4 py-3.5">
                                            {contest.trackingId ? (
                                                <Link
                                                    to={`/contest-track/${contest.trackingId}`}
                                                    className="inline-block bg-purple-50 hover:bg-purple-100 px-2.5 py-1 border border-purple-200 rounded-lg font-mono font-medium text-purple-700 text-xs transition-colors"
                                                >
                                                    #{contest.trackingId}
                                                </Link>
                                            ) : (
                                                <span className="text-slate-400 text-xs">N/A</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <span className="inline-block bg-slate-100 px-2.5 py-1 border border-slate-200 rounded-md font-medium text-slate-700 text-xs capitalize">
                                                {contest.submitStatus || 'Pending'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <div className="flex justify-center items-center gap-1.5">
                                                {/* View Details Button */}
                                                <div className="tooltip" data-tip="Track Details">
                                                    <Link
                                                        to={`/contest-track/${contest.trackingId}`}
                                                        className="inline-flex justify-center items-center hover:bg-sky-50 p-2 border border-transparent hover:border-sky-200 rounded-lg text-sky-600 transition-colors"
                                                    >
                                                        <FaMagnifyingGlass className="size-3.5" />
                                                    </Link>
                                                </div>

                                                {/* Edit Button */}
                                                <div className="tooltip" data-tip="Edit Contest">
                                                    <button className="inline-flex justify-center items-center hover:bg-amber-50 p-2 border border-transparent hover:border-amber-200 rounded-lg text-amber-600 transition-colors">
                                                        <TbEdit className="size-4" />
                                                    </button>
                                                </div>

                                                {/* Delete Button */}
                                                <div className="tooltip" data-tip="Delete Contest">
                                                    <button
                                                        onClick={() => handleContestDelete(contest._id)}
                                                        className="inline-flex justify-center items-center hover:bg-rose-50 p-2 border border-transparent hover:border-rose-200 rounded-lg text-rose-600 transition-colors"
                                                    >
                                                        <FaTrashCan className="size-3.5" />
                                                    </button>
                                                </div>
                                            </div>
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

export default MyContests;