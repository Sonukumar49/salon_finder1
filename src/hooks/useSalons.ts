import { useEffect, useState } from 'react';
import { fetchSalons } from '@/lib/salonsApi';
import type { Salon } from '@/types';

export function useSalons() {
  const [salons, setSalons] = useState<Salon[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<'supabase' | 'demo'>('demo');

  useEffect(() => {
    let cancelled = false;
    fetchSalons().then((res) => {
      if (cancelled) return;
      setSalons(res.salons);
      setSource(res.source);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return { salons, loading, source };
}
