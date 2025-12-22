import React, { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentSuccess = () => {

    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] =useState({});
    const sessionId = searchParams.get('session_id');
    const axiosSecure = useAxiosSecure();

    // console.log(sessionId);

    useEffect( () =>{
        if(sessionId){
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
            .then(res =>{
                console.log(res.data);
                setPaymentInfo({
                    transactionId: res.data.transactionId,
                    trackingId: res.data.trackingId
                })
            })
        }
    }, [sessionId,axiosSecure])
    
  return (
    <div className="bg-gray-100 dark:bg-gray-900 px-4 min-h-screen">
      <h1 className="mb-4 font-extrabold text-gray-900 dark:text-white text-3xl">
          Payment Successful
        </h1>
        <p>Your TransactionId: {paymentInfo.transactionId}</p>
        <p>Your Contest Tracking id: {paymentInfo.trackingId}</p>
    </div>
  );
};

export default PaymentSuccess;
