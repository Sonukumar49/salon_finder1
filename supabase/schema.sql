-- STEP 2: run this FIRST in Supabase -> SQL Editor -> New query -> Run

create table if not exists public.salons (
  id             text primary key default gen_random_uuid()::text,
  name           text not null,
  tagline        text,
  image          text,
  gallery        jsonb not null default '[]',
  locality       text,
  area           text,
  distance_km    numeric default 0,      -- demo value; computed from user location in Step 3
  rating         numeric(2,1) default 0,
  review_count   integer default 0,
  starting_price integer default 0,
  services       jsonb not null default '[]',   -- [{name, price, duration}]
  open_hours     jsonb not null default '{}',   -- {Mon: "10:00 AM – 8:00 PM", ...}
  is_open        boolean default true,          -- demo value; computed from open_hours in Step 3
  phone          text,
  whatsapp       text,
  website        text,
  address        text,
  about          text,
  tags           jsonb not null default '[]',
  created_at     timestamptz not null default now()
);

-- Security: anyone can READ salons, nobody can write with the public key.
alter table public.salons enable row level security;

drop policy if exists "Public can read salons" on public.salons;
create policy "Public can read salons"
  on public.salons for select
  to anon, authenticated
  using (true);
