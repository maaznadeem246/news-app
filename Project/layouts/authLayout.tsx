

import Auth from '@/components/auth'
import useAuth from '@/modules/hooks/useAuth'
import {ReactElement, ReactNode} from 'react'


export default function AuthLayout({ children  }: { children: ReactElement | ReactNode}) {
 
    
    // console.log(session)
    const user = useAuth();

 

    return (
      <>
         {!user ? (
        // <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
        <Auth />
       
      ) : (
        <>{children}</>
      )}
        
      
      </>
    )
  }