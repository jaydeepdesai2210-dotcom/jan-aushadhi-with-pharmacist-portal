/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StoreInfo } from '../types/pharmacy';
import { formatWhatsAppUrlPhone } from '../utils/whatsapp';
import { X, Upload, MessageCircle, FileText, CheckCircle2 } from 'lucide-react';

interface PrescriptionUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  storeInfo: StoreInfo;
}

export const PrescriptionUploadModal: React.FC<PrescriptionUploadModalProps> = ({
  isOpen,
  onClose,
  storeInfo,
}) => {
  const [notes, setNotes] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleSendToWhatsApp = () => {
    const cleanPhone = formatWhatsAppUrlPhone(storeInfo.whatsappNumber);
    let message = `Hello Jan Aushadhi Kendra Adajan,

I would like to order medicines from my Doctor Prescription.

Prescription: ${fileName || 'Sharing photo directly in this chat'}`;

    if (notes.trim()) {
      message += `\nNote / Required Medicines: ${notes.trim()}`;
    }

    message += `\n\nPlease confirm availability and generic prices. Thank you.`;

    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        <div className="p-4 bg-emerald-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-300" />
            <h3 className="font-bold text-base">Send Prescription on WhatsApp</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs">
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 leading-relaxed">
            Attach your prescription file or photo, or send it directly on WhatsApp. Our registered pharmacist will verify availability and quote the lowest generic rates.
          </div>

          {/* File Picker */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Prescription Photo / PDF</label>
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center bg-slate-50 hover:bg-slate-100 transition">
              {fileName ? (
                <div className="flex items-center justify-center gap-2 text-emerald-700 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{fileName}</span>
                </div>
              ) : (
                <div className="space-y-1">
                  <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                  <p className="text-slate-600 font-medium">Click to attach prescription photo</p>
                  <p className="text-[10px] text-slate-400">JPG, PNG, PDF</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileUpload}
                className="w-full mt-2 text-[11px] text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-[11px] file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Medicine Names / Notes (Optional)</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. 1 month supply for blood pressure and diabetes"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <button
            onClick={handleSendToWhatsApp}
            className="w-full py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send Prescription to WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
