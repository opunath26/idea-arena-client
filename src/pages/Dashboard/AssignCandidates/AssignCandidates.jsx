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
        <div className="space-y-4 sm:space-y-6 text-slate-900">
            {/* Header Section */}
            <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4 bg-white shadow-sm p-4 sm:p-6 border border-slate-200 rounded-2xl">
                <div>
                    <h2 className="flex items-center gap-2 font-bold text-slate-800 text-xl sm:text-2xl">
                        <MdOutlineAssignmentTurnedIn className="text-purple-600 shrink-0" /> Assign Candidates
                    </h2>
                    <p className="mt-1 text-slate-500 text-xs sm:text-sm">
                        Find and assign available candidates to completed contests.
                    </p>
                </div>
                <div className="bg-purple-50 px-3.5 sm:px-4 py-1.5 sm:py-2 border border-purple-200 rounded-xl font-semibold text-purple-700 text-xs sm:text-sm shrink-0">
                    Contests Ready: {contests.length}
                </div>
            </div>

            {/* Main Contests Table Card */}
            <div className="bg-white shadow-sm border border-slate-200 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full text-slate-800">
                        {/* Table Head */}
                        <thead className="bg-slate-100/80 text-slate-700 text-xs sm:text-sm">
                            <tr>
                                <th className="py-3.5 sm:py-4">#</th>
                                <th>Contest Type</th>
                                <th>Creation Fee</th>
                                <th>Created At</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="text-xs sm:text-sm">
                            {contests.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="py-10 text-slate-400 text-center">
                                        No contests available for assignment.
                                    </td>
                                </tr>
                            ) : (
                                contests.map((contest, index) => (
                                    <tr key={contest._id} className="hover:bg-slate-50 border-slate-200 border-b transition-colors">
                                        <th className="font-medium text-slate-500">{index + 1}</th>
                                        <td className="whitespace-nowrap">
                                            <span className="bg-purple-100 px-3 py-1 rounded-full font-semibold text-purple-700 text-xs">
                                                {contest.contestType || 'General'}
                                            </span>
                                        </td>
                                        <td className="font-semibold text-emerald-600 whitespace-nowrap">
                                            ${contest.contestCreationFee}
                                        </td>
                                        <td className="text-slate-500 text-xs sm:text-sm whitespace-nowrap">{contest.createAt || 'N/A'}</td>
                                        <td className="text-center whitespace-nowrap">
                                            <button
                                                onClick={() => openAssignCandidateModal(contest)}
                                                className="gap-2 bg-purple-600 hover:bg-purple-700 px-3.5 sm:px-4 border-none rounded-xl text-white cursor-pointer btn btn-xs sm:btn-sm"
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
                className="modal-bottom modal sm:modal-middle"
            >
                <div className="space-y-4 bg-white p-5 sm:p-6 border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto text-slate-800 modal-box">
                    {/* Modal Header */}
                    <div className="flex justify-between items-center pb-3 border-slate-200 border-b">
                        <div>
                            <h3 className="flex items-center gap-2 font-bold text-slate-800 text-base sm:text-lg">
                                <FaUsers className="text-purple-600 shrink-0" /> Available Candidates
                            </h3>
                            <p className="mt-0.5 text-slate-500 text-xs">
                                Matching type: <span className="font-semibold text-purple-600">{selectedContest?.contestType}</span>
                            </p>
                        </div>
                        <form method="dialog">
                            <button className="p-1 rounded-lg text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                                <FaXmark className="size-5" />
                            </button>
                        </form>
                    </div>

                    {/* Candidate Table inside Modal */}
                    <div className="border border-slate-200 rounded-xl max-h-80 overflow-x-auto">
                        <table className="table w-full text-slate-800">
                            <thead className="top-0 sticky bg-slate-100 text-slate-700 text-xs sm:text-sm">
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-xs sm:text-sm">
                                {candidates.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="py-8 text-slate-400 text-center">
                                            No available candidates found for this category.
                                        </td>
                                    </tr>
                                ) : (
                                    candidates.map((candidate, i) => (
                                        <tr key={candidate._id} className="hover:bg-slate-50 border-slate-200 border-b">
                                            <th className="font-medium text-slate-500">{i + 1}</th>
                                            <td className="font-semibold text-slate-800 whitespace-nowrap">
                                                {candidate.candidateName}
                                            </td>
                                            <td className="text-slate-600 text-xs sm:text-sm whitespace-nowrap">{candidate.candidateEmail}</td>
                                            <td className="text-center whitespace-nowrap">
                                                <button
                                                    onClick={() => handleAssignCandidate(candidate)}
                                                    className="bg-emerald-600 hover:bg-emerald-700 px-3 border-none rounded-lg text-white cursor-pointer btn btn-xs"
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
                            <button className="bg-slate-200 hover:bg-slate-300 px-5 border-none rounded-xl text-slate-700 cursor-pointer btn btn-sm">
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