import { signUpForType } from "@/components/auth/signUp";
import { supabase } from "../supabase";


export type signUpServiceType = Omit<signUpForType,'confirmPassword'>
        

export const signUpService = async (user: signUpServiceType) => {
    // Check if username exists
    // const { data: email } = await supabase
    //   .from('users')
    //   .select('*')
    //   .eq('email', user.email)
    //   .single()
  

    // if(email) {
    //   throw new Error('User with Email exists')
    // }
  
    const { data, error: signUpError } = await supabase.auth.signUp({
      ...user,
    
    },)
    
    console.log(data)
    console.log(signUpError)
    if(signUpError) {
      throw signUpError
    }
  
    return data
  }

