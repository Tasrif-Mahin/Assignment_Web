import { Link } from 'react-router-dom';

const HowItWorks = () => {
  const steps = [
    {
      icon: (
        <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Submit Your Requirements",
      points: [
        "Fill out the Order Form",
        "Upload Necessary Files",
        "Set Your Deadline"
      ]
    },
    {
      icon: (
        <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      title: "Make a Secure Payment",
      points: [
        "Choose Your Payment Method",
        "Get a Confirmation"
      ]
    },
    {
      icon: (
        <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      title: "We Assign the Perfect Expert",
      points: [
        "Our Expert Matching Process",
        "View Your Writer's Profile"
      ]
    },
    {
      icon: (
        <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
        </svg>
      ),
      title: "Receive Your Solution",
      points: [
        "Download the Completed Work",
        "Check for Quality"
      ]
    },
    {
      icon: (
        <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      title: "Request Revisions (If Needed)",
      points: [
        "Our Free Revision Policy",
        "Final Approval"
      ]
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-white-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-navy-1 mb-3 sm:mb-4 leading-tight">
            How Our Assignment Help Services Work?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-navy-3 max-w-3xl mx-auto px-4">
            Get expert assignment help in five simple steps — fast, secure, and reliable
          </p>
        </div>

        {/* Desktop: Horizontal Flow with Arrows (1024px+) */}
        <div className="hidden lg:block">
          <div className="flex items-center justify-between gap-3 xl:gap-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center flex-1">
                {/* Step Card */}
                <div className="relative flex-1">
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-5 xl:p-6 border-2 border-transparent hover:border-blue-4 group">
                    {/* Step Number Badge */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-blue-4 to-blue-5 rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10">
                      {index + 1}
                    </div>

                    {/* Icon Circle */}
                    <div className="w-14 h-14 xl:w-16 xl:h-16 mx-auto mt-4 mb-4 rounded-full bg-gradient-to-br from-navy-2 to-navy-3 flex items-center justify-center text-white transform group-hover:scale-110 transition-transform duration-300">
                      {step.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-sm xl:text-base font-bold text-navy-1 mb-3 text-center leading-tight">
                      {step.title}
                    </h3>

                    {/* Points List */}
                    <ul className="space-y-2">
                      {step.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-start gap-2 text-xs text-navy-3">
                          <svg className="w-4 h-4 text-blue-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="leading-tight">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Arrow (Between Steps) */}
                {index < steps.length - 1 && (
                  <div className="flex-shrink-0 px-2">
                    <svg className="w-6 h-6 xl:w-8 xl:h-8 text-blue-4 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tablet: 2 Column Grid (768px-1023px) */}
        <div className="hidden md:grid lg:hidden md:grid-cols-2 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step Card */}
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border-2 border-transparent hover:border-blue-4 group h-full">
                {/* Icon Circle */}
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-navy-2 to-navy-3 flex items-center justify-center text-white transform group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>

                {/* Step Number Badge */}
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-blue-4 to-blue-5 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  {index + 1}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-navy-1 mb-4 text-center leading-tight">
                  {step.title}
                </h3>

                {/* Points List */}
                <ul className="space-y-2">
                  {step.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start gap-2 text-sm text-navy-3">
                      <svg className="w-5 h-5 text-blue-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: Vertical Flow with Down Arrows (< 768px) */}
        <div className="md:hidden space-y-5 sm:space-y-6">
          {steps.map((step, index) => (
            <div key={index}>
              {/* Step Card */}
              <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 border-2 border-blue-4/30 hover:shadow-xl transition-shadow duration-300">
                {/* Step Number Badge */}
                <div className="absolute -top-3 -right-3 w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-4 to-blue-5 rounded-full flex items-center justify-center text-white font-bold shadow-lg text-sm sm:text-base">
                  {index + 1}
                </div>

                {/* Icon Circle */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-br from-navy-2 to-navy-3 flex items-center justify-center text-white">
                  {step.icon}
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-navy-1 mb-3 sm:mb-4 text-center leading-tight px-2">
                  {step.title}
                </h3>

                {/* Points List */}
                <ul className="space-y-2">
                  {step.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start gap-2 text-xs sm:text-sm text-navy-3">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Down Arrow (Between Steps on Mobile) */}
              {index < steps.length - 1 && (
                <div className="flex justify-center my-4">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-blue-4 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button - Redirects to /order */}
        <div className="text-center mt-10 sm:mt-12 md:mt-14">
          <Link 
            to="/order"
            className="inline-block bg-gradient-to-r from-blue-4 to-blue-5 text-white px-8 sm:px-10 md:px-12 py-3 sm:py-3.5 md:py-4 rounded-full font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Get Started Now →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
