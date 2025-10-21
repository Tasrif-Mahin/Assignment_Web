import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserOrders } from '../apiService';

const statusColors = {
  "Completed": "bg-green-100 text-green-700",
  "Pending": "bg-orange-100 text-orange-700",
  "In Progress": "bg-blue-100 text-blue-700",
  "Cancelled": "bg-red-100 text-red-700",
  "Rejected": "bg-red-100 text-red-700"
};

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    
    fetchOrders();
  }, [navigate]);

  const fetchOrders = async () => {
    try {
      const response = await getUserOrders();
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      setLoading(false);
    }
  };

  // Filter logic
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order._id?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.topic?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.subject?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white-6 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-4 mx-auto"></div>
          <p className="mt-4 text-navy-3">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white-6 to-white py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-navy-1">All Orders</h1>
            <p className="text-navy-3 text-xs sm:text-sm mt-1">Manage and track all your orders</p>
          </div>
          <Link to="/dashboard" className="text-blue-4 hover:underline font-semibold text-sm sm:text-base self-start sm:self-auto">
            ← Back to Dashboard
          </Link>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-xl shadow border-2 border-blue-4/10 p-4 sm:p-6">
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by Order ID, Topic, or Subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 border-navy-3/20 rounded-lg focus:outline-none focus:border-blue-4 transition"
              />
            </div>

            {/* Status Filter */}
            <div className="flex gap-2 flex-wrap">
              {['All', 'Pending', 'In Progress', 'Completed', 'Cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm transition ${
                    filterStatus === status
                      ? 'bg-blue-4 text-white shadow-md'
                      : 'bg-white border-2 border-navy-3/20 text-navy-2 hover:border-blue-4'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-xs sm:text-sm text-navy-3">
            Showing <span className="font-semibold text-navy-1">{filteredOrders.length}</span> of {orders.length} orders
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block bg-white rounded-xl shadow border-2 border-blue-4/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-blue-4/10 border-b-2 border-blue-4/20">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-navy-1 uppercase">Order ID</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-navy-1 uppercase">Topic</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-navy-1 uppercase">Subject</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-navy-1 uppercase">Status</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-navy-1 uppercase">Date</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-navy-1 uppercase">Deadline</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-navy-1 uppercase">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order._id} className="border-b border-blue-4/10 hover:bg-blue-4/5 transition">
                      <td className="py-3 px-4 font-mono text-sm text-navy-1">
                        {order._id.slice(-6).toUpperCase()}
                      </td>
                      <td className="py-3 px-4 text-sm text-navy-1 max-w-xs truncate">
                        {order.topic}
                      </td>
                      <td className="py-3 px-4 text-sm text-navy-3">{order.subject}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status] || 'bg-gray-100 text-gray-700'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-navy-3">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-sm text-navy-3">
                        {new Date(order.deadline).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <Link
                          to={`/order-details/${order._id}`}
                          className="text-blue-4 hover:underline font-semibold text-sm"
                        >
                          View Details →
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-12 text-center text-navy-3">
                      No orders found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile/Tablet Card View */}
        <div className="lg:hidden space-y-3 sm:space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <Link
                key={order._id}
                to={`/order-details/${order._id}`}
                className="block bg-white rounded-xl shadow border-2 border-blue-4/10 p-4 hover:border-blue-4 transition"
              >
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-navy-1 text-sm sm:text-base truncate">
                        {order.topic}
                      </p>
                      <p className="text-xs sm:text-sm text-navy-3 mt-1">
                        ID: {order._id.slice(-6).toUpperCase()}
                      </p>
                    </div>
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold flex-shrink-0 ${statusColors[order.status] || 'bg-gray-100 text-gray-700'}`}>
                      {order.status}
                    </span>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                    <div>
                      <p className="text-navy-3">Subject</p>
                      <p className="font-medium text-navy-1">{order.subject}</p>
                    </div>
                    <div>
                      <p className="text-navy-3">Pages</p>
                      <p className="font-medium text-navy-1">{order.pages}</p>
                    </div>
                    <div>
                      <p className="text-navy-3">Order Date</p>
                      <p className="font-medium text-navy-1">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-navy-3">Deadline</p>
                      <p className="font-medium text-navy-1">
                        {new Date(order.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* View Details Link */}
                  <div className="pt-2 border-t border-navy-3/10">
                    <span className="text-blue-4 font-semibold text-sm inline-flex items-center gap-1">
                      View Details
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow border-2 border-blue-4/10 p-8 text-center">
              <svg className="w-16 h-16 mx-auto text-navy-3 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <p className="text-navy-3 mb-4">No orders found matching your criteria</p>
              <Link 
                to="/order" 
                className="inline-block bg-gradient-to-r from-blue-4 to-blue-5 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg transition"
              >
                Place New Order
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Orders;
