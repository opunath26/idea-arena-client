import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaEye, FaUserCheck, FaUserClock, FaXmark } from 'react-icons/fa6';
import { IoPersonRemove } from 'react-icons/io5';
import { TbTrashXFilled } from 'react-icons/tb';
import Swal from 'sweetalert2';

const ApproveCandidates = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedCandidate, setSelectedCandidate] = useState(null);

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
        <div className="space-y-4 sm:space-y-6 text-slate-900">
            {/* Header Section */}
            <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4 bg-white shadow-sm p-4 sm:p-6 border border-slate-200 rounded-2xl">
                <div>
                    <h2 className="flex items-center gap-2 font-bold text-slate-800 text-xl sm:text-2xl">
                        <FaUserClock className="text-purple-600 shrink-0" /> Candidate Approvals
                    </h2>
                    <p className="mt-1 text-slate-500 text-xs sm:text-sm">
                        Manage and review candidate applications submitted to the platform.
                    </p>
                </div>
                <div className="bg-purple-50 px-3.5 sm:px-4 py-1.5 sm:py-2 border border-purple-200 rounded-xl font-semibold text-purple-700 text-xs sm:text-sm shrink-0">
                    Total Candidates: {candidates.length}
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-white shadow-sm border border-slate-200 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full text-slate-800">
                        {/* Table Head */}
                        <thead className="bg-slate-100/80 text-slate-700 text-xs sm:text-sm">
                            <tr>
                                <th className="py-3.5 sm:py-4">#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Application Status</th>
                                <th>Work Status</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="text-xs sm:text-sm">
                            {candidates.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="py-10 text-slate-400 text-center">
                                        No pending candidates found.
                                    </td>
                                </tr>
                            ) : (
                                candidates.map((candidate, index) => (
                                    <tr key={candidate._id} className="hover:bg-slate-50 border-slate-200 border-b transition-colors">
                                        <th className="font-medium text-slate-500">{index + 1}</th>
                                        <td className="font-semibold text-slate-800 whitespace-nowrap">
                                            {candidate.candidateName}
                                        </td>
                                        <td className="text-slate-600 whitespace-nowrap">{candidate.candidateEmail}</td>
                                        <td>
                                            <span
                                                className={`px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-semibold rounded-full capitalize whitespace-nowrap inline-block ${
                                                    candidate.status === 'approved'
                                                        ? 'bg-emerald-100 text-emerald-800'
                                                        : candidate.status === 'rejected'
                                                            ? 'bg-rose-100 text-rose-800'
                                                            : 'bg-amber-100 text-amber-800'
                                                }`}
                                            >
                                                {candidate.status || 'pending'}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="inline-block bg-slate-100 px-2.5 py-1 rounded-md font-medium text-slate-700 text-xs whitespace-nowrap">
                                                {candidate.workStatus || 'N/A'}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="flex justify-center items-center gap-1">
                                                <div className="tooltip" data-tip="View Details">
                                                    <button
                                                        onClick={() => setSelectedCandidate(candidate)}
                                                        className="hover:bg-sky-50 text-sky-600 btn btn-sm btn-square btn-ghost"
                                                    >
                                                        <FaEye className="size-4" />
                                                    </button>
                                                </div>

                                                {/* Approve Button */}
                                                <div className="tooltip" data-tip="Approve">
                                                    <button
                                                        onClick={() => handleApproval(candidate)}
                                                        className="hover:bg-emerald-50 text-emerald-600 btn btn-sm btn-square btn-ghost"
                                                    >
                                                        <FaUserCheck className="size-4" />
                                                    </button>
                                                </div>

                                                {/* Reject Button */}
                                                <div className="tooltip" data-tip="Reject">
                                                    <button
                                                        onClick={() => handleRejection(candidate)}
                                                        className="hover:bg-amber-50 text-amber-600 btn btn-sm btn-square btn-ghost"
                                                    >
                                                        <IoPersonRemove className="size-4" />
                                                    </button>
                                                </div>

                                                {/* Delete Button */}
                                                <div className="tooltip" data-tip="Delete">
                                                    <button
                                                        onClick={() => handleDeleted(candidate._id)}
                                                        className="hover:bg-rose-50 text-rose-600 btn btn-sm btn-square btn-ghost"
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

            {/* View Details Modal */}
            {selectedCandidate && (
                <div className="z-50 fixed inset-0 flex justify-center items-center bg-slate-900/50 backdrop-blur-xs p-4">
                    <div className="relative space-y-4 bg-white shadow-2xl p-5 sm:p-6 border border-slate-200 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto text-slate-800 animate-fade-in">

                        {/* Close Icon Button */}
                        <button
                            onClick={() => setSelectedCandidate(null)}
                            className="top-4 right-4 absolute p-1 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <FaXmark className="size-5" />
                        </button>

                        <h3 className="pr-8 pb-3 border-slate-200 border-b font-bold text-slate-800 text-lg sm:text-xl">
                            Candidate Application Details
                        </h3>

                        <div className="space-y-2.5 text-slate-700 text-xs sm:text-sm">
                            <p><strong className="text-slate-900">Name:</strong> {selectedCandidate.candidateName}</p>
                            <p><strong className="text-slate-900">Email:</strong> {selectedCandidate.candidateEmail}</p>
                            <p><strong className="text-slate-900">Phone:</strong> {selectedCandidate.candidateNumber || 'N/A'}</p>
                            <p><strong className="text-slate-900">Category:</strong> {selectedCandidate.contestType || 'N/A'}</p>
                            <p><strong className="text-slate-900">Skills:</strong> {selectedCandidate.candidateSkills || 'N/A'}</p>
                            <p><strong className="text-slate-900">Experience:</strong> {selectedCandidate.candidateExperience || 'N/A'}</p>

                            <div className="bg-slate-50 mt-3 p-3 border border-slate-200 rounded-xl">
                                <strong className="block mb-1 text-slate-900">Reason to Join:</strong>
                                <p className="text-slate-600 break-words italic">{selectedCandidate.reason || 'No reason provided.'}</p>
                            </div>
                        </div>

                        <div className="flex justify-end pt-2">
                            <button
                                onClick={() => setSelectedCandidate(null)}
                                className="bg-purple-600 hover:bg-purple-700 px-5 border-none rounded-xl text-white cursor-pointer btn btn-sm"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApproveCandidates;