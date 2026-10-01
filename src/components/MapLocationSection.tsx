/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreInfo } from '../types/pharmacy';
import {
  MapPin,
  Navigation,
  Clock,
  Phone,
  MessageCircle,
  Globe,
  ExternalLink,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface MapLocationSectionProps {
  storeInfo: StoreInfo;
}

export const MapLocationSection: React.FC<MapLocationSectionProps> = ({ storeInfo }) => {
  const googleMapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Jan Aushadhi Kendra Anand Mahal Road Adajan Surat Gujarat 395009'
  )}`;

  return (
    <section className="bg-white py-12 px-4 sm:px-6 border-t border-slate-200" id="store-location">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <MapPin className="w-3.5 h-3.5 text-emerald-700" />
            <span>Store Location & Directions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Visit Jan Aushadhi Kendra, Adajan
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Conveniently situated in Adajan, Surat. Visit us in-person for generic medicine consultations, prescription dispensing, and store pickup.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Map Container */}
          <div className="lg:col-span-7 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-md min-h-[350px] relative flex flex-col">
            <iframe
              title="Jan Aushadhi Kendra Adajan Map"
              src="https://maps.google.com/maps?q=Anand+Mahal+Road+Adajan+Surat+Gujarat&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[360px] border-0 flex-1"
              loading="lazy"
              allowFullScreen
            />
            <div className="bg-slate-900 text-white p-3 px-4 flex items-center justify-between flex-wrap gap-2 text-xs">
              <span className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Anand Mahal Road, Adajan, Surat</span>
              </span>
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow-xs"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          {/* Location & Kendra Information */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4 shadow-2xs">
              <div className="border-b border-slate-200 pb-3 flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                    Official PMBJP Center
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                    Jan Aushadhi Kendra Adajan
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">
                    Code: {storeInfo.kendraCode}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-semibold mb-0.5">Address:</strong>
                    <span className="leading-relaxed">{storeInfo.fullAddress}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-semibold mb-0.5">Timings:</strong>
                    <span className="font-medium">{storeInfo.timings}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-semibold mb-0.5">Contact:</strong>
                    <span>Phone: {storeInfo.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MessageCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-semibold mb-0.5">WhatsApp Orders:</strong>
                    <span className="font-mono text-emerald-800 font-bold">{storeInfo.whatsappNumber}</span>
                  </div>
                </div>
              </div>

              {/* Official Government Website Card */}
              <div className="pt-3 border-t border-slate-200">
                <div className="bg-emerald-50 rounded-xl p-3.5 border border-emerald-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                    <div>
                      <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">
                        Government of India Portal
                      </span>
                      <strong className="text-xs text-slate-900">janaushadhi.gov.in</strong>
                    </div>
                  </div>
                  <a
                    href="https://janaushadhi.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition shadow-2xs"
                  >
                    <span>Visit Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Made By Jaydeep Desai Card */}
            <div className="bg-linear-to-r from-emerald-800 to-teal-900 rounded-2xl p-4 text-white shadow-md flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider block">
                  Application Architecture & Design
                </span>
                <h4 className="font-extrabold text-sm sm:text-base text-white">
                  Made by Jaydeep Desai
                </h4>
                <p className="text-[11px] text-emerald-100">
                  Developed for Jan Aushadhi Kendra, Adajan (Surat)
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-black text-amber-400 text-sm">
                JD
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
