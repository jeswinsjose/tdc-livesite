import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Layout, Eye, Image as ImageIcon, Tag, User, FileText, List, Download } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { BlogPost } from '../types';
import { RichTextEditor } from '../components/RichTextEditor';

export const BlogEditor: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { getPost, savePost } = useBlog();
  
  // Ref for the scrollable container in Preview mode
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  const emptyPost: BlogPost = {
    id: crypto.randomUUID(),
    slug: '',
    title: '',
    excerpt: '',
    content: '<p>Start writing your story... Use <b>Heading 2</b> and <b>Heading 3</b> to automatically generate the Table of Contents.</p>',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    readTime: '5 min read',
    category: 'Technology',
    tags: [],
    image: 'https://picsum.photos/800/600',
    author: {
      name: 'TDC Team',
      role: 'Editor',
      avatar: 'https://picsum.photos/100/100'
    }
  };

  const [formData, setFormData] = useState<BlogPost>(emptyPost);
  const [previewToc, setPreviewToc] = useState<Array<{ id: string; text: string; level: number }>>([]);
  const [activePreviewId, setActivePreviewId] = useState<string>('');

  // Live calculation of TOC for sidebar (Structure view)
  const detectedToc = useMemo(() => {
    if (!formData.content) return [];
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(formData.content, 'text/html');
      const headings = doc.querySelectorAll('h2, h3');
      const items: Array<{ text: string; level: number }> = [];
      headings.forEach((h) => {
        items.push({
          text: h.textContent || 'Untitled',
          level: parseInt(h.tagName.substring(1))
        });
      });
      return items;
    } catch (e) {
      return [];
    }
  }, [formData.content]);

  useEffect(() => {
    if (slug) {
      const existingPost = getPost(slug);
      if (existingPost) {
        setFormData(existingPost);
      }
    }
  }, [slug, getPost]);

  // Effect to generate IDs in Preview Mode
  useEffect(() => {
    if (activeTab === 'preview') {
      const timer = setTimeout(() => {
        const contentElement = document.getElementById('preview-article-content');
        if (!contentElement) return;

        const headings = contentElement.querySelectorAll('h2, h3');
        const tocItems: Array<{ id: string; text: string; level: number }> = [];

        headings.forEach((heading, index) => {
           const text = heading.textContent || '';
           const slugId = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || `section-${index}`;
           heading.id = slugId;
           // In preview container, scroll margin might not work as expected with custom scroll logic, but good practice
           heading.classList.add('scroll-mt-32');
           
           tocItems.push({
             id: slugId,
             text: text,
             level: parseInt(heading.tagName.substring(1))
           });
        });
        setPreviewToc(tocItems);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeTab, formData.content]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContentChange = (html: string) => {
    setFormData(prev => ({ ...prev, content: html }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    setFormData(prev => ({ ...prev, tags }));
  };

  const handleSave = () => {
    if (!formData.title || !formData.slug) {
      alert('Title and Slug are required');
      return;
    }
    savePost(formData);
    navigate('/admin');
  };

  const scrollToPreviewSection = (id: string) => {
    const el = document.getElementById(id);
    const container = scrollContainerRef.current;
    
    if (el && container) {
      // Calculate position relative to the container
      const containerRect = container.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      // Offset = element's position relative to container + current scroll - top padding
      const offset = elRect.top - containerRect.top + container.scrollTop - 40;
      
      container.scrollTo({ top: offset, behavior: 'smooth' });
      setActivePreviewId(id);
    }
  };

  const handleExport = () => {
    const frontmatter = `---
title: "${formData.title}"
slug: "${formData.slug}"
date: "${formData.date}"
author: "${formData.author.name}"
category: "${formData.category}"
tags: [${formData.tags.map(t => `"${t}"`).join(', ')}]
thumbnail: "${formData.image}"
excerpt: "${formData.excerpt}"
---

${formData.content}`;
    
    const blob = new Blob([frontmatter], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.slug || 'untitled'}.mdx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col">
      {/* Top Bar */}
      <div className="h-16 border-b border-white/10 bg-[#050505] flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/admin')} className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div className="h-6 w-px bg-white/10"></div>
          <span className="text-sm font-bold text-gray-300">
            {slug ? 'Edit Post' : 'New Post'}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* View Toggles */}
          <div className="flex bg-[#121212] rounded-lg p-1 border border-white/10">
            <button 
              onClick={() => setActiveTab('edit')}
              className={`px-3 py-1.5 text-xs font-bold rounded flex items-center gap-2 transition-all ${activeTab === 'edit' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}
            >
              <Layout size={14} /> EDITOR
            </button>
            <button 
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 text-xs font-bold rounded flex items-center gap-2 transition-all ${activeTab === 'preview' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}
            >
              <Eye size={14} /> PREVIEW
            </button>
          </div>
          
          <button 
            onClick={handleExport}
            className="bg-white/10 text-white px-4 py-2 text-xs font-bold tracking-widest hover:bg-white/20 transition-colors flex items-center gap-2 rounded-sm"
            title="Download MDX"
          >
            <Download size={14} /> EXPORT
          </button>

          <button 
            onClick={handleSave}
            className="bg-cyan-500 text-black px-6 py-2 text-xs font-bold tracking-widest hover:bg-white transition-colors flex items-center gap-2 rounded-sm shadow-[0_0_15px_rgba(0,229,255,0.3)] z-50"
            style={{ backgroundColor: '#00E5FF', color: 'black', display: 'flex', visibility: 'visible', opacity: 1 }}
          >
            <Save size={14} /> SAVE
          </button>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Editor / Preview Pane */}
        <div 
          className="flex-1 overflow-y-auto custom-scrollbar relative" 
          ref={scrollContainerRef}
        >
          {activeTab === 'edit' ? (
            <div className="max-w-4xl mx-auto p-8 lg:p-12 pb-32">
              {/* Title Input */}
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Post Title"
                className="w-full bg-transparent text-5xl font-bold text-white placeholder-gray-700 border-none focus:ring-0 px-0 mb-6 leading-tight"
                autoComplete="off"
              />
              
              {/* Excerpt */}
              <div className="mb-8 group">
                 <textarea
                   name="excerpt"
                   value={formData.excerpt}
                   onChange={handleInputChange}
                   placeholder="Add a short excerpt or summary..."
                   rows={2}
                   className="w-full bg-transparent border-l-2 border-transparent group-focus-within:border-tdc-cyan pl-4 text-xl text-gray-400 focus:outline-none resize-none transition-colors"
                 />
              </div>

              {/* Rich Text Editor */}
              <div className="mt-8">
                 <RichTextEditor 
                   value={formData.content} 
                   onChange={handleContentChange}
                 />
              </div>
            </div>
          ) : (
            /* Preview Pane (Matches BlogPost.tsx layout) */
            <div className="bg-[#050505] min-h-full">
              {/* Hero */}
              <div className="relative h-[50vh] w-full mb-12">
                <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute bottom-0 left-0 w-full p-8 lg:p-12">
                   <div className="max-w-7xl mx-auto px-6">
                      <span className="bg-tdc-cyan text-black text-xs font-bold px-2 py-1 mb-4 inline-block">{formData.category}</span>
                      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">{formData.title || 'Untitled Post'}</h1>
                      <div className="flex items-center gap-4 text-sm text-gray-300">
                        <span>{formData.author.name}</span>
                        <span>•</span>
                        <span>{formData.date}</span>
                      </div>
                   </div>
                </div>
              </div>

              {/* 3-Col Layout Preview */}
              <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20">
                {/* Left TOC */}
                <div className="lg:col-span-3 hidden lg:block">
                  <div className="sticky top-8">
                    <h4 className="text-xs font-bold text-gray-500 mb-6 tracking-widest flex items-center gap-2">
                      <List size={14} /> CONTENTS
                    </h4>
                    
                    {/* Semrush-style TOC Preview */}
                    <div className="relative">
                      <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/10"></div>
                      <ul className="space-y-4">
                        {previewToc.map((item) => (
                          <li key={item.id} className={`relative ${item.level === 3 ? 'ml-4' : ''}`}>
                             {activePreviewId === item.id && (
                                <div className="absolute -left-[1px] top-0 bottom-0 w-[2px] bg-tdc-cyan shadow-[0_0_8px_rgba(0,229,255,0.6)] rounded-full" 
                                     style={{ left: item.level === 3 ? '-17px' : '-1px' }} 
                                />
                             )}
                            <button 
                              onClick={() => scrollToPreviewSection(item.id)}
                              className={`text-sm text-left transition-all duration-200 pl-4 block w-full leading-relaxed ${
                                activePreviewId === item.id 
                                  ? 'text-tdc-cyan font-bold translate-x-1' 
                                  : 'text-gray-500 hover:text-white hover:translate-x-1'
                              }`}
                            >
                              {item.text}
                            </button>
                          </li>
                        ))}
                        {previewToc.length === 0 && <li className="pl-4 italic text-sm text-gray-600">Add headings...</li>}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-7">
                  <p className="text-xl text-gray-200 leading-relaxed mb-12 font-light border-l-2 border-tdc-cyan pl-6">
                    {formData.excerpt || 'No excerpt provided.'}
                  </p>
                  <div 
                    id="preview-article-content"
                    className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:scroll-mt-32 prose-a:text-tdc-cyan prose-img:rounded-lg"
                    dangerouslySetInnerHTML={{ __html: formData.content || '<p>Start writing...</p>' }}
                  />
                </div>

                {/* Right Share */}
                <div className="lg:col-span-2 hidden lg:block">
                   <div className="sticky top-8">
                     <h4 className="text-xs font-bold text-gray-500 mb-6 tracking-widest">SHARE</h4>
                     <div className="flex gap-2 mb-8">
                        {/* Mock icons */}
                        <div className="w-8 h-8 rounded-full bg-white/10"></div>
                        <div className="w-8 h-8 rounded-full bg-white/10"></div>
                        <div className="w-8 h-8 rounded-full bg-white/10"></div>
                     </div>
                     <h4 className="text-xs font-bold text-gray-500 mb-4 tracking-widest">TAGS</h4>
                     <div className="flex flex-wrap gap-2">
                       {formData.tags.map(tag => (
                         <span key={tag} className="text-xs text-gray-400 border border-white/10 px-2 py-1">#{tag}</span>
                       ))}
                     </div>
                   </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Settings (Persistent) */}
        <div className="w-80 border-l border-white/10 bg-[#0A0A0A] overflow-y-auto p-6 hidden xl:block">
          
          <div className="flex items-center gap-2 mb-6 text-gray-400">
            <FileText size={16} />
            <h3 className="text-xs font-bold uppercase tracking-widest">Post Settings</h3>
          </div>
          
          <div className="space-y-6">
            <div className="group">
              <label className="text-[10px] font-bold text-gray-500 mb-2 block uppercase tracking-wider">URL Slug</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                className="w-full bg-[#121212] border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-tdc-cyan"
              />
            </div>

            <div className="group">
              <label className="text-[10px] font-bold text-gray-500 mb-2 block uppercase tracking-wider">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full bg-[#121212] border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-tdc-cyan"
              >
                <option value="Technology">Technology</option>
                <option value="BIM">BIM</option>
                <option value="Sustainability">Sustainability</option>
                <option value="Case Studies">Case Studies</option>
              </select>
            </div>

            <div className="group">
              <label className="text-[10px] font-bold text-gray-500 mb-2 block uppercase tracking-wider">Tags</label>
              <input
                type="text"
                value={formData.tags.join(', ')}
                onChange={handleTagsChange}
                placeholder="Comma separated"
                className="w-full bg-[#121212] border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-tdc-cyan"
              />
            </div>

            <div className="group">
              <label className="text-[10px] font-bold text-gray-500 mb-2 block uppercase tracking-wider">Featured Image</label>
              <div className="relative">
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full bg-[#121212] border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-tdc-cyan mb-2"
                />
                {formData.image && (
                  <div className="h-24 w-full rounded overflow-hidden border border-white/10">
                    <img src={formData.image} alt="Cover" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            <hr className="border-white/10" />

            {/* Structure Preview for Editor */}
            <div>
              <div className="flex items-center gap-2 mb-4 text-gray-400">
                <List size={16} />
                <h3 className="text-xs font-bold uppercase tracking-widest">Structure</h3>
              </div>
              <div className="bg-[#121212] border border-white/10 rounded p-4">
                 {detectedToc.length > 0 ? (
                   <ul className="space-y-2">
                     {detectedToc.map((item, i) => (
                       <li key={i} className={`text-xs text-gray-400 ${item.level === 3 ? 'pl-3 border-l border-white/10' : ''}`}>
                         {item.text}
                       </li>
                     ))}
                   </ul>
                 ) : (
                   <p className="text-xs text-gray-600 italic">
                     Add H2 or H3 headings in the editor to generate a Table of Contents.
                   </p>
                 )}
              </div>
            </div>

            <hr className="border-white/10" />

            <div className="group">
              <label className="text-[10px] font-bold text-gray-500 mb-2 block uppercase tracking-wider">Author</label>
              <input
                type="text"
                value={formData.author.name}
                onChange={(e) => setFormData(prev => ({...prev, author: {...prev.author, name: e.target.value}}))}
                className="w-full bg-[#121212] border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-tdc-cyan mb-2"
                placeholder="Name"
              />
              <input
                type="text"
                value={formData.author.role}
                onChange={(e) => setFormData(prev => ({...prev, author: {...prev.author, role: e.target.value}}))}
                className="w-full bg-[#121212] border border-white/10 rounded px-3 py-2 text-sm text-gray-400 focus:outline-none focus:border-tdc-cyan"
                placeholder="Role"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};