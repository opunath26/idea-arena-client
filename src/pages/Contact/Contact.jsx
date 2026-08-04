import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaPaperPlane,
  FaClock,
  FaUserShield,
  FaReply,
  FaQuestionCircle,
  FaCheckCircle
} from 'react-icons/fa';

const Contact = () => {
    const formRef = useRef();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Add your EmailJS / Submit handler here
        setTimeout(() => {
            setIsSubmitting(false);
            e.target.reset();
        }, 1500);
    };

    return (
        /* Forced Light Background & Text Color */
        <div className="bg-slate-50 bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/20 px-4 sm:px-6 pt-20 sm:pt-28 pb-16 sm:pb-20 min-h-screen text-slate-800">
            
            <div className="mx-auto max-w-7xl">
                {/* Header Section */}
                <div className="mb-10 sm:mb-14 text-center">
                    <motion.h2 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-3 sm:mb-4 font-black text-slate-900 text-3xl sm:text-5xl tracking-tight"
                    >
                        Get in <span className="text-purple-600">Touch</span>
                    </motion.h2>
                    <p className="mx-auto max-w-lg font-medium text-slate-500 text-xs sm:text-sm md:text-base">
                        Have questions about contests, payouts, or hosting your own challenge? We are here to help!
                    </p>
                </div>

                {/* Support Highlights Section */}
                <div className="gap-4 sm:gap-6 grid grid-cols-1 sm:grid-cols-3 mb-10 sm:mb-12">
                    <motion.div 
                        whileHover={{ y: -5 }}
                        className="bg-white shadow-sm hover:shadow-md p-5 sm:p-6 border border-slate-200/80 rounded-2xl sm:rounded-3xl transition-all"
                    >
                        <div className="flex justify-center items-center bg-purple-50 mb-3 sm:mb-4 rounded-xl sm:rounded-2xl w-10 sm:w-12 h-10 sm:h-12 text-purple-600 text-lg sm:text-xl">
                            <FaClock />
                        </div>
                        <h4 className="mb-1 font-black text-slate-900 text-base sm:text-lg">Response Time</h4>
                        <p className="text-slate-500 text-xs leading-relaxed">
                            We usually respond within <span className="font-bold text-purple-600">12 to 24 hours</span> on business days.
                        </p>
                    </motion.div>

                    <motion.div 
                        whileHover={{ y: -5 }}
                        className="bg-white shadow-sm hover:shadow-md p-5 sm:p-6 border border-slate-200/80 rounded-2xl sm:rounded-3xl transition-all"
                    >
                        <div className="flex justify-center items-center bg-purple-50 mb-3 sm:mb-4 rounded-xl sm:rounded-2xl w-10 sm:w-12 h-10 sm:h-12 text-purple-600 text-lg sm:text-xl">
                            <FaUserShield />
                        </div>
                        <h4 className="mb-1 font-black text-slate-900 text-base sm:text-lg">Who Will Reply?</h4>
                        <p className="text-slate-500 text-xs leading-relaxed">
                            Our dedicated <span className="font-bold text-purple-600">Support Team & Contest Managers</span> will review your ticket.
                        </p>
                    </motion.div>

                    <motion.div 
                        whileHover={{ y: -5 }}
                        className="bg-white shadow-sm hover:shadow-md p-5 sm:p-6 border border-slate-200/80 rounded-2xl sm:rounded-3xl transition-all"
                    >
                        <div className="flex justify-center items-center bg-purple-50 mb-3 sm:mb-4 rounded-xl sm:rounded-2xl w-10 sm:w-12 h-10 sm:h-12 text-purple-600 text-lg sm:text-xl">
                            <FaReply />
                        </div>
                        <h4 className="mb-1 font-black text-slate-900 text-base sm:text-lg">How You Get Reply</h4>
                        <p className="text-slate-500 text-xs leading-relaxed">
                            Replies will be sent directly to your <span className="font-bold text-purple-600">provided email address</span>.
                        </p>
                    </motion.div>
                </div>

                {/* Main Contact Grid */}
                <div className="items-stretch gap-8 lg:gap-12 grid lg:grid-cols-12 mb-12 sm:mb-16">
                    
                    {/* 1. Contact Info Card - (5 Columns) */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative flex flex-col justify-between lg:col-span-5 bg-purple-600 shadow-purple-100 shadow-xl p-6 sm:p-10 md:p-12 rounded-3xl sm:rounded-[2.5rem] overflow-hidden text-white"
                    >
                        <div className="top-0 right-0 absolute bg-white/10 rounded-bl-[100px] w-24 sm:w-32 h-24 sm:h-32 pointer-events-none"></div>

                        <div>
                            <h3 className="mb-6 font-bold text-white text-xl sm:text-2xl md:text-3xl">Contact Information</h3>
                            <div className="space-y-6 sm:space-y-8">
                                <div className="group flex items-center gap-4 sm:gap-5">
                                    <div className="flex flex-shrink-0 justify-center items-center bg-white/20 group-hover:bg-yellow-400 rounded-xl sm:rounded-2xl w-10 sm:w-12 h-10 sm:h-12 group-hover:text-slate-900 text-sm sm:text-base transition-all">
                                        <FaPhoneAlt />
                                    </div>
                                    <div>
                                        <p className="font-black text-[10px] text-purple-200 sm:text-xs uppercase tracking-widest">Call Us</p>
                                        <p className="font-bold text-white text-sm sm:text-base md:text-lg">+880 1234 567 890</p>
                                    </div>
                                </div>

                                <div className="group flex items-center gap-4 sm:gap-5">
                                    <div className="flex flex-shrink-0 justify-center items-center bg-white/20 group-hover:bg-yellow-400 rounded-xl sm:rounded-2xl w-10 sm:w-12 h-10 sm:h-12 group-hover:text-slate-900 text-sm sm:text-base transition-all">
                                        <FaEnvelope />
                                    </div>
                                    <div>
                                        <p className="font-black text-[10px] text-purple-200 sm:text-xs uppercase tracking-widest">Email Us</p>
                                        <p className="font-bold text-white text-sm sm:text-base md:text-lg break-all">support@ideaarena.com</p>
                                    </div>
                                </div>

                                <div className="group flex items-center gap-4 sm:gap-5">
                                    <div className="flex flex-shrink-0 justify-center items-center bg-white/20 group-hover:bg-yellow-400 rounded-xl sm:rounded-2xl w-10 sm:w-12 h-10 sm:h-12 group-hover:text-slate-900 text-sm sm:text-base transition-all">
                                        <FaMapMarkerAlt />
                                    </div>
                                    <div>
                                        <p className="font-black text-[10px] text-purple-200 sm:text-xs uppercase tracking-widest">Location</p>
                                        <p className="font-bold text-white text-sm sm:text-base md:text-lg">Banani, Dhaka, BD</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* What you can inquire about */}
                        <div className="my-6 sm:my-8 pt-6 border-purple-400/40 border-t">
                            <p className="opacity-80 mb-3 font-bold text-[10px] text-white sm:text-xs uppercase tracking-wider">What you can ask us about:</p>
                            <ul className="space-y-2 text-purple-100 text-xs">
                                <li className="flex items-center gap-2"><FaCheckCircle className="flex-shrink-0 text-yellow-400" /> <span>Contest Submission & Deadline queries</span></li>
                                <li className="flex items-center gap-2"><FaCheckCircle className="flex-shrink-0 text-yellow-400" /> <span>Payment & Prize Money distribution</span></li>
                                <li className="flex items-center gap-2"><FaCheckCircle className="flex-shrink-0 text-yellow-400" /> <span>Hosting custom contests on IdeaArena</span></li>
                                <li className="flex items-center gap-2"><FaCheckCircle className="flex-shrink-0 text-yellow-400" /> <span>Account, Profile, or Technical issues</span></li>
                            </ul>
                        </div>

                        {/* Social Links */}
                        <div>
                            <p className="opacity-60 mb-3 sm:mb-4 font-black text-[10px] text-white sm:text-xs uppercase tracking-[0.2em]">Follow our socials</p>
                            <div className="flex gap-3 sm:gap-4">
                                {[<FaFacebookF key="fb" />, <FaTwitter key="tw" />, <FaLinkedinIn key="li" />].map((icon, i) => (
                                    <button key={i} type="button" className="flex justify-center items-center bg-white/10 hover:bg-white rounded-full w-9 sm:w-10 h-9 sm:h-10 text-white hover:text-purple-600 text-xs sm:text-sm transition-all">
                                        {icon}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* 2. Contact Form - (7 Columns) */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-7 bg-white shadow-sm p-6 sm:p-10 md:p-12 border border-slate-200/80 rounded-3xl sm:rounded-[2.5rem]"
                    >
                        <h3 className="mb-1 sm:mb-2 font-black text-slate-900 text-xl sm:text-2xl">Send Us a Message</h3>
                        <p className="mb-6 sm:mb-8 text-slate-500 text-xs">Fill up the form and our team will get back to you shortly.</p>

                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                            <div className="gap-4 sm:gap-6 grid grid-cols-1 sm:grid-cols-2">
                                <div className="space-y-1.5 sm:space-y-2">
                                    <label className="ml-1 font-black text-[10px] text-slate-400 sm:text-xs uppercase tracking-widest">Full Name</label>
                                    <input 
                                        type="text" 
                                        name="user_name"
                                        required 
                                        placeholder="John Doe" 
                                        className="bg-slate-50 focus:bg-white p-3.5 sm:p-4 border-2 border-slate-100 focus:border-purple-600 rounded-xl sm:rounded-2xl outline-none w-full font-semibold text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm transition-all" 
                                    />
                                </div>
                                <div className="space-y-1.5 sm:space-y-2">
                                    <label className="ml-1 font-black text-[10px] text-slate-400 sm:text-xs uppercase tracking-widest">Email Address</label>
                                    <input 
                                        type="email" 
                                        name="user_email"
                                        required 
                                        placeholder="john@example.com" 
                                        className="bg-slate-50 focus:bg-white p-3.5 sm:p-4 border-2 border-slate-100 focus:border-purple-600 rounded-xl sm:rounded-2xl outline-none w-full font-semibold text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm transition-all" 
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5 sm:space-y-2">
                                <label className="ml-1 font-black text-[10px] text-slate-400 sm:text-xs uppercase tracking-widest">Inquiry Topic</label>
                                <select 
                                    name="inquiry_topic" 
                                    className="bg-slate-50 focus:bg-white p-3.5 sm:p-4 border-2 border-slate-100 focus:border-purple-600 rounded-xl sm:rounded-2xl outline-none w-full font-semibold text-slate-700 text-xs sm:text-sm transition-all"
                                >
                                    <option value="general" className="bg-white text-slate-800">General Query</option>
                                    <option value="contest" className="bg-white text-slate-800">Contest Rules & Submission</option>
                                    <option value="prize" className="bg-white text-slate-800">Prize Payout & Rewards</option>
                                    <option value="host" className="bg-white text-slate-800">Host a Contest</option>
                                    <option value="tech" className="bg-white text-slate-800">Technical Issue / Bug</option>
                                </select>
                            </div>

                            <div className="space-y-1.5 sm:space-y-2">
                                <label className="ml-1 font-black text-[10px] text-slate-400 sm:text-xs uppercase tracking-widest">Message</label>
                                <textarea 
                                    name="message"
                                    required 
                                    rows="4" 
                                    placeholder="Write your message here in detail..." 
                                    className="bg-slate-50 focus:bg-white p-3.5 sm:p-4 border-2 border-slate-100 focus:border-purple-600 rounded-xl sm:rounded-2xl outline-none w-full font-semibold text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm transition-all resize-none"
                                ></textarea>
                            </div>

                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="group flex justify-center items-center gap-3 bg-slate-900 hover:bg-purple-600 disabled:opacity-50 shadow-purple-100 shadow-xl py-3.5 sm:py-4 rounded-xl sm:rounded-2xl w-full font-black text-white text-sm sm:text-base active:scale-95 transition-all transform"
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                                <FaPaperPlane className="text-xs transition-transform group-hover:-translate-y-1 group-hover:translate-x-2" />
                            </button>
                        </form>
                    </motion.div>
                </div>

                {/* Frequently Asked Questions */}
                <div className="bg-white shadow-sm p-6 sm:p-10 md:p-12 border border-slate-200/80 rounded-3xl sm:rounded-[2.5rem]">
                    <div className="flex items-center gap-3 mb-6 sm:mb-8">
                        <FaQuestionCircle className="text-purple-600 text-xl sm:text-2xl" />
                        <h3 className="font-black text-slate-900 text-xl sm:text-2xl">Quick Help & FAQ</h3>
                    </div>

                    <div className="gap-4 sm:gap-6 grid grid-cols-1 sm:grid-cols-2">
                        <div className="bg-slate-50 p-4 sm:p-5 border border-slate-100 rounded-2xl">
                            <h5 className="mb-1 font-bold text-slate-900 text-xs sm:text-sm">When will I receive reply for prize payout queries?</h5>
                            <p className="text-slate-500 text-xs leading-relaxed">Prize-related messages are prioritized and usually answered within 6 to 12 hours after contest verification.</p>
                        </div>
                        <div className="bg-slate-50 p-4 sm:p-5 border border-slate-100 rounded-2xl">
                            <h5 className="mb-1 font-bold text-slate-900 text-xs sm:text-sm">Can I modify my contest submission after sending?</h5>
                            <p className="text-slate-500 text-xs leading-relaxed">Yes, as long as the contest deadline hasn't passed, you can edit your submission from your dashboard.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Contact;