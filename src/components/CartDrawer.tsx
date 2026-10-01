/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { CartItem, CustomerOrderDetails, StoreInfo } from '../types/pharmacy';
import {
  validateCartForOrdering,
  generateWhatsAppMessage,
  createWhatsAppOrderUrl,
  generatePlainTextOrderList
} from '../utils/whatsapp';
import {
  X,
  Plus,
  Minus,
  Trash2,
  MessageCircle,
  AlertTriangle,
  Upload,
  FileCheck,
  FileText,
  Zap,
  Copy,
  Check,
  Search
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, newQty: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  storeInfo: StoreInfo;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  storeInfo,
}) => {
  const [orderDetails, setOrderDetails] = useState<Partial<CustomerOrderDetails>>({
    prescriptionFileName: null,
    notes: '',
  });

  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [cartSearchQuery, setCartSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  const filteredCart = useMemo(() => {
    if (!cartSearchQuery.trim()) return cart;
    const q = cartSearchQuery.toLowerCase();
    return cart.filter(i =>
      i.product.productName.toLowerCase().includes(q) ||
      i.product.company.toLowerCase().includes(q)
    );
  }, [cart, cartSearchQuery]);

  const handleCopyOrderList = async () => {
    try {
      const text = generatePlainTextOrderList(cart, storeInfo.whatsappNumber);
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy order list:', err);
    }
  };

  if (!isOpen) return null;

  const hasRxItem = cart.some(item => item.product.prescriptionRequired);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOrderDetails(prev => ({
        ...prev,
        prescriptionFileName: file.name,
      }));
    }
  };

  const handleWhatsAppSubmit = () => {
    // 1. Validate cart safety (no expired/out-of-stock items)
    const validation = validateCartForOrdering(cart);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    setValidationErrors([]);

    // Open WhatsApp directly to buy
    const url = createWhatsAppOrderUrl(storeInfo.whatsappNumber, cart, orderDetails);
    window.open(url, '_blank');
  };

  const totalCalculated = cart.reduce((sum, item) => {
    if (typeof item.product.price === 'number') {
      return sum + item.product.price * item.quantity;
    }
    return sum;
  }, 0);

  const hasUnpricedItems = cart.some(item => item.product.price === null);
  const previewMessage = generateWhatsAppMessage(cart, orderDetails);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end">
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-4 bg-emerald-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-emerald-300" />
            <div>
              <h2 className="font-bold text-lg leading-tight">Buy on WhatsApp</h2>
              <p className="text-xs text-emerald-100">
                Direct order with {storeInfo.storeName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Validation banner */}
          {validationErrors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-red-700 space-y-1">
              <div className="font-bold flex items-center gap-1">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                Please address the following:
              </div>
              <ul className="list-disc pl-4 space-y-0.5">
                {validationErrors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Quick Notice */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900 flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Instant checkout: No registration, no forms. Your selected items open directly in WhatsApp!</span>
          </div>

          {/* Rx Warning */}
          {hasRxItem && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800 flex items-start gap-2">
              <FileText className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Doctor Prescription Required:</span> Contains Schedule H medicine. You can attach a prescription photo below or send it directly on WhatsApp.
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div>
            <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Selected Medicines ({cart.length})
              </span>
              <div className="flex items-center gap-2">
                {cart.length > 0 && (
                  <button
                    onClick={handleCopyOrderList}
                    className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                    title="Copy full list to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span>Copy List</span>
                      </>
                    )}
                  </button>
                )}
                {cart.length > 0 && (
                  <button
                    onClick={onClearCart}
                    className="text-xs text-slate-400 hover:text-red-600 transition"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {cart.length > 5 && (
              <div className="relative mb-2.5">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={cartSearchQuery}
                  onChange={(e) => setCartSearchQuery(e.target.value)}
                  placeholder="Filter within order list..."
                  className="w-full text-xs pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg bg-white focus:outline-emerald-500"
                />
              </div>
            )}

            {cart.length === 0 ? (
              <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-xl">
                <p className="text-sm font-semibold text-slate-600">Your order list is empty</p>
                <p className="text-xs text-slate-400 mt-1">Browse our medicines and add items to buy.</p>
              </div>
            ) : filteredCart.length === 0 ? (
              <div className="text-center py-6 text-xs text-slate-500">
                No items in your order list match "{cartSearchQuery}".
              </div>
            ) : (
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50 max-h-96 overflow-y-auto">
                {filteredCart.map(({ product, quantity }) => (
                  <div key={product.id} className="p-3 bg-white flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-slate-900 truncate">
                          {product.productName}
                        </span>
                        {product.prescriptionRequired && (
                          <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200">
                            Rx
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                        <span>Pack: <strong className="text-slate-700">{product.packing}</strong></span>
                        <span>•</span>
                        <span>Co: {product.company}</span>
                      </div>
                      <div className="text-xs font-semibold text-slate-800 mt-1">
                        {product.price !== null ? (
                          <span>₹{product.price.toFixed(2)} / pack</span>
                        ) : (
                          <span className="text-amber-700 text-[11px]">Price on Request</span>
                        )}
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                        <button
                          onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                          className="p-1.5 text-slate-600 hover:text-slate-900"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-slate-800">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                          className="p-1.5 text-slate-600 hover:text-slate-900"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(product.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 transition"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Optional Attachments / Note */}
          {cart.length > 0 && (
            <div className="space-y-3 pt-2">
              {/* Optional Doctor's Prescription Upload */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Optional: Attach Doctor's Prescription
                </label>
                <div className="border border-slate-200 rounded-lg p-2.5 bg-slate-50 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs truncate">
                    {orderDetails.prescriptionFileName ? (
                      <span className="font-semibold text-emerald-700 flex items-center gap-1 truncate">
                        <FileCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        {orderDetails.prescriptionFileName}
                      </span>
                    ) : (
                      <span className="text-slate-500">Attach doctor slip (photo / PDF)</span>
                    )}
                  </div>
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-md text-xs font-medium text-slate-700 hover:bg-slate-100 flex-shrink-0">
                    <Upload className="w-3.5 h-3.5 text-slate-500" />
                    <span>{orderDetails.prescriptionFileName ? 'Change' : 'Choose File'}</span>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Optional Note */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Optional Note for Pharmacist
                </label>
                <input
                  type="text"
                  value={orderDetails.notes || ''}
                  onChange={(e) => setOrderDetails(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="e.g. Any specific brand or dosage preference"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              {/* Toggle WhatsApp Preview */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="text-xs text-emerald-700 hover:text-emerald-800 font-medium underline"
                >
                  {showPreview ? 'Hide WhatsApp Message Preview' : 'Show WhatsApp Message Preview'}
                </button>
                {showPreview && (
                  <pre className="mt-2 p-3 bg-slate-100 rounded-lg text-[11px] font-mono whitespace-pre-wrap text-slate-800 border border-slate-200">
                    {previewMessage}
                  </pre>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
            {/* Price overview */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Total Price Estimate:</span>
              <div className="text-right">
                {totalCalculated > 0 ? (
                  <span className="font-extrabold text-slate-900 text-base">
                    ₹{totalCalculated.toFixed(2)}
                  </span>
                ) : null}
                {hasUnpricedItems && (
                  <span className="block text-[11px] text-amber-700 font-medium">
                    (Final price will be confirmed by pharmacist)
                  </span>
                )}
              </div>
            </div>

            {/* Direct Buy on WhatsApp Button */}
            <a
              href={createWhatsAppOrderUrl(storeInfo.whatsappNumber, cart, orderDetails)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-[#087F5B] hover:bg-[#063B2B] active:bg-[#04281D] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 text-[#B8F36B]" />
              <span>SEND ORDER TO WHATSAPP ({storeInfo.whatsappNumber})</span>
            </a>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-center text-slate-500">
              <Zap className="w-3.5 h-3.5 text-[#087F5B]" />
              <span>Direct dispatch to: <strong className="text-slate-800 font-bold">{storeInfo.whatsappNumber}</strong> (Jan Aushadhi Kendra, Adajan)</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
