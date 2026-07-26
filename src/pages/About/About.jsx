import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { 
  FaUsers, 
  FaLightbulb, 
  FaTrophy, 
  FaRocket, 
  FaGlobe, 
  FaHandshake, 
  FaPlusCircle, 
  FaPaperPlane, 
  FaAward,
  FaCheckCircle
} from 'react-icons/fa';

const About = () => {
    return (
        <div className="bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/20 min-h-screen text-slate-800">
            
            {/* 1. Hero Section */}
            <div className="relative px-6 pt-24 pb-20 overflow-hidden text-center">
                <div className="z-10 relative mx-auto max-w-4xl">
                    <motion.span 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block bg-purple-100 mb-4 px-4 py-1.5 border border-purple-200 rounded-full font-bold text-purple-700 text-xs uppercase tracking-widest"
                    >
                        About IdeaArena
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 font-black text-slate-900 text-4xl sm:text-6xl leading-tight tracking-tight"
                    >
                        Where <span className="text-purple-600">Great Ideas</span> Turn Into Winning Solutions
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mx-auto max-w-2xl text-slate-600 text-base sm:text-lg leading-relaxed"
                    >
                        IdeaArena is a next-generation contest platform connecting creators, developers, and innovators with real-world challenges, prizes, and career opportunities.
                    </motion.p>
                </div>
            </div>

            {/* 2. How IdeaArena Works (Core Workflow for Visitors) */}
            <div className="mx-auto px-6 py-16 max-w-7xl">
                <div className="mb-14 text-center">
                    <h2 className="font-black text-slate-900 text-3xl sm:text-4xl">How IdeaArena Works</h2>
                    <p className="mt-2 font-medium text-slate-500 text-sm">Everything you need to know about what happens on this platform</p>
                </div>

                <div className="gap-8 grid md:grid-cols-3">
                    {[
                        {
                            step: "01",
                            icon: <FaPlusCircle className="text-purple-600" />,
                            title: "1. Create & Host Contests",
                            desc: "Organizers and admins create various creative challenges—ranging from Web Development, UI/UX Design, to Business Ideas & Content Writing."
                        },
                        {
                            step: "02",
                            icon: <FaPaperPlane className="text-purple-600" />,
                            title: "2. Register & Submit Tasks",
                            desc: "Participants browse through active contests, register using secure payment/registration methods, and submit their creative task solutions before time runs out."
                        },
                        {
                            step: "03",
                            icon: <FaAward className="text-purple-600" />,
                            title: "3. Declare Winners & Rewards",
                            desc: "Submissions are reviewed by contest admins. Winning ideas earn cash prizes, badges, and recognition on our global leaderboard."
                        }
                    ].map((step, idx) => (
                        <div key={idx} className="relative bg-white shadow-sm hover:shadow-xl p-8 border border-slate-200/80 hover:border-purple-200 rounded-3xl transition-all">
                            <div className="top-6 right-6 absolute font-black text-slate-100 text-4xl">{step.step}</div>
                            <div className="flex justify-center items-center bg-purple-50 mb-6 rounded-2xl w-14 h-14 text-2xl">
                                {step.icon}
                            </div>
                            <h3 className="mb-3 font-bold text-slate-900 text-xl">{step.title}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. Who Is IdeaArena For? (User Roles Breakdown) */}
            <div className="bg-white/80 backdrop-blur-md my-10 py-16 border-slate-200/60 border-y">
                <div className="mx-auto px-6 max-w-7xl">
                    <div className="mb-12 text-center">
                        <h2 className="font-black text-slate-900 text-3xl sm:text-4xl">Who Can Join Us?</h2>
                        <p className="mt-2 font-medium text-slate-500 text-sm">IdeaArena brings two major groups together under one roof</p>
                    </div>

                    <div className="gap-8 grid md:grid-cols-2">
                        {/* Role 1 */}
                        <div className="bg-gradient-to-br from-purple-50/50 to-indigo-50/30 p-8 sm:p-10 border border-purple-100 rounded-3xl">
                            <span className="inline-block mb-3 font-bold text-purple-700 text-xs uppercase tracking-wider">For Participants</span>
                            <h3 className="mb-4 font-black text-slate-900 text-2xl">Showcase Your Skill & Win Rewards</h3>
                            <ul className="space-y-3 text-slate-600 text-sm">
                                <li className="flex items-center gap-2"><FaCheckCircle className="text-purple-600" /> Explore category-wise active contests</li>
                                <li className="flex items-center gap-2"><FaCheckCircle className="text-purple-600" /> Submit tasks with detailed instructions</li>
                                <li className="flex items-center gap-2"><FaCheckCircle className="text-purple-600" /> Track countdown timers in real-time</li>
                                <li className="flex items-center gap-2"><FaCheckCircle className="text-purple-600" /> Win prize money and build your portfolio</li>
                            </ul>
                        </div>

                        {/* Role 2 */}
                        <div className="bg-gradient-to-br from-slate-50 to-purple-50/30 p-8 sm:p-10 border border-slate-200/80 rounded-3xl">
                            <span className="inline-block mb-3 font-bold text-indigo-700 text-xs uppercase tracking-wider">For Hosts & Creators</span>
                            <h3 className="mb-4 font-black text-slate-900 text-2xl">Crowdsource Innovation Effortlessly</h3>
                            <ul className="space-y-3 text-slate-600 text-sm">
                                <li className="flex items-center gap-2"><FaCheckCircle className="text-purple-600" /> Host custom contests with tailored guidelines</li>
                                <li className="flex items-center gap-2"><FaCheckCircle className="text-purple-600" /> Manage submissions via clean Dashboard UI</li>
                                <li className="flex items-center gap-2"><FaCheckCircle className="text-purple-600" /> Inspect user submissions and declare winners</li>
                                <li className="flex items-center gap-2"><FaCheckCircle className="text-purple-600" /> Connect with top tech and creative talent</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. Core Values Section */}
            <div className="mx-auto px-6 py-16 max-w-7xl">
                <div className="mb-14 text-center">
                    <h2 className="font-black text-slate-900 text-3xl sm:text-4xl">Our Core Values</h2>
                    <p className="mt-2 font-medium text-slate-500 text-sm">The foundation powering IdeaArena</p>
                </div>
                
                <div className="gap-6 grid sm:grid-cols-2 md:grid-cols-3">
                    {[
                        { icon: <FaLightbulb />, title: "Innovation", desc: "Encouraging out-of-the-box thinking to solve modern problems." },
                        { icon: <FaUsers />, title: "Community", desc: "A supportive environment where creators learn and grow together." },
                        { icon: <FaTrophy />, title: "Excellence", desc: "Rewarding hard work, quality, and exceptional talent fairly." },
                        { icon: <FaRocket />, title: "Agility", desc: "Adapting fast to modern tech trends and user feedback." },
                        { icon: <FaGlobe />, title: "Inclusivity", desc: "Open to passionate minds regardless of geographical location." },
                        { icon: <FaHandshake />, title: "Transparency", desc: "Fair judging, secure transactions, and clear instructions." }
                    ].map((val, idx) => (
                        <div key={idx} className="bg-white shadow-sm hover:shadow-md p-8 border border-slate-200/70 rounded-2xl transition-shadow">
                            <div className="mb-4 text-purple-600 text-3xl">{val.icon}</div>
                            <h3 className="mb-2 font-bold text-slate-900 text-lg">{val.title}</h3>
                            <p className="text-slate-500 text-xs leading-relaxed">{val.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 5. CTA Section */}
            <div className="mx-auto px-6 pt-10 pb-20 max-w-5xl text-center">
                <div className="bg-purple-600 shadow-purple-200 shadow-xl p-10 sm:p-14 rounded-3xl text-white">
                    <h2 className="mb-4 font-black text-3xl sm:text-4xl">Ready to Start Your Journey?</h2>
                    <p className="opacity-90 mx-auto mb-8 max-w-2xl text-purple-100 text-sm sm:text-base">
                        Explore active challenges, participate in your favorite category, or post a contest to find brilliant solutions today.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link 
                            to="/all-contests" 
                            className="bg-white hover:bg-purple-50 shadow-md px-8 py-3.5 rounded-xl font-bold text-purple-700 text-sm active:scale-95 transition-all"
                        >
                            Explore Contests
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default About;