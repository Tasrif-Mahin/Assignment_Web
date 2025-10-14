import { useParams, Link } from 'react-router-dom';

const BlogPost = () => {
  const { id } = useParams();

  // Dummy blog post data
  const post = {
    title: "Why Online Classes Feel Harder – And How Expert Help Can Fix It",
    category: "Assignment",
    date: "15 Oct 2025",
    author: "SubmitSure Team",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200",
    content: `
      <p>You sign into your online class, ready to pay attention, but then a few moments later, your phone buzzes, notifications appear, and the lecture seems a million miles away.</p>
      
      <p>The modern student faces unprecedented challenges with online learning. While technology has made education more accessible, it has also introduced new obstacles that traditional classroom settings never had.</p>

      <h2>The Psychology Behind Online Learning Difficulties</h2>
      <p>Research shows that our brains process information differently when we're learning through a screen compared to in-person instruction. The lack of physical presence, reduced social interaction, and increased distractions all contribute to making online classes feel harder.</p>

      <h2>Common Challenges Students Face</h2>
      <ul>
        <li>Lack of face-to-face interaction with instructors and peers</li>
        <li>Technical difficulties and connectivity issues</li>
        <li>Difficulty maintaining focus and motivation</li>
        <li>Time management struggles with flexible schedules</li>
        <li>Feeling isolated and disconnected from the learning community</li>
      </ul>

      <h2>How Expert Help Can Make a Difference</h2>
      <p>Professional academic assistance isn't about taking shortcuts—it's about getting the support you need to succeed in a challenging learning environment. Expert tutors and writing services can provide:</p>

      <ul>
        <li>Personalized guidance tailored to your learning style</li>
        <li>Help understanding complex concepts at your own pace</li>
        <li>Support with assignments and research papers</li>
        <li>Feedback and editing to improve your work</li>
        <li>Time management strategies to balance multiple responsibilities</li>
      </ul>

      <p>At SubmitSure, we understand the unique challenges of online learning. Our team of PhD experts is here to help you navigate your academic journey with confidence.</p>
    `
  };

  const relatedPosts = [
    {
      id: 2,
      title: "Affordable vs Premium Online Class Help",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400"
    },
    {
      id: 3,
      title: "100+ Military Research Paper Topics",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400"
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Image */}
      <div className="relative h-[400px] overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-4 pb-10">
          <span className="inline-block bg-blue-4 px-4 py-1 rounded-full text-sm font-semibold text-white mb-4">
            {post.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-white/90 text-sm">
            <span>{post.author}</span>
            <span>•</span>
            <span>{post.date}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div 
          className="prose prose-lg prose-navy max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
          style={{
            color: '#2c3654',
            lineHeight: '1.8'
          }}
        />

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
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-navy-1 mb-6">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedPosts.map((related) => (
              <Link 
                key={related.id}
                to={`/blog/${related.id}`}
                className="group flex gap-4 bg-gradient-to-br from-white-6 to-white rounded-xl overflow-hidden border-2 border-navy-3/10 hover:border-blue-4 hover:shadow-xl transition-all"
              >
                <img 
                  src={related.image} 
                  alt={related.title}
                  className="w-32 h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="p-4 flex items-center">
                  <h4 className="font-bold text-navy-1 group-hover:text-blue-4 transition">
                    {related.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
