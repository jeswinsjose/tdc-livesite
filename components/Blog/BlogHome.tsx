import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, User, Tag } from 'lucide-react';
import Fuse from 'fuse.js';
import { getAllPosts, getAllCategories, BlogPost } from '../../utils/blog';
import Header from '../Header';
import Footer from '../Footer';
import { LOCATIONS_DATA } from '../../App';

const BlogHome: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const allPosts = useMemo(() => getAllPosts(), []);
  const categories = useMemo(() => ['All', ...getAllCategories()], []);

  const fuse = useMemo(() => {
    return new Fuse(allPosts, {
      keys: ['title', 'excerpt', 'tags', 'category'],
      threshold: 0.3,
    });
  }, [allPosts]);

  const filteredPosts = useMemo(() => {
    let posts = allPosts;

    if (selectedCategory !== 'All') {
      posts = posts.filter((post) => post.category === selectedCategory);
    }

    if (searchQuery) {
      const results = fuse.search(searchQuery);
      posts = results.map((result) => result.item).filter(post => 
        selectedCategory === 'All' || post.category === selectedCategory
      );
    }

    return posts;
  }, [allPosts, searchQuery, selectedCategory, fuse]);

  const featuredPost = allPosts[0]; // Assume first post is featured for now

  return (
    <div className="bg-brand-dark min-h-screen text-white selection:bg-brand-accent selection:text-black font-sans">
      <Header locations={LOCATIONS_DATA} onLocationSelect={() => {}} />

      {/* Hero Section */}
      <div className="pt-32 pb-12 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight">
          Architecture <span className="text-brand-accent">Intelligence.</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mb-12">
          Insights on the convergence of digital twins, generative design, and the future of the built environment.
        </p>

        {/* Featured Post */}
        {featuredPost && !searchQuery && selectedCategory === 'All' && (
          <Link to={`/blog/${featuredPost.slug}`} className="group block relative aspect-[21/9] overflow-hidden rounded-2xl mb-16">
            <img 
              src={featuredPost.thumbnail} 
              alt={featuredPost.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-4xl">
              <span className="inline-block px-3 py-1 bg-brand-accent text-black text-xs font-bold uppercase tracking-wider mb-4">
                {featuredPost.category}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight group-hover:text-brand-accent transition-colors">
                {featuredPost.title}
              </h2>
              <div className="flex items-center gap-6 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {featuredPost.author}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {new Date(featuredPost.date).toLocaleDateString()}
                </div>
              </div>
            </div>
          </Link>
        )}
      </div>

      {/* Filter & Search */}
      <div className="sticky top-20 z-40 bg-brand-dark/95 backdrop-blur-sm border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-4 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === cat 
                    ? 'bg-white text-black' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-brand-accent transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Post Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`} className="group flex flex-col bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-colors">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.thumbnail} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-brand-accent uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-brand-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-auto">
                    <img 
                      src={`https://ui-avatars.com/api/?name=${post.author}&background=random`} 
                      alt={post.author}
                      className="w-6 h-6 rounded-full"
                    />
                    {post.author}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-2xl text-gray-500">No articles found matching your criteria.</p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
              className="mt-4 text-brand-accent hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BlogHome;
