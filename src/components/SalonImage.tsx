import { useState } from 'react';

interface Props {
  src?: string;
  name: string;
  className?: string;
}

/** Shows the salon photo, or a neat placeholder with initials when there is no photo. */
export default function SalonImage({ src, name, className = '' }: Props) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    const initials = name
      .replace(/[^A-Za-z0-9 ]/g, ' ')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join('');
    return (
      <div
        role="img"
        aria-label={name}
        className={`${className} flex items-center justify-center bg-gradient-to-br from-accent-50 to-ink-100 font-display text-5xl text-ink-300`}
      >
        {initials}
      </div>
    );
  }
  return <img src={src} alt={name} className={className} loading="lazy" onError={() => setFailed(true)} />;
}
