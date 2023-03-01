

import { AuthContext , useAuth} from "@/modules/hooks/useAuth";
import { supabase } from "@/modules/supabase";
import { keyable } from "@/types";
import { User, UserResponse } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { FC, Provider, ProviderProps, ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { nullable } from "zod";


interface ProviderType {
    children:ReactNode
}

export const initialData ={

}


const AuthProvider : FC<ProviderType>  = ({children}) => {

    const data = useAuth()



  
     

    const ctxData = {
        ...data
    } 

    return <AuthContext.Provider value={ctxData}>{children}</AuthContext.Provider>
}



export default AuthProvider;