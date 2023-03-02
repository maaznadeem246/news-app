
import { Nav } from '@/components/header'
import MainContainer from '@/components/MainContainer'
import { Toolbar } from '@mui/material'
import { Box } from '@mui/system'
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