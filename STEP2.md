# Step 2 – Connect Supabase

## A. Create the database (once)
1. supabase.com -> New project (any name, set a database password, region: Mumbai/Singapore).
2. Left menu -> SQL Editor -> New query.
3. Paste ALL of `supabase/schema.sql` -> Run.
4. New query -> paste ALL of `supabase/seed.sql` -> Run.
   (Table Editor -> salons should now show 18 rows.)

## B. Get your keys
Supabase -> Project Settings -> API:
- Project URL
- anon public key  (NOT the service_role key – never put that in the app)

## C. Local
Create a file named `.env` in the project folder:
    VITE_SUPABASE_URL=https://xxxx.supabase.co
    VITE_SUPABASE_ANON_KEY=eyJ...
Then restart:  npm run dev

## D. Vercel
Project -> Settings -> Environment Variables -> add the same two names/values
(tick Production, Preview, Development) -> then Deployments -> Redeploy.

## Notes
- No keys / Supabase down / empty table -> site shows demo data, never breaks.
- Public key can only READ salons (Row Level Security).
