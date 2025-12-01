import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { BlogPost } from '../types';

interface ArticleCardProps {
  post: BlogPost;
  featured?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ post, featured = false }) => {
  return (
    <Link 
      to={`/post/${post.slug}`}
      className={`group relative block overflow-hidden border border-white/10 bg-tdc-card hover:border-tdc-cyan/50 transition-all duration-300 ${featured ? 'md:col-span-2' : ''}`}
    >
      {/* Image Container */}
      <div className={`relative overflow-hidden ${featured ? 'h-96' : 'h-64'}`}>
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
        
        <div className="absolute top-4 left-4">
          <span className="bg-black/50 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold tracking-widest px-3 py-1 uppercase">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative z-10">
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
          <span>{post.date}</span>
          <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
          <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
        </div>

        <h3 className={`${featured ? 'text-3xl' : 'text-xl'} font-bold text-white mb-3 group-hover:text-tdc-cyan transition-colors leading-tight`}>
          {post.title}
        </h3>

        {featured && (
          <p className="text-gray-400 text-sm mb-6 line-clamp-2 max-w-xl">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between mt-4">
           <div className="flex items-center gap-2">
             <img src={post.author.avatar} alt={post.author.name} className="w-6 h-6 rounded-full grayscale group-hover:grayscale-0 transition-all" />
             <span className="text-xs text-gray-400">{post.author.name}</span>
           </div>
           
           <span className="text-tdc-cyan opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
             <ArrowRight size={18} />
           </span>
        </div>
      </div>
    </Link>
  );
};