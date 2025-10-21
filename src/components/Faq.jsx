import { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How fast can you do my assignment for me?",
      answer: "We offer flexible deadlines ranging from 3 hours to several weeks. Our expert writers work efficiently to deliver quality assignments within your specified timeframe, ensuring you never miss a deadline."
    },
    {
      question: "What is assignment writing help?",
      answer: "Assignment writing help is a professional service where qualified academic writers assist students with their coursework, essays, research papers, and other academic tasks. Our experts provide original, well-researched content tailored to your requirements."
    },
    {
      question: "Can I use an assignment writing service legally?",
      answer: "Yes, using assignment writing services for reference and learning purposes is completely legal. Our services are designed to help students understand complex topics better and use the delivered work as a study guide or reference material."
    },
    {
      question: "Can I choose the assignment writer who will do my assignment for me?",
      answer: "Absolutely! You can review writer profiles, check their qualifications and ratings, and select the expert who best matches your subject requirements. You can also communicate directly with your chosen writer throughout the process."
    },
    {
      question: "Can your academic writers do my assignments of any kind?",
      answer: "Yes, our team consists of specialized writers covering all academic levels and subjects including humanities, sciences, business, technology, law, medicine, and more. From simple essays to complex dissertations, we handle it all."
    },
    {
      question: "Can I upgrade my assignment help services to premium?",
      answer: "Yes, you can upgrade to premium services which include priority delivery, top-rated writers, enhanced quality checks, plagiarism reports, and direct communication channels for better collaboration and faster turnaround."
    },
    {
      question: "Can you provide proof of originality for my assignment?",
      answer: "Absolutely! Every assignment comes with a free plagiarism report from trusted tools like Turnitin or Copyscape. We guarantee 100% original, non-plagiarized content written from scratch specifically for you."
    },
    {
      question: "How can I find a reliable service for students who can write my assignment for me?",
      answer: "Look for services with verified reviews, transparent pricing, qualified writers, strong confidentiality policies, and money-back guarantees. Check testimonials, sample work, and customer support responsiveness before choosing."
    },
    {
      question: "Where can I find free PDF resources when seeking assignment writing help?",
      answer: "We provide free study guides, sample assignments, formatting templates, and research resources in PDF format. Additionally, our blog section contains helpful academic writing tips and subject-specific guides you can download."
    },
    {
      question: "Are assignment help services worth it for students?",
      answer: "Yes! Professional assignment help saves time, reduces stress, improves grades, and helps students learn from expert-written examples. It's especially valuable when juggling multiple deadlines or tackling difficult subjects."
    },
    {
      question: "Does any website offering assignment writing help maintain confidentiality?",
      answer: "Reputable services like ours strictly protect your personal information and academic integrity. We use secure payment systems, never share your details, and ensure complete anonymity throughout the entire process."
    },
    {
      question: "How do I know if a custom assignment writing service is considered top-rated?",
      answer: "Top-rated services display verified customer reviews, have high success rates, employ qualified writers, offer guarantees (money-back, revisions), provide 24/7 support, and maintain transparent communication and pricing."
    },
    {
      question: "How can I choose the best assignment helper?",
      answer: "Evaluate their qualifications, experience in your subject, customer ratings, delivery speed, communication skills, and sample work quality. Read reviews from other students and start with a small order to test their reliability."
    },
    {
      question: "Can I get university assignment help for complex subjects?",
      answer: "Yes! We have PhD-level experts specializing in advanced subjects like quantum physics, advanced mathematics, medical research, engineering, law, and more. No subject is too complex for our qualified academic professionals."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy-1 mb-2 sm:mb-3 leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-navy-3 max-w-3xl mx-auto px-4">
            Find answers to common questions about our assignment help services
          </p>
        </div>

        {/* FAQ Grid - Mobile: 1 Column, Tablet+: 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 items-start">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 ${
                openIndex === index
                  ? 'bg-white shadow-xl border-2 border-blue-4'
                  : 'bg-white-6 shadow-sm border-2 border-navy-3/10 hover:border-blue-4/30'
              }`}
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between text-left transition-colors duration-300 ${
                  openIndex === index ? 'bg-gradient-to-r from-blue-5/10 to-transparent' : ''
                }`}
              >
                <span className={`font-semibold text-xs sm:text-sm md:text-base pr-3 sm:pr-4 leading-tight ${
                  openIndex === index ? 'text-navy-1' : 'text-navy-2'
                }`}>
                  {faq.question}
                </span>
                
                {/* Animated Icon */}
                <div className={`flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                  openIndex === index 
                    ? 'bg-blue-4 rotate-180' 
                    : 'bg-navy-3/10'
                }`}>
                  <svg
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                      openIndex === index ? 'text-white' : 'text-navy-3'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {/* Answer (Independent Expansion) */}
              <div
                style={{
                  maxHeight: openIndex === index ? '400px' : '0',
                  transition: 'max-height 0.4s ease-in-out'
                }}
                className="overflow-hidden"
              >
                <div className="px-4 sm:px-5 pb-3 sm:pb-4">
                  <div className="pt-2 border-t border-navy-3/10">
                    <p className="text-navy-3 text-xs sm:text-sm leading-relaxed mt-2">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-8 sm:mt-10 md:mt-12">
          <div className="bg-white-6 rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 md:p-8 max-w-2xl mx-auto border border-blue-4/20">
            <div className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-4 to-blue-5 rounded-full mb-3 sm:mb-4">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-navy-1 mb-2 leading-tight">
              Still have questions?
            </h3>
            <p className="text-navy-3 text-xs sm:text-sm mb-4 sm:mb-5">
              Our support team is available 24/7 to help you
            </p>
            <Link 
              to="/order"
              className="bg-gradient-to-r from-blue-4 to-blue-5 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-2 group"
            >
              <span>Get Started Now</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
