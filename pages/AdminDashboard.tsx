import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit3, Trash2, ArrowUpRight, Search } from 'lucide-react';
import { UserButton } from '@clerk/clerk-react';
import { useBlog } from '../context/BlogContext';

export const AdminDashboard: React.FC = () => {
  const { posts, deletePost } = useBlog();
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 border border-white flex items-center justify-center font-bold tracking-tighter text-white">TDC</div>
              <span className="text-xs tracking-widest text-gray-500 font-medium">ADMIN CONSOLE</span>
            </div>
            <h1 className="text-3xl font-bold">Content Manager</h1>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
             <UserButton afterSignOutUrl="/" />
             <Link to="/" className="text-sm text-gray-400 hover:text-white flex items-center gap-2">
               View Live Site <ArrowUpRight size={14} />
             </Link>
             <Link 
               to="/admin/new" 
               className="bg-tdc-cyan text-black px-6 py-3 text-sm font-bold tracking-widest hover:bg-white transition-colors flex items-center gap-2"
             >
               <Plus size={16} /> NEW POST
             </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search posts by title..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#121212] border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white focus:outline-none focus:border-tdc-cyan transition-colors"
          />
        </div>

        {/* Table/List */}
        <div className="bg-[#121212] border border-white/10 rounded-lg overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 bg-white/5 text-xs font-bold tracking-widest text-gray-400 uppercase">
            <div className="col-span-6">Title</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>
          
          <div className="divide-y divide-white/5">
            {filteredPosts.map(post => (
              <div key={post.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/5 transition-colors group">
                <div className="col-span-6 flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-gray-800 overflow-hidden shrink-0">
                    <img src={post.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white group-hover:text-tdc-cyan transition-colors truncate pr-4">{post.title}</h3>
                    <p className="text-xs text-gray-500">/{post.slug}</p>
                  </div>
                </div>
                <div className="col-span-2">
                  <span className="bg-white/10 px-2 py-1 rounded text-xs text-gray-300 border border-white/5">
                    {post.category}
                  </span>
                </div>
                <div className="col-span-2 text-sm text-gray-500 font-mono">
                  {post.date}
                </div>
                <div className="col-span-2 flex justify-end gap-2">
                  <Link 
                    to={`/admin/edit/${post.slug}`}
                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                    title="Edit"
                  >
                    <Edit3 size={16} />
                  </Link>
                  <button 
                    onClick={() => {
                      if(window.confirm('Are you sure you want to delete this post?')) {
                        deletePost(post.id);
                      }
                    }}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}

            {filteredPosts.length === 0 && (
              <div className="p-12 text-center text-gray-500">
                No posts found matching "{searchTerm}"
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
