import { useMutation } from '@tanstack/react-query';

import { signOutService } from '../services/auth';
import { useSupabaseClient } from '@supabase/auth-helpers-react';







export default function useSignOut() {

  const supabaseClient = useSupabaseClient()

  return useMutation(() => signOutService(supabaseClient), {
      retry:0,
  onSuccess: async(data:boolean) => {
    
  
      return true
    }
  })
}