import ApiAuthCheck from '@/utils/ApiAuthCheck'

import  { AxiosError } from 'axios'

import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'

import { getCachedData, setCachedData } from '@/modules/services/redis';
import { newsFetcherApi } from '@/modules/services/news';
import { newsType } from '@/components/news/components/newsCard';





const defaultResNewsCount = 20
const defaultPage = 1
const defaultLimit = 20
const defaulPageSize = 20


const sortDatawithDates = (data:newsType[]) => {
    let copyData = [...data].map( (vl:newsType)=> ({...vl, publishedAt: vl?.publishedAt ?  new Date(vl?.publishedAt ) : 0 }));
    return copyData.sort(
        (d1, d2) => Number(d2.publishedAt) - Number(d1.publishedAt),
      ).map(vll => Object.assign({},{...vll,publishedAt: vll?.publishedAt ? new Date(vll.publishedAt) : null}));
}



export type newSApirResDatatype<T={page:number,limit:number}> = {
    next:T | null;
    previous:T | null;
    data: newsType[] | [];
    total:number;
    totalPages:number;
}

const paginatedData = (page:number,limit:number,orgData:newsType[]) => {

    console.log(orgData.length)
    // calculating the starting and ending index
    const totalPages = orgData.length / defaulPageSize;     
    if(page > totalPages){
        page = 1
    }
    const startIndex = (page - 1) * limit ;
    const endIndex = page * limit;
 
    const results:newSApirResDatatype = {next:null,previous:null,data:[],total:orgData.length,totalPages};
    if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit
        };
      }
      
    if (endIndex < orgData.length) {
        
      results.next = {
        page: page + 1,
        limit: limit
      };
    }
 

 
    results.data = orgData.slice(startIndex, endIndex);
    return results

}



export default async (req:NextApiRequest & NextRequest, res:NextApiResponse & NextResponse) => {
    try{


        await  ApiAuthCheck(req,res);
        // const {url} = req.body;
        // const validateData = newsQuerySchema.safeParse({url});
        console.log(req.query)
        const page = req.query?.page &&  typeof  req.query?.page == 'string'  ? parseInt(req.query?.page) : defaultPage;
        const limit = req.query?.limit &&  typeof  req.query?.limit == 'string'? parseInt(req.query?.limit) : defaultLimit ;

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

         if(cachedObjLenth <= defaultResNewsCount){
      
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

        // console.log(dataTobe)
        // .map((vl:string) => JSON.parse(vl))  
        let sortedData = sortDatawithDates(dataTobe)


         const paginatedDataTobe = paginatedData(page,limit,sortedData)
         
        console.log({...paginatedDataTobe, data:paginatedDataTobe.data.length})
         

       return res.status(200).send(paginatedDataTobe);

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