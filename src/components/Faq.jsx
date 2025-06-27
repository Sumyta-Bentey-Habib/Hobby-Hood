import React, { useEffect, useState } from "react";
import faq from "../assets/images/faq.jpg";

const Faq = () => {
  const faqs = [
    {
      question: "How do I choose the right hobby for me?",
      answer:
        "Explore your interests and what makes you feel happy or relaxed. Think about what excites you or something you've always wanted to try.",
    },
    {
      question: "Can I have more than one hobby at a time?",
      answer:
        "Absolutely! Many people enjoy multiple hobbies. It helps you explore different interests and keeps life fun and balanced.",
    },
    {
      question: "What are some hobbies I can do from home?",
      answer:
        "You can try painting, journaling, cooking, yoga, DIY crafts, or learning a new language or skill online — all from home.",
    },
    {
      question: "Are there budget-friendly hobbies I can try?",
      answer:
        "Yes! Reading, drawing, gardening, or watching free online tutorials are great low-cost hobby options.",
    },
    {
      question: "Can hobbies improve my mental health or reduce stress?",
      answer:
        "Definitely. Hobbies can calm your mind, reduce anxiety, and bring joy. They're a powerful tool for emotional well-being.",
    },
    {
      question: "Is it too late to start a new hobby as an adult?",
      answer:
        "Never! You can start a hobby at any age. It’s a great way to discover new passions, meet people, and enjoy your time.",
    },
  ];


  const [themeClasses, setThemeClasses] = useState({
    containerBg: "bg-gradient-to-br from-pink-50 via-rose-100 to-orange-50",
    textPrimary: "text-rose-600",
    textSecondary: "text-gray-700",
    faqBg: "bg-white",
    borderColor: "border-rose-200",
    faqTitle: "text-rose-700",
    faqAnswer: "text-gray-600",
    shadow: "shadow-md",
  });

  useEffect(() => {
    const updateThemeClasses = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      if (theme === "dark") {
        setThemeClasses({
          containerBg: "bg-gray-900",
          textPrimary: "text-rose-400",
          textSecondary: "text-gray-300",
          faqBg: "bg-gray-800",
          borderColor: "border-rose-700",
          faqTitle: "text-rose-300",
          faqAnswer: "text-gray-400",
          shadow: "shadow-lg",
        });
      } else {
        setThemeClasses({
          containerBg: "bg-gradient-to-br from-pink-50 via-rose-100 to-orange-50",
          textPrimary: "text-rose-600",
          textSecondary: "text-gray-700",
          faqBg: "bg-white",
          borderColor: "border-rose-200",
          faqTitle: "text-rose-700",
          faqAnswer: "text-gray-600",
          shadow: "shadow-md",
        });
      }
    };

    updateThemeClasses();

    const observer = new MutationObserver(updateThemeClasses);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`px-4 py-10 ${themeClasses.containerBg} min-h-screen`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <img
            src={faq}
            alt="FAQ"
            className="object-cover mx-auto mb-4 border-4 border-white rounded-full shadow-lg w-28 h-28"
          />
          <h2 className={`text-4xl font-bold ${themeClasses.textPrimary}`}>
            Frequently Asked Questions
          </h2>
          <p className={`mt-2 text-sm sm:text-base ${themeClasses.textSecondary}`}>
            Explore answers to common questions about hobbies and how to find what suits you best.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div
              key={index}
              className={`${themeClasses.faqBg} ${themeClasses.borderColor} ${themeClasses.shadow} collapse collapse-plus border rounded-xl`}
            >
              <input type="radio" name="faq-accordion" defaultChecked={index === 0} />
              <div className={`text-base font-semibold collapse-title sm:text-lg ${themeClasses.faqTitle}`}>
                {item.question}
              </div>
              <div className={`text-sm sm:text-base collapse-content ${themeClasses.faqAnswer}`}>
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
