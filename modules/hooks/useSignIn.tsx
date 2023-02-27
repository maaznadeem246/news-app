import { signUpForType } from '@/components/auth/signUp';
import { keyable, keyable2 } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { QueryErrorResetBoundaryProps, QueryErrorResetBoundaryValue } from '@tanstack/react-query/build/lib/QueryErrorResetBoundary';
import { extendShape, z } from 'zod';
import { signUpService } from '../services';
import { signInService, signInServiceType } from '../services/auth';
import { supabase } from "../supabase";






export default function useSignIn() {
  return useMutation<keyable, Error, signInServiceType, unknown>((user: signInServiceType) => signInService(user), {
    onSuccess: async(data:keyable,variables) => {
      console.log(data)
   
     

      return data
    }
  })
}