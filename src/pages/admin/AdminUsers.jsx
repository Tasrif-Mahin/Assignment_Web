const AdminUsers = () => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@email.com', role: 'User', joined: '10 Jan 2025', orders: 5 },
    { id: 2, name: 'Jane Smith', email: 'jane@email.com', role: 'User', joined: '15 Feb 2025', orders: 3 },
    { id: 3, name: 'Dr. Sarah', email: 'sarah@email.com', role: 'Writer', joined: '5 Mar 2025', orders: 25 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-navy-1">Users Management</h1>
        <button className="bg-blue-4 text-white px-4 py-2 rounded-lg font-semibold">+ Add User</button>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <table className="min-w-full">
          <thead>
            <tr className="border-b-2">
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Email</th>
              <th className="text-left py-3 px-4">Role</th>
              <th className="text-left py-3 px-4">Joined</th>
              <th className="text-left py-3 px-4">Orders</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-semibold">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.role === 'Writer' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-3 px-4">{user.joined}</td>
                <td className="py-3 px-4">{user.orders}</td>
                <td className="py-3 px-4 space-x-2">
                  <button className="text-blue-4 hover:underline text-sm">Edit</button>
                  <button className="text-red-500 hover:underline text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
