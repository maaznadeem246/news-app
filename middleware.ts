import {createMiddlewareSupabaseClient, supabase} from "./modules/supabase"
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parse } from 'cookie';
import { IncomingMessage, ServerResponse } from "http";



export async function middleware(req:NextRequest,res:NextResponse) {
  // We need to create a response and hand it to the supabase client to be able to modify the response headers.

  // Create authenticated Supabase Client
    // console.log(req)
  const cookie = parse(req.headers.get('Cookie') || '');
  console.log(cookie)
  const accessToken  = cookie['my-access-token']
const  refreshToken = cookie['my-refresh-token']

if (refreshToken && accessToken) {
  
  console.log('fdfdf')

 const {data: { session }} =  await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
   
  })

  


  // Check auth condition
  console.log('fdfdf')
  // console.log(session)
  if (session?.user.email?.endsWith('@gmail.com')) {
    // Authentication successful, forward request to protected route.
    const response = NextResponse.next()
    return response;
  }

}
// else {
//   // make sure you handle this case!
//   throw new Error('User is not authenticated.')
// }

 console.log('fdfdf1')

  // Auth condition not met, redirect to home page.
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = '/signin';
  redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ['/','/subscription']
};