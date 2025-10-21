import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [user, setUser] = useState(null);

  // Check if user is logged in
  useEffect(() => {
    try {
      const userData = localStorage.getItem('user');
      if (userData && userData !== 'undefined' && userData !== 'null') {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      setUser(null);
      localStorage.removeItem('user');
    }
  }, [location]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setShowProfileMenu(false);
    navigate('/');
  };

  // Scroll to Features section on homepage
  const scrollToFeatures = (e) => {
    e.preventDefault();
    
    if (location.pathname !== '/') {
      // If not on homepage, navigate to homepage first
      navigate('/');
      setTimeout(() => {
        const featuresSection = document.getElementById('features-section');
        if (featuresSection) {
          featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // Already on homepage, just scroll
      const featuresSection = document.getElementById('features-section');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img 
              src="/logo.jpg" 
              alt="SubmitSure Logo" 
              className="h-8 sm:h-10 md:h-12 w-auto hover:opacity-80 transition"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {/* Services - Click to scroll to features */}
            <button 
              onClick={scrollToFeatures}
              className="text-gray-700 hover:text-blue-4 transition font-medium"
            >
              Services
            </button>

            <Link to="/reviews" className="text-gray-700 hover:text-blue-4 transition font-medium">
              Reviews
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-4 transition font-medium">
              About us
            </Link>
            <Link to="/resources" className="text-gray-700 hover:text-blue-4 transition font-medium">
              Resources
            </Link>
            <Link to="/blog" className="text-gray-700 hover:text-blue-4 transition font-medium">
              Blog
            </Link>
          </div>

          {/* Right Side: Order Now + Profile/Login */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            {/* Order Now Button */}
            <Link 
              to="/order"
              className="bg-gradient-to-r from-blue-4 to-blue-5 text-white px-4 lg:px-6 py-2 lg:py-2.5 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 text-sm lg:text-base"
            >
              Order Now
            </Link>

            {/* Profile Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setShowProfileMenu(true)}
              onMouseLeave={() => setShowProfileMenu(false)}
            >
              {user ? (
                // Logged in user
                <button className="flex items-center space-x-2 text-navy-1 hover:text-blue-4 transition">
                  <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-gradient-to-r from-blue-4 to-blue-5 flex items-center justify-center text-white font-semibold text-sm">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-sm lg:text-base hidden lg:block">{user.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              ) : (
                // Not logged in
                <button className="text-navy-1 hover:text-blue-4 transition">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
              )}

              {/* Profile Dropdown Menu */}
              <div 
                className={`absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-blue-4/20 transition-all duration-300 ${
                  showProfileMenu ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}
                onMouseEnter={() => setShowProfileMenu(true)}
                onMouseLeave={() => setShowProfileMenu(false)}
              >
                {user ? (
                  // Logged in menu
                  <div className="py-2">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-navy-1">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-medium rounded">
                        {user.role}
                      </span>
                    </div>

                    <Link 
                      to="/dashboard"
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-4 transition"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Dashboard
                    </Link>

                    <Link 
                      to="/orders"
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-4 transition"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      My Orders
                    </Link>

                    <Link 
                      to="/profile"
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-4 transition"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Profile Settings
                    </Link>

                    {(user.role === 'Admin' || user.role === 'Moderator') && (
                      <Link 
                        to="/admin"
                        className="block px-4 py-2.5 text-sm text-purple-600 hover:bg-purple-50 font-medium transition border-t border-gray-100"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        Admin Panel
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition border-t border-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  // Not logged in menu
                  <div className="p-4">
                    <Link 
                      to="/login"
                      className="block w-full text-center bg-gradient-to-r from-blue-4 to-blue-5 text-white px-4 py-2.5 rounded-lg font-semibold hover:shadow-lg transition mb-3"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Sign In
                    </Link>
                    <p className="text-xs text-navy-3 text-center">
                      New User?{' '}
                      <Link 
                        to="/signup" 
                        className="text-blue-4 hover:underline font-semibold"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        Start here
                      </Link>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile: Profile + Hamburger */}
          <div className="md:hidden flex items-center space-x-3">
            {user ? (
              <Link to="/dashboard" className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-4 to-blue-5 flex items-center justify-center text-white font-semibold text-sm">
                {user.name?.charAt(0).toUpperCase()}
              </Link>
            ) : (
              <Link to="/login" className="text-navy-1 hover:text-blue-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-navy-1 hover:text-blue-4"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Sidebar */}
      <div className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div 
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsOpen(false)}
        ></div>

        <div className={`absolute left-0 top-0 h-full w-72 sm:w-80 bg-white shadow-2xl transform transition-transform duration-500 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <img 
                src="/logo.jpg" 
                alt="SubmitSure Logo" 
                className="h-8 w-auto"
              />
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {user && (
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                <p className="font-semibold text-navy-1">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
                <span className="inline-block mt-2 px-2 py-1 bg-white text-blue-600 text-xs font-medium rounded">
                  {user.role}
                </span>
              </div>
            )}

            <div className="space-y-1">
              <button 
                onClick={scrollToFeatures}
                className="w-full text-left py-3 px-2 text-gray-700 font-medium hover:text-blue-4 hover:bg-blue-50 rounded transition"
              >
                Services
              </button>

              <Link 
                to="/reviews" 
                className="block py-3 px-2 text-gray-700 hover:text-blue-4 hover:bg-blue-50 rounded transition" 
                onClick={() => setIsOpen(false)}
              >
                Reviews
              </Link>
              
              <Link 
                to="/about" 
                className="block py-3 px-2 text-gray-700 hover:text-blue-4 hover:bg-blue-50 rounded transition" 
                onClick={() => setIsOpen(false)}
              >
                About us
              </Link>

              <Link 
                to="/resources" 
                className="block py-3 px-2 text-gray-700 hover:text-blue-4 hover:bg-blue-50 rounded transition" 
                onClick={() => setIsOpen(false)}
              >
                Resources
              </Link>

              <Link 
                to="/blog" 
                className="block py-3 px-2 text-gray-700 hover:text-blue-4 hover:bg-blue-50 rounded transition" 
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>

              {user && (
                <>
                  <div className="my-4 border-t border-gray-200"></div>
                  
                  <Link 
                    to="/dashboard"
                    className="block py-3 px-2 text-gray-700 hover:text-blue-4 hover:bg-blue-50 rounded transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>

                  <Link 
                    to="/orders"
                    className="block py-3 px-2 text-gray-700 hover:text-blue-4 hover:bg-blue-50 rounded transition"
                    onClick={() => setIsOpen(false)}
                  >
                    My Orders
                  </Link>

                  <Link 
                    to="/profile"
                    className="block py-3 px-2 text-gray-700 hover:text-blue-4 hover:bg-blue-50 rounded transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile Settings
                  </Link>

                  {(user.role === 'Admin' || user.role === 'Moderator') && (
                    <Link 
                      to="/admin"
                      className="block py-3 px-2 text-purple-600 hover:bg-purple-50 font-medium rounded transition"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                </>
              )}

              <Link 
                to="/order"
                className="block w-full mt-6 bg-gradient-to-r from-blue-4 to-blue-5 text-white text-center px-4 py-3 rounded-lg font-semibold hover:shadow-lg transition"
                onClick={() => setIsOpen(false)}
              >
                Order Now
              </Link>

              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full mt-3 text-red-600 border-2 border-red-600 text-center px-4 py-3 rounded-lg font-semibold hover:bg-red-50 transition"
                >
                  Logout
                </button>
              ) : (
                <Link 
                  to="/login"
                  className="block w-full mt-3 border-2 border-navy-1 text-navy-1 text-center px-4 py-3 rounded-lg font-semibold hover:bg-navy-1 hover:text-white transition"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
