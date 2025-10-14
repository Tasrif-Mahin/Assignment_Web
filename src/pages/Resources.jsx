import { useState } from 'react';
import { Link } from 'react-router-dom';

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const services = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      title: "Essay Help",
      description: "Get the best assistance with all essay genres – descriptive, analytical, and more."
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Homework Help",
      description: "From K12 to post doctorate – we offer aid with homework for all academic levels."
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Dissertation Help",
      description: "Our experts are here to help you at every stage of the dissertation writing process."
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      title: "Coursework Help",
      description: "Submit coursework on time with quality guidance from our subject matter experts."
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
      title: "Essay Typer",
      description: "Simplify the task with topic suggestions and data-driven content from our tool."
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Plagiarism Checker",
      description: "Check your academic papers for duplicate text using our free and advanced tool."
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      title: "Paraphrasing Tool",
      description: "Restructure sentences accurately without altering the meaning with our free tool."
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      title: "Essay Editor",
      description: "Refine your essays with expert editing help for clarity, accuracy, and impact."
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`);
  };

  return (
    <div className="bg-white">
      {/* Hero Section - Services Grid */}
      <section className="py-16 bg-gradient-to-br from-white-6 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-navy-1 mb-4">
              Get Comprehensive <span className="text-blue-4">Assignment Help</span> Services
            </h1>
            <p className="text-navy-3 text-lg">We have the best minds and resources for you!</p>
          </div>

          {/* Services Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl p-6 border-2 border-navy-3/10 hover:border-blue-4 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-navy-1 group-hover:text-blue-4 transition-colors mb-4">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-navy-1 mb-3 group-hover:text-blue-4 transition">
                  {service.title}
                </h3>
                <p className="text-sm text-navy-3 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          {/* Order Now CTA */}
          <div className="text-center">
            <Link 
              to="/order"
              className="inline-block bg-gradient-to-r from-blue-4 to-blue-5 text-white px-10 py-4 rounded-lg font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200"
            >
              Order Now
            </Link>
          </div>
        </div>
      </section>

      {/* Essay Examples Section */}
      <section className="py-16 bg-gradient-to-br from-blue-5/5 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-blue-4">Essay Examples</span> Crafted{" "}
              <span className="text-navy-1">by Our Experts</span>
            </h2>
            <p className="text-navy-3 text-lg">
              Draw inspiration about any topic from our archive of 10K+ premium essays.
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="relative bg-white rounded-2xl shadow-xl border-2 border-navy-3/20 overflow-hidden">
              <div className="flex items-center">
                <div className="pl-6 text-navy-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="I am searching for..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-5 text-navy-2 placeholder:text-navy-3/50 focus:outline-none text-lg"
                />
                <button 
                  type="submit"
                  className="bg-gradient-to-r from-blue-4 to-blue-5 text-white px-10 py-5 font-bold hover:from-blue-5 hover:to-blue-4 transition"
                >
                  Search
                </button>
              </div>
            </div>
          </form>

          {/* Featured Examples - Optional */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {[
              { title: "Sociology Essays", count: "500+ Examples", color: "from-blue-400 to-blue-600" },
              { title: "Business Essays", count: "800+ Examples", color: "from-purple-400 to-purple-600" },
              { title: "Science Essays", count: "600+ Examples", color: "from-green-400 to-green-600" }
            ].map((category, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90 group-hover:opacity-100 transition`}></div>
                <div className="relative p-8 text-white text-center">
                  <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                  <p className="text-white/90">{category.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-navy-1 mb-10 text-center">
            Academic <span className="text-blue-4">Tools & Resources</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Link 
              to="/plagiarism-checker"
              className="group bg-gradient-to-br from-white-6 to-white rounded-2xl p-8 border-2 border-navy-3/10 hover:border-blue-4 hover:shadow-xl transition-all text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-4 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-1 mb-2 group-hover:text-blue-4 transition">
                Plagiarism Checker
              </h3>
              <p className="text-sm text-navy-3">Verify originality of an essay</p>
            </Link>

            <Link 
              to="/citation-generator"
              className="group bg-gradient-to-br from-white-6 to-white rounded-2xl p-8 border-2 border-navy-3/10 hover:border-blue-4 hover:shadow-xl transition-all text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-4 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-1 mb-2 group-hover:text-blue-4 transition">
                Citation Generator
              </h3>
              <p className="text-sm text-navy-3">Cite sources with ease</p>
            </Link>

            <Link 
              to="/essay-examples"
              className="group bg-gradient-to-br from-white-6 to-white rounded-2xl p-8 border-2 border-navy-3/10 hover:border-blue-4 hover:shadow-xl transition-all text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-4 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-1 mb-2 group-hover:text-blue-4 transition">
                Essay Examples
              </h3>
              <p className="text-sm text-navy-3">Get ideas for your paper</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
