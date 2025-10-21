import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPublicBlogs } from '../apiService';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await getPublicBlogs();
      // Filter only published blogs
      const publishedBlogs = response.data.filter(blog => blog.status === 'Published');
      setBlogPosts(publishedBlogs);
      
      // Extract categories with counts
      const categoryCount = {};
      publishedBlogs.forEach(blog => {
        if (blog.category) {
          categoryCount[blog.category] = (categoryCount[blog.category] || 0) + 1;
        }
      });
      
      const categoriesArray = Object.entries(categoryCount).map(([name, count]) => ({
        name,
        count
      }));
      
      setCategories(categoriesArray);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
      setLoading(false);
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail('');
  };

  // Filter blogs based on search query
  const filteredBlogs = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredPost = filteredBlogs.find(post => post.isFeatured) || filteredBlogs[0];
  const regularPosts = filteredBlogs.filter(post => post._id !== featuredPost?._id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-4 mx-auto"></div>
          <p className="mt-4 text-navy-3 text-lg">Loading blogs...</p>
        </div>
      </div>
    );
  }

  if (blogPosts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-50">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-navy-1 mb-4">No Blogs Available</h2>
          <p className="text-navy-3">Check back soon for new content!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Section - Search Bar */}
      <section className="py-8 bg-gradient-to-br from-blue-5/10 to-white border-b border-navy-3/10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search within blog"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pr-14 border-2 border-navy-3/30 rounded-xl focus:border-blue-4 focus:outline-none text-navy-2 shadow-md"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-navy-3 hover:text-blue-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Blog Slider */}
      {featuredPost && (
        <section className="py-12 bg-gradient-to-br from-white to-white-6">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-navy-1 mb-8 text-center">
              Blog & <span className="text-blue-4">Articles</span>
            </h1>
            <p className="text-center text-navy-3 mb-12">Expert insights and academic guidance</p>

            {/* Featured Post Card */}
            <Link to={`/blog/${featuredPost.slug || featuredPost._id}`} className="block">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 group max-w-5xl mx-auto">
                <img 
                  src={featuredPost.featuredImage || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600'} 
                  alt={featuredPost.title}
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  {featuredPost.category && (
                    <span className="inline-block bg-blue-4 px-4 py-1 rounded-full text-sm font-semibold mb-4">
                      {featuredPost.category}
                    </span>
                  )}
                  <h2 className="text-3xl font-bold mb-3 group-hover:text-blue-5 transition">
                    {featuredPost.title}
                  </h2>
                  <p className="text-white/90 text-sm">
                    {new Date(featuredPost.createdAt).toLocaleDateString('en-GB', { 
                      day: 'numeric', 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Blog Grid + Sidebar */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Blog Posts Grid */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-navy-1 mb-8">Latest Articles</h2>
              
              {filteredBlogs.length === 0 ? (
                <p className="text-navy-3 text-center py-12">No blogs found matching your search.</p>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {regularPosts.map((post) => (
                    <Link 
                      key={post._id}
                      to={`/blog/${post.slug || post._id}`}
                      className="group bg-white rounded-xl overflow-hidden border-2 border-navy-3/10 hover:border-blue-4 hover:shadow-xl transition-all duration-300"
                    >
                      <div className="relative overflow-hidden">
                        <img 
                          src={post.featuredImage || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600'} 
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {post.category && (
                          <span className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-xs font-semibold text-navy-1">
                            {post.category}
                          </span>
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-navy-1 mb-2 group-hover:text-blue-4 transition line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-navy-3 line-clamp-3 mb-3">
                          {post.excerpt || post.content.substring(0, 150) + '...'}
                        </p>
                        <p className="text-xs text-navy-3">
                          {new Date(post.createdAt).toLocaleDateString('en-GB', { 
                            day: 'numeric', 
                            month: 'short', 
                            year: 'numeric' 
                          })}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Categories */}
              {categories.length > 0 && (
                <div className="bg-gradient-to-br from-white-6 to-white rounded-2xl p-6 border-2 border-navy-3/10 mb-8">
                  <h3 className="text-2xl font-bold text-navy-1 mb-6">Related categories</h3>
                  <ul className="space-y-3">
                    {categories.map((cat, index) => (
                      <li key={index}>
                        <button 
                          onClick={() => setSearchQuery(cat.name)}
                          className="flex justify-between items-center text-navy-2 hover:text-blue-4 transition w-full text-left"
                        >
                          <span>{cat.name}</span>
                          <span className="text-sm text-navy-3">({cat.count})</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Subscribe Box */}
              <div className="bg-gradient-to-br from-navy-1 to-navy-2 rounded-2xl p-8 text-white shadow-xl">
                <h3 className="text-2xl font-bold mb-3">Subscribe now!</h3>
                <p className="text-sm text-white/80 mb-6">To our newsletter for latest and best offers</p>
                <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-lg text-navy-1 placeholder:text-navy-3/60 focus:outline-none focus:ring-2 focus:ring-blue-4"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="bg-blue-4 px-6 py-3 rounded-lg hover:bg-blue-5 transition font-semibold flex items-center justify-center gap-2"
                  >
                    Subscribe
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
