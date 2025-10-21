import { Link } from 'react-router-dom';

const FeaturesSection = () => {
  const topics = [
    { name: 'Business', icon: '💼', link: '/order?subject=Business' },
    { name: 'Business Management', icon: '📊', link: '/order?subject=Business+Management' },
    { name: 'Finance', icon: '💰', link: '/order?subject=Finance' },
    { name: 'Accounting', icon: '🧮', link: '/order?subject=Accounting' },
    { name: 'Law', icon: '⚖️', link: '/order?subject=Law' },
    { name: 'Mathematics', icon: '🔢', link: '/order?subject=Mathematics' },
    { name: 'Philosophy', icon: '🧠', link: '/order?subject=Philosophy' },
    { name: 'Chemistry', icon: '🧪', link: '/order?subject=Chemistry' },
    { name: 'English', icon: '📝', link: '/order?subject=English' },
    { name: 'Medicine', icon: '⚕️', link: '/order?subject=Medicine' },
    { name: 'Physics', icon: '⚛️', link: '/order?subject=Physics' },
    { name: 'Psychology', icon: '🧬', link: '/order?subject=Psychology' }
  ];

  const features = [
    { name: 'Referencing', originalPrice: '20.99' },
    { name: 'Revision', originalPrice: '19.99' },
    { name: 'Plagiarism Checks', originalPrice: '14.99' },
    { name: 'Formatting', originalPrice: '12.99' },
    { name: 'Proofreading & Editing', originalPrice: '10.99' },
    { name: 'Unlimited Edits', originalPrice: '6.99' }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-white-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start">
          
          {/* Left Side - Assignment Topics */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy-1 mb-3 sm:mb-4 leading-tight">
              High-Quality Assignment Writing Services for Every Subject and Student
            </h2>
            <p className="text-navy-3 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
              Get expert assignment help services which are easy to understand and help you achieve good grades, without burning a hole in your pocket.
            </p>

            {/* Topics Section */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-navy-1 mb-4 sm:mb-5 flex items-center gap-2">
                <span className="w-1 h-5 sm:h-6 bg-blue-4 rounded-full"></span>
                Assignment Topics We Cover
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3">
                {topics.map((topic, index) => (
                  <Link
                    key={index}
                    to={topic.link}
                    className="flex items-center gap-2 sm:gap-2.5 p-2.5 sm:p-3 bg-white rounded-lg sm:rounded-xl border-2 border-navy-3/10 hover:border-blue-4 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                  >
                    <span className="text-xl sm:text-2xl group-hover:scale-125 transition-transform duration-300">
                      {topic.icon}
                    </span>
                    <span className="text-navy-2 font-semibold text-xs sm:text-sm leading-tight">
                      {topic.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Free Features Card */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-5 sm:p-6 border-2 border-blue-4/20 hover:shadow-3xl transition-shadow duration-300">
              {/* Header */}
              <div className="text-center mb-4 sm:mb-5 pb-4 border-b border-navy-3/10">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-blue-4 to-blue-5 mb-2 sm:mb-3">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-navy-1 mb-1">
                  FREE Features
                </h3>
                <p className="text-xs sm:text-sm text-navy-3">
                  Premium services at no extra cost
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-2 sm:space-y-2.5 mb-4 sm:mb-5">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-2 sm:p-2.5 bg-gradient-to-r from-white-6 to-white rounded-lg hover:from-blue-5/10 hover:to-blue-4/10 transition-all duration-300 border border-transparent hover:border-blue-4/20"
                  >
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-navy-2 to-navy-3 flex items-center justify-center flex-shrink-0 shadow-md">
                        <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-navy-1 font-semibold text-xs sm:text-sm">
                        {feature.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="text-navy-3 line-through text-[10px] sm:text-xs">
                        ${feature.originalPrice}
                      </span>
                      <span className="bg-success/10 text-success font-bold text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full">
                        FREE
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-br from-blue-5/20 to-blue-4/10 rounded-lg p-3 sm:p-3.5 mb-4">
                <p className="text-center text-navy-2 text-xs sm:text-sm font-medium">
                  ✨ Get These Premium Features Today
                </p>
              </div>

              {/* Unlock Button - Redirects to /order */}
              <Link 
                to="/order"
                className="w-full bg-gradient-to-r from-blue-4 to-blue-5 text-white py-3 sm:py-3.5 rounded-full font-bold text-sm sm:text-base shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <span>Unlock More</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
