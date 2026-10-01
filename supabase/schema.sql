-- Jan Aushadhi Kendra Adajan: run once in Supabase -> SQL Editor
create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;

create table if not exists public.medicines (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  generic_name text,
  category text,
  description text,
  price numeric check (price is null or price >= 0),
  mrp numeric check (mrp is null or mrp >= 0),
  image_url text,
  stock_status text not null default 'IN_STOCK' check (stock_status in ('IN_STOCK','OUT_OF_STOCK')),
  available boolean not null default true,
  -- extra fields the existing public site already uses
  packing text,
  company text,
  formulation text,
  prescription_required boolean not null default false,
  hidden boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists medicines_name_idx on public.medicines (lower(name));

create or replace function public.set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;
drop trigger if exists medicines_updated_at on public.medicines;
create trigger medicines_updated_at before update on public.medicines
  for each row execute function public.set_updated_at();

alter table public.medicines enable row level security;
alter table public.admin_users enable row level security;

drop policy if exists "public read medicines" on public.medicines;
create policy "public read medicines" on public.medicines for select using (true);
drop policy if exists "admin insert medicines" on public.medicines;
create policy "admin insert medicines" on public.medicines for insert to authenticated with check (public.is_admin());
drop policy if exists "admin update medicines" on public.medicines;
create policy "admin update medicines" on public.medicines for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "admin delete medicines" on public.medicines;
create policy "admin delete medicines" on public.medicines for delete to authenticated using (public.is_admin());

-- a logged-in user may only check whether THEY are an admin; nobody can write this table from the app
drop policy if exists "read own admin row" on public.admin_users;
create policy "read own admin row" on public.admin_users for select to authenticated using (user_id = auth.uid());

-- Storage
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('medicine-images','medicine-images', true, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public = true, file_size_limit = 5242880,
  allowed_mime_types = array['image/jpeg','image/png','image/webp'];

drop policy if exists "public read medicine images" on storage.objects;
create policy "public read medicine images" on storage.objects for select using (bucket_id = 'medicine-images');
drop policy if exists "admin upload medicine images" on storage.objects;
create policy "admin upload medicine images" on storage.objects for insert to authenticated with check (bucket_id = 'medicine-images' and public.is_admin());
drop policy if exists "admin update medicine images" on storage.objects;
create policy "admin update medicine images" on storage.objects for update to authenticated using (bucket_id = 'medicine-images' and public.is_admin());
drop policy if exists "admin delete medicine images" on storage.objects;
create policy "admin delete medicine images" on storage.objects for delete to authenticated using (bucket_id = 'medicine-images' and public.is_admin());
