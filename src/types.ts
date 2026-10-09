export interface SalonService {
  name: string;
  price: number | null; // null = price not published
  duration: string;
}

export interface Salon {
  id: string;
  name: string;
  tagline: string;
  image: string;
  gallery: string[];
  locality: string;
  area: string;
  distanceKm: number | null; // null = unknown (no user location / no coordinates)
  lat?: number | null;
  lng?: number | null;
  rating: number | null; // null = not rated yet
  reviewCount: number;
  startingPrice: number | null; // null = no prices published
  services: SalonService[];
  openHours: {
    [key: string]: string;
  };
  isOpen: boolean;
  phone: string;
  whatsapp: string;
  website: string;
  address: string;
  about: string;
  tags: string[];
}

export interface SearchFilters {
  service: string;
  location: string;
  budget: string;
  rating: number;
  maxDistance: number;
}

export const SERVICES = [
  'Haircut',
  'Hair Colour',
  'Facial',
  'Bridal Makeup',
  'Spa & Massage',
  'Nail Art',
  'Hair Spa',
  'Threading & Waxing',
] as const;

export const LOCATIONS = [
  'Indiranagar',
  'Koramangala',
  'HSR Layout',
  'Whitefield',
  'Jayanagar',
  'JP Nagar',
  'Malleshwaram',
  'Hebbal',
  'Yelahanka',
  'Banashankari',
] as const;

export const BUDGETS = [
  'Under ₹500',
  'Under ₹1,000',
  'Under ₹2,000',
  'Under ₹5,000',
  'Any budget',
] as const;

export const BUDGET_MAP: Record<string, number> = {
  'Under ₹500': 500,
  'Under ₹1,000': 1000,
  'Under ₹2,000': 2000,
  'Under ₹5,000': 5000,
  'Any budget': 999999,
};
