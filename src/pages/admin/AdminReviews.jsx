const AdminReviews = () => {
  const reviews = [
    { id: 1, customer: 'John Doe', rating: 5, comment: 'Excellent work!', status: 'Approved', date: '14 Oct 2025' },
    { id: 2, customer: 'Jane Smith', rating: 4, comment: 'Good service', status: 'Pending', date: '13 Oct 2025' },
    { id: 3, customer: 'Mike Johnson', rating: 3, comment: 'Average experience', status: 'Rejected', date: '12 Oct 2025' }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-navy-1">Reviews Management</h1>

      <div className="grid gap-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-xl shadow p-6 border-2 border-blue-4/10">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-navy-1">{review.customer}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-yellow-500">{'⭐'.repeat(review.rating)}</span>
                  <span className="text-sm text-navy-3">{review.date}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                review.status === 'Approved' ? 'bg-green-100 text-green-700' :
                review.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                'bg-red-100 text-red-700'
              }`}>
                {review.status}
              </span>
            </div>
            <p className="text-navy-3 mb-4">{review.comment}</p>
            <div className="flex gap-2">
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm">Approve</button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm">Reject</button>
              <button className="bg-gray-300 text-navy-1 px-4 py-2 rounded-lg text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminReviews;
