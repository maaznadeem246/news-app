import ApiAuthCheck from '@/utils/ApiAuthCheck'

import  { AxiosError } from 'axios'

import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'

import { getCachedData, setCachedData } from '@/modules/services/redis';
import { newsFetcherApi } from '@/modules/services/news';





const defaultResNewsCount = 1

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
        // await  redis.connect()
        // console.log('in news')
      

        const cachedData = await  getCachedData()
        
        let cachedObj = new Map([...cachedData])

         // console.log('Got cached')
         let cachedObjLenth = 0

        for (let objvl of Object.values(Object.fromEntries(cachedObj))){
            if(objvl) {
                cachedObjLenth += (Object.values(objvl)).length 
            }
        } 

        let newObj = new Map()
        // // console.log(cachedObjLenth)

         if(cachedObjLenth < defaultResNewsCount){
      
            // console.log('getting new data')
            const newsResponse = await newsFetcherApi()
            const newRes =  await setCachedData(newsResponse)
            const cachedKeys = new Set([...cachedData.keys()]) 
            const newKeys = new Set([...newRes.keys()]);
            const finalKeys = new Set([...cachedKeys,...newKeys])
    
 
            // // console.log(finalKeys)
        
            
            finalKeys.forEach(vl => {
                newObj.set(vl,{...newObj.get(vl),...cachedData.get(vl), ...newRes.get(vl)})
  
            })

            // // console.log(newObj)
            // cachedObj = new Map([...cachedData,...newRes])

            // console.log('got new and saved in cache')
        }

        let finalObj = new Map([...cachedObj, ...newObj])
        const convertedObj:object = Object.fromEntries(finalObj)
        

        // convert the data in to right formate
        const dataTobe =  Object.values( await (Object.values(convertedObj)).reduce((prev,curr) => Object.assign({},{...prev,...curr}))).map((vl) => {if(typeof vl == 'string') return  JSON.parse(vl)}).reverse()

        // // console.log(dataTobe)
        // .map((vl:string) => JSON.parse(vl))  
       
       return res.status(200).send(dataTobe);

    }catch(error){

        // console.log(' in error')
        // console.log(error)
        let message = 'Unknown Error';
        let code  = 401;
        if (error instanceof AxiosError){
                message = error.message
                code = Number(error?.status) || 401
            };
        
       return  res.status(code).send(message);
      
    }
    
}