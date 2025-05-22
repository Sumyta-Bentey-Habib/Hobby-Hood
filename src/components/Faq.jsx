import React from 'react';
import faq from "../assets/images/faq.jpg";

const Faq = () => {
    const faqs = [
        {
            question: "How do I choose the right hobby for me?",
            answer: "Explore your interests and what makes you feel happy or relaxed. Think about what excites you or something you've always wanted to try."
        },
        {
            question: "Can I have more than one hobby at a time?",
            answer: "Absolutely! Many people enjoy multiple hobbies. It helps you explore different interests and keeps life fun and balanced."
        },
        {
            question: "What are some hobbies I can do from home?",
            answer: "You can try painting, journaling, cooking, yoga, DIY crafts, or learning a new language or skill online — all from home."
        },
        {
            question: "Are there budget-friendly hobbies I can try?",
            answer: "Yes! Reading, drawing, gardening, or watching free online tutorials are great low-cost hobby options."
        },
        {
            question: "Can hobbies improve my mental health or reduce stress?",
            answer: "Definitely. Hobbies can calm your mind, reduce anxiety, and bring joy. They're a powerful tool for emotional well-being."
        },
        {
            question: "Is it too late to start a new hobby as an adult?",
            answer: "Never! You can start a hobby at any age. It’s a great way to discover new passions, meet people, and enjoy your time."
        }
    ];

    return (
        <div className="bg-gradient-to-br from-pink-50 via-rose-100 to-orange-50 py-10 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <img
                        src={faq}
                        alt="FAQ"
                        className="mx-auto w-28 h-28 rounded-full object-cover shadow-lg mb-4 border-4 border-white"
                    />
                    <h2 className="text-4xl font-bold text-rose-600">Frequently Asked Questions</h2>
                    <p className="text-gray-700 mt-2 text-sm sm:text-base">
                        Explore answers to common questions about hobbies and how to find what suits you best.
                    </p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqs.map((item, index) => (
                        <div
                            key={index}
                            className="collapse collapse-plus bg-white border border-rose-200 shadow-md rounded-xl"
                        >
                            <input type="radio" name="faq-accordion" defaultChecked={index === 0} />
                            <div className="collapse-title text-base sm:text-lg font-semibold text-rose-700">
                                {item.question}
                            </div>
                            <div className="collapse-content text-gray-600 text-sm sm:text-base">
                                <p>{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Faq;
