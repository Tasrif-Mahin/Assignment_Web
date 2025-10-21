import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../apiService';

const AdminAddUser = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'User',
    status: 'Active',
    university: '',
    academicLevel: ''
  });

  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSaving(true);

    try {
      const userData = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: formData.role,
        status: formData.status,
        university: formData.university,
        academicLevel: formData.academicLevel
      };

      await createUser(userData);

      alert('User created successfully!');
      navigate('/admin/users');
    } catch (error) {
      console.error('Failed to create user:', error);
      
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert('Failed to create user. Please try again.');
      }
      
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy-1">Add New User</h1>
          <p className="text-navy-3 text-xs sm:text-sm mt-1">Create a new user account</p>
        </div>
        <button
          onClick={() => navigate('/admin/users')}
          className="text-blue-4 hover:underline font-semibold flex items-center gap-2 text-sm sm:text-base self-start sm:self-auto"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Users
        </button>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-lg border p-5 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          
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
              placeholder="Enter full name"
              disabled={saving}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 ${
                errors.fullName ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:border-blue-4 transition`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Email & Phone (Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-navy-1 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="user@example.com"
                disabled={saving}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:border-blue-4 transition`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>
              )}
            </div>

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
                disabled={saving}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-4 transition"
              />
            </div>
          </div>

          {/* Password & Confirm Password (Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-navy-1 mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimum 6 characters"
                disabled={saving}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:border-blue-4 transition`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-navy-1 mb-2">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                disabled={saving}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:border-blue-4 transition`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          {/* Role & Status (Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-navy-1 mb-2">
                Role <span className="text-red-500">*</span>
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                disabled={saving}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-4 transition"
              >
                <option value="User">User</option>
                <option value="Writer">Writer</option>
                <option value="Moderator">Moderator</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-navy-1 mb-2">
                Account Status <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                disabled={saving}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-4 transition"
              >
                <option value="Active">Active</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>
          </div>

          {/* University & Academic Level (Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-navy-1 mb-2">
                University/Institution
              </label>
              <input
                type="text"
                name="university"
                value={formData.university}
                onChange={handleChange}
                placeholder="e.g. Dhaka University"
                disabled={saving}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-4 transition"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-navy-1 mb-2">
                Academic Level
              </label>
              <select
                name="academicLevel"
                value={formData.academicLevel}
                onChange={handleChange}
                disabled={saving}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-4 transition"
              >
                <option value="">Select Level</option>
                <option value="High School">High School</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Master's">Master's</option>
                <option value="PhD">PhD</option>
              </select>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 border-t">
            <button
              type="button"
              onClick={() => navigate('/admin/users')}
              disabled={saving}
              className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition text-sm sm:text-base disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className={`flex-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition text-sm sm:text-base ${
                saving
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-4 to-blue-5 text-white hover:shadow-lg'
              }`}
            >
              {saving ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating User...
                </span>
              ) : (
                'Create User'
              )}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};

export default AdminAddUser;
