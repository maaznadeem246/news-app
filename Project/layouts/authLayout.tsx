

import Auth from '@/components/auth'
import useAuth from '@/modules/hooks/useAuth'
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import {ReactElement, ReactNode} from 'react'


export default function AuthLayout({ children  }: { children: ReactElement | ReactNode}) {
 
  const router = useRouter()  

     const session = useAuth();
    console.log(session)
  
    if(session.loading )  {return ( <Box>Loading</Box>)}
    
   
    else {
      return (
        <>
          {/* {!session.data ? (
          // <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
          <Auth />
        
        ) : */}
         
          <>{children}</>
        
        
        {/* } */}
          
        
        </>
    )
    }

   
  }