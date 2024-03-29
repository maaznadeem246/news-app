import { createServerSupabaseClient} from '@/lib/supabase'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import initStripe from 'stripe'


export default async (req:NextApiRequest & NextRequest, res:NextApiResponse & NextResponse) => {


      // //// console.log('price')
      // //// console.log(req.headers.cookie)
      const supabaseServer = createServerSupabaseClient({ req, res });
      const {
        data:{session}
      } = await supabaseServer.auth.getSession();
      //// console.log('subscribe api')
      //// console.log(session)
      const access_token = session?.access_token;
      const refresh_token =session?.refresh_token;
      
      if (access_token && refresh_token) {
        try{
     
  

          const qData = await supabaseServer.from("users_profile")
                                                .select("stripe_customer")
                                                .eq("id",session.user?.id)
                                                .single();
  
             //// console.log('qData?.data?.stripe_customer 1')
 
             //// console.log(qData?.data?.stripe_customer)
     
          if(qData?.data?.stripe_customer){
            // //// console.log('qData?.data?.stripe_customer 2')
            //@ts-ignore
            const stripe  = await initStripe(process.env.STRIPE_SECRET_KEY) 
  
            const {priceId} = req.query;
    
            const lineItems = [{
              price:priceId,
              quantity:1,
            }]
            //// console.log('qData?.data?.stripe_customer 4')
            const stripSession = await stripe.checkout.sessions.create({
              customer: qData?.data?.stripe_customer ,
              mode:'subscription',
              payment_method_types:['card'],
              line_items:lineItems,
              success_url:`${process.env.CLIENT_S_URL}/payment/success`,
              cancel_url: `${process.env.CLIENT_S_URL}/payment/cancelled`
            })
            // //// console.log('stripSession')
            // //// console.log(stripSession)
           return res.send({ 
              id:stripSession.id
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