import ApiAuthCheck from '@/utils/ApiAuthCheck'

import axios, { AxiosError } from 'axios'

import  { Readability } from'@mozilla/readability';
import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import {JSDOM} from "jsdom"
import { z } from 'zod'

const { htmlToText } = require('html-to-text');

export const articalContentDataSchema = z.object({
    url: z.string().url(),
});


type articalContentDataType = z.infer<typeof articalContentDataSchema>



export default async (req:NextApiRequest & NextRequest, res:NextApiResponse & NextResponse) => {
    try{


        const data = await  ApiAuthCheck(req,res);
        const {url} = req.body;
        const validateData = articalContentDataSchema.safeParse({url});
   

        if(!validateData.success){
            throw new Error('Not Valid Url');
        }
        
        const contentResponse = await axios.get(url);

        // const ch = await cheerio.load(contentResponse.data)
        // const contentResponse = await rp(url);
        
        let dom =   new JSDOM(contentResponse.data, {
            url: url,        
        });
    
        let content  =  new Readability(dom.window.document).parse();
  

       return res.status(200).send(content?.textContent || '');

    }catch(error){

        let message = 'Unknown Error';
        let code  = 401;
        if (error instanceof AxiosError){
                message = error.message
                code = Number(error?.status) || 401
            };
        
       return  res.status(code).send(message);
      
    }
    
}