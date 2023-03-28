
import { keyable } from '@/types';
import { useMutation } from '@tanstack/react-query';

import { signInService, signInServiceType } from '../services/auth';
import { useSupabaseClient } from '@supabase/auth-helpers-react';








export default function useSignIn() {

    const supabaseClient = useSupabaseClient()
  // const router = useRouter()
  
  // const { redirectedFrom } = router.query

  return useMutation<keyable, Error, signInServiceType, unknown>((user: signInServiceType) => signInService(user,supabaseClient), {
      retry:0,
      
    onSuccess: async(data:keyable,variables) => {
      // // console.log('redirectedFrom')
      // if(redirectedFrom && typeof redirectedFrom == 'string'){

      //     router.push(redirectedFrom)        
      //   }else{
      //     router.push('/')     
      //   }

      return data
    }
  })
}