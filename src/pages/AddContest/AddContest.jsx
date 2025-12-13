import React from 'react';
import { useForm } from 'react-hook-form';
import { FaCalendarAlt, FaDollarSign, FaFileAlt, FaImage, FaTag, FaInfoCircle } from "react-icons/fa";
import { useLoaderData } from 'react-router';


const AddContest = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const addContestType = useLoaderData();
    const contestTypeDuplicate = addContestType.map(c => c.contestType);
    const contestType = [...new Set(contestTypeDuplicate)];
    // console.log(contestType);
    

    const handleAddContest = data =>{
        console.log(data);
        
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
            <div className="bg-white dark:bg-gray-800 shadow-2xl mx-auto p-8 border-purple-600 border-t-4 rounded-xl max-w-3xl">

                {/* Header */}
                <div className="mb-8 text-center">
                    <h2 className="font-extrabold text-gray-900 dark:text-white text-3xl">
                        Launch a New Contest
                    </h2>
                    <p className="mt-2 text-gray-600 text-md dark:text-gray-400">
                        Fill out the form below to publish a new contest.
                    </p>
                </div>

                {/* Contest Form (Design Only) */}
                <form onSubmit={handleSubmit(handleAddContest)}>

                    {/* Section Title */}
                    <h3 className="mb-4 pb-2 border-b font-semibold text-purple-600 dark:text-purple-400 text-xl">
                        Add Contest Details
                    </h3>

                    {/* Title */}
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Contest Title</label>
                        <div className="relative">
                            <FaFileAlt className="top-3 left-3 absolute text-gray-400" />
                            <input
                                type="text"
                                {...register('contestTitle')}
                                placeholder="e.g., Logo Design Challenge"
                                className="px-3 py-2 pl-10 border rounded-md focus:outline-none focus:ring-purple-500 w-full"
                            />
                        </div>
                    </div>

                    {/* Image */}
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Contest Banner (Image URL)</label>
                        <div className="relative">
                            <FaImage className="top-3 left-3 absolute text-gray-400" />
                            <input
                                type="text"
                                {...register('contestImage')}
                                placeholder="Direct image link (e.g., i.ibb.co)"
                                className="px-3 py-2 pl-10 border rounded-md focus:outline-none focus:ring-purple-500 w-full"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Full Contest Description</label>
                        <textarea
                            rows="6"
                            {...register('contestDescription')}
                            placeholder="Describe the contest details..."
                            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-purple-500 w-full"
                        ></textarea>
                    </div>

                    {/* Financial + Type */}
                    <h3 className="mt-6 mb-4 pb-2 border-b font-semibold text-purple-600 dark:text-purple-400 text-xl">
                        Financials & Type
                    </h3>

                    <div className="gap-4 grid grid-cols-1 md:grid-cols-2">

                        {/* Price */}
                        <div>
                            <label className="block mb-1 font-medium">Contest Price (Entry Fee)</label>
                            <div className="relative">
                                <FaDollarSign className="top-3 left-3 absolute text-gray-400" />
                                <input
                                    type="number"
                                    {...register('contestPrice')}
                                    placeholder="e.g., 10"
                                    className="px-3 py-2 pl-10 border rounded-md focus:outline-none focus:ring-purple-500 w-full"
                                />
                            </div>
                        </div>

                        {/* Prize Money */}
                        <div>
                            <label className="block mb-1 font-medium">Prize Money</label>
                            <div className="relative">
                                <FaDollarSign className="top-3 left-3 absolute text-gray-400" />
                                <input
                                    type="number"
                                    {...register('contestPrizeMoney')}
                                    placeholder="e.g., 500"
                                    className="px-3 py-2 pl-10 border rounded-md focus:outline-none focus:ring-purple-500 w-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contest Type */}
                    <div className="mt-4">
                        <label className="block mb-1 font-medium">Contest Type</label>
                        <div className="relative">
                            <FaTag className="top-3 left-3 absolute text-gray-400" />
                            <select {...register('contestType')} className="px-3 py-2 pl-10 border rounded-md focus:ring-purple-500 w-full">
                                <option disabled={true}>Select Contest Type</option>
                                {
                                    contestType.map((t, i) => <option key={i} value={t}>{t}</option>)
                                }
                                
                                
                                {/* {contestTypeOptions.map((type) => (
                  <option key={type}>{type}</option>
                ))} */}
                            </select>
                        </div>
                    </div>
                    

                    {/* <div className="mt-4">
                        <label className="block mb-1 font-medium">Contest Type</label>
                        <div className="relative">
                            <FaTag className="top-3 left-3 absolute text-gray-400" />
                            <select className="px-3 py-2 pl-10 border rounded-md focus:ring-purple-500 w-full">
                                <option>Select Contest Type</option>
                                {contestTypeOptions.map((type) => (
                  <option key={type}>{type}</option>
                ))}
                            </select>
                        </div>
                    </div> */}

                    {/* Deadline */}
                    <div className="mt-4">
                        <label className="block mb-1 font-medium">Deadline (Date & Time)</label>
                        <div className="relative">
                            <FaCalendarAlt className="top-3 left-3 absolute text-gray-400" />
                            <input
                                type="text"
                                {...register('contestDeadline')}
                                placeholder="Pick deadline (UI Only)"
                                className="px-3 py-2 pl-10 border rounded-md focus:outline-none focus:ring-purple-500 w-full"
                            />
                        </div>
                    </div>

                    {/* Task Instructions */}
                    <h3 className="mt-6 mb-4 pb-2 border-b font-semibold text-purple-600 dark:text-purple-400 text-xl">
                        Task Instructions
                    </h3>

                    <div>
                        <textarea
                            rows="6"
                            {...register('contestTaskInstructions')}
                            placeholder="Write detailed task instructions..."
                            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-purple-500 w-full"
                        ></textarea>
                        <div className="flex items-start mt-2 text-gray-500 text-sm">
                            <FaInfoCircle className="mt-1 mr-2 w-4 h-4" />
                            Be specific about file formats, resolution, and submission rules.
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8">
                        <button
                            type="submit"
                            className="hover:bg-purple-700 py-3 rounded-md w-full text-white text-lg transition btn btn-primary"
                        >
                            Submit Contest
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddContest;