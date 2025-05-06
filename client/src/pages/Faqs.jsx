import React, { useState } from "react";

const faqs = [
  {
    question: "How can I place an order?",
    answer: "To place an order, browse our products, add them to your cart, and proceed to checkout. You can choose delivery and payment options during checkout.",
  },
  {
    question: "Do you offer same-day delivery?",
    answer: "Yes, we offer same-day delivery for orders placed before 2 PM in select areas. You’ll see the option at checkout if it's available in your location.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit/debit cards, UPI, net banking, and cash on delivery (COD).",
  },
  {
    question: "Can I return or exchange items?",
    answer: "Yes, perishable items can be returned within 24 hours if damaged or incorrect. Non-perishable goods have a 7-day return window.",
  },
  {
    question: "Is there a minimum order value?",
    answer: "There's no minimum order value, but free delivery is only available on orders above ₹499.",
  },
];

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-700">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left flex justify-between items-center"
            >
              <span className="font-medium text-gray-800">{faq.question}</span>
              <span className="text-xl">{activeIndex === index ? "-" : "+"}</span>
            </button>
            {activeIndex === index && (
              <p className="mt-3 text-gray-600 text-sm">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
