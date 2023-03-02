
import { createMiddlewareSupabaseClient, supabase } from '@/modules/supabase'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import initStripe from 'stripe'

export default async (req:NextApiRequest, res:NextApiResponse) => {

       // console.log(req)
       // const access_token = parse(req.headers.get('cookie') || '')['my-access-token'];
       // const refresh_token = parse(req.headers.get('cookie') || '')['my-refresh-token'];
      
       // if (access_token && refresh_token) {
       //        const data =  await supabase.auth.setSession({
       //               access_token: access_token,
       //               refresh_token: refresh_token,
                    
       //             })
       //             console.log('data wq')
       //             console.log(data)


       //        // return res.status(401).send('User Is not Authenticated')
      
       if (req.method === 'POST') {
              // Process a POST request


              // console.log(req.body)
              if(req.query.API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET){
                     return res.status(401).send('You are not authorized to call this api')
              }
              //@ts-ignore
              const stripe  = await initStripe(process.env.STRIPE_SECRET_KEY) 
              
              if(req.body?.record?.email){
                     const customer = await stripe.customers.create({
                            email:req.body?.record?.email || '',
                            
                     })
                     // console.log('customer')
                     // console.log(customer)
                     if(customer?.id && req.body?.record?.id){
                           
                            try{                      
                                   
                         const dff =  await supabase.from("users_profile")
                            .update({
                                   stripe_customer:customer.id
                            })
                            .eq("id",req.body.record.id).single()    
                     //        console.log('dff')
                     //      console.log(dff)
                            }catch(er){

                                   console.log(er)     
                                   return res.status(400).send('Not Authorized')     
                            }

                     }
                 
                     return res.send({message:`stripe customer created: ${customer.id}`})
                    
              }else{
                
                     return res.status(401).send('Email is not Provided')
              }

              }
       
       


             return  res.status(401).send('Not Found')



}