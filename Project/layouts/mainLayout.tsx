import { Nav } from '@/components/header'
import MainContainer from '@/components/MainContainer'
import PageLoadingBar from '@/components/PageLoadingBar'


import { Box, Toolbar } from '@mui/material'

import {ReactElement, ReactNode} from 'react'


export default function MainLayout({ children  }: { children: ReactElement | ReactNode}) {
 
  return (
      <>
        <PageLoadingBar />

        <Nav />
        <Toolbar />
        <MainContainer>{children}</MainContainer>

      </>
    )
  }