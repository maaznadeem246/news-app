import { newsType } from "@/components/news/components/newsCard";
import { redis } from "@/lib/redis";

import { format, toDate } from 'date-fns'

interface getCachedDataType {
    start?:number,
    end?:number,
}


const formatedDate = (d:string|Date) => format(( toDate( new Date(d) )),'MM-dd-yyyy').toString()

export const getCachedData = async (props?:getCachedDataType) => {


    const redisData :  Array<Record<string, string>> = []

        // const startIndex = props?.start;
        // const endIndex = props?.end 
     
        const newsRedisgetall=  await redis.hgetall(`newslist-${formatedDate(new Date())}`);

        Object.keys(newsRedisgetall).forEach(key => redisData.push({
        ...JSON.parse(newsRedisgetall[key])
        }));   
        
        // if( startIndex && endIndex &&  startIndex<endIndex ){
        //     return redisData.slice(startIndex , endIndex );
        // }

        return redisData

  
}





 
export const setCachedData = async (data:newsType[]) => {

    const todayDate =  format(new Date(),'MM-dd-yyyy')

    const dataWithDates =  new Map();
    
    data.forEach((v:newsType) => {
     
            let d = formatedDate(v?.publishedAt||  todayDate)
            let nv = { [v?.url||'unknown'] : JSON.stringify(v)}
            let objectData = {...nv,...dataWithDates.get(d)}
            dataWithDates.set(d , objectData ) //,
        }
    );   

 

    const newsObject = Object.fromEntries(dataWithDates)
    // console.log(newsResponseobjects)
    // console.log(newsObject)
    const promisesList:Promise<"OK">[] = []

    Object.keys(newsObject).forEach(key => {
        promisesList.push(  redis.hmset(`newslist-${key}`,newsObject[key]) )
    });   
 
    // console.log(promisesList)

    const dataPromises =  await Promise.all(promisesList)

    console.log(dataPromises)

    if(dataPromises.every((v)=> v=='OK')){
        console.error("Redis adding Error")
    }
}
