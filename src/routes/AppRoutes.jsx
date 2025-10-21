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
import NotFound from '../pages/NotFound';

// User Dashboard Pages
import UserDashboard from '../pages/UserDashboard';
import Orders from '../pages/Orders';
import OrderDetails from '../pages/OrderDetails';
import Profile from '../pages/Profile';

// New Pages - Order & Resource Tools
import OrderPlacement from '../pages/OrderPlacement';
import MyOrders from '../pages/MyOrders';
import PlagiarismChecker from '../pages/PlagiarismChecker';
import CitationGenerator from '../pages/CitationGenerator';
import EssayExamples from '../pages/EssayExamples';

// Admin Dashboard Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminOrders from '../pages/admin/AdminOrders';
import AdminUsers from '../pages/admin/AdminUsers';
import AdminReviews from '../pages/admin/AdminReviews';
import AdminBlog from '../pages/admin/AdminBlog';
import AdminBlogEditor from '../pages/admin/AdminBlogEditor';
import AdminAddUser from '../pages/admin/AdminAddUser';

const AppRoutes = () => (
  <Routes>
    {/* Public/Main Pages with MainLayout */}
    <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogPost />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Order Pages */}
      <Route path="/order" element={<Order />} />
      <Route path="/place-order" element={<OrderPlacement />} />
      
      {/* Resource Tools (Coming Soon) */}
      <Route path="/plagiarism-checker" element={<PlagiarismChecker />} />
      <Route path="/citation-generator" element={<CitationGenerator />} />
      <Route path="/essay-examples" element={<EssayExamples />} />
      
      {/* User Dashboard */}
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/my-orders" element={<MyOrders />} />
      <Route path="/orders/:id" element={<OrderDetails />} />
      <Route path="/profile" element={<Profile />} />
      
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Route>

    {/* Admin Dashboard */}
    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<AdminDashboard />} />
      <Route path="orders" element={<AdminOrders />} />
      <Route path="users" element={<AdminUsers />} />
      <Route path="users/create" element={<AdminAddUser />} />
      <Route path="reviews" element={<AdminReviews />} />
      <Route path="blog" element={<AdminBlog />} />
      <Route path="blog/create" element={<AdminBlogEditor />} />
      <Route path="blog/edit/:id" element={<AdminBlogEditor />} />
    </Route>
  </Routes>
);

export default AppRoutes;
