import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../styles/theme/theme';
import createEmotionCache from '../styles/theme/createEmotionCache';
import { AuthLayout, MainLayout } from '../Project/layouts';

import { MouseEvent, useState } from 'react';
import { createBrowserSupabaseClient, SessionContextProvider, supabase } from '../modules/supabase';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {UserProvider} from '@/components/context/UserProvider';
import { Database } from '@/modules/supabase/types/supabase';



const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
const queryClient = new QueryClient()


export default function App({ Component, pageProps,  emotionCache = clientSideEmotionCache, }: MyAppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient<Database>())

  return(

    <CacheProvider value={emotionCache}>
    <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
    <UserProvider > 
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
      </UserProvider>
     </SessionContextProvider>
     </CacheProvider>

     )
}
