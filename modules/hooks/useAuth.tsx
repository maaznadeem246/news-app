import { useSession } from "@supabase/auth-helpers-react"
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
import { initialData } from "@/components/context/AuthProvider"
import { UserResponse } from "@supabase/supabase-js"
import { getUserData } from "../services/user"

export interface ContextType  {
  [key: string]: any  
}



export const AuthContext = createContext<ContextType>(initialData);

const useAuthContext = () =>  useContext(AuthContext)

export const useAuth  = ()  => {
  const [authStatus,setAuthStatus] = useState<string|null>(null)
  const [data, setData] = useState<ContextType>({
   
  })

  const setUserData = () => {
  
  }



      useEffect(() => {
       
       

        supabase.auth.onAuthStateChange((_event, session) => {
          console.log(_event)
          console.log('mounter 1')
          console.log(_event != authStatus)
          if(_event != authStatus){
            console.log('mounter 2')
            // setUserData()
            const userD = getUserData()
            if(userD != null){
              setData({
                ...userD
              })
            }
            setAuthStatus(_event)
            
          }
      
      
        })



      }, [])

    

      return data

}



export default  useAuthContext