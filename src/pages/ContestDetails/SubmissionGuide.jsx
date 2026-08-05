import React from 'react';
import { 
  FaLightbulb, 
  FaCode, 
  FaFileAlt, 
  FaVideo, 
  FaCheckCircle, 
  FaRocket,
  FaFileContract 
} from 'react-icons/fa';

const SubmissionGuide = () => {
    const steps = [
        {
            id: '01',
            title: 'Title / Project Name',
            desc: 'Choose a catchy, meaningful title for your project or idea.',
            example: 'Example: "AI-Based Smart Attendance System"',
            icon: <FaLightbulb className="text-amber-500" />,
            badge: 'Required',
            badgeColor: 'bg-amber-100 text-amber-800 border-amber-200'
        },
        {
            id: '02',
            title: 'Description / Pitch',
            desc: 'Explain in detail how your idea works, what problem it solves, and its core features.',
            example: 'Tip: Structuring your pitch into bullet points makes it easier for reviewers.',
            icon: <FaFileContract className="text-blue-500" />,
            badge: 'Required',
            badgeColor: 'bg-blue-100 text-blue-800 border-blue-200'
        },
        {
            id: '03',
            title: 'Project Link / Live URL',
            desc: 'Share the live working demo link or the source code repository of your project.',
            example: 'Live Link (Vercel/Netlify) or GitHub Repository Link',
            icon: <FaCode className="text-indigo-500" />,
            badge: 'Required',
            badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200'
        },
        {
            id: '04',
            title: 'Submission File / Image Link',
            desc: 'If you need to submit a presentation (PDF), UI design, or screenshots, provide a public link.',
            example: 'ImgBB, Cloudinary, Figma, or Google Drive Link (Ensure Public Access)',
            icon: <FaFileAlt className="text-emerald-500" />,
            badge: 'Recommended',
            badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200'
        },
        {
            id: '05',
            title: 'Video Demo Link',
            desc: 'Provide a short 1–3 minute video demo showing how your project works. (Boosts winning chances!)',
            example: 'YouTube, Loom, or Google Drive Video Link',
            icon: <FaVideo className="text-rose-500" />,
            badge: 'Optional',
            badgeColor: 'bg-slate-100 text-slate-700 border-slate-200'
        }
    ];

    return (
        <section className="relative my-8 sm:my-12 overflow-hidden text-slate-800">
            {/* Soft Light Ambient Glow Background */}
            <div className="-top-12 left-1/2 -z-10 absolute bg-gradient-to-r from-purple-200/50 to-indigo-200/50 blur-3xl rounded-full w-full max-w-[600px] h-[300px] -translate-x-1/2 pointer-events-none" />

            {/* Main Light Container (Forces light mode visuals even on dark OS) */}
            <div className="bg-white/90 shadow-purple-900/5 shadow-xl backdrop-blur-xl p-5 sm:p-8 lg:p-10 border border-purple-100/80 rounded-2xl sm:rounded-3xl">
                
                {/* Header Section */}
                <div className="mx-auto max-w-2xl text-center">
                    <span className="inline-flex items-center gap-2 bg-purple-50 shadow-sm px-3.5 sm:px-4 py-1.5 border border-purple-200 rounded-full font-bold text-[11px] text-purple-700 sm:text-xs uppercase tracking-widest hover:scale-105 transition-transform">
                        <FaRocket className="text-purple-600 animate-bounce" /> How to Prepare Your Entry
                    </span>
                    <h2 className="bg-clip-text bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 mt-3 sm:mt-4 font-black text-transparent text-xl sm:text-3xl lg:text-4xl leading-tight tracking-tight">
                        What to Prepare Before Participating?
                    </h2>
                    <p className="mt-2.5 sm:mt-3 text-slate-600 text-xs sm:text-sm lg:text-base leading-relaxed">
                        The submission form will require the following information. <br className="hidden sm:inline" />
                        Get your materials ready before clicking <span className="font-semibold text-purple-700">"Register & Participate"</span>.
                    </p>
                </div>

                {/* Grid Section */}
                <div className="gap-4 sm:gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 sm:mt-10">
                    {steps.map((step, idx) => (
                        <div 
                            key={step.id}
                            className="group relative flex flex-col justify-between bg-white hover:bg-slate-50/80 shadow-sm hover:shadow-purple-500/10 hover:shadow-xl p-5 sm:p-6 border border-slate-100 hover:border-purple-200 rounded-2xl transition-all hover:-translate-y-1 duration-300 cursor-default transform"
                            style={{ animationDelay: `${idx * 100}ms` }}
                        >
                            <div>
                                {/* Top Badges & Icon */}
                                <div className="flex justify-between items-center mb-3.5">
                                    <div className="flex justify-center items-center bg-slate-50 group-hover:bg-purple-50 shadow-inner p-2.5 sm:p-3 border border-slate-100 group-hover:border-purple-100 rounded-xl text-lg sm:text-xl transition-colors">
                                        {step.icon}
                                    </div>
                                    <span className={`px-2.5 py-1 border rounded-full text-[10px] font-bold uppercase tracking-wider ${step.badgeColor}`}>
                                        {step.badge}
                                    </span>
                                </div>

                                {/* Step Title */}
                                <h3 className="font-bold text-slate-900 group-hover:text-purple-700 text-sm sm:text-base transition-colors">
                                    <span className="mr-1.5 font-extrabold text-purple-600">{step.id}.</span> {step.title}
                                </h3>

                                {/* Description */}
                                <p className="mt-2 text-slate-600 text-xs sm:text-sm leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>

                            {/* Example Box */}
                            <div className="bg-slate-50 group-hover:bg-purple-50/50 mt-4 p-3 border border-slate-200/60 group-hover:border-purple-100 rounded-xl text-[11px] text-slate-600 group-hover:text-purple-900 sm:text-xs italic transition-colors">
                                💡 {step.example}
                            </div>
                        </div>
                    ))}

                    {/* Final Action Card */}
                    <div className="flex flex-col justify-center items-center bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 p-6 border border-purple-400/30 rounded-2xl text-white text-center transition-all hover:-translate-y-1 duration-300 transform">
                        <div className="flex justify-center items-center bg-white/20 shadow-inner backdrop-blur-md mb-3 rounded-full w-12 h-12 text-white text-xl animate-pulse">
                            <FaCheckCircle />
                        </div>
                        <h3 className="font-bold text-base sm:text-lg">Everything Ready?</h3>
                        <p className="mt-1.5 text-purple-100 text-xs leading-relaxed">
                            Once prepared, click the <strong>Register & Participate</strong> button to submit your entry!
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default SubmissionGuide;