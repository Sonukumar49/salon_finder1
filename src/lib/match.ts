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

const keysFor = (service: string) => ALIASES[service] ?? [service.toLowerCase()];
const hits = (names: string[], keys: string[]) =>
  names.filter((n) => keys.some((k) => n.toLowerCase().includes(k)));

/** How a salon offers a service: from its menu ('service'), only from its tags ('tag'), or not at all. */
export function serviceEvidence(
  salon: Salon,
  service: string
): { kind: 'service' | 'tag' | null; names: string[] } {
  const keys = keysFor(service);
  const fromMenu = hits(salon.services.map((s) => s.name), keys);
  if (fromMenu.length) return { kind: 'service', names: fromMenu };
  const fromTags = hits(salon.tags, keys);
  if (fromTags.length) return { kind: 'tag', names: fromTags };
  return { kind: null, names: [] };
}

export function salonOffers(salon: Salon, service: string): boolean {
  return serviceEvidence(salon, service).kind !== null;
}
