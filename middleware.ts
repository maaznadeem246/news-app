
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareSupabaseClient } from './lib/supabase';




export async function middleware(req: NextRequest) {
  // We need to create a response and hand it to the supabase client to be able to modify the response headers.
  const res = NextResponse.next()
  // Create authenticated Supabase Client.

  let pathTobe = '/signin'

  const supabase = createMiddlewareSupabaseClient({ req, res })
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  console.log("req.nextUrl.pathname ==  '/' && session?.user.email")
  console.log(req.nextUrl.pathname)
  console.log(session?.user.email)
 
  // if (req.nextUrl.pathname ==  '/' && session?.user.email ) {
  //   const {data:users} = await supabase.from("users_profile").select("*").eq('id',session?.user.id).single()
  //   // console.log(users)
  //   if (session?.user.email && users?.is_subscribed ) {
  //     // Authentication successful, forward request to protected route.
  
  //     return res
  //   }
    
  //   if(session?.user.email && !users?.is_subscribed){
  //     pathTobe = '/subscription'
  //   }
  // }else  if (session?.user.email) {
  //   // Authentication successful, forward request to protected route.

  //   return res
  // }

  return res
  
  const redirectUrl = req.nextUrl.clone()
  redirectUrl.pathname = pathTobe
  redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
  return NextResponse.redirect(redirectUrl)
}

export const config = {
  matcher: ['/','/subscription'] //
};