import { Link } from 'react-router-dom';

const CitationGenerator = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-xl p-12 border-2 border-green-100">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          
          <h1 className="text-4xl font-bold text-navy-1 mb-4">Citation Generator</h1>
          <p className="text-xl text-navy-3 mb-8">Coming Soon!</p>
          
          <div className="bg-green-50 rounded-lg p-6 mb-8">
            <p className="text-navy-2 mb-4">
              Generate perfect citations in multiple formats including:
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <span className="px-4 py-2 bg-white rounded-full text-sm font-semibold text-green-700 border-2 border-green-200">APA</span>
              <span className="px-4 py-2 bg-white rounded-full text-sm font-semibold text-green-700 border-2 border-green-200">MLA</span>
              <span className="px-4 py-2 bg-white rounded-full text-sm font-semibold text-green-700 border-2 border-green-200">Chicago</span>
              <span className="px-4 py-2 bg-white rounded-full text-sm font-semibold text-green-700 border-2 border-green-200">Harvard</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/order"
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-bold hover:shadow-xl transition"
            >
              Place an Order Instead
            </Link>
            <Link
              to="/"
              className="px-8 py-3 border-2 border-green-400 text-green-600 rounded-lg font-bold hover:bg-green-50 transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitationGenerator;
