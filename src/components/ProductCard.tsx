/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ProductItem, StoreInfo } from '../types/pharmacy';
import { createSingleProductOrderUrl } from '../utils/whatsapp';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Plus,
  MessageCircle,
  ShieldAlert,
  Package,
  Building2,
  Calendar
} from 'lucide-react';

interface ProductCardProps {
  product: ProductItem;
  storeInfo: StoreInfo;
  onAddToCart: (product: ProductItem) => void;
  isInCart: boolean;
  cartQuantity?: number;
  onSelectProduct?: (product: ProductItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  storeInfo,
  onAddToCart,
  isInCart,
  cartQuantity = 0,
  onSelectProduct
}) => {
  const askWhatsAppUrl = createSingleProductOrderUrl(
    storeInfo.whatsappNumber,
    product.productName,
    product.packing,
    product.price,
    1,
    product.company
  );

  const isAvailable = product.availability !== 'OUT_OF_STOCK' && !product.isExpired;

  // Calculate discount if MRP and Selling Price exist
  const hasSavings = product.price && product.mrp && product.mrp > product.price;
  const savingsAmount = hasSavings ? (product.mrp! - product.price!).toFixed(2) : null;
  const savingsPercent = hasSavings ? Math.round(((product.mrp! - product.price!) / product.mrp!) * 100) : null;

  return (
    <div className={`flex flex-col justify-between bg-white rounded-xl border transition-all duration-200 hover:shadow-md ${
      product.isExpired
        ? 'border-red-200 bg-red-50/20'
        : isAvailable
        ? 'border-slate-200 hover:border-emerald-300'
        : 'border-slate-200 opacity-80'
    } p-4 relative group`}>
      {/* Top badges */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            {product.prescriptionRequired && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                <FileText className="w-3 h-3" />
                Rx Required
              </span>
            )}
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700">
              {product.category}
            </span>
          </div>

          {/* Availability badge */}
          {product.isExpired ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">
              <ShieldAlert className="w-3 h-3" />
              Expired
            </span>
          ) : product.availability === 'IN_STOCK' ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              <CheckCircle2 className="w-3 h-3" />
              In Stock
            </span>
          ) : product.availability === 'LIMITED' ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
              <AlertTriangle className="w-3 h-3" />
              Limited Stock
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              <XCircle className="w-3 h-3" />
              Out of Stock
            </span>
          )}
        </div>

        {/* Product Name */}
        <h3
          onClick={() => onSelectProduct?.(product)}
          className="font-bold text-slate-900 text-base leading-snug line-clamp-2 hover:text-emerald-700 cursor-pointer"
          title={product.productName}
        >
          {product.productName}
        </h3>

        {/* Product Meta: Packing & Company */}
        <div className="mt-2 space-y-1 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <Package className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="font-semibold text-slate-800">Packing:</span>
            <span className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-[11px] text-slate-700">
              {product.packing || 'Standard Pack'}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="font-semibold text-slate-800">Company:</span>
            <span className="font-medium text-slate-700">
              {product.company === 'BPP' ? 'BPPI (Jan Aushadhi Generic)' : product.company || 'Generic'}
            </span>
          </div>

          {/* Admin enabled private inventory metadata (if toggled on) */}
          {storeInfo.showBatchToCustomers && product.batchNumber && (
            <div className="flex items-center gap-1 text-[11px] text-slate-500 pt-0.5">
              <span>Batch:</span>
              <span className="font-mono">{product.batchNumber}</span>
            </div>
          )}
          {storeInfo.showInternalStockToCustomers && typeof product.quantity === 'number' && (
            <div className="flex items-center gap-1 text-[11px] text-slate-500">
              <span>Current Stock:</span>
              <span className="font-semibold">{product.quantity} units</span>
            </div>
          )}
        </div>
      </div>

      {/* Pricing & Order Action */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2.5">
        <div className="flex items-baseline justify-between">
          <div>
            {product.price !== null ? (
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-black text-slate-900">
                  ₹{product.price.toFixed(2)}
                </span>
                {product.mrp && product.mrp > product.price && (
                  <span className="text-xs text-slate-400 line-through">
                    ₹{product.mrp.toFixed(2)}
                  </span>
                )}
              </div>
            ) : (
              <div className="flex flex-col">
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Price on Request
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">Jan Aushadhi Subsidized Rate</span>
              </div>
            )}
          </div>

          {/* Savings pill if price exists */}
          {hasSavings && (
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Save ₹{savingsAmount} ({savingsPercent}%)
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2">
          {/* Order directly on WhatsApp */}
          <a
            href={askWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-bold text-white bg-[#087F5B] hover:bg-[#063B2B] active:bg-[#04281D] transition-all shadow-xs"
            title="Order this medicine directly on WhatsApp (90999 82030)"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#B8F36B] flex-shrink-0" />
            <span className="truncate">Order WhatsApp</span>
          </a>

          {/* Add to Order List */}
          <button
            onClick={() => onAddToCart(product)}
            disabled={!isAvailable}
            className={`inline-flex items-center justify-center gap-1 py-2 px-2 rounded-lg text-xs font-bold transition-all ${
              !isAvailable
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                : isInCart
                ? 'bg-emerald-100 text-[#063B2B] border border-emerald-300 hover:bg-emerald-200'
                : 'bg-slate-900 text-white hover:bg-slate-800 shadow-xs'
            }`}
            title="Add to order list"
          >
            <Plus className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{isInCart ? `Added (${cartQuantity})` : '+ Add to Order'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
