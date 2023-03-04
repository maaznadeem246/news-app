import { GetServerSidePropsContext } from "next";
import {parse} from 'cookie'
import { supabase } from "@/modules/supabase";


const getUserByCookie = async (ctx:GetServerSidePropsContext) => {
    // // console.log(ctx.req)
    let cookie = parse(ctx?.req?.headers?.cookie || ''); ;
    
    const accessToken  = cookie['my-access-token']
  const  refreshToken = cookie['my-refresh-token']


  if (refreshToken && accessToken) {
  
    // console.log('fdfdf')
    
   const {data} =  await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
     
    })
    // console.log(data)

    if(data?.session != null){
      return data;
    }else{
      return  null
    }


    }

    return  null
}


export default getUserByCookie;