/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Award, ExternalLink, Building2, CheckCircle2, FileText } from 'lucide-react';

export const GovernmentInitiativeSection: React.FC = () => {
  return (
    <section className="bg-white py-14 px-4 sm:px-6 border-b border-slate-200" id="initiative-section">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-2 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Government Initiative Information</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900">
            Jan Aushadhi Initiative
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Factual overview of the Pradhan Mantri Bhartiya Janaushadhi Pariyojana (PMBJP) — a public welfare scheme making high-quality generic healthcare affordable across India.
          </p>
        </div>

        {/* Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50/80 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          {/* Editorial Image: Complete provided PMBJP branding asset */}
          <div className="lg:col-span-6 flex flex-col space-y-3">
            <div className="relative rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-md">
              <img
                src="/pmbjp_official.jpg"
                alt="Pradhan Mantri Bhartiya Janaushadhi Pariyojana Official Initiative"
                className="w-full h-auto object-contain"
                style={{ aspectRatio: '1200 / 675' }}
                referrerPolicy="no-referrer"
              />
              <div className="p-3 bg-slate-900 text-slate-300 text-[11px] flex items-center justify-between border-t border-slate-800">
                <span className="font-semibold text-white">PMBJP Campaign Branding Asset</span>
                <span className="text-emerald-400 font-mono text-[10px]">Ministry of Chemicals & Fertilizers</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 italic text-center">
              Official national initiative campaign image displayed for public scheme awareness.
            </p>
          </div>

          {/* Factual Information Column */}
          <div className="lg:col-span-6 space-y-5">
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#087F5B]">
                About the Scheme
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                Pradhan Mantri Bhartiya Janaushadhi Pariyojana
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                PMBJP is a campaign launched by the Department of Pharmaceuticals, Ministry of Chemicals & Fertilizers, Government of India, to provide quality medicines at affordable prices to the masses through dedicated Jan Aushadhi Kendras.
              </p>
            </div>

            {/* Factual Pillar Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Award className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>50% to 90% Savings</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Generic formulations priced substantially lower than branded market equivalents, reducing recurring household medical bills.
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>WHO-GMP Quality</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Every product is procured from WHO-GMP compliant manufacturers and certified via NABL-accredited laboratory testing.
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Building2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Authorized Local Kendra</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Jan Aushadhi Kendra, Adajan (Surat) is an authorized local dispensing center bringing this national catalog to local residents.
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <FileText className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Prescription Dispensing</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Medicines are dispensed under the supervision of a licensed registered pharmacist following standard drug rules.
                </p>
              </div>
            </div>

            {/* Official Portal Reference */}
            <div className="pt-2 flex items-center justify-between flex-wrap gap-2 text-xs text-slate-500 border-t border-slate-200">
              <span>For national guidelines and central reports:</span>
              <a
                href="https://janaushadhi.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-bold text-[#087F5B] hover:text-[#063B2B] hover:underline"
              >
                <span>Visit janaushadhi.gov.in</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
