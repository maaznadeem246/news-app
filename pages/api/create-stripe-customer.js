
import { supabase } from '@/modules/supabase'
import initStripe from 'stripe'

export default async (req, res) => {
       if (req.method === 'POST') {
              // Process a POST request
              console.log(req.body)
              if(req.query.API_ROUTER_SECRET !== process.env.API_ROUTER_SECRET){
                     return res.status(401).send('You are not authorized to call this api')
              }
              const stripe  = await initStripe(process.env.STRIPE_SECRET_KEY) 
              
              if(req.body?.record?.email){
                     const customer = await stripe.customers.create({
                            email:req.body?.record?.email || '',
                     })
                     console.log(customer)
                     if(customer?.id && req.body?.record?.id){
                            await supabase.from("users")
                            .update({
                            stripe_customer:customer.id
                            })
                            .eq("id",req.body.record.id)              
                     }
                 
                     return res.send({message:`stripe customer created: ${customer.id}`})
                    
              }else{
                
                     return res.status(401).send('Email is not Provided')
              }

              }
       


             return  res.status(401).send('Not Found')



}