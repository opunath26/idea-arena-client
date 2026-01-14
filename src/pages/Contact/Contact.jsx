import React from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaLinkedinIn, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
    return (
        <div className="relative bg-[#f8f9ff] px-4 pt-28 pb-20 min-h-screen overflow-hidden">
            {/* Background Decorative Circles */}
            <div className="top-[-10%] left-[-5%] absolute bg-purple-200 opacity-50 blur-3xl rounded-full w-96 h-96"></div>
            <div className="right-[-5%] bottom-[-10%] absolute bg-indigo-200 opacity-50 blur-3xl rounded-full w-96 h-96"></div>

            <div className="z-10 relative mx-auto max-w-7xl">
                <div className="mb-16 text-center">
                    <motion.h2 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 font-black text-gray-900 text-5xl tracking-tighter"
                    >
                        Get in <span className="text-purple-600">Touch</span>
                    </motion.h2>
                    <p className="mx-auto max-w-lg font-medium text-gray-500">
                        Have a specific inquiry or just want to say hi? We'd love to hear from you.
                    </p>
                </div>

                <div className="items-stretch gap-12 grid lg:grid-cols-12">
                    
                    {/* 1. Contact Info Card - (5 Columns) */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative flex flex-col justify-between lg:col-span-5 bg-purple-700 shadow-2xl shadow-purple-200 p-10 md:p-14 rounded-[3rem] overflow-hidden text-white"
                    >
                        {/* Inner Design Element */}
                        <div className="top-0 right-0 absolute bg-white/10 rounded-bl-[100px] w-32 h-32"></div>

                        <div>
                            <h3 className="mb-8 font-bold text-3xl">Contact Information</h3>
                            <div className="space-y-10">
                                <div className="group flex items-center gap-6">
                                    <div className="flex justify-center items-center bg-white/20 group-hover:bg-yellow-400 rounded-2xl w-12 h-12 group-hover:text-gray-900 transition-all">
                                        <FaPhoneAlt />
                                    </div>
                                    <div>
                                        <p className="font-black text-purple-200 text-xs uppercase tracking-widest">Call Us</p>
                                        <p className="font-bold text-lg">+880 1234 567 890</p>
                                    </div>
                                </div>

                                <div className="group flex items-center gap-6">
                                    <div className="flex justify-center items-center bg-white/20 group-hover:bg-yellow-400 rounded-2xl w-12 h-12 group-hover:text-gray-900 transition-all">
                                        <FaEnvelope />
                                    </div>
                                    <div>
                                        <p className="font-black text-purple-200 text-xs uppercase tracking-widest">Email Us</p>
                                        <p className="font-bold text-lg">support@ideaarena.com</p>
                                    </div>
                                </div>

                                <div className="group flex items-center gap-6">
                                    <div className="flex justify-center items-center bg-white/20 group-hover:bg-yellow-400 rounded-2xl w-12 h-12 group-hover:text-gray-900 transition-all">
                                        <FaMapMarkerAlt />
                                    </div>
                                    <div>
                                        <p className="font-black text-purple-200 text-xs uppercase tracking-widest">Location</p>
                                        <p className="font-bold text-lg">Banani, Dhaka, BD</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="mt-16">
                            <p className="opacity-60 mb-6 font-black text-xs uppercase tracking-[0.3em]">Follow our socials</p>
                            <div className="flex gap-4">
                                {[<FaFacebookF />, <FaTwitter />, <FaLinkedinIn />].map((icon, i) => (
                                    <button key={i} className="flex justify-center items-center bg-white/10 hover:bg-white rounded-full w-10 h-10 hover:text-purple-600 transition-all">
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
                        className="lg:col-span-7 bg-white shadow-gray-100 shadow-xl p-10 md:p-14 border border-gray-50 rounded-[3rem]"
                    >
                        <form className="space-y-8">
                            <div className="gap-8 grid md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="ml-1 font-black text-gray-400 text-xs uppercase tracking-widest">Full Name</label>
                                    <input type="text" placeholder="John Doe" className="bg-gray-50 focus:bg-white p-4 border-2 border-transparent focus:border-purple-600 rounded-2xl outline-none w-full font-semibold transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="ml-1 font-black text-gray-400 text-xs uppercase tracking-widest">Email Address</label>
                                    <input type="email" placeholder="john@example.com" className="bg-gray-50 focus:bg-white p-4 border-2 border-transparent focus:border-purple-600 rounded-2xl outline-none w-full font-semibold transition-all" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="ml-1 font-black text-gray-400 text-xs uppercase tracking-widest">Subject</label>
                                <input type="text" placeholder="How can we help?" className="bg-gray-50 focus:bg-white p-4 border-2 border-transparent focus:border-purple-600 rounded-2xl outline-none w-full font-semibold transition-all" />
                            </div>

                            <div className="space-y-2">
                                <label className="ml-1 font-black text-gray-400 text-xs uppercase tracking-widest">Message</label>
                                <textarea rows="5" placeholder="Write your message here..." className="bg-gray-50 focus:bg-white p-4 border-2 border-transparent focus:border-purple-600 rounded-2xl outline-none w-full font-semibold transition-all resize-none"></textarea>
                            </div>

                            <button className="group flex justify-center items-center gap-3 bg-gray-900 hover:bg-purple-600 shadow-purple-100 shadow-xl py-5 rounded-2xl w-full font-black text-white text-lg active:scale-95 transition-all transform">
                                Send Message 
                                <FaPaperPlane className="text-sm transition-transform group-hover:-translate-y-1 group-hover:translate-x-2" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;