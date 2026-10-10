import type { Salon, SearchFilters } from '@/types';
import { BUDGET_MAP } from '@/types';
import { serviceEvidence } from '@/lib/match';
import { closingTimeToday } from '@/lib/hours';

export interface WhyResult {
  /** Reasons this salon fits what the person asked for. */
  reasons: string[];
  /** Honest "good to know" notes (missing prices, few reviews...). */
  headsUp: string[];
  /** Used to order the results (higher = better match). */
  score: number;
  /** True when the person actually searched for something (service / area / budget). */
  personalised: boolean;
}

const inr = (n: number) => n.toLocaleString('en-IN');

export function explainMatch(salon: Salon, f: SearchFilters): WhyResult {
  const reasons: string[] = [];
  const headsUp: string[] = [];
  let score = 0;
  const wantsBudget = !!f.budget && f.budget !== 'Any budget';
  const personalised = !!f.service || !!f.location || wantsBudget;

  // 1. The service they asked for
  if (f.service) {
    const ev = serviceEvidence(salon, f.service);
    if (ev.kind === 'service') {
      const exact = ev.names.some((n) => n.toLowerCase() === f.service.toLowerCase());
      reasons.push(
        exact ? `Offers ${f.service}, the service you searched for` : `Offers ${ev.names[0]} (matches your ${f.service} search)`
      );
      score += 3;
    } else if (ev.kind === 'tag') {
      reasons.push(`Specialises in ${ev.names[0].toLowerCase()}, which fits your ${f.service} search`);
      score += 2;
    }
  }

  // 2. Budget
  if (wantsBudget) {
    const max = BUDGET_MAP[f.budget] ?? Number.MAX_SAFE_INTEGER;
    if (salon.startingPrice != null && salon.startingPrice <= max) {
      reasons.push(`Prices start at ₹${inr(salon.startingPrice)}, within your ${f.budget} budget`);
      score += 2;
    } else if (salon.startingPrice == null) {
      headsUp.push(`Prices aren't listed yet. Call to check it fits your ${f.budget} budget`);
      score += 0.5;
    }
  }

  // 3. Place
  if (f.location && salon.area === f.location) {
    reasons.push(`In ${salon.area}, the area you chose`);
    score += 2;
  }
  if (salon.distanceKm != null) {
    reasons.push(`${salon.distanceKm} km from your location`);
    score += salon.distanceKm <= 2 ? 2 : salon.distanceKm <= 5 ? 1 : 0;
  }

  // 4. Open right now
  if (salon.isOpen) {
    const until = closingTimeToday(salon.openHours);
    reasons.push(until ? `Open right now, until ${until}` : 'Open right now');
    score += 1;
  } else {
    headsUp.push('Closed right now. Check its opening hours');
  }

  // 5. Rating, with honesty about how many people rated it
  if (salon.rating != null) {
    const n = salon.reviewCount;
    if (salon.rating >= 4.5 && n >= 100) {
      reasons.push(`Rated ${salon.rating} by ${inr(n)} customers`);
      score += 2;
    } else if (salon.rating >= 4 && n >= 30) {
      reasons.push(`Rated ${salon.rating} from ${inr(n)} reviews`);
      score += 1;
    } else if (n > 0 && n < 30) {
      headsUp.push(`Rated ${salon.rating}, but from only ${n} reviews so far`);
    }
    score += salon.rating * 0.3 + Math.log10(n + 1) * 0.3;
  } else {
    headsUp.push('Not rated yet');
  }

  if (reasons.length === 0) reasons.push(`Listed in ${salon.area}`);
  return { reasons: reasons.slice(0, 4), headsUp: headsUp.slice(0, 2), score, personalised };
}
