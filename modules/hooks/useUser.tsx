import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
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

  const statusRef = useRef<string|null>(null)
  // const signInMutaion = useSignIn() 
  const router = useRouter()
  const { redirectedFrom } = router.query
  const [data, setData] = useState<ContextType>({
    user:null,
    session:null,
    loading:true,
  })

  const setUserData = async(ev:string) => {
    setData(() => ({
      loading:true,
    }))
    const userD = await getUserData()
    console.log('userD1')
    console.log(userD)
    if(userD != null && (statusRef.current != ev)){
      console.log('userD2')
      setData((props) => ({
        ...props,
        ...userD,
        loading:false,
      }))
      statusRef.current = ev
      
      if(redirectedFrom && typeof redirectedFrom == 'string'){

        router.push(redirectedFrom)        
      }else if (ev === 'SIGNED_IN' ){
        router.push('/') 
        if(userD?.user?.userData?.is_subscribed){
          router.push('/')
        }else{
          router.push('/subscription') 
        }
      }else if (ev === 'SIGNED_OUT' || ev === 'USER_DELETED'){
        router.push('/signin')  
      }

    }
  }

  useEffect(() => {

   
    setUserData('init')
   

    const { data: authListener } =  supabase.auth.onAuthStateChange(async (_event, session) => {
    
      // console.log('mounter 1')
      // console.log(_event != UserStatus)
      // if(_event != UserStatus){
        // console.log('mounter 2')
        // console.log(_event)
        // console.log(session)

         

          if (_event === 'SIGNED_OUT' || _event === 'USER_DELETED') {
            // delete cookies on sign out
            const expires = new Date(0).toUTCString()
            document.cookie = `my-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`
            document.cookie = `my-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`
          } else if ((_event === 'SIGNED_IN' || _event === 'TOKEN_REFRESHED') && session) {
            const maxAge = 100 * 365 * 24 * 60 * 60 // 100 years, never expires
            document.cookie = `my-access-token=${session.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
            document.cookie = `my-refresh-token=${session.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
          }
          await setUserData(_event)


        
         //  await setUserStatus(_event)
        
      // }
  
  
    })

    return () => {
      authListener?.subscription.unsubscribe();
    };

  }, [])
  
  // useEffect(()=>{
  //   console.log(signInMutaion.isLoading)
  // },[signInMutaion.isLoading])

    




    

      return data

}



export default  useUserContext