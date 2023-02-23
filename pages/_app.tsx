import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../styles/theme/theme';
import createEmotionCache from '../styles/theme/createEmotionCache';
import { AuthLayout, MainLayout } from '../Project/layouts';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}


export default function App({ Component, pageProps,  emotionCache = clientSideEmotionCache, }: MyAppProps) {
  const [supabase] = useState(() => createBrowserSupabaseClient())

  return(
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthLayout>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </AuthLayout>
      </ThemeProvider>
      </CacheProvider>
     </SessionContextProvider>
     )
}
