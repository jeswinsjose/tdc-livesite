import React, { useState, useMemo } from 'react';
import { Search, Filter, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import { Category } from '../types';
import { ArticleCard } from '../components/ArticleCard';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { LOCATIONS_DATA } from '../App';
import { useNavigate } from 'react-router-dom';

import { useUser } from '@clerk/clerk-react';

export const BlogList: React.FC = () => {
  const { posts } = useBlog();
  const { isSignedIn } = useUser();
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const categories: Category[] = ['All', 'Technology', 'BIM', 'Sustainability', 'Case Studies'];

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, posts]);

  const handleLocationSelect = (loc: {city: string, state: string, type: string}) => {
    const citySlug = loc.city.toLowerCase().replace(/\s+/g, '-');
    navigate(`/locations/${citySlug}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white">
      <Header locations={LOCATIONS_DATA} onLocationSelect={handleLocationSelect} />
      
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 flex justify-between items-start">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Architecture <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">Intelligence.</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl font-light">
              Insights on the convergence of digital twins, generative design, and the future of the built environment.
            </p>
          </div>
          
          {/* Secret Admin Link for Demo Purposes */}
          {/* Secret Admin Link - Disabled for Live Deployment */}
          {/* {isSignedIn && (
            <Link to="/admin" className="text-gray-800 hover:text-tdc-cyan transition-colors p-2">
               <Settings size={20} />
            </Link>
          )} */}
        </div>

        {/* Controls */}
        <div className="bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-2 mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-lg">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start pb-2 md:pb-0 px-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-bold tracking-widest uppercase transition-all whitespace-nowrap rounded-full ${
                  activeCategory === cat 
                    ? 'bg-white text-black' 
                    : 'text-gray-500 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64 pr-2">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input
              type="text"
              placeholder="SEARCH TOPICS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/20 border border-white/10 text-white text-xs py-3 pl-12 pr-6 rounded-full focus:outline-none focus:border-tdc-cyan transition-colors"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <ArticleCard 
                key={post.id} 
                post={post} 
                // Make the first item featured if no search/filter is active
                featured={index === 0 && activeCategory === 'All' && !searchQuery} 
              />
            ))
          ) : (
            <div className="col-span-full py-20 text-center border border-dashed border-white/10">
              <Filter className="mx-auto text-gray-600 mb-4" size={48} />
              <h3 className="text-xl text-white font-medium">No articles found</h3>
              <p className="text-gray-500">Try adjusting your search terms or filters.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};
