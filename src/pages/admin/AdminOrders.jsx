const AdminOrders = () => {
  const orders = [
    { id: 'ORDER-5028', customer: 'John Doe', title: 'Essay Writing', status: 'Completed', writer: 'Dr. Sarah', amount: '$120.00', date: '15 Oct 2025' },
    { id: 'ORDER-5027', customer: 'Jane Smith', title: 'Research Paper', status: 'In Progress', writer: 'Prof. Ahmed', amount: '$85.00', date: '14 Oct 2025' },
    { id: 'ORDER-5026', customer: 'Mike Johnson', title: 'Assignment Help', status: 'Pending', writer: 'Unassigned', amount: '$95.00', date: '13 Oct 2025' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-navy-1">All Orders</h1>
        <button className="bg-blue-4 text-white px-4 py-2 rounded-lg font-semibold">Export CSV</button>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <table className="min-w-full">
          <thead>
            <tr className="border-b-2">
              <th className="text-left py-3 px-4">Order ID</th>
              <th className="text-left py-3 px-4">Customer</th>
              <th className="text-left py-3 px-4">Title</th>
              <th className="text-left py-3 px-4">Writer</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Amount</th>
              <th className="text-left py-3 px-4">Date</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-mono text-sm">{order.id}</td>
                <td className="py-3 px-4">{order.customer}</td>
                <td className="py-3 px-4">{order.title}</td>
                <td className="py-3 px-4">{order.writer}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                    order.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4">{order.amount}</td>
                <td className="py-3 px-4">{order.date}</td>
                <td className="py-3 px-4">
                  <button className="text-blue-4 hover:underline text-sm">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
