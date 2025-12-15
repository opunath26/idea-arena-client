import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router';

const PaymentSuccess = () => {
  return (
    <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-900 px-4 min-h-screen">
      <div className="bg-white dark:bg-gray-800 shadow-xl p-10 rounded-2xl max-w-md text-center">
        <FaCheckCircle className="mx-auto mb-6 text-green-500 text-6xl" />
        <h1 className="mb-4 font-extrabold text-gray-900 dark:text-white text-3xl">
          Payment Successful!
        </h1>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Thank you for your payment. Your transaction has been completed successfully.
        </p>
        <Link to="/dashboard/my-contests" className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-md font-semibold text-white transition">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
