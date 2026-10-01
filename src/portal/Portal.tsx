import React, { useEffect, useState, useCallback } from 'react';
import { supabase, supabaseConfigured } from '../lib/supabase';
import {
  MedicineRow, MedicineInput, fetchAllMedicines, getMedicine, createMedicine,
  updateMedicine, deleteMedicine, validateImage, importOriginalCatalogue,
} from '../services/medicineService';

const CATEGORIES = ['Diabetes','Cardiac & Heart','Blood Pressure','Pain Relief','Fever','Cold & Cough','Gastro','Thyroid','Vitamins & Supplements','Skin Care','Eye Care','ENT','Respiratory',"Women's Health","Men's Health",'Baby Care','Personal Care','Medical Devices','First Aid','OTC','Other'];
const FORMS = ['Tablet','Capsule','Syrup','Injection','Cream','Drops','Other'];

function go(path: string) { window.history.pushState({}, '', path); window.dispatchEvent(new Event('navigate')); }
function usePath() {
  const [p, setP] = useState(window.location.pathname.replace(/\/+$/, '') || '/');
  useEffect(() => {
    const f = () => setP(window.location.pathname.replace(/\/+$/, '') || '/');
    window.addEventListener('popstate', f); window.addEventListener('navigate', f);
    return () => { window.removeEventListener('popstate', f); window.removeEventListener('navigate', f); };
  }, []);
  return p;
}

const input = 'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600';
const btn = 'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-bold disabled:opacity-50';
const primary = `${btn} bg-[#087F5B] text-white hover:bg-[#063B2B]`;
const ghost = `${btn} border border-slate-300 bg-white text-slate-800 hover:bg-slate-50`;
const errMsg = (e: unknown) => (e as { message?: string })?.message || 'Something went wrong. Check your connection and try again.';

type Auth = { status: 'loading' } | { status: 'out' } | { status: 'denied'; email: string } | { status: 'ok'; email: string };

function useAuth(): Auth {
  const [auth, setAuth] = useState<Auth>({ status: 'loading' });
  const check = useCallback(async () => {
    const { data } = await supabase.auth.getSession();
    const user = data.session?.user;
    if (!user) return setAuth({ status: 'out' });
    const { data: row, error } = await supabase.from('admin_users').select('user_id').eq('user_id', user.id).maybeSingle();
    setAuth(!error && row ? { status: 'ok', email: user.email || '' } : { status: 'denied', email: user.email || '' });
  }, []);
  useEffect(() => {
    check();
    const { data: sub } = supabase.auth.onAuthStateChange(() => { check(); });
    return () => sub.subscription.unsubscribe();
  }, [check]);
  return auth;
}

async function logout() { await supabase.auth.signOut(); go('/pharmacist/login'); }

function Login() {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false); const [err, setErr] = useState('');
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true); setErr('');
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) throw new Error(error.message === 'Invalid login credentials' ? 'Wrong email or password.' : error.message);
      go('/pharmacist/dashboard');
    } catch (e) { setErr(errMsg(e)); } finally { setBusy(false); }
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F7FAF8]">
      <form onSubmit={submit} className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div><h1 className="text-xl font-black text-[#063B2B]">Pharmacist Login</h1>
          <p className="text-sm text-slate-500">Jan Aushadhi Kendra Adajan</p></div>
        {!supabaseConfigured && <p className="text-sm text-red-700 bg-red-50 rounded p-2">Supabase is not configured (missing environment variables).</p>}
        {err && <p role="alert" className="text-sm text-red-700 bg-red-50 rounded p-2">{err}</p>}
        <label className="block text-sm font-semibold">Email
          <input className={input} type="email" required autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} /></label>
        <label className="block text-sm font-semibold">Password
          <input className={input} type="password" required autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} /></label>
        <button className={`${primary} w-full`} disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </div>
  );
}

function Shell({ email, children }: { email: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F7FAF8] text-slate-900">
      <header className="bg-[#063B2B] text-white">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center gap-3">
          <strong className="mr-auto">Pharmacist Portal</strong>
          <button className="text-sm underline" onClick={() => go('/pharmacist/dashboard')}>Dashboard</button>
          <button className="text-sm underline" onClick={() => go('/pharmacist/medicines')}>Medicines</button>
          <span className="hidden sm:inline text-xs opacity-75">{email}</span>
          <button className="text-sm bg-white/10 rounded px-3 py-1" onClick={logout}>Logout</button>
        </div>
      </header>
      <main className="max-w-5xl mx-auto p-4">{children}</main>
    </div>
  );
}

function Dashboard() {
  const [count, setCount] = useState<number | null>(null);
  const [msg, setMsg] = useState(''); const [busy, setBusy] = useState(false);
  const load = useCallback(() => {
    supabase.from('medicines').select('id', { count: 'exact', head: true })
      .then(({ count: c, error }) => { if (error) setMsg(error.message); else setCount(c ?? 0); });
  }, []);
  useEffect(load, [load]);
  const doImport = async () => {
    if (!window.confirm('Import the original medicine catalogue into the database? Do this only once.')) return;
    setBusy(true); setMsg('Importing…');
    try { const n = await importOriginalCatalogue((a, t) => setMsg(`Imported ${a} of ${t}…`)); setMsg(`Imported ${n} medicines.`); load(); }
    catch (e) { setMsg(errMsg(e)); } finally { setBusy(false); }
  };
  return (
    <div className="space-y-4">
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <p className="text-sm text-slate-500">Total medicines</p>
        <p className="text-3xl font-black text-[#087F5B]">{count ?? '…'}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <button className={primary} onClick={() => go('/pharmacist/medicines/add')}>+ Add Medicine</button>
        <button className={ghost} onClick={() => go('/pharmacist/medicines')}>Manage Medicines</button>
        {count === 0 && <button className={ghost} disabled={busy} onClick={doImport}>Import original medicines</button>}
      </div>
      {msg && <p className="text-sm bg-white border border-slate-200 rounded p-2">{msg}</p>}
    </div>
  );
}

function List() {
  const [rows, setRows] = useState<MedicineRow[] | null>(null);
  const [err, setErr] = useState(''); const [q, setQ] = useState('');
  const [cat, setCat] = useState(''); const [flt, setFlt] = useState('');
  const [page, setPage] = useState(0); const SIZE = 25;
  const load = useCallback(() => { fetchAllMedicines().then(setRows).catch(e => setErr(errMsg(e))); }, []);
  useEffect(load, [load]);
  const del = async (m: MedicineRow) => {
    if (!window.confirm('Are you sure you want to delete this medicine?')) return;
    try { await deleteMedicine(m); setRows(r => r && r.filter(x => x.id !== m.id)); } catch (e) { setErr('Delete failed: ' + errMsg(e)); }
  };
  if (err && !rows) return <p className="text-red-700">{err}</p>;
  if (!rows) return <p>Loading…</p>;
  const s = q.trim().toLowerCase();
  const list = rows.filter(m =>
    (!s || [m.name, m.generic_name, m.category].some(v => v?.toLowerCase().includes(s))) &&
    (!cat || m.category === cat) &&
    (flt === '' || (flt === 'in' && m.stock_status === 'IN_STOCK') || (flt === 'out' && m.stock_status === 'OUT_OF_STOCK') ||
      (flt === 'avail' && m.available) || (flt === 'unavail' && !m.available)));
  const pages = Math.max(1, Math.ceil(list.length / SIZE));
  const cur = Math.min(page, pages - 1);
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <input className={`${input} sm:flex-1`} placeholder="Search name, generic name, category" value={q} onChange={e => { setQ(e.target.value); setPage(0); }} />
        <select className={`${input} sm:w-44`} value={cat} onChange={e => { setCat(e.target.value); setPage(0); }}>
          <option value="">All categories</option>{CATEGORIES.map(c => <option key={c}>{c}</option>)}</select>
        <select className={`${input} sm:w-40`} value={flt} onChange={e => { setFlt(e.target.value); setPage(0); }}>
          <option value="">All</option><option value="in">In Stock</option><option value="out">Out of Stock</option>
          <option value="avail">Available</option><option value="unavail">Not Available</option></select>
        <button className={primary} onClick={() => go('/pharmacist/medicines/add')}>+ Add</button>
      </div>
      {err && <p role="alert" className="text-sm text-red-700 bg-red-50 rounded p-2">{err}</p>}
      <p className="text-xs text-slate-500">{list.length} medicines</p>
      <ul className="space-y-2">
        {list.slice(cur * SIZE, cur * SIZE + SIZE).map(m => (
          <li key={m.id} className="bg-white border border-slate-200 rounded-xl p-3 flex gap-3 items-center">
            {m.image_url ? <img src={m.image_url} alt="" className="w-14 h-14 rounded object-cover shrink-0" />
              : <div className="w-14 h-14 rounded bg-slate-100 shrink-0" />}
            <div className="min-w-0 flex-1 text-sm">
              <p className="font-bold truncate">{m.name}</p>
              <p className="text-slate-500 truncate">{[m.generic_name, m.category].filter(Boolean).join(' · ') || '—'}</p>
              <p>₹{m.price ?? '—'}{m.mrp ? <span className="text-slate-400 line-through ml-1">₹{m.mrp}</span> : null}
                <span className="ml-2 text-xs">{m.stock_status === 'IN_STOCK' ? 'In Stock' : 'Out of Stock'} · {m.available ? 'Available' : 'Not Available'}</span></p>
            </div>
            <div className="flex flex-col gap-1">
              <button className={ghost} onClick={() => go(`/pharmacist/medicines/${m.id}/edit`)}>Edit</button>
              <button className={`${btn} text-red-700 border border-red-200 hover:bg-red-50`} onClick={() => del(m)}>Delete</button>
            </div>
          </li>))}
      </ul>
      <div className="flex items-center justify-between">
        <button className={ghost} disabled={cur === 0} onClick={() => setPage(cur - 1)}>Previous</button>
        <span className="text-sm">Page {cur + 1} / {pages}</span>
        <button className={ghost} disabled={cur >= pages - 1} onClick={() => setPage(cur + 1)}>Next</button>
      </div>
    </div>
  );
}

function Form({ id }: { id?: string }) {
  const [loaded, setLoaded] = useState(!id);
  const [old, setOld] = useState<MedicineRow | null>(null);
  const [f, setF] = useState({ name: '', generic_name: '', category: 'Other', formulation: '', description: '', price: '', mrp: '', stock: 'IN_STOCK', available: 'true' });
  const [file, setFile] = useState<File | null>(null); const [preview, setPreview] = useState('');
  const [busy, setBusy] = useState(false); const [err, setErr] = useState(''); const [ok, setOk] = useState('');
  useEffect(() => {
    if (!id) return;
    getMedicine(id).then(m => {
      setOld(m); setPreview(m.image_url || '');
      setF({ name: m.name, generic_name: m.generic_name || '', category: m.category || 'Other', formulation: m.formulation || '', description: m.description || '',
        price: m.price?.toString() ?? '', mrp: m.mrp?.toString() ?? '', stock: m.stock_status, available: String(m.available) });
      setLoaded(true);
    }).catch(e => setErr(errMsg(e)));
  }, [id]);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF(p => ({ ...p, [k]: e.target.value }));
  const pick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const x = e.target.files?.[0]; if (!x) return;
    const v = validateImage(x); if (v) { setErr(v); e.target.value = ''; return; }
    setErr(''); setFile(x); setPreview(URL.createObjectURL(x));
  };
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); if (busy) return; setErr(''); setOk('');
    const price = Number(f.price), mrp = f.mrp === '' ? null : Number(f.mrp);
    if (!f.name.trim()) return setErr('Medicine name is required.');
    if (f.price === '' || !(price > 0)) return setErr('Price is required and must be greater than 0.');
    if (mrp !== null && !(mrp > 0)) return setErr('MRP must be greater than 0.');
    setBusy(true);
    const data: MedicineInput = {
      name: f.name.trim(), generic_name: f.generic_name.trim() || null, category: f.category, formulation: f.formulation || null,
      description: f.description.trim() || null, price, mrp, stock_status: f.stock as 'IN_STOCK' | 'OUT_OF_STOCK', available: f.available === 'true',
    };
    try {
      if (id && old) await updateMedicine(id, data, old.image_url, file); else await createMedicine(data, file);
      setOk('Medicine saved.'); setTimeout(() => go('/pharmacist/medicines'), 700);
    } catch (e) { setErr('Could not save: ' + errMsg(e)); setBusy(false); }
  };
  if (!loaded) return err ? <p className="text-red-700">{err}</p> : <p>Loading…</p>;
  return (
    <form onSubmit={submit} className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 max-w-xl">
      <h1 className="text-lg font-black">{id ? 'Edit Medicine' : 'Add Medicine'}</h1>
      {err && <p role="alert" className="text-sm text-red-700 bg-red-50 rounded p-2">{err}</p>}
      {ok && <p className="text-sm text-emerald-800 bg-emerald-50 rounded p-2">{ok}</p>}
      <label className="block text-sm font-semibold">Medicine Name *<input className={input} value={f.name} onChange={set('name')} /></label>
      <label className="block text-sm font-semibold">Generic Name<input className={input} value={f.generic_name} onChange={set('generic_name')} /></label>
      <div className="grid grid-cols-2 gap-3">
        <label className="block text-sm font-semibold">Category<select className={input} value={f.category} onChange={set('category')}>{CATEGORIES.map(c => <option key={c}>{c}</option>)}</select></label>
        <label className="block text-sm font-semibold">Form<select className={input} value={f.formulation} onChange={set('formulation')}><option value="">—</option>{FORMS.map(c => <option key={c}>{c}</option>)}</select></label>
      </div>
      <label className="block text-sm font-semibold">Description<textarea className={input} rows={3} value={f.description} onChange={set('description')} /></label>
      <div className="grid grid-cols-2 gap-3">
        <label className="block text-sm font-semibold">Price (₹) *<input className={input} inputMode="decimal" type="number" step="0.01" min="0" value={f.price} onChange={set('price')} /></label>
        <label className="block text-sm font-semibold">MRP (₹)<input className={input} inputMode="decimal" type="number" step="0.01" min="0" value={f.mrp} onChange={set('mrp')} /></label>
      </div>
      <div>
        <label className="block text-sm font-semibold">Medicine Photo (JPG, PNG, WEBP, max 5 MB)
          <input className="block mt-1 text-sm" type="file" accept="image/jpeg,image/png,image/webp" onChange={pick} /></label>
        {preview && <img src={preview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded border" />}
        {id && !file && old?.image_url && <p className="text-xs text-slate-500 mt-1">Current photo is kept unless you choose a new one.</p>}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <label className="block text-sm font-semibold">Stock<select className={input} value={f.stock} onChange={set('stock')}><option value="IN_STOCK">In Stock</option><option value="OUT_OF_STOCK">Out of Stock</option></select></label>
        <label className="block text-sm font-semibold">Availability<select className={input} value={f.available} onChange={set('available')}><option value="true">Available</option><option value="false">Not Available</option></select></label>
      </div>
      <div className="flex gap-2">
        <button className={primary} disabled={busy}>{busy ? 'Saving…' : 'Save Medicine'}</button>
        <button type="button" className={ghost} disabled={busy} onClick={() => go('/pharmacist/medicines')}>Cancel</button>
      </div>
    </form>
  );
}

export default function Portal() {
  const path = usePath();
  const auth = useAuth();
  useEffect(() => {
    if (auth.status === 'out' && path !== '/pharmacist/login') go('/pharmacist/login');
    if (auth.status === 'ok' && (path === '/pharmacist/login' || path === '/pharmacist' || path === '/')) go('/pharmacist/dashboard');
  }, [auth.status, path]);

  if (auth.status === 'loading') return <div className="p-6">Loading…</div>;
  if (auth.status === 'out') return <Login />;
  if (auth.status === 'denied') return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F7FAF8]"><div className="max-w-sm bg-white border rounded-xl p-6 space-y-3">
      <h1 className="font-black text-lg">Access denied</h1>
      <p className="text-sm">{auth.email} is not authorised as a pharmacist.</p>
      <button className={primary} onClick={logout}>Sign out</button></div></div>);

  const m = path.match(/^\/pharmacist\/medicines\/([^/]+)\/edit$/);
  let view: React.ReactNode;
  if (path === '/pharmacist/dashboard') view = <Dashboard />;
  else if (path === '/pharmacist/medicines') view = <List />;
  else if (path === '/pharmacist/medicines/add') view = <Form key="add" />;
  else if (m) view = <Form key={m[1]} id={m[1]} />;
  else view = <p>Page not found. <button className="underline" onClick={() => go('/pharmacist/dashboard')}>Go to dashboard</button></p>;
  return <Shell email={auth.email}>{view}</Shell>;
}
