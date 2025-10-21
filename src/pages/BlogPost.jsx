import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogBySlug, getPublicBlogs } from '../apiService';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBlogPost();
  }, [id]);

  const fetchBlogPost = async () => {
    try {
      setLoading(true);
      
      // Try to fetch by slug first, then by ID
      let response;
      try {
        response = await getBlogBySlug(id);
      } catch {
        // If slug fails, try fetching all blogs and find by ID
        const allBlogs = await getPublicBlogs();
        const foundPost = allBlogs.data.find(blog => blog._id === id);
        if (foundPost) {
          response = { data: foundPost };
        } else {
          throw new Error('Blog not found');
        }
      }

      setPost(response.data);

      // Fetch related posts (same category)
      const allBlogs = await getPublicBlogs();
      const related = allBlogs.data
        .filter(blog => 
          blog._id !== response.data._id && 
          blog.category === response.data.category &&
          blog.status === 'Published'
        )
        .slice(0, 2);
      
      setRelatedPosts(related);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch blog post:', err);
      setError('Blog post not found');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-4 mx-auto"></div>
          <p className="mt-4 text-navy-3 text-lg">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-50">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-navy-1 mb-4">Blog Post Not Found</h2>
          <p className="text-navy-3 mb-6">{error}</p>
          <Link to="/blog" className="inline-block px-6 py-3 bg-blue-4 text-white rounded-lg hover:bg-blue-5 transition">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Image */}
      <div className="relative h-[400px] overflow-hidden">
        <img 
          src={post.featuredImage || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200'} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-4 pb-10">
          {post.category && (
            <span className="inline-block bg-blue-4 px-4 py-1 rounded-full text-sm font-semibold text-white mb-4">
              {post.category}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-white/90 text-sm">
            <span>{post.author || 'SubmitSure Team'}</span>
            <span>•</span>
            <span>
              {new Date(post.createdAt).toLocaleDateString('en-GB', { 
                day: 'numeric', 
                month: 'short', 
                year: 'numeric' 
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Excerpt */}
        {post.excerpt && (
          <div className="text-xl text-navy-3 mb-8 italic border-l-4 border-blue-4 pl-6">
            {post.excerpt}
          </div>
        )}

        {/* Main Content */}
        <div 
          className="prose prose-lg prose-navy max-w-none blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 pt-8 border-t border-navy-3/10">
            <h3 className="text-sm font-semibold text-navy-3 mb-3">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tools Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-12 p-8 bg-gradient-to-br from-blue-5/10 to-white-6 rounded-2xl">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-4 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-navy-1 mb-2">Verify originality of an essay</h3>
            <Link to="/plagiarism-checker" className="text-blue-4 hover:underline text-sm">
              Plagiarism checker →
            </Link>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-4 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="font-bold text-navy-1 mb-2">Get ideas for your paper</h3>
            <Link to="/essay-examples" className="text-blue-4 hover:underline text-sm">
              Essay Examples →
            </Link>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-4 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="font-bold text-navy-1 mb-2">Cite sources with ease</h3>
            <Link to="/citation-generator" className="text-blue-4 hover:underline text-sm">
              Citation generator →
            </Link>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-navy-1 mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map((related) => (
                <Link 
                  key={related._id}
                  to={`/blog/${related.slug || related._id}`}
                  className="group flex gap-4 bg-gradient-to-br from-white-6 to-white rounded-xl overflow-hidden border-2 border-navy-3/10 hover:border-blue-4 hover:shadow-xl transition-all"
                >
                  <img 
                    src={related.featuredImage || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400'} 
                    alt={related.title}
                    className="w-32 h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="p-4 flex items-center">
                    <h4 className="font-bold text-navy-1 group-hover:text-blue-4 transition line-clamp-3">
                      {related.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back to Blog */}
        <div className="mt-12 text-center">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-4 to-blue-5 text-white rounded-lg hover:shadow-xl transition font-semibold"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to All Blogs
          </Link>
        </div>
      </div>

      <style jsx>{`
        .blog-content {
          color: #2c3654;
          line-height: 1.8;
        }
        .blog-content h2 {
          font-size: 1.875rem;
          font-weight: 700;
          color: #2c3654;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .blog-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #2c3654;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .blog-content p {
          margin-bottom: 1rem;
        }
        .blog-content ul, .blog-content ol {
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .blog-content li {
          margin-bottom: 0.5rem;
        }
        .blog-content a {
          color: #3b82f6;
          text-decoration: underline;
        }
        .blog-content img {
          max-width: 100%;
          border-radius: 0.5rem;
          margin: 1.5rem 0;
        }
      `}</style>
    </div>
  );
};

export default BlogPost;
