import { createMiddlewareSupabaseClient, supabase } from '@/modules/supabase'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import initStripe from 'stripe'
import { parse } from 'cookie';


export default async (req:NextApiRequest & NextRequest, res:NextApiResponse & NextResponse) => {


      console.log('price')
      console.log(req.headers.cookie)

      const access_token = parse(req.headers.cookie || '')['my-access-token'];
      const refresh_token = parse(req.headers.cookie || '')['my-refresh-token'];
    
      if (access_token && refresh_token) {
        try{
          const {data,error} =  await supabase.auth.setSession({
            access_token: access_token,
            refresh_token: refresh_token,
           
          })

          if(error?.status || data.session == null){
            res.status(error?.status || 400).send("User not Authorized")
          }
          console.log(data)
  
          const qData = await supabase.
                                                from("users_profile")
                                                .select("stripe_customer")
                                                .eq("id",data.user?.id)
                                                .single();
  
             console.log('qData?.data?.stripe_customer 1')
 
             console.log(qData?.data?.stripe_customer)
     
          if(qData?.data?.stripe_customer){
            console.log('qData?.data?.stripe_customer 2')
            //@ts-ignore
            const stripe  = await initStripe(process.env.STRIPE_SECRET_KEY) 
  
            const {priceId} = req.query;
    
            const lineItems = [{
              price:priceId,
              quantity:1,
            }]
            console.log('qData?.data?.stripe_customer 4')
            const stripSession = await stripe.checkout.sessions.create({
              customer: qData?.data?.stripe_customer ,
              mode:'subscription',
              payment_method_types:['card'],
              line_items:lineItems,
              success_url:`${process.env.CLIENT_URL}/payment/success`,
              cancel_url: `${process.env.CLIENT_URL}payment/cancelled`
            })
            console.log('stripSession')
            console.log(stripSession)
            res.send({ 
              id:stripSession.id
            })
            
          }else{
            res.status(400).send("User not Authorized")
          }
 

  
         

        }catch(er){
          console.log(er)
          res.status(400).send("User not Authorized")
        }

      
      }

    return  res.status(401).send('Not Found')
}