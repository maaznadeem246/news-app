import { signUpForType } from '@/components/auth/signUp';
import { keyable, keyable2 } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { QueryErrorResetBoundaryProps, QueryErrorResetBoundaryValue } from '@tanstack/react-query/build/lib/QueryErrorResetBoundary';
import { extendShape, z } from 'zod';
import { signUpService } from '../services';
import { signUpServiceType } from '../services/auth';
import { supabase } from "../supabase";
import { createUser } from '../services/user';
import { useRouter } from 'next/router';






export default function useSignup() {
  const router = useRouter()
  const { redirectedFrom } = router.query

  return useMutation<keyable, Error, signUpServiceType, unknown>((user: signUpServiceType) => signUpService(user), {
    retry:0,
    onSuccess: async(data:keyable,variables) => {
      console.log(data)
   
      // const insertData = await createUser({data,variables});

      if(redirectedFrom && typeof redirectedFrom == 'string'){
        router.push(redirectedFrom)        
      }

      return data
    }
  })
}