import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaMagnifyingGlass, FaTrashCan } from 'react-icons/fa6';
import { TbEdit } from 'react-icons/tb';
import Swal from 'sweetalert2';
import { Link } from 'react-router';


const MyContests = () => {

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: contests = [], refetch } = useQuery({
    queryKey: ['myContests', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests?email=${user.email}`)
      return res.data;
    }
  })

  const handleContestDelete = id => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        axiosSecure.delete(`/contests/${id}`)
          .then(res => {
            console.log(res.data);

            if (res.data.deletedCount) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your contest has been deleted.",
                icon: "success"
              });
            }
          })
      }
    });
  }

  const handlePayment = async (contest) => {
    const paymentInfo = {
            contestCreationFee: contest.contestCreationFee,
            contestId: contest._id,
            creatorEmail: contest.creatorEmail,
            contestTitle: contest.contestTitle
        }
        const res = await axiosSecure.post('/payment-checkout-session', paymentInfo);
        console.log(res.data.url);
        window.location.assign(res.data.url);
  }

  return (
    <div>
      <h2>All of my Contests: {contests.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>CreationFee</th>
              <th>Payment</th>
              <th>Tracking Id</th>
              <th>Submit Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              contests.map((contest, index) => <tr key={contest._id}>
                <th>{index + 1}</th>
                <td>{contest.contestTitle}</td>
                <td>{contest.contestCreationFee} $</td>
                <td>
                  {
                    contest.paymentStatus === 'paid' ?
                    <span className='text-green-400'>Paid</span>
                    :
                    
                    <button onClick={() => handlePayment(contest)} className="btn btn-primary btn-sm">Pay</button>
                    
                  }
                </td>
                <td>
                  <Link to={`/contest-track/${contest.trackingId}`}>{contest.trackingId}</Link>
                </td>
                <td>{contest.submitStatus}</td>
                <td>
                  <button className='hover:bg-primary btn-square btn'>
                    <FaMagnifyingGlass />
                  </button>
                  <button className='hover:bg-primary mx-2 btn-square btn'>
                    <TbEdit />
                  </button>
                  <button onClick={() => handleContestDelete(contest._id)} className='hover:bg-primary btn-square btn'>
                    <FaTrashCan />
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

export default MyContests;