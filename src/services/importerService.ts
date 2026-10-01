/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { ProductItem, CatalogueImportReport } from '../types/pharmacy';
import { normalizeProduct, RawCatalogueRow } from './catalogueService';

export interface ParseResult {
  report: CatalogueImportReport;
  products: ProductItem[];
  duplicates: ProductItem[];
  invalidRows: any[];
}

/**
 * Parses CSV text or file
 */
export async function parseCsvFile(file: File): Promise<RawCatalogueRow[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<any>(file, {
      header: false,
      skipEmptyLines: true,
      complete: (results) => {
        const rows: RawCatalogueRow[] = [];
        const data = results.data;
        if (!Array.isArray(data) || data.length === 0) {
          resolve([]);
          return;
        }

        // Determine if first row is header
        let startIndex = 0;
        const firstRowStr = (data[0] || []).join(' ').toUpperCase();
        if (firstRowStr.includes('PRODUCT') || firstRowStr.includes('NAME') || firstRowStr.includes('PACKING')) {
          startIndex = 1;
        }

        for (let i = startIndex; i < data.length; i++) {
          const row = data[i];
          if (!row || row.length === 0) continue;
          
          // Map typical columns A, B, C, D, E, F
          const name = String(row[0] || '').trim();
          if (!name || name.toUpperCase() === 'GRAND TOTAL' || name.toUpperCase() === 'VALUATION TOTAL') {
            continue;
          }

          const packing = String(row[1] || '').trim();
          const company = String(row[2] || '').trim();
          const batch = row[3] ? String(row[3]).trim() : undefined;
          const exp = row[4] ? String(row[4]).trim() : undefined;
          const qty = row[5] ? parseFloat(String(row[5])) : undefined;
          const price = row[7] ? parseFloat(String(row[7])) : undefined;
          const mrp = row[8] ? parseFloat(String(row[8])) : undefined;

          rows.push({
            id: `PROD-${i + 1}-${name.replace(/[^a-zA-Z0-9]/g, '').slice(0, 10)}`,
            name,
            packing,
            company,
            batch,
            exp,
            qty: !isNaN(qty as number) ? qty : undefined,
            price: !isNaN(price as number) ? price : undefined,
            mrp: !isNaN(mrp as number) ? mrp : undefined
          });
        }
        resolve(rows);
      },
      error: (err) => reject(err)
    });
  });
}

/**
 * Parses XLSX / XLS file
 */
export async function parseExcelFile(file: File): Promise<RawCatalogueRow[]> {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: 'array' });
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  const jsonData = XLSX.utils.sheet_to_json<any[]>(worksheet, { header: 1 });

  const rows: RawCatalogueRow[] = [];
  if (!Array.isArray(jsonData) || jsonData.length === 0) return rows;

  let startIndex = 0;
  const firstRowStr = (jsonData[0] || []).join(' ').toUpperCase();
  if (firstRowStr.includes('PRODUCT') || firstRowStr.includes('NAME') || firstRowStr.includes('PACKING')) {
    startIndex = 1;
  }

  for (let i = startIndex; i < jsonData.length; i++) {
    const row = jsonData[i];
    if (!row || row.length === 0) continue;

    const name = String(row[0] || '').trim();
    if (!name || name.toUpperCase() === 'GRAND TOTAL' || name.toUpperCase().startsWith('PAGE')) {
      continue;
    }

    const packing = String(row[1] || '').trim();
    const company = String(row[2] || '').trim();
    const batch = row[3] ? String(row[3]).trim() : undefined;
    const exp = row[4] ? String(row[4]).trim() : undefined;
    const qty = row[5] ? parseFloat(String(row[5])) : undefined;

    rows.push({
      id: `PROD-EXCEL-${i + 1}-${name.replace(/[^a-zA-Z0-9]/g, '').slice(0, 10)}`,
      name,
      packing,
      company,
      batch,
      exp,
      qty: !isNaN(qty as number) ? qty : undefined
    });
  }

  return rows;
}

/**
 * Parses PDF file text using client-side pdfjs-dist
 */
export async function parsePdfFile(file: File): Promise<RawCatalogueRow[]> {
  try {
    const pdfjs = await import('pdfjs-dist');
    // Set worker src
    if (!pdfjs.GlobalWorkerOptions.workerSrc) {
      pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
    }

    const buffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: buffer }).promise;
    const rows: RawCatalogueRow[] = [];
    let rowIdCounter = 1;

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const items = textContent.items as any[];
      
      // Group items by vertical position (Y)
      const linesByY = new Map<number, string[]>();
      for (const item of items) {
        if (!item.str || !item.str.trim()) continue;
        const y = Math.round(item.transform[5]);
        const existing = linesByY.get(y) || [];
        existing.push(item.str.trim());
        linesByY.set(y, existing);
      }

      // Sort Y descending (top of page to bottom)
      const sortedYs = Array.from(linesByY.keys()).sort((a, b) => b - a);

      for (const y of sortedYs) {
        const lineParts = linesByY.get(y) || [];
        const fullLine = lineParts.join(' ');
        
        // Skip table headers and summary lines
        if (
          fullLine.includes('Product Name') ||
          fullLine.includes('Grand Total') ||
          fullLine.includes('Valuation Total') ||
          fullLine.includes('Page -')
        ) {
          continue;
        }

        // Detect if line has medicine name, pack, company
        // Typical line: "101-VOGLIBOSE-0.2 TABLETS 10TAB CLB"
        // or separated tokens: [name, pack, company]
        if (lineParts.length >= 3) {
          const company = lineParts[lineParts.length - 1];
          const packing = lineParts[lineParts.length - 2];
          const name = lineParts.slice(0, lineParts.length - 2).join(' ');

          if (name.length > 2) {
            rows.push({
              id: `PDF-${rowIdCounter++}`,
              name,
              packing,
              company
            });
          }
        } else if (lineParts.length >= 1) {
          const parts = fullLine.split(/\s+/);
          if (parts.length >= 3) {
            const company = parts[parts.length - 1];
            const packing = parts[parts.length - 2];
            const name = parts.slice(0, parts.length - 2).join(' ');
            rows.push({
              id: `PDF-${rowIdCounter++}`,
              name,
              packing,
              company
            });
          }
        }
      }
    }

    return rows;
  } catch (err) {
    console.error('PDF parsing error:', err);
    throw new Error('Could not parse PDF file directly. Please upload Excel (XLSX) or CSV version of the catalogue for 100% precision.');
  }
}

/**
 * Validates, normalizes and generates a complete Catalogue Import Report
 */
export function processRawRows(
  rawRows: RawCatalogueRow[],
  existingProducts: ProductItem[],
  importMode: 'ADD_NEW' | 'UPDATE_EXISTING' | 'FULL_REPLACE',
  fileName: string
): ParseResult {
  const totalSourceRecords = rawRows.length;
  let invalidRecords = 0;
  let missingProductNames = 0;
  let duplicatesDetected = 0;
  let expiredProducts = 0;
  let outOfStockProducts = 0;
  let newProducts = 0;
  let updatedRecords = 0;

  const validProducts: ProductItem[] = [];
  const duplicateList: ProductItem[] = [];
  const invalidRows: any[] = [];

  const existingMap = new Map<string, ProductItem>(
    existingProducts.map(p => [p.productName.toUpperCase(), p])
  );
  const seenInBatch = new Set<string>();

  for (const raw of rawRows) {
    if (!raw.name || !raw.name.trim()) {
      missingProductNames++;
      invalidRecords++;
      invalidRows.push(raw);
      continue;
    }

    const normKey = `${raw.name.trim().toUpperCase()}__${(raw.packing || '').trim().toUpperCase()}`;
    const normalized = normalizeProduct(raw);

    if (normalized.isExpired) {
      expiredProducts++;
    }
    if (normalized.availability === 'OUT_OF_STOCK') {
      outOfStockProducts++;
    }

    // Check duplicate within the uploaded file itself
    if (seenInBatch.has(normKey)) {
      duplicatesDetected++;
      duplicateList.push(normalized);
      // Still keep record if different batch
      if (raw.batch) {
        validProducts.push(normalized);
      }
      continue;
    }
    seenInBatch.add(normKey);

    // Check duplicate against existing database
    const existing = existingMap.get(raw.name.trim().toUpperCase());
    if (existing) {
      if (importMode === 'UPDATE_EXISTING') {
        updatedRecords++;
        validProducts.push({
          ...existing,
          packing: raw.packing || existing.packing,
          company: raw.company || existing.company,
          batchNumber: raw.batch || existing.batchNumber,
          expiry: raw.exp || existing.expiry,
          quantity: typeof raw.qty === 'number' ? raw.qty : existing.quantity,
          price: typeof raw.price === 'number' ? raw.price : existing.price,
          mrp: typeof raw.mrp === 'number' ? raw.mrp : existing.mrp
        });
      } else if (importMode === 'ADD_NEW') {
        duplicatesDetected++;
        duplicateList.push(normalized);
      } else {
        // FULL_REPLACE
        newProducts++;
        validProducts.push(normalized);
      }
    } else {
      newProducts++;
      validProducts.push(normalized);
    }
  }

  let finalProductsList: ProductItem[];
  if (importMode === 'FULL_REPLACE') {
    finalProductsList = validProducts;
  } else if (importMode === 'UPDATE_EXISTING') {
    // Merge updated items with existing items that were not updated
    const updatedIds = new Set(validProducts.map(p => p.id));
    finalProductsList = [
      ...validProducts,
      ...existingProducts.filter(p => !updatedIds.has(p.id))
    ];
  } else {
    // ADD_NEW
    finalProductsList = [...existingProducts, ...validProducts];
  }

  const report: CatalogueImportReport = {
    totalSourceRecords,
    successfullyImported: validProducts.length,
    updatedRecords,
    newProducts,
    duplicatesDetected,
    invalidRecords,
    missingProductNames,
    expiredProducts,
    outOfStockProducts,
    importDate: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    fileName
  };

  return {
    report,
    products: finalProductsList,
    duplicates: duplicateList,
    invalidRows
  };
}
