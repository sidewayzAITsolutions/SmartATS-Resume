   'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Briefcase, Code, Palette, Building, Globe, GraduationCap, Shield, TrendingUp, Star, Crown, Eye, ArrowRight, Zap } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { usePremiumStatus } from '@/hooks/usePremiumStatus';
import UnifiedNavigation from '@/components/UnifiedNavigation';
import PremiumUpgradeBanner from './components/PremiumUpgradeBanner';
import EnhancedResumePreview from './components/EnhancedResumePreview';
import TemplatePreviewModal from './components/TemplatePreviewModal';
import { templates } from './templateData';
import { TemplateType } from './types';

const categories = [
  { id: 'all', name: 'All Templates', icon: <FileText className="w-4 h-4" /> },
  { id: 'professional', name: 'Professional', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'technical', name: 'Technical', icon: <Code className="w-4 h-4" /> },
  { id: 'creative', name: 'Creative', icon: <Palette className="w-4 h-4" /> },
  { id: 'executive', name: 'Executive', icon: <Building className="w-4 h-4" /> },
  { id: 'industry', name: 'Industry Specific', icon: <Globe className="w-4 h-4" /> },
  { id: 'entry-level', name: 'Entry Level', icon: <GraduationCap className="w-4 h-4" /> }
];

const EnhancedTemplatesPage = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showPreview, setShowPreview] = useState<TemplateType | null>(null);
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

  const { isPremium } = usePremiumStatus();

  const filteredTemplates = selectedCategory === 'all'
    ? templates
    : templates.filter(t => t.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black relative">
      <UnifiedNavigation />
      {!isPremium && (
        <section className="py-6 px-6">
          <div className="max-w-5xl mx-auto">
            <PremiumUpgradeBanner />
          </div>
        </section>
      )}

      {/* Background Logo */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-5">
          <img src="/horse-logo.png" alt="" className="w-full h-full object-contain" />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 via-amber-900/20 to-pink-900/20 opacity-50"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-900/50 border border-teal-700/50 rounded-full mb-6">
            <Shield className="w-4 h-4 text-teal-400" />
            <span className="text-sm font-medium text-teal-300">
              All Templates Pass 98.4% of ATS Systems
            </span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Choose Your Perfect
            <span className="block mt-2 bg-gradient-to-r from-teal-400 to-amber-400 bg-clip-text text-transparent">
              ATS-Beating Template
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Professional templates designed to pass ATS filters and impress recruiters. 
            Each template is tested against Workday, Taleo, iCIMS, and 50+ ATS systems.
          </p>
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-400 mb-1">98%</div>
              <div className="text-sm text-gray-500">ATS Pass Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400 mb-1">21+</div>
              <div className="text-sm text-gray-500">Job-Specific Templates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-1">3x</div>
              <div className="text-sm text-gray-500">More Interviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-[73px] z-20 bg-gray-900/90 backdrop-blur-md border-b border-gray-800 py-4 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-teal-600 to-amber-600 text-white shadow-lg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                }`}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className={`group relative rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                  template.isPremium
                    ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-2 border-gradient-to-r from-amber-400 to-orange-400 hover:border-amber-300 hover:shadow-amber-400/20'
                    : 'bg-gray-900 border border-gray-800'
                }`}
                onMouseEnter={() => setHoveredTemplate(template.id)}
                onMouseLeave={() => setHoveredTemplate(null)}
              >
                {/* Premium Glow Effect */}
                {template.isPremium && (
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 via-orange-400/5 to-amber-400/10 pointer-events-none"></div>
                )}
                {/* Premium Badge */}
                {template.isPremium && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-gradient-to-r from-amber-400 to-orange-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                      <Crown className="w-4 h-4" />
                      PREMIUM
                    </div>
                  </div>
                )}
                {/* Popularity Badge */}
                {template.popularityRank <= 3 && (
                  <div className="absolute top-4 left-4 z-10">
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Popular
                    </div>
                  </div>
                )}
                {/* Template Preview */}
                <div 
                  className="h-64 relative overflow-hidden cursor-pointer bg-gray-800"
                  onClick={() => setShowPreview(template)}
                >
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="w-full max-w-[200px] h-full bg-white rounded-lg shadow-xl transform transition-transform duration-300"
                      style={{ 
                        transform: hoveredTemplate === template.id ? 'scale(1.05) rotate(-1deg)' : 'scale(1)'
                      }}
                    >
                      <EnhancedResumePreview template={template} />
                    </div>
                  </div>
                  {/* Hover Overlay */}
                  <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
                    hoveredTemplate === template.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <button className="bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transform hover:scale-105 transition-transform">
                      <Eye className="w-5 h-5" />
                      Preview Template
                    </button>
                  </div>
                </div>
                {/* Template Info */}
                <div className={`p-6 ${template.isPremium ? 'bg-gradient-to-b from-gray-800/50 to-gray-900/50' : ''}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className={`text-xl font-bold mb-1 ${template.isPremium ? 'text-amber-100' : 'text-white'}`}>
                        {template.name}
                        {template.isPremium && <span className="ml-2 text-amber-400">✨</span>}
                      </h3>
                      <p className={`text-sm ${template.isPremium ? 'text-amber-200/80' : 'text-gray-400'}`}>
                        {template.description}
                      </p>
                    </div>
                  </div>
                  <div className={`grid grid-cols-3 gap-3 mb-4 ${template.isPremium ? 'bg-amber-400/10 rounded-lg p-3 border border-amber-400/20' : ''}`}>
                    <div className="text-center">
                      <div className={`text-sm font-bold ${template.isPremium ? 'text-amber-300' : 'text-white'}`}>
                        {template.atsScore}%
                      </div>
                      <div className={`text-xs ${template.isPremium ? 'text-amber-200/70' : 'text-gray-500'}`}>
                        ATS Score
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className={`w-3 h-3 fill-amber-400 ${template.isPremium ? 'text-amber-300' : 'text-amber-400'}`} />
                        <span className={`text-sm font-bold ${template.isPremium ? 'text-amber-300' : 'text-white'}`}>
                          {template.rating}
                        </span>
                      </div>
                      <div className={`text-xs ${template.isPremium ? 'text-amber-200/70' : 'text-gray-500'}`}>
                        Rating
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={`text-sm font-bold ${template.isPremium ? 'text-amber-300' : 'text-white'}`}>
                        {(template.downloads / 1000).toFixed(1)}k
                      </div>
                      <div className={`text-xs ${template.isPremium ? 'text-amber-200/70' : 'text-gray-500'}`}>
                        Uses
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.features.slice(0, 3).map((feature, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-3 py-1.5 rounded-full border font-medium ${
                          template.isPremium
                            ? 'bg-amber-400/20 text-amber-200 border-amber-400/30'
                            : 'bg-gray-800 text-gray-300 border-gray-700'
                        }`}
                      >
                        {template.isPremium && '✨ '}{feature}
                      </span>
                    ))}
                  </div>
                  {template.isPremium && (
                    <div className="mb-4 p-3 bg-amber-400/10 rounded-lg border border-amber-400/20">
                      <div className="flex items-center gap-2 text-amber-300 text-sm font-medium">
                        <Crown className="w-4 h-4" />
                        Premium Benefits
                      </div>
                      <div className="text-xs text-amber-200/80 mt-1">
                        AI-optimized • Advanced layouts • Priority support
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      if (template.isPremium && !isPremium) {
                        router.push('/pricing');
                      } else {
                        router.push(`/builder?template=${template.id}`);
                      }
                    }}
                    className={`w-full py-4 rounded-xl font-bold transition-all duration-200 flex items-center justify-center gap-2 text-lg ${
                      template.isPremium
                        ? 'bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 text-gray-900 hover:shadow-xl hover:shadow-amber-400/25 transform hover:scale-[1.02]'
                        : 'bg-gradient-to-r from-teal-600 to-amber-600 text-white hover:shadow-lg'
                    }`}
                  >
                    {template.isPremium && !isPremium ? (
                      <>
                        <Crown className="w-5 h-5" />
                        Upgrade for $19.99/mo
                      </>
                    ) : (
                      <>
                        {template.isPremium && <Crown className="w-5 h-5" />}
                        Use Template
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-teal-900/20 to-amber-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Can't Find the Perfect Template?
          </h2>
          <p className="text-xl text-gray-300 mb-6">
            Start with our smart builder and create a custom ATS-optimized resume
          </p>
          <button 
            onClick={() => router.push('/builder')}
            className="bg-gradient-to-r from-teal-600 to-amber-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            <Zap className="w-5 h-5" />
            Start Smart Builder
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Template Preview Modal */}
      <TemplatePreviewModal
        template={showPreview}
        isPremium={isPremium}
        onClose={() => setShowPreview(null)}
      />
    </div>
  );
};

export default EnhancedTemplatesPage;
 
         