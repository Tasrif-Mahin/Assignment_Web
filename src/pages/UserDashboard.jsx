import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUserOrders } from '../apiService';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    inProgress: 0,
    completed: 0,
    totalSpent: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    
    // Fetch user orders
    fetchOrders();
  }, [navigate]);

  const fetchOrders = async () => {
    try {
      const response = await getUserOrders();
      const orderData = response.data;
      
      setOrders(orderData);
      
      // Calculate stats
      const total = orderData.length;
      const inProgress = orderData.filter(o => o.status === 'In Progress' || o.status === 'Pending').length;
      const completed = orderData.filter(o => o.status === 'Completed').length;
      const totalSpent = orderData.reduce((sum, o) => sum + (o.price || 0), 0);
      
      setStats({
        totalOrders: total,
        inProgress,
        completed,
        totalSpent
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      setLoading(false);
    }
  };

  const statusColors = {
    "Completed": "bg-green-100 text-green-700",
    "Pending": "bg-orange-100 text-orange-700",
    "In Progress": "bg-blue-100 text-blue-700",
    "Rejected": "bg-red-100 text-red-700"
  };

  const statCards = [
    { 
      label: "Total Orders", 
      value: stats.totalOrders, 
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
      ) 
    },
    { 
      label: "In Progress", 
      value: stats.inProgress, 
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ) 
    },
    { 
      label: "Completed", 
      value: stats.completed, 
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ) 
    },
    { 
      label: "Total Spent", 
      value: `$${stats.totalSpent.toFixed(2)}`, 
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ) 
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white-6 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-4 mx-auto"></div>
          <p className="mt-4 text-navy-3">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white-6 to-white py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Welcome Header */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-blue-4/10 p-4 sm:p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-4 to-blue-5 rounded-full flex items-center justify-center text-white text-lg sm:text-2xl font-bold flex-shrink-0">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-navy-1">Welcome back, {user?.name}!</h1>
                <p className="text-navy-3 text-xs sm:text-sm">{user?.email}</p>
              </div>
            </div>
            <Link 
              to="/profile" 
              className="bg-gradient-to-r from-blue-4 to-blue-5 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold hover:shadow-lg transition text-sm sm:text-base"
            >
              Edit Profile
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {statCards.map((stat, i) => (
            <div key={i} className="bg-white rounded-xl shadow border-2 border-blue-4/10 p-4 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-4/10 flex items-center justify-center text-blue-4 flex-shrink-0">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-navy-1">{stat.value}</p>
                  <p className="text-[10px] sm:text-xs text-navy-3">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          <Link to="/order" className="bg-white rounded-xl shadow border-2 border-blue-4/10 p-5 sm:p-6 hover:border-blue-4 transition group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-blue-4 to-blue-5 flex items-center justify-center text-white mb-3 sm:mb-4 group-hover:scale-110 transition">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
              </svg>
            </div>
            <h3 className="font-bold text-navy-1 mb-1 sm:mb-2 text-sm sm:text-base">Place New Order</h3>
            <p className="text-[10px] sm:text-xs text-navy-3">Get expert help with your assignment</p>
          </Link>
          
          <Link to="/orders" className="bg-white rounded-xl shadow border-2 border-blue-4/10 p-5 sm:p-6 hover:border-blue-4 transition group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-blue-4 to-blue-5 flex items-center justify-center text-white mb-3 sm:mb-4 group-hover:scale-110 transition">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </div>
            <h3 className="font-bold text-navy-1 mb-1 sm:mb-2 text-sm sm:text-base">All Orders</h3>
            <p className="text-[10px] sm:text-xs text-navy-3">View your complete order history</p>
          </Link>

          <a 
            href="https://wa.me/8801727113023?text=Hello! I need support." 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white rounded-xl shadow border-2 border-blue-4/10 p-5 sm:p-6 hover:border-blue-4 transition group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-blue-4 to-blue-5 flex items-center justify-center text-white mb-3 sm:mb-4 group-hover:scale-110 transition">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <h3 className="font-bold text-navy-1 mb-1 sm:mb-2 text-sm sm:text-base">Support</h3>
            <p className="text-[10px] sm:text-xs text-navy-3">Get help from our support team</p>
          </a>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow border-2 border-blue-4/10 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-navy-1">Recent Orders</h2>
            <Link to="/orders" className="text-blue-4 hover:underline font-semibold text-xs sm:text-sm">
              View All →
            </Link>
          </div>
          
          {orders.length === 0 ? (
            <div className="text-center py-8">
              <svg className="w-16 h-16 mx-auto text-navy-3 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <p className="text-navy-3 mb-4">No orders yet</p>
              <Link 
                to="/order" 
                className="inline-block bg-gradient-to-r from-blue-4 to-blue-5 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg transition"
              >
                Place Your First Order
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.slice(0, 3).map((order) => (
                <Link 
                  key={order._id} 
                  to={`/order-details/${order._id}`}
                  className="block p-3 sm:p-4 border-2 border-navy-3/10 rounded-lg hover:border-blue-4 hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-navy-1 text-sm sm:text-base truncate">{order.topic}</p>
                      <p className="text-[10px] sm:text-xs text-navy-3 mt-1">
                        {order.subject} • {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold ${statusColors[order.status] || 'bg-gray-100 text-gray-700'}`}>
                        {order.status}
                      </span>
                      {order.price && (
                        <span className="font-bold text-navy-1 text-sm sm:text-base">${order.price}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;
