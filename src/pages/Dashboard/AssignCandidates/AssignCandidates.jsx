import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AssignCandidates = () => {
    const [selectedContest, setSelectedContest] = useState(null);
    const axiosSecure = useAxiosSecure();
    const candidateModalRef = useRef();


    const { data: contests = [], refetch: contestsRefetch } = useQuery({
        queryKey: ['contests', 'submit-done'],
        queryFn: async () => {
            const res = await axiosSecure.get('/contests?submitStatus=submit-done')
            return res.data;
        }
    })

    const { data: candidates = [] } = useQuery({
        queryKey: ['candidates', selectedContest?.contestType, 'available'],
        enabled: !!selectedContest,
        queryFn: async () => {
            const res = await axiosSecure.get(`/candidates?status=approved&contestType=${selectedContest?.contestType}&workStatus=available`);
            return res.data;
        }
    })

    const openAssignCandidateModal = contest => {
        setSelectedContest(contest);
        candidateModalRef.current.showModal();
    }

    const handleAssignCandidate = candidate => {
        const assignmentAssignInfo = {
            candidateId: candidate._id,
            candidateEmail: candidate.candidateEmail,
            candidateName: candidate.candidateName,
            contestId: selectedContest._id,
        }
        axiosSecure.patch(`/contests/${selectedContest._id}`, assignmentAssignInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    candidateModalRef.current.close();
                    contestsRefetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Candidate has been  assigned',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <div>
            <h2 className="text-5xl">Assign Candidates: {contests.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Contest Title</th>
                            <th>Contest Type</th>
                            <th>Contest CreationFee</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            contests.map((contest, index) => <tr key={contest._id}>
                                <th>{index + 1}</th>
                                <td>{contest.contestTitle}</td>
                                <td>{contest.contestType}</td>
                                <td>{contest.contestCreationFee}</td>
                                <td>{contest.createAt}</td>
                                <td>
                                    <button
                                        onClick={() => openAssignCandidateModal(contest)}
                                        className='btn btn-primary'>Find Candidates</button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>

            <dialog
                ref={candidateModalRef}
                className="modal-bottom modal sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Candidates: {candidates.length}</h3>

                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    candidates.map((candidate, i) => <tr key={candidate._id}>
                                        <th>{i + 1}</th>
                                        <td>{candidate.candidateName}</td>
                                        <td>{candidate.candidateEmail}</td>
                                        <td>
                                            <button
                                                onClick={() => handleAssignCandidate(candidate)}
                                                className="btn-primary">Assign</button>
                                        </td>
                                    </tr>)
                                }

                            </tbody>
                        </table>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AssignCandidates;