import { newsType } from "@/components/news/components/newsCard";
import { redis } from "@/lib/redis";
import { keyable } from "@/types";

import { format, toDate } from 'date-fns'
import { object, z } from "zod";



const getCachedDataSchema = z.object({
    start:z.number().optional(),
    end:z.number().optional(),
    date:z.date().optional(),
})

type getCachedDataType  = z.infer<typeof getCachedDataSchema>


const formatedDate = (d:string|Date) => format(( toDate( new Date(d) )),'MM-dd-yyyy').toString()


export const getCachedData = async (props?:getCachedDataType) => {





    

        const  validate = getCachedDataSchema.safeParse(props)

        const datetobeused =( props && props?.date && validate.success ) ? formatedDate(props.date) : formatedDate(new Date())
        // console.log(datetobeused)
  

        const hashkeys = await redis.keys(`news-*`)
        // console.log('hashkeys')
        // console.log(hashkeys)
        const getAllList = hashkeys.map((hv => ['hgetall',hv]))
        const newsRedisgetall = await redis.pipeline(getAllList).exec();
        // console.log(newsRedisgetall)
        let dataValuse = new Map()
        let inc = 0
        newsRedisgetall?.forEach((vl:[error: Error | null, result: unknown| ReturnType<typeof Object>])=>{
            // dataValuse = { [hashkeys[inc]]: vl[1] }
            // inc++;
            // console.log('-------------------------------')
            // console.log(vl[1])

            // console.log(dataValuse.get(hashkeys[inc]) )
            // console.log('---------------------------------')
            if(typeof vl[1] == 'object' && vl[1] && Object.keys(vl[1]).length  > 0){
                // console.log('--------------------------------- in')
                // console.log('vl[1]')
                // console.log(vl[1])
                dataValuse.set(hashkeys[inc],{...vl[1]})
            }
            inc += 1 
        })
        // console.log("dataValuse")
        // console.log(dataValuse)
   
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
        //     console.log("Stream End");
        //   });

        // Object.keys(newsRedisgetall[1]).forEach(key => redisData.push({
        // ...JSON.parse(newsRedisgetall[key])
        // }));   
        
       
        // console.log(dataValuse)  
        return dataValuse

  
}





 
export const setCachedData = async (data:newsType[]) => {

    const todayDate =  format(new Date(),'MM-dd-yyyy')

    const dataWithDates =  new Map();
    
    data.forEach((v:newsType) => {
     
            let d = formatedDate(v?.publishedAt||  todayDate)
            let nv = { [v?.url||'unknown'] : JSON.stringify(v)}
            let objectData = {...nv,...dataWithDates.get(d)}
            dataWithDates.set(`news-${d}` , objectData ) //,
        }
    );   

    const newsObject = Object.fromEntries(dataWithDates)
  

    const listtoExc:Array<Array<string>> = [];
     Object.keys(newsObject).forEach(key => {
        listtoExc.push(['hmset',key,newsObject[key]] )
    });
     
    const saveresponse =  await redis.pipeline(listtoExc).exec()

    // console.log(saveresponse)
   
    return dataWithDates
}
