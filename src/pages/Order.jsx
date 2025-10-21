import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { createOrder } from '../apiService';

const Order = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    serviceType: '',
    academicLevel: '',
    subject: '',
    topic: '',
    pages: '',
    deadline: '',
    citationStyle: '',
    description: '',
    files: []
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Pre-fill subject from URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const subjectParam = params.get('subject');
    const typeParam = params.get('type');
    
    if (subjectParam) {
      setFormData(prev => ({ ...prev, subject: subjectParam }));
    }
    if (typeParam) {
      setFormData(prev => ({ ...prev, serviceType: typeParam }));
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user types
    if (error) setError('');
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    // Validate file size (max 10MB per file)
    const validFiles = files.filter(file => file.size <= 10 * 1024 * 1024);
    
    if (validFiles.length !== files.length) {
      alert('Some files were skipped because they exceed 10MB limit');
    }
    
    setFormData({ ...formData, files: [...formData.files, ...validFiles] });
  };

  const removeFile = (index) => {
    const newFiles = formData.files.filter((_, i) => i !== index);
    setFormData({ ...formData, files: newFiles });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first to place an order');
      navigate('/login');
      return;
    }

    setLoading(true);

    try {
      // Prepare order data for backend
      const orderData = {
        serviceType: formData.serviceType,
        academicLevel: formData.academicLevel,
        subject: formData.subject,
        topic: formData.topic,
        pages: parseInt(formData.pages),
        deadline: new Date(formData.deadline),
        citationStyle: formData.citationStyle,
        description: formData.description,
        files: formData.files.map(file => file.name) // Store file names (file upload will be handled separately)
      };

      // Call backend API
      const response = await createOrder(orderData);

      // Show success message
      alert('Order placed successfully! We will contact you shortly.');

      // Reset form
      setFormData({
        serviceType: '',
        academicLevel: '',
        subject: '',
        topic: '',
        pages: '',
        deadline: '',
        citationStyle: '',
        description: '',
        files: []
      });

      // Redirect to orders page
      navigate('/orders');

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white-6 to-white py-8 sm:py-12 md:py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy-1 mb-2 sm:mb-3">Place Your Order</h1>
          <p className="text-sm sm:text-base text-navy-3 px-4">Fill in the details below and our experts will get back to you</p>
        </div>

        {/* Order Form */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl border-2 border-blue-4/10 p-5 sm:p-6 md:p-8">
          
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            
            {/* Service Type */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-navy-1 mb-2">
                Service Type <span className="text-red-500">*</span>
              </label>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-navy-3/30 rounded-lg focus:outline-none focus:border-blue-4 focus:ring-2 focus:ring-blue-5/20 transition"
                required
                disabled={loading}
              >
                <option value="">Select Service Type</option>
                <option value="Essay Writing">Essay Writing</option>
                <option value="Research Paper">Research Paper</option>
                <option value="Dissertation">Dissertation</option>
                <option value="Case Study">Case Study</option>
                <option value="Assignment Help">Assignment Help</option>
                <option value="Thesis">Thesis</option>
                <option value="Coursework">Coursework</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Academic Level & Subject (Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-navy-1 mb-2">
                  Academic Level <span className="text-red-500">*</span>
                </label>
                <select
                  name="academicLevel"
                  value={formData.academicLevel}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-navy-3/30 rounded-lg focus:outline-none focus:border-blue-4 focus:ring-2 focus:ring-blue-5/20 transition"
                  required
                  disabled={loading}
                >
                  <option value="">Select Level</option>
                  <option value="High School">High School</option>
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Master's">Master's</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-navy-1 mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Computer Science, Marketing"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-navy-3/30 rounded-lg focus:outline-none focus:border-blue-4 focus:ring-2 focus:ring-blue-5/20 transition"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Topic/Title */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-navy-1 mb-2">
                Topic/Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                placeholder="Enter your assignment topic or title"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-navy-3/30 rounded-lg focus:outline-none focus:border-blue-4 focus:ring-2 focus:ring-blue-5/20 transition"
                required
                disabled={loading}
              />
            </div>

            {/* Pages & Deadline (Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-navy-1 mb-2">
                  Number of Pages <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="pages"
                  value={formData.pages}
                  onChange={handleChange}
                  min="1"
                  placeholder="e.g. 5"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-navy-3/30 rounded-lg focus:outline-none focus:border-blue-4 focus:ring-2 focus:ring-blue-5/20 transition"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-navy-1 mb-2">
                  Deadline <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-navy-3/30 rounded-lg focus:outline-none focus:border-blue-4 focus:ring-2 focus:ring-blue-5/20 transition"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Citation Style */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-navy-1 mb-2">
                Citation Style <span className="text-red-500">*</span>
              </label>
              <select
                name="citationStyle"
                value={formData.citationStyle}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-navy-3/30 rounded-lg focus:outline-none focus:border-blue-4 focus:ring-2 focus:ring-blue-5/20 transition"
                required
                disabled={loading}
              >
                <option value="">Select Citation Style</option>
                <option value="APA">APA (7th Edition)</option>
                <option value="MLA">MLA</option>
                <option value="Chicago">Chicago</option>
                <option value="Harvard">Harvard</option>
                <option value="IEEE">IEEE</option>
                <option value="Vancouver">Vancouver</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-navy-1 mb-2">
                Additional Instructions
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Provide detailed instructions, requirements, and any specific guidelines..."
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-navy-3/30 rounded-lg focus:outline-none focus:border-blue-4 focus:ring-2 focus:ring-blue-5/20 transition resize-none"
                disabled={loading}
              ></textarea>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-navy-1 mb-2">
                Upload Files (Optional)
              </label>
              <label className="flex flex-col items-center justify-center w-full h-28 sm:h-32 border-2 border-dashed border-blue-4 rounded-lg hover:bg-blue-5/5 cursor-pointer transition">
                <div className="flex flex-col items-center justify-center pt-4 pb-5">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 mb-2 sm:mb-3 text-blue-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="mb-1 sm:mb-2 text-xs sm:text-sm text-navy-3">
                    <span className="font-semibold text-blue-4">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-[10px] sm:text-xs text-navy-3">PDF, DOC, DOCX, TXT (Max 10MB)</p>
                </div>
                <input type="file" multiple onChange={handleFileChange} className="hidden" disabled={loading} accept=".pdf,.doc,.docx,.txt" />
              </label>
              {formData.files.length > 0 && (
                <div className="mt-3 space-y-2">
                  {formData.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between gap-2 p-2 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs sm:text-sm text-navy-3 truncate">{file.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700 flex-shrink-0"
                        disabled={loading}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2 sm:pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg transition-all duration-200 ${
                  loading
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-4 to-blue-5 text-white hover:shadow-2xl hover:scale-105'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Placing Order...
                  </span>
                ) : (
                  'Place Order Now'
                )}
              </button>
              <p className="text-center text-[10px] sm:text-xs text-navy-3 mt-3">
                By placing an order, you agree to our <Link to="/terms" className="text-blue-4 hover:underline font-medium">Terms & Conditions</Link>
              </p>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default Order;
