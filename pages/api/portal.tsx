import { createServerSupabaseClient} from '@/lib/supabase'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import initStripe from 'stripe'


export default async (req:NextApiRequest & NextRequest, res:NextApiResponse & NextResponse) => {



      const supabaseServer = createServerSupabaseClient({ req, res });
      const {
        data:{session}
      } = await supabaseServer.auth.getSession();
 
      const access_token = session?.access_token;
      const refresh_token =session?.refresh_token;
      
      if (access_token && refresh_token) {
        try{
     
  

          const qData = await supabaseServer.from("users_profile")
                                                .select("stripe_customer")
                                                .eq("id",session.user?.id)
                                                .single();
            
          if( qData?.data?.stripe_customer && typeof qData?.data?.stripe_customer == 'string'){
            // // console.log('qData?.data?.stripe_customer')
            // // console.log(qData?.data?.stripe_customer)
            //@ts-ignore
            const stripe  = await initStripe(process.env.STRIPE_SECRET_KEY) 
  
            const stripeBillingSession = await stripe.billingPortal.sessions.create({
                customer: qData.data.stripe_customer,
                return_url: `${process.env.CLIENT_S_URL}/subscription`,

            })

          return  res.send({
                url:stripeBillingSession.url
            })
            
          }else{
            return res.status(401).send("User not Authorized")
          }
 

  
         

        }catch(er){
          //// console.log(er)
         return  res.status(401).send("User not Authorized.")
        }

      
      }

    return  res.status(401).send('Not Found')
}