import ApiAuthCheck from '@/utils/ApiAuthCheck'

import  { AxiosError } from 'axios'

import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'

import {  newsServiceApi } from '@/modules/services/news';
import { redis } from '@/lib/redis';
import { newsType } from '@/components/news/components/newsCard';
import { dummydata } from '@/utils/dummydata';
import { getCachedData, setCachedData } from '@/modules/services/redis';


type RequiredNotNull<T> = {
    [P in keyof T]: NonNullable<T[P]>
  }

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
        
        
        const datalist = []

        const cachedData =await  getCachedData()
        

         datalist.push(...cachedData)

         console.log('outside')
         console.log(datalist)

         if(datalist.length <= 0){
      
            console.log('getting new data')
            const newsResponse = dummydata

            await setCachedData(newsResponse)

            datalist.unshift(newsResponse)

            console.log('inside end')
        }
      

        // console.log(newsRedisget)

       return res.status(200).send(datalist);

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