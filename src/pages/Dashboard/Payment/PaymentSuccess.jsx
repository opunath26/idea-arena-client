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
        <div className="flex justify-center items-center bg-slate-50 p-4 min-h-[85vh]">
            <div className="relative bg-white shadow-lg p-6 sm:p-8 border border-slate-200 rounded-3xl w-full max-w-md overflow-hidden text-center">
                {/* Decorative Background Glow */}
                <div className="-top-12 -right-12 absolute bg-emerald-500/10 blur-2xl rounded-full w-32 h-32 pointer-events-none" />
                <div className="-bottom-12 -left-12 absolute bg-purple-500/10 blur-2xl rounded-full w-32 h-32 pointer-events-none" />

                {/* Success Animated Icon */}
                <div className="inline-flex justify-center items-center bg-emerald-100 mb-6 rounded-full ring-8 ring-emerald-50/80 w-16 sm:w-20 h-16 sm:h-20 text-emerald-600 animate-bounce shrink-0">
                    <FaCircleCheck className="size-8 sm:size-10" />
                </div>

                <h1 className="font-bold text-slate-900 text-xl sm:text-2xl tracking-tight">
                    Payment Successful!
                </h1>
                <p className="mt-2 text-slate-500 text-xs sm:text-sm leading-relaxed">
                    Thank you for your payment. Your contest creation fee has been processed successfully.
                </p>

                {/* Content Details */}
                {loading ? (
                    <div className="flex flex-col justify-center items-center gap-3 my-8 py-6">
                        <span className="text-purple-600 loading loading-spinner loading-md"></span>
                        <p className="text-slate-400 text-xs">Fetching receipt details...</p>
                    </div>
                ) : (
                    <div className="space-y-3 bg-slate-50/80 my-5 sm:my-6 p-3.5 sm:p-4 border border-slate-200/80 rounded-2xl text-left">
                        {/* Transaction ID */}
                        <div className="flex justify-between items-center gap-2 bg-white shadow-2xs p-2.5 sm:p-3 border border-slate-200 rounded-xl">
                            <div className="flex-1 min-w-0">
                                <span className="block font-semibold text-[10px] text-slate-400 sm:text-[11px] uppercase tracking-wider">
                                    Transaction ID
                                </span>
                                <span className="block font-mono font-medium text-slate-800 text-xs sm:text-sm truncate">
                                    {paymentInfo.transactionId || 'N/A'}
                                </span>
                            </div>
                            {paymentInfo.transactionId && (
                                <button
                                    onClick={() => handleCopy(paymentInfo.transactionId, 'Transaction ID')}
                                    className="hover:bg-purple-50 p-2 rounded-lg text-slate-400 hover:text-purple-600 transition-colors shrink-0"
                                    title="Copy Transaction ID"
                                >
                                    <FaCopy className="size-3.5" />
                                </button>
                            )}
                        </div>

                        {/* Contest Tracking ID */}
                        <div className="flex justify-between items-center gap-2 bg-white shadow-2xs p-2.5 sm:p-3 border border-slate-200 rounded-xl">
                            <div className="flex-1 min-w-0">
                                <span className="block font-semibold text-[10px] text-slate-400 sm:text-[11px] uppercase tracking-wider">
                                    Tracking ID
                                </span>
                                <span className="block font-mono font-medium text-purple-600 text-xs sm:text-sm truncate">
                                    #{paymentInfo.trackingId || 'N/A'}
                                </span>
                            </div>
                            {paymentInfo.trackingId && (
                                <button
                                    onClick={() => handleCopy(paymentInfo.trackingId, 'Tracking ID')}
                                    className="hover:bg-purple-50 p-2 rounded-lg text-slate-400 hover:text-purple-600 transition-colors shrink-0"
                                    title="Copy Tracking ID"
                                >
                                    <FaCopy className="size-3.5" />
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Action Navigation Buttons */}
                <div className="flex sm:flex-row flex-col items-center gap-3 mt-6 sm:mt-8">
                    {paymentInfo.trackingId ? (
                        <Link
                            to={`/contest-track/${paymentInfo.trackingId}`}
                            className="inline-flex justify-center items-center gap-2 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 shadow-sm px-4 py-3 rounded-xl w-full font-medium text-white text-xs sm:text-sm transition-colors"
                        >
                            Track Contest <FaArrowRight className="size-3.5" />
                        </Link>
                    ) : null}

                    <Link
                        to="/dashboard/my-contests"
                        className="inline-flex justify-center items-center gap-2 bg-white hover:bg-slate-100 px-4 py-3 border border-slate-300 rounded-xl w-full font-medium text-slate-700 text-xs sm:text-sm transition-colors"
                    >
                        <FaTrophy className="size-3.5 text-purple-600" /> My Contests
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;