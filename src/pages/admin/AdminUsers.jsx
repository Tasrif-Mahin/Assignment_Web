import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, updateUserRole, toggleUserStatus, deleteUser } from '../../apiService';

const roleColors = {
  'User': 'bg-blue-100 text-blue-700',
  'Writer': 'bg-purple-100 text-purple-700',
  'Moderator': 'bg-green-100 text-green-700',
  'Admin': 'bg-red-100 text-red-700'
};

const statusColors = {
  'Active': 'bg-green-100 text-green-700',
  'Blocked': 'bg-red-100 text-red-700'
};

const AdminUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'All' || user.role === filterRole;
    const matchesStatus = filterStatus === 'All' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, { role: newRole });
      setUsers(users.map(user => 
        user._id === userId ? { ...user, role: newRole } : user
      ));
      alert(`User role updated to: ${newRole}`);
    } catch (error) {
      console.error('Failed to update role:', error);
      alert('Failed to update user role');
    }
  };

  const handleStatusToggle = async (userId, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Blocked' : 'Active';
    try {
      await toggleUserStatus(userId, { status: newStatus });
      setUsers(users.map(user => 
        user._id === userId ? { ...user, status: newStatus } : user
      ));
      alert(`User status changed to: ${newStatus}`);
    } catch (error) {
      console.error('Failed to toggle status:', error);
      alert('Failed to change user status');
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone.`)) {
      try {
        await deleteUser(userId);
        setUsers(users.filter(user => user._id !== userId));
        alert(`User "${userName}" has been deleted successfully!`);
      } catch (error) {
        console.error('Failed to delete user:', error);
        alert('Failed to delete user');
      }
    }
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-4 mx-auto"></div>
          <p className="mt-4 text-navy-3">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy-1">Users Management</h1>
          <p className="text-navy-3 text-xs sm:text-sm mt-1">Manage user accounts, roles, and permissions</p>
        </div>
        <button 
          onClick={() => navigate('/admin/users/create')}
          className="bg-gradient-to-r from-blue-4 to-blue-5 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold hover:shadow-lg transition text-sm sm:text-base self-start sm:self-auto"
        >
          + Add User
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        <div className="bg-white rounded-xl shadow border p-4 sm:p-6">
          <p className="text-navy-3 text-xs sm:text-sm mb-1">Total Users</p>
          <p className="text-xl sm:text-2xl font-bold text-navy-1">{users.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow border p-4 sm:p-6">
          <p className="text-navy-3 text-xs sm:text-sm mb-1">Active Users</p>
          <p className="text-xl sm:text-2xl font-bold text-green-600">
            {users.filter(u => u.status === 'Active').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow border p-4 sm:p-6">
          <p className="text-navy-3 text-xs sm:text-sm mb-1">Writers</p>
          <p className="text-xl sm:text-2xl font-bold text-purple-600">
            {users.filter(u => u.role === 'Writer').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow border p-4 sm:p-6">
          <p className="text-navy-3 text-xs sm:text-sm mb-1">Blocked Users</p>
          <p className="text-xl sm:text-2xl font-bold text-red-600">
            {users.filter(u => u.status === 'Blocked').length}
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl shadow border p-4 sm:p-6">
        <div className="flex flex-col gap-3 sm:gap-4">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 border-navy-3/20 rounded-lg focus:outline-none focus:border-blue-4"
          />
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 border-navy-3/20 rounded-lg focus:outline-none focus:border-blue-4"
            >
              <option value="All">All Roles</option>
              <option value="User">User</option>
              <option value="Writer">Writer</option>
              <option value="Moderator">Moderator</option>
              <option value="Admin">Admin</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 border-navy-3/20 rounded-lg focus:outline-none focus:border-blue-4"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>
          <div className="text-xs sm:text-sm text-navy-3">
            Showing <span className="font-semibold text-navy-1">{filteredUsers.length}</span> of {users.length} users
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-xl shadow border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-semibold text-navy-1 uppercase">User</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-navy-1 uppercase">Role</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-navy-1 uppercase">Status</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-navy-1 uppercase">Joined</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-navy-1 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-navy-1">{user.name}</p>
                        <p className="text-xs text-navy-3">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer ${roleColors[user.role]}`}
                    >
                      <option value="User">User</option>
                      <option value="Writer">Writer</option>
                      <option value="Moderator">Moderator</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[user.status] || 'bg-gray-100 text-gray-700'}`}>
                      {user.status || 'Active'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewUser(user)}
                        className="text-blue-4 hover:underline text-sm font-semibold"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleStatusToggle(user._id, user.status || 'Active')}
                        className={`${(user.status || 'Active') === 'Active' ? 'text-orange-500' : 'text-green-500'} hover:underline text-sm font-semibold`}
                      >
                        {(user.status || 'Active') === 'Active' ? 'Block' : 'Unblock'}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user._id, user.name)}
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
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user._id} className="bg-white rounded-xl shadow border p-4">
              <div className="space-y-3">
                {/* User Info */}
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-navy-1 text-sm">{user.name}</p>
                    <p className="text-xs text-navy-3 truncate">{user.email}</p>
                    <div className="flex gap-2 mt-2">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        className={`px-2 py-1 rounded-full text-xs font-semibold border-0 ${roleColors[user.role]}`}
                      >
                        <option value="User">User</option>
                        <option value="Writer">Writer</option>
                        <option value="Moderator">Moderator</option>
                        <option value="Admin">Admin</option>
                      </select>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[user.status] || 'bg-gray-100 text-gray-700'}`}>
                        {user.status || 'Active'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-gray-100">
                  <div>
                    <p className="text-navy-3">Joined</p>
                    <p className="font-medium text-navy-1">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t border-gray-100">
                  <button
                    onClick={() => handleViewUser(user)}
                    className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-100 transition"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleStatusToggle(user._id, user.status || 'Active')}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold transition ${
                      (user.status || 'Active') === 'Active' 
                        ? 'bg-orange-50 text-orange-600 hover:bg-orange-100' 
                        : 'bg-green-50 text-green-600 hover:bg-green-100'
                    }`}
                  >
                    {(user.status || 'Active') === 'Active' ? 'Block' : 'Unblock'}
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user._id, user.name)}
                    className="px-3 py-2 bg-red-50 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-100 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow border p-8 text-center">
            <p className="text-navy-3">No users found</p>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-navy-1">User Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-navy-3 hover:text-navy-1"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 sm:gap-4 pb-3 sm:pb-4 border-b">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-xl sm:text-2xl">
                  {selectedUser.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-base sm:text-lg text-navy-1">{selectedUser.name}</p>
                  <p className="text-xs sm:text-sm text-navy-3">{selectedUser.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <p className="text-xs text-navy-3 mb-1">Role</p>
                  <p className="font-semibold text-navy-1 text-sm">{selectedUser.role}</p>
                </div>
                <div>
                  <p className="text-xs text-navy-3 mb-1">Status</p>
                  <p className="font-semibold text-navy-1 text-sm">{selectedUser.status || 'Active'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-navy-3 mb-1">Joined Date</p>
                  <p className="font-semibold text-navy-1 text-sm">
                    {new Date(selectedUser.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-4 sm:mt-6 bg-blue-4 text-white py-2 sm:py-2.5 rounded-lg font-semibold hover:bg-blue-5 transition text-sm sm:text-base"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminUsers;
