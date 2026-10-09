import { Star, MapPin, Phone, MessageCircle, Clock, Globe, Navigation, ArrowLeft, Check } from 'lucide-react';
import type { Salon } from '@/types';
import { formatHours } from '@/lib/hours';
import SalonImage from './SalonImage';

interface SalonDetailProps {
  salon: Salon;
  onBack: () => void;
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const today = new Date().getDay(); // 0 = Sunday
const todayLabel = today === 0 ? 'Sun' : DAYS[today - 1];

export default function SalonDetail({ salon, onBack }: SalonDetailProps) {
  return (
    <div className="pt-16">
      {/* Back button */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-600 hover:text-ink-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to results
        </button>
      </div>

      {/* Hero image */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden h-[280px] sm:h-[400px] shadow-lg">
          <SalonImage src={salon.image} name={salon.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-ink-950/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-2">
              {salon.rating != null && (
                <div className="flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-sm px-3 py-1 text-sm font-semibold text-ink-800">
                  <Star className="h-4 w-4 fill-accent-500 text-accent-500" />
                  {salon.rating}
                  {salon.reviewCount > 0 && (
                    <span className="text-ink-400 font-normal">({salon.reviewCount} reviews)</span>
                  )}
                </div>
              )}
              <div
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  salon.isOpen
                    ? 'bg-green-100/90 text-green-700'
                    : 'bg-red-100/90 text-red-600'
                }`}
              >
                {salon.isOpen ? 'Open now' : 'Closed now'}
              </div>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-white">{salon.name}</h1>
            <p className="text-white/80 text-sm mt-1">{salon.tagline}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          {/* Main column */}
          <div className="space-y-8">
            {/* Quick info */}
            <div className="flex flex-wrap gap-4 text-sm text-ink-600">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-ink-400" />
                {[salon.locality, salon.area].filter(Boolean).join(', ')}
              </span>
              {salon.distanceKm != null && (
                <span className="flex items-center gap-1.5">
                  <Navigation className="h-4 w-4 text-ink-400" />
                  {salon.distanceKm} km away
                </span>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {salon.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-ink-50 border border-ink-100 px-3 py-1 text-xs font-medium text-ink-600">
                  {tag}
                </span>
              ))}
            </div>

            {/* About */}
            <section>
              <h2 className="font-display text-xl font-semibold text-ink-950 mb-3">About this salon</h2>
              <p className="text-ink-600 leading-relaxed">{salon.about}</p>
            </section>

            {/* Services */}
            <section>
              <h2 className="font-display text-xl font-semibold text-ink-950 mb-4">Services & Pricing</h2>
              <div className="rounded-2xl border border-ink-100 overflow-hidden">
                {salon.services.map((svc, i) => (
                  <div
                    key={svc.name}
                    className={`flex items-center justify-between px-4 py-3.5 ${
                      i !== salon.services.length - 1 ? 'border-b border-ink-100' : ''
                    }`}
                  >
                    <div>
                      <p className="text-sm font-medium text-ink-900">{svc.name}</p>
                      {svc.duration && <p className="text-xs text-ink-400">{svc.duration}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                      {svc.price != null ? (
                        <>
                          <span className="text-xs text-ink-400">Starting from</span>
                          <span className="text-lg font-semibold text-ink-950">₹{svc.price}</span>
                        </>
                      ) : (
                        <span className="text-sm text-ink-400">Price on request</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Gallery */}
            {salon.gallery.length > 0 && (
            <section>
              <h2 className="font-display text-xl font-semibold text-ink-950 mb-4">Gallery</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {salon.gallery.map((img, i) => (
                  <div key={i} className="rounded-xl overflow-hidden aspect-square group">
                    <img
                      src={img}
                      alt={`${salon.name} gallery ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </section>
            )}

            {/* Opening Hours */}
            <section>
              <h2 className="font-display text-xl font-semibold text-ink-950 mb-4">Opening Hours</h2>
              <div className="rounded-2xl border border-ink-100 overflow-hidden">
                {DAYS.map((day) => (
                  <div
                    key={day}
                    className={`flex items-center justify-between px-4 py-3 text-sm ${
                      day !== 'Sun' ? 'border-b border-ink-100' : ''
                    } ${day === todayLabel ? 'bg-accent-50/50' : ''}`}
                  >
                    <span className={`flex items-center gap-2 ${day === todayLabel ? 'font-semibold text-accent-700' : 'text-ink-700'}`}>
                      {day === todayLabel && <Clock className="h-3.5 w-3.5" />}
                      {day === todayLabel ? `${day} (Today)` : day}
                    </span>
                    <span className={day === todayLabel ? 'font-medium text-accent-700' : 'text-ink-500'}>
                      {formatHours(salon.openHours[day])}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Contact card */}
            <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-sm lg:sticky lg:top-24">
              <h3 className="font-semibold text-ink-900 mb-3">Contact & Visit</h3>
              <p className="text-sm text-ink-500 mb-4">{salon.address}</p>

              <div className="space-y-2">
                {salon.phone && (
                  <a
                    href={`tel:${salon.phone.replace(/\s/g, '')}`}
                    className="flex items-center justify-center gap-2 w-full rounded-full bg-ink-950 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-ink-800"
                  >
                    <Phone className="h-4 w-4" />
                    Call {salon.phone}
                  </a>
                )}
                {salon.whatsapp && (
                  <a
                    href={`https://wa.me/${salon.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full rounded-full border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700 transition-all hover:bg-green-100"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                )}
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(salon.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full rounded-full border border-ink-200 bg-white px-4 py-3 text-sm font-semibold text-ink-700 transition-all hover:bg-ink-50"
                >
                  <Navigation className="h-4 w-4" />
                  Get Directions
                </a>
                {salon.website && (
                  <a
                    href={/^https?:\/\//i.test(salon.website) ? salon.website : `https://${salon.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full rounded-full border border-ink-200 bg-white px-4 py-3 text-sm font-semibold text-ink-700 transition-all hover:bg-ink-50"
                  >
                    <Globe className="h-4 w-4" />
                    Visit Website
                  </a>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-ink-100">
                <p className="text-xs text-ink-400 mb-2">Starting price</p>
                {salon.startingPrice != null ? (
                  <p className="text-2xl font-display font-semibold text-ink-950">₹{salon.startingPrice}</p>
                ) : (
                  <p className="text-sm text-ink-500">Price on request – call the salon</p>
                )}
              </div>
            </div>

            {/* Quick facts */}
            <div className="rounded-2xl border border-ink-100 bg-white p-5">
              <h3 className="font-semibold text-ink-900 mb-3 text-sm">Quick Facts</h3>
              <ul className="space-y-2 text-sm text-ink-600">
                {salon.reviewCount > 0 && (
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    {salon.reviewCount} reviews
                  </li>
                )}
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  {salon.services.length} services offered
                </li>
                {salon.distanceKm != null && (
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    {salon.distanceKm} km from you
                  </li>
                )}
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  {salon.isOpen ? 'Currently open' : 'Currently closed'}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
