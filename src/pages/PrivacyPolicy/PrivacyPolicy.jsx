import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaLock, FaUserSecret, FaCookieBite, FaFileContract } from 'react-icons/fa';

const PrivacyPolicy = () => {
    const sections = [
        { id: "info", title: "Information We Collect", icon: <FaUserSecret /> },
        { id: "usage", title: "How We Use Data", icon: <FaShieldAlt /> },
        { id: "security", title: "Data Security", icon: <FaLock /> },
        { id: "cookies", title: "Cookie Policy", icon: <FaCookieBite /> },
    ];

    return (
        <div className="bg-white px-4 pt-28 pb-20 min-h-screen">
            <div className="mx-auto max-w-6xl">
                {/* Header Section */}
                <div className="mb-16 text-center">
                    <div className="flex justify-center items-center bg-purple-100 mx-auto mb-6 rounded-3xl w-20 h-20 text-purple-600 text-3xl">
                        <FaFileContract />
                    </div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 font-black text-gray-900 text-5xl tracking-tight"
                    >
                        Privacy <span className="text-purple-600">Policy</span>
                    </motion.h1>
                    <p className="font-bold text-gray-400 text-xs uppercase tracking-[0.3em]">Last Updated: January 2026</p>
                </div>

                <div className="flex md:flex-row flex-col gap-12">
                    {/* Left Side: Table of Contents (Sticky) */}
                    <div className="md:w-1/3">
                        <div className="top-32 sticky space-y-4">
                            <h3 className="mb-6 ml-2 font-black text-gray-400 text-sm uppercase tracking-widest">Contents</h3>
                            {sections.map((section) => (
                                <a 
                                    key={section.id}
                                    href={`#${section.id}`}
                                    className="group flex items-center gap-4 bg-gray-50 hover:bg-purple-600 shadow-sm p-4 border border-gray-100 rounded-2xl text-gray-700 hover:text-white transition-all"
                                >
                                    <span className="text-purple-600 group-hover:text-white transition-colors">{section.icon}</span>
                                    <span className="font-bold">{section.title}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Policy Content */}
                    <div className="space-y-16 md:w-2/3">
                        
                        {/* Section 1 */}
                        <section id="info" className="scroll-mt-32">
                            <h2 className="flex items-center gap-3 mb-6 font-black text-gray-900 text-3xl">
                                <span className="text-purple-600">01.</span> Information We Collect
                            </h2>
                            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                                <p>
                                    At <span className="font-bold text-gray-900">IdeaArena</span>, we collect information to provide better services to all our users. This includes:
                                </p>
                                <ul className="space-y-2 pl-6 marker:text-purple-600 list-disc">
                                    <li><span className="font-bold text-gray-800">Account Info:</span> Name, email address, and profile picture when you register.</li>
                                    <li><span className="font-bold text-gray-800">Content:</span> Ideas, submissions, and comments you post in contests.</li>
                                    <li><span className="font-bold text-gray-800">Technical Data:</span> IP address, browser type, and device information.</li>
                                </ul>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section id="usage" className="scroll-mt-32">
                            <h2 className="flex items-center gap-3 mb-6 font-black text-gray-900 text-3xl">
                                <span className="text-purple-600">02.</span> How We Use Data
                            </h2>
                            <div className="text-gray-600 text-lg leading-relaxed">
                                <p>
                                    Your data helps us personalize your experience. We use it to manage your contest participations, process rewards, and send you important updates about the platform. We <span className="font-bold text-purple-600 decoration-2 underline">never sell</span> your personal data to third parties.
                                </p>
                            </div>
                        </section>

                        {/* Section 3 */}
                        <section id="security" className="scroll-mt-32">
                            <h2 className="flex items-center gap-3 mb-6 font-black text-gray-900 text-3xl">
                                <span className="text-purple-600">03.</span> Data Security
                            </h2>
                            <div className="bg-purple-50 p-8 border border-purple-100 rounded-[2.5rem]">
                                <p className="text-gray-700 italic leading-relaxed">
                                    "We implement industry-standard encryption (SSL) to protect your data. Your passwords are hashed and stored securely, ensuring that even our administrators cannot see them."
                                </p>
                            </div>
                        </section>

                        {/* Section 4 */}
                        <section id="cookies" className="pb-20 scroll-mt-32">
                            <h2 className="flex items-center gap-3 mb-6 font-black text-gray-900 text-3xl">
                                <span className="text-purple-600">04.</span> Cookie Policy
                            </h2>
                            <p className="mb-6 text-gray-600 text-lg leading-relaxed">
                                We use cookies to remember your login session and preferences. You can disable cookies in your browser settings, but some features of IdeaArena may not function properly without them.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <span className="bg-gray-100 px-6 py-2 rounded-full font-black text-gray-500 text-xs uppercase tracking-tighter">Essential Cookies</span>
                                <span className="bg-gray-100 px-6 py-2 rounded-full font-black text-gray-500 text-xs uppercase tracking-tighter">Analytics</span>
                                <span className="bg-gray-100 px-6 py-2 rounded-full font-black text-gray-500 text-xs uppercase tracking-tighter">Preferences</span>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;