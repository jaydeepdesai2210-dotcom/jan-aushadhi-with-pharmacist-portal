# Pharmacist portal setup

1. Supabase -> SQL Editor -> paste and run `supabase/schema.sql` (table, security rules, image bucket).
2. Supabase -> Authentication -> Users -> Add user (your email + a strong password, tick "Auto Confirm User").
3. Supabase -> Authentication -> Sign In / Providers -> turn OFF "Allow new users to sign up".
4. Make that user a pharmacist (SQL Editor):
   insert into public.admin_users (user_id) select id from auth.users where email = 'YOUR_EMAIL' on conflict do nothing;
5. Vercel -> import the project -> Environment Variables:
   VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (Supabase -> Project Settings -> API). Never use a service_role key.
6. Open /pharmacist/login, sign in. On the dashboard press "Import original medicines" ONCE.
   After that the public site reads only from Supabase.

Routes: /pharmacist/login, /dashboard, /medicines, /medicines/add, /medicines/<id>/edit
