import { useSession } from "@supabase/auth-helpers-react"
import { useEffect, useState } from "react"
import { supabase } from "../supabase"


type sesstionType = {
    data:object | null,
    loading:boolean
}

const useAuth = () => {
    const [sessionState, setSession] = useState<sesstionType>({
        data:null,
        loading:true
    })
    
  
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
          console.log(session)
          setSession({
            data:session,
            loading:false,
          })
        })
    
        supabase.auth.onAuthStateChange((_event, session) => {
          console.log(session)
          setSession({
            data:session,
            loading:false,
          })
        })
      }, [])


    return sessionState
}


export default  useAuth