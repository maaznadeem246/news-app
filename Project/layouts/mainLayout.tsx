
import { Box } from '@mui/system'
import {ReactElement, ReactNode} from 'react'


export default function MainLayout({ children  }: { children: ReactElement | ReactNode}) {
    return (
      <>
        {/* <Navbar /> */}
        <Box>
          Header
        </Box>
        <>{children}</>
        {/* <Footer /> */}
      </>
    )
  }