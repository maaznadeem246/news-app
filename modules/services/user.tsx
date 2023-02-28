import { keyable } from "@/types"
import { supabase } from "../supabase"
import { signUpServiceType } from "./auth"

interface createUser {
    data:keyable,
    variables:signUpServiceType
}

export const createUser = async ({data,variables}:createUser)=> {
    const { data: insertData, error: insertError } = await supabase
    .from('users')  
    .insert({
      fullname: variables.fullname,
      email: data?.user?.email || '',
      id: data?.user?.id || '',
      
    }
    )

  if(insertError) {
    console.log(insertError)
    throw insertError
  }

  return insertData
}