/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProductItem, ProductCategory } from '../types/pharmacy';

export interface FilterOptions {
  searchQuery: string;
  category: ProductCategory | 'ALL';
  availabilityOnly: boolean; // only in stock / limited
  rxFilter: 'ALL' | 'RX_ONLY' | 'OTC_ONLY';
  companyFilter: string; // 'ALL' or specific code
  formulationFilter: string; // 'ALL' or specific
  sortBy: 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'availability';
}

/**
 * Normalizes query string for partial, typo-tolerant search
 */
function cleanString(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Fast Levenshtein distance for short tokens
 */
function levenshtein(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Checks if search terms match the product
 */
function matchProduct(product: ProductItem, query: string): boolean {
  if (!query) return true;

  const cleanQ = cleanString(query);
  const qTokens = cleanQ.split(' ').filter(t => t.length > 0);

  const targetStr = cleanString(
    `${product.id} ${product.productName} ${product.packing} ${product.company} ${product.category} ${product.composition || ''} ${product.formulation || ''}`
  );

  // Direct substring inclusion check
  if (targetStr.includes(cleanQ)) return true;

  const targetTokens = targetStr.split(' ');

  // Every query token should either be a substring of a target token or within 1 edit distance
  return qTokens.every(qToken => {
    // Exact or prefix/substring match
    const hasSubstring = targetTokens.some(t => t.includes(qToken));
    if (hasSubstring) return true;

    // For tokens longer than 4 chars, allow 1 typo
    if (qToken.length >= 4) {
      return targetTokens.some(t => {
        if (Math.abs(t.length - qToken.length) <= 1) {
          return levenshtein(qToken, t) <= 1;
        }
        return false;
      });
    }

    return false;
  });
}

/**
 * Filter and sort products according to criteria
 */
export function filterProducts(products: ProductItem[], options: FilterOptions): ProductItem[] {
  return products
    .filter(item => {
      // 0. Hidden check
      if (item.hidden) {
        return false;
      }

      // 1. Text search
      if (!matchProduct(item, options.searchQuery)) {
        return false;
      }

      // 2. Category filter
      if (options.category !== 'ALL' && item.category !== options.category) {
        return false;
      }

      // 3. Availability filter
      if (options.availabilityOnly) {
        if (item.availability === 'OUT_OF_STOCK' || item.isExpired) {
          return false;
        }
      }

      // 4. Rx filter
      if (options.rxFilter === 'RX_ONLY' && !item.prescriptionRequired) {
        return false;
      }
      if (options.rxFilter === 'OTC_ONLY' && item.prescriptionRequired) {
        return false;
      }

      // 5. Company filter
      if (options.companyFilter !== 'ALL' && item.company !== options.companyFilter) {
        return false;
      }

      // 6. Formulation filter
      if (options.formulationFilter !== 'ALL' && item.formulation !== options.formulationFilter) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (options.sortBy === 'name-asc') {
        return a.productName.localeCompare(b.productName);
      }
      if (options.sortBy === 'name-desc') {
        return b.productName.localeCompare(a.productName);
      }
      if (options.sortBy === 'price-asc') {
        const pa = a.price ?? 999999;
        const pb = b.price ?? 999999;
        return pa - pb;
      }
      if (options.sortBy === 'price-desc') {
        const pa = a.price ?? -1;
        const pb = b.price ?? -1;
        return pb - pa;
      }
      if (options.sortBy === 'availability') {
        const score = (item: ProductItem) =>
          item.isExpired ? 0 : item.availability === 'IN_STOCK' ? 3 : item.availability === 'LIMITED' ? 2 : 1;
        return score(b) - score(a);
      }
      return 0;
    });
}
