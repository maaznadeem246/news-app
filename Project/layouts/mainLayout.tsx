
import { Nav } from '@/components/header'
import { Box } from '@mui/system'
import {ReactElement, ReactNode} from 'react'


export default function MainLayout({ children  }: { children: ReactElement | ReactNode}) {
    return (
      <>
        {/* <Navbar /> */}
        <Nav 
          
        />
        <>{children}</>
        {/* <Footer /> */}
      </>
    )
  }