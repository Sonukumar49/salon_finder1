import { supabase } from '@/lib/supabase';
import { SALONS as DEMO_SALONS } from '@/data/salons';
import { isOpenNow } from '@/lib/hours';
import type { Salon } from '@/types';

// Row shape of the `salons` table in Supabase (snake_case).
interface SalonRow {
  id: string;
  name: string;
  tagline: string | null;
  image: string | null;
  gallery: string[] | null;
  locality: string | null;
  area: string | null;
  distance_km: number | null;
  lat: number | null;
  lng: number | null;
  rating: number | null;
  review_count: number | null;
  starting_price: number | null;
  services: Salon['services'] | null;
  open_hours: Salon['openHours'] | null;
  is_open: boolean | null;
  phone: string | null;
  whatsapp: string | null;
  website: string | null;
  address: string | null;
  about: string | null;
  tags: string[] | null;
}

function rowToSalon(r: SalonRow): Salon {
  const services = r.services ?? [];
  const prices = services.map((s) => s.price).filter((p): p is number => typeof p === 'number');
  const openHours = r.open_hours ?? {};
  return {
    id: r.id,
    name: r.name,
    tagline: r.tagline ?? '',
    image: r.image ?? '',
    gallery: r.gallery ?? [],
    locality: r.locality ?? '',
    area: r.area ?? '',
    distanceKm: null, // computed in the app from the visitor's location
    lat: r.lat != null ? Number(r.lat) : null,
    lng: r.lng != null ? Number(r.lng) : null,
    rating: r.rating != null ? Number(r.rating) : null,
    reviewCount: r.review_count ?? 0,
    startingPrice: r.starting_price ?? (prices.length ? Math.min(...prices) : null),
    services,
    openHours,
    isOpen: isOpenNow(openHours), // computed from opening hours, India time
    phone: r.phone ?? '',
    whatsapp: r.whatsapp ?? '',
    website: r.website ?? '',
    address: r.address ?? '',
    about: r.about ?? '',
    tags: r.tags ?? [],
  };
}

export type SalonsResult = { salons: Salon[]; source: 'supabase' | 'demo' };

export async function fetchSalons(): Promise<SalonsResult> {
  if (!supabase) return { salons: DEMO_SALONS, source: 'demo' };

  const { data, error } = await supabase
    .from('salons')
    .select('*')
    .order('rating', { ascending: false });

  if (error || !data || data.length === 0) {
    if (error) console.warn('Supabase error, using demo data:', error.message);
    return { salons: DEMO_SALONS, source: 'demo' };
  }
  return { salons: (data as SalonRow[]).map(rowToSalon), source: 'supabase' };
}
