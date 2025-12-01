export interface City {
  id: string;
  name: string;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}

export enum AiStatus {
  IDLE = 'IDLE',
  THINKING = 'THINKING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

import React, { ReactNode } from "react";

export interface ProjectEstimate {
  serviceRecommended: string;
  estimatedDuration: string;
  complexityLevel: string;
  keyConsiderations: string[];
}

export interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface HardwareCardProps {
  title: string;
  description: string;
  model: string;
  image: string;
  features: string[];
}

export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: Category;
  tags: string[];
  image: string;
  author: Author;
}

export type Category = 'All' | 'Technology' | 'BIM' | 'Sustainability' | 'Case Studies';
