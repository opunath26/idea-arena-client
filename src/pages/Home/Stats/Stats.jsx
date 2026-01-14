import React from 'react';
import { Users, Trophy, DollarSign, Target } from 'lucide-react';

const Stats = () => {
    const statData = [
        { id: 1, label: 'Active Users', value: '15K+', icon: <Users size={28} />, color: 'text-blue-600', bgColor: 'bg-blue-50' },
        { id: 2, label: 'Contests Held', value: '500+', icon: <Trophy size={28} />, color: 'text-purple-600', bgColor: 'bg-purple-50' },
        { id: 3, label: 'Prize Distributed', value: '$100K+', icon: <DollarSign size={28} />, color: 'text-amber-600', bgColor: 'bg-amber-50' },
        { id: 4, label: 'Success Rate', value: '98%', icon: <Target size={28} />, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
    ];

    return (
        <section className="bg-[#f8fafc] px-6 py-20">
            <div className="mx-auto max-w-7xl">
                {/* Section Header (Optional) */}
                <div className="mb-16 text-center">
                    <h3 className="font-semibold text-purple-600 text-sm uppercase tracking-wide">Our Impact</h3>
                    <h2 className="mt-2 font-bold text-slate-800 text-3xl md:text-4xl">Trusted by thousands of users</h2>
                </div>

                <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {statData.map((stat) => (
                        <div 
                            key={stat.id} 
                            className="group bg-white shadow-sm hover:shadow-blue-500/5 hover:shadow-xl p-8 border border-slate-100 rounded-3xl transition-all hover:-translate-y-1 duration-300 transform"
                        >
                            <div className="flex flex-col items-center text-center">
                                {/* Icon Container */}
                                <div className={`w-16 h-16 ${stat.bgColor} ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    {stat.icon}
                                </div>

                                {/* Value */}
                                <h2 className="mb-2 font-black text-slate-800 text-4xl tracking-tight">
                                    {stat.value}
                                </h2>

                                {/* Label */}
                                <p className="font-medium text-slate-500 text-base">
                                    {stat.label}
                                </p>

                                {/* Decorative Bottom Line */}
                                <div className="bg-slate-100 group-hover:bg-blue-400 mt-6 rounded-full w-10 group-hover:w-20 h-1 transition-all duration-500"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;