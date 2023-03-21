
import { keyable } from '@/types';
import { useMutation } from '@tanstack/react-query';

import { signInService, signInServiceType } from '../services/auth';








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