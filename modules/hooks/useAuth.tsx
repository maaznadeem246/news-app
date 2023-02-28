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

export interface ContextType {
  user:keyable | null,
  loading:boolean,
}




export const AuthContext = createContext<ContextType>(initialData);


export const useAuth= ()  => useContext(AuthContext)




export default  useAuth