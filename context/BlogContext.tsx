import React, { createContext, useContext, useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { blogPosts as initialData } from '../data/blogData';

interface BlogContextType {
  posts: BlogPost[];
  getPost: (slug: string) => BlogPost | undefined;
  savePost: (post: BlogPost) => void;
  deletePost: (id: string) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    // Load from local storage with versioning to ensure fresh content on deployment
    const saved = localStorage.getItem('tdc_blog_posts_v1');
    return saved ? JSON.parse(saved) : initialData;
  });

  useEffect(() => {
    localStorage.setItem('tdc_blog_posts_v1', JSON.stringify(posts));
  }, [posts]);

  const getPost = (slug: string) => {
    return posts.find(p => p.slug === slug);
  };

  const savePost = (post: BlogPost) => {
    setPosts(prev => {
      const exists = prev.findIndex(p => p.id === post.id);
      if (exists >= 0) {
        const newPosts = [...prev];
        newPosts[exists] = post;
        return newPosts;
      } else {
        return [post, ...prev];
      }
    });
  };

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <BlogContext.Provider value={{ posts, getPost, savePost, deletePost }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};
