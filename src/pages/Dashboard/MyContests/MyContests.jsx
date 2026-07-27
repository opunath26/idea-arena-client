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
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4 bg-base-100 shadow-sm p-6 border border-base-200 rounded-2xl">
                <div>
                    <h2 className="flex items-center gap-2 font-bold text-slate-800 dark:text-white text-2xl">
                        <FaTrophy className="text-purple-600" /> My Contests
                    </h2>
                    <p className="mt-1 text-slate-500 text-sm">
                        View, manage, track, and pay for all your created contests.
                    </p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/40 px-4 py-2 border border-purple-200 dark:border-purple-800 rounded-xl font-semibold text-purple-700 dark:text-purple-300 text-sm">
                    Total Contests: {contests.length}
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-base-100 shadow-sm border border-base-200 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* Table Head */}
                        <thead className="bg-base-200/60 text-slate-600 dark:text-slate-300">
                            <tr>
                                <th className="py-4">#</th>
                                <th>Contest Title</th>
                                <th>Creation Fee</th>
                                <th>Payment</th>
                                <th>Tracking ID</th>
                                <th>Submit Status</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {contests.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="py-10 text-slate-400 text-center">
                                        You haven't created any contests yet.
                                    </td>
                                </tr>
                            ) : (
                                contests.map((contest, index) => (
                                    <tr key={contest._id} className="hover:bg-base-200/40 border-base-200 border-b transition-colors">
                                        <th className="font-medium text-slate-500">{index + 1}</th>
                                        <td className="max-w-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                                            {contest.contestTitle}
                                        </td>
                                        <td className="font-semibold text-emerald-600 dark:text-emerald-400">
                                            ${contest.contestCreationFee}
                                        </td>
                                        <td>
                                            {contest.paymentStatus === 'paid' ? (
                                                <span className="bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full font-semibold text-emerald-700 dark:text-emerald-400 text-xs">
                                                    Paid
                                                </span>
                                            ) : (
                                                <button
                                                    onClick={() => handlePayment(contest)}
                                                    className="gap-1.5 bg-purple-600 hover:bg-purple-700 px-3 border-none rounded-lg text-white btn btn-xs"
                                                >
                                                    <FaCreditCard className="size-3" /> Pay Now
                                                </button>
                                            )}
                                        </td>
                                        <td>
                                            {contest.trackingId ? (
                                                <Link
                                                    to={`/contest-track/${contest.trackingId}`}
                                                    className="inline-block bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/50 px-2.5 py-1 border border-purple-200 dark:border-purple-800 rounded-lg font-mono font-medium text-purple-600 dark:text-purple-300 text-xs transition-colors"
                                                >
                                                    #{contest.trackingId}
                                                </Link>
                                            ) : (
                                                <span className="text-slate-400 text-xs">N/A</span>
                                            )}
                                        </td>
                                        <td>
                                            <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md font-medium text-slate-600 dark:text-slate-300 text-xs capitalize">
                                                {contest.submitStatus || 'Pending'}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="flex justify-center items-center gap-1.5">
                                                {/* View Details Button */}
                                                <div className="tooltip" data-tip="Track Details">
                                                    <Link
                                                        to={`/contest-track/${contest.trackingId}`}
                                                        className="hover:bg-sky-50 dark:hover:bg-sky-950/50 text-sky-600 btn btn-sm btn-square btn-ghost"
                                                    >
                                                        <FaMagnifyingGlass className="size-4" />
                                                    </Link>
                                                </div>

                                                {/* Edit Button */}
                                                <div className="tooltip" data-tip="Edit Contest">
                                                    <button className="hover:bg-amber-50 dark:hover:bg-amber-950/50 text-amber-600 btn btn-sm btn-square btn-ghost">
                                                        <TbEdit className="size-4.5" />
                                                    </button>
                                                </div>

                                                {/* Delete Button */}
                                                <div className="tooltip" data-tip="Delete Contest">
                                                    <button
                                                        onClick={() => handleContestDelete(contest._id)}
                                                        className="hover:bg-rose-50 dark:hover:bg-rose-950/50 text-rose-600 btn btn-sm btn-square btn-ghost"
                                                    >
                                                        <FaTrashCan className="size-4" />
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