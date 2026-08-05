import React, { useState } from 'react';
import axios from 'axios';
import { FaPaperPlane, FaTimes } from 'react-icons/fa';

const SubmissionModal = ({ isOpen, onClose, contest, apiUrl }) => {
    const [submissionLink, setSubmissionLink] = useState('');
    const [submissionNotes, setSubmissionNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmitTask = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const submissionData = {
                contestId: contest?._id,
                contestTitle: contest?.contestTitle,
                submissionLink,
                submissionNotes,
                submittedAt: new Date(),
            };

            const res = await axios.post(`${apiUrl}/submissions`, submissionData);

            if (res.data) {
                alert("🎉 Submission successful! Best of luck!");
                setSubmissionLink('');
                setSubmissionNotes('');
                onClose();
            }
        } catch (error) {
            console.error("Submission Error:", error);
            alert("Failed to submit entry. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="relative bg-white shadow-2xl p-6 sm:p-8 border border-purple-100 rounded-3xl w-full max-w-lg">
                
                {/* Header */}
                <div className="flex justify-between items-center pb-4 border-slate-100 border-b">
                    <h3 className="flex items-center gap-2 font-bold text-slate-900 text-lg">
                        <FaPaperPlane className="text-purple-600" /> Submit Your Contest Entry
                    </h3>
                    <button 
                        onClick={onClose}
                        className="hover:bg-slate-100 p-2 rounded-full text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmitTask} className="space-y-4 mt-6">
                    <div>
                        <label className="block mb-1.5 font-semibold text-slate-700 text-xs">
                            Project / Submission Link <span className="text-red-500">*</span>
                        </label>
                        <input 
                            type="url" 
                            required
                            placeholder="https://github.com/your-repo or Live Link"
                            value={submissionLink}
                            onChange={(e) => setSubmissionLink(e.target.value)}
                            className="px-4 py-2.5 border border-slate-200 focus:border-purple-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-200 w-full text-slate-800 text-sm transition-all"
                        />
                    </div>

                    <div>
                        <label className="block mb-1.5 font-semibold text-slate-700 text-xs">
                            Short Description / Notes (Optional)
                        </label>
                        <textarea 
                            rows="3"
                            placeholder="Describe your idea or submission details briefly..."
                            value={submissionNotes}
                            onChange={(e) => setSubmissionNotes(e.target.value)}
                            className="px-4 py-2.5 border border-slate-200 focus:border-purple-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-200 w-full text-slate-800 text-sm transition-all"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end items-center gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="hover:bg-slate-100 px-5 py-2.5 rounded-xl font-semibold text-slate-600 text-xs transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 px-6 py-2.5 rounded-xl font-semibold text-white text-xs transition-all cursor-pointer"
                        >
                            {isSubmitting ? "Submitting..." : "Confirm & Submit"}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default SubmissionModal;