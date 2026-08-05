import React from 'react';
import { FaCircleXmark, FaRotateLeft, FaHouse } from 'react-icons/fa6';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div className="flex justify-center items-center bg-slate-50 p-4 min-h-[85vh]">
            <div className="relative bg-white shadow-lg p-6 sm:p-8 border border-slate-200 rounded-3xl w-full max-w-md overflow-hidden text-center">
                {/* Decorative Background Glow */}
                <div className="-top-12 -right-12 absolute bg-rose-500/10 blur-2xl rounded-full w-32 h-32 pointer-events-none" />
                <div className="-bottom-12 -left-12 absolute bg-amber-500/10 blur-2xl rounded-full w-32 h-32 pointer-events-none" />

                {/* Cancelled Icon */}
                <div className="inline-flex justify-center items-center bg-rose-100 mb-6 rounded-full ring-8 ring-rose-50/80 w-16 sm:w-20 h-16 sm:h-20 text-rose-600 shrink-0">
                    <FaCircleXmark className="size-8 sm:size-10" />
                </div>

                {/* Header Text */}
                <h1 className="font-bold text-slate-900 text-xl sm:text-2xl tracking-tight">
                    Payment Cancelled!
                </h1>
                <p className="mt-2 text-slate-500 text-xs sm:text-sm leading-relaxed">
                    Your payment transaction was not completed or was cancelled. No charges were made to your account.
                </p>

                {/* Help Note Box */}
                <div className="bg-amber-50 my-6 p-3.5 sm:p-4 border border-amber-200/80 rounded-2xl text-left">
                    <p className="font-medium text-amber-900 text-xs leading-relaxed">
                        💡 <strong>Need help?</strong> If you encountered an issue during checkout, you can re-initiate payment anytime from your dashboard.
                    </p>
                </div>

                {/* Action Navigation Buttons */}
                <div className="flex sm:flex-row flex-col items-center gap-3 mt-6 sm:mt-8">
                    <Link
                        to="/dashboard/my-contests"
                        className="inline-flex justify-center items-center gap-2 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 shadow-sm px-4 py-3 rounded-xl w-full font-medium text-white text-xs sm:text-sm transition-colors"
                    >
                        <FaRotateLeft className="size-3.5" /> Try Again
                    </Link>

                    <Link
                        to="/"
                        className="inline-flex justify-center items-center gap-2 bg-white hover:bg-slate-100 px-4 py-3 border border-slate-300 rounded-xl w-full font-medium text-slate-700 text-xs sm:text-sm transition-colors"
                    >
                        <FaHouse className="size-3.5 text-slate-500" /> Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancelled;