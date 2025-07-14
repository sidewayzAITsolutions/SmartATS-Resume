// src/app/templates/components/EnhancedResumePreview.tsx

import React from 'react';
import { TemplateType } from '../types';

// Only a few template types shown, expand as needed
const EnhancedResumePreview: React.FC<{ template: TemplateType }> = ({ template }) => {
  const baseStyles = "h-full text-xs leading-tight overflow-hidden";

  // Modern Professional Template
  if (template.id === 'modern-pro') {
    return (
      <div className={`${baseStyles} bg-white text-gray-900 p-4 font-professional`}>
        <div className="border-l-4 border-blue-500 pl-3 mb-3">
          <div className="font-bold text-lg text-blue-900 tracking-tight leading-tight">{template.preview.name}</div>
          <div className="text-blue-600 font-medium tracking-wide">{template.preview.title}</div>
          <div className="text-gray-600 text-[10px] font-light tracking-wide">{template.preview.location} • {template.preview.phone}</div>
        </div>
        <div className="mb-3">
          <div className="font-semibold text-blue-800 text-[10px] uppercase tracking-wide mb-1 border-b border-blue-200">Summary</div>
          <div className="text-gray-700 text-[10px]">{template.preview.summary.substring(0, 80)}...</div>
        </div>
        <div className="mb-3">
          <div className="font-semibold text-blue-800 text-[10px] uppercase tracking-wide mb-1 border-b border-blue-200">Experience</div>
          {template.preview.experience.slice(0, 2).map((exp, idx) => (
            <div key={idx} className="mb-2">
              <div className="font-medium text-[10px] text-blue-900">{exp.title}</div>
              <div className="text-gray-600 text-[10px]">{exp.company} • {exp.years}</div>
            </div>
          ))}
        </div>
        <div>
          <div className="font-semibold text-blue-800 text-[10px] uppercase tracking-wide mb-1 border-b border-blue-200">Skills</div>
          <div className="grid grid-cols-2 gap-1">
            {template.preview.skills.slice(0, 6).map((skill, idx) => (
              <div key={idx} className="text-[10px] text-gray-700">• {skill}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Default template (fallback)
  return (
    <div className={`${baseStyles} bg-white text-gray-900 p-4`}>
      <div className="text-center mb-3">
        <div className="font-bold text-sm">{template.preview.name}</div>
        <div className="text-gray-600 text-xs">{template.preview.title}</div>
        <div className="text-gray-500 text-[10px] mt-0.5">
          {template.preview.location} • {template.preview.phone}
        </div>
      </div>
      <div className="mb-3">
        <div className="font-semibold text-[10px] uppercase tracking-wide mb-1">Summary</div>
        <div className="text-gray-700 text-[10px] leading-relaxed">
          {template.preview.summary.substring(0, 60)}...
        </div>
      </div>
      <div className="mb-3">
        <div className="font-semibold text-[10px] uppercase tracking-wide mb-1">Experience</div>
        {template.preview.experience.slice(0, 2).map((exp, idx) => (
          <div key={idx} className="mb-1.5">
            <div className="font-medium text-[10px]">{exp.title}</div>
            <div className="text-gray-600 text-[10px]">{exp.company} • {exp.years}</div>
          </div>
        ))}
      </div>
      <div>
        <div className="font-semibold text-[10px] uppercase tracking-wide mb-1">Skills</div>
        <div className="flex flex-wrap gap-1">
          {template.preview.skills.slice(0, 4).map((skill, idx) => (
            <span key={idx} className="text-[10px] px-1.5 py-0.5 bg-gray-100 rounded text-gray-700">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnhancedResumePreview;