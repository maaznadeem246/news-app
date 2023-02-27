import { signUpForType } from '@/components/auth/signUp';
import { keyable, keyable2 } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { QueryErrorResetBoundaryProps, QueryErrorResetBoundaryValue } from '@tanstack/react-query/build/lib/QueryErrorResetBoundary';
import { extendShape, z } from 'zod';
import { signUpService } from '../services';
import { signUpServiceType } from '../services/auth';
import { supabase } from "../supabase";






export default function useSignup() {
  return useMutation<keyable, Error, signUpServiceType, unknown>((user: signUpServiceType) => signUpService(user), {
    onSuccess: async(data:keyable,variables) => {
      console.log(data)
   
      const { data: insertData, error: insertError } = await supabase
        .from('users')  
        .insert({
          fullname: variables.fullname,
          email: data?.user?.email || '',
          id: data?.user?.id || '',
          
        }
        )

      if(insertError) {
        console.log(insertError)
        throw insertError
      }

      return insertData
    }
  })
}