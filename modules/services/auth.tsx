import { signInForType } from "@/components/auth/signIn";
import { signUpForType } from "@/components/auth/signUp";
import { supabase } from "../supabase";


export type signUpServiceType = Omit<signUpForType,'confirmPassword'>
export type signInServiceType = signInForType
        

export const signUpService = async (user: signUpServiceType) => {
 
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



  export const signInService = async (user: signInServiceType) => {
   
    const { data, error:signUpError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    })
    
    console.log(data)
    console.log(signUpError)
    if(signUpError) {
      throw signUpError
    }
  
    return data
  }


  export const signOutService = async () => {
   
    const { error } = await supabase.auth.signOut()
    

    if(error) {
      throw error
    }
    return true
  }
