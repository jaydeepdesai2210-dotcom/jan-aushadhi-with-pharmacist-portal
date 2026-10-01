/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrandLogo } from './BrandLogo';
import { StoreInfo } from '../types/pharmacy';
import { formatWhatsAppUrlPhone } from '../utils/whatsapp';
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  ShieldCheck,
  Heart,
  ExternalLink,
  Globe,
  Instagram,
  Facebook,
  Youtube,
  Navigation
} from 'lucide-react';

interface FooterProps {
  storeInfo: StoreInfo;
  onOpenPrescription: () => void;
  onOpenCatalogueManager?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  storeInfo,
  onOpenPrescription,
  onOpenCatalogueManager
}) => {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Jan Aushadhi Kendra Anand Mahal Road Adajan Surat Gujarat 395009'
  )}`;

  return (
    <footer className="bg-slate-950 text-slate-300 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Local Pharmacy Identity */}
          <div className="space-y-3 md:col-span-1">
            <BrandLogo size="md" showLocalName={true} />
            <div className="pt-2">
              <h4 className="font-extrabold text-white text-sm">
                JAN AUSHADHI KENDRA ADAJAN
              </h4>
              <p className="text-slate-400 text-xs font-medium">
                Adajan, Surat
              </p>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Authorized local generic medicine dispensary under the Pradhan Mantri Bhartiya Janaushadhi Pariyojana.
            </p>
            <div className="flex items-center gap-1.5 text-[#B8F36B] font-semibold text-[11px]">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>WHO-GMP Quality Certified Generics</span>
            </div>
          </div>

          {/* Quick Links & Services */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-sm tracking-wide">Quick Services</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button
                  onClick={onOpenPrescription}
                  className="hover:text-emerald-400 transition"
                >
                  Upload Doctor's Prescription
                </button>
              </li>
              <li>
                <a
                  href={`https://wa.me/${formatWhatsAppUrlPhone(storeInfo.whatsappNumber)}?text=${encodeURIComponent(
                    'Hello Jan Aushadhi Kendra Adajan, I would like to check medicine availability.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition flex items-center gap-1 text-emerald-400 font-semibold"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Order on WhatsApp</span>
                </a>
              </li>
              {onOpenCatalogueManager && (
                <li>
                  <button
                    onClick={onOpenCatalogueManager}
                    className="hover:text-emerald-400 transition text-slate-400 text-left"
                  >
                    Catalogue & Inventory Manager (Admin)
                  </button>
                </li>
              )}
              <li>
                <a
                  href="https://janaushadhi.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition flex items-center gap-1.5 text-emerald-300 font-medium"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Official PMBJP Portal (janaushadhi.gov.in)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Store Hours, Contact & Call */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-sm tracking-wide">Contact Store</h4>
            <div className="space-y-2 text-slate-400">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#B8F36B] flex-shrink-0 mt-0.5" />
                <span>{storeInfo.timings}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#B8F36B] flex-shrink-0 mt-0.5" />
                <span>{storeInfo.fullAddress}</span>
              </div>
              <div className="pt-1">
                <span className="block text-[11px] text-slate-400">Call Pharmacy:</span>
                <a
                  href={`tel:${storeInfo.phone.replace(/[^0-9+]/g, '')}`}
                  className="inline-flex items-center gap-2 text-white font-extrabold text-sm hover:text-[#B8F36B] transition"
                >
                  <Phone className="w-4 h-4 text-[#B8F36B]" />
                  <span>{storeInfo.phone}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Social Links & Navigation */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide">Connect & Follow</h4>
            <p className="text-slate-400 text-xs">
              Stay updated with daily generic medicine stock arrivals and health tips.
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <a
                href={`https://wa.me/${formatWhatsAppUrlPhone(storeInfo.whatsappNumber)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-emerald-800 border border-slate-800 flex items-center justify-center text-emerald-400 hover:text-white transition"
                title="WhatsApp (+91 90999 82030)"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href={storeInfo.instagramUrl || "https://www.instagram.com/janaushadhikendraadajan?stkn=OHo2d2U2eTBmMGlp"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-pink-800 border border-slate-800 flex items-center justify-center text-pink-400 hover:text-white transition"
                title="Instagram (@janaushadhikendraadajan)"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={storeInfo.facebookUrl || "https://www.facebook.com/share/1DAFNBXMJi/"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-blue-800 border border-slate-800 flex items-center justify-center text-blue-400 hover:text-white transition"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <a
                href={storeInfo.youtubeUrl || "https://youtube.com/@janaushadhikendraadajan2129?si=NCtfn9TcNu0EppCL"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-red-800 border border-slate-800 flex items-center justify-center text-red-400 hover:text-white transition"
                title="YouTube (@janaushadhikendraadajan2129)"
              >
                <Youtube className="w-4 h-4" />
              </a>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-emerald-800 border border-slate-800 flex items-center justify-center text-[#B8F36B] hover:text-white transition"
                title="Google Maps"
              >
                <Navigation className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2 text-[10px] text-slate-500 font-mono">
              <span>Lic: {storeInfo.drugLicenseNo}</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-slate-900 flex items-center justify-between flex-wrap gap-4 text-slate-500 text-[11px]">
          <p>© 2026 Jan Aushadhi Kendra Adajan. All Rights Reserved.</p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-400">
              Website designed & developed by <strong className="text-[#B8F36B] font-bold">Jaydeep</strong>.
            </span>
            <span className="text-slate-700">•</span>
            <p className="flex items-center gap-1 text-slate-400">
              <span>Dedicated to affordable healthcare in Surat</span>
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
