import { Scissors, MapPin } from 'lucide-react';
import { LOCATIONS, SERVICES } from '@/types';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-ink-950 text-ink-100 mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Scissors className="h-5 w-5 text-accent-400" strokeWidth={2.5} />
              <span className="font-display text-xl font-semibold text-white">
                Salon<span className="text-accent-400">Find</span>
              </span>
            </div>
            <p className="text-sm text-ink-400 leading-relaxed">
              Bengaluru's premium salon discovery platform. Find the right salon for you.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-ink-400">
              <li><button onClick={() => onNavigate('about')} className="hover:text-accent-400 transition-colors">About</button></li>
              <li><button onClick={() => onNavigate('explore')} className="hover:text-accent-400 transition-colors">Explore Salons</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-accent-400 transition-colors">Contact</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Services</h4>
            <ul className="space-y-2 text-sm text-ink-400">
              {SERVICES.slice(0, 5).map((s) => (
                <li key={s}>
                  <button onClick={() => onNavigate('services')} className="hover:text-accent-400 transition-colors">{s}</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Bengaluru Areas</h4>
            <ul className="space-y-2 text-sm text-ink-400">
              {LOCATIONS.slice(0, 5).map((l) => (
                <li key={l}>
                  <button onClick={() => onNavigate('areas')} className="hover:text-accent-400 transition-colors flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-ink-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-500">
            © 2026 SalonFind. Demo frontend prototype. All salon data is fictional.
          </p>
          <div className="flex items-center gap-6 text-xs text-ink-500">
            <button onClick={() => onNavigate('privacy')} className="hover:text-accent-400 transition-colors">Privacy</button>
            <button onClick={() => onNavigate('terms')} className="hover:text-accent-400 transition-colors">Terms</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
