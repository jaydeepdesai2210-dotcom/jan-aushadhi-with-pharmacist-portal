/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProductItem, StoreInfo } from '../types/pharmacy';
import { RAW_CATALOGUE_DATA, type RawCatalogueRow } from '../data/rawCatalogue';
import { ADDITIONAL_CATALOGUE_DATA } from '../data/catalogueExtension';
import {
  classifyCategory,
  isPrescriptionRequired,
  detectFormulation,
  determineAvailability,
  checkIsExpired
} from '../utils/catalogueClassifier';

export type { RawCatalogueRow };

export const ALL_BUILTIN_CATALOGUE_DATA: RawCatalogueRow[] = [
  ...RAW_CATALOGUE_DATA,
  ...ADDITIONAL_CATALOGUE_DATA
];

const STORAGE_KEY_PRODUCTS = 'jan_aushadhi_products_v1';
const STORAGE_KEY_STORE_INFO = 'jan_aushadhi_store_info_v1';

export const DEFAULT_STORE_INFO: StoreInfo = {
  storeName: 'Pradhan Mantri Bhartiya Jan Aushadhi Kendra',
  subTitle: 'Adajan, Surat — Government Generic Medicine Store',
  kendraCode: 'PMBJP-GJ-SUR-0482',
  location: 'Adajan, Surat, Gujarat',
  fullAddress: 'Shop No. 4, Ground Floor, Royal Complex, Anand Mahal Road, Adajan, Surat - 395009, Gujarat',
  phone: '+91 9099982030',
  whatsappNumber: '+91 9099982030',
  email: 'janaushadhi.adajan@gmail.com',
  timings: 'Mon - Sat: 9:00 AM - 9:30 PM | Sun: 10:00 AM - 10:00 PM',
  pharmacistName: 'Registered Pharmacist (Reg. No: G-48291)',
  drugLicenseNo: 'GJ-SUR-20B-184920 / 21B-184921',
  showInternalStockToCustomers: false,
  showBatchToCustomers: false,
  instagramUrl: 'https://www.instagram.com/janaushadhikendraadajan?stkn=OHo2d2U2eTBmMGlp',
  facebookUrl: 'https://www.facebook.com/share/1DAFNBXMJi/',
  youtubeUrl: 'https://youtube.com/@janaushadhikendraadajan2129?si=NCtfn9TcNu0EppCL',
};

/**
 * Normalizes raw catalogue entry into structured ProductItem
 */
export function normalizeProduct(raw: RawCatalogueRow): ProductItem {
  const category = classifyCategory(raw.name);
  const rx = isPrescriptionRequired(raw.name, category);
  const formulation = detectFormulation(raw.name, raw.packing);
  const isExpired = checkIsExpired(raw.exp);
  const availability = determineAvailability(raw.qty, raw.exp);

  return {
    id: raw.id || `PROD-${Math.random().toString(36).substr(2, 9)}`,
    productName: raw.name.trim(),
    packing: raw.packing ? raw.packing.trim() : '',
    company: raw.company ? raw.company.trim() : '',
    batchNumber: raw.batch ? raw.batch.trim() : null,
    expiry: raw.exp ? raw.exp.trim() : null,
    quantity: typeof raw.qty === 'number' ? raw.qty : null,
    price: typeof raw.price === 'number' ? raw.price : null,
    mrp: typeof raw.mrp === 'number' ? raw.mrp : null,
    category,
    prescriptionRequired: rx,
    availability,
    formulation,
    isExpired,
    notes: null,
  };
}

/**
 * Loads products from localStorage or initializes from the uploaded catalogue
 */
export function loadCatalogue(): ProductItem[] {
  const initial = ALL_BUILTIN_CATALOGUE_DATA.map(normalizeProduct);
  if (typeof window === 'undefined') {
    return initial;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS);
    if (saved) {
      const parsed = JSON.parse(saved) as ProductItem[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        // If saved list has fewer items than our latest built-in dataset, merge new items!
        const existingNames = new Set(parsed.map(p => p.productName.toUpperCase()));
        const newBuiltinItems = initial.filter(p => !existingNames.has(p.productName.toUpperCase()));
        const merged = [...parsed, ...newBuiltinItems].map((item) => ({
          ...item,
          isExpired: checkIsExpired(item.expiry),
          availability: determineAvailability(item.quantity, item.expiry),
        }));
        if (newBuiltinItems.length > 0) {
          saveCatalogue(merged);
        }
        return merged;
      }
    }
  } catch (err) {
    console.warn('Failed to load catalogue from localStorage:', err);
  }

  saveCatalogue(initial);
  return initial;
}

export function saveCatalogue(products: ProductItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
  } catch (err) {
    console.error('Failed to save catalogue to localStorage:', err);
  }
}

export function resetCatalogueToUploadedDefault(): ProductItem[] {
  const fresh = ALL_BUILTIN_CATALOGUE_DATA.map(normalizeProduct);
  saveCatalogue(fresh);
  return fresh;
}

export function loadStoreInfo(): StoreInfo {
  if (typeof window === 'undefined') return DEFAULT_STORE_INFO;
  try {
    const saved = localStorage.getItem(STORAGE_KEY_STORE_INFO);
    if (saved) {
      const parsed = JSON.parse(saved);
      let needsSave = false;
      if (!parsed.whatsappNumber || !parsed.whatsappNumber.includes('9099982030') || parsed.whatsappNumber.includes('90999820301')) {
        parsed.whatsappNumber = '+919099982030';
        parsed.phone = '+91 90999 82030';
        needsSave = true;
      }
      if (!parsed.timings || parsed.timings.includes('2:00 PM')) {
        parsed.timings = 'Mon - Sat: 9:00 AM - 9:30 PM | Sun: 10:00 AM - 10:00 PM';
        needsSave = true;
      }
      if (needsSave || !parsed.instagramUrl || parsed.instagramUrl === 'https://instagram.com') {
        parsed.instagramUrl = 'https://www.instagram.com/janaushadhikendraadajan?stkn=OHo2d2U2eTBmMGlp';
        parsed.facebookUrl = 'https://www.facebook.com/share/1DAFNBXMJi/';
        parsed.youtubeUrl = 'https://youtube.com/@janaushadhikendraadajan2129?si=NCtfn9TcNu0EppCL';
        saveStoreInfo({ ...DEFAULT_STORE_INFO, ...parsed });
      }
      return { ...DEFAULT_STORE_INFO, ...parsed };
    }
  } catch (err) {
    console.warn('Failed to load store info:', err);
  }
  return DEFAULT_STORE_INFO;
}

export function saveStoreInfo(info: StoreInfo): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_STORE_INFO, JSON.stringify(info));
  } catch (err) {
    console.error('Failed to save store info:', err);
  }
}

/**
 * Parser for user-uploaded text or CSV/TSV from inventory
 */
export function parseRawCatalogueText(text: string): ProductItem[] {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
  const items: ProductItem[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Skip headers
    if (
      line.toUpperCase().includes('PRODUCT NAME') &&
      line.toUpperCase().includes('PACKING')
    ) {
      continue;
    }

    // Try comma separated, tab separated, or whitespace separated
    let cols: string[] = [];
    if (line.includes('\t')) {
      cols = line.split('\t').map(c => c.trim());
    } else if (line.includes(',')) {
      cols = line.split(',').map(c => c.trim().replace(/^"|"$/g, ''));
    } else {
      // Space separated row: "101-VOGLIBOSE-0.2 TABLETS 10TAB CLB"
      const match = line.match(/^(\d+[\s\t]+)?(.+?)[\s\t]+([0-9]+[A-Za-z]+|[0-9]+[\s]*[A-Za-z]+|\d+PCS|\d+TAB|\d+CAP|\d+ML|\d+GM)[\s\t]+([A-Za-z0-9\.\-\&]+)(.*)$/i);
      if (match) {
        cols = [match[2].trim(), match[3].trim(), match[4].trim()];
      } else {
        // Fallback split
        const parts = line.split(/\s{2,}/);
        if (parts.length >= 2) {
          cols = parts;
        } else {
          continue;
        }
      }
    }

    if (cols.length >= 2) {
      let name = cols[0];
      // Strip leading index number if present
      name = name.replace(/^\d+[\s\t\.\-]+/, '').trim();
      const packing = cols[1] || '';
      const company = cols[2] || '';
      const batchNumber = cols[3] && cols[3] !== '-' ? cols[3] : null;
      const expiry = cols[4] && cols[4] !== '-' ? cols[4] : null;
      const quantity = cols[5] && !isNaN(Number(cols[5])) ? Number(cols[5]) : null;
      const price = cols[6] && !isNaN(Number(cols[6])) ? Number(cols[6]) : null;
      const mrp = cols[7] && !isNaN(Number(cols[7])) ? Number(cols[7]) : null;

      if (name.length > 1) {
        const rawRow: RawCatalogueRow = {
          id: `IMP-${Date.now()}-${i + 1}`,
          name,
          packing,
          company,
          batch: batchNumber || undefined,
          exp: expiry || undefined,
          qty: quantity ?? undefined,
          price: price ?? undefined,
          mrp: mrp ?? undefined
        };
        items.push(normalizeProduct(rawRow));
      }
    }
  }

  return items;
}
