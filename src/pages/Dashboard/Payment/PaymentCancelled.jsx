import React from 'react';
import { FaCircleXmark, FaRotateLeft, FaHouse } from 'react-icons/fa6';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div className="flex justify-center items-center p-4 min-h-[80vh]">
            <div className="relative bg-base-100 shadow-xl p-8 border border-base-200 rounded-3xl w-full max-w-md overflow-hidden text-center">
                {/* Decorative Background Glow */}
                <div className="-top-12 -right-12 absolute bg-rose-500/10 blur-2xl rounded-full w-32 h-32 pointer-events-none" />
                <div className="-bottom-12 -left-12 absolute bg-amber-500/10 blur-2xl rounded-full w-32 h-32 pointer-events-none" />

                {/* Cancelled Icon */}
                <div className="inline-flex justify-center items-center bg-rose-100 dark:bg-rose-950/60 mb-6 rounded-full ring-8 ring-rose-50 dark:ring-rose-950/30 w-20 h-20 text-rose-600 dark:text-rose-400">
                    <FaCircleXmark className="size-10" />
                </div>

                {/* Header Text */}
                <h1 className="font-bold text-slate-800 dark:text-white text-2xl">
                    Payment Cancelled!
                </h1>
                <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm">
                    Your payment transaction was not completed or was cancelled. No charges were made to your account.
                </p>

                {/* Help Note Box */}
                <div className="bg-amber-50 dark:bg-amber-950/30 my-6 p-4 border border-amber-200/60 dark:border-amber-900/40 rounded-2xl text-left">
                    <p className="font-medium text-amber-800 dark:text-amber-300 text-xs leading-relaxed">
                        💡 <strong>Need help?</strong> If you encountered an issue during checkout, you can re-initiate payment anytime from your dashboard.
                    </p>
                </div>

                {/* Action Navigation Buttons */}
                <div className="flex sm:flex-row flex-col items-center gap-3 mt-8">
                    <Link
                        to="/dashboard/my-contests"
                        className="gap-2 bg-rose-600 hover:bg-rose-700 border-none rounded-xl w-full font-medium text-white btn"
                    >
                        <FaRotateLeft className="size-3.5" /> Try Again
                    </Link>

                    <Link
                        to="/"
                        className="gap-2 hover:bg-base-200 border-base-300 rounded-xl btn-outline w-full font-medium text-slate-700 dark:text-slate-200 btn"
                    >
                        <FaHouse className="size-3.5 text-slate-500" /> Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancelled;