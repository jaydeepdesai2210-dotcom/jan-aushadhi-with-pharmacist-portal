import { supabase, IMAGE_BUCKET } from '../lib/supabase';
import { ProductItem, ProductCategory } from '../types/pharmacy';
import { checkIsExpired } from '../utils/catalogueClassifier';
import { classifyCategory } from '../utils/catalogueClassifier';

export interface MedicineRow {
  id: string; name: string; generic_name: string | null; category: string | null;
  description: string | null; price: number | null; mrp: number | null; image_url: string | null;
  stock_status: 'IN_STOCK' | 'OUT_OF_STOCK'; available: boolean;
  packing: string | null; company: string | null; formulation: string | null;
  prescription_required: boolean; hidden: boolean; created_at: string; updated_at: string;
}
export type MedicineInput = Partial<Omit<MedicineRow, 'id' | 'created_at' | 'updated_at'>> & { name: string };

export function rowToProduct(r: MedicineRow): ProductItem {
  const out = r.stock_status === 'OUT_OF_STOCK' || !r.available;
  return {
    id: r.id,
    productName: r.name,
    packing: r.packing ?? '',
    company: r.company ?? '',
    batchNumber: null,
    expiry: null,
    quantity: null,
    price: r.price === null ? null : Number(r.price),
    mrp: r.mrp === null ? null : Number(r.mrp),
    category: (r.category || classifyCategory(r.name)) as ProductCategory,
    prescriptionRequired: r.prescription_required,
    availability: out ? 'OUT_OF_STOCK' : 'IN_STOCK',
    composition: r.generic_name,
    formulation: r.formulation ?? undefined,
    notes: r.description,
    isExpired: checkIsExpired(null),
    image: r.image_url,
    hidden: r.hidden,
  };
}

/** Fetch every row (PostgREST caps at 1000 per request). */
export async function fetchAllMedicines(): Promise<MedicineRow[]> {
  const all: MedicineRow[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await supabase.from('medicines').select('*')
      .order('name').range(from, from + 999);
    if (error) throw error;
    all.push(...(data as MedicineRow[]));
    if (!data || data.length < 1000) break;
  }
  return all;
}

export async function getMedicine(id: string): Promise<MedicineRow> {
  const { data, error } = await supabase.from('medicines').select('*').eq('id', id).single();
  if (error) throw error;
  return data as MedicineRow;
}

export const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export function validateImage(f: File): string | null {
  if (!ALLOWED_TYPES.includes(f.type)) return 'Photo must be JPG, PNG or WEBP.';
  if (f.size > MAX_IMAGE_BYTES) return 'Photo must be 5 MB or smaller.';
  return null;
}

export async function uploadImage(file: File): Promise<string> {
  const ext = file.type === 'image/png' ? 'png' : file.type === 'image/webp' ? 'webp' : 'jpg';
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(IMAGE_BUCKET).upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw error;
  return supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path).data.publicUrl;
}

function pathFromUrl(url?: string | null): string | null {
  if (!url) return null;
  const marker = `/${IMAGE_BUCKET}/`;
  const i = url.indexOf(marker);
  return i === -1 ? null : decodeURIComponent(url.slice(i + marker.length));
}
export async function removeImage(url?: string | null) {
  const p = pathFromUrl(url);
  if (p) await supabase.storage.from(IMAGE_BUCKET).remove([p]); // best effort
}

export async function createMedicine(input: MedicineInput, file?: File | null) {
  const image_url = file ? await uploadImage(file) : input.image_url ?? null;
  const { error } = await supabase.from('medicines').insert({ ...input, image_url });
  if (error) { if (file) await removeImage(image_url); throw error; }
}

/** If no new file is chosen the existing image_url is kept untouched. */
export async function updateMedicine(id: string, input: MedicineInput, oldImageUrl: string | null, file?: File | null) {
  const patch: MedicineInput = { ...input };
  let newUrl: string | null = null;
  if (file) { newUrl = await uploadImage(file); patch.image_url = newUrl; } else { delete patch.image_url; }
  const { error } = await supabase.from('medicines').update(patch).eq('id', id);
  if (error) { if (newUrl) await removeImage(newUrl); throw error; }
  if (newUrl) await removeImage(oldImageUrl);
}

export async function deleteMedicine(m: Pick<MedicineRow, 'id' | 'image_url'>) {
  const { error } = await supabase.from('medicines').delete().eq('id', m.id);
  if (error) throw error;
  await removeImage(m.image_url);
}

/** One-time import of the original built-in catalogue (admin only, only when table is empty). */
export async function importOriginalCatalogue(onProgress?: (n: number, total: number) => void) {
  const { count, error: cErr } = await supabase.from('medicines').select('id', { count: 'exact', head: true });
  if (cErr) throw cErr;
  if ((count ?? 0) > 0) throw new Error('Import skipped: the medicines table already has data.');
  const { ALL_BUILTIN_CATALOGUE_DATA, normalizeProduct } = await import('./catalogueService');
  const seen = new Set<string>();
  const rows = ALL_BUILTIN_CATALOGUE_DATA.map(normalizeProduct).filter(p => {
    const k = p.productName.toUpperCase();
    if (seen.has(k)) return false; seen.add(k); return true;
  }).map(p => ({
    name: p.productName, category: p.category, price: p.price, mrp: p.mrp ?? null,
    packing: p.packing, company: p.company, formulation: p.formulation ?? null,
    prescription_required: p.prescriptionRequired, stock_status: 'IN_STOCK', available: true,
  }));
  for (let i = 0; i < rows.length; i += 500) {
    const { error } = await supabase.from('medicines').insert(rows.slice(i, i + 500));
    if (error) throw error;
    onProgress?.(Math.min(i + 500, rows.length), rows.length);
  }
  return rows.length;
}
