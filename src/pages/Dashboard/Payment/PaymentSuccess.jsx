import React, { useEffect, useState } from 'react';
import { FaCircleCheck, FaCopy, FaTrophy, FaArrowRight } from 'react-icons/fa6';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const sessionId = searchParams.get('session_id');
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    setPaymentInfo({
                        transactionId: res.data.transactionId,
                        trackingId: res.data.trackingId
                    });
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Payment confirmation failed:", err);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [sessionId, axiosSecure]);

    const handleCopy = (text, label) => {
        navigator.clipboard.writeText(text);
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: `${label} copied to clipboard!`,
            showConfirmButton: false,
            timer: 1500
        });
    };

    return (
        <div className="flex justify-center items-center p-4 min-h-[80vh]">
            <div className="relative bg-base-100 shadow-xl p-8 border border-base-200 rounded-3xl w-full max-w-md overflow-hidden text-center">
                {/* Decorative Background Glow */}
                <div className="-top-12 -right-12 absolute bg-emerald-500/10 blur-2xl rounded-full w-32 h-32 pointer-events-none" />
                <div className="-bottom-12 -left-12 absolute bg-purple-500/10 blur-2xl rounded-full w-32 h-32 pointer-events-none" />

                {/* Success Animated Icon */}
                <div className="inline-flex justify-center items-center bg-emerald-100 dark:bg-emerald-950/60 mb-6 rounded-full ring-8 ring-emerald-50 dark:ring-emerald-950/30 w-20 h-20 text-emerald-600 dark:text-emerald-400 animate-bounce">
                    <FaCircleCheck className="size-10" />
                </div>

                <h1 className="font-bold text-slate-800 dark:text-white text-2xl">
                    Payment Successful!
                </h1>
                <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm">
                    Thank you for your payment. Your contest creation fee has been processed successfully.
                </p>

                {/* Content Details */}
                {loading ? (
                    <div className="flex flex-col justify-center items-center gap-3 my-8 py-6">
                        <span className="text-purple-600 loading loading-spinner loading-md"></span>
                        <p className="text-slate-400 text-xs">Fetching receipt details...</p>
                    </div>
                ) : (
                    <div className="space-y-3 bg-base-200/50 my-6 p-4 border border-base-200 rounded-2xl text-left">
                        {/* Transaction ID */}
                        <div className="flex justify-between items-center gap-2 bg-base-100 p-2.5 border border-base-200/60 rounded-xl">
                            <div>
                                <span className="block font-semibold text-[11px] text-slate-400 uppercase tracking-wider">
                                    Transaction ID
                                </span>
                                <span className="block max-w-[200px] font-mono font-medium text-slate-700 dark:text-slate-200 text-xs truncate">
                                    {paymentInfo.transactionId || 'N/A'}
                                </span>
                            </div>
                            {paymentInfo.transactionId && (
                                <button
                                    onClick={() => handleCopy(paymentInfo.transactionId, 'Transaction ID')}
                                    className="text-slate-400 hover:text-purple-600 btn btn-xs btn-ghost btn-square"
                                    title="Copy Transaction ID"
                                >
                                    <FaCopy className="size-3.5" />
                                </button>
                            )}
                        </div>

                        {/* Contest Tracking ID */}
                        <div className="flex justify-between items-center gap-2 bg-base-100 p-2.5 border border-base-200/60 rounded-xl">
                            <div>
                                <span className="block font-semibold text-[11px] text-slate-400 uppercase tracking-wider">
                                    Tracking ID
                                </span>
                                <span className="block font-mono font-medium text-purple-600 dark:text-purple-400 text-xs">
                                    #{paymentInfo.trackingId || 'N/A'}
                                </span>
                            </div>
                            {paymentInfo.trackingId && (
                                <button
                                    onClick={() => handleCopy(paymentInfo.trackingId, 'Tracking ID')}
                                    className="text-slate-400 hover:text-purple-600 btn btn-xs btn-ghost btn-square"
                                    title="Copy Tracking ID"
                                >
                                    <FaCopy className="size-3.5" />
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Action Navigation Buttons */}
                <div className="flex sm:flex-row flex-col items-center gap-3 mt-8">
                    {paymentInfo.trackingId ? (
                        <Link
                            to={`/contest-track/${paymentInfo.trackingId}`}
                            className="gap-2 bg-purple-600 hover:bg-purple-700 border-none rounded-xl w-full font-medium text-white btn"
                        >
                            Track Contest <FaArrowRight className="size-3.5" />
                        </Link>
                    ) : null}

                    <Link
                        to="/dashboard/my-contests"
                        className="gap-2 hover:bg-base-200 border-base-300 rounded-xl btn-outline w-full font-medium text-slate-700 dark:text-slate-200 btn"
                    >
                        <FaTrophy className="size-3.5 text-purple-600" /> My Contests
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;