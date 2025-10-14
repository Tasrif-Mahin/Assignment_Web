const AdminDashboard = () => {
  const stats = [
    { title: 'Total Orders', value: '1,234', icon: (
      <svg className="w-6 h-6 text-blue-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18"/></svg>
    )},
    { title: 'Active Users', value: '856', icon: (
      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5V8a2 2 0 00-2-2h-7M5 12h14M9 16h6"/></svg>
    )},
    { title: 'Revenue', value: '$45,230', icon: (
      <svg className="w-6 h-6 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3"/></svg>
    )},
    { title: 'Pending Reviews', value: '42', icon: (
      <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polygon points="12 2 15 8.5 22 9.3 17 14 18.5 21 12 17.8 5.5 21 7 14 2 9.3 9 8.5"/></svg>
    )}
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold text-navy-1 mb-6">Admin Dashboard</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl shadow border px-7 py-6 flex items-center gap-4">
            <div>{stat.icon}</div>
            <div>
              <div className="text-xl font-bold text-navy-1">{stat.value}</div>
              <div className="text-navy-3 text-xs">{stat.title}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow border px-7 py-6 mt-6">
        <h2 className="text-lg font-semibold text-navy-1 mb-3">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b bg-blue-4/10">
                <th className="py-2 px-3 text-left">Order ID</th>
                <th className="py-2 px-3 text-left">Customer</th>
                <th className="py-2 px-3 text-left">Status</th>
                <th className="py-2 px-3 text-left">Amount</th>
                <th className="py-2 px-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-blue-4/5">
                <td className="py-2 px-3">ORDER-5028</td>
                <td className="py-2 px-3">John Doe</td>
                <td className="py-2 px-3">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">Completed</span>
                </td>
                <td className="py-2 px-3">$120.00</td>
                <td className="py-2 px-3">15 Oct 2025</td>
              </tr>
              <tr className="border-b hover:bg-blue-4/5">
                <td className="py-2 px-3">ORDER-5027</td>
                <td className="py-2 px-3">Jane Smith</td>
                <td className="py-2 px-3">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">In Progress</span>
                </td>
                <td className="py-2 px-3">$85.00</td>
                <td className="py-2 px-3">14 Oct 2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
