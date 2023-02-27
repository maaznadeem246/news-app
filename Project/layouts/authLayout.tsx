

import Auth from '@/components/auth'
import useAuth from '@/modules/hooks/useAuth'
import { Box } from '@mui/material';
import {ReactElement, ReactNode} from 'react'


export default function AuthLayout({ children  }: { children: ReactElement | ReactNode}) {
 
    
    // console.log(session)
    const session = useAuth();

 
    if(session.loading)  {return ( <Box>Loading</Box>)}
    else{
      return (
        <>
          {!session.data ? (
          // <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
          <Auth />
        
        ) : (
          <>{children}</>
        )}
          
        
        </>
    )
    }
  }