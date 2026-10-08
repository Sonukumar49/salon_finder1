import { useState, useEffect } from 'react';
import { Menu, X, Scissors } from 'lucide-react';

interface NavbarProps {
  onNavigate: (page: string) => void;
  onFindSalon: () => void;
  currentPage: string;
}

const NAV_LINKS = [
  { label: 'Explore Salons', page: 'explore' },
  { label: 'Services', page: 'services' },
  { label: 'Areas', page: 'areas' },
  { label: 'About', page: 'about' },
];

export default function Navbar({ onNavigate, onFindSalon, currentPage }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (page: string) => {
    onNavigate(page);
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-ink-100'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 text-ink-950"
          >
            <Scissors className="h-5 w-5 text-accent-500" strokeWidth={2.5} />
            <span className="font-display text-xl font-semibold tracking-tight">
              Salon<span className="text-accent-500">Find</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNav(link.page)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === link.page
                    ? 'text-accent-500'
                    : 'text-ink-700 hover:text-ink-950'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={onFindSalon} className="btn-primary">
              Find a Salon
            </button>
          </div>

          <button
            className="md:hidden p-2 -mr-2 text-ink-800"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-ink-100 py-4 animate-fade-in">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.page}
                  onClick={() => handleNav(link.page)}
                  className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === link.page
                      ? 'bg-accent-50 text-accent-600'
                      : 'text-ink-700 hover:bg-ink-50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => {
                  onFindSalon();
                  setMenuOpen(false);
                }}
                className="btn-primary mt-3 w-full"
              >
                Find a Salon
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
