import ApiAuthCheck from '@/utils/ApiAuthCheck'

import  { AxiosError } from 'axios'

import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'

import {  newsServiceApi } from '@/modules/services/news';
import { redis } from '@/lib/redis';
import { newsType } from '@/components/news/components/newsCard';
import { dummydata } from '@/utils/dummydata';
import { getCachedData, setCachedData } from '@/modules/services/redis';




const defaultResNewsCount = 25

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
        
        
      

        const cachedData = await  getCachedData()
        
        const datalist = new Map([...cachedData])

         console.log('Got cached')
         console.log(datalist.size)


         // TODO --- add new data response to the cached data and send to the client -----------

        //  if(datalist.size < defaultResNewsCount){
      
        //     console.log('getting new data')
        //     const newsResponse = await newsServiceApi()


        //     await setCachedData(newsResponse)

        //     // const newList = new Map([])

        //     console.log('got new and saved in cache')
        // }
      

        console.log('sent Data')

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