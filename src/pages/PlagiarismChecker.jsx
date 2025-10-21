import { Link } from 'react-router-dom';

const PlagiarismChecker = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-xl p-12 border-2 border-blue-100">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h1 className="text-4xl font-bold text-navy-1 mb-4">Plagiarism Checker</h1>
          <p className="text-xl text-navy-3 mb-8">Coming Soon!</p>
          
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <p className="text-navy-2">
              We're working on an advanced plagiarism detection tool to help you verify the originality of your assignments.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/order"
              className="px-8 py-3 bg-gradient-to-r from-blue-4 to-blue-5 text-white rounded-lg font-bold hover:shadow-xl transition"
            >
              Place an Order Instead
            </Link>
            <Link
              to="/"
              className="px-8 py-3 border-2 border-blue-400 text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlagiarismChecker;
