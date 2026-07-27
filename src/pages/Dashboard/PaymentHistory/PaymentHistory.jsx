import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaReceipt, FaCopy } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payments', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user?.email}`);
            return res.data;
        }
    });

    const handleCopy = (text, label) => {
        navigator.clipboard.writeText(text);
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: `${label} copied!`,
            showConfirmButton: false,
            timer: 1500
        });
    };

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4 bg-base-100 shadow-sm p-6 border border-base-200 rounded-2xl">
                <div>
                    <h2 className="flex items-center gap-2 font-bold text-slate-800 dark:text-white text-2xl">
                        <FaReceipt className="text-purple-600" /> Payment History
                    </h2>
                    <p className="mt-1 text-slate-500 text-sm">
                        Track all your past contest creation payments and transaction receipts.
                    </p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/40 px-4 py-2 border border-purple-200 dark:border-purple-800 rounded-xl font-semibold text-purple-700 dark:text-purple-300 text-sm">
                    Total Payments: {payments.length}
                </div>
            </div>

            {/* Payments Table Card */}
            <div className="bg-base-100 shadow-sm border border-base-200 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* Table Head */}
                        <thead className="bg-base-200/60 text-slate-600 dark:text-slate-300">
                            <tr>
                                <th className="py-4">#</th>
                                <th>Transaction ID</th>
                                <th>Contest ID</th>
                                <th>Amount</th>
                                <th>Paid Time</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan="5" className="py-10 text-center">
                                        <span className="text-purple-600 loading loading-spinner loading-md"></span>
                                    </td>
                                </tr>
                            ) : payments.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="py-10 text-slate-400 text-center">
                                        No payment history found.
                                    </td>
                                </tr>
                            ) : (
                                payments.map((payment, index) => (
                                    <tr key={payment._id || index} className="hover:bg-base-200/40 border-base-200 border-b transition-colors">
                                        <th className="font-medium text-slate-500">{index + 1}</th>
                                        
                                        {/* Transaction ID with Copy Option */}
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <span className="bg-purple-50 dark:bg-purple-950/50 px-2.5 py-1 border border-purple-200 dark:border-purple-800 rounded-md font-mono font-semibold text-purple-600 dark:text-purple-400 text-xs">
                                                    {payment.transactionId || 'N/A'}
                                                </span>
                                                {payment.transactionId && (
                                                    <button
                                                        onClick={() => handleCopy(payment.transactionId, 'Transaction ID')}
                                                        className="text-slate-400 hover:text-purple-600 btn btn-xs btn-ghost btn-square"
                                                        title="Copy Transaction ID"
                                                    >
                                                        <FaCopy className="size-3" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>

                                        {/* Contest ID */}
                                        <td>
                                            <span className="font-mono text-slate-600 dark:text-slate-400 text-xs">
                                                #{payment.contestId || 'N/A'}
                                            </span>
                                        </td>

                                        {/* Amount */}
                                        <td className="font-bold text-emerald-600 dark:text-emerald-400">
                                            ${payment.amount}
                                        </td>

                                        {/* Paid Time */}
                                        <td className="text-slate-500 text-xs">
                                            {payment.paidAt ? new Date(payment.paidAt).toLocaleString() : 'N/A'}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;