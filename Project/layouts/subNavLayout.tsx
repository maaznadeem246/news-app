

import TagsSection from '@/components/news/components/tagsSections'

import {ReactElement, ReactNode} from 'react'


export default function SubNavLayout({ children  }: { children: ReactElement | ReactNode}) {
    //// console.log('subnav')
  return (
      <>
        {/* <Navbar /> */}
        <TagsSection />        
        {children}

        {/* <Footer /> */}
      </>
    )
  }