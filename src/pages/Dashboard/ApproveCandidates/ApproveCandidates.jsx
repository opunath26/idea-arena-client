import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaEye, FaUserCheck, FaUserClock } from 'react-icons/fa6';
import { IoPersonRemove } from 'react-icons/io5';
import { TbTrashXFilled } from 'react-icons/tb';
import Swal from 'sweetalert2';

const ApproveCandidates = () => {
    const axiosSecure = useAxiosSecure();
    const { refetch, data: candidates = [] } = useQuery({
        queryKey: ['candidates', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/candidates');
            return res.data;
        }
    });

    const updateCandidateStatus = (candidate, status) => {
        const updateInfo = { status: status, email: candidate.candidateEmail };
        axiosSecure.patch(`/candidates/${candidate._id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `Candidate status updated to ${status}`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            });
    };

    const handleApproval = candidate => {
        updateCandidateStatus(candidate, 'approved');
    };

    const handleRejection = candidate => {
        updateCandidateStatus(candidate, 'rejected');
    };

    const handleDeleted = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This candidate record will be permanently deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/candidates/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Candidate deleted successfully',
                                showConfirmButton: false,
                                timer: 2000
                            });
                        }
                    });
            }
        });
    };

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4 bg-base-100 shadow-sm p-6 border border-base-200 rounded-2xl">
                <div>
                    <h2 className="flex items-center gap-2 font-bold text-slate-800 dark:text-white text-2xl">
                        <FaUserClock className="text-purple-600" /> Candidate Approvals
                    </h2>
                    <p className="mt-1 text-slate-500 text-sm">
                        Manage and review candidate applications submitted to the platform.
                    </p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/40 px-4 py-2 border border-purple-200 dark:border-purple-800 rounded-xl font-semibold text-purple-700 dark:text-purple-300 text-sm">
                    Total Candidates: {candidates.length}
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
                                <th>Name</th>
                                <th>Email</th>
                                <th>Application Status</th>
                                <th>Work Status</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {candidates.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="py-10 text-slate-400 text-center">
                                        No pending candidates found.
                                    </td>
                                </tr>
                            ) : (
                                candidates.map((candidate, index) => (
                                    <tr key={candidate._id} className="hover:bg-base-200/40 border-base-200 border-b transition-colors">
                                        <th className="font-medium text-slate-500">{index + 1}</th>
                                        <td className="font-semibold text-slate-800 dark:text-slate-200">
                                            {candidate.candidateName}
                                        </td>
                                        <td className="text-slate-500">{candidate.candidateEmail}</td>
                                        <td>
                                            <span
                                                className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${
                                                    candidate.status === 'approved'
                                                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                                                        : candidate.status === 'rejected'
                                                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400'
                                                        : 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                                                }`}
                                            >
                                                {candidate.status || 'pending'}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md font-medium text-slate-600 dark:text-slate-300 text-xs">
                                                {candidate.workStatus || 'N/A'}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="flex justify-center items-center gap-1.5">
                                                {/* View Button */}
                                                <div className="tooltip" data-tip="View Details">
                                                    <button className="hover:bg-sky-50 dark:hover:bg-sky-950/50 text-sky-600 btn btn-sm btn-square btn-ghost">
                                                        <FaEye className="size-4" />
                                                    </button>
                                                </div>

                                                {/* Approve Button */}
                                                <div className="tooltip" data-tip="Approve">
                                                    <button
                                                        onClick={() => handleApproval(candidate)}
                                                        className="hover:bg-emerald-50 dark:hover:bg-emerald-950/50 text-emerald-600 btn btn-sm btn-square btn-ghost"
                                                    >
                                                        <FaUserCheck className="size-4" />
                                                    </button>
                                                </div>

                                                {/* Reject Button */}
                                                <div className="tooltip" data-tip="Reject">
                                                    <button
                                                        onClick={() => handleRejection(candidate)}
                                                        className="hover:bg-amber-50 dark:hover:bg-amber-950/50 text-amber-600 btn btn-sm btn-square btn-ghost"
                                                    >
                                                        <IoPersonRemove className="size-4" />
                                                    </button>
                                                </div>

                                                {/* Delete Button */}
                                                <div className="tooltip" data-tip="Delete">
                                                    <button
                                                        onClick={() => handleDeleted(candidate._id)}
                                                        className="hover:bg-rose-50 dark:hover:bg-rose-950/50 text-rose-600 btn btn-sm btn-square btn-ghost"
                                                    >
                                                        <TbTrashXFilled className="size-4" />
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

export default ApproveCandidates;