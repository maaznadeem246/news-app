import { supabase } from "@/modules/supabase";
import { NextApiRequest, NextApiResponse } from "next";


const handler = async(req:NextApiRequest,res:NextApiResponse) => {
     
    const{ event,session} = JSON.parse(req.body)
    // // console.log('session')
    // // console.log(session)

    if(session?.access_token){
        const user =  await supabase.auth.setSession({
            access_token:session.access_token,
            refresh_token:session.refresh_token
       })
       // console.log('user')
       // console.log(user)
    
        if(!user){
            return res.status(401).send('UnAuthorized')
        }
    }

    // console.log('set-supabase-cookie')
    res.send('user')
}

export default handler