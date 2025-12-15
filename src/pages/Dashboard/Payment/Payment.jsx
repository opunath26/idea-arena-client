import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import SpinnerLoader from '../../SpinnerLoader';

const Payment = () => {
    const {contestId} = useParams();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: contest } = useQuery({
        queryKey: ['contests', contestId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/${contestId}`);
            return res.data;
        }
    })

    if(isLoading){
        return <SpinnerLoader />
    }

    const handlePayment = async() => {
        const paymentInfo = {
            contestCreationFee: contest.contestCreationFee,
            contestId: contest._id,
            creatorEmail: contest.creatorEmail,
            contestTitle: contest.contestTitle
        }

        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
        console.log(res.data);
       window.location.href = res.data.url;
    }


    return (
        <div>
            <h2>Please Pay ${contest.contestCreationFee} for : {contest.contestTitle} </h2>
            <button onClick={handlePayment} className='btn btn-primary'>Pay</button>
        </div>
    );
};

export default Payment;