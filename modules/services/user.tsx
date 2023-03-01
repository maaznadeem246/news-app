import { keyable } from "@/types"
import { UserResponse } from "@supabase/supabase-js"
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



export const getUserData = async() => {
      
  try{
    const userSession:UserResponse= await  supabase.auth.getUser();
    console.log(userSession)

    if(userSession && userSession?.data?.user){

    const {data:users} = await supabase.from("users").select("*").eq('id',userSession.data.user.id).single()
      return {
        ...userSession,
            ...users
      }
   
    }
  }catch(er){

    return null
  }

    }