import { Check, Info } from 'lucide-react';
import type { WhyResult } from '@/lib/why';

export default function WhyBox({ why, className = '' }: { why: WhyResult; className?: string }) {
  return (
    <div className={`rounded-xl border border-accent-100 bg-accent-50/50 p-3 ${className}`}>
      <p className="text-xs font-semibold text-accent-700 mb-2">
        {why.personalised ? 'Why this is shortlisted for you' : 'Why it stands out'}
      </p>
      <ul className="space-y-1.5">
        {why.reasons.map((r, i) => (
          <li key={i} className="flex items-start gap-1.5 text-xs text-ink-700">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-600" />
            {r}
          </li>
        ))}
        {why.headsUp.map((h, i) => (
          <li key={`h${i}`} className="flex items-start gap-1.5 text-xs text-ink-500">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-400" />
            {h}
          </li>
        ))}
      </ul>
    </div>
  );
}
