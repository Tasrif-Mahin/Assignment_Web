import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../apiService';

const Hero = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    countryCode: 'BD +880',
    phone: '',
    description: '',
    serviceType: 'online-class',
    acceptTerms: false
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      // Not logged in - redirect to login
      alert('Please login first to place an order');
      navigate('/login');
      return;
    }

    // Check terms acceptance
    if (!formData.acceptTerms) {
      setError('Please accept terms and conditions');
      return;
    }

    setLoading(true);

    try {
      // Prepare order data for backend
      const orderData = {
        serviceType: formData.serviceType.charAt(0).toUpperCase() + formData.serviceType.slice(1).replace('-', ' '),
        academicLevel: 'Not Specified', // Default value
        subject: formData.subject,
        topic: formData.description || 'Quick order from hero form',
        pages: 1, // Default
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        citationStyle: 'APA', // Default
        description: `Email: ${formData.email}\nPhone: ${formData.countryCode} ${formData.phone}\n\nDescription: ${formData.description}`,
        files: []
      };

      // Create order via API
      const response = await createOrder(orderData);

      // Show success message
      alert('Order submitted successfully! Our team will contact you soon.');

      // Reset form
      setFormData({
        email: '',
        subject: '',
        countryCode: 'BD +880',
        phone: '',
        description: '',
        serviceType: 'online-class',
        acceptTerms: false
      });

      // Redirect to orders page
      navigate('/orders');

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit order. Please try again.');
      setLoading(false);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-navy-1 via-navy-2 to-navy-3 py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Side - Content */}
          <div className="space-y-6 sm:space-y-8 text-white text-center lg:text-left">
            {/* Main Heading */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                <span className="text-blue-4">SubmitSure:</span>
                <br />
                <span className="text-white">Expert Help to</span>
                <br />
                <span className="text-blue-5">Do My Assignment!</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-blue-5 font-light">
                Your trusted Assignment partner
              </p>
            </div>

            {/* Trust Badges */}
            <div className="space-y-4 pt-2 sm:pt-4">
              <p className="text-white-6 text-sm sm:text-base md:text-lg">
                Trusted by <span className="font-bold text-blue-4">1.5M+</span> happy customers
              </p>

              {/* Review Badges */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 md:gap-5 items-center">
                {/* Badge 1 - SubmitSure */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 border border-white/20">
                  <div className="flex flex-col gap-1.5">
                    <span className="font-bold text-white text-xs sm:text-sm">SUBMITSURE</span>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-4 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <span className="font-bold text-white text-xs sm:text-sm">4.9</span>
                    </div>
                  </div>
                </div>

                {/* Badge 2 - Sitejabber */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 border border-white/20">
                  <div className="flex flex-col gap-1.5">
                    <span className="font-bold text-blue-5 text-xs sm:text-sm">sitejabber</span>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current ${i < 4 ? 'text-blue-4' : 'text-gray-400'}`} viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <span className="font-bold text-white text-xs sm:text-sm">4.8</span>
                    </div>
                  </div>
                </div>

                {/* Badge 3 - Reviews.io */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 border border-white/20">
                  <div className="flex flex-col gap-1.5">
                    <span className="font-bold text-white text-xs sm:text-sm">REVIEWS.io</span>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current ${i < 4 ? 'text-blue-5' : 'text-gray-400'}`} viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <span className="font-bold text-white text-xs sm:text-sm">4.8</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA for Mobile/Tablet (Hidden on Desktop) */}
            <div className="lg:hidden pt-4">
              <Link 
                to="/order"
                className="block w-full sm:w-auto sm:mx-auto sm:max-w-xs bg-gradient-to-r from-blue-4 to-blue-5 text-white py-3.5 sm:py-4 rounded-full font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 text-center"
              >
                Order Now →
              </Link>
            </div>
          </div>

          {/* Right Side - Form (Desktop Only) */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-xl shadow-2xl p-5 xl:p-6 border-2 border-blue-4/30 max-w-md mx-auto">
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold text-navy-1 mb-1">
                  Get Expert Help Now
                </h2>
                <p className="text-xs text-navy-3">Fill the form & get instant quote</p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-r">
                  <p className="text-red-700 text-xs font-medium">{error}</p>
                </div>
              )}

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
                  type="button"
                  onClick={() => setFormData({...formData, serviceType: 'writing'})}
                  className={`flex-1 py-2 rounded-md text-xs font-medium transition ${
                    formData.serviceType === 'writing' 
                      ? 'bg-white text-navy-1 shadow-sm' 
                      : 'text-navy-3 hover:text-navy-1'
                  }`}
                  disabled={loading}
                >
                  Writing
                </button>
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, serviceType: 'technical'})}
                  className={`flex-1 py-2 rounded-md text-xs font-medium transition ${
                    formData.serviceType === 'technical' 
                      ? 'bg-white text-navy-1 shadow-sm' 
                      : 'text-navy-3 hover:text-navy-1'
                  }`}
                  disabled={loading}
                >
                  Technical
                </button>
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, serviceType: 'online-class'})}
                  className={`flex-1 py-2 rounded-md text-xs font-medium transition ${
                    formData.serviceType === 'online-class' 
                      ? 'bg-blue-4 text-white shadow-sm' 
                      : 'text-navy-3 hover:text-blue-4'
                  }`}
                  disabled={loading}
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
                  disabled={loading}
                />

                {/* Subject */}
                <input
                  type="text"
                  placeholder="Subject/Course Code"
                  className="w-full px-3.5 py-2.5 border border-navy-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-4 focus:border-transparent text-sm"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  required
                  disabled={loading}
                />

                {/* Phone with Country Code */}
                <div className="flex gap-2">
                  <select 
                    className="w-32 px-2.5 py-2.5 border border-navy-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-4 text-xs font-mono"
                    value={formData.countryCode}
                    onChange={(e) => setFormData({...formData, countryCode: e.target.value})}
                    disabled={loading}
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
                    disabled={loading}
                  />
                </div>

                {/* Description */}
                <textarea
                  placeholder="Brief Description..."
                  rows="2"
                  className="w-full px-3.5 py-2.5 border border-navy-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-4 focus:border-transparent text-sm resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  disabled={loading}
                ></textarea>

                {/* File Upload */}
                <label className="flex items-center justify-center gap-2 px-3.5 py-2.5 border-2 border-dashed border-navy-3 rounded-lg hover:border-blue-4 hover:bg-white-6 cursor-pointer transition text-xs">
                  <svg className="w-4 h-4 text-navy-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  <span className="text-navy-3">Attach Files (Optional)</span>
                  <input type="file" className="hidden" multiple disabled={loading} />
                </label>

                {/* Terms */}
                <label className="flex items-start gap-2 text-[10px] text-navy-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="mt-0.5 w-3.5 h-3.5 text-blue-4 rounded border-navy-3 focus:ring-blue-4"
                    checked={formData.acceptTerms}
                    onChange={(e) => setFormData({...formData, acceptTerms: e.target.checked})}
                    disabled={loading}
                  />
                  <span>I accept T&C and agree to receive updates</span>
                </label>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2.5 rounded-full font-bold text-sm shadow-lg transition-all duration-200 ${
                    loading 
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-4 to-blue-5 text-white hover:shadow-xl hover:scale-105'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    'Get Instant Quote →'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
