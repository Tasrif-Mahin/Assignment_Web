import { useState, useEffect } from 'react';
import { getAllReviews, updateReviewStatus, deleteReview, reorderReviews } from '../../apiService';

const statusColors = {
  'Approved': 'bg-green-100 text-green-700',
  'Pending': 'bg-orange-100 text-orange-700',
  'Rejected': 'bg-red-100 text-red-700'
};

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterRating, setFilterRating] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await getAllReviews();
      setReviews(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
      setLoading(false);
    }
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      review.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      review.comment?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || review.status === filterStatus;
    const matchesRating = filterRating === 'All' || review.rating === parseInt(filterRating);
    return matchesSearch && matchesStatus && matchesRating;
  }).sort((a, b) => (a.order || 0) - (b.order || 0));

  const handleStatusChange = async (reviewId, newStatus) => {
    try {
      await updateReviewStatus(reviewId, { status: newStatus });
      setReviews(reviews.map(review => 
        review._id === reviewId ? { ...review, status: newStatus } : review
      ));
      alert(`Review status changed to: ${newStatus}`);
    } catch (error) {
      console.error('Failed to update review status:', error);
      alert('Failed to update review status');
    }
  };

  const handleDeleteReview = async (reviewId, authorName) => {
    if (window.confirm(`Are you sure you want to delete review by "${authorName}"?`)) {
      try {
        await deleteReview(reviewId);
        setReviews(reviews.filter(review => review._id !== reviewId));
        alert(`Review by "${authorName}" has been deleted!`);
      } catch (error) {
        console.error('Failed to delete review:', error);
        alert('Failed to delete review');
      }
    }
  };

  const handleReorder = async (reviewId, direction) => {
    const index = filteredReviews.findIndex(r => r._id === reviewId);
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === filteredReviews.length - 1)
    ) return;

    const newReviews = [...filteredReviews];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap order values
    const tempOrder = newReviews[index].order || index;
    newReviews[index].order = newReviews[targetIndex].order || targetIndex;
    newReviews[targetIndex].order = tempOrder;

    try {
      await reorderReviews({
        reviewId1: newReviews[index]._id,
        order1: newReviews[index].order,
        reviewId2: newReviews[targetIndex]._id,
        order2: newReviews[targetIndex].order
      });
      
      setReviews(reviews.map(r => {
        if (r._id === newReviews[index]._id) return newReviews[index];
        if (r._id === newReviews[targetIndex]._id) return newReviews[targetIndex];
        return r;
      }));
    } catch (error) {
      console.error('Failed to reorder reviews:', error);
      alert('Failed to reorder reviews');
    }
  };

  const handleViewReview = (review) => {
    setSelectedReview(review);
    setShowModal(true);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-3 h-3 sm:w-4 sm:h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-4 mx-auto"></div>
          <p className="mt-4 text-navy-3">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy-1">Reviews Management</h1>
          <p className="text-navy-3 text-xs sm:text-sm mt-1">Manage customer reviews and testimonials</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        <div className="bg-white rounded-xl shadow border p-4 sm:p-6">
          <p className="text-navy-3 text-xs sm:text-sm mb-1">Total Reviews</p>
          <p className="text-xl sm:text-2xl font-bold text-navy-1">{reviews.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow border p-4 sm:p-6">
          <p className="text-navy-3 text-xs sm:text-sm mb-1">Approved</p>
          <p className="text-xl sm:text-2xl font-bold text-green-600">
            {reviews.filter(r => r.status === 'Approved').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow border p-4 sm:p-6">
          <p className="text-navy-3 text-xs sm:text-sm mb-1">Pending</p>
          <p className="text-xl sm:text-2xl font-bold text-orange-600">
            {reviews.filter(r => r.status === 'Pending').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow border p-4 sm:p-6">
          <p className="text-navy-3 text-xs sm:text-sm mb-1">Average Rating</p>
          <p className="text-xl sm:text-2xl font-bold text-yellow-600">
            {reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : '0.0'} ⭐
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl shadow border p-4 sm:p-6">
        <div className="flex flex-col gap-3 sm:gap-4">
          <input
            type="text"
            placeholder="Search by author or review content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 border-navy-3/20 rounded-lg focus:outline-none focus:border-blue-4"
          />
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 border-navy-3/20 rounded-lg focus:outline-none focus:border-blue-4"
            >
              <option value="All">All Status</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 border-navy-3/20 rounded-lg focus:outline-none focus:border-blue-4"
            >
              <option value="All">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-xl shadow border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-semibold text-navy-1 uppercase">Order</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-navy-1 uppercase">Author</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-navy-1 uppercase">Rating</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-navy-1 uppercase">Review</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-navy-1 uppercase">Status</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-navy-1 uppercase">Date</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-navy-1 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReviews.map((review, index) => (
                <tr key={review._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex gap-1 items-center">
                      <button
                        onClick={() => handleReorder(review._id, 'up')}
                        disabled={index === 0}
                        className="text-blue-4 hover:text-blue-5 disabled:text-gray-300 disabled:cursor-not-allowed"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <span className="font-mono text-sm font-semibold">{review.order || index + 1}</span>
                      <button
                        onClick={() => handleReorder(review._id, 'down')}
                        disabled={index === filteredReviews.length - 1}
                        className="text-blue-4 hover:text-blue-5 disabled:text-gray-300 disabled:cursor-not-allowed"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-semibold text-sm text-navy-1">{review.user?.name || 'Anonymous'}</p>
                      <p className="text-xs text-navy-3">{review.user?.email || 'N/A'}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">{renderStars(review.rating)}</td>
                  <td className="py-3 px-4 max-w-xs">
                    <p className="text-sm text-navy-3 truncate">{review.comment}</p>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={review.status}
                      onChange={(e) => handleStatusChange(review._id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer ${statusColors[review.status]}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewReview(review)}
                        className="text-blue-4 hover:underline text-sm font-semibold"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDeleteReview(review._id, review.user?.name || 'Anonymous')}
                        className="text-red-500 hover:underline text-sm font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="lg:hidden space-y-3 sm:space-y-4">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review, index) => (
            <div key={review._id} className="bg-white rounded-xl shadow border p-4">
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="font-semibold text-navy-1 text-sm">{review.user?.name || 'Anonymous'}</p>
                    <p className="text-xs text-navy-3">{review.user?.email || 'N/A'}</p>
                    <div className="mt-1">{renderStars(review.rating)}</div>
                  </div>
                  <select
                    value={review.status}
                    onChange={(e) => handleStatusChange(review._id, e.target.value)}
                    className={`px-2 py-1 rounded-full text-xs font-semibold border-0 ${statusColors[review.status]}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                {/* Review */}
                <p className="text-sm text-navy-3 line-clamp-2">{review.comment}</p>

                {/* Order & Date */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleReorder(review._id, 'up')}
                      disabled={index === 0}
                      className="text-blue-4 disabled:text-gray-300"
                    >
                      ↑
                    </button>
                    <span className="font-mono font-semibold">#{review.order || index + 1}</span>
                    <button
                      onClick={() => handleReorder(review._id, 'down')}
                      disabled={index === filteredReviews.length - 1}
                      className="text-blue-4 disabled:text-gray-300"
                    >
                      ↓
                    </button>
                  </div>
                  <span className="text-navy-3">{new Date(review.createdAt).toLocaleDateString()}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t border-gray-100">
                  <button
                    onClick={() => handleViewReview(review)}
                    className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-100 transition"
                  >
                    View Full
                  </button>
                  <button
                    onClick={() => handleDeleteReview(review._id, review.user?.name || 'Anonymous')}
                    className="px-3 py-2 bg-red-50 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-100 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow border p-8 text-center">
            <p className="text-navy-3">No reviews found</p>
          </div>
        )}
      </div>

      {/* Review Details Modal */}
      {showModal && selectedReview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-5 sm:p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-navy-1">Review Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-navy-3 hover:text-navy-1"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div className="pb-3 sm:pb-4 border-b">
                <p className="font-bold text-base sm:text-lg text-navy-1">{selectedReview.user?.name || 'Anonymous'}</p>
                <p className="text-xs sm:text-sm text-navy-3">{selectedReview.user?.email || 'N/A'}</p>
                <div className="mt-2">{renderStars(selectedReview.rating)}</div>
              </div>
              <div>
                <p className="text-xs text-navy-3 mb-1">Review</p>
                <p className="text-sm text-navy-1">{selectedReview.comment}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <p className="text-xs text-navy-3 mb-1">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColors[selectedReview.status]}`}>
                    {selectedReview.status}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-navy-3 mb-1">Date</p>
                  <p className="font-semibold text-sm text-navy-1">
                    {new Date(selectedReview.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-4 sm:mt-6 bg-blue-4 text-white py-2 sm:py-2.5 rounded-lg font-semibold hover:bg-blue-5 transition text-sm sm:text-base"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminReviews;
