import { Scissors, MapPin, Star, IndianRupee, Sparkles } from 'lucide-react';
import { SERVICES, LOCATIONS } from '@/types';

interface PlaceholderPageProps {
  page: string;
  onNavigate: (page: string) => void;
}

const PAGE_CONTENT: Record<string, { title: string; description: string }> = {
  about: {
    title: 'About SalonFind',
    description: 'SalonFind is a premium salon discovery platform built for Bengaluru. We help you find the right salon based on your service needs, preferred location, and budget — all in one place. This is a frontend prototype with demo data.',
  },
  services: {
    title: 'Services',
    description: 'Browse salons by the services they offer. From haircuts and hair colour to bridal makeup and spa treatments, find salons that specialise in exactly what you need.',
  },
  areas: {
    title: 'Bengaluru Areas',
    description: 'Explore salons across Bengaluru\'s most popular neighbourhoods. From Indiranagar to Whitefield, we cover the areas that matter to you.',
  },
  contact: {
    title: 'Contact Us',
    description: 'This is a frontend prototype. When connected to a real backend, this page will include a contact form and support information.',
  },
  privacy: {
    title: 'Privacy Policy',
    description: 'This is a frontend prototype. A full privacy policy will be available when the platform is connected to a live backend with real user data.',
  },
  terms: {
    title: 'Terms of Service',
    description: 'This is a frontend prototype. Full terms of service will be published when the platform launches with real salon data.',
  },
};

export default function PlaceholderPage({ page, onNavigate }: PlaceholderPageProps) {
  const content = PAGE_CONTENT[page] ?? { title: 'Page', description: 'Content coming soon.' };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-ink-50/30">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink-950 mb-4">{content.title}</h1>
          <p className="text-ink-500 leading-relaxed max-w-2xl mx-auto">{content.description}</p>
        </div>

        {page === 'services' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((service) => (
              <button
                key={service}
                onClick={() => onNavigate('explore')}
                className="card-base p-5 text-left hover:shadow-lg group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center">
                    <Scissors className="h-5 w-5 text-accent-500" />
                  </div>
                  <h3 className="font-semibold text-ink-900 group-hover:text-accent-600 transition-colors">{service}</h3>
                </div>
                <p className="text-sm text-ink-400">Find salons offering this service</p>
              </button>
            ))}
          </div>
        )}

        {page === 'areas' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LOCATIONS.map((area) => (
              <button
                key={area}
                onClick={() => onNavigate('explore')}
                className="card-base p-5 text-left hover:shadow-lg group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-accent-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink-900 group-hover:text-accent-600 transition-colors">{area}</h3>
                    <p className="text-sm text-ink-400">Browse salons in this area</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {page === 'about' && (
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="card-base p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-accent-50 flex items-center justify-center mx-auto mb-3">
                <Sparkles className="h-6 w-6 text-accent-500" />
              </div>
              <h3 className="font-semibold text-ink-900 mb-1">Curated Salons</h3>
              <p className="text-sm text-ink-400">Handpicked salons across 10 Bengaluru areas</p>
            </div>
            <div className="card-base p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-accent-50 flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6 text-accent-500" />
              </div>
              <h3 className="font-semibold text-ink-900 mb-1">Real Ratings</h3>
              <p className="text-sm text-ink-400">Google ratings and review counts for every salon</p>
            </div>
            <div className="card-base p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-accent-50 flex items-center justify-center mx-auto mb-3">
                <IndianRupee className="h-6 w-6 text-accent-500" />
              </div>
              <h3 className="font-semibold text-ink-900 mb-1">Budget Friendly</h3>
              <p className="text-sm text-ink-400">Filter by what you want to spend</p>
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <button onClick={() => onNavigate('home')} className="btn-primary">
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
