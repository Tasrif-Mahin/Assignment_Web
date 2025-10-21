import { Link } from 'react-router-dom';

const Footer = () => {
  const footerSections = {
    getToKnow: [
      { name: 'Blog', link: '/blog' },
      { name: 'FAQs', link: '/#faq' },
      { name: 'How It Works', link: '/#how-it-works' },
      { name: 'Reviews', link: '/reviews' },
      { name: 'Contact Us', link: 'https://wa.me/8801727113023', external: true },
      { name: 'Our Offers', link: '/order' }
    ],
    subjects: [
      { name: 'Finance Assignment Help', link: '/order?subject=Finance' },
      { name: 'Autocad Assignment Help', link: '/order?subject=Autocad' },
      { name: 'R Assignment Help', link: '/order?subject=R+Programming' },
      { name: 'Accounting Assignment Help', link: '/order?subject=Accounting' },
      { name: 'Nursing Assignment Help', link: '/order?subject=Nursing' },
      { name: 'MBA Assignment Help', link: '/order?subject=MBA' },
      { name: 'Computer Science Help', link: '/order?subject=Computer+Science' },
      { name: 'Engineering Help', link: '/order?subject=Engineering' },
      { name: 'SPSS Assignment Help', link: '/order?subject=SPSS' },
      { name: 'Law Assignment Help', link: '/order?subject=Law' },
      { name: 'Economics Assignment', link: '/order?subject=Economics' },
      { name: 'Stata Assignment Help', link: '/order?subject=Stata' }
    ],
    essay: [
      { name: 'Persuasive Essay Writing', link: '/order?type=Persuasive+Essay' },
      { name: 'Expository Essay Writing', link: '/order?type=Expository+Essay' },
      { name: 'Descriptive Essay Writing', link: '/order?type=Descriptive+Essay' },
      { name: 'Scholarship Essay Writing', link: '/order?type=Scholarship+Essay' },
      { name: 'Write Essay For Money', link: '/order' },
      { name: 'Pay For Essay', link: '/order' },
      { name: 'Essays For Sale', link: '/order' },
      { name: 'College Essay Writing', link: '/order?type=College+Essay' }
    ],
    citationTools: [
      { name: 'APA Citation', link: '/resources#apa' },
      { name: 'Chicago Citation', link: '/resources#chicago' },
      { name: 'Harvard Citation', link: '/resources#harvard' },
      { name: 'MLA Citation', link: '/resources#mla' },
      { name: 'Vancouver Citation', link: '/resources#vancouver' },
      { name: 'Oxford Citation', link: '/resources#oxford' }
    ]
  };

  const whatsappNumber = '8801727113023'; // +880 1727-113023 (formatted without +, -, spaces)
  const whatsappMessage = 'Hello! I need help with my assignment.';

  return (
    <footer className="bg-gradient-to-br from-navy-1 via-navy-2 to-navy-3 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          
          {/* Get to know us */}
          <div>
            <h3 className="text-sm sm:text-base font-bold mb-3 sm:mb-4 text-blue-5">Get to know us</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerSections.getToKnow.map((item, index) => (
                <li key={index}>
                  {item.external ? (
                    <a 
                      href={item.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm text-white-6 hover:text-blue-4 transition-colors duration-300 block"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link 
                      to={item.link} 
                      className="text-xs sm:text-sm text-white-6 hover:text-blue-4 transition-colors duration-300 block"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Subjects - Column 1 */}
          <div>
            <h3 className="text-sm sm:text-base font-bold mb-3 sm:mb-4 text-blue-5">Subjects</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerSections.subjects.slice(0, 6).map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.link} 
                    className="text-xs sm:text-sm text-white-6 hover:text-blue-4 transition-colors duration-300 block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Subjects - Column 2 (Hidden on mobile) */}
          <div className="hidden md:block">
            <h3 className="text-sm sm:text-base font-bold mb-3 sm:mb-4 text-transparent select-none">.</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerSections.subjects.slice(6).map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.link} 
                    className="text-xs sm:text-sm text-white-6 hover:text-blue-4 transition-colors duration-300 block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Essay */}
          <div>
            <h3 className="text-sm sm:text-base font-bold mb-3 sm:mb-4 text-blue-5">Essay</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerSections.essay.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.link} 
                    className="text-xs sm:text-sm text-white-6 hover:text-blue-4 transition-colors duration-300 block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Citation Tools */}
          <div>
            <h3 className="text-sm sm:text-base font-bold mb-3 sm:mb-4 text-blue-5">Citation Tools</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerSections.citationTools.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.link} 
                    className="text-xs sm:text-sm text-white-6 hover:text-blue-4 transition-colors duration-300 block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact & Social Section */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-center">
            
            {/* Contact - WhatsApp */}
            <div className="text-center sm:text-left">
              <h4 className="text-xs sm:text-sm font-bold mb-2 sm:mb-3 text-blue-5">Contact us</h4>
              <a 
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white-6 hover:text-blue-4 transition-colors"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="text-xs sm:text-sm">+880 1727-113023</span>
              </a>
            </div>

            {/* App Downloads */}
            <div className="text-center order-last lg:order-none">
              <p className="text-xs sm:text-sm text-white-6 mb-1 sm:mb-2">Order on the go!</p>
              <p className="text-[10px] sm:text-xs text-white-6 mb-2 sm:mb-3">Say hello to our app</p>
              <div className="flex justify-center gap-2 sm:gap-3">
                {/* App Store Button */}
                <a href="#" className="inline-block hover:opacity-80 transition-opacity">
                  <div className="bg-black rounded-md sm:rounded-lg px-2.5 sm:px-4 py-1.5 sm:py-2 flex items-center gap-1.5 sm:gap-2">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    <div className="text-left">
                      <div className="text-[7px] sm:text-[8px] text-white leading-tight">Available on the</div>
                      <div className="text-[10px] sm:text-sm font-semibold text-white leading-tight">App Store</div>
                    </div>
                  </div>
                </a>

                {/* Google Play Button */}
                <a href="#" className="inline-block hover:opacity-80 transition-opacity">
                  <div className="bg-black rounded-md sm:rounded-lg px-2.5 sm:px-4 py-1.5 sm:py-2 flex items-center gap-1.5 sm:gap-2">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                    <div className="text-left">
                      <div className="text-[7px] sm:text-[8px] text-white leading-tight">GET IT ON</div>
                      <div className="text-[10px] sm:text-sm font-semibold text-white leading-tight">Google Play</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Secure Payment */}
            <div className="text-center sm:text-right">
              <h4 className="text-xs sm:text-sm font-bold mb-2 sm:mb-3 text-blue-5">100% Secure Pay</h4>
              <div className="flex justify-center sm:justify-end gap-1.5 sm:gap-2 flex-wrap items-center">
                <div className="bg-white px-2 sm:px-3 py-1 sm:py-1.5 rounded">
                  <span className="text-blue-600 font-bold text-[10px] sm:text-sm">VISA</span>
                </div>
                <div className="bg-white px-2 sm:px-3 py-1 sm:py-1.5 rounded">
                  <span className="text-red-600 font-bold text-[10px] sm:text-sm">MC</span>
                </div>
                <div className="bg-white px-2 sm:px-3 py-1 sm:py-1.5 rounded">
                  <span className="text-blue-700 font-bold text-[10px] sm:text-sm">AMEX</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-navy-1/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {/* Copyright & Social */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <p className="text-[10px] sm:text-xs text-white-6 text-center md:text-left">
              Copyright © 2025 SubmitSure.com. All rights reserved
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-2 sm:gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-blue-4 flex items-center justify-center transition-colors">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-blue-4 flex items-center justify-center transition-colors">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-blue-4 flex items-center justify-center transition-colors">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
              </a>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-[10px] sm:text-xs text-white-6 mb-3 sm:mb-4 text-center leading-relaxed px-2">
            Disclaimer: The reference papers provided by SubmitSure.com serve as model papers for students and are not to be submitted as it is. These papers are intended to be used for research and reference purposes only.
          </p>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-white-6">
            <Link to="/terms" className="hover:text-blue-4 transition-colors">Term of use</Link>
            <span className="hidden sm:inline">|</span>
            <Link to="/privacy" className="hover:text-blue-4 transition-colors">Privacy policy</Link>
            <span className="hidden sm:inline">|</span>
            <Link to="/refund" className="hover:text-blue-4 transition-colors">Revision & Refund policy</Link>
            <span className="hidden sm:inline">|</span>
            <Link to="/fair-use" className="hover:text-blue-4 transition-colors">Fair use policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
