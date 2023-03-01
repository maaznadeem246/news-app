

import { UserContext , useUser} from "@/modules/hooks/useUser";
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


const UserProvider : FC<ProviderType>  = ({children}) => {

    const data = useUser()

    // console.log(data)

  
     

    const ctxData = {
        ...data
    } 

    return <UserContext.Provider value={ctxData}>{children}</UserContext.Provider>
}



export default UserProvider;