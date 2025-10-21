import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { updateUserProfile } from '../apiService';
import { uploadToCloudinary } from '../utils/cloudinary';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    university: '',
    academicLevel: '',
    major: '',
    profilePic: null
  });

  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    
    setFormData({
      fullName: parsedUser.name || '',
      email: parsedUser.email || '',
      phone: parsedUser.phone || '',
      country: parsedUser.country || '',
      university: parsedUser.university || '',
      academicLevel: parsedUser.academicLevel || '',
      major: parsedUser.major || '',
      profilePic: null
    });

    if (parsedUser.profilePicUrl) {
      setPreview(parsedUser.profilePicUrl);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
    setSuccess('');
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size should not exceed 5MB');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    setUploading(true);
    setError('');

    try {
      // Upload to Cloudinary
      const result = await uploadToCloudinary(file);
      
      // Update form data with uploaded image URL
      setFormData({ ...formData, profilePic: result.url });
      setPreview(result.url);
      
      setSuccess('Photo uploaded successfully!');
      setUploading(false);
    } catch (uploadError) {
      console.error('Upload failed:', uploadError);
      setError('Failed to upload photo. Please try again.');
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      // Prepare data for backend
      const updateData = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        university: formData.university,
        academicLevel: formData.academicLevel,
        major: formData.major,
        profilePicUrl: formData.profilePic || preview
      };

      // Call API to update profile
      const response = await updateUserProfile(updateData);

      // Update localStorage with new data
      const updatedUser = {
        ...user,
        ...response.data
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);

      setSuccess('Profile updated successfully!');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      setSaving(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile. Please try again.');
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white-6 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-4 mx-auto"></div>
          <p className="mt-4 text-navy-3">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white-6 to-white py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-navy-1">Edit Profile</h1>
            <p className="text-navy-3 text-xs sm:text-sm mt-1">Update your personal information</p>
          </div>
          <Link to="/dashboard" className="text-blue-4 hover:underline font-semibold text-sm sm:text-base self-start sm:self-auto">
            ← Back to Dashboard
          </Link>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border-l-4 border-green-500 rounded-r">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-green-700 text-xs sm:text-sm font-medium">{success}</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border-l-4 border-red-500 rounded-r">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-700 text-xs sm:text-sm font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Profile Form */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border-2 border-blue-4/20 p-5 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            
            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center pb-5 sm:pb-6 border-b border-navy-3/10">
              <div className="relative mb-3 sm:mb-4">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-blue-4/20 to-blue-5/20 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl sm:text-5xl font-bold text-blue-4">
                      {formData.fullName.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <label className={`absolute bottom-0 right-0 w-8 h-8 sm:w-10 sm:h-10 bg-blue-4 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-5 transition shadow-lg ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  {uploading ? (
                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                  ) : (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" disabled={saving || uploading} />
                </label>
              </div>
              <p className="text-[10px] sm:text-xs text-navy-3 text-center">
                {uploading ? 'Uploading to cloud...' : 'Click the camera icon to upload a photo (Max 5MB)'}
              </p>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-navy-1 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-navy-3/30 rounded-lg focus:outline-none focus:border-blue-4 focus:ring-2 focus:ring-blue-5/20 transition"
                required
                disabled={saving}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-navy-1 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-navy-3/30 rounded-lg focus:outline-none focus:border-blue-4 focus:ring-2 focus:ring-blue-5/20 transition"
                required
                disabled={saving}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-navy-1 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+880 1234-567890"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-navy-3/30 rounded-lg focus:outline-none focus:border-blue-4 focus:ring-2 focus:ring-blue-5/20 transition"
                disabled={saving}
              />
            </div>

            {/* Country & University (Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-navy-1 mb-2">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="e.g. Bangladesh"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-navy-3/30 rounded-lg focus:outline-none focus:border-blue-4 focus:ring-2 focus:ring-blue-5/20 transition"
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-navy-1 mb-2">University/Institution</label>
                <input
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                  placeholder="e.g. Dhaka University"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-navy-3/30 rounded-lg focus:outline-none focus:border-blue-4 focus:ring-2 focus:ring-blue-5/20 transition"
                  disabled={saving}
                />
              </div>
            </div>

            {/* Academic Level & Major (Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-navy-1 mb-2">Academic Level</label>
                <select
                  name="academicLevel"
                  value={formData.academicLevel}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-navy-3/30 rounded-lg focus:outline-none focus:border-blue-4 focus:ring-2 focus:ring-blue-5/20 transition"
                  disabled={saving}
                >
                  <option value="">Select Level</option>
                  <option value="High School">High School</option>
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Master's">Master's</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-navy-1 mb-2">Major/Field of Study</label>
                <input
                  type="text"
                  name="major"
                  value={formData.major}
                  onChange={handleChange}
                  placeholder="e.g. Computer Science"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-navy-3/30 rounded-lg focus:outline-none focus:border-blue-4 focus:ring-2 focus:ring-blue-5/20 transition"
                  disabled={saving}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2 sm:pt-4">
              <button
                type="submit"
                disabled={saving || uploading}
                className={`w-full py-2.5 sm:py-3 rounded-lg font-bold transition-all duration-200 text-sm sm:text-base ${
                  saving || uploading
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-4 to-blue-5 text-white hover:shadow-xl hover:scale-105'
                }`}
              >
                {saving ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving Changes...
                  </span>
                ) : uploading ? (
                  'Uploading Photo...'
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default Profile;
