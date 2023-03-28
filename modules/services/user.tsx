import { UserDetails, keyable } from "@/types"
import { SupabaseClient, User, UserResponse } from "@supabase/supabase-js"

import { signUpServiceType } from "./auth"
import { useSupabaseClient } from "@supabase/auth-helpers-react"

interface createUser {
    data:keyable,
    variables:signUpServiceType
}

// export const createUser = async ({data,variables}:createUser)=> {
//     const { data: insertData, error: insertError } = await supabase
//     .from('users')  
//     .insert({
//       fullname: variables.fullname,
//       email: data?.user?.email || '',
//       id: data?.user?.id || '',
      
//     }
//     )

//   if(insertError) {
//     // //// console.log(insertError)
//     throw insertError
//   }

//   return insertData
// }



export const getUserProfileData = async(supabaseClient:SupabaseClient,id?:string):Promise<UserDetails|null> => {
      

  try{
    // const userSession= await  supabaseClient.auth.getSession();
    // //// console.log(userSession)
    // if(userSession){
    let eqId : string | undefined | null = id
    if(!eqId){
      const userData:UserResponse= await  supabaseClient.auth.getUser();
        eqId = userData?.data?.user?.id ?? null
    }  


      if(eqId){
  
      const {data:users}:{data:UserDetails|null} = await supabaseClient.from("users_profile").select("*").eq('id',eqId).single()
      // //// console.log(users)
        return users
     
      }
      return null
    // }

    }catch(er){
      // // //// console.log(er)
      return null
    }

    }