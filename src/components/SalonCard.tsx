import { Star, MapPin, Phone, MessageCircle, ArrowRight } from 'lucide-react';
import type { Salon, SearchFilters } from '@/types';
import { explainMatch } from '@/lib/why';
import WhyBox from './WhyBox';
import SalonImage from './SalonImage';

interface SalonCardProps {
  salon: Salon;
  filters: SearchFilters;
  onView: (id: string) => void;
}

export default function SalonCard({ salon, filters, onView }: SalonCardProps) {
  const why = explainMatch(salon, filters);

  return (
    <div className="card-base overflow-hidden hover:shadow-xl group flex flex-col">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <SalonImage
          src={salon.image}
          name={salon.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {salon.rating != null && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-ink-800 shadow-sm">
            <Star className="h-3.5 w-3.5 fill-accent-500 text-accent-500" />
            {salon.rating}
            {salon.reviewCount > 0 && <span className="text-ink-400 font-normal">({salon.reviewCount})</span>}
          </div>
        )}
        <div
          className={`absolute top-3 right-3 rounded-full px-2.5 py-1 text-xs font-medium shadow-sm ${
            salon.isOpen
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-600 border border-red-200'
          }`}
        >
          <span className="flex items-center gap-1">
            <span className={`w-1.5 h-1.5 rounded-full ${salon.isOpen ? 'bg-green-500' : 'bg-red-500'}`} />
            {salon.isOpen ? 'Open' : 'Closed'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-display text-lg font-semibold text-ink-950 leading-tight">{salon.name}</h3>
        </div>
        <p className="text-xs text-ink-400 mb-3">{salon.tagline}</p>

        <div className="flex items-center gap-3 text-xs text-ink-500 mb-3">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {salon.area}
          </span>
          {salon.distanceKm != null && (
            <>
              <span className="text-ink-200">|</span>
              <span>{salon.distanceKm} km away</span>
            </>
          )}
        </div>

        {/* Services tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {salon.services.slice(0, 3).map((s) => (
            <span key={s.name} className="rounded-full bg-ink-50 px-2.5 py-1 text-xs text-ink-600">
              {s.name}
            </span>
          ))}
          {salon.services.length > 3 && (
            <span className="rounded-full bg-ink-50 px-2.5 py-1 text-xs text-ink-400">
              +{salon.services.length - 3} more
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1 mb-3">
          {salon.startingPrice != null ? (
            <>
              <span className="text-xs text-ink-400">Starting from</span>
              <span className="text-lg font-semibold text-ink-950">₹{salon.startingPrice}</span>
            </>
          ) : (
            <span className="text-sm text-ink-400">Price on request</span>
          )}
        </div>

        {/* Why this salon was shortlisted for this person */}
        <WhyBox why={why} className="mb-3" />

        {/* Actions */}
        <div className="mt-auto flex items-center gap-2 pt-2">
          <button
            onClick={() => onView(salon.id)}
            className="flex-1 rounded-full bg-ink-950 px-4 py-2.5 text-xs font-semibold text-white transition-all hover:bg-ink-800 group/btn flex items-center justify-center gap-1.5"
          >
            View Salon
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
          </button>
          {salon.phone && (
            <a
              href={`tel:${salon.phone.replace(/\s/g, '')}`}
              className="rounded-full border border-ink-200 p-2.5 text-ink-600 transition-all hover:border-ink-300 hover:bg-ink-50"
              aria-label="Call salon"
            >
              <Phone className="h-4 w-4" />
            </a>
          )}
          {salon.whatsapp && (
            <a
              href={`https://wa.me/${salon.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-green-200 bg-green-50 p-2.5 text-green-600 transition-all hover:bg-green-100"
              aria-label="WhatsApp salon"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
