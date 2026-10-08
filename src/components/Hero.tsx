import { useState, useRef, useEffect } from 'react';
import { Search, MapPin, IndianRupee, ChevronDown, Sparkles, ArrowRight } from 'lucide-react';
import { SERVICES, LOCATIONS, BUDGETS } from '@/types';

interface HeroProps {
  onSearch: (service: string, location: string, budget: string) => void;
  onExplore: () => void;
}

export default function Hero({ onSearch, onExplore }: HeroProps) {
  const [service, setService] = useState('');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  const handleTilt = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  const handleSubmit = () => {
    onSearch(service, location, budget);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-ink-50 via-white to-ink-50 pt-16">
      {/* Ambient background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-accent-200/30 rounded-full blur-3xl" />
        <div className="absolute top-40 -right-20 w-80 h-80 bg-accent-100/40 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Content + Search */}
          <div className="order-2 lg:order-1 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-white border border-ink-100 px-4 py-1.5 text-xs font-medium text-ink-600 shadow-sm mb-6">
              <Sparkles className="h-3.5 w-3.5 text-accent-500" />
              Bengaluru's premium salon discovery platform
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-ink-950 leading-[1.1] text-balance">
              Find the right salon for you.
            </h1>

            <p className="mt-5 text-base sm:text-lg text-ink-500 leading-relaxed max-w-lg">
              Discover salons in Bengaluru based on what you need, where you want it, and what you want to spend.
            </p>

            {/* Search interface */}
            <div className="mt-8 rounded-2xl bg-white border border-ink-100 shadow-xl p-5 sm:p-6">
              <div className="grid sm:grid-cols-3 gap-3">
                <SearchField
                  icon={<Search className="h-4 w-4" />}
                  label="What are you looking for?"
                  placeholder="Haircut, Facial..."
                  value={service}
                  onChange={setService}
                  options={SERVICES as readonly string[]}
                />
                <SearchField
                  icon={<MapPin className="h-4 w-4" />}
                  label="Where?"
                  placeholder="Indiranagar..."
                  value={location}
                  onChange={setLocation}
                  options={LOCATIONS as readonly string[]}
                />
                <SearchField
                  icon={<IndianRupee className="h-4 w-4" />}
                  label="Budget?"
                  placeholder="Under ₹2,000"
                  value={budget}
                  onChange={setBudget}
                  options={BUDGETS as readonly string[]}
                />
              </div>

              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <button onClick={handleSubmit} className="btn-primary flex-1 group">
                  Find My Salon
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
                <button onClick={onExplore} className="btn-secondary flex-1">
                  Explore salons
                </button>
              </div>
            </div>
          </div>

          {/* Right: 3D Visual */}
          <div
            className="order-1 lg:order-2 relative perspective-1000"
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
            ref={heroRef}
          >
            <div
              className="relative preserve-3d transition-transform duration-200 ease-out"
              style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
            >
              {/* Main image card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ transform: 'translateZ(40px)' }}>
                <img
                  src="https://images.pexels.com/photos/7195803/pexels-photo-7195803.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="Luxury salon interior"
                  className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/30 to-transparent" />
              </div>

              {/* Floating card 1 - Rating */}
              <div
                className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 rounded-2xl bg-white shadow-xl p-3 sm:p-4 animate-float-slow"
                style={{ transform: 'translateZ(80px)' }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent-500 text-white">
                    <span className="text-lg sm:text-xl font-bold leading-none">4.7</span>
                  </div>
                  <div>
                    <p className="text-xs text-ink-400">Avg rating</p>
                    <p className="text-xs sm:text-sm font-semibold text-ink-800">Top rated salons</p>
                  </div>
                </div>
              </div>

              {/* Floating card 2 - Salon count */}
              <div
                className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 rounded-2xl bg-white shadow-xl p-3 sm:p-4 animate-float-medium"
                style={{ transform: 'translateZ(60px)' }}
              >
                <p className="text-2xl sm:text-3xl font-display font-semibold text-ink-950">18+</p>
                <p className="text-xs text-ink-400">Salons across</p>
                <p className="text-xs text-ink-400">10 Bengaluru areas</p>
              </div>

              {/* Floating element - Sparkle */}
              <div
                className="absolute top-1/2 -right-3 sm:-right-6 animate-float-slow"
                style={{ transform: 'translateZ(100px)', animationDelay: '1s' }}
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-accent-400/20 backdrop-blur-sm flex items-center justify-center">
                  <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-accent-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SearchField({
  icon,
  label,
  placeholder,
  value,
  onChange,
  options,
}: {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <label className="flex items-center gap-1.5 text-xs font-medium text-ink-500 mb-1.5">
        {icon}
        {label}
      </label>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left rounded-xl border border-ink-200 bg-ink-50/50 px-3.5 py-2.5 text-sm text-ink-800 transition-all hover:border-ink-300 hover:bg-white focus:outline-none focus:border-accent-400"
      >
        <span className={value ? 'text-ink-900 font-medium' : 'text-ink-400'}>
          {value || placeholder}
        </span>
        <ChevronDown className={`inline-block float-right h-4 w-4 text-ink-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute z-20 mt-1 w-full rounded-xl border border-ink-100 bg-white shadow-lg max-h-52 overflow-y-auto scrollbar-hide animate-fade-in">
          <button
            onClick={() => {
              onChange('');
              setOpen(false);
            }}
            className="w-full text-left px-3.5 py-2 text-sm text-ink-400 hover:bg-ink-50 transition-colors"
          >
            Any
          </button>
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2 text-sm transition-colors hover:bg-ink-50 ${
                value === opt ? 'bg-accent-50 text-accent-600 font-medium' : 'text-ink-700'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
