// src/app/templates/components/PremiumUpgradeBanner.tsx

import React from 'react';
import Link from 'next/link';
import { Crown } from 'lucide-react';

const PremiumUpgradeBanner = () => (
  <div className="bg-gradient-to-r from-pink-600 via-pink-500 to-pink-600 rounded-2xl p-8 text-white text-center shadow-2xl mb-8 border border-pink-400/30 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 via-pink-400/20 to-pink-600/20 animate-pulse"></div>
    <div className="relative z-10">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Crown className="w-10 h-10 animate-bounce text-yellow-300" />
        <h3 className="text-2xl md:text-3xl font-bold">Unlock ALL Premium Templates!</h3>
        <Crown className="w-10 h-10 animate-bounce text-yellow-300" style={{ animationDelay: '0.5s' }} />
      </div>
      <p className="mb-2 text-pink-100 text-lg">
        🚀 <strong>3x More Interviews</strong> • 🎯 <strong>98% ATS Pass Rate</strong> • ⚡ <strong>AI-Powered Optimization</strong>
      </p>
      <p className="mb-6 text-pink-200 text-sm">
        Join 50,000+ job seekers who landed their dream jobs with our premium templates
      </p>
      <Link href="/pricing">
        <button className="px-8 py-4 bg-white text-pink-600 font-bold rounded-xl hover:bg-pink-50 transform hover:scale-105 transition-all cursor-pointer shadow-lg text-lg">
          Get Premium Access - Only $19.99/month
        </button>
      </Link>
      <p className="text-xs mt-3 text-pink-200">✨  Cancel anytime</p>
    </div>
  </div>
);

export default PremiumUpgradeBanner;