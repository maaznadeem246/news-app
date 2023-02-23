
import {ReactElement, ReactNode} from 'react'


export default function MainLayout({ children  }: { children: ReactElement | ReactNode}) {
    return (
      <>
        {/* <Navbar /> */}
        <>{children}</>
        {/* <Footer /> */}
      </>
    )
  }