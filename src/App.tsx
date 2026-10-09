import { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Results from '@/components/Results';
import SalonDetail from '@/components/SalonDetail';
import Footer from '@/components/Footer';
import PlaceholderPage from '@/components/PlaceholderPage';
import { useSalons } from '@/hooks/useSalons';
import type { Salon } from '@/types';
import type { SearchFilters } from '@/types';

type Page = 'home' | 'explore' | 'detail' | 'services' | 'areas' | 'about' | 'contact' | 'privacy' | 'terms';

const DEFAULT_FILTERS: SearchFilters = {
  service: '',
  location: '',
  budget: '',
  rating: 0,
  maxDistance: 15,
};

function App() {
  const { salons, loading } = useSalons();
  const [page, setPage] = useState<Page>('home');
  const [selectedSalonId, setSelectedSalonId] = useState<string | null>(null);
  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_FILTERS);
  const [hasSearched, setHasSearched] = useState(false);

  const selectedSalon = salons.find((s) => s.id === selectedSalonId);

  const handleSearch = useCallback((service: string, location: string, budget: string) => {
    setFilters({ ...DEFAULT_FILTERS, service, location, budget });
    setHasSearched(true);
    setPage('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleExplore = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setHasSearched(true);
    setPage('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNavigate = useCallback((p: string) => {
    setPage(p as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleViewSalon = useCallback((id: string) => {
    setSelectedSalonId(id);
    setPage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleFindSalon = useCallback(() => {
    setPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBack = useCallback(() => {
    setPage('explore');
    setSelectedSalonId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (page === 'home' && hasSearched) {
      setHasSearched(false);
    }
  }, [page, hasSearched]);

  const showHome = page === 'home';
  const showExplore = page === 'explore';
  const showDetail = page === 'detail' && selectedSalon;
  const showPlaceholder = ['services', 'areas', 'about', 'contact', 'privacy', 'terms'].includes(page);

  return (
    <div className="min-h-screen bg-ink-50/30">
      <Navbar onNavigate={handleNavigate} onFindSalon={handleFindSalon} currentPage={page} />

      {showHome && (
        <>
          <Hero onSearch={handleSearch} onExplore={handleExplore} />
          <FeaturedSection salons={salons} loading={loading} onView={handleViewSalon} onExplore={handleExplore} />
        </>
      )}

      {showExplore && loading && (
        <div className="py-32 text-center text-ink-500">Loading salons…</div>
      )}

      {showExplore && !loading && (
        <Results
          salons={salons}
          filters={filters}
          onFiltersChange={setFilters}
          onView={handleViewSalon}
        />
      )}

      {showDetail && selectedSalon && (
        <SalonDetail salon={selectedSalon} onBack={handleBack} />
      )}

      {showPlaceholder && (
        <PlaceholderPage page={page} onNavigate={handleNavigate} />
      )}

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

import { Star, MapPin, ArrowRight } from 'lucide-react';

function FeaturedSection({
  salons,
  loading,
  onView,
  onExplore,
}: {
  salons: Salon[];
  loading: boolean;
  onView: (id: string) => void;
  onExplore: () => void;
}) {
  const topSalons = [...salons].sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold text-accent-500 uppercase tracking-wider mb-2">Featured</p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink-950">
              Top-rated salons in Bengaluru
            </h2>
          </div>
          <button
            onClick={onExplore}
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-ink-600 hover:text-ink-900 transition-colors"
          >
            View all salons
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {loading && <p className="text-ink-500">Loading salons…</p>}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topSalons.map((salon) => (
            <button
              key={salon.id}
              onClick={() => onView(salon.id)}
              className="card-base overflow-hidden text-left hover:shadow-xl group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={salon.image}
                  alt={salon.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-ink-800">
                  <Star className="h-3.5 w-3.5 fill-accent-500 text-accent-500" />
                  {salon.rating}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg font-semibold text-ink-950 mb-1">{salon.name}</h3>
                <div className="flex items-center gap-2 text-sm text-ink-500">
                  <MapPin className="h-3.5 w-3.5" />
                  {salon.area}
                </div>
                <p className="mt-2 text-sm text-ink-400">Starting from ₹{salon.startingPrice}</p>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={onExplore}
          className="sm:hidden mt-6 btn-secondary w-full"
        >
          View all salons
        </button>
      </div>
    </section>
  );
}

export default App;
