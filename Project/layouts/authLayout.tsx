

import Auth from '@/components/auth'
import { useUser } from '@/components/context/UserProvider';
import Heading from '@/components/headings';
import SingInPage from '@/pages/signin';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import {ReactElement, ReactNode} from 'react'


export default function AuthLayout({ children  }: { children: ReactElement | ReactNode}) {
 
  const router = useRouter()  

     const {isLoading,session,isRouteLoading} = useUser();
  
  
    if(isLoading || isRouteLoading)  {return ( 

            <Box
           
                sx={{
                    marginTop:'5rem'
                }}
            >

                <Heading  
                variant="h2"
                sx={{
                    fontWeight:'600',
                    textAlign:'center',
                    margin:'auto',
                    marginBottom:'30px',
                    marginTop:'30px'
                    }}
                    headingStyle={true}
                >
                  Loading
                </Heading>
            </Box>
    )}
    
      if(!(isLoading || isRouteLoading) && !session) {
            if(router.pathname.startsWith('/signup') || router.pathname.startsWith('/signin')){
            
              return   <>{ children }</>
            }else{
              return <SingInPage  />
            }
      }
    
      return  <>{ children }</>   

   
  }