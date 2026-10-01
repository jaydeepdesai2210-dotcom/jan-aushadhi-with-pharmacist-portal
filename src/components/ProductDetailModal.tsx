/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ProductItem, StoreInfo } from '../types/pharmacy';
import { createSingleProductOrderUrl } from '../utils/whatsapp';
import {
  X,
  Package,
  Building2,
  FileText,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ShieldAlert,
  MessageCircle,
  Plus,
  HelpCircle,
  Tag
} from 'lucide-react';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  storeInfo: StoreInfo;
  onAddToCart: (product: ProductItem) => void;
  isInCart: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  storeInfo,
  onAddToCart,
  isInCart
}) => {
  if (!product) return null;

  const orderWhatsAppUrl = createSingleProductOrderUrl(
    storeInfo.whatsappNumber,
    product.productName,
    product.packing,
    product.price,
    1,
    product.company
  );

  const isAvailable = product.availability !== 'OUT_OF_STOCK' && !product.isExpired;
  const hasSavings = product.price && product.mrp && product.mrp > product.price;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Verified Catalogue Product
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Title & Badges */}
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                {product.category}
              </span>

              {product.prescriptionRequired && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                  <FileText className="w-3 h-3" />
                  Prescription Required (Rx)
                </span>
              )}

              {product.isExpired ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                  <ShieldAlert className="w-3 h-3" />
                  Expired — Not For Sale
                </span>
              ) : product.availability === 'IN_STOCK' ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3" />
                  In Stock
                </span>
              ) : product.availability === 'LIMITED' ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  <AlertTriangle className="w-3 h-3" />
                  Limited Stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  <XCircle className="w-3 h-3" />
                  Out of Stock
                </span>
              )}
            </div>

            <h2 className="text-xl font-extrabold text-slate-900 leading-snug">
              {product.productName}
            </h2>
          </div>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block mb-0.5">Packing / Dose</span>
              <strong className="text-slate-800 text-sm font-mono">{product.packing || 'N/A'}</strong>
            </div>
            <div>
              <span className="text-slate-500 block mb-0.5">Company / Brand</span>
              <strong className="text-slate-800 text-sm">
                {product.company === 'BPP' ? 'BPPI (Jan Aushadhi)' : product.company || 'Standard'}
              </strong>
            </div>
            <div>
              <span className="text-slate-500 block mb-0.5">Dosage Form</span>
              <span className="text-slate-800 font-medium">{product.formulation || 'Medicine'}</span>
            </div>
            <div>
              <span className="text-slate-500 block mb-0.5">Generic Quality</span>
              <span className="text-emerald-700 font-semibold">100% Quality Assured</span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 flex items-center justify-between">
            <div>
              <span className="text-xs text-emerald-900 font-medium block">Price at Jan Aushadhi Kendra</span>
              {product.price !== null ? (
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl font-black text-slate-900">
                    ₹{product.price.toFixed(2)}
                  </span>
                  {product.mrp && product.mrp > product.price && (
                    <span className="text-sm text-slate-400 line-through">
                      MRP ₹{product.mrp.toFixed(2)}
                    </span>
                  )}
                </div>
              ) : (
                <div className="mt-1">
                  <span className="inline-block px-2.5 py-1 rounded bg-amber-100 text-amber-900 font-bold text-xs border border-amber-300">
                    Price on Request
                  </span>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Ask our pharmacist on WhatsApp for the exact generic subsidized rate.
                  </p>
                </div>
              )}
            </div>

            {hasSavings && (
              <div className="text-right">
                <span className="px-2.5 py-1 rounded-full text-xs font-black bg-emerald-600 text-white shadow-xs">
                  Save ₹{(product.mrp! - product.price!).toFixed(2)}
                </span>
              </div>
            )}
          </div>

          {/* Compliance & Safety Guarantee */}
          <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200 flex items-start gap-2">
            <HelpCircle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              This product record is directly synchronized from the official pharmacy inventory of <strong>Jan Aushadhi Kendra, Adajan</strong>. No unverified or synthetic medicine data is used.
            </p>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <a
              href={orderWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-[#087F5B] hover:bg-[#063B2B] text-white font-extrabold text-xs flex items-center justify-center gap-2 transition shadow-xs"
              title="Order this medicine on WhatsApp (90999 82030)"
            >
              <MessageCircle className="w-4 h-4 text-[#B8F36B]" />
              <span>Order on WhatsApp</span>
            </a>

            <button
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              disabled={!isAvailable}
              className={`py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
                !isAvailable
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed border'
                  : isInCart
                  ? 'bg-emerald-100 text-[#063B2B] border border-emerald-300 hover:bg-emerald-200'
                  : 'bg-slate-900 text-white hover:bg-slate-800 shadow-sm'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>{isInCart ? 'In Order List' : '+ Add to Order'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
