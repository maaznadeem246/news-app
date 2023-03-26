import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../styles/theme/theme';
import createEmotionCache from '../styles/theme/createEmotionCache';
import { AuthLayout, MainLayout } from '../Project/layouts';

import {  ReactElement, ReactNode, useState } from 'react';
import { SessionContextProvider,  supabaseClient } from '@/lib/supabase';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {UserProvider} from '@/components/context/UserProvider';

import { GlobalProvider } from '@/components/context/useGlobalProvider';
import { NextPage } from 'next/types';
import { Analytics } from '@vercel/analytics/react';



const clientSideEmotionCache = createEmotionCache();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout
}
const queryClient = new QueryClient()


export default function App({ Component, pageProps,  emotionCache = clientSideEmotionCache, }: MyAppProps) {
  const [supabaseClientState] = useState(() => supabaseClient())

  const getLayout = Component.getLayout || ((page) => page)
  
  // supabaseClientState.auth.stopAutoRefresh()

  return(
    <>
    <CacheProvider value={emotionCache}>
    <SessionContextProvider supabaseClient={supabaseClientState} initialSession={pageProps.initialSession}>
    <QueryClientProvider client={queryClient}>
    <UserProvider > 
      <GlobalProvider >

      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <MainLayout >
              <AuthLayout>

                { getLayout(<Component {...pageProps} />)}

              </AuthLayout>
            </MainLayout>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>

        </GlobalProvider>
      </UserProvider>
      </QueryClientProvider>
     </SessionContextProvider>
     </CacheProvider>
     <Analytics  />
     </>
     )
}
