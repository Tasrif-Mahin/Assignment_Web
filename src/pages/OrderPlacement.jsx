import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../apiService';

const OrderPlacement = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    serviceType: '',
    subject: '',
    topic: '',
    description: '',
    deadline: '',
    pages: 1,
    academicLevel: '',
    additionalRequirements: ''
  });

  const services = [
    'Essay Writing',
    'Research Paper',
    'Dissertation',
    'Thesis',
    'Case Study',
    'Term Paper',
    'Coursework',
    'Assignment',
    'Homework Help',
    'Other'
  ];

  const academicLevels = [
    'High School',
    'Undergraduate',
    'Masters',
    'PhD'
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const calculatePrice = () => {
    const basePrice = 10;
    const levelMultiplier = {
      'High School': 1,
      'Undergraduate': 1.5,
      'Masters': 2,
      'PhD': 2.5
    };
    const multiplier = levelMultiplier[formData.academicLevel] || 1;
    return (basePrice * formData.pages * multiplier).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const orderData = {
        ...formData,
        price: calculatePrice()
      };
      
      await createOrder(orderData);
      alert('Order placed successfully! Our team will contact you soon.');
      navigate('/dashboard/my-orders');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-navy-1">Place New Order</h1>
            <p className="text-navy-3 mt-2">Fill in the details below and we'll get back to you with a quote</p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-6">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Service Type */}
            <div>
              <label className="block text-sm font-medium text-navy-1 mb-2">
                Service Type *
              </label>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-4 focus:ring-2 focus:ring-blue-4/20 transition"
              >
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>

            {/* Subject & Topic */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-navy-1 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="e.g., English, Math, Science"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-4 focus:ring-2 focus:ring-blue-4/20 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-1 mb-2">
                  Topic *
                </label>
                <input
                  type="text"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  required
                  placeholder="Assignment topic"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-4 focus:ring-2 focus:ring-blue-4/20 transition"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-navy-1 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Provide detailed instructions for your assignment..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-4 focus:ring-2 focus:ring-blue-4/20 transition"
              />
            </div>

            {/* Academic Level & Pages */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-navy-1 mb-2">
                  Academic Level *
                </label>
                <select
                  name="academicLevel"
                  value={formData.academicLevel}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-4 focus:ring-2 focus:ring-blue-4/20 transition"
                >
                  <option value="">Select level</option>
                  {academicLevels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-1 mb-2">
                  Number of Pages *
                </label>
                <input
                  type="number"
                  name="pages"
                  value={formData.pages}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-4 focus:ring-2 focus:ring-blue-4/20 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-1 mb-2">
                  Deadline *
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-4 focus:ring-2 focus:ring-blue-4/20 transition"
                />
              </div>
            </div>

            {/* Additional Requirements */}
            <div>
              <label className="block text-sm font-medium text-navy-1 mb-2">
                Additional Requirements (Optional)
              </label>
              <textarea
                name="additionalRequirements"
                value={formData.additionalRequirements}
                onChange={handleChange}
                rows="3"
                placeholder="Any special requirements, formatting guidelines, or references..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-4 focus:ring-2 focus:ring-blue-4/20 transition"
              />
            </div>

            {/* Price Estimate */}
            {formData.pages && formData.academicLevel && (
              <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-navy-3">Estimated Price</p>
                    <p className="text-3xl font-bold text-blue-600">${calculatePrice()}</p>
                    <p className="text-xs text-navy-3 mt-1">Final price may vary based on complexity</p>
                  </div>
                  <svg className="w-16 h-16 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-medium text-navy-1 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-4 to-blue-5 text-white rounded-lg font-medium hover:shadow-lg transition disabled:opacity-50"
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderPlacement;
