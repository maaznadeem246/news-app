import { newsType } from "@/components/news/components/newsCard";
import { redis } from "@/lib/redis";
import { articalContentDataType } from "@/pages/api/articalcontent";
import { keyable } from "@/types";

import { format, toDate } from 'date-fns'
import { object, z } from "zod";

const dateSchema = z.date()


const getCachedDataSchema = z.object({
    start:z.number().optional(),
    end:z.number().optional(),
    date:z.date().optional(),
})

type getCachedDataType  = z.infer<typeof getCachedDataSchema>

type updateCachedDataType = articalContentDataType & {data:string}

const formatedDate = (d:string|Date) => format(( toDate( new Date(d) )),'MM-dd-yyyy').toString()


export const getCachedData = async (props?:getCachedDataType) => {
   
        
        // const  validate = getCachedDataSchema.safeParse(props)

        // const datetobeused =( props && props?.date && validate.success ) ? formatedDate(props.date) : formatedDate(new Date())
        // // console.log(datetobeused)
  

        const hashkeys = await redis.keys(`news-*`)
        // // console.log('hashkeys')
        // // console.log(hashkeys)
        const getAllList = hashkeys.map(((hv:string) => ['hgetall',hv]))
        const newsRedisgetall = await redis.pipeline(getAllList).exec();
        // // console.log(newsRedisgetall)
        let dataValuse = new Map()
        let inc = 0
        newsRedisgetall?.forEach((vl:[error: Error | null, result: unknown| ReturnType<typeof Object>])=>{
            // dataValuse = { [hashkeys[inc]]: vl[1] }
            // inc++;
            // // console.log('-------------------------------')
            // // console.log(vl[1])

            // // console.log(dataValuse.get(hashkeys[inc]) )
            // // console.log('---------------------------------')
            if(typeof vl[1] == 'object' && vl[1] && Object.keys(vl[1]).length  > 0){
                // // console.log('--------------------------------- in')
                // // console.log('vl[1]')
                // // console.log(vl[1])
                dataValuse.set(hashkeys[inc],{...vl[1]})
            }
            inc += 1 
        })
        // // console.log("dataValuse")
        // // console.log(dataValuse)
   
        // const newsRedisgetall = await redis.hgetall(`news-${datetobeused}`);
        // const redisScan = await redis.scanStream({
        //     match:'news-*',
        //     type:'hash',
        // }); 

        //     redisScan.on("data", (resultKeys) => {
        //     // Pause the stream from scanning more keys until we've migrated the current keys.
            
            
        //     return resultKeys
            
        //   });
          
        //   redisScan.on("end", () => {
        //     // console.log("Stream End");
        //   });

        // Object.keys(newsRedisgetall[1]).forEach(key => redisData.push({
        // ...JSON.parse(newsRedisgetall[key])
        // }));   
        
       
        // // console.log(dataValuse)  
        return dataValuse

  
}





 
export const setCachedData = async (data:newsType[]) => {

    const todayDate =  format(new Date(),'MM-dd-yyyy')

    const dataWithDates =  new Map();
    // // console.log('ins set cache')
    data.forEach((v:newsType) => {
     
            let d = formatedDate(v?.publishedAt||  todayDate)
            let nv = { [v?.url||'unknown'] : JSON.stringify(v)}
            let datawithdteatobe = dataWithDates.get(`news-${d}`) || {}
            // // console.log('...dataWithDates.get(d)')
            // // console.log(datawithdteatobe)
            let objectData = {...nv,...datawithdteatobe}

            // // console.log('d')
            // // console.log(d)

            // // console.log('objectData')
            // // console.log(objectData)
            dataWithDates.set(`news-${d}` , objectData ) //,
        }
    );   

    const newsObject = Object.fromEntries(dataWithDates)
  

    const listtoExc:Array<Array<string|number>> = [];
     Object.keys(newsObject).forEach(key => {
        listtoExc.push(['hmset',key,newsObject[key]] )
        listtoExc.push(['expire',key, 1 * 24 * 60 * 60] )
    });
     
    const saveresponse =  await redis.pipeline(listtoExc).exec()
    
    // // console.log(saveresponse)
   
    return dataWithDates
}




export const updateCachedData = async({url,publishedAt,data}:updateCachedDataType) => {
    // console.log('in updated cachedData')
    try{

        // console.log({url,publishedAt})
        const validateDate = dateSchema.safeParse(publishedAt ? new Date(publishedAt) : '')
        // console.log(validateDate)
        if(validateDate.success && publishedAt != null){
            
            let formateddate =  format(new Date(publishedAt),'MM-dd-yyyy')
            const getData = await redis.hget(`news-${formateddate}`,url)
            const parsedData:newsType = await JSON.parse(getData)
            const newData = {...parsedData, fullContent:data}
            const newDataStringify = await JSON.stringify(newData)
            const updatedData = await redis.hset(`news-${formateddate}`,url, newDataStringify)

            // console.log(updatedData)

        }

    }catch(error){
        console.log(error)
    }

        // console.log('out updated cachedData ')
}