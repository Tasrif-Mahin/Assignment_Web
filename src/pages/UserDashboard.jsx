import { Link } from 'react-router-dom';

const dummyUser = {
  name: "Md. Rakin",
  email: "user@email.com",
  joinDate: "Feb 15, 2024",
};

const dummyOrders = [
  {
    id: "ORDER-5028",
    title: "Essay: The Impact of AI",
    status: "Completed",
    createdAt: "12 Oct 2025",
    due: "—",
    cost: "$85.00",
  },
  {
    id: "ORDER-5025",
    title: "Research Proposal: Marketing",
    status: "Pending",
    createdAt: "10 Oct 2025",
    due: "18 Oct 2025",
    cost: "$120.00",
  },
  {
    id: "ORDER-5010",
    title: "Assignment: Law Case Study",
    status: "In Progress",
    createdAt: "2 Oct 2025",
    due: "20 Oct 2025",
    cost: "$95.00",
  }
];

const statusColors = {
  "Completed": "bg-green-100 text-green-700",
  "Pending": "bg-orange-100 text-orange-700",
  "In Progress": "bg-blue-100 text-blue-700",
};

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white-6 to-white py-8 md:py-12 px-2">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* User Welcome & Profile Card */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 justify-between bg-white rounded-xl shadow-lg border-2 border-blue-4/10 p-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-blue-4/10 rounded-full flex items-center justify-center text-3xl text-navy-1 font-bold shadow-inner">
              <span>{dummyUser.name.slice(0,1)}</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-navy-1 mb-1">{dummyUser.name}</h2>
              <p className="text-navy-3 text-sm">{dummyUser.email}</p>
              <p className="text-navy-3 text-xs">Member since {dummyUser.joinDate}</p>
            </div>
          </div>
          <Link
            to="/profile"
            className="bg-gradient-to-r from-blue-4 to-blue-5 text-white font-semibold px-7 py-2.5 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all"
          >
            Edit Profile
          </Link>
        </div>

        {/* Shortcuts */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link to="/order" className="group block p-5 bg-white rounded-xl shadow border-2 border-blue-4/15 hover:border-blue-4 transition">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-4 to-blue-5 mb-3 shadow-lg">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8h18M6 8V6a6 6 0 1112 0v2m2 0v10a2 2 0 01-2 2H6a2 2 0 01-2-2V8z" /></svg>
            </div>
            <span className="font-semibold text-navy-1 text-lg">Place New Order</span>
            <div className="text-navy-3 text-xs">Quickly get expert help</div>
          </Link>
          <Link to="/orders" className="group block p-5 bg-white rounded-xl shadow border-2 border-blue-4/15 hover:border-blue-4 transition">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-4 to-blue-5 mb-3 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" /></svg>
            </div>
            <span className="font-semibold text-navy-1 text-lg">All Orders</span>
            <div className="text-navy-3 text-xs">Track all your requests</div>
          </Link>
          <Link to="/messages" className="group block p-5 bg-white rounded-xl shadow border-2 border-blue-4/15 hover:border-blue-4 transition">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-4 to-blue-5 mb-3 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 14h.01M16 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <span className="font-semibold text-navy-1 text-lg">Messages</span>
            <div className="text-navy-3 text-xs">Discuss with experts</div>
          </Link>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-blue-4/10 p-6">
          <h3 className="text-xl font-bold text-navy-1 mb-5">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="text-navy-2 text-xs uppercase border-b border-blue-4/20">
                  <th className="py-2 pr-4">Order ID</th>
                  <th className="py-2 pr-4">Title</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Order Date</th>
                  <th className="py-2 pr-4">Due</th>
                  <th className="py-2 pr-4">Total</th>
                  <th className="py-2"></th>
                </tr>
              </thead>
              <tbody>
                {dummyOrders.map((order) => (
                  <tr key={order.id} className="border-b border-blue-4/10 hover:bg-blue-4/5 transition">
                    <td className="py-2 pr-4 font-mono text-sm">{order.id}</td>
                    <td className="py-2 pr-4">{order.title}</td>
                    <td className="py-2 pr-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-2 pr-4">{order.createdAt}</td>
                    <td className="py-2 pr-4">{order.due}</td>
                    <td className="py-2 pr-4">{order.cost}</td>
                    <td className="py-2">
                      <Link to={`/orders/${order.id}`} className="text-blue-4 hover:underline font-medium text-xs">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-5">
            <Link to="/orders" className="inline-block text-blue-4 font-semibold text-sm hover:underline">
              See all orders &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
