import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, User, Share2, Linkedin, Twitter, Mail } from 'lucide-react';
import { getPostBySlug, getRelatedPosts } from '../../utils/blog';
import Header from '../Header';
import Footer from '../Footer';
import { LOCATIONS_DATA } from '../../App';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const post = slug ? getPostBySlug(slug) : undefined;
  const relatedPosts = post ? getRelatedPosts(post.slug, post.tags) : [];

  useEffect(() => {
    if (!post) {
      // navigate('/blog'); // Optional: redirect if not found
    }
    window.scrollTo(0, 0);
  }, [post, navigate]);

  if (!post) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-brand-accent hover:underline">Return to Blog</Link>
        </div>
      </div>
    );
  }

  // Calculate read time (rough estimate)
  const readTime = Math.ceil(post.content.split(' ').length / 200);

  return (
    <div className="bg-brand-dark min-h-screen text-white selection:bg-brand-accent selection:text-black font-sans">
      <Helmet>
        <title>{post.title} | TDC Architecture Intelligence</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.thumbnail} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <Header locations={LOCATIONS_DATA} onLocationSelect={() => {}} />

      {/* Hero */}
      <div className="relative h-[60vh] min-h-[500px]">
        <img 
          src={post.thumbnail} 
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full px-6 md:px-12 lg:px-24 pb-16">
          <div className="max-w-4xl mx-auto">
            <Link to="/blog" className="inline-flex items-center text-brand-accent hover:text-white mb-6 transition-colors font-medium">
              <ArrowLeft className="w-4 h-4 mr-2" />
              BACK TO INTELLIGENCE
            </Link>
            
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm md:text-base text-gray-300">
              <div className="flex items-center gap-2">
                <img 
                  src={`https://ui-avatars.com/api/?name=${post.author}&background=random`} 
                  alt={post.author}
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium text-white">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString()}
              </div>
              <div className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider">
                {readTime} min read
              </div>
              <div className="px-3 py-1 bg-brand-accent/20 text-brand-accent rounded-full text-xs font-bold uppercase tracking-wider">
                {post.category}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar (TOC & Share) */}
        <div className="lg:col-span-3 hidden lg:block">
          <div className="sticky top-32 space-y-12">
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Contents</h4>
              <nav className="space-y-2 text-sm text-gray-400">
                {/* Simple TOC generation based on headers in content would go here. 
                    For now, static placeholders or a library like 'remark-toc' could be used. 
                    Since we are rendering raw MD, we'd need to parse it. 
                    Hardcoding a simple example for visual fidelity. */}
                 {post.content.match(/^##\s+(.+)$/gm)?.map((header, i) => (
                    <a key={i} href="#" className="block hover:text-brand-accent transition-colors">
                      {header.replace(/^##\s+/, '')}
                    </a>
                 ))}
              </nav>
            </div>
            
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Share</h4>
              <div className="flex flex-col gap-4">
                <button className="p-2 bg-white/5 rounded-full hover:bg-brand-accent hover:text-black transition-colors w-10 h-10 flex items-center justify-center">
                  <Linkedin className="w-4 h-4" />
                </button>
                <button className="p-2 bg-white/5 rounded-full hover:bg-brand-accent hover:text-black transition-colors w-10 h-10 flex items-center justify-center">
                  <Twitter className="w-4 h-4" />
                </button>
                <button className="p-2 bg-white/5 rounded-full hover:bg-brand-accent hover:text-black transition-colors w-10 h-10 flex items-center justify-center">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
               <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Tags</h4>
               <div className="flex flex-wrap gap-2">
                 {post.tags.map(tag => (
                   <span key={tag} className="px-2 py-1 bg-white/5 text-xs text-gray-400 rounded border border-white/10">
                     #{tag}
                   </span>
                 ))}
               </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-9">
          <article className="prose prose-invert prose-lg max-w-none 
            prose-headings:font-display prose-headings:font-bold 
            prose-a:text-brand-accent prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-xl prose-img:shadow-2xl
            prose-blockquote:border-l-brand-accent prose-blockquote:bg-white/5 prose-blockquote:p-6 prose-blockquote:not-italic prose-blockquote:rounded-r-lg
            prose-code:text-brand-accent prose-code:bg-white/10 prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-[#1a1a1a] prose-pre:border prose-pre:border-white/10
          ">
            <ReactMarkdown 
              rehypePlugins={[rehypeRaw]} 
              remarkPlugins={[remarkGfm]}
            >
              {post.content}
            </ReactMarkdown>
          </article>

          {/* Mobile Share (Visible only on small screens) */}
          <div className="lg:hidden mt-12 pt-8 border-t border-white/10">
            <h4 className="text-sm font-bold mb-4">Share this article</h4>
            <div className="flex gap-4">
              <button className="p-3 bg-white/5 rounded-full"><Linkedin className="w-5 h-5" /></button>
              <button className="p-3 bg-white/5 rounded-full"><Twitter className="w-5 h-5" /></button>
              <button className="p-3 bg-white/5 rounded-full"><Mail className="w-5 h-5" /></button>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-24 pt-12 border-t border-white/10">
              <h3 className="text-2xl font-display font-bold mb-8">Read Next</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedPosts.map((related) => (
                  <Link key={related.slug} to={`/blog/${related.slug}`} className="group block">
                    <div className="aspect-video rounded-lg overflow-hidden mb-4">
                      <img 
                        src={related.thumbnail} 
                        alt={related.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h4 className="text-lg font-bold group-hover:text-brand-accent transition-colors mb-2">
                      {related.title}
                    </h4>
                    <p className="text-sm text-gray-400 line-clamp-2">{related.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPost;
