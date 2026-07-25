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
            icon: <Users className="w-7 h-7" />, 
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
            icon: <Trophy className="w-7 h-7" />, 
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
            icon: <DollarSign className="w-7 h-7" />, 
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
            icon: <Target className="w-7 h-7" />, 
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
        <section className="relative bg-gradient-to-b from-slate-50 via-purple-50/20 to-white px-6 py-24 overflow-hidden">
            <div className="top-1/2 left-1/2 absolute bg-purple-200/30 blur-[140px] rounded-full w-[600px] h-[300px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <div className="z-10 relative mx-auto max-w-7xl">
                <div className="mx-auto mb-16 max-w-2xl text-center">
                    <motion.span 
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block bg-purple-100 shadow-xs mb-3 px-4 py-1.5 border border-purple-200 rounded-full font-bold text-purple-700 text-xs uppercase tracking-widest"
                    >
                        Our Impact
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-black text-slate-900 text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight"
                    >
                        Trusted by Thousands of <span className="bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent">Innovators</span>
                    </motion.h2>
                </div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="gap-6 sm:gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {statData.map((stat) => (
                        <motion.div 
                            key={stat.id} 
                            variants={cardVariants}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                            className={`group relative bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 ${stat.borderColor} ${stat.glowColor}`}
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="relative mb-6">
                                    <div className={`w-16 h-16 ${stat.bgColor} ${stat.color} rounded-2xl flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-300 ease-out shadow-xs`}>
                                        {stat.icon}
                                    </div>
                                    <div className={`absolute inset-0 ${stat.bgColor} rounded-2xl animate-ping opacity-25 group-hover:opacity-50 transition-opacity`} />
                                </div>

                                <h3 className="mb-2 font-black text-slate-900 text-4xl sm:text-5xl tracking-tight">
                                    <Counter value={stat.count} prefix={stat.prefix} suffix={stat.suffix} />
                                </h3>

                                <p className="font-semibold text-slate-500 text-sm uppercase tracking-wide">
                                    {stat.label}
                                </p>

                                <div className={`mt-6 w-8 h-1 bg-slate-200 rounded-full group-hover:w-20 ${stat.barColor} transition-all duration-300`} />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Stats;