import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../styles/theme/theme';
import createEmotionCache from '../styles/theme/createEmotionCache';
import { AuthLayout, MainLayout } from '../Project/layouts';

import { useState } from 'react';
import { createBrowserSupabaseClient, SessionContextProvider } from '../modules/supabase';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
const queryClient = new QueryClient()


export default function App({ Component, pageProps,  emotionCache = clientSideEmotionCache, }: MyAppProps) {
  const [supabase] = useState(() => createBrowserSupabaseClient())

  return(
    <CacheProvider value={emotionCache}>
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthLayout>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </AuthLayout>
      </ThemeProvider>
      </QueryClientProvider>
     </SessionContextProvider>
     </CacheProvider>
     )
}
