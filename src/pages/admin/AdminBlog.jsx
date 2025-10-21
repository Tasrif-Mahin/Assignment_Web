import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllBlogPosts, updateBlogStatus, updateBlogFeatured, deleteBlogPost } from '../../apiService';

const statusColors = {
  'Published': 'bg-green-100 text-green-700',
  'Draft': 'bg-gray-100 text-gray-700'
};

const AdminBlog = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await getAllBlogPosts();
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch blog posts:', error);
      setLoading(false);
    }
  };

  const categories = [...new Set(posts.map(post => post.category))];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || post.status === filterStatus;
    const matchesCategory = filterCategory === 'All' || post.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleStatusToggle = async (postId) => {
    const post = posts.find(p => p._id === postId);
    const newStatus = post.status === 'Published' ? 'Draft' : 'Published';
    try {
      await updateBlogStatus(postId, { status: newStatus });
      setPosts(posts.map(p =>
        p._id === postId ? { ...p, status: newStatus } : p
      ));
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update post status');
    }
  };

  const handleFeaturedToggle = async (postId) => {
    const post = posts.find(p => p._id === postId);
    try {
      await updateBlogFeatured(postId, { featured: !post.featured });
      setPosts(posts.map(p =>
        p._id === postId ? { ...p, featured: !p.featured } : p
      ));
    } catch (error) {
      console.error('Failed to update featured flag:', error);
      alert('Failed to toggle featured flag');
    }
  };

  const handleDeletePost = async (postId, postTitle) => {
    if (window.confirm(`Are you sure you want to delete "${postTitle}"?`)) {
      try {
        await deleteBlogPost(postId);
        setPosts(posts.filter(post => post._id !== postId));
        alert(`Blog post "${postTitle}" has been deleted!`);
      } catch (error) {
        console.error('Failed to delete post:', error);
        alert('Failed to delete blog post');
      }
    }
  };

  const handleEditPost = (postId) => {
    navigate(`/admin/blog/edit/${postId}`);
  };

  const handleViewPost = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-4 mx-auto"></div>
          <p className="mt-4 text-navy-3">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy-1">Blog Management</h1>
          <p className="text-navy-3 text-xs sm:text-sm mt-1">Create, edit, and manage blog posts</p>
        </div>
        <button 
          onClick={() => navigate('/admin/blog/create')}
          className="bg-gradient-to-r from-blue-4 to-blue-5 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold hover:shadow-lg transition flex items-center gap-2 text-sm sm:text-base self-start sm:self-auto"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create New Post
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        <div className="bg-white rounded-xl shadow border p-4 sm:p-6">
          <p className="text-navy-3 text-xs sm:text-sm mb-1">Total Posts</p>
          <p className="text-xl sm:text-2xl font-bold text-navy-1">{posts.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow border p-4 sm:p-6">
          <p className="text-navy-3 text-xs sm:text-sm mb-1">Published</p>
          <p className="text-xl sm:text-2xl font-bold text-green-600">{posts.filter(p => p.status === 'Published').length}</p>
        </div>
        <div className="bg-white rounded-xl shadow border p-4 sm:p-6">
          <p className="text-navy-3 text-xs sm:text-sm mb-1">Drafts</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-600">{posts.filter(p => p.status === 'Draft').length}</p>
        </div>
        <div className="bg-white rounded-xl shadow border p-4 sm:p-6">
          <p className="text-navy-3 text-xs sm:text-sm mb-1">Total Views</p>
          <p className="text-xl sm:text-2xl font-bold text-blue-600">
            {posts.reduce((acc, p) => acc + (p.views || 0), 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl shadow border p-4 sm:p-6">
        <div className="flex flex-col gap-3 sm:gap-4">
          <input
            type="text"
            placeholder="Search by title or content..."
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
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 border-navy-3/20 rounded-lg focus:outline-none focus:border-blue-4"
            >
              <option value="All">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {filteredPosts.map((post) => (
          <div key={post._id} className="bg-white rounded-xl shadow border overflow-hidden hover:shadow-lg transition">
            {/* Featured Badge */}
            {post.featured && (
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold px-3 py-1 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Featured
              </div>
            )}

            {/* Post Content */}
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-blue-600 font-semibold">{post.category}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[post.status]}`}>
                  {post.status}
                </span>
              </div>
              
              <h3 className="text-base sm:text-lg font-bold text-navy-1 mb-1 sm:mb-2 line-clamp-2">{post.title}</h3>
              <p className="text-xs sm:text-sm text-navy-3 mb-2 line-clamp-2">{post.excerpt}</p>
              
              <div className="flex items-center justify-between text-xs text-navy-3 mb-3 sm:mb-4">
                <span>By {post.author}</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>

              {post.status === 'Published' && (
                <div className="flex items-center gap-2 text-xs text-navy-3 mb-3 sm:mb-4">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {post.views?.toLocaleString() || 0} views
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleViewPost(post)}
                  className="flex-1 bg-blue-4 text-white px-2 sm:px-3 py-2 rounded-lg text-xs font-semibold hover:bg-blue-5 transition"
                >
                  View
                </button>
                <button
                  onClick={() => handleStatusToggle(post._id)}
                  className={`flex-1 px-2 sm:px-3 py-2 rounded-lg text-xs font-semibold transition ${
                    post.status === 'Published' 
                      ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                      : 'bg-green-200 text-green-700 hover:bg-green-300'
                  }`}
                >
                  {post.status === 'Published' ? 'Unpublish' : 'Publish'}
                </button>
              </div>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleFeaturedToggle(post._id)}
                  className={`flex-1 px-2 sm:px-3 py-2 rounded-lg text-xs font-semibold transition ${
                    post.featured 
                      ? 'bg-yellow-200 text-yellow-700 hover:bg-yellow-300' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {post.featured ? '★ Featured' : '☆ Feature'}
                </button>
                <button 
                  onClick={() => handleEditPost(post._id)}
                  className="px-2 sm:px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold hover:bg-blue-200 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePost(post._id, post.title)}
                  className="px-2 sm:px-3 py-2 bg-red-100 text-red-700 rounded-lg text-xs font-semibold hover:bg-red-200 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Post Preview Modal */}
      {showModal && selectedPost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full p-6 sm:p-8 my-8">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-2xl font-bold text-navy-1">Post Preview</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-navy-3 hover:text-navy-1"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-xs sm:text-sm text-blue-600 font-semibold bg-blue-100 px-2 sm:px-3 py-1 rounded-full">
                  {selectedPost.category}
                </span>
                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${statusColors[selectedPost.status]}`}>
                  {selectedPost.status}
                </span>
                {selectedPost.featured && (
                  <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 sm:px-3 py-1 rounded-full">
                    ⭐ Featured
                  </span>
                )}
              </div>
              <h1 className="text-xl sm:text-3xl font-bold text-navy-1">{selectedPost.title}</h1>
              <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-navy-3 pb-2 sm:pb-4 border-b">
                <span>By {selectedPost.author}</span>
                <span>•</span>
                <span>{new Date(selectedPost.createdAt).toLocaleDateString()}</span>
                {selectedPost.status === 'Published' && (
                  <>
                    <span>•</span>
                    <span>{selectedPost.views?.toLocaleString() || 0} views</span>
                  </>
                )}
              </div>
              <div className="prose max-w-none">
                <p className="text-navy-3 text-lg leading-relaxed">{selectedPost.excerpt}</p>
                <p className="text-navy-2 mt-4">
                  [Full blog content would appear here. This is just a preview of the excerpt.]
                </p>
              </div>
            </div>
            <div className="flex gap-2 sm:gap-3 mt-5 sm:mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  setShowModal(false);
                  handleEditPost(selectedPost._id);
                }}
                className="flex-1 bg-blue-4 text-white py-2 sm:py-3 rounded-lg font-semibold hover:bg-blue-5 transition"
              >
                Edit Post
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminBlog;
