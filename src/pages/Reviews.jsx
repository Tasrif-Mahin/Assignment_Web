import { useState } from 'react';
import FAQ from '../components/Faq';

const Reviews = () => {
  const [filterService, setFilterService] = useState('all');
  const [filterRating, setFilterRating] = useState('all');

  const reviews = [
    {
      id: 1,
      name: "Sociology Student",
      subject: "Sociology",
      service: "Home Work",
      pages: 2,
      deadline: "4 days",
      rating: 5,
      review: "Followed directions and finished quickly. Thank you for your hard work and time.",
      date: "03 Sep 2025"
    },
    {
      id: 2,
      name: "Project Management",
      subject: "Project Management",
      service: "Assignment",
      pages: 7,
      deadline: "15 days",
      rating: 5,
      review: "The assignment demonstrates a good understanding of the topic with clear arguments and relevant examples. The structure is logical, making it easy to follow, and the use of evidence strengthens the analysis",
      date: "03 Sep 2025"
    },
    {
      id: 3,
      name: "Healthcare",
      subject: "Healthcare",
      service: "Home Work",
      pages: 8,
      deadline: "4 days",
      rating: 5,
      review: "thank you so much your work was handed in very fast that it gave me time to review and revise it.",
      date: "31 Aug 2025"
    },
    {
      id: 4,
      name: "Economics",
      subject: "Economics",
      service: "Dissertation",
      pages: 85,
      deadline: "22 days",
      rating: 4,
      review: "It was good. The writer did a good job overall—everything was so far good. there is nothing to complete.",
      date: "05 Sep 2025"
    },
    {
      id: 5,
      name: "Civil Law",
      subject: "Civil Law",
      service: "Assignment",
      pages: 12,
      deadline: "14 days",
      rating: 5,
      review: "The results exceeded expectations and reflect the dedication and professionalism you bring to your work.",
      date: "03 Sep 2025"
    },
    {
      id: 6,
      name: "Psychology",
      subject: "Psychology",
      service: "Home Work",
      pages: 6,
      deadline: "6 days",
      rating: 5,
      review: "I am happy to let you know that I received an outstanding grade for my work. You gave a good account of yourself and really appreciate your",
      date: "29 Aug 2025"
    }
  ];

  const filteredReviews = reviews.filter(review => {
    if (filterService !== 'all' && review.service !== filterService) return false;
    if (filterRating !== 'all' && review.rating !== parseInt(filterRating)) return false;
    return true;
  });

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={i < rating ? "text-orange-500" : "text-gray-300"}>
        ⭐
      </span>
    ));
  };

  return (
    <div className="bg-white">
      {/* Hero Section - Review Form + Stats */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-5/10 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left - Review Stats */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-blue-4">MyAssignment</span>{" "}
                <span className="text-navy-1">Help Review</span>
              </h1>
              <p className="text-navy-3 text-lg mb-8">
                Still in Two Minds? The Proof is in Numbers ! 38983 genuine reviews with a rating of 4.9/5.
              </p>

              <div className="mb-8">
                <p className="text-sm text-navy-3 mb-4">
                  Trusted by <span className="font-bold text-navy-1">1.5M+</span> happy customers
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-md text-center">
                    <div className="flex justify-center mb-2">⭐⭐⭐⭐⭐</div>
                    <p className="text-2xl font-bold text-navy-1">4.9</p>
                    <p className="text-xs text-navy-3">MY ASSIGNMENT HELP</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-md text-center">
                    <div className="flex justify-center mb-2 text-orange-500">⭐⭐⭐⭐⭐</div>
                    <p className="text-2xl font-bold text-navy-1">4.8</p>
                    <p className="text-xs text-navy-3">sitejabber</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-md text-center">
                    <div className="flex justify-center mb-2 text-green-500">⭐⭐⭐⭐⭐</div>
                    <p className="text-2xl font-bold text-navy-1">4.8</p>
                    <p className="text-xs text-navy-3">REVIEWS.io</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Review Form Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-blue-4/30">
              <h3 className="text-2xl font-bold text-navy-1 mb-2">
                Professional Writing Help by PhD Experts
              </h3>
              <div className="flex justify-between text-xs text-navy-3 mb-6">
                <span>✔ Guaranteed Grade or Refund</span>
                <span>✔ No AI</span>
                <span>✔ 24/7 Support</span>
              </div>

              <form className="space-y-4">
                {/* Service Type Radio */}
                <div className="flex gap-4 mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="serviceType" defaultChecked className="text-blue-4" />
                    <span className="text-sm text-navy-2">Writing</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="serviceType" className="text-blue-4" />
                    <span className="text-sm text-navy-2">Technical</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="serviceType" className="text-blue-4" />
                    <span className="text-sm text-navy-2">Online Class</span>
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="email"
                    placeholder="Email"
                    className="col-span-2 px-4 py-2.5 border-2 border-navy-3/30 rounded-lg focus:border-blue-4 focus:outline-none text-sm"
                  />
                  <select className="px-4 py-2.5 border-2 border-navy-3/30 rounded-lg focus:border-blue-4 focus:outline-none text-sm">
                    <option>BD(+880)</option>
                    <option>US(+1)</option>
                  </select>
                  <input
                    type="tel"
                    placeholder="Phone no."
                    className="px-4 py-2.5 border-2 border-navy-3/30 rounded-lg focus:border-blue-4 focus:outline-none text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Subject/Course Code"
                    className="col-span-2 px-4 py-2.5 border-2 border-navy-3/30 rounded-lg focus:border-blue-4 focus:outline-none text-sm"
                  />
                  <textarea
                    placeholder="Description (Write/Attach)"
                    rows="3"
                    className="col-span-2 px-4 py-2.5 border-2 border-navy-3/30 rounded-lg focus:border-blue-4 focus:outline-none resize-none text-sm"
                  ></textarea>
                  <input
                    type="datetime-local"
                    className="px-4 py-2.5 border-2 border-navy-3/30 rounded-lg focus:border-blue-4 focus:outline-none text-sm"
                  />
                  <div className="flex items-center gap-2">
                    <button type="button" className="px-3 py-2 bg-navy-3/20 rounded">−</button>
                    <input type="number" value="1" className="w-16 text-center border-2 border-navy-3/30 rounded py-2" />
                    <button type="button" className="px-3 py-2 bg-navy-3/20 rounded">+</button>
                    <span className="text-xs text-navy-3">250 words</span>
                  </div>
                  <button className="col-span-2 px-4 py-2 border-2 border-dashed border-blue-4 rounded-lg text-sm text-navy-2 hover:bg-blue-5/10">
                    📎 Attach file
                  </button>
                </div>

                <div className="flex items-start gap-2 text-xs text-navy-3">
                  <input type="checkbox" className="mt-1" />
                  <label>I accept the T&C, agree to receive offers & updates</label>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-4 to-blue-5 text-white py-3 rounded-lg font-bold hover:shadow-xl transition">
                  Do My Assignment
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Share Your Review Section */}
      <section className="py-12 bg-blue-5/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-navy-1 mb-3">Share Your Review</h2>
          <p className="text-navy-3 mb-6">Tell us what you thought about our services.</p>
          <button className="bg-navy-1 text-white px-8 py-3 rounded-lg font-semibold hover:bg-navy-2 transition">
            Write Review
          </button>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-1 mb-8 text-center">
            Reasons Galore to Choose Us
          </h2>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-10 justify-center">
            <select
              value={filterService}
              onChange={(e) => setFilterService(e.target.value)}
              className="px-6 py-3 border-2 border-navy-3/30 rounded-lg focus:border-blue-4 focus:outline-none"
            >
              <option value="all">All Services</option>
              <option value="Assignment">Assignment</option>
              <option value="Home Work">Home Work</option>
              <option value="Dissertation">Dissertation</option>
            </select>

            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="px-6 py-3 border-2 border-navy-3/30 rounded-lg focus:border-blue-4 focus:outline-none"
            >
              <option value="all">All Rating</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
            </select>
          </div>

          {/* Reviews Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className="bg-gradient-to-br from-white-6 to-white rounded-xl p-6 border-2 border-transparent hover:border-blue-4 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex mb-3">{renderStars(review.rating)}</div>
                <h3 className="text-lg font-bold text-navy-1 mb-2">{review.subject}</h3>
                <p className="text-xs text-navy-3 mb-3">
                  {review.service}: {review.pages} Pages, Deadline: {review.deadline}
                </p>
                <p className="text-sm text-navy-2 leading-relaxed mb-4">{review.review}</p>
                <p className="text-xs text-navy-3">{review.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section (Reused from Home) */}
      <FAQ />
    </div>
  );
};

export default Reviews;
