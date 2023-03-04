import { keyable } from "@/types"
import { UserResponse } from "@supabase/supabase-js"
import { supabase } from "../supabase"
import { signUpServiceType } from "./auth"

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
//     // console.log(insertError)
//     throw insertError
//   }

//   return insertData
// }



export const getUserData = async() => {
      
  try{
    // const userSession= await  supabase.auth.getSession();
    const userData:UserResponse= await  supabase.auth.getUser();
    // console.log(userSession)

    if(userData && userData?.data?.user){

    const {data:users} = await supabase.from("users_profile").select("*").eq('id',userData.data.user.id).single()
    // console.log(users)
      return {
        // session:userSession.data.session
        user:{...userData.data,userData:users}
      }
   
    }
    return {
      // session:null,
       user:null
     }
    }catch(er){
      // // console.log(er)
      return {
        session:null,
         user:null
       }
    }

    }