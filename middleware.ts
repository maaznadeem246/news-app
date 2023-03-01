import {createMiddlewareSupabaseClient} from "./modules/supabase"
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parse } from 'cookie';
import { IncomingMessage, ServerResponse } from "http";



export async function middleware(req:NextRequest,res:NextResponse) {
  // We need to create a response and hand it to the supabase client to be able to modify the response headers.

  // Create authenticated Supabase Client
    console.log(req)
  const cookie = parse(req.headers.get('Cookie') || '');
  console.log(cookie)
console.log(cookie['my-access-token'])
  const refreshToken = cookie['my-access-token']
const accessToken = cookie['my-refresh-token']

if (refreshToken && accessToken) {
    const supabase = createMiddlewareSupabaseClient({ req, res });

  await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
   
  })

 
  // Check if we have a session
  const {
    data: { session }
  } = await supabase.auth.getSession();

  // Check auth condition
  console.log('fdfdf')
  console.log(session)
  if (session?.user.email?.endsWith('@gmail.com')) {
    // Authentication successful, forward request to protected route.
    return res;
  }

}

 
  // Auth condition not met, redirect to home page.
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = '/signin';
  redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ['/']
};