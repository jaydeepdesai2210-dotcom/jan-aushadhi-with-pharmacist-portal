/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ShieldCheck, HelpCircle } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: 'Why are some medicines marked "Price on Request"?',
    a: 'Under Jan Aushadhi guidelines and our inventory import from the master catalogue, prices are verified and subsidized in real-time according to government-notified generic caps. When you click "Ask on WhatsApp" or add items to your order, our registered pharmacist instantly confirms the exact discounted price before dispensing.'
  },
  {
    q: 'How does Ordering on WhatsApp work?',
    a: 'Simply click "Add to Order" on any medicine, review your list in the Order Cart, and click "Send Order on WhatsApp". It formats your exact selected medicine names and quantities into a structured message to our Adajan Kendra. You can choose store pickup or home delivery.'
  },
  {
    q: 'Are generic medicines equally effective as branded ones?',
    a: 'Yes. Pradhan Mantri Bhartiya Janaushadhi medicines contain the identical active pharmaceutical ingredients (API) in the same strength and dosage form as branded drugs. They are procured only from WHO-GMP certified manufacturing facilities and batch-tested at NABL-accredited laboratories.'
  },
  {
    q: 'Do I need a doctor\'s prescription for all medicines?',
    a: 'Prescriptions are required only for Schedule H, H1, and X medicines (such as antibiotics, antidiabetic drugs, cardiac medications, and sedatives) marked with the "Rx Required" badge. Over-the-counter (OTC) products, personal care, baby care, and surgical supplies do not require a prescription.'
  },
  {
    q: 'Where is your Jan Aushadhi Kendra located in Adajan?',
    a: 'We are situated in Adajan, Surat (near Anand Mahal Road). We welcome in-person walk-ins during store hours (Mon-Sat: 9:00 AM - 9:30 PM, Sun: 10:00 AM - 10:00 PM), as well as home delivery across Adajan and surrounding areas.'
  }
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-slate-50 py-12 px-4 sm:px-6 border-t border-slate-200">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Customer Guidance & Transparency</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Learn more about government generic medicines, ordering procedures, and quality verification.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs transition"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:text-emerald-700"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
