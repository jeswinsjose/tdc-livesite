import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { useBlog } from '../context/BlogContext';

const HomeBlogSection: React.FC = () => {
  const { posts } = useBlog();
  const recentPosts = posts.slice(0, 3);

  if (recentPosts.length === 0) return null;

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-tdc-cyan" />
              <span className="text-tdc-cyan font-mono text-sm tracking-widest uppercase">Architecture Intelligence</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
              Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Insights</span>
            </h2>
          </div>
          
          <Link 
            to="/blog" 
            className="group flex items-center gap-2 text-white hover:text-tdc-cyan transition-colors pb-2 border-b border-white/20 hover:border-tdc-cyan"
          >
            <span className="uppercase tracking-widest text-sm font-bold">View All Articles</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
            <Link key={post.id} to={`/post/${post.slug}`} className="group block h-full">
              <article className="h-full bg-[#121212] border border-white/5 rounded-lg overflow-hidden hover:border-tdc-cyan/50 transition-colors flex flex-col">
                <div className="aspect-[16/9] overflow-hidden relative">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded border border-white/10">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 font-mono">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-tdc-cyan transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-1">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-tdc-cyan transition-colors mt-auto">
                    Read Article <ArrowRight size={14} />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeBlogSection;
