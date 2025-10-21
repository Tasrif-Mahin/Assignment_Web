import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getOrderById } from '../apiService';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    
    fetchOrderDetails();
  }, [id, navigate]);

  const fetchOrderDetails = async () => {
    try {
      const response = await getOrderById(id);
      setOrder(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch order details:', error);
      setError('Failed to load order details');
      setLoading(false);
    }
  };

  const getTimeline = (status) => {
    const stages = [
      { 
        stage: "Order Placed", 
        completed: true,
        description: "Your order has been received and is being processed."
      },
      { 
        stage: "Order Confirmed", 
        completed: status !== 'Pending',
        description: "Payment confirmed. Writer assigned to your order."
      },
      { 
        stage: "In Progress", 
        completed: status === 'Completed' || status === 'In Progress',
        description: "Our expert is currently working on your assignment."
      },
      { 
        stage: "Quality Check", 
        completed: status === 'Completed',
        description: "Quality assurance team will review the work."
      },
      { 
        stage: "Delivered", 
        completed: status === 'Completed',
        description: "Completed work will be delivered to you."
      }
    ];
    return stages;
  };

  const statusColors = {
    "Completed": "bg-green-100 text-green-700",
    "Pending": "bg-orange-100 text-orange-700",
    "In Progress": "bg-blue-100 text-blue-700",
    "Cancelled": "bg-red-100 text-red-700",
    "Rejected": "bg-red-100 text-red-700"
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white-6 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-4 mx-auto"></div>
          <p className="mt-4 text-navy-3">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white-6 to-white flex items-center justify-center px-4">
        <div className="text-center">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <p className="text-navy-1 font-semibold mb-4">{error || 'Order not found'}</p>
          <Link to="/orders" className="text-blue-4 hover:underline font-semibold">
            ← Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const timeline = getTimeline(order.status);
  const currentStageIndex = timeline.findIndex(stage => !stage.completed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white-6 to-white py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-navy-1">Order Details</h1>
            <p className="text-navy-3 text-xs sm:text-sm mt-1">View complete information about your order</p>
          </div>
          <Link to="/orders" className="text-blue-4 hover:underline font-semibold text-sm sm:text-base self-start sm:self-auto">
            ← Back to Orders
          </Link>
        </div>

        {/* Order Info Card */}
        <div className="bg-white rounded-xl shadow border-2 border-blue-4/10 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-4 sm:mb-6 gap-3">
            <div className="flex-1">
              <h2 className="text-lg sm:text-2xl font-bold text-navy-1 mb-2">{order.topic}</h2>
              <p className="text-navy-3 text-xs sm:text-sm">{order.description || 'No description provided'}</p>
            </div>
            <span className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold text-xs sm:text-sm self-start ${statusColors[order.status] || 'bg-gray-100 text-gray-700'}`}>
              {order.status}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6 text-xs sm:text-sm">
            <div>
              <p className="text-navy-3 mb-1">Order ID</p>
              <p className="font-semibold text-navy-1">{order._id.slice(-6).toUpperCase()}</p>
            </div>
            <div>
              <p className="text-navy-3 mb-1">Subject</p>
              <p className="font-semibold text-navy-1">{order.subject}</p>
            </div>
            <div>
              <p className="text-navy-3 mb-1">Academic Level</p>
              <p className="font-semibold text-navy-1">{order.academicLevel}</p>
            </div>
            <div>
              <p className="text-navy-3 mb-1">Pages</p>
              <p className="font-semibold text-navy-1">{order.pages}</p>
            </div>
            <div>
              <p className="text-navy-3 mb-1">Citation Style</p>
              <p className="font-semibold text-navy-1">{order.citationStyle}</p>
            </div>
            {order.price && (
              <div>
                <p className="text-navy-3 mb-1">Total Cost</p>
                <p className="font-semibold text-navy-1">${order.price}</p>
              </div>
            )}
            <div>
              <p className="text-navy-3 mb-1">Order Date</p>
              <p className="font-semibold text-navy-1">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-navy-3 mb-1">Deadline</p>
              <p className="font-semibold text-navy-1">
                {new Date(order.deadline).toLocaleDateString()}
              </p>
            </div>
            {order.assignedWriter && (
              <div>
                <p className="text-navy-3 mb-1">Assigned Writer</p>
                <p className="font-semibold text-navy-1">{order.assignedWriter}</p>
              </div>
            )}
          </div>
        </div>

        {/* Order Timeline */}
        <div className="bg-white rounded-xl shadow border-2 border-blue-4/10 p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-navy-1 mb-4 sm:mb-6">Order Progress</h3>
          <div className="relative">
            {/* Timeline Line (Hidden on very small screens) */}
            <div className="hidden sm:block absolute left-5 top-8 bottom-8 w-0.5 bg-navy-3/20"></div>
            
            <div className="space-y-4 sm:space-y-6">
              {timeline.map((item, index) => (
                <div key={index} className="relative flex items-start gap-3 sm:gap-4">
                  {/* Timeline Dot */}
                  <div className={`relative z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    item.completed 
                      ? 'bg-green-500 ring-2 sm:ring-4 ring-green-100' 
                      : index === currentStageIndex
                      ? 'bg-blue-4 ring-2 sm:ring-4 ring-blue-100 animate-pulse'
                      : 'bg-gray-300 ring-2 sm:ring-4 ring-gray-100'
                  }`}>
                    {item.completed ? (
                      <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span className="text-white font-bold text-xs sm:text-sm">{index + 1}</span>
                    )}
                  </div>

                  {/* Timeline Content */}
                  <div className="flex-1 pb-4 sm:pb-6">
                    <div className={`font-semibold text-sm sm:text-base ${item.completed ? 'text-navy-1' : 'text-navy-3'}`}>
                      {item.stage}
                    </div>
                    <div className="text-xs sm:text-sm text-navy-3 mt-1">
                      {item.completed ? new Date(order.createdAt).toLocaleString() : 'Pending'}
                    </div>
                    <div className="text-[10px] sm:text-xs text-navy-3 mt-1 sm:mt-2">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Documents Section */}
        <div className="bg-white rounded-xl shadow border-2 border-blue-4/10 p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-navy-1 mb-3 sm:mb-4">Uploaded Documents</h3>
          {order.files && order.files.length > 0 ? (
            <div className="space-y-2 sm:space-y-3">
              {order.files.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-blue-4/5 rounded-lg hover:bg-blue-4/10 transition flex-wrap gap-2">
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-4/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-navy-1 text-xs sm:text-sm truncate">{doc}</p>
                      <p className="text-[10px] sm:text-xs text-navy-3">Uploaded</p>
                    </div>
                  </div>
                  <button className="bg-blue-4 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold hover:bg-blue-5 transition flex items-center gap-1 sm:gap-2 text-xs sm:text-sm flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span className="hidden sm:inline">Download</span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 sm:py-8 text-navy-3 text-xs sm:text-sm">
              No documents uploaded yet. Documents will appear here once available.
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <a
            href={`https://wa.me/8801727113023?text=Hello! I need support for Order ID: ${order._id.slice(-6).toUpperCase()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-blue-4 to-blue-5 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-bold hover:shadow-xl hover:scale-105 transition text-center text-sm sm:text-base"
          >
            Contact Support
          </a>
          {order.status === 'Completed' && (
            <button className="bg-white text-navy-1 border-2 border-navy-1 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-bold hover:bg-navy-1 hover:text-white transition text-sm sm:text-base">
              Request Revision
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default OrderDetails;
