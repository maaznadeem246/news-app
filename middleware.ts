import {createMiddlewareSupabaseClient, supabase} from "./modules/supabase"
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parse } from 'cookie';
import { IncomingMessage, ServerResponse } from "http";



export async function middleware(req: NextRequest) {
  // We need to create a response and hand it to the supabase client to be able to modify the response headers.
  const res = NextResponse.next()
  // Create authenticated Supabase Client.
  // //console.log(req.cookies)
  const supabase = createMiddlewareSupabaseClient({ req, res })
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()
  // console.log('session.user.email')
  // console.log(session?.user.email)
  
  if (req.nextUrl.pathname ==  '/' && session?.user.email ) {
    const {data:users} = await supabase.from("users_profile").select("*").eq('id',session?.user.id).single()
    // console.log(users)
    if (session?.user.email && users?.is_subscribed ) {
      // Authentication successful, forward request to protected route.
  
      return res
    }
  }else  if (session?.user.email) {
    // Authentication successful, forward request to protected route.

    return res
  }
  // return res
  // Auth condition not met, redirect to home page.
  const redirectUrl = req.nextUrl.clone()
  redirectUrl.pathname = '/signin'
  redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
  return NextResponse.redirect(redirectUrl)
}

export const config = {
  matcher: ['/','/news','/subscription'] //
};