import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaArrowLeft, FaEye, FaExternalLinkAlt, FaTimes, FaTrophy } from 'react-icons/fa';
import SpinnerLoader from '../../SpinnerLoader';

const ContestSubmissionsList = () => {
    const { contestId } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const [selectedSubmission, setSelectedSubmission] = useState(null);

    const { data: submissions = [], refetch, isLoading } = useQuery({
        queryKey: ['submissions-by-contest', contestId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/submissions?contestId=${contestId}`);
            return res.data;
        }
    });

    // 1. Handle Reject Submission
    const handleReject = (id) => {
        Swal.fire({
            title: 'Reject Submission?',
            text: 'Are you sure you want to reject this entry?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, Reject'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/submissions/reject/${id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            setSelectedSubmission(null);
                            Swal.fire('Rejected!', 'The submission has been rejected.', 'success');
                        }
                    })
                    .catch(err => {
                        Swal.fire('Error', err.response?.data?.message || 'Something went wrong', 'error');
                    });
            }
        });
    };

    // 2. Handle Declare Winner
    const handleWinner = (submission) => {
        Swal.fire({
            title: 'Declare Winner?',
            text: `Select ${submission.submittedByName || submission.submittedByEmail} as the Winner?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#9333ea',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, Make Winner!'
        }).then((result) => {
            if (result.isConfirmed) {
                const winnerData = {
                    contestId: submission.contestId,
                    winnerEmail: submission.submittedByEmail,
                    winnerName: submission.submittedByName || 'N/A',
                    winnerPhoto: submission.submittedByPhoto || ''
                };

                axiosSecure.patch(`/declare-winner/${submission._id}`, winnerData)
                    .then(res => {
                        if (res.data.success) {
                            refetch();
                            setSelectedSubmission(null);
                            Swal.fire('Winner Selected!', 'Winner declared successfully 🎉', 'success');
                        }
                    })
                    .catch(err => {
                        Swal.fire('Error', err.response?.data?.message || 'Something went wrong', 'error');
                    });
            }
        });
    };

    if (isLoading) return <div> <SpinnerLoader /> </div>;

    return (
        <div className="space-y-6 text-slate-900">
            {/* Header */}
            <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4 bg-white shadow-sm p-6 border border-slate-200 rounded-2xl">
                <div>
                    <button 
                        onClick={() => navigate(-1)} 
                        className="flex items-center gap-2 mb-2 font-medium text-purple-600 hover:text-purple-800 text-sm cursor-pointer"
                    >
                        <FaArrowLeft /> Back to Contests
                    </button>
                    <h2 className="font-bold text-slate-800 text-2xl">Submissions List</h2>
                </div>
                <div className="bg-purple-50 px-4 py-2 border border-purple-200 rounded-xl font-semibold text-purple-700 text-sm">
                    Total Entries: {submissions.length}
                </div>
            </div>

            {/* Submissions Table */}
            <div className="bg-white shadow-sm border border-slate-200 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full text-slate-800">
                        <thead className="bg-slate-100/80 text-slate-700 text-sm">
                            <tr>
                                <th>#</th>
                                <th>Participant</th>
                                <th>Title / Idea Name</th>
                                <th className="text-center">Status</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {submissions.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="py-10 text-slate-400 text-center">
                                        No entries submitted yet for this contest.
                                    </td>
                                </tr>
                            ) : (
                                submissions.map((item, index) => (
                                    <tr key={item._id} className="hover:bg-slate-50 border-slate-200 border-b">
                                        <th>{index + 1}</th>
                                        <td>
                                            <div className="font-semibold text-slate-800">{item.submittedByName || 'Anonymous'}</div>
                                            <div className="text-slate-500 text-xs">{item.submittedByEmail}</div>
                                        </td>
                                        <td className="max-w-xs font-medium truncate">{item.title || item.ideaName || 'N/A'}</td>
                                        <td className="text-center">
                                            {item.status === 'winner' && (
                                                <span className="bg-amber-100 px-3 py-1 rounded-full font-bold text-amber-800 text-xs">Winner 🎉</span>
                                            )}
                                            {item.status === 'rejected' && (
                                                <span className="bg-rose-100 px-3 py-1 rounded-full font-semibold text-rose-800 text-xs">Rejected</span>
                                            )}
                                            {(!item.status || item.status === 'submitted') && (
                                                <span className="bg-blue-100 px-3 py-1 rounded-full font-semibold text-blue-800 text-xs">Pending</span>
                                            )}
                                        </td>
                                        <td className="text-center">
                                            <button
                                                onClick={() => setSelectedSubmission(item)}
                                                className="flex justify-center items-center gap-1.5 bg-slate-800 hover:bg-slate-900 mx-auto px-3 py-1.5 rounded-lg font-medium text-white text-xs cursor-pointer"
                                            >
                                                <FaEye /> View Submission
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Submission Detail Modal */}
            {selectedSubmission && (
                <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/50 p-4">
                    <div className="space-y-4 bg-white shadow-2xl p-6 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center pb-3 border-slate-100 border-b">
                            <h3 className="font-bold text-slate-800 text-xl">Submission Details</h3>
                            <button 
                                onClick={() => setSelectedSubmission(null)}
                                className="hover:bg-slate-100 p-1 rounded-lg text-slate-400 hover:text-slate-600"
                            >
                                <FaTimes className="size-5" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="space-y-3 text-sm">
                            <div>
                                <label className="font-bold text-slate-500 text-xs uppercase">Title / Idea Name</label>
                                <p className="font-semibold text-slate-800 text-base">{selectedSubmission.title || selectedSubmission.ideaName || 'N/A'}</p>
                            </div>

                            <div>
                                <label className="font-bold text-slate-500 text-xs uppercase">Description / Pitch</label>
                                <p className="bg-slate-50 p-3 rounded-xl text-slate-700 whitespace-pre-wrap">{selectedSubmission.description || selectedSubmission.pitch || 'N/A'}</p>
                            </div>

                            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
                                <div>
                                    <label className="font-bold text-slate-500 text-xs uppercase">Project Link / Live URL</label>
                                    {selectedSubmission.projectLink || selectedSubmission.liveUrl ? (
                                        <a href={selectedSubmission.projectLink || selectedSubmission.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 mt-1 text-purple-600 hover:underline">
                                            Visit Link <FaExternalLinkAlt className="size-3" />
                                        </a>
                                    ) : <p className="text-slate-400">N/A</p>}
                                </div>

                                <div>
                                    <label className="font-bold text-slate-500 text-xs uppercase">Submission File / Image Link</label>
                                    {selectedSubmission.fileLink || selectedSubmission.submissionFile ? (
                                        <a href={selectedSubmission.fileLink || selectedSubmission.submissionFile} target="_blank" rel="noreferrer" className="flex items-center gap-1 mt-1 text-purple-600 hover:underline">
                                            View File <FaExternalLinkAlt className="size-3" />
                                        </a>
                                    ) : <p className="text-slate-400">N/A</p>}
                                </div>
                            </div>

                            {selectedSubmission.videoLink && (
                                <div>
                                    <label className="font-bold text-slate-500 text-xs uppercase">Video Demo Link</label>
                                    <a href={selectedSubmission.videoLink} target="_blank" rel="noreferrer" className="flex items-center gap-1 mt-1 text-purple-600 hover:underline">
                                        Watch Video <FaExternalLinkAlt className="size-3" />
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Modal Actions */}
                        <div className="flex justify-end gap-3 pt-4 border-slate-100 border-t">
                            {selectedSubmission.status !== 'rejected' && (
                                <button
                                    onClick={() => handleReject(selectedSubmission._id)}
                                    className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 px-4 py-2 rounded-xl font-medium text-white text-sm transition-colors cursor-pointer"
                                >
                                    <FaTimes /> Reject
                                </button>
                            )}

                            {selectedSubmission.status !== 'winner' && (
                                <button
                                    onClick={() => handleWinner(selectedSubmission)}
                                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl font-medium text-white text-sm transition-colors cursor-pointer"
                                >
                                    <FaTrophy /> Make Winner
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContestSubmissionsList;