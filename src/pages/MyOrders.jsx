import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserOrders } from '../apiService';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getUserOrders();
      setOrders(response.data.data || response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const statusColors = {
    'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'In Progress': 'bg-blue-100 text-blue-800 border-blue-200',
    'Completed': 'bg-green-100 text-green-800 border-green-200',
    'Cancelled': 'bg-red-100 text-red-800 border-red-200'
  };

  const statusIcons = {
    'Pending': '⏳',
    'In Progress': '⚙️',
    'Completed': '✅',
    'Cancelled': '❌'
  };

  const filteredOrders = filter === 'All' 
    ? orders 
    : orders.filter(order => order.status === filter);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-4 mx-auto"></div>
          <p className="mt-4 text-navy-3">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-navy-1">My Orders</h1>
          <p className="text-navy-3 mt-2">Track and manage your assignment orders</p>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex overflow-x-auto">
            {['All', 'Pending', 'In Progress', 'Completed', 'Cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition ${
                  filter === status
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {status}
                <span className="ml-2 px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">
                  {status === 'All' 
                    ? orders.length 
                    : orders.filter(o => o.status === status).length
                  }
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-xl font-bold text-navy-1 mb-2">No orders found</h3>
            <p className="text-navy-3 mb-6">You haven't placed any orders yet</p>
            <Link
              to="/order"
              className="inline-block px-6 py-3 bg-gradient-to-r from-blue-4 to-blue-5 text-white rounded-lg font-medium hover:shadow-lg transition"
            >
              Place Your First Order
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
              >
                <div className="p-6">
                  
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                        {order.serviceType.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-navy-1 text-lg">{order.topic}</h3>
                        <p className="text-sm text-navy-3">Order #{order._id.slice(-8).toUpperCase()}</p>
                      </div>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${statusColors[order.status]}`}>
                      {statusIcons[order.status]} {order.status}
                    </span>
                  </div>

                  {/* Order Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-xs text-navy-3 mb-1">Service Type</p>
                      <p className="font-semibold text-navy-1 text-sm">{order.serviceType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-navy-3 mb-1">Subject</p>
                      <p className="font-semibold text-navy-1 text-sm">{order.subject}</p>
                    </div>
                    <div>
                      <p className="text-xs text-navy-3 mb-1">Pages</p>
                      <p className="font-semibold text-navy-1 text-sm">{order.pages} pages</p>
                    </div>
                    <div>
                      <p className="text-xs text-navy-3 mb-1">Academic Level</p>
                      <p className="font-semibold text-navy-1 text-sm">{order.academicLevel}</p>
                    </div>
                  </div>

                  {/* Order Description */}
                  <div className="mb-4">
                    <p className="text-sm text-navy-2 line-clamp-2">{order.description}</p>
                  </div>

                  {/* Order Footer */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-6 text-sm">
                      <div>
                        <span className="text-navy-3">Deadline:</span>
                        <span className="ml-2 font-semibold text-navy-1">
                          {new Date(order.deadline).toLocaleDateString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-navy-3">Price:</span>
                        <span className="ml-2 font-bold text-blue-600 text-lg">
                          ${order.price}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 border-2 border-blue-400 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition text-sm">
                        View Details
                      </button>
                      {order.status === 'Completed' && (
                        <button className="px-4 py-2 bg-gradient-to-r from-blue-4 to-blue-5 text-white rounded-lg font-medium hover:shadow-lg transition text-sm">
                          Download
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* New Order Button */}
        {orders.length > 0 && (
          <div className="mt-8 text-center">
            <Link
              to="/order"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-4 to-blue-5 text-white rounded-lg font-bold hover:shadow-xl transition text-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Place New Order
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
