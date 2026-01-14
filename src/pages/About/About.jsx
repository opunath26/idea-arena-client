import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaLightbulb, FaTrophy, FaRocket, FaGlobe, FaHandshake } from 'react-icons/fa';

const About = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* 1. Hero Section with Animated Background */}
            <div className="relative bg-purple-200 px-6 pt-32 pb-40 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img src="https://www.transparenttextures.com/patterns/cubes.png" alt="pattern" />
                </div>
                <div className="z-10 relative mx-auto max-w-7xl text-center">
                    <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="block mb-4 font-bold text-2xs text-gray-800 uppercase tracking-[0.4em]"
                    >
                        Learn our story
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 font-black text-gray-800 text-6xl md:text-7xl tracking-tighter"
                    >
                        Empowering <span className="text-purple-600">Ideas</span>, <br /> Building Future.
                    </motion.h1>
                    <p className="opacity-80 mx-auto max-w-3xl text-gray-800 text-xl leading-relaxed">
                        IdeaArena is more than a platform; it's a global stage where brilliant minds collide to solve real-world problems through innovation and healthy competition.
                    </p>
                </div>
            </div>

            {/* 2. Our Journey / Story Section (New) */}
            <div className="items-center gap-16 grid md:grid-cols-2 mx-auto px-6 py-24 max-w-7xl">
                <div>
                    <h2 className="mb-6 font-black text-gray-900 text-4xl">How <span className="text-purple-600">IdeaArena</span> Started?</h2>
                    <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                        <p>
                            Founded in 2024, IdeaArena began with a simple question: "Why is it so hard for talented innovators to find the right opportunities?" We saw a gap between creative minds and meaningful challenges.
                        </p>
                        <p>
                            Our journey started in a small room with a big vision. Today, we host hundreds of contests ranging from UI/UX design and App development to Business strategy and Marketing hacks.
                        </p>
                        <div className="flex gap-8 pt-4">
                            <div>
                                <h4 className="font-black text-purple-600 text-3xl">10k+</h4>
                                <p className="font-bold text-gray-400 text-sm uppercase">Users</p>
                            </div>
                            <div>
                                <h4 className="font-black text-purple-600 text-3xl">500+</h4>
                                <p className="font-bold text-gray-400 text-sm uppercase">Contests</p>
                            </div>
                            <div>
                                <h4 className="font-black text-purple-600 text-3xl">50+</h4>
                                <p className="font-bold text-gray-400 text-sm uppercase">Partners</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <div className="absolute -inset-4 bg-purple-100 rounded-[3rem] rotate-3"></div>
                    <img 
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070" 
                        alt="Team meeting" 
                        className="z-10 relative shadow-2xl rounded-[3rem] w-full h-[400px] object-cover"
                    />
                </div>
            </div>

            {/* 3. Core Values Section */}
            <div className="bg-gray-50 px-6 py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-16 text-center">
                        <h2 className="mb-2 font-black text-gray-900 text-4xl">Our Core Values</h2>
                        <p className="font-bold text-[10px] text-gray-400 uppercase tracking-[0.3em]">The principles that guide us</p>
                    </div>
                    
                    <div className="gap-8 grid md:grid-cols-3">
                        {[
                            { icon: <FaLightbulb />, title: "Innovation", desc: "We push the boundaries of what's possible, encouraging out-of-the-box thinking." },
                            { icon: <FaUsers />, title: "Community", desc: "Collaboration is our strength. We grow together by sharing knowledge and ideas." },
                            { icon: <FaTrophy />, title: "Excellence", desc: "We celebrate quality and hard work, rewarding the best talents fairly." },
                            { icon: <FaRocket />, title: "Agility", desc: "In a fast-paced world, we adapt and move quickly to stay ahead of the curve." },
                            { icon: <FaGlobe />, title: "Diversity", desc: "Ideas have no borders. We welcome innovators from every corner of the world." },
                            { icon: <FaHandshake />, title: "Integrity", desc: "Transparency and trust are at the heart of every contest we host." }
                        ].map((val, idx) => (
                            <motion.div 
                                whileHover={{ y: -10 }}
                                key={idx} 
                                className="bg-white shadow-sm hover:shadow-xl p-10 border border-gray-100 rounded-[2.5rem] transition-all"
                            >
                                <div className="mb-6 text-purple-600 text-4xl">{val.icon}</div>
                                <h3 className="mb-3 font-black text-xl">{val.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{val.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 4. CTA / Final Message */}
            <div className="px-6 py-24 text-center">
                <div className="bg-purple-600 shadow-2xl shadow-purple-200 mx-auto p-16 rounded-[4rem] max-w-4xl text-white">
                    <h2 className="mb-6 font-black text-4xl md:text-5xl italic">Ready to make your mark?</h2>
                    <p className="opacity-90 mb-10 text-purple-100 text-lg">
                        Join IdeaArena today and turn your abstract thoughts into concrete solutions. The next big thing starts with you.
                    </p>
                    <button className="bg-white hover:bg-purple-400 px-12 py-5 rounded-2xl font-black text-purple-600 hover:text-gray-100 text-lg hover:scale-105 active:scale-95 transition-all transform">
                        Get Started Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default About;