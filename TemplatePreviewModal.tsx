// src/app/templates/components/TemplatePreviewModal.tsx

import React from 'react';
import { X, CheckCircle, ArrowRight, Crown } from 'lucide-react';
import EnhancedResumePreview from './EnhancedResumePreview';
import { TemplateType } from '../types';
import { useRouter } from 'next/navigation';

interface TemplatePreviewModalProps {
  template: TemplateType | null;
  isPremium: boolean;
  onClose: () => void;
}

const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({ template, isPremium, onClose }) => {
  const router = useRouter();
  if (!template) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden border border-gray-800">
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div>
            <h3 className="text-2xl font-bold text-white">{template.name}</h3>
            <p className="text-gray-400 mt-1">{template.description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-8 p-6">
          <div className="bg-gray-800 rounded-2xl p-8 flex items-center justify-center">
            <div className="w-full max-w-sm h-96 bg-white rounded-xl shadow-xl overflow-hidden">
              <EnhancedResumePreview template={template} />
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">ATS Performance</h4>
              <div className="bg-green-900/30 rounded-xl p-4 border border-green-700/50">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-gray-300">ATS Score</span>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-green-400">{template.atsScore}</span>
                    <span className="text-gray-500">/100</span>
                  </div>
                </div>
                <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-500"
                    style={{ width: `${template.atsScore}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Key Features</h4>
              <div className="grid grid-cols-2 gap-3">
                {template.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Best For</h4>
              <div className="flex flex-wrap gap-2">
                {template.industries.map((industry, idx) => (
                  <span key={idx} className="px-3 py-1 bg-teal-900/30 text-teal-300 rounded-full text-sm border border-teal-700/50">
                    {industry}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => {
                  onClose();
                  if (template.isPremium && !isPremium) {
                    router.push('/pricing');
                  } else {
                    router.push(`/builder?template=${template.id}`);
                  }
                }}
                className={`flex-1 font-semibold py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 ${
                  template.isPremium && !isPremium
                    ? 'bg-gradient-to-r from-pink-600 to-pink-500 text-white'
                    : 'bg-gradient-to-r from-teal-600 to-amber-600 text-white'
                }`}
              >
                {template.isPremium && !isPremium ? (
                  <>
                    <Crown className="w-5 h-5" />
                    Upgrade to Use
                  </>
                ) : (
                  <>
                    Use This Template
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
              <button 
                onClick={onClose}
                className="px-6 py-3 border-2 border-gray-700 rounded-xl font-medium text-gray-300 hover:bg-gray-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreviewModal;