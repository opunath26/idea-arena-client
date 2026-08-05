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
        <div className="space-y-6 bg-slate-50 p-4 sm:p-6 md:p-8 min-h-screen text-slate-800">
            {/* Header Section */}
            <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4 bg-white shadow-sm p-4 sm:p-6 border border-slate-200 rounded-2xl">
                <div>
                    <h2 className="flex items-center gap-2 font-bold text-slate-900 text-xl sm:text-2xl tracking-tight">
                        <FaReceipt className="text-purple-600 shrink-0" /> Payment History
                    </h2>
                    <p className="mt-1 text-slate-500 text-xs sm:text-sm">
                        Track all your past contest creation payments and transaction receipts.
                    </p>
                </div>
                <div className="inline-flex items-center bg-purple-50 px-3.5 py-1.5 border border-purple-200 rounded-xl font-semibold text-purple-700 text-xs sm:text-sm shrink-0">
                    Total Payments: {payments.length}
                </div>
            </div>

            {/* Payments Table Card */}
            <div className="bg-white shadow-sm border border-slate-200 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px] text-left border-collapse">
                        {/* Table Head */}
                        <thead>
                            <tr className="bg-slate-100/80 border-slate-200 border-b font-semibold text-slate-600 text-xs uppercase tracking-wider">
                                <th className="px-4 py-3.5 w-12 text-center">#</th>
                                <th className="px-4 py-3.5">Transaction ID</th>
                                <th className="px-4 py-3.5">Contest ID</th>
                                <th className="px-4 py-3.5">Amount</th>
                                <th className="px-4 py-3.5">Paid Time</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="5" className="py-12 text-center">
                                        <span className="text-purple-600 loading loading-spinner loading-md"></span>
                                    </td>
                                </tr>
                            ) : payments.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="py-12 font-medium text-slate-400 text-center">
                                        No payment history found.
                                    </td>
                                </tr>
                            ) : (
                                payments.map((payment, index) => (
                                    <tr key={payment._id || index} className="hover:bg-slate-50/80 transition-colors">
                                        <th className="px-4 py-3.5 font-medium text-slate-400 text-center">{index + 1}</th>

                                        {/* Transaction ID with Copy Option */}
                                        <td className="px-4 py-3.5">
                                            <div className="flex items-center gap-2">
                                                <span className="bg-purple-50 px-2.5 py-1 border border-purple-200 rounded-md font-mono font-semibold text-purple-700 text-xs">
                                                    {payment.transactionId || 'N/A'}
                                                </span>
                                                {payment.transactionId && (
                                                    <button
                                                        onClick={() => handleCopy(payment.transactionId, 'Transaction ID')}
                                                        className="hover:bg-purple-50 p-1.5 rounded-lg text-slate-400 hover:text-purple-600 transition-colors shrink-0"
                                                        title="Copy Transaction ID"
                                                    >
                                                        <FaCopy className="size-3" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>

                                        {/* Contest ID */}
                                        <td className="px-4 py-3.5">
                                            <span className="font-mono text-slate-600 text-xs">
                                                #{payment.contestId || 'N/A'}
                                            </span>
                                        </td>

                                        {/* Amount */}
                                        <td className="px-4 py-3.5 font-bold text-emerald-600">
                                            ${payment.amount}
                                        </td>

                                        {/* Paid Time */}
                                        <td className="px-4 py-3.5 text-slate-500 text-xs">
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