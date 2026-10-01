/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { ShoppingBagIcon } from './ShoppingBagIcon';
import { StoreInfo, ProductCategory } from '../types/pharmacy';
import { formatWhatsAppUrlPhone } from '../utils/whatsapp';
import {
  Search,
  MessageCircle,
  UploadCloud,
  Phone,
  Shield,
  Layers,
  Activity,
  Heart,
  Flame,
  Thermometer,
  Wind,
  ShieldPlus,
  Sparkles,
  Baby,
  Eye,
  Smile,
  Stethoscope,
  Cross,
  UserCheck,
  User,
  X,
  ChevronRight
} from 'lucide-react';

interface CategoryConfig {
  id: ProductCategory | 'ALL';
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CATEGORIES: CategoryConfig[] = [
  { id: 'ALL', label: 'All Medicines', icon: Layers },
  { id: 'Diabetes', label: 'Diabetes', icon: Activity },
  { id: 'Blood Pressure', label: 'Blood Pressure', icon: Activity },
  { id: 'Cardiac & Heart', label: 'Cardiac & Heart', icon: Heart },
  { id: 'Thyroid', label: 'Thyroid', icon: Activity },
  { id: 'Pain Relief', label: 'Pain Relief', icon: Flame },
  { id: 'Fever', label: 'Fever & Paracetamol', icon: Thermometer },
  { id: 'Cold & Cough', label: 'Cold & Cough', icon: Wind },
  { id: 'Respiratory', label: 'Respiratory', icon: Wind },
  { id: 'Gastro', label: 'Gastro & Acidity', icon: ShieldPlus },
  { id: 'Vitamins & Supplements', label: 'Vitamins & Minerals', icon: Sparkles },
  { id: 'Skin Care', label: 'Skin Care', icon: Sparkles },
  { id: 'Eye Care', label: 'Eye Care', icon: Eye },
  { id: 'ENT', label: 'ENT', icon: Eye },
  { id: 'Baby Care', label: 'Baby Care', icon: Baby },
  { id: 'Medical Devices', label: 'Devices', icon: Stethoscope },
  { id: 'First Aid', label: 'First Aid & Surgical', icon: Cross },
  { id: "Women's Health", label: "Women's Health", icon: UserCheck },
  { id: "Men's Health", label: "Men's Health", icon: User },
  { id: 'Personal Care', label: 'Personal Care', icon: Smile },
  { id: 'OTC', label: 'OTC & Wellness', icon: Sparkles },
  { id: 'Other', label: 'Other', icon: Layers }
];

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenMenu: () => void;
  onOpenPrescriptionModal: () => void;
  onNavigate: (sectionId: string) => void;
  storeInfo: StoreInfo;
  selectedCategory: ProductCategory | 'ALL';
  onSelectCategory: (category: ProductCategory | 'ALL') => void;
  categoryCounts: Record<string, number>;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenMenu,
  onOpenPrescriptionModal,
  onNavigate,
  storeInfo,
  selectedCategory,
  onSelectCategory,
  categoryCounts,
  searchQuery,
  onSearchChange
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryClick = (catId: ProductCategory | 'ALL') => {
    onSelectCategory(catId);
    // Smooth scroll to catalogue if user is scrolled past or on another section
    const catalogueEl = document.getElementById('catalogue-section');
    if (catalogueEl && window.scrollY > 450) {
      catalogueEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-md bg-white transition-all duration-200">
      {/* ========================================================= */}
      {/* LAYER 1 — INFORMATION BAR (Sticky Topmost)                */}
      {/* ========================================================= */}
      <div className="bg-[#063B2B] text-white text-[11px] py-1.5 px-3 sm:px-6 border-b border-emerald-950">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          {/* Left information badges */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="font-extrabold text-[#B8F36B] tracking-tight flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#B8F36B] flex-shrink-0" />
              <span>Jan Aushadhi Kendra Adajan • Surat</span>
            </span>

            <span className="hidden sm:inline text-emerald-600 font-bold">•</span>
            <span className="hidden sm:inline text-emerald-100 font-medium">
              Affordable Medicines (50%–90% Savings)
            </span>

            <span className="hidden md:inline text-emerald-600 font-bold">•</span>
            <span className="hidden md:inline text-emerald-200 font-medium">
              Easy WhatsApp Ordering
            </span>
          </div>

          {/* Right quick contact links */}
          <div className="flex items-center gap-3 text-[11px] ml-auto">
            <a
              href={`tel:${storeInfo.phone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center gap-1 text-emerald-200 hover:text-white font-semibold transition"
              title="Call Pharmacy"
            >
              <Phone className="w-3 h-3 text-[#B8F36B]" />
              <span>Call: <strong className="text-white">{storeInfo.phone}</strong></span>
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* LAYER 2 — MAIN HEADER / BRANDING & ACTIONS (Sticky Middle) */}
      {/* ========================================================= */}
      <div className="w-full bg-white/98 backdrop-blur-[16px] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-2.5">
          <div className="flex items-center justify-between gap-3 sm:gap-5">
            {/* LEFT (SIDE): Jan Aushadhi Official Branding & Store Logo */}
            <div className="flex items-center justify-start flex-shrink-0">
              <button
                onClick={() => onNavigate('home')}
                className="flex items-center text-left hover:opacity-95 transition active:scale-98"
                title="Jan Aushadhi Kendra Adajan"
              >
                <BrandLogo size="md" showLocalName={true} />
              </button>
            </div>

            {/* CENTER: Integrated Search Input & Desktop Navigation */}
            <div className="hidden md:flex flex-1 items-center max-w-xl mx-2">
              <div className="relative w-full">
                <Search className="w-4 h-4 text-[#087F5B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search 8,785+ medicines, brands or salts..."
                  className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white pl-10 pr-9 py-2 rounded-xl border border-slate-200 focus:border-[#087F5B] focus:ring-2 focus:ring-[#087F5B]/20 text-xs text-slate-800 transition shadow-2xs outline-hidden"
                />
                {searchQuery ? (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                    title="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={onOpenSearch}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-mono text-slate-400 hover:text-slate-700"
                    title="Open Search Dialog"
                  >
                    ⌘K
                  </button>
                )}
              </div>
            </div>

            {/* RIGHT: Actions (Prescription, WhatsApp, Cart, Menu) */}
            <div className="flex items-center justify-end gap-2 sm:gap-2.5 flex-shrink-0">
              {/* Mobile Search Button */}
              <button
                onClick={onOpenSearch}
                className="flex md:hidden w-10 h-10 rounded-xl bg-slate-100/90 hover:bg-emerald-50 text-[#087F5B] items-center justify-center transition active:scale-95 cursor-pointer border border-slate-200"
                aria-label="Search catalogue"
                title="Search medicines"
              >
                <Search className="w-4.5 h-4.5 stroke-[2]" />
              </button>

              {/* Prescription Upload (Desktop) */}
              <button
                onClick={onOpenPrescriptionModal}
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-300/60 text-[#063B2B] text-xs font-bold transition shadow-2xs cursor-pointer"
                title="Upload Prescription"
              >
                <UploadCloud className="w-3.5 h-3.5 text-[#087F5B]" />
                <span>Upload Rx</span>
              </button>

              {/* WhatsApp Order Button */}
              <a
                href={`https://wa.me/${formatWhatsAppUrlPhone(storeInfo.whatsappNumber)}?text=${encodeURIComponent(
                  'Hello Jan Aushadhi Kendra Adajan, I would like to order medicines from your catalogue.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl bg-[#087F5B] hover:bg-[#063B2B] active:bg-[#04281D] text-white text-xs font-bold transition shadow-xs cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#B8F36B]" />
                <span className="hidden md:inline">WhatsApp Order</span>
                <span className="md:hidden">Order</span>
              </a>

              {/* Cart Shopping Bag Icon */}
              <ShoppingBagIcon
                count={cartCount}
                onClick={onOpenCart}
                size="md"
              />

              {/* Hamburger Menu Icon */}
              <button
                onClick={onOpenMenu}
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-[#087F5B]/10 active:bg-[#087F5B]/20 text-[#087F5B] hover:text-[#063B2B] flex items-center justify-center transition active:scale-95 cursor-pointer border border-slate-200"
                aria-label="Open navigation menu"
                title="Menu"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 stroke-current"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* LAYER 3 — CATEGORY & QUICK NAVIGATION BAR (Sticky Bottom)  */}
      {/* ========================================================= */}
      <div className="w-full bg-[#F7FAF8] border-b border-[#087F5B]/15 py-2 px-3 sm:px-6 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Horizontal scrolling category pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none flex-1">
            {CATEGORIES.map(({ id, label, icon: Icon }) => {
              const isSelected = selectedCategory === id;
              const count = categoryCounts[id] ?? 0;

              return (
                <button
                  key={id}
                  onClick={() => handleCategoryClick(id)}
                  className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#087F5B] text-white shadow-xs ring-2 ring-[#087F5B]/30 scale-[1.02]'
                      : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-[#063B2B] border border-slate-200/80 shadow-2xs'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#B8F36B]' : 'text-[#087F5B]'}`} />
                  <span>{label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-semibold ${
                      isSelected
                        ? 'bg-[#063B2B] text-[#B8F36B]'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick jump to complete catalogue view */}
          <button
            onClick={() => onNavigate('catalogue-section')}
            className="hidden lg:inline-flex items-center gap-1 text-[11px] font-bold text-[#087F5B] hover:text-[#063B2B] whitespace-nowrap pl-2 border-l border-slate-300"
          >
            <span>Catalogue View</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </header>
  );
};
