import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaUserPlus, FaUsers, FaXmark } from 'react-icons/fa6';
import { MdOutlineAssignmentTurnedIn } from 'react-icons/md';

const AssignCandidates = () => {
    const [selectedContest, setSelectedContest] = useState(null);
    const axiosSecure = useAxiosSecure();
    const candidateModalRef = useRef();

    const { data: contests = [], refetch: contestsRefetch } = useQuery({
        queryKey: ['contests', 'submit-done'],
        queryFn: async () => {
            const res = await axiosSecure.get('/contests?submitStatus=submit-done');
            return res.data;
        }
    });

    const { data: candidates = [] } = useQuery({
        queryKey: ['candidates', selectedContest?.contestType, 'available'],
        enabled: !!selectedContest,
        queryFn: async () => {
            const res = await axiosSecure.get(`/candidates?status=approved&contestType=${selectedContest?.contestType}&workStatus=available`);
            return res.data;
        }
    });

    const openAssignCandidateModal = (contest) => {
        setSelectedContest(contest);
        candidateModalRef.current.showModal();
    };

    const handleAssignCandidate = (candidate) => {
        const assignmentAssignInfo = {
            candidateId: candidate._id,
            candidateEmail: candidate.candidateEmail,
            candidateName: candidate.candidateName,
            contestId: selectedContest._id,
            trackingId: selectedContest.trackingId,
        };
        axiosSecure.patch(`/contests/${selectedContest._id}`, assignmentAssignInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    candidateModalRef.current.close();
                    contestsRefetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Candidate has been assigned successfully',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-base-100 p-6 rounded-2xl border border-base-200 shadow-sm">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <MdOutlineAssignmentTurnedIn className="text-purple-600" /> Assign Candidates
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                        Find and assign available candidates to completed contests.
                    </p>
                </div>
                <div className="px-4 py-2 bg-purple-50 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 font-semibold rounded-xl text-sm border border-purple-200 dark:border-purple-800">
                    Contests Ready: {contests.length}
                </div>
            </div>

            {/* Main Contests Table Card */}
            <div className="bg-base-100 rounded-2xl border border-base-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* Table Head */}
                        <thead className="bg-base-200/60 text-slate-600 dark:text-slate-300">
                            <tr>
                                <th className="py-4">#</th>
                                <th>Contest Type</th>
                                <th>Creation Fee</th>
                                <th>Created At</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {contests.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-10 text-slate-400">
                                        No contests available for assignment.
                                    </td>
                                </tr>
                            ) : (
                                contests.map((contest, index) => (
                                    <tr key={contest._id} className="hover:bg-base-200/40 transition-colors border-b border-base-200">
                                        <th className="font-medium text-slate-500">{index + 1}</th>
                                        <td>
                                            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
                                                {contest.contestType || 'General'}
                                            </span>
                                        </td>
                                        <td className="font-semibold text-emerald-600 dark:text-emerald-400">
                                            ${contest.contestCreationFee}
                                        </td>
                                        <td className="text-slate-500 text-sm">{contest.createAt || 'N/A'}</td>
                                        <td className="text-center">
                                            <button
                                                onClick={() => openAssignCandidateModal(contest)}
                                                className="btn btn-sm bg-purple-600 hover:bg-purple-700 text-white border-none rounded-xl gap-2 px-4"
                                            >
                                                <FaUserPlus className="size-3.5" /> Find Candidates
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Candidate Selection Modal */}
            <dialog
                ref={candidateModalRef}
                className="modal modal-bottom sm:modal-middle"
            >
                <div className="modal-box bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 space-y-4 max-w-2xl">
                    {/* Modal Header */}
                    <div className="flex justify-between items-center border-b pb-3 border-slate-100 dark:border-slate-800">
                        <div>
                            <h3 className="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
                                <FaUsers className="text-purple-600" /> Available Candidates
                            </h3>
                            <p className="text-xs text-slate-500 mt-0.5">
                                Matching type: <span className="font-semibold text-purple-600">{selectedContest?.contestType}</span>
                            </p>
                        </div>
                        <form method="dialog">
                            <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg transition-colors">
                                <FaXmark className="size-5" />
                            </button>
                        </form>
                    </div>

                    {/* Candidate Table inside Modal */}
                    <div className="overflow-x-auto max-h-80 border border-slate-100 dark:border-slate-800 rounded-xl">
                        <table className="table w-full">
                            <thead className="bg-base-200/60 sticky top-0 text-slate-600 dark:text-slate-300">
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {candidates.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="text-center py-8 text-slate-400">
                                            No available candidates found for this category.
                                        </td>
                                    </tr>
                                ) : (
                                    candidates.map((candidate, i) => (
                                        <tr key={candidate._id} className="hover:bg-base-200/40 border-b border-base-200">
                                            <th className="font-medium text-slate-500">{i + 1}</th>
                                            <td className="font-semibold text-slate-800 dark:text-slate-200">
                                                {candidate.candidateName}
                                            </td>
                                            <td className="text-slate-500 text-sm">{candidate.candidateEmail}</td>
                                            <td className="text-center">
                                                <button
                                                    onClick={() => handleAssignCandidate(candidate)}
                                                    className="btn btn-xs bg-emerald-600 hover:bg-emerald-700 text-white border-none rounded-lg px-3"
                                                >
                                                    Assign
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Modal Actions */}
                    <div className="flex justify-end pt-2">
                        <form method="dialog">
                            <button className="btn btn-sm bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-none rounded-xl px-5">
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AssignCandidates;