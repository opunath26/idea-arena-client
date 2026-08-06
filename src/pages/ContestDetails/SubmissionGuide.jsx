
import React from 'react';
import { 
  FaLightbulb, 
  FaCode, 
  FaFileAlt, 
  FaVideo, 
  FaCheckCircle, 
  FaRocket,
  FaFileContract,
  FaArrowRight
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
            badgeStyle: 'bg-amber-50 text-amber-700 border-amber-200'
        },
        {
            id: '02',
            title: 'Description / Pitch',
            desc: 'Explain in detail how your idea works, what problem it solves, and its core features.',
            example: 'Tip: Structuring your pitch into bullet points makes it easier for reviewers.',
            icon: <FaFileContract className="text-blue-500" />,
            badge: 'Required',
            badgeStyle: 'bg-blue-50 text-blue-700 border-blue-200'
        },
        {
            id: '03',
            title: 'Project Link / Live URL',
            desc: 'Share the live working demo link or the source code repository of your project.',
            example: 'Live Link (Vercel/Netlify) or GitHub Repository Link',
            icon: <FaCode className="text-indigo-500" />,
            badge: 'Required',
            badgeStyle: 'bg-indigo-50 text-indigo-700 border-indigo-200'
        },
        {
            id: '04',
            title: 'Submission File / Image Link',
            desc: 'If you need to submit a presentation (PDF), UI design, or screenshots, provide a public link.',
            example: 'ImgBB, Cloudinary, Figma, or Google Drive Link (Ensure Public Access)',
            icon: <FaFileAlt className="text-emerald-500" />,
            badge: 'Recommended',
            badgeStyle: 'bg-emerald-50 text-emerald-700 border-emerald-200'
        },
        {
            id: '05',
            title: 'Video Demo Link',
            desc: 'Provide a short 1–3 minute video demo showing how your project works.',
            example: 'YouTube, Loom, or Google Drive Video Link',
            icon: <FaVideo className="text-rose-500" />,
            badge: 'Optional',
            badgeStyle: 'bg-slate-100 text-slate-600 border-slate-200'
        }
    ];

    return (
        <section className="relative my-10 overflow-hidden text-slate-800">
            {/* Ambient Background Glows */}
            <div className="-top-10 -left-10 -z-10 absolute bg-purple-200/40 blur-3xl rounded-full w-72 h-72 pointer-events-none" />
            <div className="-right-10 -bottom-10 -z-10 absolute bg-indigo-200/40 blur-3xl rounded-full w-72 h-72 pointer-events-none" />

            {/* Main Light Container */}
            <div className="bg-white/80 shadow-2xl shadow-purple-900/5 backdrop-blur-xl p-5 sm:p-8 lg:p-10 border border-purple-100 rounded-3xl">
                
                {/* Header */}
                <div className="flex sm:flex-row flex-col justify-between items-start sm:items-end gap-4 pb-8 border-slate-100 border-b">
                    <div>
                        <span className="inline-flex items-center gap-2 bg-purple-100/70 shadow-sm px-3.5 py-1.5 border border-purple-200/80 rounded-full font-bold text-[11px] text-purple-800 uppercase tracking-widest">
                            <FaRocket className="text-purple-600 animate-bounce" /> Roadmap
                        </span>
                        <h2 className="bg-clip-text bg-gradient-to-r from-slate-900 via-purple-950 to-indigo-900 mt-3 font-black text-transparent text-2xl sm:text-3xl lg:text-4xl tracking-tight">
                            Preparation Guidelines
                        </h2>
                    </div>
                    <p className="max-w-md text-slate-500 text-xs sm:text-sm leading-relaxed">
                        Follow these steps carefully and keep all links ready before opening the registration form.
                    </p>
                </div>

                {/* Timeline Layout */}
                <div className="relative mt-8 sm:mt-10 pl-2 sm:pl-6">
                    {/* Vertical Timeline Line */}
                    <div className="top-3 bottom-12 left-[19px] sm:left-[35px] -z-0 absolute bg-gradient-to-b from-purple-300 via-indigo-200 to-emerald-300 rounded-full w-1" />

                    <div className="space-y-6 sm:space-y-8">
                        {steps.map((step) => (
                            <div 
                                key={step.id} 
                                className="group relative flex items-start gap-4 sm:gap-6"
                            >
                                {/* Step Icon Node */}
                                <div className="z-10 flex justify-center items-center bg-white shadow-md group-hover:shadow-purple-300/50 p-2 sm:p-3 border-2 border-purple-200 group-hover:border-purple-600 rounded-2xl w-10 sm:w-14 h-10 sm:h-14 group-hover:scale-110 transition-all duration-300 shrink-0">
                                    <div className="text-base sm:text-xl">
                                        {step.icon}
                                    </div>
                                </div>

                                {/* Step Content Card */}
                                <div className="flex-1 bg-slate-50/70 group-hover:bg-white shadow-sm group-hover:shadow-purple-900/5 group-hover:shadow-xl p-4 sm:p-6 border border-slate-200/70 group-hover:border-purple-200/90 rounded-2xl sm:rounded-3xl transition-all group-hover:-translate-y-0.5 duration-300">
                                    <div className="flex sm:flex-row flex-col justify-between sm:items-center gap-2 mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="font-extrabold text-purple-600 text-xs sm:text-sm">
                                                STEP {step.id}
                                            </span>
                                            <span className="text-slate-300">•</span>
                                            <h3 className="font-bold text-slate-900 group-hover:text-purple-950 text-sm sm:text-base">
                                                {step.title}
                                            </h3>
                                        </div>
                                        <span className={`self-start sm:self-auto px-2.5 py-0.5 border rounded-full text-[10px] font-bold uppercase tracking-wider ${step.badgeStyle}`}>
                                            {step.badge}
                                        </span>
                                    </div>

                                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                                        {step.desc}
                                    </p>

                                    <div className="flex items-center gap-2 bg-white group-hover:bg-purple-50/50 mt-3 p-2.5 sm:p-3 border border-slate-200/60 rounded-xl text-[11px] text-slate-500 group-hover:text-purple-900 sm:text-xs italic transition-colors">
                                        <span>💡</span>
                                        <span>{step.example}</span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Final Ready Box (Connected at the end of timeline) */}
                        <div className="relative flex items-start gap-4 sm:gap-6 pt-2">
                            <div className="z-10 flex justify-center items-center bg-gradient-to-tr from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/30 rounded-2xl w-10 sm:w-14 h-10 sm:h-14 text-white text-base sm:text-xl shrink-0">
                                <FaCheckCircle />
                            </div>

                            <div className="flex sm:flex-row flex-col flex-1 justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 p-5 sm:p-6 rounded-2xl sm:rounded-3xl text-white">
                                <div>
                                    <h3 className="font-bold text-white text-base sm:text-lg">You're All Set!</h3>
                                    <p className="mt-1 text-purple-200 text-xs sm:text-sm">
                                        Have all these details handy? Click the button above to start your submission.
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl font-semibold text-xs tracking-wide whitespace-nowrap transition-colors">
                                    <span>Ready to Submit</span>
                                    <FaArrowRight className="text-purple-300" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default SubmissionGuide;