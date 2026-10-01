/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { ProductItem, CartItem, StoreInfo } from './types/pharmacy';
import { loadStoreInfo } from './services/catalogueService';
import { fetchAllMedicines, rowToProduct } from './services/medicineService';
import { FilterOptions, filterProducts } from './utils/search';

import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoryBar } from './components/CategoryBar';
import { SearchBar } from './components/SearchBar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { PrescriptionUploadModal } from './components/PrescriptionUploadModal';
import { AnimatedSearchModal } from './components/AnimatedSearchModal';
import { MobileMenuDrawer } from './components/MobileMenuDrawer';
import { FAQSection } from './components/FAQSection';
import { MapLocationSection } from './components/MapLocationSection';
import { GovernmentInitiativeSection } from './components/GovernmentInitiativeSection';
import { Footer } from './components/Footer';
import { formatWhatsAppUrlPhone } from './utils/whatsapp';

import {
  ShoppingCart,
  ShoppingBag,
  Plus,
  Layers,
  MessageCircle,
  AlertCircle,
  Search,
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
  Award,
  Zap,
  PhoneCall,
  Heart,
  Instagram,
  Facebook,
  Youtube
} from 'lucide-react';

const PAGE_SIZE = 40;

export default function App() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [storeInfo, setStoreInfo] = useState<StoreInfo>(loadStoreInfo);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('jan_aushadhi_cart_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    searchQuery: '',
    category: 'ALL',
    availabilityOnly: false,
    rxFilter: 'ALL',
    companyFilter: 'ALL',
    formulationFilter: 'ALL',
    sortBy: 'name-asc'
  });

  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);

  // Load catalogue on mount
  useEffect(() => {
    let cancelled = false;
    fetchAllMedicines()
      .then(rows => { if (!cancelled) setProducts(rows.map(rowToProduct)); })
      .catch(err => console.error('Failed to load medicines:', err));
    return () => { cancelled = true; };
  }, []);

  // Save cart
  useEffect(() => {
    try {
      localStorage.setItem('jan_aushadhi_cart_v1', JSON.stringify(cart));
    } catch (err) {
      console.warn('Cart persistence failed:', err);
    }
  }, [cart]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: products.length };
    for (const p of products) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    }
    return counts;
  }, [products]);

  // Compute unique companies list
  const companies = useMemo(() => {
    const set = new Set<string>();
    for (const p of products) {
      if (p.company) set.add(p.company);
    }
    return Array.from(set).sort();
  }, [products]);

  // Cart set of product IDs for quick lookup
  const cartProductIds = useMemo(() => {
    return new Set(cart.map(c => c.product.id));
  }, [cart]);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return filterProducts(products, filterOptions);
  }, [products, filterOptions]);

  // Reset pagination when filter criteria changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filterOptions]);

  // Cart operations
  const handleAddToCart = (product: ProductItem) => {
    if (product.isExpired || product.availability === 'OUT_OF_STOCK') {
      alert('This product cannot be added as it is out of stock or expired.');
      return;
    }

    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    // Open Cart Drawer directly so user can proceed to WhatsApp order 9099982030
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleAddAllToCart = (itemsToAdd: ProductItem[]) => {
    const eligible = itemsToAdd.filter(
      p => !p.isExpired && p.availability !== 'OUT_OF_STOCK'
    );
    if (eligible.length === 0) return;

    setCart(prev => {
      const existingMap = new Map(prev.map(item => [item.product.id, item]));
      for (const prod of eligible) {
        if (!existingMap.has(prod.id)) {
          existingMap.set(prod.id, { product: prod, quantity: 1 });
        }
      }
      return Array.from(existingMap.values());
    });
    setIsCartOpen(true);
  };

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-[#F7FAF8] flex flex-col font-sans text-slate-900" id="home">
      {/* 3-Layer Sticky Pharmacy Navigation Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenMenu={() => setIsMenuDrawerOpen(true)}
        onOpenPrescriptionModal={() => setIsPrescriptionModalOpen(true)}
        onNavigate={handleNavigate}
        storeInfo={storeInfo}
        selectedCategory={filterOptions.category}
        onSelectCategory={(cat) => setFilterOptions(prev => ({ ...prev, category: cat }))}
        categoryCounts={categoryCounts}
        searchQuery={filterOptions.searchQuery}
        onSearchChange={(q) => setFilterOptions(prev => ({ ...prev, searchQuery: q }))}
      />

      {/* Hero Section */}
      <HeroSection
        storeInfo={storeInfo}
        onOpenPrescription={() => setIsPrescriptionModalOpen(true)}
        onScrollToCatalogue={() => handleNavigate('catalogue-section')}
        onAddAllToCart={() => handleAddAllToCart(products)}
      />

      {/* Search & Filter Bar */}
      <div id="catalogue-section">
        <SearchBar
          filterOptions={filterOptions}
          onChangeOptions={setFilterOptions}
          companies={companies}
          totalResults={filteredProducts.length}
        />
      </div>

      {/* Main Product Catalogue Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
        {/* Quick Order Banner */}
        <div className="bg-gradient-to-r from-[#063B2B] via-[#087F5B] to-[#063B2B] text-white p-4 rounded-2xl shadow-md mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-emerald-400/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#B8F36B]/20 flex items-center justify-center flex-shrink-0">
              <ShoppingBag className="w-5 h-5 text-[#B8F36B]" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base leading-tight">
                Bulk Medicine Order List
              </h3>
              <p className="text-xs text-emerald-100 mt-0.5">
                {cart.length > 0
                  ? `${cart.length} medicines currently in your order list ready for WhatsApp.`
                  : 'Add all matching generic medicines to your order list in 1 click.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <button
              onClick={() => handleAddAllToCart(filteredProducts)}
              className="px-4 py-2.5 rounded-xl bg-[#B8F36B] hover:bg-[#a6ec4f] active:bg-[#92dc38] text-[#063B2B] font-extrabold text-xs flex items-center gap-1.5 shadow-sm transition active:scale-95 cursor-pointer whitespace-nowrap"
              title="Add all listed medicines to your order list"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add All ({filteredProducts.length}) to Order List</span>
            </button>

            {cart.length > 0 && (
              <button
                onClick={() => setIsCartOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 active:bg-white/30 text-white font-bold text-xs flex items-center gap-1.5 border border-white/25 transition cursor-pointer whitespace-nowrap"
              >
                <ShoppingCart className="w-4 h-4 text-[#B8F36B]" />
                <span>View Order List ({totalCartCount})</span>
              </button>
            )}
          </div>
        </div>

        {/* Active Filter Pill Summary */}
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="font-bold text-slate-700">Category:</span>
            <span className="px-2.5 py-1 bg-white border border-[#087F5B]/20 rounded-full font-semibold text-[#087F5B] shadow-2xs">
              {filterOptions.category === 'ALL' ? 'All Medicines & Products' : filterOptions.category}
            </span>

            {filterOptions.searchQuery && (
              <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-300 rounded-full text-emerald-800 font-semibold flex items-center gap-1">
                <Search className="w-3 h-3" />
                Query: "{filterOptions.searchQuery}"
              </span>
            )}

            {filterOptions.availabilityOnly && (
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-full font-medium">
                In Stock Only
              </span>
            )}

            {filterOptions.rxFilter !== 'ALL' && (
              <span className="px-2.5 py-1 bg-rose-50 text-rose-800 border border-rose-200 rounded-full font-medium">
                {filterOptions.rxFilter === 'RX_ONLY' ? 'Rx Prescription Only' : 'OTC Only'}
              </span>
            )}
          </div>

          {(filterOptions.searchQuery || filterOptions.category !== 'ALL' || filterOptions.availabilityOnly || filterOptions.rxFilter !== 'ALL' || filterOptions.companyFilter !== 'ALL') && (
            <button
              onClick={() =>
                setFilterOptions({
                  searchQuery: '',
                  category: 'ALL',
                  availabilityOnly: false,
                  rxFilter: 'ALL',
                  companyFilter: 'ALL',
                  formulationFilter: 'ALL',
                  sortBy: 'name-asc'
                })
              }
              className="text-xs text-slate-500 hover:text-red-600 flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear All Filters</span>
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        {displayedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {displayedProducts.map(product => {
                const cartItem = cart.find(item => item.product.id === product.id);
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    storeInfo={storeInfo}
                    onAddToCart={handleAddToCart}
                    isInCart={Boolean(cartItem)}
                    cartQuantity={cartItem?.quantity}
                    onSelectProduct={setSelectedProduct}
                  />
                );
              })}
            </div>

            {/* Pagination / Load More */}
            {visibleCount < filteredProducts.length && (
              <div className="flex items-center justify-center gap-3 mt-10 flex-wrap">
                <button
                  onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)}
                  className="px-6 py-3 rounded-xl bg-white border border-[#087F5B]/30 hover:bg-emerald-50 text-[#063B2B] text-xs font-bold shadow-xs transition cursor-pointer"
                >
                  Load Next 40 ({filteredProducts.length - visibleCount} remaining)
                </button>

                <button
                  onClick={() => setVisibleCount(filteredProducts.length)}
                  className="px-6 py-3 rounded-xl bg-[#087F5B] hover:bg-[#063B2B] text-white text-xs font-bold shadow-sm transition cursor-pointer flex items-center gap-1.5"
                >
                  <Layers className="w-4 h-4 text-[#B8F36B]" />
                  <span>Show All {filteredProducts.length} Medicines</span>
                </button>

                <button
                  onClick={() => handleAddAllToCart(filteredProducts)}
                  className="px-6 py-3 rounded-xl bg-[#B8F36B] hover:bg-[#a6ec4f] text-[#063B2B] text-xs font-extrabold shadow-sm transition active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Add All to Order List</span>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-base">No Matching Medicines Found</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We searched across the complete uploaded product catalogue. Try typing generic names such as{' '}
              <strong className="text-slate-700">Metformin</strong>,{' '}
              <strong className="text-slate-700">Thyroxine</strong>,{' '}
              <strong className="text-slate-700">Dolo</strong>, or browsing categories above.
            </p>
            <div className="pt-2">
              <button
                onClick={() =>
                  setFilterOptions({
                    searchQuery: '',
                    category: 'ALL',
                    availabilityOnly: false,
                    rxFilter: 'ALL',
                    companyFilter: 'ALL',
                    formulationFilter: 'ALL',
                    sortBy: 'name-asc'
                  })
                }
                className="px-4 py-2 bg-[#087F5B] text-white rounded-lg text-xs font-bold hover:bg-[#063B2B] transition"
              >
                Reset Search Filters
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Government Initiative Section (Factual PMBJP Information & Provided Asset) */}
      <GovernmentInitiativeSection />

      {/* How It Works Section */}
      <section className="bg-white py-12 px-4 sm:px-6 border-t border-slate-200" id="how-it-works">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-2 mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#087F5B]">
              HOW IT WORKS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#063B2B]">
              Affordable Healthcare in 3 Simple Steps
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              Order verified generic medicines directly from Jan Aushadhi Kendra, Adajan on WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F7FAF8] rounded-2xl p-6 border border-[#087F5B]/15 relative">
              <div className="w-10 h-10 rounded-xl bg-[#087F5B] text-[#B8F36B] font-extrabold flex items-center justify-center text-sm mb-4">
                01
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">Find Medicines in Catalogue</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Use our search bar or categories to find your prescribed medicine or its equivalent generic alternative.
              </p>
            </div>

            <div className="bg-[#F7FAF8] rounded-2xl p-6 border border-[#087F5B]/15 relative">
              <div className="w-10 h-10 rounded-xl bg-[#087F5B] text-[#B8F36B] font-extrabold flex items-center justify-center text-sm mb-4">
                02
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">Add to Order List</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Add required pack quantities to your cart. No complex checkout forms or registrations needed.
              </p>
            </div>

            <div className="bg-[#F7FAF8] rounded-2xl p-6 border border-[#087F5B]/15 relative">
              <div className="w-10 h-10 rounded-xl bg-[#087F5B] text-[#B8F36B] font-extrabold flex items-center justify-center text-sm mb-4">
                03
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">Order on WhatsApp</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Send your order to our registered pharmacist to verify stock, confirm generic rates, and arrange pickup or delivery in Adajan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us & Kendra Accreditation */}
      <section className="bg-emerald-950 text-white py-12 px-4 sm:px-6" id="about-us">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B8F36B]">
              ABOUT JAN AUSHADHI KENDRA ADAJAN
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Making Quality Medicines Accessible to Every Family in Surat
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Operating under the Pradhan Mantri Bhartiya Janaushadhi Pariyojana (PMBJP), Department of Pharmaceuticals, Government of India. We dispense authentic, quality-tested generic drugs equivalent in efficacy to top branded medications at a fraction of their cost.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="flex items-center gap-2 bg-emerald-900/60 p-3 rounded-xl border border-emerald-800">
                <Award className="w-4 h-4 text-[#B8F36B]" />
                <span>Govt. Subsidized Prices</span>
              </div>
              <div className="flex items-center gap-2 bg-emerald-900/60 p-3 rounded-xl border border-emerald-800">
                <ShieldCheck className="w-4 h-4 text-[#B8F36B]" />
                <span>WHO-GMP Quality</span>
              </div>
              <div className="flex items-center gap-2 bg-emerald-900/60 p-3 rounded-xl border border-emerald-800 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-[#B8F36B]" />
                <span>NABL Lab Tested</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white text-slate-900 p-6 rounded-2xl shadow-xl space-y-3" id="contact">
            <h3 className="font-extrabold text-slate-900 text-base">Contact Our Pharmacist</h3>
            <p className="text-xs text-slate-600">
              Have doubts about generic substitutions or need immediate availability? Call or WhatsApp us directly.
            </p>
            <div className="space-y-2 pt-1 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <PhoneCall className="w-4 h-4 text-[#087F5B]" />
                <span>Phone: <strong className="text-slate-900">{storeInfo.phone}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <MessageCircle className="w-4 h-4 text-[#087F5B]" />
                <span>WhatsApp: <strong className="text-slate-900">{storeInfo.whatsappNumber}</strong></span>
              </div>
            </div>
            <div className="pt-2 space-y-2">
              <a
                href={`https://wa.me/${formatWhatsAppUrlPhone(storeInfo.whatsappNumber)}?text=${encodeURIComponent(
                  'Hello Jan Aushadhi Kendra Adajan, I would like to enquire about medicines.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-[#087F5B] hover:bg-[#063B2B] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500">Official Social Channels:</span>
                <div className="flex items-center gap-2">
                  <a
                    href={storeInfo.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-600 flex items-center justify-center transition border border-pink-200"
                    title="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href={storeInfo.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 flex items-center justify-center transition border border-blue-200"
                    title="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href={storeInfo.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition border border-red-200"
                    title="YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Store Location Map & Made By */}
      <MapLocationSection storeInfo={storeInfo} />

      {/* FAQ Guidance */}
      <FAQSection />

      {/* Footer */}
      <Footer
        storeInfo={storeInfo}
        onOpenPrescription={() => setIsPrescriptionModalOpen(true)}
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-5 right-5 z-30 flex flex-col gap-2.5 pointer-events-auto">
        <a
          href={`https://wa.me/${formatWhatsAppUrlPhone(storeInfo.whatsappNumber)}?text=${encodeURIComponent(
            'Hello Jan Aushadhi Kendra Adajan, I would like to enquire about medicines.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 rounded-full bg-[#087F5B] hover:bg-[#063B2B] text-white shadow-xl flex items-center justify-center transition hover:scale-105 active:scale-95 border-2 border-white/60"
          title="Chat with Pharmacist"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </a>

        {totalCartCount > 0 && (
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-13 h-13 rounded-full bg-[#063B2B] hover:bg-slate-900 text-white shadow-xl flex items-center justify-center transition relative hover:scale-105 active:scale-95 border-2 border-white/60"
            title="Open Order List & Proceed to WhatsApp"
          >
            <ShoppingCart className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 rounded-full bg-[#B8F36B] text-[#063B2B] font-extrabold text-[11px] flex items-center justify-center border border-[#087F5B]">
              {totalCartCount}
            </span>
          </button>
        )}
      </div>

      {/* Floating Bottom WhatsApp Order Reminder Pill */}
      {totalCartCount > 0 && !isCartOpen && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-md animate-in fade-in slide-in-from-bottom-3 duration-300 pointer-events-auto">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-[#063B2B] text-white p-3 rounded-2xl shadow-2xl border border-emerald-500/30 flex items-center justify-between gap-2.5 hover:bg-[#04281D] active:scale-[0.99] transition cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-8 h-8 rounded-xl bg-[#B8F36B] text-[#063B2B] font-black text-xs flex items-center justify-center flex-shrink-0">
                {totalCartCount}
              </span>
              <div className="text-left truncate">
                <p className="text-xs font-bold text-white truncate">
                  {totalCartCount} {totalCartCount === 1 ? 'medicine' : 'medicines'} in order list
                </p>
                <p className="text-[10px] text-emerald-300 truncate">
                  Send to WhatsApp: {storeInfo.whatsappNumber}
                </p>
              </div>
            </div>

            <span className="px-3 py-1.5 rounded-xl bg-[#087F5B] text-[#B8F36B] font-extrabold text-xs flex items-center gap-1.5 flex-shrink-0 shadow-xs">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Order Now</span>
            </span>
          </button>
        </div>
      )}

      {/* Modals & Drawers */}
      <AnimatedSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        products={products}
        storeInfo={storeInfo}
        onAddToCart={handleAddToCart}
        onSelectProduct={setSelectedProduct}
        cartProductIds={cartProductIds}
      />

      <MobileMenuDrawer
        isOpen={isMenuDrawerOpen}
        onClose={() => setIsMenuDrawerOpen(false)}
        storeInfo={storeInfo}
        onNavigate={handleNavigate}
        onOpenPrescription={() => setIsPrescriptionModalOpen(true)}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        storeInfo={storeInfo}
        onAddToCart={handleAddToCart}
        isInCart={Boolean(cart.find(i => i.product.id === selectedProduct?.id))}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        storeInfo={storeInfo}
      />

      <PrescriptionUploadModal
        isOpen={isPrescriptionModalOpen}
        onClose={() => setIsPrescriptionModalOpen(false)}
        storeInfo={storeInfo}
      />
    </div>
  );
}
