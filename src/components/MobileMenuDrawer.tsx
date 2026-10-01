/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StoreInfo } from '../types/pharmacy';
import { formatWhatsAppUrlPhone } from '../utils/whatsapp';
import {
  X,
  Phone,
  Navigation,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  Clock,
  MapPin,
  ChevronRight,
  Instagram,
  Facebook,
  Youtube
} from 'lucide-react';

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  storeInfo: StoreInfo;
  onNavigate: (sectionId: string) => void;
  onOpenPrescription: () => void;
  onOpenCatalogueManager?: () => void;
}

const MENU_ITEMS = [
  { id: 'home', label: 'HOME' },
  { id: 'catalogue-section', label: 'MEDICINES' },
  { id: 'categories', label: 'CATEGORIES' },
  { id: 'prescription', label: 'UPLOAD PRESCRIPTION', isAction: true },
  { id: 'initiative-section', label: 'JAN AUSHADHI INITIATIVE' },
  { id: 'how-it-works', label: 'HOW IT WORKS' },
  { id: 'about-us', label: 'ABOUT US' },
  { id: 'contact', label: 'CONTACT' },
  { id: 'store-location', label: 'LOCATION' },
];

export const MobileMenuDrawer: React.FC<MobileMenuDrawerProps> = ({
  isOpen,
  onClose,
  storeInfo,
  onNavigate,
  onOpenPrescription,
  onOpenCatalogueManager
}) => {
  const googleMapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Jan Aushadhi Kendra Anand Mahal Road Adajan Surat Gujarat 395009'
  )}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Slide-in drawer from the right */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#063B2B] text-white shadow-2xl flex flex-col z-10 overflow-y-auto"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-emerald-800/60 bg-[#052e22]">
              <div className="flex items-center gap-2.5">
                <img
                  src="/pmbjp_logo.jpg"
                  alt="Jan Aushadhi Kendra Logo"
                  className="w-10 h-10 rounded-full bg-white object-contain border border-lime-400 p-0.5 shadow-sm flex-shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider block">
                    प्रधानमंत्री जन औषधि
                  </span>
                  <h3 className="font-extrabold text-sm tracking-tight text-white truncate">
                    JAN AUSHADHI KENDRA
                  </h3>
                  <p className="text-[10px] text-emerald-300 font-medium">
                    Adajan, Surat • {storeInfo.kendraCode}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-700/60 flex items-center justify-center text-emerald-200 hover:text-white transition"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" strokeWidth={1.75} />
              </button>
            </div>

            {/* Navigation links */}
            <div className="flex-1 px-6 py-6 space-y-1">
              {MENU_ITEMS.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index + 0.1, duration: 0.25 }}
                >
                  <button
                    onClick={() => {
                      onClose();
                      if (item.id === 'prescription') {
                        onOpenPrescription();
                      } else {
                        onNavigate(item.id);
                      }
                    }}
                    className={`w-full text-left py-3 px-2 flex items-center justify-between text-sm sm:text-base font-bold tracking-wider transition rounded-lg hover:bg-white/5 ${
                      item.isAction ? 'text-[#B8F36B]' : 'text-slate-100 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-emerald-500/70" strokeWidth={1.5} />
                  </button>
                </motion.div>
              ))}

              {/* Divider */}
              <div className="my-5 border-t border-emerald-800/60" />

              {/* SOCIAL */}
              <div className="pt-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block mb-3 px-2">
                  SOCIAL
                </span>
                <div className="flex items-center gap-3 px-2">
                  <a
                    href={storeInfo.instagramUrl || "https://www.instagram.com/janaushadhikendraadajan?stkn=OHo2d2U2eTBmMGlp"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-emerald-900/60 hover:bg-pink-800 border border-emerald-700/50 flex items-center justify-center text-emerald-200 hover:text-white transition"
                    title="Instagram (@janaushadhikendraadajan)"
                  >
                    <Instagram className="w-4 h-4" strokeWidth={1.75} />
                  </a>

                  <a
                    href={storeInfo.facebookUrl || "https://www.facebook.com/share/1DAFNBXMJi/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-emerald-900/60 hover:bg-blue-800 border border-emerald-700/50 flex items-center justify-center text-emerald-200 hover:text-white transition"
                    title="Facebook"
                  >
                    <Facebook className="w-4 h-4" strokeWidth={1.75} />
                  </a>

                  <a
                    href={storeInfo.youtubeUrl || "https://youtube.com/@janaushadhikendraadajan2129?si=NCtfn9TcNu0EppCL"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-emerald-900/60 hover:bg-red-800 border border-emerald-700/50 flex items-center justify-center text-emerald-200 hover:text-white transition"
                    title="YouTube (@janaushadhikendraadajan2129)"
                  >
                    <Youtube className="w-4 h-4" strokeWidth={1.75} />
                  </a>

                  <a
                    href={`https://wa.me/${formatWhatsAppUrlPhone(storeInfo.whatsappNumber)}?text=${encodeURIComponent(
                      'Hello Jan Aushadhi Kendra Adajan, I would like to enquire about medicines.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-700/50 flex items-center justify-center text-emerald-200 hover:text-white transition"
                    title="WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" strokeWidth={1.75} />
                  </a>
                </div>
              </div>

              {/* Timing info */}
              <div className="pt-4 px-2 text-xs text-emerald-300/80 space-y-1">
                <div className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#B8F36B]" />
                  <span>{storeInfo.timings}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions: Call & Directions */}
            <div className="p-5 border-t border-emerald-800/60 bg-[#052e22] space-y-2.5">
              <a
                href={`tel:${storeInfo.phone.replace(/[^0-9+]/g, '')}`}
                className="w-full py-3 px-4 rounded-xl bg-[#087F5B] hover:bg-[#076f4f] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition"
              >
                <Phone className="w-4 h-4 text-[#B8F36B]" strokeWidth={2} />
                <span>CALL PHARMACY ({storeInfo.phone})</span>
              </a>

              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
              >
                <Navigation className="w-4 h-4 text-emerald-300" strokeWidth={2} />
                <span>GET DIRECTIONS</span>
              </a>

              <div className="pt-2 flex items-center justify-between text-[11px] text-emerald-400">
                {onOpenCatalogueManager && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenCatalogueManager();
                    }}
                    className="hover:underline text-emerald-300 font-semibold"
                  >
                    Catalogue Manager
                  </button>
                )}

                <a
                  href="https://janaushadhi.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-[#B8F36B] flex items-center gap-1 font-semibold"
                >
                  <span>PMBJP Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
