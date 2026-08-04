import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Users, Trophy, DollarSign, Target } from 'lucide-react';

const Counter = ({ value, prefix = "", suffix = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const count = useMotionValue(0);
    const rounded = useSpring(count, { damping: 30, stiffness: 100 });

    useEffect(() => {
        if (isInView) {
            count.set(value);
        }
    }, [isInView, count, value]);

    useEffect(() => {
        return rounded.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = `${prefix}${Math.floor(latest)}${suffix}`;
            }
        });
    }, [rounded, prefix, suffix]);

    return <span ref={ref}>{prefix}0{suffix}</span>;
};

const Stats = () => {
    const statData = [
        { 
            id: 1, 
            label: 'Active Users', 
            count: 15,
            suffix: 'K+',
            prefix: '',
            icon: <Users className="w-6 sm:w-7 h-6 sm:h-7" />, 
            color: 'text-blue-600', 
            bgColor: 'bg-blue-500/10',
            glowColor: 'group-hover:shadow-blue-500/10',
            borderColor: 'group-hover:border-blue-500/40',
            barColor: 'group-hover:bg-blue-600'
        },
        { 
            id: 2, 
            label: 'Contests Held', 
            count: 500,
            suffix: '+',
            prefix: '',
            icon: <Trophy className="w-6 sm:w-7 h-6 sm:h-7" />, 
            color: 'text-purple-600', 
            bgColor: 'bg-purple-500/10',
            glowColor: 'group-hover:shadow-purple-500/10',
            borderColor: 'group-hover:border-purple-500/40',
            barColor: 'group-hover:bg-purple-600'
        },
        { 
            id: 3, 
            label: 'Prize Distributed', 
            count: 100,
            suffix: 'K+',
            prefix: '$',
            icon: <DollarSign className="w-6 sm:w-7 h-6 sm:h-7" />, 
            color: 'text-amber-600', 
            bgColor: 'bg-amber-500/10',
            glowColor: 'group-hover:shadow-amber-500/10',
            borderColor: 'group-hover:border-amber-500/40',
            barColor: 'group-hover:bg-amber-600'
        },
        { 
            id: 4, 
            label: 'Success Rate', 
            count: 98,
            suffix: '%',
            prefix: '',
            icon: <Target className="w-6 sm:w-7 h-6 sm:h-7" />, 
            color: 'text-emerald-600', 
            bgColor: 'bg-emerald-500/10',
            glowColor: 'group-hover:shadow-emerald-500/10',
            borderColor: 'group-hover:border-emerald-500/40',
            barColor: 'group-hover:bg-emerald-600'
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { type: "spring", stiffness: 100, damping: 15 }
        },
    };

    return (
        <section className="relative bg-gradient-to-b from-slate-50 via-purple-50/20 to-white py-12 sm:py-16 lg:py-24 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="top-1/2 left-1/2 -z-10 absolute bg-purple-200/30 blur-[100px] sm:blur-[140px] rounded-full w-[320px] sm:w-[600px] h-[200px] sm:h-[300px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <div className="z-10 relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                {/* Header */}
                <div className="mx-auto mb-10 sm:mb-16 max-w-2xl text-center">
                    <motion.span 
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block bg-purple-100 shadow-xs mb-3 px-3.5 py-1.5 border border-purple-200/80 rounded-full font-bold text-purple-700 text-xs uppercase tracking-widest"
                    >
                        Our Impact
                    </motion.span>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-black text-slate-900 text-2xl sm:text-4xl lg:text-5xl leading-tight tracking-tight"
                    >
                        Trusted by Thousands of <span className="bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent">Innovators</span>
                    </motion.h2>
                </div>

                {/* Counter Cards Grid */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="gap-5 sm:gap-6 lg:gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {statData.map((stat) => (
                        <motion.div 
                            key={stat.id} 
                            variants={cardVariants}
                            whileHover={{ y: -6, transition: { duration: 0.2 } }}
                            className={`group relative bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 ${stat.borderColor} ${stat.glowColor}`}
                        >
                            <div className="flex flex-col items-center text-center">
                                {/* Icon Container */}
                                <div className="relative mb-5 sm:mb-6">
                                    <div className={`w-14 sm:w-16 h-14 sm:h-16 ${stat.bgColor} ${stat.color} rounded-2xl flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-300 ease-out shadow-xs`}>
                                        {stat.icon}
                                    </div>
                                    <div className={`absolute inset-0 ${stat.bgColor} rounded-2xl animate-ping opacity-20 group-hover:opacity-40 transition-opacity`} />
                                </div>

                                {/* Count Number */}
                                <h3 className="mb-1.5 sm:mb-2 font-black text-slate-900 text-3xl sm:text-4xl lg:text-5xl tracking-tight">
                                    <Counter value={stat.count} prefix={stat.prefix} suffix={stat.suffix} />
                                </h3>

                                {/* Label */}
                                <p className="font-semibold text-slate-500 text-xs sm:text-sm uppercase tracking-wide">
                                    {stat.label}
                                </p>

                                {/* Accent Bottom Bar */}
                                <div className={`mt-5 sm:mt-6 w-8 h-1 bg-slate-200 rounded-full group-hover:w-16 ${stat.barColor} transition-all duration-300`} />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Stats;