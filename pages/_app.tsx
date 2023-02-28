import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../styles/theme/theme';
import createEmotionCache from '../styles/theme/createEmotionCache';
import { AuthLayout, MainLayout } from '../Project/layouts';

import { MouseEvent, useState } from 'react';
import { createBrowserSupabaseClient, SessionContextProvider } from '../modules/supabase';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AuthProvider from '@/components/context/AuthProvider';



const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
const queryClient = new QueryClient()


export default function App({ Component, pageProps,  emotionCache = clientSideEmotionCache, }: MyAppProps) {
  // const [supabase] = useState(() => createBrowserSupabaseClient())

  return(
    <CacheProvider value={emotionCache}>
    {/* <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}> */}
     <AuthProvider > 
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <MainLayout >
            {/* <AuthLayout> */}

                <Component {...pageProps} />

            {/* </AuthLayout> */}
          </MainLayout>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      </AuthProvider>
     {/* </SessionContextProvider> */}
     </CacheProvider>
     )
}
