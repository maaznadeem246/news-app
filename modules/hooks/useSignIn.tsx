import { signUpForType } from '@/components/auth/signUp';
import { keyable, keyable2 } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { QueryErrorResetBoundaryProps, QueryErrorResetBoundaryValue } from '@tanstack/react-query/build/lib/QueryErrorResetBoundary';
import { extendShape, z } from 'zod';
import { signUpService } from '../services';
import { signInService, signInServiceType } from '../services/auth';
import { supabase } from "../supabase";
import { useRouter } from 'next/router';







export default function useSignIn() {


  // const router = useRouter()
  
  // const { redirectedFrom } = router.query

  return useMutation<keyable, Error, signInServiceType, unknown>((user: signInServiceType) => signInService(user), {
      retry:0,
    onSuccess: async(data:keyable,variables) => {
      // //console.log(redirectedFrom)
      // if(redirectedFrom && typeof redirectedFrom == 'string'){

      //     router.push(redirectedFrom)        
      //   }else{
      //     router.push('/')     
      //   }

      return data
    }
  })
}