import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { signOutService } from '../services/auth';
import { supabaseClient } from '../supabase';






export default function useSignOut() {



  return useMutation(() => signOutService(), {
      retry:0,
  onSuccess: async(data:boolean) => {
    
  
      return true
    }
  })
}