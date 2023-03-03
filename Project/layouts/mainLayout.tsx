
import { Nav } from '@/components/header'
import MainContainer from '@/components/MainContainer'
import { useUser } from '@/modules/hooks/useUser'
import { Box, Toolbar } from '@mui/material'

import {ReactElement, ReactNode} from 'react'


export default function MainLayout({ children  }: { children: ReactElement | ReactNode}) {
 
  return (
      <>
        {/* <Navbar /> */}
        <Nav 
          
        />
        <Toolbar />
        <MainContainer>{children}</MainContainer>
        {/* <Footer /> */}
      </>
    )
  }