import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllOrders, updateOrderStatus, deleteOrder } from '../../apiService';

const statusColors = {
  "Completed": "bg-green-100 text-green-700",
  "Pending": "bg-orange-100 text-orange-700",
  "In Progress": "bg-blue-100 text-blue-700",
  "Cancelled": "bg-red-100 text-red-700",
  "Rejected": "bg-red-100 text-red-700"
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedOrders, setSelectedOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getAllOrders();
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order._id?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.topic?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSelectOrder = (orderId) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, { status: newStatus });
      
      // Update local state
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
      
      alert(`Order status updated to: ${newStatus}`);
    } catch (error) {
      console.error('Failed to update order status:', error);
      alert('Failed to update order status');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    
    try {
      await deleteOrder(orderId);
      setOrders(orders.filter(order => order._id !== orderId));
      alert('Order deleted successfully');
    } catch (error) {
      console.error('Failed to delete order:', error);
      alert('Failed to delete order');
    }
  };

  const exportToCSV = () => {
    const csv = [
      ['Order ID', 'Customer', 'Email', 'Title', 'Status', 'Deadline', 'Amount'],
      ...filteredOrders.map(order => [
        order._id.slice(-6).toUpperCase(),
        order.user?.name || 'N/A',
        order.user?.email || 'N/A',
        order.topic,
        order.status,
        new Date(order.deadline).toLocaleDateString(),
        order.price ? `$${order.price}` : 'N/A'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-4 mx-auto"></div>
          <p className="mt-4 text-navy-3">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy-1">Orders Management</h1>
          <p className="text-navy-3 text-xs sm:text-sm mt-1">View and manage all customer orders</p>
        </div>
        <button 
          onClick={exportToCSV}
          className="bg-blue-4 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold hover:bg-blue-5 transition text-sm sm:text-base self-start sm:self-auto"
        >
          Export CSV
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        <div className="bg-white rounded-xl shadow border p-4 sm:p-6">
          <p className="text-navy-3 text-xs sm:text-sm mb-1">Total Orders</p>
          <p className="text-xl sm:text-2xl font-bold text-navy-1">{orders.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow border p-4 sm:p-6">
          <p className="text-navy-3 text-xs sm:text-sm mb-1">Pending</p>
          <p className="text-xl sm:text-2xl font-bold text-orange-600">
            {orders.filter(o => o.status === 'Pending').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow border p-4 sm:p-6">
          <p className="text-navy-3 text-xs sm:text-sm mb-1">In Progress</p>
          <p className="text-xl sm:text-2xl font-bold text-blue-600">
            {orders.filter(o => o.status === 'In Progress').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow border p-4 sm:p-6">
          <p className="text-navy-3 text-xs sm:text-sm mb-1">Completed</p>
          <p className="text-xl sm:text-2xl font-bold text-green-600">
            {orders.filter(o => o.status === 'Completed').length}
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl shadow border p-4 sm:p-6">
        <div className="flex flex-col gap-3 sm:gap-4">
          <input
            type="text"
            placeholder="Search by Order ID, Customer, Email, or Title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 border-navy-3/20 rounded-lg focus:outline-none focus:border-blue-4"
          />
          <div className="flex gap-2 flex-wrap">
            {['All', 'Pending', 'In Progress', 'Completed', 'Cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm transition ${
                  filterStatus === status
                    ? 'bg-blue-4 text-white'
                    : 'bg-gray-100 text-navy-2 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
          <div className="text-xs sm:text-sm text-navy-3">
            Showing <span className="font-semibold text-navy-1">{filteredOrders.length}</span> of {orders.length} orders
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-xl shadow border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="py-3 px-4 text-left">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-navy-1 uppercase">Order ID</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-navy-1 uppercase">Customer</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-navy-1 uppercase">Title</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-navy-1 uppercase">Status</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-navy-1 uppercase">Deadline</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-navy-1 uppercase">Amount</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-navy-1 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <input 
                      type="checkbox" 
                      className="rounded"
                      checked={selectedOrders.includes(order._id)}
                      onChange={() => handleSelectOrder(order._id)}
                    />
                  </td>
                  <td className="py-3 px-4 font-mono text-sm">
                    {order._id.slice(-6).toUpperCase()}
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-semibold text-sm">{order.user?.name || 'N/A'}</p>
                      <p className="text-xs text-navy-3">{order.user?.email || 'N/A'}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm max-w-xs truncate">{order.topic}</td>
                  <td className="py-3 px-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer ${statusColors[order.status]}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    {new Date(order.deadline).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 font-semibold text-sm">
                    {order.price ? `$${order.price}` : 'N/A'}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Link 
                        to={`/admin/order/${order._id}`}
                        className="text-blue-4 hover:underline text-sm font-semibold"
                      >
                        View
                      </Link>
                      <button 
                        onClick={() => handleDeleteOrder(order._id)}
                        className="text-red-500 hover:underline text-sm font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="lg:hidden space-y-3 sm:space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl shadow border p-4">
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="font-mono text-sm font-semibold text-navy-1">
                      {order._id.slice(-6).toUpperCase()}
                    </p>
                    <p className="text-sm text-navy-1 mt-1">{order.user?.name || 'N/A'}</p>
                    <p className="text-xs text-navy-3">{order.user?.email || 'N/A'}</p>
                  </div>
                  <select
                    value={order.status}
                    onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                    className={`px-2 py-1 rounded-full text-xs font-semibold border-0 ${statusColors[order.status]}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Details */}
                <div>
                  <p className="text-sm font-medium text-navy-1 line-clamp-2">{order.topic}</p>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-navy-3">Deadline</p>
                    <p className="font-medium text-navy-1">
                      {new Date(order.deadline).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-navy-3">Amount</p>
                    <p className="font-semibold text-navy-1">
                      {order.price ? `$${order.price}` : 'N/A'}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t border-gray-100">
                  <Link 
                    to={`/admin/order/${order._id}`}
                    className="flex-1 text-center px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-100 transition"
                  >
                    View Details
                  </Link>
                  <button 
                    onClick={() => handleDeleteOrder(order._id)}
                    className="px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-100 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow border p-8 text-center">
            <p className="text-navy-3">No orders found</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminOrders;
