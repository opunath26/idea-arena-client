import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaEye, FaUserCheck } from 'react-icons/fa6';
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
    })

    const updateCandidateStatus = (candidate, status) =>{
        const updateInfo = { status: status, email: candidate.candidateEmail }
        axiosSecure.patch(`/candidates/${candidate._id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `Candidate status is set to ${status}.`,
                        showConfirmButton: false,
                        timer: 2500
                    });
                }
            })
    }

    const handleApproval = candidate => {
        updateCandidateStatus(candidate, 'approved');
    }

    const handleRejection = candidate =>{
        updateCandidateStatus(candidate, 'rejected');
    }

    const handleDeleted = id => {
    Swal.fire({
        title: 'Are you sure?',
        text: 'This candidate will be permanently deleted!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it'
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
        <div>
            <h2 className="text-5xl">Candidates Pending Approval: {candidates.length} </h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            candidates.map((candidate, index) => <tr>
                                <th>{index + 1}</th>
                                <td>{candidate.candidateName}</td>
                                <td>{candidate.candidateEmail}</td>
                                <td>
                                    <p className={`${candidate.status==='approved' ? 'text-green-800' : 'text-red-500'}`}>{candidate.status}</p>
                                </td>
                                <td className="space-x-2">
                                    <button
                                        className="btn btn-info">
                                        <FaEye />

                                    </button>
                                    <button
                                        onClick={() => handleApproval(candidate)} className="btn btn-success">
                                        <FaUserCheck />

                                    </button>
                                    <button
                                    onClick={ () => handleRejection(candidate)}
                                    className="btn btn-warning">
                                        <IoPersonRemove />

                                    </button>
                                    <button
                                    onClick={ () =>  handleDeleted(candidate._id)}
                                    className="btn btn-error">
                                        <TbTrashXFilled />

                                    </button>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApproveCandidates;