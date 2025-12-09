import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Icon er jonyo

// --- FAQ Data ---
// Apnar platform-er requirements theke toiri kora dorkari proshno-gulo
const faqs = [
    {
        id: 1,
        question: "How do I register and participate in a contest?",
        answer: "First, you need to Sign Up. After logging in, visit the 'All Contests' page, choose a contest, and click the 'Register / Pay' button. After successful payment, the 'Submit Task' button will become available in the Contest Details page.",
        category: "Participation",
    },
    {
        id: 2,
        question: "What are the fees for joining a contest?",
        answer: "Each contest may have a different entry fee, which is displayed on the Contest Details page. Payment is securely processed via our integrated payment gateway.",
        category: "Participation",
    },
    {
        id: 3,
        question: "How can I submit my task after registration?",
        answer: "On the Contest Details page, the 'Submit Task' button will open a modal. You must provide all necessary external links (e.g., Google Drive, Figma, GitHub) to your task in the provided textarea field and click submit.",
        category: "Participation",
    },
    {
        id: 4,
        question: "How do I create a new contest?",
        answer: "You must register as a Contest Creator. Then, go to your Creator Dashboard and select 'Add Contest Page'. Fill out the form with the contest details, prize money, price, and deadline. Your contest will be reviewed by an Admin before going live.",
        category: "Creators",
    },
    {
        id: 5,
        question: "When and how is the winner declared?",
        answer: "The Contest Creator is responsible for declaring the winner after the contest deadline has passed. The winner's name and photo will be displayed on the Contest Details page, and the winner will be contacted for prize disbursement.",
        category: "Creators",
    },
    {
        id: 6,
        question: "Can I edit or delete my contest?",
        answer: "As a Creator, you can edit or delete your contest ONLY IF it is still in the 'Pending' status (before Admin approval). Once confirmed, it cannot be modified.",
        category: "Creators",
    },
    {
        id: 7,
        question: "What happens if a contest is rejected by the Admin?",
        answer: "If your contest is rejected, you will receive a notification in your Creator Dashboard. You can then modify the content based on the rejection reason and resubmit it, or you can delete it.",
        category: "Admin & Roles",
    },
    {
        id: 8,
        question: "Is there a Dark/Light Theme available?",
        answer: "Yes, we provide a Dark/Light Theme toggle, which saves your preference in localStorage so it persists after page refresh.",
        category: "General",
    },
];

// Reusable Accordion Item Component
const AccordionItem = ({ faq, isOpen, toggleAccordion }) => {
    return (
        <div className="mb-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            {/* Question (Clickable Header) */}
            <button
                onClick={toggleAccordion}
                className={`w-full flex justify-between items-center p-5 text-left transition duration-300 ${
                    isOpen 
                        ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 font-semibold' 
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
            >
                <span className="text-lg">{faq.question}</span>
                {/* Chevron Icon for State Indication */}
                {isOpen ? <FaChevronUp className="w-4 h-4" /> : <FaChevronDown className="w-4 h-4" />}
            </button>

            {/* Answer (Content) */}
            <div
                className={`transition-max-height ease-in-out duration-500 overflow-hidden ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <p className="p-5 pt-0 border-gray-200 dark:border-gray-700/50 border-t text-gray-700 dark:text-gray-300">
                    {faq.answer}
                </p>
            </div>
        </div>
    );
};

const FAQSection = () => {
    const [openId, setOpenId] = useState(null); // Shudhu ekta item ke open rakhar jonyo state

    const toggleAccordion = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 py-16">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                
                {/* Section Header */}
                <div className="mb-12 text-center">
                    <h2 className="font-extrabold text-gray-900 dark:text-white text-4xl">
                        Frequently Asked Questions (FAQ)
                    </h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-300 text-lg">
                        Everything you need to know about IdeaArena.
                    </p>
                </div>

                {/* Accordion List */}
                <div className="w-full">
                    {faqs.map((faq) => (
                        <AccordionItem
                            key={faq.id}
                            faq={faq}
                            isOpen={openId === faq.id}
                            toggleAccordion={() => toggleAccordion(faq.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQSection;