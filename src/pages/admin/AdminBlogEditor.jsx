import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBlogPostById, createBlogPost, updateBlogPost } from '../../apiService';

const AdminBlogEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    excerpt: '',
    content: '',
    coverImage: null,
    featured: false,
    status: 'Draft'
  });

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const categories = [
    'Writing Tips',
    'Academic Tips',
    'Academic Writing',
    'Student Life',
    'Academic Integrity',
    'Study Skills',
    'Research Methods',
    'Career Advice'
  ];

  useEffect(() => {
    if (id) {
      fetchBlogPost();
    }
  }, [id]);

  const fetchBlogPost = async () => {
    setLoading(true);
    try {
      const response = await getBlogPostById(id);
      const post = response.data;
      setFormData({
        title: post.title || '',
        category: post.category || '',
        excerpt: post.excerpt || '',
        content: post.content || '',
        coverImage: null,
        featured: post.featured || false,
        status: post.status || 'Draft'
      });
      if (post.coverImageUrl) {
        setImagePreview(post.coverImageUrl);
      }
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch blog post:', error);
      alert('Failed to load blog post');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size should not exceed 10MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      setFormData({ ...formData, coverImage: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (status) => {
    if (!formData.title || !formData.category || !formData.excerpt) {
      alert('Please fill in all required fields (Title, Category, Excerpt)!');
      return;
    }

    setSaving(true);
    
    try {
      const blogData = {
        title: formData.title,
        category: formData.category,
        excerpt: formData.excerpt,
        content: formData.content,
        featured: formData.featured,
        status,
        author: 'Admin' // Or get from logged-in user
      };

      // Handle image upload if there's a new image
      if (formData.coverImage) {
        // In a real app, you'd upload the image to a server/cloud storage
        // For now, we'll just include it in the form data
        // You might need to use FormData for actual file upload
      }

      if (id) {
        // Update existing post
        await updateBlogPost(id, blogData);
        alert(`Blog post ${status === 'Published' ? 'published' : 'updated'} successfully!`);
      } else {
        // Create new post
        await createBlogPost(blogData);
        alert(`Blog post ${status === 'Published' ? 'published' : 'saved as draft'} successfully!`);
      }
      
      setSaving(false);
      navigate('/admin/blog');
    } catch (error) {
      console.error('Failed to save blog post:', error);
      alert('Failed to save blog post. Please try again.');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-4 mx-auto"></div>
          <p className="mt-4 text-navy-3">Loading blog post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Top Bar */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
          <button
            onClick={() => navigate('/admin/blog')}
            className="text-gray-600 hover:text-gray-900 flex items-center gap-2 font-medium text-sm sm:text-base"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="hidden sm:inline">Back</span>
          </button>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => handleSave('Draft')}
              disabled={saving}
              className="px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition disabled:opacity-50"
            >
              Save Draft
            </button>
            <button
              onClick={() => handleSave('Published')}
              disabled={saving}
              className="px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50"
            >
              {saving ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        
        {/* Cover Image Upload */}
        <div className="mb-8 sm:mb-12">
          {imagePreview ? (
            <div className="relative group">
              <img 
                src={imagePreview} 
                alt="Cover" 
                className="w-full h-48 sm:h-96 object-cover rounded-xl"
              />
              <button
                onClick={() => {
                  setImagePreview(null);
                  setFormData({ ...formData, coverImage: null });
                }}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition"
              >
                Remove
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-48 sm:h-96 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 cursor-pointer bg-white transition group">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 text-gray-400 group-hover:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="mb-2 text-xs sm:text-sm text-gray-500 font-medium text-center px-4">
                  <span className="font-semibold">Click to upload cover image</span>
                  <span className="hidden sm:inline"> or drag and drop</span>
                </p>
                <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
              </div>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          )}
        </div>

        {/* Title */}
        <textarea
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Post title..."
          rows="1"
          className="w-full text-3xl sm:text-5xl font-bold text-gray-900 placeholder-gray-300 resize-none focus:outline-none border-0 p-0 mb-4 sm:mb-6"
          style={{ overflow: 'hidden' }}
          onInput={(e) => {
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
          }}
        />

        {/* Excerpt */}
        <textarea
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          placeholder="Write a brief description..."
          rows="2"
          maxLength="200"
          className="w-full text-base sm:text-xl text-gray-600 placeholder-gray-300 resize-none focus:outline-none border-0 p-0 mb-6 sm:mb-8"
          style={{ overflow: 'hidden' }}
          onInput={(e) => {
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
          }}
        />

        {/* Meta Information */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b">
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-xs sm:text-sm font-medium text-gray-700">Featured Post</span>
          </label>

          <div className="sm:ml-auto text-xs sm:text-sm text-gray-500">
            {formData.excerpt.length}/200
          </div>
        </div>

        {/* Content Editor */}
        <div className="mb-8 sm:mb-12">
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Tell your story..."
            className="w-full min-h-[50vh] sm:min-h-screen text-base sm:text-lg text-gray-800 placeholder-gray-300 leading-relaxed resize-none focus:outline-none border-0 p-0 font-serif"
          />
        </div>

      </div>

      {/* Preview Section (Bottom) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-12 sm:pb-24">
        <div className="border-t pt-8 sm:pt-12">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Preview</h3>
          
          <div className="bg-white rounded-xl shadow-sm border p-6 sm:p-12">
            {imagePreview && (
              <img 
                src={imagePreview} 
                alt="Cover" 
                className="w-full h-48 sm:h-96 object-cover rounded-xl mb-6 sm:mb-8"
              />
            )}
            
            {formData.category && (
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold mb-3 sm:mb-4">
                {formData.category}
              </span>
            )}
            
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              {formData.title || 'Your title appears here'}
            </h1>
            
            <p className="text-base sm:text-xl text-gray-600 mb-6 sm:mb-8 italic border-l-4 border-blue-600 pl-4 sm:pl-6">
              {formData.excerpt || 'Your excerpt appears here'}
            </p>
            
            <div className="prose prose-sm sm:prose-lg max-w-none">
              {formData.content ? (
                formData.content.split('\n\n').map((para, i) => (
                  <p key={i} className="mb-4 sm:mb-6 text-gray-800 leading-relaxed">
                    {para.split('\n').map((line, j) => (
                      <span key={j}>
                        {line}
                        {j < para.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                ))
              ) : (
                <p className="text-gray-400 italic">Start writing to see your content...</p>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminBlogEditor;
