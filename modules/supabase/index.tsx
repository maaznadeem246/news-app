import { createBrowserSupabaseClient, createServerSupabaseClient  } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { createClient } from '@supabase/supabase-js';
import { Database } from './types/supabase'

const env1:string = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const env2:string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

const supabase = createClient<Database>(env1, env2);

export {
    createBrowserSupabaseClient,
    createServerSupabaseClient,
    SessionContextProvider,
    supabase
}


//run this for types 
// npx supabase gen types typescript --project-id "vxrzfwlotzhjorukgsaq"  --schema public > modules\supabase\types\supabase.ts --debug 