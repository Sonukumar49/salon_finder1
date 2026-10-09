import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// null when keys are missing -> the app falls back to demo data instead of crashing.
export const supabase = url && anonKey ? createClient(url, anonKey) : null;
