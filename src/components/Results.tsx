import { useState, useMemo } from 'react';
import { SlidersHorizontal, X, Star, MapPin, IndianRupee } from 'lucide-react';
import type { Salon, SearchFilters } from '@/types';
import { SERVICES, LOCATIONS, BUDGETS, BUDGET_MAP } from '@/types';
import SalonCard from './SalonCard';
import { salonOffers } from '@/lib/match';
import { explainMatch } from '@/lib/why';

interface ResultsProps {
  salons: Salon[];
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onView: (id: string) => void;
  locationState: 'idle' | 'loading' | 'granted' | 'denied';
  onUseLocation: () => void;
}

// Unknown values (null) sort to the end.
const last = (v: number | null) => (v == null ? Number.MAX_SAFE_INTEGER : v);

export default function Results({ salons, filters, onFiltersChange, onView, locationState, onUseLocation }: ResultsProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'price' | 'distance'>('relevance');

  const areaList = useMemo(
    () => [...new Set(salons.map((s) => s.area).filter(Boolean))].sort(),
    [salons]
  );

  const filtered = useMemo(() => {
    let result = [...salons];

    if (filters.service) {
      result = result.filter((s) => salonOffers(s, filters.service));
    }
    if (filters.location) {
      result = result.filter((s) => s.area === filters.location);
    }
    if (filters.budget && filters.budget !== 'Any budget') {
      const max = BUDGET_MAP[filters.budget] ?? 999999;
      // salons with no published price stay in the list
      result = result.filter((s) => s.startingPrice == null || s.startingPrice <= max);
    }
    if (filters.rating > 0) {
      result = result.filter((s) => (s.rating ?? 0) >= filters.rating);
    }
    if (filters.maxDistance < 15) {
      result = result.filter((s) => s.distanceKm == null || s.distanceKm <= filters.maxDistance);
    }

    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case 'price':
        result.sort((a, b) => last(a.startingPrice) - last(b.startingPrice));
        break;
      case 'distance':
        result.sort((a, b) => last(a.distanceKm) - last(b.distanceKm));
        break;
      default:
        result.sort(
          (a, b) =>
            explainMatch(b, filters).score - explainMatch(a, filters).score ||
            (b.rating ?? 0) - (a.rating ?? 0) ||
            b.reviewCount - a.reviewCount
        );
    }

    return result;
  }, [salons, filters, sortBy]);

  const activeFilterCount = [
    filters.service,
    filters.location,
    filters.budget && filters.budget !== 'Any budget' ? filters.budget : '',
    filters.rating > 0 ? `rating` : '',
    filters.maxDistance < 15 ? `distance` : '',
  ].filter(Boolean).length;

  const clearAll = () => {
    onFiltersChange({
      service: '',
      location: '',
      budget: '',
      rating: 0,
      maxDistance: 15,
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink-950">
            Salons matching your requirements
          </h2>
          <p className="mt-1 text-sm text-ink-500">
            {filtered.length} {filtered.length === 1 ? 'salon' : 'salons'} found
          </p>
          <button
            onClick={onUseLocation}
            disabled={locationState === 'loading' || locationState === 'granted'}
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-accent-600 hover:text-accent-700 disabled:text-ink-400"
          >
            <MapPin className="h-3.5 w-3.5" />
            {locationState === 'granted'
              ? 'Distances based on your location'
              : locationState === 'loading'
              ? 'Finding your location…'
              : locationState === 'denied'
              ? 'Location blocked – allow it in your browser to see distances'
              : 'Use my location to see distances'}
          </button>
        </div>
        <button
          onClick={() => setShowFilters(true)}
          className="lg:hidden flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2.5 text-sm font-medium text-ink-700"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-accent-500 text-white text-xs">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-6">
        {/* Desktop Filters */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-ink-100 bg-white p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-ink-900">Filters</h3>
              {activeFilterCount > 0 && (
                <button onClick={clearAll} className="text-xs text-accent-500 hover:text-accent-600 font-medium">
                  Clear all
                </button>
              )}
            </div>
            <FilterContent filters={filters} onFiltersChange={onFiltersChange} areaList={areaList} />
          </div>
        </aside>

        {/* Mobile Filter Drawer */}
        {showFilters && (
          <div className="lg:hidden fixed inset-0 z-50 animate-fade-in">
            <div className="absolute inset-0 bg-ink-950/40 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-ink-100 px-5 py-4 flex items-center justify-between">
                <h3 className="font-semibold text-ink-900">Filters</h3>
                <button onClick={() => setShowFilters(false)} className="p-1 text-ink-500">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-5">
                <FilterContent filters={filters} onFiltersChange={onFiltersChange} areaList={areaList} />
                <button
                  onClick={() => setShowFilters(false)}
                  className="btn-primary w-full mt-6"
                >
                  Show {filtered.length} results
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results grid */}
        <div>
          {/* Sort bar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              {filters.service && (
                <Pill label={filters.service} onRemove={() => onFiltersChange({ ...filters, service: '' })} />
              )}
              {filters.location && (
                <Pill label={filters.location} onRemove={() => onFiltersChange({ ...filters, location: '' })} />
              )}
              {filters.budget && filters.budget !== 'Any budget' && (
                <Pill label={filters.budget} onRemove={() => onFiltersChange({ ...filters, budget: '' })} />
              )}
              {filters.rating > 0 && (
                <Pill label={`${filters.rating}+ rating`} onRemove={() => onFiltersChange({ ...filters, rating: 0 })} />
              )}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="rounded-full border border-ink-200 bg-white px-4 py-2 text-sm text-ink-700 focus:outline-none focus:border-accent-400"
            >
              <option value="relevance">Sort: Best match for you</option>
              <option value="rating">Sort: Rating</option>
              <option value="price">Sort: Price (low to high)</option>
              <option value="distance">Sort: Distance</option>
            </select>
          </div>

          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((salon) => (
                <SalonCard key={salon.id} salon={salon} filters={filters} onView={onView} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-ink-100 bg-white p-12 text-center">
              <p className="text-lg font-medium text-ink-800 mb-2">No salons match your filters</p>
              <p className="text-sm text-ink-400 mb-4">Try widening your search criteria.</p>
              <button onClick={clearAll} className="btn-secondary">
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Pill({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-50 px-3 py-1 text-xs font-medium text-accent-700">
      {label}
      <button onClick={onRemove} className="text-accent-400 hover:text-accent-600">
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}

function FilterContent({
  filters,
  onFiltersChange,
  areaList,
}: {
  filters: SearchFilters;
  onFiltersChange: (f: SearchFilters) => void;
  areaList: string[];
}) {
  return (
    <div className="space-y-5">
      <FilterSection icon={<SlidersHorizontal className="h-4 w-4" />} label="Service">
        <select
          value={filters.service}
          onChange={(e) => onFiltersChange({ ...filters, service: e.target.value })}
          className="w-full rounded-xl border border-ink-200 bg-ink-50/50 px-3 py-2 text-sm text-ink-800 focus:outline-none focus:border-accent-400"
        >
          <option value="">Any service</option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </FilterSection>

      <FilterSection icon={<MapPin className="h-4 w-4" />} label="Location">
        <select
          value={filters.location}
          onChange={(e) => onFiltersChange({ ...filters, location: e.target.value })}
          className="w-full rounded-xl border border-ink-200 bg-ink-50/50 px-3 py-2 text-sm text-ink-800 focus:outline-none focus:border-accent-400"
        >
          <option value="">Any location</option>
          {(areaList.length > 0 ? areaList : [...LOCATIONS]).map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </FilterSection>

      <FilterSection icon={<IndianRupee className="h-4 w-4" />} label="Budget">
        <select
          value={filters.budget}
          onChange={(e) => onFiltersChange({ ...filters, budget: e.target.value })}
          className="w-full rounded-xl border border-ink-200 bg-ink-50/50 px-3 py-2 text-sm text-ink-800 focus:outline-none focus:border-accent-400"
        >
          <option value="">Any budget</option>
          {BUDGETS.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </FilterSection>

      <FilterSection icon={<Star className="h-4 w-4" />} label="Minimum Rating">
        <div className="flex gap-2">
          {[0, 3.5, 4.0, 4.5].map((r) => (
            <button
              key={r}
              onClick={() => onFiltersChange({ ...filters, rating: r })}
              className={`flex-1 rounded-lg border px-2 py-1.5 text-xs font-medium transition-all ${
                filters.rating === r
                  ? 'border-accent-400 bg-accent-50 text-accent-700'
                  : 'border-ink-200 text-ink-600 hover:border-ink-300'
              }`}
            >
              {r === 0 ? 'Any' : `${r}+`}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection icon={<MapPin className="h-4 w-4" />} label="Max Distance">
        <div>
          <input
            type="range"
            min="1"
            max="15"
            value={filters.maxDistance}
            onChange={(e) => onFiltersChange({ ...filters, maxDistance: Number(e.target.value) })}
            className="w-full accent-accent-500"
          />
          <div className="flex justify-between text-xs text-ink-400 mt-1">
            <span>1 km</span>
            <span className="font-medium text-ink-700">{filters.maxDistance} km</span>
            <span>15 km</span>
          </div>
        </div>
      </FilterSection>
    </div>
  );
}

function FilterSection({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-semibold text-ink-600 mb-2">
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
}
