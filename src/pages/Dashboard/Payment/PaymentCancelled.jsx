import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div className="flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 px-4 min-h-screen">
            <div className="bg-white dark:bg-gray-800 shadow-2xl p-10 border-red-500 border-t-4 rounded-xl text-center">
                <h1 className="mb-4 font-extrabold text-red-600 text-4xl">
                    Payment Cancelled!
                </h1>
                <p className="mb-6 text-gray-600 dark:text-gray-300">
                    Your payment could not be processed at this time. Please try again.
                </p>
                <Link to="/dashboard/my-contests">
                    <button className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200">
                        Try Again
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default PaymentCancelled;
