
import Auth from '@/pages/components/auth'
import { useSession } from '@supabase/auth-helpers-react'
import {ReactElement, ReactNode} from 'react'


export default function AuthLayout({ children  }: { children: ReactElement | ReactNode}) {
    const session = useSession()
    
    return (
      <>
         {!session ? (
        // <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
        <Auth />
       
      ) : (
        <>{children}</>
      )}
        
      
      </>
    )
  }