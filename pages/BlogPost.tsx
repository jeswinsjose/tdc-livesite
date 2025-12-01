import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Linkedin, Twitter, Calendar, Clock, Edit2, List, ChevronDown, ChevronUp } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { useBlog } from '../context/BlogContext';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { LOCATIONS_DATA } from '../App';

import { ArticleCard } from '../components/ArticleCard';

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getPost, posts } = useBlog();
  const { isSignedIn } = useUser();
  const [toc, setToc] = useState<Array<{ id: string; text: string; level: number }>>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);
  const navigate = useNavigate();
  
  // Ref to store observer to clean up properly
  const observerRef = useRef<IntersectionObserver | null>(null);

  const post = getPost(slug || '');

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return posts
      .filter(p => p.category === post.category && p.id !== post.id)
      .slice(0, 3);
  }, [post, posts]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Process content to add IDs and generate TOC before rendering
  // This avoids React re-render issues wiping out manually added IDs
  const { processedContent, tocItems } = useMemo(() => {
    if (!post?.content) return { processedContent: '', tocItems: [] };

    const parser = new DOMParser();
    const doc = parser.parseFromString(post.content, 'text/html');
    const headings = doc.querySelectorAll('h2, h3');
    const items: Array<{ id: string; text: string; level: number }> = [];

    headings.forEach((heading, index) => {
      const text = heading.textContent || '';
      const slugId = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || `section-${index}`;
      
      heading.id = slugId;
      // Add scroll margin style directly to the HTML string
      if (heading instanceof HTMLElement) {
        heading.style.scrollMarginTop = '150px';
      }

      items.push({
        id: slugId,
        text: text,
        level: parseInt(heading.tagName.substring(1))
      });
    });

    return {
      processedContent: doc.body.innerHTML,
      tocItems: items
    };
  }, [post?.content]);

  // Update TOC state
  useEffect(() => {
    setToc(tocItems);
  }, [tocItems]);

  // Intersection Observer for Active State
  useEffect(() => {
    if (tocItems.length === 0) return;

    // Disconnect previous observer
    if (observerRef.current) observerRef.current.disconnect();

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    // Adjusted rootMargin to trigger when the heading is near the top of the viewport
    // -150px top offset accounts for the header
    const observer = new IntersectionObserver(callback, { 
      rootMargin: '-150px 0px -60% 0px',
      threshold: 0 
    });

    observerRef.current = observer;

    // We need to wait for the DOM to update with the new processedContent
    // A small timeout ensures the elements are in the DOM
    setTimeout(() => {
        tocItems.forEach((item) => {
          const el = document.getElementById(item.id);
          if (el) observer.observe(el);
        });
    }, 100);

    return () => observer.disconnect();
  }, [tocItems]);

  const handleLocationSelect = (loc: {city: string, state: string, type: string}) => {
    const citySlug = loc.city.toLowerCase().replace(/\s+/g, '-');
    navigate(`/locations/${citySlug}`);
    window.scrollTo(0, 0);
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#050505]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Post not found</h2>
          <Link to="/" className="text-tdc-cyan hover:underline">Return Home</Link>
        </div>
      </div>
    );
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 150; // Generous offset for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      setActiveId(id);
    }
    setIsMobileTocOpen(false);
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white">
      <Header locations={LOCATIONS_DATA} onLocationSelect={handleLocationSelect} />
      
      <article className="min-h-screen bg-[#050505]">
        {/* Hero Image */}
        <div className="relative min-h-[60vh] w-full flex items-end pt-32">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505] z-10" />
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
          
          {/* Edit Button - Disabled for Live Deployment */}
          {/* {isSignedIn && (
            <div className="absolute top-24 right-6 z-30">
              <Link to={`/admin/edit/${post.slug}`} className="bg-black/50 backdrop-blur text-white px-4 py-2 rounded border border-white/10 flex items-center gap-2 hover:bg-tdc-cyan hover:text-black transition-colors">
                <Edit2 size={14} /> Edit
              </Link>
            </div>
          )} */}

          <div className="relative z-20 w-full px-6 pb-12 md:pb-20">
             <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
               <div className="lg:col-span-12">
                 <nav className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-6 text-gray-400">
                   <Link to="/" className="hover:text-white transition-colors">Home</Link>
                   <span className="text-gray-600">/</span>
                   <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
                   <span className="text-gray-600">/</span>
                   <span className="text-tdc-cyan">{post.category}</span>
                 </nav>
                 <h1 className="text-3xl md:text-6xl font-bold text-white mb-6 md:mb-8 leading-tight max-w-4xl">
                   {post.title}
                 </h1>
                 <div className="flex flex-wrap items-center gap-6 md:gap-8 text-sm text-gray-300 border-t border-white/10 pt-6 md:pt-8">
                   <div className="flex items-center gap-3">
                     <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full object-cover" />
                     <div>
                       <p className="font-bold text-white">{post.author.name}</p>
                       <p className="text-xs text-gray-500">{post.author.role}</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-2">
                     <Calendar size={14} /> {post.date}
                   </div>
                   <div className="flex items-center gap-2">
                     <Clock size={14} /> {post.readTime}
                   </div>
                   <div className="bg-white/10 px-3 py-1 text-xs rounded-full">
                     {post.category}
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </div>

        {/* Content Layout: 3 Columns (Left TOC, Center Content, Right Share) */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20">
          
          {/* LEFT SIDEBAR: TOC (Desktop) */}
          <div className="lg:col-span-3 hidden lg:block order-1">
             <div className="sticky top-32 z-40">
               <h4 className="text-xs font-bold text-gray-500 mb-6 tracking-widest flex items-center gap-2">
                 <List size={14} /> CONTENTS
               </h4>
               
               {/* Semrush-style TOC */}
               <div className="relative">
                  {/* Continuous gray line */}
                  <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/10"></div>
                  
                  <ul className="space-y-4">
                    {toc.map((item) => (
                      <li key={item.id} className={`relative ${item.level === 3 ? 'ml-4' : ''}`}>
                        {/* Active indicator overlay */}
                        {activeId === item.id && (
                          <div className="absolute -left-[1px] top-0 bottom-0 w-[2px] bg-tdc-cyan shadow-[0_0_8px_rgba(0,229,255,0.6)] rounded-full transition-all duration-300" 
                               style={{ left: item.level === 3 ? '-17px' : '-1px' }} 
                          />
                        )}
                        
                        <a 
                          href={`#${item.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToSection(item.id);
                            window.history.pushState(null, '', `#${item.id}`);
                          }}
                          className={`text-sm text-left transition-all duration-200 pl-4 block w-full leading-relaxed ${
                            activeId === item.id 
                              ? 'text-tdc-cyan font-bold translate-x-1' 
                              : 'text-gray-500 hover:text-white hover:translate-x-1'
                          }`}
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                    {toc.length === 0 && (
                      <li className="pl-4 text-xs text-gray-600 italic">No headings found</li>
                    )}
                  </ul>
               </div>
             </div>
          </div>

          {/* CENTER: Main Text */}
          <div className="lg:col-span-7 order-2">
            {/* Mobile TOC Accordion */}
            <div className="lg:hidden mb-8 border border-white/10 rounded-lg overflow-hidden bg-white/5">
               <button 
                 onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
                 className="w-full px-4 py-3 flex items-center justify-between text-xs font-bold text-gray-300"
               >
                 <span className="flex items-center gap-2"><List size={14}/> TABLE OF CONTENTS</span>
                 {isMobileTocOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
               </button>
               {isMobileTocOpen && (
                 <ul className="px-4 pb-4 space-y-3 border-t border-white/10 pt-3">
                   {toc.map((item) => (
                     <li key={item.id} className={`${item.level === 3 ? 'pl-4' : ''}`}>
                       <button 
                         onClick={() => scrollToSection(item.id)}
                         className={`text-sm text-left block w-full ${activeId === item.id ? 'text-tdc-cyan' : 'text-gray-400 hover:text-white'}`}
                       >
                         {item.text}
                       </button>
                     </li>
                   ))}
                   {toc.length === 0 && <li className="text-xs text-gray-600">No headings in article.</li>}
                 </ul>
               )}
            </div>

            {/* Lead Excerpt */}
            <p className="text-xl text-gray-200 leading-relaxed mb-12 font-light border-l-2 border-tdc-cyan pl-6">
              {post.excerpt}
            </p>

            {/* Body Content */}
            <div 
              id="blog-article-content"
              className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:scroll-mt-32 prose-a:text-tdc-cyan prose-img:rounded-lg prose-p:text-gray-300"
              dangerouslySetInnerHTML={{ __html: processedContent }}
            />

            {/* Bottom CTA */}
            <div className="mt-20 p-8 bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to implement these strategies?</h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Our VDC team can help you transition from traditional drafting to AI-assisted workflows today.
              </p>
              <button className="bg-tdc-cyan text-black px-8 py-4 font-bold tracking-widest hover:bg-white transition-colors">
                SCHEDULE A CONSULTATION
              </button>
            </div>
          </div>

          {/* RIGHT SIDEBAR: Share & Tags (Desktop) */}
          <div className="lg:col-span-2 hidden lg:block order-3">
             <div className="sticky top-32">
               <h4 className="text-xs font-bold text-gray-500 mb-6 tracking-widest">SHARE</h4>
               <div className="flex flex-col gap-4 mb-12">
                 <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-tdc-cyan hover:text-black transition-colors">
                   <Linkedin size={18} />
                 </button>
                 <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-tdc-cyan hover:text-black transition-colors">
                   <Twitter size={18} />
                 </button>
                 <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-tdc-cyan hover:text-black transition-colors">
                   <Share2 size={18} />
                 </button>
               </div>

               <h4 className="text-xs font-bold text-gray-500 mb-4 tracking-widest">TAGS</h4>
               <div className="flex flex-wrap gap-2">
                 {post.tags.map(tag => (
                   <span key={tag} className="text-xs text-gray-400 border border-white/10 px-2 py-1 hover:border-tdc-cyan cursor-pointer transition-colors">
                     #{tag}
                   </span>
                 ))}
               </div>
             </div>
          </div>

        </div>

        
        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <div className="max-w-7xl mx-auto px-6 pb-20 border-t border-white/10 pt-20">
            <h3 className="text-2xl font-bold text-white mb-8 tracking-tight">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(relatedPost => (
                <ArticleCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        )}
      </article>

      <Footer />
    </div>
  );
};