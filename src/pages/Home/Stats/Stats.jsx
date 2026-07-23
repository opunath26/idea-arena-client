import React from 'react';
import { Users, Trophy, DollarSign, Target } from 'lucide-react';

const Stats = () => {
    const statData = [
        { 
            id: 1, 
            label: 'Active Users', 
            value: '15K+', 
            icon: <Users className="w-7 h-7" />, 
            color: 'text-blue-600', 
            bgColor: 'bg-blue-500/10',
            borderColor: 'group-hover:border-blue-500/30' 
        },
        { 
            id: 2, 
            label: 'Contests Held', 
            value: '500+', 
            icon: <Trophy className="w-7 h-7" />, 
            color: 'text-purple-600', 
            bgColor: 'bg-purple-500/10',
            borderColor: 'group-hover:border-purple-500/30' 
        },
        { 
            id: 3, 
            label: 'Prize Distributed', 
            value: '$100K+', 
            icon: <DollarSign className="w-7 h-7" />, 
            color: 'text-amber-600', 
            bgColor: 'bg-amber-500/10',
            borderColor: 'group-hover:border-amber-500/30' 
        },
        { 
            id: 4, 
            label: 'Success Rate', 
            value: '98%', 
            icon: <Target className="w-7 h-7" />, 
            color: 'text-emerald-600', 
            bgColor: 'bg-emerald-500/10',
            borderColor: 'group-hover:border-emerald-500/30' 
        },
    ];

    return (
        <section className="relative bg-slate-50/50 py-20 px-6 overflow-hidden">
            <div className="mx-auto max-w-7xl relative z-10">
                {/* Section Header */}
                <div className="mb-16 text-center max-w-2xl mx-auto">
                    <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-purple-600 bg-purple-100/60 rounded-full mb-3">
                        Our Impact
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                        Trusted by thousands of users worldwide
                    </h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statData.map((stat) => (
                        <div 
                            key={stat.id} 
                            className={`group relative bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ${stat.borderColor}`}
                        >
                            <div className="flex flex-col items-center text-center">
                                {/* Icon Container */}
                                <div className={`w-16 h-16 ${stat.bgColor} ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ease-out`}>
                                    {stat.icon}
                                </div>

                                {/* Value */}
                                <h3 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
                                    {stat.value}
                                </h3>

                                {/* Label */}
                                <p className="text-sm font-medium text-slate-500">
                                    {stat.label}
                                </p>

                                {/* Decorative Bottom Accent */}
                                <div className="mt-6 w-8 h-1 bg-slate-200 rounded-full group-hover:w-16 group-hover:bg-purple-600 transition-all duration-300" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;