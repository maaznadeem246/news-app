import { keyable } from "@/types"
import { QueryFunctionContext } from "@tanstack/react-query"
import axios from "axios"



interface  newsServiceType {
    queries?:string | undefined
}

export const newsService = async ({queries=''}:newsServiceType & QueryFunctionContext<string[], any>) =>  {
         const params = {
            q:queries,
            topic:'news',
            page:'1',
            lang: 'en'
        }//'topic=news&'+ queries
        const data = await axios.request({
            method:'GET',
            url:`${process.env.NEXT_PUBLIC_NEWS_API_URL}/v2/search`,
            params:{...params},
            headers: {
                'x-api-key': process.env.NEXT_PUBLIC_NEWS_API_KEY
              }
        })
        console.log(data)
        return data
    


}

