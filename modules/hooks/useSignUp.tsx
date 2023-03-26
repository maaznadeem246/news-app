import { signUpForType } from '@/components/auth/signUp';
import { keyable, keyable2 } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { QueryErrorResetBoundaryProps, QueryErrorResetBoundaryValue } from '@tanstack/react-query/build/lib/QueryErrorResetBoundary';
import { extendShape, z } from 'zod';
import { signUpService } from '../services';
import { signUpServiceType } from '../services/auth';


import { useRouter } from 'next/router';
import { useSupabaseClient } from '@supabase/auth-helpers-react';







export default function uzseSignup() {
  // const router = useRouter()
  // const { redirectedFrom } = router.query

  const supabaseClient = useSupabaseClient();

  return useMutation<keyable, Error, signUpServiceType, unknown>((user: signUpServiceType) => signUpService(user,supabaseClient), {
    retry:0,
    onSuccess: async(data:keyable,variables) => {
      // //console.log(data)
   
      // const insertData = await createUser({data,variables});

      // if(redirectedFrom && typeof redirectedFrom == 'string'){

      //   router.push(redirectedFrom)        
      // }


      return data
    }
  })
}