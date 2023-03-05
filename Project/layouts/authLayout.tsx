

import Auth from '@/components/auth'
import { useUser } from '@/components/context/UserProvider';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import {ReactElement, ReactNode} from 'react'


export default function AuthLayout({ children  }: { children: ReactElement | ReactNode}) {
 
  const router = useRouter()  

     const {isLoading} = useUser();
    // console.log(session)
  
    if(isLoading )  {return ( <Box>Loading</Box>)}
    
   
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