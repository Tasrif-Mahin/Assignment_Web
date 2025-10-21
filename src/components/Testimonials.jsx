import { useState, useEffect } from 'react';
import { getPublicReviews } from '../apiService';

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await getPublicReviews();
      
      // Backend sends { success: true, data: [...] }
      const reviewsData = response.data.data || response.data || [];
      
      // Ensure reviewsData is an array before filtering
      const dataArray = Array.isArray(reviewsData) ? reviewsData : [];
      
      // Show only approved and homepage featured reviews, limit to 6
      const featuredReviews = dataArray
        .filter(review => review.status === 'Approved' && review.showOnHomepage)
        .slice(0, 6);
        
      setReviews(featuredReviews);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
      setReviews([]); // Set empty array on error
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-12 sm:py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-4 mx-auto"></div>
            <p className="mt-4 text-navy-3">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return null; // Don't show section if no reviews
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-1 mb-3 sm:mb-4">
            What Our Students Say
          </h2>
          <p className="text-base sm:text-lg text-navy-3 max-w-2xl mx-auto">
            Join thousands of satisfied students who achieved academic success with our help
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((review, index) => (
            <div
              key={review._id || index}
              className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-4/20"
            >
              {/* Rating Stars */}
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Review Text */}
              <p className="text-navy-2 text-sm sm:text-base leading-relaxed mb-6 italic">
                "{review.reviewText}"
              </p>

              {/* Student Info */}
              <div className="flex items-center pt-4 border-t border-gray-200">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-4 to-blue-5 flex items-center justify-center text-white font-bold text-lg mr-4">
                  {review.studentName?.charAt(0).toUpperCase() || 'S'}
                </div>
                <div>
                  <p className="font-bold text-navy-1 text-sm sm:text-base">
                    {review.studentName}
                  </p>
                  <p className="text-xs sm:text-sm text-navy-3">
                    {review.university || 'Student'}
                  </p>
                </div>
              </div>

              {/* Service Type Badge */}
              {review.serviceType && (
                <div className="mt-4">
                  <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                    {review.serviceType}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* View All Reviews Button */}
        <div className="text-center mt-10 sm:mt-12">
          <a
            href="/reviews"
            className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-4 to-blue-5 text-white rounded-lg sm:rounded-xl font-bold hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
          >
            View All Reviews →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
