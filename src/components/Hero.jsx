import { useState } from 'react';

const Hero = () => {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    countryCode: 'BD +880',
    phone: '',
    description: '',
    serviceType: 'online-class',
    acceptTerms: false
  });

  // All major countries with ISO codes
  const countryCodes = [
    { code: 'BD +880', name: 'Bangladesh' },
    { code: 'US +1', name: 'United States' },
    { code: 'CA +1', name: 'Canada' },
    { code: 'GB +44', name: 'United Kingdom' },
    { code: 'IN +91', name: 'India' },
    { code: 'AU +61', name: 'Australia' },
    { code: 'AE +971', name: 'UAE' },
    { code: 'SA +966', name: 'Saudi Arabia' },
    { code: 'PK +92', name: 'Pakistan' },
    { code: 'MY +60', name: 'Malaysia' },
    { code: 'SG +65', name: 'Singapore' },
    { code: 'CN +86', name: 'China' },
    { code: 'JP +81', name: 'Japan' },
    { code: 'KR +82', name: 'South Korea' },
    { code: 'DE +49', name: 'Germany' },
    { code: 'FR +33', name: 'France' },
    { code: 'IT +39', name: 'Italy' },
    { code: 'ES +34', name: 'Spain' },
    { code: 'NL +31', name: 'Netherlands' },
    { code: 'SE +46', name: 'Sweden' },
    { code: 'NO +47', name: 'Norway' },
    { code: 'DK +45', name: 'Denmark' },
    { code: 'CH +41', name: 'Switzerland' },
    { code: 'AT +43', name: 'Austria' },
    { code: 'BE +32', name: 'Belgium' },
    { code: 'PL +48', name: 'Poland' },
    { code: 'RU +7', name: 'Russia' },
    { code: 'ZA +27', name: 'South Africa' },
    { code: 'NG +234', name: 'Nigeria' },
    { code: 'KE +254', name: 'Kenya' },
    { code: 'EG +20', name: 'Egypt' },
    { code: 'TR +90', name: 'Turkey' },
    { code: 'ID +62', name: 'Indonesia' },
    { code: 'PH +63', name: 'Philippines' },
    { code: 'TH +66', name: 'Thailand' },
    { code: 'VN +84', name: 'Vietnam' },
    { code: 'MX +52', name: 'Mexico' },
    { code: 'BR +55', name: 'Brazil' },
    { code: 'AR +54', name: 'Argentina' },
    { code: 'CL +56', name: 'Chile' },
    { code: 'CO +57', name: 'Colombia' },
    { code: 'NZ +64', name: 'New Zealand' },
    { code: 'IE +353', name: 'Ireland' },
    { code: 'PT +351', name: 'Portugal' },
    { code: 'GR +30', name: 'Greece' },
    { code: 'FI +358', name: 'Finland' },
    { code: 'CZ +420', name: 'Czech Republic' },
    { code: 'HU +36', name: 'Hungary' },
    { code: 'RO +40', name: 'Romania' },
    { code: 'IL +972', name: 'Israel' },
    { code: 'QA +974', name: 'Qatar' },
    { code: 'KW +965', name: 'Kuwait' },
    { code: 'OM +968', name: 'Oman' },
    { code: 'BH +973', name: 'Bahrain' },
    { code: 'JO +962', name: 'Jordan' },
    { code: 'LB +961', name: 'Lebanon' },
    { code: 'LK +94', name: 'Sri Lanka' },
    { code: 'NP +977', name: 'Nepal' },
    { code: 'MM +95', name: 'Myanmar' },
    { code: 'KH +855', name: 'Cambodia' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section className="relative bg-gradient-to-br from-navy-1 via-navy-2 to-navy-3 py-14 md:py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          
          {/* Left Side - Content */}
          <div className="space-y-7 text-white">
            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="text-blue-4">SubmitSure:</span>
                <br />
                <span className="text-white">Expert Help to</span>
                <br />
                <span className="text-blue-5">Do My Assignment!</span>
              </h1>
              <p className="text-base md:text-lg text-blue-5 font-light">
                Your trusted Assignment partner
              </p>
            </div>

            {/* Trust Badges */}
            <div className="space-y-3 pt-4">
              <p className="text-white-6 text-base md:text-lg">
                Trusted by <span className="font-bold text-blue-4">1.5M+</span> happy customers
              </p>

              {/* Review Badges */}
              <div className="flex flex-wrap gap-5 items-center">
                {/* Badge 1 - SubmitSure */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
                  <div className="flex flex-col gap-1.5">
                    <span className="font-bold text-white text-xs">SUBMITSURE</span>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-3.5 h-3.5 text-blue-4 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <span className="font-bold text-white text-xs">4.9</span>
                    </div>
                  </div>
                </div>

                {/* Badge 2 - Sitejabber */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
                  <div className="flex flex-col gap-1.5">
                    <span className="font-bold text-blue-5 text-xs">sitejabber</span>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-3.5 h-3.5 fill-current ${i < 4 ? 'text-blue-4' : 'text-gray-400'}`} viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <span className="font-bold text-white text-xs">4.8</span>
                    </div>
                  </div>
                </div>

                {/* Badge 3 - Reviews.io */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
                  <div className="flex flex-col gap-1.5">
                    <span className="font-bold text-white text-xs">REVIEWS.io</span>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-3.5 h-3.5 fill-current ${i < 4 ? 'text-blue-5' : 'text-gray-400'}`} viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <span className="font-bold text-white text-xs">4.8</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA for Mobile */}
            <div className="lg:hidden">
              <button className="w-full bg-white text-navy-1 py-3 rounded-full font-bold text-base shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200">
                Order Now
              </button>
            </div>
          </div>

          {/* Right Side - Form (Slightly Bigger) */}
          <div className="bg-white rounded-xl shadow-2xl p-5 border-2 border-blue-4/30 max-w-md mx-auto lg:mx-0">
            <div className="text-center mb-4">
              <h2 className="text-lg md:text-xl font-bold text-navy-1 mb-1">
                Get Expert Help Now
              </h2>
              <p className="text-xs text-navy-3">Fill the form & get instant quote</p>
            </div>

            {/* Features Pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <span className="px-2.5 py-1 bg-white-6 text-navy-2 text-[10px] font-medium rounded-full border border-blue-4">
                ✓ A/B Grade
              </span>
              <span className="px-2.5 py-1 bg-white-6 text-navy-2 text-[10px] font-medium rounded-full border border-blue-4">
                ✓ Installments
              </span>
              <span className="px-2.5 py-1 bg-white-6 text-navy-2 text-[10px] font-medium rounded-full border border-blue-4">
                ✓ No Stress
              </span>
            </div>

            {/* Service Type Tabs */}
            <div className="flex gap-1.5 mb-4 bg-white-6 p-1 rounded-lg">
              <button 
                onClick={() => setFormData({...formData, serviceType: 'writing'})}
                className={`flex-1 py-2 rounded-md text-xs font-medium transition ${
                  formData.serviceType === 'writing' 
                    ? 'bg-white text-navy-1 shadow-sm' 
                    : 'text-navy-3 hover:text-navy-1'
                }`}
              >
                Writing
              </button>
              <button 
                onClick={() => setFormData({...formData, serviceType: 'technical'})}
                className={`flex-1 py-2 rounded-md text-xs font-medium transition ${
                  formData.serviceType === 'technical' 
                    ? 'bg-white text-navy-1 shadow-sm' 
                    : 'text-navy-3 hover:text-navy-1'
                }`}
              >
                Technical
              </button>
              <button 
                onClick={() => setFormData({...formData, serviceType: 'online-class'})}
                className={`flex-1 py-2 rounded-md text-xs font-medium transition ${
                  formData.serviceType === 'online-class' 
                    ? 'bg-blue-4 text-white shadow-sm' 
                    : 'text-navy-3 hover:text-blue-4'
                }`}
              >
                Online Class
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-2.5">
              {/* Email */}
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-3.5 py-2.5 border border-navy-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-4 focus:border-transparent text-sm"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />

              {/* Subject */}
              <input
                type="text"
                placeholder="Subject/Course Code"
                className="w-full px-3.5 py-2.5 border border-navy-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-4 focus:border-transparent text-sm"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                required
              />

              {/* Phone with Country Code */}
              <div className="flex gap-2">
                <select 
                  className="w-32 px-2.5 py-2.5 border border-navy-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-4 text-xs font-mono"
                  value={formData.countryCode}
                  onChange={(e) => setFormData({...formData, countryCode: e.target.value})}
                >
                  {countryCodes.map(country => (
                    <option key={country.code} value={country.code}>
                      {country.code}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="flex-1 px-3.5 py-2.5 border border-navy-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-4 focus:border-transparent text-sm"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              {/* Description */}
              <textarea
                placeholder="Brief Description..."
                rows="2"
                className="w-full px-3.5 py-2.5 border border-navy-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-4 focus:border-transparent text-sm resize-none"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              ></textarea>

              {/* File Upload */}
              <label className="flex items-center justify-center gap-2 px-3.5 py-2.5 border-2 border-dashed border-navy-3 rounded-lg hover:border-blue-4 hover:bg-white-6 cursor-pointer transition text-xs">
                <svg className="w-4 h-4 text-navy-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
                <span className="text-navy-3">Attach Files</span>
                <input type="file" className="hidden" multiple />
              </label>

              {/* Terms */}
              <label className="flex items-start gap-2 text-[10px] text-navy-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="mt-0.5 w-3.5 h-3.5 text-blue-4 rounded border-navy-3 focus:ring-blue-4"
                  checked={formData.acceptTerms}
                  onChange={(e) => setFormData({...formData, acceptTerms: e.target.checked})}
                />
                <span>I accept T&C and agree to receive updates</span>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-white text-navy-1 py-2.5 rounded-full font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 border-2 border-navy-1"
              >
                Get Instant Quote →
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
