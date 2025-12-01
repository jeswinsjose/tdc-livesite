import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Search, ExternalLink } from 'lucide-react';
import { getAllPosts } from '../../utils/blog';

const AdminDashboard: React.FC = () => {
  const posts = useMemo(() => getAllPosts(), []);
  const [search, setSearch] = useState('');

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Top Bar */}
      <div className="border-b border-white/10 bg-[#0a0a0a] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-bold font-display rounded">TDC</div>
            <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">Admin Console</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/blog" className="text-sm text-gray-400 hover:text-white flex items-center gap-2">
              View Live Site <ExternalLink className="w-3 h-3" />
            </Link>
            <Link 
              to="/admin/new" 
              className="bg-brand-accent text-black px-4 py-2 rounded text-sm font-bold hover:bg-white transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> NEW POST
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Content Manager</h1>

        {/* Search */}
        <div className="mb-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search posts by title..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#111] border border-white/10 rounded-lg pl-12 pr-4 py-4 focus:outline-none focus:border-brand-accent transition-colors"
          />
        </div>

        {/* Table */}
        <div className="bg-[#111] border border-white/10 rounded-lg overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <div className="col-span-6">Title</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>
          
          {filteredPosts.map((post) => (
            <div key={post.slug} className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 items-center hover:bg-white/5 transition-colors group">
              <div className="col-span-6 flex items-center gap-4">
                <img src={post.thumbnail} alt="" className="w-10 h-10 rounded object-cover bg-white/10" />
                <div>
                  <h3 className="font-bold text-white group-hover:text-brand-accent transition-colors">{post.title}</h3>
                  <span className="text-xs text-gray-500">{post.slug}</span>
                </div>
              </div>
              <div className="col-span-2">
                <span className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">{post.category}</span>
              </div>
              <div className="col-span-2 text-sm text-gray-400">
                {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
              </div>
              <div className="col-span-2 flex justify-end gap-2">
                <Link 
                  to={`/admin/edit/${post.slug}`} 
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </Link>
                <button 
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors"
                  title="Delete (Manual action required)"
                  onClick={() => alert('To delete, please remove the file from content/blog manually.')}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {filteredPosts.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              No posts found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
