import React from 'react';
import { useForm } from 'react-hook-form';
import { FaCalendarAlt, FaDollarSign, FaFileAlt, FaImage, FaTag, FaInfoCircle, FaPaperPlane } from "react-icons/fa";
import { useLoaderData, useNavigate } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { CgProfile } from 'react-icons/cg';
import { MdAlternateEmail } from 'react-icons/md';
import useAuth from '../../hooks/useAuth';

const AddContest = () => {

    const {
        register,
        handleSubmit,
        reset
    } = useForm();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const addContestType = useLoaderData() || [];
    const contestTypeDuplicate = addContestType.map(c => c.contestType);
    const contestType = [...new Set(contestTypeDuplicate)];

    const handleAddContest = data => {
        const contestCreationFee = 10;
        data.contestCreationFee = contestCreationFee;

        Swal.fire({
            title: 'Confirm Submission & Payment',
            html: `You are about to publish a new contest. A **$${contestCreationFee}** service charge will be applied. Do you want to proceed?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#9333ea',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Yes, Pay & Add!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.post('/contests', data)
                    .then(res => {
                        if (res.data.insertedId) {
                            navigate('/dashboard/my-contests');
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your contest has been added successfully! Please Pay',
                                showConfirmButton: false,
                                timer: 2500
                            });
                            reset();
                        }
                    })
                    .catch(error => {
                        console.error("Error submitting contest:", error);
                        Swal.fire({
                            title: 'Error!',
                            text: 'Failed to add contest. Please try again.',
                            icon: 'error'
                        });
                    });

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Contest submission has been cancelled.',
                    'error'
                );
            }
        });

    };

    return (
        <div className="bg-slate-50 dark:bg-slate-950 px-4 sm:px-6 lg:px-8 py-10 min-h-screen transition-colors duration-300">
            <div className="bg-white dark:bg-slate-900 shadow-xl mx-auto border border-slate-200/80 dark:border-slate-800 rounded-2xl max-w-4xl overflow-hidden">
                
                {/* Header Banner */}
                <div className="relative bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 p-8 overflow-hidden text-white text-center">
                    <div className="absolute inset-0 bg-pattern opacity-10"></div>
                    <h2 className="z-10 relative font-extrabold text-3xl sm:text-4xl tracking-tight">
                        Launch a New Contest
                    </h2>
                    <p className="z-10 relative mx-auto mt-2 max-w-xl text-purple-100 text-sm sm:text-base">
                        Fill out the details below to create and publish your contest to the community.
                    </p>
                </div>

                {/* Contest Form */}
                <form onSubmit={handleSubmit(handleAddContest)} className="space-y-8 p-6 sm:p-10">

                    {/* Section 1: Creator & Basic Info */}
                    <div>
                        <h3 className="flex items-center gap-2 mb-4 pb-2 border-slate-200 dark:border-slate-800 border-b font-bold text-slate-800 dark:text-slate-100 text-lg">
                            <span className="inline-block bg-purple-600 rounded-full w-2.5 h-2.5"></span>
                            Creator & Basic Details
                        </h3>

                        <div className="gap-5 grid grid-cols-1 sm:grid-cols-2">
                            {/* Creator Name */}
                            <div>
                                <label className="block mb-1.5 font-semibold text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
                                    Creator Name
                                </label>
                                <div className="relative">
                                    <CgProfile className="top-1/2 left-3.5 absolute text-slate-400 text-lg -translate-y-1/2" />
                                    <input
                                        type="text"
                                        defaultValue={user?.displayName}
                                        {...register('creatorName', { required: true })}
                                        placeholder="Creator Name"
                                        className="bg-slate-100 dark:bg-slate-800/60 py-2.5 pr-4 pl-10 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none w-full font-medium text-slate-600 dark:text-slate-400 text-sm cursor-not-allowed"
                                        readOnly
                                    />
                                </div>
                            </div>

                            {/* Creator Email */}
                            <div>
                                <label className="block mb-1.5 font-semibold text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
                                    Creator Email
                                </label>
                                <div className="relative">
                                    <MdAlternateEmail className="top-1/2 left-3.5 absolute text-slate-400 text-lg -translate-y-1/2" />
                                    <input
                                        type="email"
                                        defaultValue={user?.email}
                                        {...register('creatorEmail', { required: true })}
                                        placeholder="Creator Email"
                                        className="bg-slate-100 dark:bg-slate-800/60 py-2.5 pr-4 pl-10 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none w-full font-medium text-slate-600 dark:text-slate-400 text-sm cursor-not-allowed"
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Title */}
                        <div className="mt-5">
                            <label className="block mb-1.5 font-semibold text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
                                Contest Title <span className="text-rose-500">*</span>
                            </label>
                            <div className="relative">
                                <FaFileAlt className="top-1/2 left-3.5 absolute text-slate-400 text-sm -translate-y-1/2" />
                                <input
                                    type="text"
                                    {...register('contestTitle', { required: true })}
                                    placeholder="e.g., Modern Logo Design Challenge"
                                    className="bg-white dark:bg-slate-800 py-2.5 pr-4 pl-10 border border-slate-300 focus:border-purple-600 dark:border-slate-700 dark:focus:border-purple-500 rounded-xl outline-none focus:ring-2 focus:ring-purple-500/20 w-full text-slate-800 dark:text-slate-100 text-sm transition-all"
                                />
                            </div>
                        </div>

                        {/* Image Banner */}
                        <div className="mt-5">
                            <label className="block mb-1.5 font-semibold text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
                                Contest Banner URL <span className="text-rose-500">*</span>
                            </label>
                            <div className="relative">
                                <FaImage className="top-1/2 left-3.5 absolute text-slate-400 text-sm -translate-y-1/2" />
                                <input
                                    type="url"
                                    {...register('contestImage', { required: true })}
                                    placeholder="Direct image URL (e.g., https://i.ibb.co/banner.jpg)"
                                    className="bg-white dark:bg-slate-800 py-2.5 pr-4 pl-10 border border-slate-300 focus:border-purple-600 dark:border-slate-700 dark:focus:border-purple-500 rounded-xl outline-none focus:ring-2 focus:ring-purple-500/20 w-full text-slate-800 dark:text-slate-100 text-sm transition-all"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mt-5">
                            <label className="block mb-1.5 font-semibold text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
                                Full Contest Description <span className="text-rose-500">*</span>
                            </label>
                            <textarea
                                rows="4"
                                {...register('contestDescription', { required: true })}
                                placeholder="Describe the background, target audience, and goals of this contest..."
                                className="bg-white dark:bg-slate-800 p-3.5 border border-slate-300 focus:border-purple-600 dark:border-slate-700 dark:focus:border-purple-500 rounded-xl outline-none focus:ring-2 focus:ring-purple-500/20 w-full text-slate-800 dark:text-slate-100 text-sm transition-all resize-none"
                            ></textarea>
                        </div>
                    </div>

                    {/* Section 2: Financials & Category */}
                    <div>
                        <h3 className="flex items-center gap-2 mb-4 pb-2 border-slate-200 dark:border-slate-800 border-b font-bold text-slate-800 dark:text-slate-100 text-lg">
                            <span className="inline-block bg-purple-600 rounded-full w-2.5 h-2.5"></span>
                            Financials & Categorization
                        </h3>

                        <div className="gap-5 grid grid-cols-1 sm:grid-cols-2">
                            {/* Price */}
                            <div>
                                <label className="block mb-1.5 font-semibold text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
                                    Entry Fee ($ USD) <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <FaDollarSign className="top-1/2 left-3.5 absolute text-slate-400 text-sm -translate-y-1/2" />
                                    <input
                                        type="number"
                                        step="any"
                                        {...register('contestPrice', { required: true })}
                                        placeholder="10"
                                        className="bg-white dark:bg-slate-800 py-2.5 pr-4 pl-10 border border-slate-300 focus:border-purple-600 dark:border-slate-700 dark:focus:border-purple-500 rounded-xl outline-none focus:ring-2 focus:ring-purple-500/20 w-full text-slate-800 dark:text-slate-100 text-sm transition-all"
                                    />
                                </div>
                            </div>

                            {/* Prize Money */}
                            <div>
                                <label className="block mb-1.5 font-semibold text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
                                    Prize Money ($ USD) <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <FaDollarSign className="top-1/2 left-3.5 absolute text-slate-400 text-sm -translate-y-1/2" />
                                    <input
                                        type="number"
                                        step="any"
                                        {...register('contestPrizeMoney', { required: true })}
                                        placeholder="500"
                                        className="bg-white dark:bg-slate-800 py-2.5 pr-4 pl-10 border border-slate-300 focus:border-purple-600 dark:border-slate-700 dark:focus:border-purple-500 rounded-xl outline-none focus:ring-2 focus:ring-purple-500/20 w-full text-slate-800 dark:text-slate-100 text-sm transition-all"
                                    />
                                </div>
                            </div>

                            {/* Contest Type */}
                            <div>
                                <label className="block mb-1.5 font-semibold text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
                                    Contest Type / Category <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <FaTag className="top-1/2 left-3.5 absolute text-slate-400 text-sm -translate-y-1/2" />
                                    <select
                                        defaultValue=""
                                        {...register('contestType', { required: true })}
                                        className="bg-white dark:bg-slate-800 py-2.5 pr-4 pl-10 border border-slate-300 focus:border-purple-600 dark:border-slate-700 dark:focus:border-purple-500 rounded-xl outline-none focus:ring-2 focus:ring-purple-500/20 w-full text-slate-800 dark:text-slate-100 text-sm transition-all appearance-none"
                                    >
                                        <option value="" disabled>Select Category</option>
                                        {contestType.map((t, i) => (
                                            <option key={i} value={t}>{t}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Deadline */}
                            <div>
                                <label className="block mb-1.5 font-semibold text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
                                    Submission Deadline <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <FaCalendarAlt className="top-1/2 left-3.5 absolute text-slate-400 text-sm -translate-y-1/2" />
                                    <input
                                        type="datetime-local"
                                        {...register('contestDeadline', { required: true })}
                                        className="bg-white dark:bg-slate-800 py-2.5 pr-4 pl-10 border border-slate-300 focus:border-purple-600 dark:border-slate-700 dark:focus:border-purple-500 rounded-xl outline-none focus:ring-2 focus:ring-purple-500/20 w-full text-slate-800 dark:text-slate-100 text-sm transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Instructions */}
                    <div>
                        <h3 className="flex items-center gap-2 mb-4 pb-2 border-slate-200 dark:border-slate-800 border-b font-bold text-slate-800 dark:text-slate-100 text-lg">
                            <span className="inline-block bg-purple-600 rounded-full w-2.5 h-2.5"></span>
                            Task Guidelines
                        </h3>

                        <div>
                            <label className="block mb-1.5 font-semibold text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
                                Task Instructions <span className="text-rose-500">*</span>
                            </label>
                            <textarea
                                rows="4"
                                {...register('contestTaskInstructions', { required: true })}
                                placeholder="Write clear guidelines regarding file formats, dimensions, submission rules..."
                                className="bg-white dark:bg-slate-800 p-3.5 border border-slate-300 focus:border-purple-600 dark:border-slate-700 dark:focus:border-purple-500 rounded-xl outline-none focus:ring-2 focus:ring-purple-500/20 w-full text-slate-800 dark:text-slate-100 text-sm transition-all resize-none"
                            ></textarea>
                            <p className="flex items-center gap-1.5 mt-2 text-slate-500 dark:text-slate-400 text-xs">
                                <FaInfoCircle className="text-purple-600 dark:text-purple-400 shrink-0" />
                                Be precise about submission format (e.g., PNG, Figma link, PDF) to help participants.
                            </p>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="inline-flex justify-center items-center gap-2 bg-gradient-to-r from-purple-600 hover:from-purple-700 to-indigo-600 hover:to-indigo-700 shadow-lg shadow-purple-500/25 dark:shadow-purple-900/30 px-6 py-3.5 rounded-xl w-full font-semibold text-white text-base active:scale-[0.99] transition-all duration-200 cursor-pointer"
                        >
                            <FaPaperPlane className="text-sm" />
                            Submit & Publish Contest
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddContest;