/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductItem, StoreInfo } from '../types/pharmacy';
import { filterProducts, FilterOptions } from '../utils/search';
import { createSingleProductOrderUrl } from '../utils/whatsapp';
import {
  Search,
  X,
  Clock,
  TrendingUp,
  FileText,
  Plus,
  MessageCircle,
  Package,
  Building2,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface AnimatedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: ProductItem[];
  storeInfo: StoreInfo;
  onAddToCart: (product: ProductItem) => void;
  onSelectProduct: (product: ProductItem) => void;
  cartProductIds: Set<string>;
}

const POPULAR_SEARCHES = [
  'THYROXINE',
  'METFORMIN',
  'DOLO-650',
  'ATORVASTATIN',
  'VOGLIBOSE',
  'AZITHROMYCIN',
  'BPPI Generic',
  'PARACETAMOL',
  'TELMISARTAN',
  'PANTOPRAZOLE'
];

export const AnimatedSearchModal: React.FC<AnimatedSearchModalProps> = ({
  isOpen,
  onClose,
  products,
  storeInfo,
  onAddToCart,
  onSelectProduct,
  cartProductIds,
}) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('jan_aushadhi_recent_searches');
      return saved ? JSON.parse(saved) : ['Thyroxine', 'Dolo', 'Metformin'];
    } catch {
      return ['Thyroxine', 'Dolo', 'Metformin'];
    }
  });

  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const addRecentSearch = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    const updated = [trimmed, ...recentSearches.filter(s => s.toLowerCase() !== trimmed.toLowerCase())].slice(0, 8);
    setRecentSearches(updated);
    try {
      localStorage.setItem('jan_aushadhi_recent_searches', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem('jan_aushadhi_recent_searches');
    } catch {
      // ignore
    }
  };

  const handleSelectQuery = (term: string) => {
    const q = term === 'BPPI Generic' ? 'BPP' : term;
    setQuery(q);
    addRecentSearch(term);
  };

  // Live results
  const searchResults = React.useMemo(() => {
    if (!query.trim()) return [];
    const options: FilterOptions = {
      searchQuery: query,
      category: 'ALL',
      availabilityOnly: false,
      rxFilter: 'ALL',
      companyFilter: 'ALL',
      formulationFilter: 'ALL',
      sortBy: 'name-asc'
    };
    return filterProducts(products, options).slice(0, 24);
  }, [query, products]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-[#063B2B]/60 backdrop-blur-md flex flex-col"
        >
          {/* Header Search Box */}
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full bg-[#F7FAF8] border-b border-[#087F5B]/15 shadow-md px-4 sm:px-6 py-4"
          >
            <div className="max-w-4xl mx-auto flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-[#087F5B] absolute left-3.5 top-3.5" strokeWidth={1.75} />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && query.trim()) {
                      addRecentSearch(query);
                    }
                  }}
                  placeholder="Search medicines, brands or companies..."
                  className="w-full bg-white pl-11 pr-10 py-3 rounded-2xl border border-[#087F5B]/25 text-sm sm:text-base text-[#063B2B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#087F5B] focus:border-transparent shadow-2xs font-medium"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-700 p-1"
                  >
                    <X className="w-4 h-4" strokeWidth={2} />
                  </button>
                )}
              </div>

              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-[#063B2B] hover:bg-slate-200/70 transition flex-shrink-0"
              >
                Cancel
              </button>
            </div>
          </motion.div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* If no query yet, show Recent and Popular Searches */}
              {!query.trim() && (
                <div className="space-y-6">
                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div className="bg-white/95 rounded-2xl p-4 sm:p-5 border border-[#087F5B]/10 shadow-xs">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#063B2B] uppercase tracking-wider">
                          <Clock className="w-4 h-4 text-[#087F5B]" strokeWidth={1.75} />
                          <span>Recent Searches</span>
                        </div>
                        <button
                          onClick={clearRecentSearches}
                          className="text-[11px] text-slate-400 hover:text-red-600 transition"
                        >
                          Clear
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((term, index) => (
                          <button
                            key={index}
                            onClick={() => handleSelectQuery(term)}
                            className="px-3 py-1.5 rounded-full bg-[#F7FAF8] hover:bg-[#B8F36B]/25 border border-[#087F5B]/15 text-xs text-[#063B2B] font-medium transition flex items-center gap-1.5"
                          >
                            <span>{term}</span>
                            <ArrowRight className="w-3 h-3 text-slate-400" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Popular Searches */}
                  <div className="bg-white/95 rounded-2xl p-4 sm:p-5 border border-[#087F5B]/10 shadow-xs">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#063B2B] uppercase tracking-wider mb-3">
                      <TrendingUp className="w-4 h-4 text-amber-500" strokeWidth={1.75} />
                      <span>Popular in Jan Aushadhi Catalogue</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {POPULAR_SEARCHES.map((term, index) => (
                        <button
                          key={index}
                          onClick={() => handleSelectQuery(term)}
                          className="px-3.5 py-1.5 rounded-full bg-[#F7FAF8] hover:bg-emerald-100/60 border border-[#087F5B]/15 text-xs font-semibold text-[#063B2B] transition"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Trust Banner */}
                  <div className="p-4 rounded-2xl bg-[#063B2B]/90 text-white text-xs flex items-center gap-3 border border-[#B8F36B]/20">
                    <ShieldCheck className="w-6 h-6 text-[#B8F36B] flex-shrink-0" strokeWidth={1.75} />
                    <p className="leading-relaxed">
                      Search directly within our registered pharmacy database of <strong>8,785+ authentic generic medicines</strong> from Jan Aushadhi Kendra, Adajan.
                    </p>
                  </div>
                </div>
              )}

              {/* If query entered: Live Results */}
              {query.trim() && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-white/90 px-1">
                    <span>
                      Found <strong className="text-[#B8F36B] font-bold">{searchResults.length}</strong> matching medicines for "{query}"
                    </span>
                    <span className="text-[11px] text-emerald-200">
                      Jan Aushadhi Kendra Adajan
                    </span>
                  </div>

                  {searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {searchResults.map((product) => {
                        const isInCart = cartProductIds.has(product.id);
                        const askUrl = createSingleProductOrderUrl(
                          storeInfo.whatsappNumber,
                          product.productName,
                          product.packing,
                          product.price
                        );

                        return (
                          <div
                            key={product.id}
                            className="bg-white rounded-xl p-3.5 border border-[#087F5B]/15 hover:border-[#087F5B] transition shadow-xs flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-1 mb-1.5">
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                                  {product.category}
                                </span>
                                {product.prescriptionRequired && (
                                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                                    <FileText className="w-2.5 h-2.5" />
                                    Rx
                                  </span>
                                )}
                              </div>

                              <h4
                                onClick={() => {
                                  onSelectProduct(product);
                                  onClose();
                                }}
                                className="font-bold text-sm text-[#063B2B] hover:text-[#087F5B] cursor-pointer line-clamp-2"
                              >
                                {product.productName}
                              </h4>

                              <div className="mt-2 text-[11px] text-slate-500 space-y-0.5">
                                <div className="flex items-center gap-1">
                                  <Package className="w-3 h-3 text-slate-400" />
                                  <span>Pack: <strong className="text-slate-700">{product.packing}</strong></span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Building2 className="w-3 h-3 text-slate-400" />
                                  <span>Company: {product.company}</span>
                                </div>
                              </div>
                            </div>

                            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                              <div>
                                {product.price !== null ? (
                                  <span className="font-extrabold text-[#063B2B] text-sm">
                                    ₹{product.price.toFixed(2)}
                                  </span>
                                ) : (
                                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                                    Price on Request
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-1.5">
                                <a
                                  href={askUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg bg-emerald-50 text-[#087F5B] hover:bg-emerald-100"
                                  title="Enquire on WhatsApp"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                </a>

                                <button
                                  onClick={() => {
                                    onAddToCart(product);
                                    addRecentSearch(query);
                                  }}
                                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                                    isInCart
                                      ? 'bg-[#087F5B] text-white'
                                      : 'bg-slate-900 text-white hover:bg-slate-800'
                                  }`}
                                >
                                  <Plus className="w-3 h-3" />
                                  <span>{isInCart ? 'Added' : 'Add'}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="bg-white/95 rounded-2xl p-8 text-center border border-slate-200 shadow-xs space-y-2">
                      <p className="text-sm font-bold text-slate-800">
                        No products found for "{query}"
                      </p>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        Try searching by generic salt (e.g. <em>Metformin, Atorvastatin, Paracetamol, Dolo</em>) or explore categories.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
