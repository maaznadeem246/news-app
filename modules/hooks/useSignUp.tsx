import { signUpForType } from '@/components/auth/signUp';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { supabase } from "../supabase";




const createUser = async (user: signUpForType) => {
  // Check if username exists
  const { data: userWithUsername } = await supabase
    .from('users')
    .select('*')
    .eq('email', user.email)
    .single()

  if(userWithUsername) {
    throw new Error('User with Email exists')
  }

  const { data, error: signUpError } = await supabase.auth.signUp({
    email: user.email,
    password: user.password
  })

  if(signUpError) {
    throw signUpError
  }

  return data
}

export default function useSignup(user: signUpForType) {
  return useMutation(() => createUser(user), {
    onSuccess: async(data) => {
      const { data: insertData, error: insertError } = await supabase
        .from('users')
        .insert({
          fullname: user.fullname,
          email: user.email,
          id: data.user?.id || ""
        })

      if(insertError) {
        throw insertError
      }

      return insertData
    }
  })
}