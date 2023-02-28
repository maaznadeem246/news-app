import { signUpForType } from '@/components/auth/signUp';
import { keyable, keyable2 } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { QueryErrorResetBoundaryProps, QueryErrorResetBoundaryValue } from '@tanstack/react-query/build/lib/QueryErrorResetBoundary';
import { extendShape, z } from 'zod';
import { signUpService } from '../services';
import { signUpServiceType } from '../services/auth';
import { supabase } from "../supabase";
import { createUser } from '../services/user';






export default function useSignup() {
  return useMutation<keyable, Error, signUpServiceType, unknown>((user: signUpServiceType) => signUpService(user), {
    onSuccess: async(data:keyable,variables) => {
      console.log(data)
   
      // const insertData = await createUser({data,variables});

      

      return data
    }
  })
}