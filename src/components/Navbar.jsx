import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileServicesPage, setMobileServicesPage] = useState(false);

  const servicesMenu = {
    Writing: [
      { name: 'Essay Editing Service', link: '/essay-editing' },
      { name: 'MBA Essay Writing Service', link: '/mba-essay' },
      { name: 'Essay Help', link: '/essay-help' },
      { name: 'Research Proposal Writing Service', link: '/research-proposal' },
      { name: 'Research Paper Writing', link: '/research-paper' },
      { name: 'Ghost Writer', link: '/ghost-writer' }
    ],
    'Problem Solving': [
      { name: 'Programming Assignment Help', link: '/programming' },
      { name: 'Assessment Help', link: '/assessment' },
      { name: 'Do My Assignment', link: '/do-my-assignment' },
      { name: 'Pay Someone To Do My Homework', link: '/pay-homework' },
      { name: 'Do My Homework', link: '/do-homework' },
      { name: 'Take My Online Class', link: '/online-class' }
    ],
    'More Services': [
      { name: 'Take My Online Exam', link: '/online-exam' },
      { name: 'Dissertation Help', link: '/dissertation' },
      { name: 'Term Paper Help', link: '/term-paper' },
      { name: 'Homework Help', link: '/homework' },
      { name: 'Case Study Help', link: '/case-study' },
      { name: 'Coursework Help', link: '/coursework' },
      { name: 'Thesis Help', link: '/thesis' },
      { name: 'Powerpoint Presentation Services', link: '/powerpoint' }
    ]
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-navy-1">
              SubmitSure
            </h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setShowServices(true)}
              onMouseLeave={() => setShowServices(false)}
            >
              <button className="text-gray-700 hover:text-blue-4 transition flex items-center py-4">
                Services
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div 
                className={`absolute left-0 mt-0 w-[800px] bg-white rounded-lg shadow-xl transition-all duration-300 ${
                  showServices ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}
                onMouseEnter={() => setShowServices(true)}
                onMouseLeave={() => setShowServices(false)}
              >
                <div className="p-6 grid grid-cols-3 gap-6">
                  {Object.entries(servicesMenu).map(([category, items]) => (
                    <div key={category}>
                      <h3 className="font-semibold text-navy-1 mb-3">{category}</h3>
                      <ul className="space-y-2">
                        {items.map((item) => (
                          <li key={item.link}>
                            <Link 
                              to={item.link}
                              className="text-sm text-gray-600 hover:text-blue-4 transition block py-1"
                              onClick={() => setShowServices(false)}
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Link to="/reviews" className="text-gray-700 hover:text-blue-4 transition">Reviews</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-4 transition">About us</Link>
            <Link to="/resources" className="text-gray-700 hover:text-blue-4 transition">Resources</Link>
            <Link to="/blog" className="text-gray-700 hover:text-blue-4 transition">Blog</Link>
          </div>

          {/* Right Side: Order Now + Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Order Now Button */}
            <Link 
              to="/order"
              className="bg-gradient-to-r from-blue-4 to-blue-5 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Order Now
            </Link>

            {/* Profile Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setShowProfileMenu(true)}
              onMouseLeave={() => setShowProfileMenu(false)}
            >
              <button className="text-navy-1 hover:text-blue-4 transition">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>

              {/* Profile Dropdown Menu */}
              <div 
                className={`absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-blue-4/20 transition-all duration-300 ${
                  showProfileMenu ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}
                onMouseEnter={() => setShowProfileMenu(true)}
                onMouseLeave={() => setShowProfileMenu(false)}
              >
                <div className="p-4">
                  <Link 
                    to="/login"
                    className="block w-full text-center bg-white border-2 border-navy-1 text-navy-1 px-4 py-2.5 rounded-lg font-semibold hover:bg-navy-1 hover:text-white transition mb-3"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    Sign In
                  </Link>
                  <p className="text-xs text-navy-3 text-center">
                    New User?{" "}
                    <Link 
                      to="/signup" 
                      className="text-blue-4 hover:underline font-semibold"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Start here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: Profile + Hamburger */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/login" className="text-navy-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-navy-1"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Main Menu Sidebar */}
      <div className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div 
          className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsOpen(false)}
        ></div>

        <div className={`absolute left-0 top-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-500 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-6">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-xl font-bold text-navy-1 mb-8">SubmitSure</h2>

            <div className="space-y-2">
              <button 
                onClick={() => setMobileServicesPage(true)}
                className="w-full flex justify-between items-center py-3 text-gray-700 font-medium hover:text-blue-4 transition"
              >
                Services
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <Link 
                to="/reviews" 
                className="block py-3 text-gray-700 hover:text-blue-4 transition" 
                onClick={() => setIsOpen(false)}
              >
                Reviews
              </Link>
              
              <Link 
                to="/about" 
                className="block py-3 text-gray-700 hover:text-blue-4 transition" 
                onClick={() => setIsOpen(false)}
              >
                About us
              </Link>

              <Link 
                to="/resources" 
                className="block py-3 text-gray-700 hover:text-blue-4 transition" 
                onClick={() => setIsOpen(false)}
              >
                Resources
              </Link>

              <Link 
                to="/blog" 
                className="block py-3 text-gray-700 hover:text-blue-4 transition" 
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>

              <Link 
                to="/order"
                className="block w-full mt-6 bg-gradient-to-r from-blue-4 to-blue-5 text-white text-center px-4 py-3 rounded-lg font-semibold hover:shadow-lg transition"
                onClick={() => setIsOpen(false)}
              >
                Order Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Services Full Page */}
      <div className={`md:hidden fixed inset-0 z-50 bg-white transform transition-all duration-500 ease-in-out ${
        mobileServicesPage ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-4 overflow-y-auto h-full">
          <div className="flex items-center mb-6">
            <button 
              onClick={() => setMobileServicesPage(false)}
              className="mr-4 text-gray-700 hover:text-blue-4"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-lg font-bold text-navy-1">Services</h2>
            <button 
              onClick={() => {
                setMobileServicesPage(false);
                setIsOpen(false);
              }}
              className="ml-auto text-gray-700 hover:text-blue-4"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6 pb-6">
            {Object.entries(servicesMenu).map(([category, items]) => (
              <div key={category}>
                <h3 className="font-semibold text-navy-1 mb-3">{category}</h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item.link}>
                      <Link 
                        to={item.link}
                        className="block text-gray-600 hover:text-blue-4 py-1 transition"
                        onClick={() => {
                          setMobileServicesPage(false);
                          setIsOpen(false);
                        }}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
