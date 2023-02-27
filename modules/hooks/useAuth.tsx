import { useSession } from "@supabase/auth-helpers-react"
import { useEffect, useState } from "react"
import { supabase } from "../supabase"




const useAuth = () => {
    const user =  useSession()

    const [loggedUser,setLoggedUser] = useState<null|object>(null)
    useEffect(()=>{
        if(user){
            setLoggedUser(user) 
        }

    },[user])

    console.log(loggedUser)
    return loggedUser
}


export default  useAuth