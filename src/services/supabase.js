import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

export function initSupabase() {
    console.log('Supabase initialized with URL:', process.env.SUPABASE_URL);
}
