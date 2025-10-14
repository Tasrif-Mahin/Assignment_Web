import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';

const adminMenu = [
  { name: 'Dashboard', path: '/admin', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16"/></svg>
  )},
  { name: 'Orders', path: '/admin/orders', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18"/></svg>
  )},
  { name: 'Users', path: '/admin/users', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5V8a2 2 0 00-2-2h-7M5 12h14M9 16h6"/></svg>
  )},
  { name: 'Reviews', path: '/admin/reviews', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polygon points="12 2 15 8.5 22 9.3 17 14 18.5 21 12 17.8 5.5 21 7 14 2 9.3 9 8.5"/></svg>
  )},
  { name: 'Blog', path: '/admin/blog', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
  )}
];

const AdminLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className={`w-64 fixed left-0 top-0 bottom-0 bg-white shadow-lg z-40 transition-transform`}>
        <div className="px-7 py-6 border-b">
          <h1 className="text-xl font-bold text-blue-4">Admin Panel</h1>
        </div>
        <nav className="flex flex-col gap-1 mt-3 px-4">
          {adminMenu.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition 
              ${location.pathname === item.path ? "bg-blue-4 text-white shadow" : "text-navy-2 hover:bg-blue-4/10"}`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="px-7 py-4 mt-auto border-t text-sm text-navy-3">
          <Link to="/" className="hover:underline">← Back to Site</Link>
        </div>
      </aside>

      {/* Topbar */}
      <div className="flex-1 ml-64 flex flex-col">
        <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-blue-4">Welcome, Admin</h2>
          <div className="flex items-center gap-3">
            <span className="text-navy-1 text-xs">admin@yourdomain.com</span>
            <div className="w-9 h-9 rounded-full bg-blue-5 flex items-center justify-center text-white font-semibold">A</div>
          </div>
        </header>
        <main className="flex-1 p-7 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
