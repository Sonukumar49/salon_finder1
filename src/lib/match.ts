import type { Salon } from '@/types';

// Search-box service  ->  words that count as a match in a salon's service names / tags.
const ALIASES: Record<string, string[]> = {
  Haircut: ['haircut', 'cut'],
  'Hair Colour': ['colour', 'color'],
  Facial: ['facial'],
  'Bridal Makeup': ['bridal', 'makeup'],
  'Spa & Massage': ['massage', 'spa'],
  'Nail Art': ['nail', 'manicure', 'pedicure'],
  'Hair Spa': ['hair spa'],
  'Threading & Waxing': ['threading', 'waxing', 'wax'],
};

export function salonOffers(salon: Salon, service: string): boolean {
  const keys = ALIASES[service] ?? [service.toLowerCase()];
  const hay = [...salon.services.map((s) => s.name), ...salon.tags].map((x) => x.toLowerCase());
  return keys.some((k) => hay.some((h) => h.includes(k)));
}
