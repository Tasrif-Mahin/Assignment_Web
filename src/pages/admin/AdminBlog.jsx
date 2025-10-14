import { useState } from 'react';

const AdminBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    image: null
  });

  const posts = [
    { id: 1, title: 'How to Write Essays', category: 'Tips', date: '10 Oct 2025', status: 'Published' },
    { id: 2, title: 'Assignment Help Guide', category: 'Guide', date: '8 Oct 2025', status: 'Draft' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Blog post created:', formData);
    alert('Blog post created!');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-navy-1">Blog Management</h1>

      {/* Create New Post */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">Create New Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Post Title"
            className="w-full px-4 py-2 border rounded-lg"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <select
            className="w-full px-4 py-2 border rounded-lg"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="">Select Category</option>
            <option value="Tips">Tips</option>
            <option value="Guide">Guide</option>
            <option value="News">News</option>
          </select>
          <textarea
            rows="8"
            placeholder="Post Content"
            className="w-full px-4 py-2 border rounded-lg"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          ></textarea>
          <button type="submit" className="bg-blue-4 text-white px-6 py-2 rounded-lg font-semibold">
            Publish Post
          </button>
        </form>
      </div>

      {/* All Posts */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">All Posts</h2>
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 px-4">Title</th>
              <th className="text-left py-2 px-4">Category</th>
              <th className="text-left py-2 px-4">Date</th>
              <th className="text-left py-2 px-4">Status</th>
              <th className="text-left py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{post.title}</td>
                <td className="py-2 px-4">{post.category}</td>
                <td className="py-2 px-4">{post.date}</td>
                <td className="py-2 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    post.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {post.status}
                  </span>
                </td>
                <td className="py-2 px-4 space-x-2">
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

export default AdminBlog;
