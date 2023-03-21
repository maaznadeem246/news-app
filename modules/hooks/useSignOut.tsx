import { useMutation } from '@tanstack/react-query';

import { signOutService } from '../services/auth';







export default function useSignOut() {



  return useMutation(() => signOutService(), {
      retry:0,
  onSuccess: async(data:boolean) => {
    
  
      return true
    }
  })
}