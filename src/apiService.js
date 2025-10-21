import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // আপনার backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const login = (credentials) => api.post('/auth/login', credentials);
export const signup = (userData) => api.post('/auth/signup', userData);
export const logout = () => api.post('/auth/logout');
export const googleLogin = (token) => api.post('/auth/google', { token });

// User Orders APIs
export const getUserOrders = () => api.get('/orders/user');
export const getOrderById = (id) => api.get(`/orders/${id}`);
export const createOrder = (orderData) => api.post('/orders', orderData);

// User Profile
export const updateUserProfile = (data) => api.patch('/users/profile', data);

// Admin Stats
export const getAdminStats = () => api.get('/admin/stats');
export const getRecentOrders = () => api.get('/orders/recent');

// Admin Orders
export const getAllOrders = () => api.get('/admin/orders');
export const updateOrderStatus = (id, data) => api.patch(`/orders/${id}/status`, data);
export const deleteOrder = (id) => api.delete(`/orders/${id}`);

// Admin Users
export const getAllUsers = () => api.get('/admin/users');
export const updateUserRole = (id, data) => api.patch(`/users/${id}/role`, data);
export const toggleUserStatus = (id, data) => api.patch(`/users/${id}/status`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);
export const createUser = (data) => api.post('/admin/users', data);

// Admin Reviews
export const getAllReviews = () => api.get('/admin/reviews');
export const updateReviewStatus = (id, data) => api.patch(`/reviews/${id}/status`, data);
export const deleteReview = (id) => api.delete(`/reviews/${id}`);
export const reorderReviews = (data) => api.post('/reviews/reorder', data);

// Admin Blog
export const getAllBlogPosts = () => api.get('/admin/blogs');
export const getBlogPostById = (id) => api.get(`/blogs/${id}`);
export const createBlogPost = (data) => api.post('/admin/blogs', data);
export const updateBlogPost = (id, data) => api.patch(`/blogs/${id}`, data);
export const updateBlogStatus = (id, data) => api.patch(`/blogs/${id}/status`, data);
export const updateBlogFeatured = (id, data) => api.patch(`/blogs/${id}/featured`, data);
export const deleteBlogPost = (id) => api.delete(`/blogs/${id}`);

// Public APIs
export const getPublicReviews = () => api.get('/reviews/approved');
export const getPublicBlogs = () => api.get('/blogs/published');
export const getBlogBySlug = (slug) => api.get(`/blogs/slug/${slug}`);
export const getPublicStats = () => api.get('/stats/public');

export default api;
