import { signInForType } from "@/components/auth/signIn";
import { signUpForType } from "@/components/auth/signUp";
// import {  supabaseClient } from "@/lib/supabase";
import { SupabaseClient } from "@supabase/supabase-js";


export type signUpServiceType = Omit<signUpForType,'confirmPassword'>
export type signInServiceType = signInForType
        

export const signUpService = async (user: signUpServiceType,supabaseClient:SupabaseClient) => {
    
    const { data, error: signUpError } = await supabaseClient.auth.signUp({
      ...user,
    
    },)
    
    // //console.log(data)
    // //console.log(signUpError)
    if(signUpError) {
      throw signUpError
    }
  
    return data
  }



  export const signInService = async (user: signInServiceType, supabaseClient:SupabaseClient) => {
   
    const { data, error:signUpError } = await supabaseClient.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    })
    
    // //console.log(data)
    // //console.log(signUpError)
    if(signUpError) {
      throw signUpError
    }
  
    return data
  }


  export const signOutService = async (supabaseClient:SupabaseClient) => {
    
    const { error } = await supabaseClient.auth.signOut()
    

    if(error) {
      throw error
    }
    return true
  }
  