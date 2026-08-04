import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaSearch, FaQuestionCircle, FaHeadset, FaTimes } from 'react-icons/fa';

const faqs = [
    { id: 1, question: "How do I register and participate in a contest?", answer: "First, you need to Sign Up. After logging in, visit the 'All Contests' page, choose a contest, and click the 'Register / Pay' button. After successful payment, the 'Submit Task' button will become available in the Contest Details page.", category: "Participation" },
    { id: 2, question: "What are the fees for joining a contest?", answer: "Each contest may have a different entry fee, which is displayed on the Contest Details page. Payment is securely processed via our integrated payment gateway.", category: "Participation" },
    { id: 4, question: "How do I create a new contest?", answer: "You must register as a Contest Creator. Then, go to your Creator Dashboard and select 'Add Contest Page'. Fill out the form with the contest details, prize money, price, and deadline.", category: "Creators" },
    { id: 7, question: "What happens if a contest is rejected by the Admin?", answer: "If your contest is rejected, you will receive a notification in your Creator Dashboard. You can then modify the content based on the rejection reason and resubmit it.", category: "Admin & Roles" },
    { id: 8, question: "Is there a Dark/Light Theme available?", answer: "Yes, we provide a Dark/Light Theme toggle, which saves your preference in localStorage so it persists after page refresh.", category: "General" },
];

const categories = ["All", "Participation", "Creators", "Admin & Roles", "General"];

const FAQSection = () => {
    const [openId, setOpenId] = useState(1);
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredFaqs = useMemo(() => {
        return faqs.filter(faq => {
            const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
            const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    const handleCategoryChange = (cat) => {
        setActiveCategory(cat);
        // Reset open accordion if the currently opened one is filtered out
        const firstMatching = faqs.find(f => cat === "All" || f.category === cat);
        setOpenId(firstMatching ? firstMatching.id : null);
    };

    return (
        <section className="relative bg-gradient-to-b from-white via-slate-50 to-purple-50/20 py-16 sm:py-20 lg:py-28 overflow-hidden text-slate-800">
            {/* Background Decor */}
            <div className="top-1/3 right-10 absolute bg-purple-100/50 blur-[120px] rounded-full w-72 sm:w-96 h-72 sm:h-96 pointer-events-none" />
            <div className="bottom-10 left-10 absolute bg-indigo-100/40 blur-[100px] rounded-full w-60 sm:w-80 h-60 sm:h-80 pointer-events-none" />

            <div className="z-10 relative mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                
                {/* Header Section */}
                <div className="mx-auto mb-10 sm:mb-12 max-w-2xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-purple-100 mb-3 sm:mb-4 px-3.5 py-1.5 border border-purple-200 rounded-full font-semibold text-purple-700 text-xs uppercase tracking-wider"
                    >
                        <FaQuestionCircle className="text-purple-600" /> Help Center
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-black text-slate-900 text-2xl sm:text-4xl lg:text-5xl leading-tight tracking-tight"
                    >
                        Got Questions? <span className="bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent">We've Got Answers</span>
                    </motion.h2>

                    <motion.p 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-2.5 sm:mt-3 text-slate-600 text-sm sm:text-base lg:text-lg"
                    >
                        Everything you need to know about joining, creating, and winning on IdeaArena.
                    </motion.p>
                </div>

                {/* Search Bar */}
                <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 }}
                    className="relative mx-auto mb-6 sm:mb-8 max-w-xl"
                >
                    <div className="relative flex items-center bg-white shadow-sm border border-slate-200 focus-within:border-purple-500 rounded-2xl focus-within:ring-4 focus-within:ring-purple-500/10 transition-all duration-300">
                        <FaSearch className="ml-4 text-slate-400 text-sm sm:text-base" />
                        <input 
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search questions or keywords..."
                            className="bg-transparent px-3 py-3 sm:py-3.5 border-none outline-none w-full text-slate-800 text-xs sm:text-sm placeholder-slate-400"
                        />
                        {searchQuery && (
                            <button 
                                onClick={() => setSearchQuery("")}
                                className="mr-2 p-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                                aria-label="Clear search"
                            >
                                <FaTimes className="text-xs sm:text-sm" />
                            </button>
                        )}
                    </div>
                </motion.div>

                {/* Category Filters */}
                <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10"
                >
                    {categories.map((cat) => {
                        const count = cat === "All" 
                            ? faqs.length 
                            : faqs.filter(f => f.category === cat).length;
                        
                        return (
                            <button
                                key={cat}
                                onClick={() => handleCategoryChange(cat)}
                                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                                    activeCategory === cat 
                                    ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10' 
                                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                }`}
                            >
                                <span>{cat}</span>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                                    activeCategory === cat ? 'bg-purple-500 text-white' : 'bg-slate-100 text-slate-500'
                                }`}>
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </motion.div>

                {/* Accordion List */}
                <div className="space-y-3.5 sm:space-y-4">
                    <AnimatePresence mode="popLayout">
                        {filteredFaqs.length > 0 ? (
                            filteredFaqs.map((faq) => {
                                const isOpen = openId === faq.id;
                                return (
                                    <motion.div 
                                        layout
                                        key={faq.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className={`rounded-2xl border transition-all duration-300 bg-white overflow-hidden ${
                                            isOpen 
                                            ? 'border-purple-300 shadow-lg shadow-purple-500/5 ring-1 ring-purple-500/20' 
                                            : 'border-slate-200 hover:border-slate-300 shadow-sm'
                                        }`}
                                    >
                                        <button
                                            onClick={() => setOpenId(isOpen ? null : faq.id)}
                                            aria-expanded={isOpen}
                                            className="flex justify-between items-center p-4 sm:p-6 focus:outline-none w-full text-left cursor-pointer"
                                        >
                                            <span className={`text-sm sm:text-base lg:text-lg font-bold pr-4 transition-colors ${
                                                isOpen ? 'text-purple-700' : 'text-slate-800'
                                            }`}>
                                                {faq.question}
                                            </span>
                                            <div className={`p-1.5 sm:p-2 rounded-xl transition-all duration-300 shrink-0 ${
                                                isOpen ? 'bg-purple-600 text-white rotate-180' : 'bg-slate-100 text-slate-500'
                                            }`}>
                                                <FaChevronDown className="text-xs" />
                                            </div>
                                        </button>

                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div 
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="px-4 sm:px-6 pt-2 pb-5 sm:pb-6 border-slate-100 border-t text-slate-600 text-xs sm:text-sm lg:text-base leading-relaxed">
                                                        {faq.answer}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-white shadow-sm py-12 border border-slate-200 rounded-2xl text-center"
                            >
                                <p className="font-medium text-slate-500 text-sm">No matching questions found.</p>
                                <button 
                                    onClick={() => { setSearchQuery(""); setActiveCategory("All"); setOpenId(1); }}
                                    className="mt-3 font-bold text-purple-600 text-xs hover:underline cursor-pointer"
                                >
                                    Clear all filters
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Support Contact Footer */}
                <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex sm:flex-row flex-col justify-between items-center gap-4 bg-purple-50/60 mt-10 sm:mt-12 p-5 sm:p-6 border border-purple-100 rounded-2xl sm:text-left text-center"
                >
                    <div className="flex sm:flex-row flex-col items-center sm:items-start gap-3">
                        <div className="bg-purple-600 p-3 rounded-xl text-white shrink-0">
                            <FaHeadset className="text-lg sm:text-xl" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-sm">Still have questions?</h4>
                            <p className="text-slate-500 text-xs">Can't find the answer you're looking for? Please chat with our team.</p>
                        </div>
                    </div>
                    <a 
                        href="/contact" 
                        className="bg-slate-900 hover:bg-purple-600 shadow-md px-5 py-2.5 rounded-xl font-semibold text-white text-xs whitespace-nowrap transition-all duration-300"
                    >
                        Contact Support
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQSection;