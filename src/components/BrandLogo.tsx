/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLocalName?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showLocalName = true,
}) => {
  // Height constraints that preserve the complete 16:9 uncropped image
  const heights = {
    sm: 'h-10 sm:h-12',
    md: 'h-12 sm:h-14',
    lg: 'h-14 sm:h-16',
  };

  return (
    <div className={`flex items-center gap-2 sm:gap-3 ${className}`}>
      {/* Complete provided PMBJP branding image (contains logo, Hindi typography & Narendra Modi) */}
      <div className={`relative ${heights[size]} flex items-center justify-center flex-shrink-0 bg-white/80 p-0.5 rounded-xl border border-emerald-600/15 shadow-2xs`}>
        <img
          src="/pmbjp_official.jpg"
          alt="Pradhan Mantri Bhartiya Janaushadhi Pariyojana"
          className="h-full w-auto max-w-[170px] sm:max-w-[210px] md:max-w-[240px] object-contain rounded-lg"
          style={{ aspectRatio: '1200 / 675' }}
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Distinct local pharmacy identity badge */}
      {showLocalName && (
        <div className="hidden min-[420px]:flex flex-col border-l border-[#087F5B]/20 pl-2 sm:pl-2.5 min-w-0">
          <span className="text-[11px] sm:text-xs font-black text-[#063B2B] tracking-tight leading-tight truncate">
            Jan Aushadhi Kendra
          </span>
          <span className="text-[9px] sm:text-[10px] text-slate-500 font-semibold truncate">
            Adajan, Surat
          </span>
        </div>
      )}
    </div>
  );
};
