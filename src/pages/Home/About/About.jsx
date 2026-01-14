import React from 'react';
import { GiOldKing } from 'react-icons/gi';
import { IoCreateSharp, IoPersonSharp } from "react-icons/io5";
import { BsRocketTakeoff } from "react-icons/bs";
import { motion } from "framer-motion";
import { Link } from 'react-router';

const About = () => {
    const cardVariants = {
        offscreen: { y: 50, opacity: 0 },
        onscreen: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", bounce: 0.4, duration: 0.8 }
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 py-20">
            
            <div className="mx-auto mb-16 max-w-4xl text-center">
                <motion.h2 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex justify-center items-center gap-4 font-extrabold text-gray-900 dark:text-white text-4xl sm:text-5xl"
                >
                    IdeaArena: Where Ideas Take Flight <BsRocketTakeoff className="text-purple-600 animate-bounce" />
                </motion.h2>
                <p className="mt-6 text-gray-600 dark:text-gray-300 text-xl leading-relaxed">
                    A platform dedicated to fostering creativity, innovation, and competition across diverse fields. From developers to designers, everyone has a place here.
                </p>
            </div>

            <div className="items-center gap-12 grid grid-cols-1 lg:grid-cols-2 mx-auto mb-24 max-w-7xl">
                <motion.div 
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-gray-800 shadow-2xl p-8 border-purple-600 border-l-8 rounded-3xl"
                >
                    <h3 className="mb-6 font-bold text-purple-600 dark:text-purple-400 text-3xl">Our Mission</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                        Our core goal is to build a vibrant community where **anyone can browse and explore contests**, **registered users can participate** and showcase their skills, and **Contest Creators can find the best talent** for their challenges. We believe in celebrating every achievement and turning concepts into reality.
                    </p>
                    <blockquote className="mt-8 pl-6 border-gray-200 border-l-4 text-gray-500 dark:text-gray-400 text-xl italic">
                        "Build a fully functional, fully responsive, and visually appealing contest platform."
                    </blockquote>
                </motion.div>

                <motion.div 
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <div className="absolute -inset-4 bg-purple-500/10 blur-3xl rounded-full"></div>
                    <img 
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                        alt="Collaboration" 
                        className="z-10 relative shadow-2xl rounded-3xl"
                    />
                </motion.div>
            </div>
            
            <div className="mx-auto max-w-7xl">
                <h3 className="mb-12 font-bold text-gray-900 dark:text-white text-3xl text-center italic">
                    The Arena is Built for Everyone 
                </h3>
                
                <div className="gap-8 grid grid-cols-1 md:grid-cols-3">
                    
                    {/* Role Card 1: Normal User */}
                    <motion.div 
                        variants={cardVariants}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true }}
                        className="group bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl p-8 border-blue-500 border-b-4 rounded-2xl transition-all"
                    >
                        <div className="flex justify-center items-center bg-blue-100 dark:bg-blue-900/30 mb-6 rounded-xl w-16 h-16 group-hover:scale-110 transition-transform">
                            <IoPersonSharp className="text-blue-500 text-3xl" />
                        </div>
                        <h4 className="mb-4 font-bold text-gray-900 dark:text-white text-2xl">Normal Users</h4>
                        <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                            <li className="flex items-start gap-2"><span>•</span> Join contests after secure payment.</li>
                            <li className="flex items-start gap-2"><span>•</span> Submit tasks and track progress.</li>
                            <li className="flex items-start gap-2"><span>•</span> Access personalized Dashboards.</li>
                        </ul>
                    </motion.div>

                    {/* Role Card 2: Contest Creator */}
                    <motion.div 
                        variants={cardVariants}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true }}
                        className="group bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl p-8 border-green-500 border-b-4 rounded-2xl transition-all"
                    >
                        <div className="flex justify-center items-center bg-green-100 dark:bg-green-900/30 mb-6 rounded-xl w-16 h-16 group-hover:scale-110 transition-transform">
                            <IoCreateSharp className="text-green-500 text-3xl" />
                        </div>
                        <h4 className="mb-4 font-bold text-gray-900 dark:text-white text-2xl">Contest Creators</h4>
                        <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                            <li className="flex items-start gap-2"><span>•</span> Add, edit, and manage contests.</li>
                            <li className="flex items-start gap-2"><span>•</span> Review submissions efficiently.</li>
                            <li className="flex items-start gap-2"><span>•</span> **Declare winners** easily.</li>
                        </ul>
                    </motion.div>

                    {/* Role Card 3: Admin */}
                    <motion.div 
                        variants={cardVariants}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true }}
                        className="group bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl p-8 border-red-500 border-b-4 rounded-2xl transition-all"
                    >
                        <div className="flex justify-center items-center bg-red-100 dark:bg-red-900/30 mb-6 rounded-xl w-16 h-16 group-hover:scale-110 transition-transform">
                            <GiOldKing className="text-red-500 text-3xl" />
                        </div>
                        <h4 className="mb-4 font-bold text-gray-900 dark:text-white text-2xl">Admins</h4>
                        <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                            <li className="flex items-start gap-2"><span>•</span> Approve or reject new contests.</li>
                            <li className="flex items-start gap-2"><span>•</span> Manage user roles & permissions.</li>
                            <li className="flex items-start gap-2"><span>•</span> Maintain platform security.</li>
                        </ul>
                    </motion.div>
                </div>
            </div>
            
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-purple-600 shadow-2xl mx-auto mt-24 p-12 rounded-3xl max-w-4xl text-white text-center"
            >
                <h3 className="mb-4 font-bold text-3xl">Ready to launch your idea?</h3>
                <p className="mb-8 text-purple-100 text-xl">Join the community of innovators and start your journey today.</p>
                <Link 
                    to='/all-contests'
                    className="inline-block bg-white hover:bg-gray-100 shadow-lg px-10 py-4 rounded-full font-bold text-purple-600 text-lg active:scale-95 transition"
                >
                    Explore Contests Now
                </Link>
            </motion.div>
            
        </section>
    );
};

export default About;