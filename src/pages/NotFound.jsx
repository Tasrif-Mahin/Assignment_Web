import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        
        {/* 404 Illustration */}
        <div className="mb-8">
          <svg 
            className="w-64 h-64 mx-auto text-blue-4/20" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <path 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={0.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
        </div>

        {/* 404 Number */}
        <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-4 to-blue-5 mb-4">
          404
        </h1>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-navy-1 mb-4">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-lg text-navy-3 mb-8 max-w-md mx-auto">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-3 border-2 border-blue-4 text-blue-4 rounded-lg font-semibold hover:bg-blue-4 hover:text-white transition"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-gradient-to-r from-blue-4 to-blue-5 text-white rounded-lg font-semibold hover:shadow-lg transition"
          >
            Back to Home
          </button>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-navy-3 mb-4">Quick Links</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={() => navigate('/services')}
              className="text-sm text-blue-4 hover:underline"
            >
              Our Services
            </button>
            <span className="text-navy-3">•</span>
            <button 
              onClick={() => navigate('/order')}
              className="text-sm text-blue-4 hover:underline"
            >
              Place Order
            </button>
            <span className="text-navy-3">•</span>
            <button 
              onClick={() => navigate('/blog')}
              className="text-sm text-blue-4 hover:underline"
            >
              Blog
            </button>
            <span className="text-navy-3">•</span>
            <button 
              onClick={() => navigate('/about')}
              className="text-sm text-blue-4 hover:underline"
            >
              About Us
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NotFound;
