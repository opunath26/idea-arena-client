import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useLoaderData } from 'react-router';
import { motion } from 'framer-motion';
import { 
    FaUser, 
    FaEnvelope, 
    FaPhone, 
    FaLayerGroup, 
    FaTools, 
    FaUserTag, 
    FaCommentDots, 
    FaPaperPlane, 
    FaInfoCircle, 
    FaSpinner 
} from 'react-icons/fa';

const Candidate = () => {
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const contestTypes = useLoaderData() || [];

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            candidateName: user?.displayName || '',
            candidateEmail: user?.email || ''
        }
    });

    const handleCandidateApplication = async (data) => {
        setLoading(true);
        const applicationData = {
            ...data,
            status: 'pending',
            workStatus: 'available',
            appliedAt: new Date().toISOString()
        };

        try {
            const res = await axiosSecure.post('/candidates', applicationData);
            if (res.data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: '<span style="font-size: 22px; font-weight: 800; color: #1e293b;">Application Submitted!</span>',
                    html: '<p style="font-size: 14px; color: #64748b; line-height: 1.5;">Your request has been received successfully. Our admin team will review it and get back to you within 7 days.</p>',
                    confirmButtonText: 'Awesome, Thanks!',
                    buttonsStyling: false,
                    customClass: {
                        popup: 'rounded-3xl p-6 border border-slate-100 shadow-2xl bg-white',
                        confirmButton: 'bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-purple-500/25 transition-all text-sm w-full cursor-pointer',
                        icon: 'border-0 bg-purple-50 text-purple-600 w-16 h-16 flex items-center justify-center rounded-2xl mx-auto mb-4'
                    }
                });
                reset();
            }
        } catch (error) {
            console.error('Candidate Submission Error:', error);
            Swal.fire({
                icon: 'error',
                title: '<span style="font-size: 22px; font-weight: 800; color: #1e293b;">Submission Failed</span>',
                html: `<p style="font-size: 14px; color: #64748b; line-height: 1.5;">${error?.response?.data?.message || 'Something went wrong. Please try again later.'}</p>`,
                confirmButtonText: 'Try Again',
                buttonsStyling: false,
                customClass: {
                    popup: 'rounded-3xl p-6 border border-slate-100 shadow-2xl bg-white',
                    confirmButton: 'bg-rose-600 hover:bg-rose-700 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-rose-500/25 transition-all text-sm w-full cursor-pointer',
                    icon: 'border-0 bg-rose-50 text-rose-600 w-16 h-16 flex items-center justify-center rounded-2xl mx-auto mb-4'
                }
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-50/60 px-4 py-8 sm:py-12 min-h-screen">
            <div className="mx-auto max-w-4xl">
                
                {/* Main Form Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white shadow-slate-200/50 shadow-xl p-6 sm:p-10 border border-slate-100 rounded-3xl"
                >
                    {/* Header */}
                    <div className="mb-8 pb-6 border-slate-100 border-b">
                        <span className="inline-flex items-center gap-1.5 bg-purple-50 mb-3 px-3.5 py-1 border border-purple-100 rounded-full font-bold text-purple-700 text-xs tracking-wide">
                            <FaUserTag className="text-purple-600" /> Creator Access Application
                        </span>
                        <h1 className="font-extrabold text-slate-900 text-2xl sm:text-3xl tracking-tight">
                            Request to Become a Creator
                        </h1>
                        <p className="mt-2 text-slate-500 text-sm sm:text-base leading-relaxed">
                            Fill out the form below to apply for Creator status. Once approved by our team, 
                            you can host and manage contests seamlessly.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(handleCandidateApplication)} className="space-y-6">
                        
                        {/* 2 Column Grid for Personal Info */}
                        <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                            {/* Full Name */}
                            <div>
                                <label className="flex items-center gap-2 mb-2 font-bold text-slate-700 text-xs uppercase tracking-wider">
                                    <FaUser className="text-purple-500" /> Full Name
                                </label>
                                <input
                                    type="text"
                                    {...register('candidateName', { required: 'Full Name is required' })}
                                    placeholder="e.g. Alex Johnson"
                                    className={`w-full px-4 py-3 rounded-xl border text-sm bg-slate-50/50 text-slate-800 focus:bg-white focus:outline-none transition-all ${
                                        errors.candidateName ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20' : 'border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-500/20'
                                    }`}
                                />
                                {errors.candidateName && (
                                    <span className="mt-1 font-medium text-rose-500 text-xs">{errors.candidateName.message}</span>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="flex items-center gap-2 mb-2 font-bold text-slate-700 text-xs uppercase tracking-wider">
                                    <FaEnvelope className="text-purple-500" /> Email Address
                                </label>
                                <input
                                    type="email"
                                    readOnly
                                    {...register('candidateEmail')}
                                    className="bg-slate-100 px-4 py-3 border border-slate-200 rounded-xl w-full font-medium text-slate-500 text-sm cursor-not-allowed"
                                />
                            </div>
                        </div>

                        {/* 2 Column Grid for Contact & Category */}
                        <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                            {/* Phone */}
                            <div>
                                <label className="flex items-center gap-2 mb-2 font-bold text-slate-700 text-xs uppercase tracking-wider">
                                    <FaPhone className="text-purple-500" /> Phone Number
                                </label>
                                <input
                                    type="tel"
                                    {...register('candidateNumber', { 
                                        required: 'Phone number is required',
                                        pattern: { value: /^[0-9+\s-]{8,15}$/, message: 'Invalid phone number format' }
                                    })}
                                    placeholder="+1 234 567 890"
                                    className={`w-full px-4 py-3 rounded-xl border text-sm bg-slate-50/50 text-slate-800 focus:bg-white focus:outline-none transition-all ${
                                        errors.candidateNumber ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20' : 'border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-500/20'
                                    }`}
                                />
                                {errors.candidateNumber && (
                                    <span className="mt-1 font-medium text-rose-500 text-xs">{errors.candidateNumber.message}</span>
                                )}
                            </div>

                            {/* Contest Type Selection */}
                            <div>
                                <label className="flex items-center gap-2 mb-2 font-bold text-slate-700 text-xs uppercase tracking-wider">
                                    <FaLayerGroup className="text-purple-500" /> Primary Contest Category
                                </label>
                                <select 
                                    {...register('contestType', { required: 'Please select a category' })} 
                                    className={`w-full px-4 py-3 rounded-xl border text-sm bg-slate-50/50 text-slate-800 focus:bg-white focus:outline-none transition-all ${
                                        errors.contestType ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20' : 'border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-500/20'
                                    }`}
                                >
                                    <option value="">Select a category</option>
                                    {contestTypes && contestTypes.map((type, index) => (
                                        <option key={type._id || index} value={type.contestType || type.category}>
                                            {type.contestType || type.category}
                                        </option>
                                    ))}
                                </select>
                                {errors.contestType && (
                                    <span className="mt-1 font-medium text-rose-500 text-xs">{errors.contestType.message}</span>
                                )}
                            </div>
                        </div>

                        {/* 2 Column Grid for Skills & Experience */}
                        <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                            {/* Skills */}
                            <div>
                                <label className="flex items-center gap-2 mb-2 font-bold text-slate-700 text-xs uppercase tracking-wider">
                                    <FaTools className="text-purple-500" /> Primary Skills
                                </label>
                                <input
                                    type="text"
                                    {...register('candidateSkills', { required: 'Skills are required' })}
                                    placeholder="e.g. UI/UX Design, Web Dev, Writing"
                                    className={`w-full px-4 py-3 rounded-xl border text-sm bg-slate-50/50 text-slate-800 focus:bg-white focus:outline-none transition-all ${
                                        errors.candidateSkills ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20' : 'border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-500/20'
                                    }`}
                                />
                                {errors.candidateSkills && (
                                    <span className="mt-1 font-medium text-rose-500 text-xs">{errors.candidateSkills.message}</span>
                                )}
                            </div>

                            {/* Experience */}
                            <div>
                                <label className="flex items-center gap-2 mb-2 font-bold text-slate-700 text-xs uppercase tracking-wider">
                                    <FaUserTag className="text-purple-500" /> Experience Level
                                </label>
                                <select 
                                    {...register('candidateExperience', { required: 'Experience level is required' })} 
                                    className={`w-full px-4 py-3 rounded-xl border text-sm bg-slate-50/50 text-slate-800 focus:bg-white focus:outline-none transition-all ${
                                        errors.candidateExperience ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20' : 'border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-500/20'
                                    }`}
                                >
                                    <option value="">Select experience level</option>
                                    <option value="Beginner">Beginner (0-1 yrs)</option>
                                    <option value="Intermediate">Intermediate (1-3 yrs)</option>
                                    <option value="Advanced">Advanced (3+ yrs)</option>
                                </select>
                                {errors.candidateExperience && (
                                    <span className="mt-1 font-medium text-rose-500 text-xs">{errors.candidateExperience.message}</span>
                                )}
                            </div>
                        </div>

                        {/* Reason TextArea */}
                        <div>
                            <label className="flex items-center gap-2 mb-2 font-bold text-slate-700 text-xs uppercase tracking-wider">
                                <FaCommentDots className="text-purple-500" /> Why do you want to become a Creator?
                            </label>
                            <textarea
                                rows="4"
                                {...register('reason', { 
                                    required: 'Please provide a short reason',
                                    minLength: { value: 20, message: 'Reason should be at least 20 characters long' }
                                })}
                                placeholder="Tell us briefly about your passion, hosting experience, or ideas..."
                                className={`w-full px-4 py-3 rounded-xl border text-sm bg-slate-50/50 text-slate-800 focus:bg-white focus:outline-none transition-all resize-none ${
                                    errors.reason ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20' : 'border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-500/20'
                                }`}
                            ></textarea>
                            {errors.reason && (
                                <span className="mt-1 font-medium text-rose-500 text-xs">{errors.reason.message}</span>
                            )}
                        </div>

                        {/* Notice Banner */}
                        <div className="flex gap-3 bg-amber-50/70 p-4 border border-amber-200/80 rounded-2xl">
                            <FaInfoCircle className="flex-shrink-0 mt-0.5 text-amber-600 text-base" />
                            <p className="text-amber-800 text-xs leading-relaxed">
                                <span className="font-bold">Note:</span> Submitting this application does not instantly grant Creator status. Our admin team will review your application credentials before approval.
                            </p>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex justify-center items-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-70 shadow-lg shadow-purple-500/25 py-3.5 rounded-xl w-full font-bold text-white text-sm active:scale-[0.99] transition-all cursor-pointer"
                        >
                            {loading ? (
                                <>
                                    <FaSpinner className="animate-spin" /> Submitting Request...
                                </>
                            ) : (
                                <>
                                    <FaPaperPlane /> Submit Application
                                </>
                            )}
                        </button>

                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Candidate;