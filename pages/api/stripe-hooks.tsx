import { NextApiRequest, NextApiResponse } from "next";
import initStripe from "stripe"
import {buffer} from 'micro';
import { createServerSupabaseClient,  } from "@/lib/supabase";




const handler = async (req:NextApiRequest,res:NextApiResponse) => {
    // //// console.log('stripe-hook1')
    //@ts-ignore
    const stripe = initStripe(process.env.STRIPE_SECRET_KEY)
    const signature = req.headers['stripe-signature']
    const signingSecret = process.env.STRIPE_SIGNING_SECRET
    const reqBuffer = await buffer(req)
    // //// console.log('stripe-hook2')

    const supabase = createServerSupabaseClient({ req, res }, { 
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey: process.env.SUPABASE_SERVICE_KEY,
    });
    
   
    let event ;
    try{    
       
        // //// console.log('stripe-hook3')
        event = await stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret)
        // //// console.log('in ev')
    }catch(error){
        // //// console.log('in er')
        // //// console.log(error)
        let message = 'Unknown Error'
        if (error instanceof Error) message = error.message

        return res.status(401).send(`webhook error: ${message}`)
    }


  
    switch (event.type){
        case "customer.subscription.updated":
            await supabase.from("users_profile")
                    .update({
                        is_subscribed:true,
                        interval:event?.data?.object?.items?.data[0]?.plan?.interval || null
                    }).eq('stripe_customer',event.data.object.customer)
            break;
        case 'customer.subscription.deleted':
            await supabase.from("users_profile")
            .update({
                is_subscribed:false,
                interval:null,
            }).eq('stripe_customer',event.data.object.customer)
            break;    
    }

    // //// console.log("{event}")
    // //// console.log(event)
    res.send({received:true})
}

export const config = { api: { bodyParser: false } };

export default handler;