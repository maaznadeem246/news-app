import { createBrowserSupabaseClient, createServerSupabaseClient , createMiddlewareSupabaseClient, Session } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { createClient } from '@supabase/supabase-js';
import { Database } from './types/supabase'

const env1:string = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const env2:string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

const supabase = createClient<Database>(env1, env2);

const supabaseClient = createBrowserSupabaseClient<Database>({
    cookieOptions:{maxAge:3600,sameSite:'lax',},
    supabaseKey:process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    supabaseUrl:process.env.NEXT_PUBLIC_SUPABASE_URL,
    
  })

const env3:string = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const env4:string = process.env.SUPABASE_SERVICE_KEY|| ""



export {
    createBrowserSupabaseClient,
    createServerSupabaseClient,
    SessionContextProvider,
    createMiddlewareSupabaseClient,
    supabase,
    supabaseClient
}


//run this for types 
// npx supabase gen types typescript --project-id "vxrzfwlotzhjorukgsaq"  --schema public > modules\supabase\types\supabase.ts --debug 