import { Link } from 'react-router-dom';

const WhyChooseUs = () => {
  const features = [
    {
      icon: (
        <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Quality Writing, No AI",
      description: "Experience genuine human-written assignments crafted by qualified academic professionals. Each order is tailored to your specific topic, ensuring authentic and accurate work — 100% free from AI tools or plagiarism."
    },
    {
      icon: (
        <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Timely Submissions",
      description: "Need urgent help? We specialize in meeting tight deadlines. Our expert writers are available 24/7 to ensure your paper is completed and delivered on time, without compromising quality."
    },
    {
      icon: (
        <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      title: "Unlimited Amendments",
      description: "Your satisfaction comes first! Enjoy unlimited free revisions until your assignment perfectly matches your expectations. We'll fine-tune every detail until you're fully happy with the final result."
    },
    {
      icon: (
        <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: "Reliable Experts",
      description: "Every writer on our team is a verified academic professional with proven subject expertise. You can rely on their accuracy, commitment, and dedication to producing top-notch work every single time."
    },
    {
      icon: (
        <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Pocket-Friendly Services",
      description: "High-quality academic help doesn't have to break the bank. Our pricing is transparent, flexible, and student-friendly — ensuring you get premium service at an affordable rate."
    },
    {
      icon: (
        <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: "Talk to Experts Anytime",
      description: "Have a question or need progress updates? Communicate directly with your assigned expert anytime through your dashboard. Get quick responses, clarify doubts, and stay confident about your project."
    },
    {
      icon: (
        <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "24/7 Availability",
      description: "No matter your time zone, our support team and writers are online round the clock. From urgent requests to last-minute questions, we're always here to assist you."
    }
  ];

  return (
    <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-navy-1 mb-3 sm:mb-4 leading-tight px-2">
            Why Our Assignment Help Online Is Every Student's First Choice
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-navy-3 max-w-4xl mx-auto px-4">
            Hire trusted experts to handle your assignments with care. Our professional academic writers deliver original, non-plagiarized, and high-quality work — every time
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          {/* First 6 Items - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
            {features.slice(0, 6).map((feature, index) => (
              <div 
                key={index}
                className="bg-white-6 rounded-lg sm:rounded-xl p-4 sm:p-5 border-2 border-transparent hover:border-blue-4 hover:shadow-xl transition-all duration-300 group"
              >
                {/* Icon */}
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-navy-2 to-navy-3 flex items-center justify-center text-white mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-sm sm:text-base font-bold text-navy-1 mb-2 leading-tight">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-navy-3 text-xs sm:text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* 7th Item - Centered (Mobile: Full Width, Tablet+: Half Width) */}
          <div className="flex justify-center mt-3 sm:mt-4 md:mt-5">
            <div className="w-full sm:w-full md:w-1/2 lg:w-1/3">
              <div className="bg-white-6 rounded-lg sm:rounded-xl p-4 sm:p-5 border-2 border-transparent hover:border-blue-4 hover:shadow-xl transition-all duration-300 group">
                {/* Icon */}
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-navy-2 to-navy-3 flex items-center justify-center text-white mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  {features[6].icon}
                </div>

                {/* Title */}
                <h3 className="text-sm sm:text-base font-bold text-navy-1 mb-2 leading-tight">
                  {features[6].title}
                </h3>

                {/* Description */}
                <p className="text-navy-3 text-xs sm:text-sm leading-relaxed">
                  {features[6].description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button - Links to /order */}
        <div className="text-center">
          <Link 
            to="/order"
            className="bg-gradient-to-r from-blue-4 to-blue-5 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 rounded-full font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-2 group"
          >
            <span>Hire Real Writers</span>
            <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
