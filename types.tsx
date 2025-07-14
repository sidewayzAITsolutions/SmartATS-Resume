// src/app/templates/types.ts

export interface Experience {
  title: string;
  company: string;
  years: string;
}

export interface TemplatePreview {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  experience: Experience[];
  skills: string[];
}

export interface TemplateType {
  id: string;
  name: string;
  category: string;
  description: string;
  atsScore: number;
  isPremium: boolean;
  popularityRank: number;
  downloads: number;
  rating: number;
  features: string[];
  industries: string[];
  preview: TemplatePreview;
}