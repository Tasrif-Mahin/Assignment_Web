import { Link } from 'react-router-dom';

const FeaturesSection = () => {
  const topics = [
    { name: 'Law', icon: '⚖️' },
    { name: 'Mathematics', icon: '🔢' },
    { name: 'Philosophy', icon: '🧠' },
    { name: 'Chemistry', icon: '🧪' },
    { name: 'English', icon: '📝' },
    { name: 'Medicine', icon: '⚕️' },
    { name: 'Accounting', icon: '💰' },
    { name: 'Physics', icon: '⚛️' },
    { name: 'Psychology', icon: '🧬' }
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
    <section className="py-14 md:py-20 bg-gradient-to-b from-white to-white-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          
          {/* Left Side - Assignment Topics */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-1 mb-4 leading-tight">
              High-Quality Assignment Writing Services for Every Subject and Student
            </h2>
            <p className="text-navy-3 mb-8 text-base leading-relaxed">
              Get expert assignment help services which are easy to understand and help you achieve good grades, without burning a hole in your pocket.
            </p>

            {/* Topics Section */}
            <div>
              <h3 className="text-xl font-bold text-navy-1 mb-5 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-4 rounded-full"></span>
                Assignment Topics We Cover
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {topics.map((topic, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2.5 p-3 bg-white rounded-xl border-2 border-navy-3/10 hover:border-blue-4 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                  >
                    <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                      {topic.icon}
                    </span>
                    <span className="text-navy-2 font-semibold text-sm">
                      {topic.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Free Features Card (Compact Height) */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl shadow-2xl p-6 border-2 border-blue-4/20 hover:shadow-3xl transition-shadow duration-300">
              {/* Header (Compact) */}
              <div className="text-center mb-4 pb-4 border-b border-navy-3/10">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-4 to-blue-5 mb-2">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-navy-1 mb-1">
                  FREE Features
                </h3>
                <p className="text-xs text-navy-3">
                  Premium services at no extra cost
                </p>
              </div>

              {/* Features List (Compact) */}
              <div className="space-y-2.5 mb-4">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-2.5 bg-gradient-to-r from-white-6 to-white rounded-lg hover:from-blue-5/10 hover:to-blue-4/10 transition-all duration-300 border border-transparent hover:border-blue-4/20"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-navy-2 to-navy-3 flex items-center justify-center flex-shrink-0 shadow-md">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-navy-1 font-semibold text-sm">
                        {feature.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-navy-3 line-through text-xs">
                        ${feature.originalPrice}
                      </span>
                      <span className="bg-success/10 text-success font-bold text-xs px-2 py-0.5 rounded-full">
                        FREE
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Section (Compact) */}
              <div className="bg-gradient-to-br from-blue-5/20 to-blue-4/10 rounded-lg p-3 mb-4">
                <p className="text-center text-navy-2 text-xs font-medium">
                   Get These Premium Features Today
                </p>
              </div>

              {/* Unlock Button - Redirects to /order */}
              <Link 
                to="/order"
                className="w-full bg-white text-navy-1 py-3 rounded-full font-bold text-sm shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-navy-1 flex items-center justify-center gap-2 group"
              >
                <span>Unlock More</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
