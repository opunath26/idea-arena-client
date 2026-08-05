import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { MdOutlineAssignmentTurnedIn } from 'react-icons/md';

const ContestManagement = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: contests = [], refetch } = useQuery({
        queryKey: ['contests', user?.email, 'candidate-assigned'],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/candidate?candidateEmail=${user.email}&submitStatus=candidate-assigned`);
            return res.data;
        }
    });

    const handleSubmissionStatusUpdate = (contest, status) => {
        const statusInfo = { 
            submitStatus: status,
            candidateId: contest.candidateId,
            trackingId: contest.trackingId
        };

        const message = `Contest Status is updated to ${status.split('-').join(' ')}`;

        axiosSecure.patch(`/contests/${contest._id}/status`, statusInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    return (
        <div className="space-y-4 sm:space-y-6 text-slate-900">
            {/* Header Section */}
            <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4 bg-white shadow-sm p-4 sm:p-6 border border-slate-200 rounded-2xl">
                <div>
                    <h2 className="flex items-center gap-2 font-bold text-slate-800 text-xl sm:text-2xl">
                        <MdOutlineAssignmentTurnedIn className="text-purple-600 shrink-0" /> Manage Submissions
                    </h2>
                    <p className="mt-1 text-slate-500 text-xs sm:text-sm">
                        Review candidate submissions and manage winner selections or status updates.
                    </p>
                </div>
                <div className="bg-purple-50 px-3.5 sm:px-4 py-1.5 sm:py-2 border border-purple-200 rounded-xl font-semibold text-purple-700 text-xs sm:text-sm shrink-0">
                    Active Submissions: {contests.length}
                </div>
            </div>

            {/* Main Table Card */}
            <div className="bg-white shadow-sm border border-slate-200 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full text-slate-800">
                        {/* Table Head */}
                        <thead className="bg-slate-100/80 text-slate-700 text-xs sm:text-sm">
                            <tr>
                                <th className="py-3.5 sm:py-4">#</th>
                                <th>Contest Title</th>
                                <th>Candidate Email</th>
                                <th className="text-center">Submission Status</th>
                                <th className="text-center">Other Actions</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="text-xs sm:text-sm">
                            {contests.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="py-10 text-slate-400 text-center">
                                        No submissions found to manage.
                                    </td>
                                </tr>
                            ) : (
                                contests.map((contest, i) => (
                                    <tr key={contest._id} className="hover:bg-slate-50 border-slate-200 border-b transition-colors">
                                        <th className="font-medium text-slate-500">{i + 1}</th>
                                        <td className="font-semibold text-slate-800 whitespace-nowrap">
                                            {contest.contestTitle || 'N/A'}
                                        </td>
                                        <td className="text-slate-600 whitespace-nowrap">{contest.candidateEmail}</td>
                                        <td className="text-center whitespace-nowrap">
                                            {contest.submitStatus === 'candidate-assigned' ? (
                                                <div className="flex justify-center items-center gap-2">
                                                    <button
                                                        onClick={() => handleSubmissionStatusUpdate(contest, 'submission-approved')}
                                                        className="bg-emerald-600 hover:bg-emerald-700 px-3 border-none rounded-lg text-white cursor-pointer btn btn-xs"
                                                    >
                                                        Accept
                                                    </button>
                                                    <button
                                                        onClick={() => handleSubmissionStatusUpdate(contest, 'submission-rejected')}
                                                        className="bg-rose-600 hover:bg-rose-700 px-3 border-none rounded-lg text-white cursor-pointer btn btn-xs"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="inline-block bg-emerald-100 px-2.5 py-1 rounded-full font-semibold text-emerald-800 text-xs capitalize">
                                                    {contest.submitStatus?.split('-').join(' ')}
                                                </span>
                                            )}
                                        </td>
                                        <td className="text-center whitespace-nowrap">
                                            <div className="flex justify-center items-center gap-2">
                                                <button
                                                    onClick={() => handleSubmissionStatusUpdate(contest, 'winner-selected')}
                                                    className="bg-blue-600 hover:bg-blue-700 px-3 border-none rounded-lg text-white cursor-pointer btn btn-xs"
                                                >
                                                    Select Winner
                                                </button>
                                                <button
                                                    onClick={() => handleSubmissionStatusUpdate(contest, 'prize-delivered')}
                                                    className="bg-purple-600 hover:bg-purple-700 px-3 border-none rounded-lg text-white cursor-pointer btn btn-xs"
                                                >
                                                    Prize Delivered
                                                </button>
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

export default ContestManagement;