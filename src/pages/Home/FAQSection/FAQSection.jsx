import React, { useState } from 'react';
import { FaChevronDown, FaSearch, FaQuestionCircle } from 'react-icons/fa';

const faqs = [
    { id: 1, question: "How do I register and participate in a contest?", answer: "First, you need to Sign Up. After logging in, visit the 'All Contests' page, choose a contest, and click the 'Register / Pay' button. After successful payment, the 'Submit Task' button will become available in the Contest Details page.", category: "Participation" },
    { id: 2, question: "What are the fees for joining a contest?", answer: "Each contest may have a different entry fee, which is displayed on the Contest Details page. Payment is securely processed via our integrated payment gateway.", category: "Participation" },
    { id: 4, question: "How do I create a new contest?", answer: "You must register as a Contest Creator. Then, go to your Creator Dashboard and select 'Add Contest Page'. Fill out the form with the contest details, prize money, price, and deadline.", category: "Creators" },
    { id: 7, question: "What happens if a contest is rejected by the Admin?", answer: "If your contest is rejected, you will receive a notification in your Creator Dashboard. You can then modify the content based on the rejection reason and resubmit it.", category: "Admin & Roles" },
    { id: 8, question: "Is there a Dark/Light Theme available?", answer: "Yes, we provide a Dark/Light Theme toggle, which saves your preference in localStorage so it persists after page refresh.", category: "General" },
];

const categories = ["All", "Participation", "Creators", "Admin & Roles", "General"];

const FAQSection = () => {
    const [openId, setOpenId] = useState(1); // Default keep first one open
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredFaqs = activeCategory === "All" 
        ? faqs 
        : faqs.filter(faq => faq.category === activeCategory);

    return (
        <section className="bg-slate-50 dark:bg-slate-900 px-6 py-24 min-h-screen">
            <div className="mx-auto max-w-4xl">
                {/* Header */}
                <div className="mb-16 text-center">
                    <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 mb-4 px-3 py-1 rounded-full font-medium text-purple-600 dark:text-purple-400 text-sm">
                        <FaQuestionCircle /> Help Center
                    </div>
                    <h2 className="mb-4 font-black text-slate-800 dark:text-white text-4xl md:text-5xl tracking-tight">
                        Got Questions? <span className="text-purple-600">We've got answers.</span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-lg">
                        Everything you need to know about IdeaArena.
                    </p>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                                activeCategory === cat 
                                ? 'bg-purple-600 text-white shadow-lg shadow-blue-500/30' 
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {filteredFaqs.map((faq) => {
                        const isOpen = openId === faq.id;
                        return (
                            <div 
                                key={faq.id}
                                className={`group overflow-hidden rounded-2xl border transition-all duration-300 ${
                                    isOpen 
                                    ? 'border-blue-200 dark:border-purple-800 bg-white dark:bg-slate-800 shadow-xl shadow-blue-500/5' 
                                    : 'border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-600'
                                }`}
                            >
                                <button
                                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                                    className="flex justify-between items-center p-6 focus:outline-none w-full text-left"
                                >
                                    <span className={`text-lg font-bold transition-colors ${
                                        isOpen ? 'text-purple-600 dark:text-purple-400' : 'text-slate-700 dark:text-slate-200'
                                    }`}>
                                        {faq.question}
                                    </span>
                                    <div className={`transition-transform duration-300 p-2 rounded-full ${
                                        isOpen ? 'bg-purple-600 text-white rotate-180' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
                                    }`}>
                                        <FaChevronDown size={14} />
                                    </div>
                                </button>

                                <div 
                                    className={`transition-all duration-300 ease-in-out ${
                                        isOpen ? 'max-h-[500px] opacity-100 mb-6' : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    <div className="px-6 pt-6 border-slate-100 dark:border-slate-700/50 border-t text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;