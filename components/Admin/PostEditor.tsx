import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Save, ArrowLeft, Eye, Code, Download, FileDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { useBlog } from '../../context/BlogContext';
import { BlogPost, Category } from '../../types';

const PostEditor: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { getPost, savePost } = useBlog();
  const isNew = !slug || slug === 'new';

  const [formData, setFormData] = useState<BlogPost>({
    id: '',
    slug: '',
    title: '',
    date: new Date().toISOString().split('T')[0],
    author: {
      name: 'TDC Team',
      role: 'Editor',
      avatar: 'https://ui-avatars.com/api/?name=TDC+Team'
    },
    category: 'Technology',
    tags: [],
    image: '',
    excerpt: '',
    content: '',
    readTime: '5 min read'
  });

  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

  useEffect(() => {
    if (!isNew && slug) {
      const post = getPost(slug);
      if (post) {
        setFormData(post);
      }
    } else if (isNew) {
      // Generate ID for new post
      setFormData(prev => ({ ...prev, id: Date.now().toString() }));
    }
  }, [slug, isNew, getPost]);

  const handleChange = (field: keyof BlogPost, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAuthorChange = (field: 'name' | 'role' | 'avatar', value: string) => {
    setFormData(prev => ({
      ...prev,
      author: { ...prev.author, [field]: value }
    }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map(t => t.trim());
    setFormData(prev => ({ ...prev, tags }));
  };

  const generateMDX = () => {
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
    return frontmatter;
  };

  const handleExport = () => {
    const mdx = generateMDX();
    const blob = new Blob([mdx], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.slug || 'untitled'}.mdx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSave = () => {
    if (!formData.title || !formData.slug) {
      alert('Please provide at least a Title and Slug.');
      return;
    }
    
    // Calculate read time roughly
    const words = formData.content.split(/\s+/).length;
    const readTime = `${Math.ceil(words / 200)} min read`;
    
    const postToSave = { ...formData, readTime };
    savePost(postToSave);
    alert('Post saved successfully! (Local Storage)');
    
    if (isNew) {
      navigate(`/admin/edit/${formData.slug}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col">
      {/* Top Bar */}
      <div className="border-b border-white/10 bg-[#0a0a0a] sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-gray-400 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <span className="font-bold">{isNew ? 'New Post' : 'Edit Post'}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex bg-white/5 rounded p-1 mr-4">
              <button 
                onClick={() => setActiveTab('editor')}
                className={`px-3 py-1 rounded text-xs font-bold flex items-center gap-2 transition-colors ${activeTab === 'editor' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
              >
                <Code className="w-3 h-3" /> EDITOR
              </button>
              <button 
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 rounded text-xs font-bold flex items-center gap-2 transition-colors ${activeTab === 'preview' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
              >
                <Eye className="w-3 h-3" /> PREVIEW
              </button>
            </div>
            
            <button 
              onClick={handleExport}
              className="bg-white/10 text-white px-4 py-2 rounded text-sm font-bold hover:bg-white/20 transition-colors flex items-center gap-2 mr-2"
              title="Download MDX file"
              style={{ display: 'flex', visibility: 'visible', opacity: 1, zIndex: 9999 }}
            >
              <FileDown className="w-4 h-4" /> EXPORT
            </button>

            <button 
              onClick={handleSave}
              className="bg-cyan-500 text-black px-6 py-2 rounded text-sm font-bold hover:bg-white transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(0,229,255,0.3)] z-50"
              style={{ backgroundColor: '#00E5FF', color: 'black', display: 'flex', visibility: 'visible', opacity: 1, zIndex: 9999 }}
            >
              <Save className="w-4 h-4" /> SAVE
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Settings */}
        <div className="w-80 border-r border-white/10 bg-[#111] overflow-y-auto p-6 space-y-6">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Download className="w-3 h-3" /> Post Settings
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">URL Slug</label>
              <input 
                type="text" 
                value={formData.slug}
                onChange={(e) => handleChange('slug', e.target.value)}
                className="w-full bg-black border border-white/10 rounded px-3 py-2 text-sm focus:border-tdc-cyan outline-none transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-xs text-gray-400 mb-1">Category</label>
              <select 
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full bg-black border border-white/10 rounded px-3 py-2 text-sm focus:border-tdc-cyan outline-none transition-colors"
              >
                <option>Technology</option>
                <option>BIM</option>
                <option>Sustainability</option>
                <option>Case Studies</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">Tags (comma separated)</label>
              <input 
                type="text" 
                value={formData.tags.join(', ')}
                onChange={handleTagsChange}
                className="w-full bg-black border border-white/10 rounded px-3 py-2 text-sm focus:border-tdc-cyan outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">Featured Image URL</label>
              <input 
                type="text" 
                value={formData.image}
                onChange={(e) => handleChange('image', e.target.value)}
                className="w-full bg-black border border-white/10 rounded px-3 py-2 text-sm focus:border-tdc-cyan outline-none transition-colors"
              />
              {formData.image && (
                <img src={formData.image} alt="Preview" className="mt-2 rounded w-full h-32 object-cover opacity-50" />
              )}
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">Excerpt</label>
              <textarea 
                value={formData.excerpt}
                onChange={(e) => handleChange('excerpt', e.target.value)}
                rows={4}
                className="w-full bg-black border border-white/10 rounded px-3 py-2 text-sm focus:border-tdc-cyan outline-none resize-none transition-colors"
              />
            </div>

            <div className="pt-4 border-t border-white/10">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Author Details</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Name</label>
                  <input 
                    type="text" 
                    value={formData.author.name}
                    onChange={(e) => handleAuthorChange('name', e.target.value)}
                    className="w-full bg-black border border-white/10 rounded px-3 py-2 text-sm focus:border-tdc-cyan outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Role</label>
                  <input 
                    type="text" 
                    value={formData.author.role}
                    onChange={(e) => handleAuthorChange('role', e.target.value)}
                    className="w-full bg-black border border-white/10 rounded px-3 py-2 text-sm focus:border-tdc-cyan outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Avatar URL</label>
                  <input 
                    type="text" 
                    value={formData.author.avatar}
                    onChange={(e) => handleAuthorChange('avatar', e.target.value)}
                    className="w-full bg-black border border-white/10 rounded px-3 py-2 text-sm focus:border-tdc-cyan outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col bg-[#0a0a0a] overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <input 
              type="text" 
              placeholder="Post Title" 
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full bg-transparent text-4xl font-bold placeholder-gray-600 focus:outline-none"
            />
          </div>
          
          <div className="flex-1 overflow-y-auto relative">
            {activeTab === 'editor' ? (
              <textarea 
                value={formData.content}
                onChange={(e) => handleChange('content', e.target.value)}
                placeholder="Start writing your story... Use Markdown."
                className="w-full h-full bg-transparent p-6 text-lg font-mono text-gray-300 focus:outline-none resize-none"
              />
            ) : (
              <div className="prose prose-invert prose-lg max-w-3xl mx-auto p-12">
                <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
                  {formData.content}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostEditor;
