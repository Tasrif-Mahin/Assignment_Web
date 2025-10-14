import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';

import Home from '../pages/Home';
import Services from '../pages/Services';
import About from '../pages/About';
import Reviews from '../pages/Reviews';
import Blog from '../pages/Blog';
import BlogPost from '../pages/BlogPost';
import Resources from '../pages/Resources';
import Order from '../pages/Order';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

// User Dashboard
import UserDashboard from '../pages/UserDashboard';

// Admin Dashboard
import AdminDashboard from '../pages/admin/AdminDashboard';

const AppRoutes = () => (
  <Routes>
    {/* Public/Main Pages */}
    <Route path="/" element={<MainLayout><Home /></MainLayout>} />
    <Route path="/services" element={<MainLayout><Services /></MainLayout>} />
    <Route path="/about" element={<MainLayout><About /></MainLayout>} />
    <Route path="/reviews" element={<MainLayout><Reviews /></MainLayout>} />
    <Route path="/resources" element={<MainLayout><Resources /></MainLayout>} />
    <Route path="/blog" element={<MainLayout><Blog /></MainLayout>} />
    <Route path="/blog/:id" element={<MainLayout><BlogPost /></MainLayout>} />
    <Route path="/order" element={<MainLayout><Order /></MainLayout>} />
    <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
    <Route path="/signup" element={<MainLayout><Signup /></MainLayout>} />

    {/* User Dashboard */}
    <Route path="/dashboard" element={<MainLayout><UserDashboard /></MainLayout>} />

    {/* Admin Dashboard */}
    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<AdminDashboard />} />
    </Route>
  </Routes>
);

export default AppRoutes;
