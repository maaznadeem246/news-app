import ApiAuthCheck from '@/utils/ApiAuthCheck'

import axios, { AxiosError } from 'axios'

import  { Readability } from'@mozilla/readability';
import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import {JSDOM} from "jsdom"
import { z } from 'zod'
import { updateCachedData } from '@/modules/services/redis';



export const articalContentDataSchema = z.object({
    url: z.string().url(),
    publishedAt:z.date().nullable(),
});


export type articalContentDataType = z.infer<typeof articalContentDataSchema>



export default async (req:NextApiRequest & NextRequest, res:NextApiResponse & NextResponse) => {
    try{


        await ApiAuthCheck(req,res);
        // console.log('in content')
        const {url,publishedAt} = req.body;
        const validateData = articalContentDataSchema.safeParse({url, publishedAt: publishedAt ? new Date(publishedAt) : null});
   

        if(!validateData.success){
            throw new AxiosError('Not Valid Data','400');
        }
        
        const contentResponse = await axios.get(url);


        
        let dom =   new JSDOM(contentResponse.data, {
            url: url,        
        });
    
        let content  =  new Readability(dom.window.document).parse();
  
        if(publishedAt && content?.textContent ){
            // here for this we should not wait to finish for returning response 
            updateCachedData({url,publishedAt,data:content?.textContent })
        }

        return res.status(200).send(content?.textContent || '');

    }catch(error){
        console.log(error)
        let message = 'Unknown Error';
        let code  = 401;
        if (error instanceof AxiosError ){
                message = error.message
                code = Number(error?.status) || 401
        };
        
        console.log('sending')
       return  res.status(code).send(message);
      
    }
    
}