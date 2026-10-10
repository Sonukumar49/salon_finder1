// Opening-hours helpers. Accepts "10:00-21:00" (24h) or "10:00 AM – 9:00 PM" or "Closed".

const ALWAYS_OPEN = /^(open\s*)?(24\s*(hours?|hrs?)|24\s*\/\s*7)$/i;

function parseTime(t: string): number | null {
  const m = t.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i);
  if (!m) return null;
  let h = parseInt(m[1], 10);
  const min = m[2] ? parseInt(m[2], 10) : 0;
  const ap = m[3]?.toLowerCase();
  if (ap === 'pm' && h < 12) h += 12;
  if (ap === 'am' && h === 12) h = 0;
  if (h > 24 || min > 59) return null;
  return h * 60 + min;
}

function parseRange(s?: string): [number, number] | null {
  if (!s) return null;
  const parts = s.split(/\s*[-–—]\s*|\s+to\s+/i);
  if (parts.length !== 2) return null;
  const a = parseTime(parts[0]);
  const b = parseTime(parts[1]);
  return a == null || b == null ? null : [a, b];
}

function fmt(min: number): string {
  const h = Math.floor(min / 60) % 24;
  const m = min % 60;
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
}

/** Text shown in the "Opening Hours" table. */
export function formatHours(s?: string): string {
  if (!s || /^closed$/i.test(s.trim())) return 'Closed';
  if (ALWAYS_OPEN.test(s.trim())) return 'Open 24 hours';
  const r = parseRange(s);
  return r ? `${fmt(r[0])} – ${fmt(r[1])}` : s;
}

/** True if the salon is open right now (India time). */
export function isOpenNow(openHours: Record<string, string>, now: Date = new Date()): boolean {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(now);
  const day = parts.find((p) => p.type === 'weekday')?.value ?? '';
  const hour = parseInt(parts.find((p) => p.type === 'hour')?.value ?? '0', 10);
  const minute = parseInt(parts.find((p) => p.type === 'minute')?.value ?? '0', 10);
  const nowMin = hour * 60 + minute;

  if (ALWAYS_OPEN.test((openHours[day] ?? '').trim())) return true;
  const range = parseRange(openHours[day]);
  if (!range) return false;
  const [start, end] = range;
  if (end === start) return false;
  return end > start ? nowMin >= start && nowMin < end : nowMin >= start || nowMin < end;
}

/** "9:00 PM" if the salon is open right now and has a closing time today, else null. */
export function closingTimeToday(openHours: Record<string, string>, now: Date = new Date()): string | null {
  if (!isOpenNow(openHours, now)) return null;
  const day = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', weekday: 'short' }).format(now);
  const raw = (openHours[day] ?? '').trim();
  if (ALWAYS_OPEN.test(raw)) return null;
  const r = parseRange(raw);
  return r ? fmt(r[1]) : null;
}
