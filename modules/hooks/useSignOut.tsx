import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { signOutService } from '../services/auth';






export default function useSignOut() {

  const router = useRouter()

  return useMutation(() => signOutService(), {
      retry:0,
  onSuccess: async(data:boolean) => {

    router.push('/signin')
      return true
    }
  })
}