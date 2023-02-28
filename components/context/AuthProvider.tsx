
import useAuth, { ContextType } from "@/modules/hooks/useAuth";
import { AuthContext } from "@/modules/hooks/useAuth";
import { supabase } from "@/modules/supabase";
import { useRouter } from "next/router";
import { FC, Provider, ProviderProps, ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { nullable } from "zod";


interface ProviderType {
    children:ReactNode
}

export const initialData ={
  user:null,
  loading:true,
}


const AuthProvider : FC<ProviderType>  = ({children}) => {
  const router = useRouter()  
    const [data, setData] = useState<ContextType>({
        user:null,
        loading:true,
    })







    
  
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
          console.log(session)
          if(session == null){
       
            router.push('/signin')
          }
          setData({
            user:session,
            loading:false,
          })
        })
    
        supabase.auth.onAuthStateChange((_event, session) => {
          console.log(session)
         
          setData({
            user:session,
            loading:false,
          })
          if(session == null){
       
            router.push('/signin')
          }
         
        })

     

      }, [])

     

    const ctxData = {
        ...data
    } 

    return <AuthContext.Provider value={ctxData}>{children}</AuthContext.Provider>
}



export default AuthProvider;