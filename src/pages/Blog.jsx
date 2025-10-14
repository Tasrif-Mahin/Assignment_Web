import { useState } from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');

  const categories = [
    { name: 'Topics', count: 98 },
    { name: 'Essay', count: 76 },
    { name: 'Other Blogs', count: 46 },
    { name: 'Assignment', count: 26 },
    { name: 'Research', count: 19 },
    { name: 'Referencing Tool', count: 15 },
    { name: 'Dissertation', count: 10 },
    { name: 'Case Study', count: 10 },
    { name: 'Email', count: 10 },
    { name: 'Homework', count: 6 }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Why Online Classes Feel Harder – And How Expert Help Can Fix It",
      excerpt: "You sign into your online class, ready to pay attention, but then a few moments later, your phone buzzes, notifications appear, and the lecture seems a million miles away. The m...",
      category: "Assignment",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600",
      date: "15 Oct 2025"
    },
    {
      id: 2,
      title: "Affordable vs Premium Online Class Help – What's the Difference?",
      excerpt: "The demand for online class help has grown rapidly in recent years as students juggle heavy workloads, tight deadlines, and complex courses. Many learners turn to professional ser...",
      category: "Assignment",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600",
      date: "14 Oct 2025"
    },
    {
      id: 3,
      title: "100+ Military Research Paper Topics",
      excerpt: "Military Research Paper Topics A military research paper is a scholarly document that presents the results of original research or analysis on a specific topic related to the military. This type o...",
      category: "Research",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600",
      date: "13 Oct 2025"
    },
    {
      id: 4,
      title: "100+ Dance Research Paper Topics",
      excerpt: "Dance Research Paper Topics A dance research paper is a scholarly document that presents the findings of a research study on a specific topic related to dance. The purpose of a dance research pape...",
      category: "Research",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600",
      date: "12 Oct 2025"
    },
    {
      id: 5,
      title: "100+ Food Research Paper Topics",
      excerpt: "Food Research Paper Topics A food research paper is an academic document that explores topics related to food science, nutrition, culinary arts, food safety, and food systems...",
      category: "Research",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600",
      date: "11 Oct 2025"
    },
    {
      id: 6,
      title: "150 Nursing Research Topics for Students",
      excerpt: "Nursing Research Topics Finding the right nursing research topic is essential for producing meaningful academic work. Whether you're a nursing student or a professional...",
      category: "Research",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600",
      date: "10 Oct 2025"
    }
  ];

  const featuredPost = blogPosts[0];

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail('');
  };

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
      <section className="py-12 bg-gradient-to-br from-white to-white-6">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-navy-1 mb-8 text-center">
            Blog & <span className="text-blue-4">Articles</span>
          </h1>
          <p className="text-center text-navy-3 mb-12">Essay writing & more with SubmitSure</p>

          {/* Featured Post Card */}
          <Link to={`/blog/${featuredPost.id}`} className="block">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 group max-w-5xl mx-auto">
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title}
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <span className="inline-block bg-blue-4 px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  {featuredPost.category}
                </span>
                <h2 className="text-3xl font-bold mb-3 group-hover:text-blue-5 transition">
                  {featuredPost.title}
                </h2>
                <p className="text-white/90 text-sm">{featuredPost.date}</p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Blog Grid + Sidebar */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Blog Posts Grid */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-navy-1 mb-8">Assignment help</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {blogPosts.slice(1).map((post) => (
                  <Link 
                    key={post.id}
                    to={`/blog/${post.id}`}
                    className="group bg-white rounded-xl overflow-hidden border-2 border-navy-3/10 hover:border-blue-4 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-xs font-semibold text-navy-1">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-navy-1 mb-2 group-hover:text-blue-4 transition line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-navy-3 line-clamp-3 mb-3">{post.excerpt}</p>
                      <p className="text-xs text-navy-3">{post.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Categories */}
              <div className="bg-gradient-to-br from-white-6 to-white rounded-2xl p-6 border-2 border-navy-3/10 mb-8">
                <h3 className="text-2xl font-bold text-navy-1 mb-6">Related categories</h3>
                <ul className="space-y-3">
                  {categories.map((cat, index) => (
                    <li key={index}>
                      <Link 
                        to={`/blog/category/${cat.name.toLowerCase()}`}
                        className="flex justify-between items-center text-navy-2 hover:text-blue-4 transition"
                      >
                        <span>{cat.name}</span>
                        <span className="text-sm text-navy-3">({cat.count})</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Subscribe Box - Fixed */}
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
