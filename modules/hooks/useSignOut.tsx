import { signUpForType } from '@/components/auth/signUp';
import { keyable, keyable2 } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { QueryErrorResetBoundaryProps, QueryErrorResetBoundaryValue } from '@tanstack/react-query/build/lib/QueryErrorResetBoundary';
import { extendShape, z } from 'zod';
import { signUpService } from '../services';
import { supabase } from "../supabase";
import { useRouter } from 'next/router';
import { signOutService } from '../services/auth';






export default function useSignOut() {

  const router = useRouter()


  return useMutation(() => signOutService(), {
      retry:0,
  onSuccess: async(data:boolean) => {
      console.log(data)
    
        router.push('/signin')        
     

      return true
    }
  })
}