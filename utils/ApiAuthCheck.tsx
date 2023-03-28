import { UserDetails } from "@/types";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";



const ApiAuthCheck = async (req:NextApiRequest & NextRequest, res:NextApiResponse & NextResponse) => {
    


    const supabaseServer = createServerSupabaseClient({ req, res });
    const {
      data:{session}
    } = await supabaseServer.auth.getSession();
    //console.log('subscribe api')
    //console.log(session)
    const access_token = session?.access_token;
    const refresh_token =session?.refresh_token;
    
    if (!(access_token && refresh_token)) {
        throw new AxiosError("User not Authorized.")
        
    }

    const userData:PostgrestSingleResponse<UserDetails> = await supabaseServer.from("users_profile")
                                        .select("*")
                                        .eq("id",session.user?.id)
                                        .single();
    
    if(!userData?.data){
        throw new AxiosError("User not Authorized.")
        
    }

    return {
        user:userData.data,
        session:session
    }

     


}

export default ApiAuthCheck;