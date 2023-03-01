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
    
  const [data, setData] = useState<ContextType>({
   
  })


      useEffect(() => {
        console.log('mounter')
        const userD = getUserData()
        if(userD != null){
          setData({
            ...userD
          })
        }

      supabase.auth.onAuthStateChange((_event, session) => {
        
         const userD = getUserData()
         if(userD != null){
            setData({
              ...userD
            })
          }
    
      })



      }, [])

    

      return data

}



export default  useAuthContext