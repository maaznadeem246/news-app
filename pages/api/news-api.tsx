import ApiAuthCheck from '@/utils/ApiAuthCheck'

import  { AxiosError } from 'axios'

import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'

import {  newsServiceApi } from '@/modules/services/news';


// export const newsQuerySchema = z.object({
//     country:z.string().optional(),
//     category:z.string().optional(),
//     q:z.string().optional(),
//     pageSize:z.number().optional(),
//     page:z.number().optional(),
// });






export default async (req:NextApiRequest & NextRequest, res:NextApiResponse & NextResponse) => {
    try{


        await  ApiAuthCheck(req,res);
        // const {url} = req.body;
        // const validateData = newsQuerySchema.safeParse({url});
   

        // if(!validateData.success){
        //     throw new Error('Not Valid Url');
        // }
        
        const newsResponse = await newsServiceApi();
  
        // console.log(newsResponse)

       return res.status(200).send(newsResponse);

    }catch(error){
        console.log(error)
        let message = 'Unknown Error';
        let code  = 400;
        if (error instanceof AxiosError){
                message = error.message
                code = Number(error?.status) || 400
            };
        
       return  res.status(code).send(message);
      
    }
    
}