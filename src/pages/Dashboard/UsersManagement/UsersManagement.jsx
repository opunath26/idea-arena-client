import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUserShield, FaUsers } from 'react-icons/fa6';
import { FiShieldOff, FiSearch } from 'react-icons/fi';
import Swal from 'sweetalert2';

const UsersManagement = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [searchText, setSearchText] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    // Debounce search input to avoid API spam on every keystroke
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchText);
        }, 400);

        return () => clearTimeout(handler);
    }, [searchText]);

    // Fetch users with TanStack Query
    const { isLoading, data: users = [] } = useQuery({
        queryKey: ['users', debouncedSearch],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?searchText=${debouncedSearch}`);
            return res.data;
        }
    });

    // Role mutation handler
    const roleMutation = useMutation({
        mutationFn: async ({ userId, role }) => {
            const res = await axiosSecure.patch(`/users/${userId}/role`, { role });
            return res.data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `Role updated to ${variables.role}`,
                showConfirmButton: false,
                timer: 2000
            });
        },
        onError: () => {
            Swal.fire({
                icon: 'error',
                title: 'Failed to update role',
                text: 'Something went wrong while updating user rights.'
            });
        }
    });

    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: 'Promote to Admin?',
            text: `Are you sure you want to make ${user.displayName || 'this user'} an admin?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#10b981',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, Make Admin'
        }).then((result) => {
            if (result.isConfirmed) {
                roleMutation.mutate({ userId: user._id, role: 'admin' });
            }
        });
    };

    const handleRemoveAdmin = (user) => {
        Swal.fire({
            title: 'Remove Admin Rights?',
            text: `This will revert ${user.displayName || 'this user'} back to a general user.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, Remove Admin'
        }).then((result) => {
            if (result.isConfirmed) {
                roleMutation.mutate({ userId: user._id, role: 'user' });
            }
        });
    };

    return (
        <div className="space-y-6 bg-slate-50 p-3 sm:p-6 rounded-2xl min-h-screen text-slate-800">
            {/* Header & Search Bar */}
            <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4 bg-white shadow-sm p-4 sm:p-6 border border-slate-200 rounded-2xl">
                <div>
                    <h2 className="flex items-center gap-2 font-bold text-slate-800 text-xl sm:text-2xl">
                        <FaUsers className="text-purple-600" /> Users Management
                    </h2>
                    <p className="mt-1 text-slate-500 text-xs sm:text-sm">
                        Search and manage system users and assign admin permissions.
                    </p>
                </div>

                <div className="flex sm:flex-row flex-col items-stretch sm:items-center gap-3 w-full sm:w-auto">
                    {/* Search Input Box */}
                    <div className="relative w-full sm:w-72">
                        <FiSearch className="top-1/2 left-3.5 absolute size-4 text-slate-400 -translate-y-1/2" />
                        <input
                            type="text"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder="Search by name or email..."
                            className="bg-slate-100 focus:bg-white py-2 pr-4 pl-10 border border-slate-200 focus:border-purple-500 rounded-xl focus:outline-none w-full text-slate-800 text-sm transition-all"
                        />
                    </div>

                    {/* Total User Count Badge */}
                    <div className="bg-purple-50 px-4 py-2 border border-purple-200 rounded-xl font-semibold text-purple-700 text-xs sm:text-sm text-center whitespace-nowrap">
                        Total Users: {users.length}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="bg-white shadow-sm border border-slate-200 rounded-2xl overflow-hidden">
                {isLoading ? (
                    <div className="py-12 text-center">
                        <span className="text-purple-600 loading-spinner loading-md loading"></span>
                    </div>
                ) : users.length === 0 ? (
                    <div className="py-12 text-slate-400 text-center">
                        No users found matching your search.
                    </div>
                ) : (
                    <>
                        {/* Desktop & Tablet View (Table) */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="table w-full">
                                <thead className="bg-slate-100 text-slate-600">
                                    <tr>
                                        <th className="py-4">#</th>
                                        <th>User</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th className="text-center">Admin Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
                                        <tr key={user._id} className="hover:bg-slate-50 border-slate-200 border-b transition-colors">
                                            <th className="font-medium text-slate-500">{index + 1}</th>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="bg-slate-100 rounded-full ring-2 ring-purple-500/20 w-10 h-10 overflow-hidden">
                                                            <img
                                                                src={user.photoURL || 'https://i.ibb.co/mR40Y4X/user.png'}
                                                                alt={user.displayName || 'User Avatar'}
                                                                onError={(e) => {
                                                                    e.target.src = 'https://i.ibb.co/mR40Y4X/user.png';
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="font-semibold text-slate-800">
                                                        {user.displayName || 'Anonymous User'}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-slate-500 text-sm">{user.email}</td>
                                            <td>
                                                <span
                                                    className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${
                                                        user.role === 'admin'
                                                            ? 'bg-purple-100 text-purple-700'
                                                            : 'bg-slate-100 text-slate-600'
                                                    }`}
                                                >
                                                    {user.role || 'user'}
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                {user.role === 'admin' ? (
                                                    <div className="tooltip" data-tip="Remove Admin Role">
                                                        <button
                                                            onClick={() => handleRemoveAdmin(user)}
                                                            disabled={roleMutation.isPending}
                                                            className="hover:bg-rose-50 text-rose-600 btn btn-sm btn-square btn-ghost"
                                                        >
                                                            <FiShieldOff className="size-4.5" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="tooltip" data-tip="Make Admin">
                                                        <button
                                                            onClick={() => handleMakeAdmin(user)}
                                                            disabled={roleMutation.isPending}
                                                            className="hover:bg-emerald-50 text-emerald-600 btn btn-sm btn-square btn-ghost"
                                                        >
                                                            <FaUserShield className="size-4.5" />
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile View (Card Layout) */}
                        <div className="md:hidden divide-y divide-slate-100">
                            {users.map((user, index) => (
                                <div key={user._id} className="space-y-3 p-4">
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-slate-400 text-xs">#{index + 1}</span>
                                        <span
                                            className={`px-2.5 py-0.5 text-xs font-semibold rounded-full capitalize ${
                                                user.role === 'admin'
                                                    ? 'bg-purple-100 text-purple-700'
                                                    : 'bg-slate-100 text-slate-600'
                                            }`}
                                        >
                                            {user.role || 'user'}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="bg-slate-100 rounded-full ring-2 ring-purple-500/20 w-10 h-10 overflow-hidden">
                                                <img
                                                    src={user.photoURL || 'https://i.ibb.co/mR40Y4X/user.png'}
                                                    alt={user.displayName || 'User Avatar'}
                                                    onError={(e) => {
                                                        e.target.src = 'https://i.ibb.co/mR40Y4X/user.png';
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="min-w-0">
                                            <div className="font-semibold text-slate-800 text-sm truncate">
                                                {user.displayName || 'Anonymous User'}
                                            </div>
                                            <div className="text-slate-500 text-xs truncate">{user.email}</div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end items-center pt-2 border-slate-100 border-t">
                                        {user.role === 'admin' ? (
                                            <button
                                                onClick={() => handleRemoveAdmin(user)}
                                                disabled={roleMutation.isPending}
                                                className="flex items-center gap-1.5 bg-rose-50 px-3 py-1.5 rounded-lg font-medium text-rose-600 text-xs"
                                            >
                                                <FiShieldOff className="size-4" /> Remove Admin
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleMakeAdmin(user)}
                                                disabled={roleMutation.isPending}
                                                className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-lg font-medium text-emerald-600 text-xs"
                                            >
                                                <FaUserShield className="size-4" /> Make Admin
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default UsersManagement;