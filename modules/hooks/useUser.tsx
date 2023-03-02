import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { supabase } from "../supabase"


type sesstionType = {
    session:object | null,
    loading:boolean
}



import { useContext } from "react";
import { createContext } from "react";
import { keyable } from "@/types"
import { initialData } from "@/components/context/UserProvider"
import { UserResponse } from "@supabase/supabase-js"
import { getUserData } from "../services/user"
import useSignIn from "./useSignIn"

export interface ContextType  {
  [key: string]: any  
}



export const UserContext = createContext<ContextType>(initialData);

const useUserContext = () =>  useContext(UserContext)

export const useUser  = ()  => {
  const [UserStatus,setUserStatus] = useState<string|null>(null)
  // const signInMutaion = useSignIn()    
  const [data, setData] = useState<ContextType>({
    user:null,
    session:null
  })

  const setUserData = async() => {
    const userD = await getUserData()
    // console.log(userD)
    if(userD != null){
      setData({
        ...userD
      })
    }
  }
  
  // useEffect(()=>{
  //   console.log(signInMutaion.isLoading)
  // },[signInMutaion.isLoading])

      useEffect(()=>{
         
          if(data.user?.user?.id)
          console.log(data)
          console.log('tttt')
          // fetch('/api/set-supabase-cookie',{
          //   method:'POST',
          //   body: JSON.stringify({
          //     event: data ? 'SIGNED_IN':'SIGNED_OUT',
          //     session:data.session
          //   }),
          // })        
      },[data.user?.user?.id])  


      useEffect(() => {
        setUserData()
       

        const { data: authListener } =  supabase.auth.onAuthStateChange(async (_event, session) => {
          console.log(_event)
          // console.log('mounter 1')
          // console.log(_event != UserStatus)
          // if(_event != UserStatus){
            // console.log('mounter 2')
            if(session){
              if (_event === 'SIGNED_OUT' || _event === 'USER_DELETED') {
                // delete cookies on sign out
                const expires = new Date(0).toUTCString()
                document.cookie = `my-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`
                document.cookie = `my-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`
              } else if (_event === 'SIGNED_IN' || _event === 'TOKEN_REFRESHED') {
                const maxAge = 100 * 365 * 24 * 60 * 60 // 100 years, never expires
                document.cookie = `my-access-token=${session.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
                document.cookie = `my-refresh-token=${session.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
              }
  
            }
            await setUserData()
            
             setUserStatus(_event)
            
          // }
      
      
        })

        return () => {
          authListener?.subscription.unsubscribe();
        };

      }, [])

    

      return data

}



export default  useUserContext