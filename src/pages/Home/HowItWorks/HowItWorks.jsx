import React from 'react';

const HowItWorks = () => {
    const steps = [
        { title: "Choose Contest", desc: "Select from various categories that match your skill." },
        { title: "Submit Work", desc: "Upload your best innovation before the deadline." },
        { title: "Win Prize", desc: "Top creators get recognized and rewarded." }
    ];
    return (
        <section className="bg-white py-20">
            <div className="mx-auto px-4 container">
                <h2 className="mb-12 font-bold text-3xl text-center">How It <span className="text-purple-600">Works</span></h2>
                <div className="gap-10 grid grid-cols-1 md:grid-cols-3">
                    {steps.map((step, idx) => (
                        <div key={idx} className="flex flex-col items-center hover:shadow-xl p-6 border rounded-2xl text-center transition-all">
                            <div className="flex justify-center items-center bg-purple-600 mb-4 rounded-full w-12 h-12 font-bold text-white text-xl">{idx + 1}</div>
                            <h3 className="mb-2 font-bold text-xl">{step.title}</h3>
                            <p className="text-gray-500">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;