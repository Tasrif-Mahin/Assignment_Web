import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAdminStats, getRecentOrders } from '../../apiService';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    activeUsers: 0,
    pendingReviews: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch stats
      const statsResponse = await getAdminStats();
      setStats(statsResponse.data);

      // Fetch recent orders
      const ordersResponse = await getRecentOrders();
      setRecentOrders(ordersResponse.data.slice(0, 4)); // Get latest 4 orders

      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      setLoading(false);
    }
  };

  const statsCards = [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue?.toLocaleString() || '0'}`,
      change: '+12.5%',
      trend: 'up',
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders?.toLocaleString() || '0',
      change: '+8.2%',
      trend: 'up',
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
        </svg>
      ),
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Active Users',
      value: stats.activeUsers?.toLocaleString() || '0',
      change: '+18.7%',
      trend: 'up',
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
        </svg>
      ),
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Pending Reviews',
      value: stats.pendingReviews || '0',
      change: '-3.1%',
      trend: 'down',
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
        </svg>
      ),
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const statusColors = {
    'Completed': 'bg-green-100 text-green-700',
    'In Progress': 'bg-blue-100 text-blue-700',
    'Pending': 'bg-orange-100 text-orange-700'
  };

  const quickActions = [
    {
      title: 'Manage Orders',
      desc: 'View & update orders',
      link: '/admin/orders',
      color: 'from-blue-500 to-blue-600',
      icon: (
        <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
      )
    },
    {
      title: 'Manage Users',
      desc: 'User roles & permissions',
      link: '/admin/users',
      color: 'from-green-500 to-green-600',
      icon: (
        <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
        </svg>
      )
    },
    {
      title: 'Manage Reviews',
      desc: 'Approve & organize',
      link: '/admin/reviews',
      color: 'from-orange-500 to-orange-600',
      icon: (
        <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
        </svg>
      )
    },
    {
      title: 'Manage Blog',
      desc: 'Create & publish posts',
      link: '/admin/blog',
      color: 'from-purple-500 to-purple-600',
      icon: (
        <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
        </svg>
      )
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-4 mx-auto"></div>
          <p className="mt-4 text-navy-3">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy-1">Dashboard Overview</h1>
          <p className="text-navy-3 text-xs sm:text-sm mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <button className="px-3 sm:px-4 py-2 bg-white border-2 border-navy-3/20 rounded-lg hover:border-blue-4 transition font-semibold text-xs sm:text-sm">
            Last 30 Days
          </button>
          <button className="px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-4 to-blue-5 text-white rounded-lg hover:shadow-lg transition font-semibold text-xs sm:text-sm">
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {statsCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                  {stat.icon}
                </div>
                <div className={`flex items-center gap-1 text-[10px] sm:text-xs font-semibold ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? '↑' : '↓'} {stat.change}
                </div>
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-navy-1 mb-1">{stat.value}</h3>
              <p className="text-[10px] sm:text-sm text-navy-3">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-1 gap-4 sm:gap-6">
        
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold text-navy-1">Recent Orders</h2>
              <Link to="/admin/orders" className="text-blue-4 hover:underline font-semibold text-xs sm:text-sm">
                View All →
              </Link>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            {recentOrders.length > 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {recentOrders.map((order) => (
                  <div key={order._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition gap-2">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-navy-1 text-sm sm:text-base truncate">
                          {order._id.slice(-6).toUpperCase()}
                        </p>
                        <p className="text-xs sm:text-sm text-navy-3">{order.user?.name || 'User'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4 justify-between sm:justify-end">
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold ${statusColors[order.status] || 'bg-gray-100 text-gray-700'}`}>
                        {order.status}
                      </span>
                      {order.price && (
                        <p className="font-bold text-navy-1 text-sm sm:text-base">${order.price}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-navy-3">
                <p>No recent orders</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            to={action.link}
            className={`bg-gradient-to-br ${action.color} text-white rounded-xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300 group`}
          >
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              {action.icon}
              <span className="text-xl sm:text-2xl group-hover:scale-110 transition">→</span>
            </div>
            <h3 className="font-bold text-sm sm:text-lg">{action.title}</h3>
            <p className="text-[10px] sm:text-sm text-white/80 mt-1">{action.desc}</p>
          </Link>
        ))}
      </div>

    </div>
  );
};

export default AdminDashboard;
