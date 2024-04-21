import { createClient } from 'npm:@supabase/supabase-js@2'


export const supabaseAdmin = createClient(Deno.env.get("SUPABASE_URL"), Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"))