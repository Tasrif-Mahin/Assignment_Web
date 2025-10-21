import { Link } from 'react-router-dom';

const EssayExamples = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-xl p-12 border-2 border-purple-100">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          
          <h1 className="text-4xl font-bold text-navy-1 mb-4">Essay Examples</h1>
          <p className="text-xl text-navy-3 mb-8">Coming Soon!</p>
          
          <div className="bg-purple-50 rounded-lg p-6 mb-8">
            <p className="text-navy-2 mb-4">
              Browse through our collection of high-quality essay examples across various topics and academic levels.
            </p>
            <p className="text-sm text-navy-3">
              Get inspiration and guidance for your own writing projects!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/order"
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-bold hover:shadow-xl transition"
            >
              Place an Order Instead
            </Link>
            <Link
              to="/"
              className="px-8 py-3 border-2 border-purple-400 text-purple-600 rounded-lg font-bold hover:bg-purple-50 transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EssayExamples;
