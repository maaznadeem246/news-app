import {createMiddlewareSupabaseClient, supabase} from "./modules/supabase"
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parse } from 'cookie';
import { IncomingMessage, ServerResponse } from "http";



export async function middleware(req:NextRequest,res:NextResponse) {
  // We need to create a response and hand it to the supabase client to be able to modify the response headers.

  // Create authenticated Supabase Client
    console.log('Middlaware')
    // console.log(req.headers.get('cookie'))
  const access_token = parse(req.headers.get('cookie') || '')['my-access-token'];
  const refresh_token = parse(req.headers.get('cookie') || '')['my-refresh-token'];
  // console.log(access_token)


if (access_token && refresh_token) {
  
  // console.log('fdfdf')

 const data =  await supabase.auth.setSession({
    access_token: access_token,
    refresh_token: refresh_token,
   
  })

  


  // Check auth conditions
  // console.log('fdfdf')
  // console.log(data)
  if (data?.data?.session?.user.email) {
    // Authentication successful, forward request to protected route.
    const response = NextResponse.next()
    return response;
  }

}
// else {
//   // make sure you handle this case!
//   throw new Error('User is not authenticated.')
// }

//  console.log('fdfdf1')

  // Auth condition not met, redirect to home page.
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = '/signin';
  redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ['/'] // '/subscription'
};