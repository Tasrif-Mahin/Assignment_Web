const Footer = () => {
  const footerSections = {
    getToKnow: [
      { name: 'Blog', link: '#' },
      { name: 'FAQs', link: '#' },
      { name: 'How It Works', link: '#' },
      { name: 'Reviews', link: '#' },
      { name: 'Contact Us', link: '#' },
      { name: 'Our Offers', link: '#' }
    ],
    subjects: [
      { name: 'Finance Assignment Help', link: '#' },
      { name: 'Autocad Assignment Help', link: '#' },
      { name: 'R Assignment Help', link: '#' },
      { name: 'Accounting Assignment Help', link: '#' },
      { name: 'Nursing Assignment Help', link: '#' },
      { name: 'MBA Assignment Help', link: '#' },
      { name: 'Computer Science Help', link: '#' },
      { name: 'Engineering Help', link: '#' },
      { name: 'SPSS Assignment Help', link: '#' },
      { name: 'Law Assignment Help', link: '#' },
      { name: 'Economics Assignment', link: '#' },
      { name: 'Stata Assignment Help', link: '#' }
    ],
    essay: [
      { name: 'Persuasive Essay Writing', link: '#' },
      { name: 'Expository Essay Writing', link: '#' },
      { name: 'Descriptive Essay Writing', link: '#' },
      { name: 'Scholarship Essay Writing', link: '#' },
      { name: 'Write Essay For Money', link: '#' },
      { name: 'Pay For Essay', link: '#' },
      { name: 'Essays For Sale', link: '#' },
      { name: 'College Essay Writing', link: '#' }
    ],
    citationTools: [
      { name: 'APA Citation', link: '#' },
      { name: 'Chicago Citation', link: '#' },
      { name: 'Harvard Citation', link: '#' },
      { name: 'MLA Citation', link: '#' },
      { name: 'Vancouver Citation', link: '#' },
      { name: 'Oxford Citation', link: '#' }
    ]
  };

  return (
    <footer className="bg-gradient-to-br from-navy-1 via-navy-2 to-navy-3 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          
          {/* Get to know us */}
          <div>
            <h3 className="text-base font-bold mb-4 text-blue-5">Get to know us</h3>
            <ul className="space-y-2">
              {footerSections.getToKnow.map((item, index) => (
                <li key={index}>
                  <a href={item.link} className="text-sm text-white-6 hover:text-blue-4 transition-colors duration-300">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h3 className="text-base font-bold mb-4 text-blue-5">Subjects</h3>
            <ul className="space-y-2">
              {footerSections.subjects.slice(0, 6).map((item, index) => (
                <li key={index}>
                  <a href={item.link} className="text-sm text-white-6 hover:text-blue-4 transition-colors duration-300">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* More Subjects */}
          <div className="md:block hidden">
            <h3 className="text-base font-bold mb-4 text-transparent">.</h3>
            <ul className="space-y-2">
              {footerSections.subjects.slice(6).map((item, index) => (
                <li key={index}>
                  <a href={item.link} className="text-sm text-white-6 hover:text-blue-4 transition-colors duration-300">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Essay */}
          <div>
            <h3 className="text-base font-bold mb-4 text-blue-5">Essay</h3>
            <ul className="space-y-2">
              {footerSections.essay.map((item, index) => (
                <li key={index}>
                  <a href={item.link} className="text-sm text-white-6 hover:text-blue-4 transition-colors duration-300">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Citation Tools */}
          <div>
            <h3 className="text-base font-bold mb-4 text-blue-5">Citation Tools</h3>
            <ul className="space-y-2">
              {footerSections.citationTools.map((item, index) => (
                <li key={index}>
                  <a href={item.link} className="text-sm text-white-6 hover:text-blue-4 transition-colors duration-300">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact & Social Section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            
            {/* Contact */}
            <div>
              <h4 className="text-sm font-bold mb-3 text-blue-5">Contact us</h4>
              <a href="tel:+1-205-350-5700" className="flex items-center gap-2 text-white-6 hover:text-blue-4 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm">+1-205-350-5700</span>
              </a>
            </div>

            {/* App Downloads */}
            <div className="text-center">
              <p className="text-sm text-white-6 mb-2">Order on the go!</p>
              <p className="text-xs text-white-6 mb-3">Say hello to our app</p>
              <div className="flex justify-center gap-3">
                {/* App Store Button */}
                <a href="#" className="inline-block hover:opacity-80 transition-opacity">
                  <div className="bg-black rounded-lg px-4 py-2 flex items-center gap-2">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    <div className="text-left">
                      <div className="text-[8px] text-white leading-tight">Available on the</div>
                      <div className="text-sm font-semibold text-white leading-tight">App Store</div>
                    </div>
                  </div>
                </a>

                {/* Google Play Button */}
                <a href="#" className="inline-block hover:opacity-80 transition-opacity">
                  <div className="bg-black rounded-lg px-4 py-2 flex items-center gap-2">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                    <div className="text-left">
                      <div className="text-[8px] text-white leading-tight">GET IT ON</div>
                      <div className="text-sm font-semibold text-white leading-tight">Google Play</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Secure Payment */}
            <div className="text-center md:text-right">
              <h4 className="text-sm font-bold mb-3 text-blue-5">100% Secure Pay</h4>
              <div className="flex justify-center md:justify-end gap-2 flex-wrap items-center">
                <div className="bg-white px-3 py-1.5 rounded">
                  <span className="text-blue-600 font-bold text-sm">VISA</span>
                </div>
                <div className="bg-white px-3 py-1.5 rounded">
                  <span className="text-red-600 font-bold text-sm">MC</span>
                </div>
                <div className="bg-white px-3 py-1.5 rounded">
                  <span className="text-blue-700 font-bold text-sm">AMEX</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-navy-1/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Copyright & Social */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
            <p className="text-xs text-white-6">
              Copyright © 2025 SubmitSure.com. All rights reserved
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-blue-4 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-blue-4 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-blue-4 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
              </a>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-white-6 mb-4 text-center leading-relaxed">
            Disclaimer: The reference papers provided by SubmitSure.com serve as model papers for students and are not to be submitted as it is. These papers are intended to be used for research and reference purposes only.
          </p>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-3 text-xs text-white-6">
            <a href="#" className="hover:text-blue-4 transition-colors">Term of use</a>
            <span>|</span>
            <a href="#" className="hover:text-blue-4 transition-colors">Privacy policy</a>
            <span>|</span>
            <a href="#" className="hover:text-blue-4 transition-colors">Revision & Refund policy</a>
            <span>|</span>
            <a href="#" className="hover:text-blue-4 transition-colors">Fair use policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
