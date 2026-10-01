/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ProductCategory =
  | 'ALL'
  | 'Diabetes'
  | 'Cardiac & Heart'
  | 'Blood Pressure'
  | 'Pain Relief'
  | 'Fever'
  | 'Cold & Cough'
  | 'Gastro'
  | 'Thyroid'
  | 'Vitamins & Supplements'
  | 'Skin Care'
  | 'Eye Care'
  | 'ENT'
  | 'Respiratory'
  | "Women's Health"
  | "Men's Health"
  | 'Baby Care'
  | 'Personal Care'
  | 'Medical Devices'
  | 'First Aid'
  | 'OTC'
  | 'Other';

export type AvailabilityStatus = 'IN_STOCK' | 'LIMITED' | 'OUT_OF_STOCK';

export interface ProductItem {
  id: string;
  productName: string;
  packing: string;
  company: string;
  batchNumber: string | null;
  expiry: string | null; // e.g. "2027-04" or null
  expiryDate?: string | null;
  quantity: number | null; // internal quantity
  price: number | null; // selling price in INR. null means "Price on Request"
  mrp?: number | null; // maximum retail price
  category: ProductCategory;
  prescriptionRequired: boolean; // Rx required
  availability: AvailabilityStatus;
  composition?: string | null; // Salt / Molecule formulation
  formulation?: string;
  notes?: string | null;
  isExpired?: boolean;
  image?: string | null;
  hidden?: boolean;
}

export interface CatalogueImportReport {
  totalSourceRecords: number;
  successfullyImported: number;
  updatedRecords: number;
  newProducts: number;
  duplicatesDetected: number;
  invalidRecords: number;
  missingProductNames: number;
  expiredProducts: number;
  outOfStockProducts: number;
  importDate: string;
  fileName: string;
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

export interface CustomerOrderDetails {
  customerName: string;
  mobile: string;
  deliveryType: 'Store Pickup' | 'Home Delivery';
  address: string;
  prescriptionFile?: string | null;
  prescriptionFileName?: string | null;
  notes?: string;
}

export interface StoreInfo {
  storeName: string;
  subTitle: string;
  kendraCode: string;
  location: string;
  fullAddress: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  timings: string;
  pharmacistName: string;
  drugLicenseNo: string;
  showInternalStockToCustomers: boolean;
  showBatchToCustomers: boolean;
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
}
