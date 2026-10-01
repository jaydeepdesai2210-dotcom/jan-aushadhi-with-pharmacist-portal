/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreInfo } from '../types/pharmacy';
import { formatWhatsAppUrlPhone } from '../utils/whatsapp';
import { Healthcare3DScene } from './Healthcare3DScene';
import {
  ShieldCheck,
  TrendingDown,
  Search,
  MessageCircle,
  Clock,
  MapPin,
  CheckCircle2,
  FileCheck,
  ShoppingBag
} from 'lucide-react';

interface HeroSectionProps {
  storeInfo: StoreInfo;
  onOpenPrescription: () => void;
  onScrollToCatalogue: () => void;
  onAddAllToCart?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  storeInfo,
  onOpenPrescription,
  onScrollToCatalogue,
  onAddAllToCart
}) => {
  const whatsappUrl = `https://wa.me/${formatWhatsAppUrlPhone(storeInfo.whatsappNumber)}?text=${encodeURIComponent(
    'Hello Jan Aushadhi Kendra Adajan, I would like to order medicines through WhatsApp.'
  )}`;

  return (
    <div className="relative bg-gradient-to-br from-[#063B2B] via-[#087F5B] to-[#04281D] text-white overflow-hidden py-10 sm:py-14 lg:py-16">
      {/* Decorative background grid and ambient lighting */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#B8F36B]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#087F5B]/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-6">
            {/* Local Store Accreditation Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#B8F36B] text-xs font-bold backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-[#B8F36B]" />
              <span>Jan Aushadhi Kendra Adajan • Code: {storeInfo.kendraCode}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
              Affordable Healthcare. <br />
              <span className="text-[#B8F36B]">Closer to You.</span>
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base lg:text-lg text-emerald-100/95 max-w-xl leading-relaxed font-normal">
              Your trusted Jan Aushadhi Kendra in Adajan, Surat — find medicines easily and order conveniently through WhatsApp.
            </p>

            {/* Factual Value Props */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-white/90 pt-1">
              <div className="flex items-center gap-2 bg-white/10 p-2.5 rounded-xl border border-white/15 backdrop-blur-xs">
                <TrendingDown className="w-4 h-4 text-[#B8F36B] flex-shrink-0" />
                <span className="font-semibold">50%–90% Savings</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 p-2.5 rounded-xl border border-white/15 backdrop-blur-xs">
                <CheckCircle2 className="w-4 h-4 text-[#B8F36B] flex-shrink-0" />
                <span className="font-semibold">WHO-GMP Quality</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 p-2.5 rounded-xl border border-white/15 backdrop-blur-xs col-span-2 sm:col-span-1">
                <Clock className="w-4 h-4 text-[#B8F36B] flex-shrink-0" />
                <span className="font-semibold">Open 7 Days a Week</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2 flex-wrap">
              <button
                onClick={onScrollToCatalogue}
                className="px-6 py-3.5 rounded-xl bg-[#B8F36B] hover:bg-[#a6ec4f] active:bg-[#92dc38] text-[#063B2B] font-extrabold text-xs sm:text-sm shadow-lg transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
                <span>SEARCH MEDICINES</span>
              </button>

              {onAddAllToCart && (
                <button
                  onClick={onAddAllToCart}
                  className="px-5 py-3.5 rounded-xl bg-white hover:bg-emerald-50 text-[#063B2B] font-extrabold text-xs sm:text-sm shadow-lg transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                  title="Add all medicines to your order list"
                >
                  <ShoppingBag className="w-4 h-4 text-[#087F5B]" />
                  <span>ADD ALL TO ORDER LIST</span>
                </button>
              )}

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 active:bg-white/30 border border-white/30 text-white font-extrabold text-xs sm:text-sm backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4 text-[#B8F36B]" />
                <span>ORDER ON WHATSAPP</span>
              </a>

              <button
                onClick={onOpenPrescription}
                className="px-4 py-3 rounded-xl bg-transparent hover:bg-white/10 text-emerald-200 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer underline"
              >
                <FileCheck className="w-3.5 h-3.5" />
                <span>Upload Prescription</span>
              </button>
            </div>
          </div>

          {/* 3D Healthcare Visual Beside Hero Text */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <Healthcare3DScene />
          </div>
        </div>
      </div>
    </div>
  );
};
