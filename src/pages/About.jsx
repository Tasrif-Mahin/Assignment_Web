import { Link } from 'react-router-dom';
import HowItWorks from '../components/HowItWorks';
import FAQ from '../components/Faq';

const About = () => {
  const coreValues = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Punctuality",
      description: "Receive your assignments within the deadline. Our academic scholars can complete complex tasks within the time limit."
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Safety & Security",
      description: "We use secure SSL-encrypted payment gateways to provide complete security. All your personal details are safe with us."
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: "Quality",
      description: "Our academic writers follow all academic guidelines. We promise 100% plagiarism-free assignments devoid of errors."
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Transparency",
      description: "We maintain complete transparency in terms of pricing. Don't worry about encountering hidden charges on our website."
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section - Assignment Writing Service */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-white-6 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-blue-4">Assignment</span>{" "}
                <span className="text-navy-1">Writing Service</span>
              </h1>
              <p className="text-navy-3 text-lg leading-relaxed mb-8">
                SubmitSure.com is an assignment writing company where you can hire experts to write and proofread all academic papers, including essays, research papers, and more.
              </p>
              
              {/* Hire Us Button - Redirects to Order Page */}
              <Link 
                to="/order"
                className="inline-block bg-gradient-to-r from-blue-4 to-blue-5 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
              >
                Hire Us
              </Link>

              {/* Trusted By Section */}
              <div className="mt-10">
                <p className="text-sm text-navy-3 mb-4">
                  Trusted by <span className="font-bold text-navy-1">1.5M+</span> happy customers
                </p>
                <div className="flex flex-wrap gap-6 items-center">
                  {/* Reviews Badges */}
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md">
                    <div className="flex items-center gap-1">
                      <span className="text-xl">⭐⭐⭐⭐⭐</span>
                    </div>
                    <span className="text-sm font-semibold text-navy-1">4.9</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md">
                    <div className="flex items-center gap-1">
                      <span className="text-xl text-orange-500">⭐⭐⭐⭐⭐</span>
                    </div>
                    <span className="text-sm font-semibold text-navy-1">4.8</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md">
                    <div className="flex items-center gap-1">
                      <span className="text-xl text-green-500">⭐⭐⭐⭐⭐</span>
                    </div>
                    <span className="text-sm font-semibold text-navy-1">4.8</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image/Illustration */}
            <div className="flex justify-center">
              <div className="relative">
                {/* Illustration Placeholder */}
                <div className="w-full max-w-md">
                  <svg className="w-full h-auto" viewBox="0 0 400 300" fill="none">
                    {/* Books Stack */}
                    <rect x="150" y="180" width="100" height="20" rx="2" fill="#7b9dd4" />
                    <rect x="140" y="160" width="120" height="20" rx="2" fill="#3f4d6f" />
                    <rect x="130" y="140" width="140" height="20" rx="2" fill="#2c3654" />
                    <rect x="120" y="120" width="160" height="20" rx="2" fill="#1a1f3a" />
                    
                    {/* Graduation Cap */}
                    <path d="M200 80 L280 110 L200 140 L120 110 Z" fill="#7b9dd4" />
                    <rect x="195" y="140" width="10" height="40" fill="#3f4d6f" />
                    <circle cx="200" cy="185" r="8" fill="#7b9dd4" />
                    
                    {/* Microscope */}
                    <ellipse cx="80" cy="180" rx="20" ry="8" fill="#b8d4f1" />
                    <rect x="75" y="150" width="10" height="30" fill="#3f4d6f" />
                    <circle cx="80" cy="140" r="15" fill="#7b9dd4" />
                    <rect x="70" y="130" width="20" height="8" fill="#2c3654" />
                    
                    {/* Book Open */}
                    <rect x="300" y="160" width="60" height="40" rx="2" fill="#e8eef5" stroke="#7b9dd4" strokeWidth="2" />
                    <line x1="330" y1="160" x2="330" y2="200" stroke="#7b9dd4" strokeWidth="2" />
                    <line x1="310" y1="175" x2="325" y2="175" stroke="#b8d4f1" strokeWidth="2" />
                    <line x1="335" y1="175" x2="350" y2="175" stroke="#b8d4f1" strokeWidth="2" />
                    
                    {/* Pen */}
                    <rect x="260" y="100" width="8" height="60" rx="2" fill="#1a1f3a" transform="rotate(-30 264 130)" />
                    <polygon points="264,98 260,90 268,90" fill="#7b9dd4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-1 mb-4">
              Core Values
            </h2>
            <p className="text-navy-3 text-lg max-w-3xl mx-auto">
              Our Assignment Writing Services Encompass 4 Intrinsic Values.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <div 
                key={index}
                className="group bg-gradient-to-br from-white-6 to-white rounded-2xl p-8 border-2 border-transparent hover:border-blue-4 hover:shadow-2xl transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white flex items-center justify-center text-navy-1 group-hover:text-blue-4 group-hover:scale-110 transition-all duration-300 shadow-lg">
                  {value.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-navy-1 mb-4 text-center">
                  {value.title}
                </h3>

                {/* Description */}
                <p className="text-navy-3 text-sm leading-relaxed text-center">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section (Reused from Home) */}
      <HowItWorks />

      {/* FAQ Section (Reused from Home) */}
      <FAQ />
    </div>
  );
};

export default About;
