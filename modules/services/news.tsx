import { keyable } from "@/types"
import axios from "axios"



interface  subscriptionServiceType {
    queries:string
}

export const subscriptionService = async ({queries=""}:subscriptionServiceType) =>  {
    try{
        const qr = 'topic=news&'+ queries
        const data = await axios.request({
            method:'GET',
            url:`${process.env.NEXT_PUBLIC_NEWS_API_URL}/v2/search?${qr}`,
            headers: {
                'x-api-key': process.env.NEXT_PUBLIC_NEWS_API_KEY
              }
        })
        console.log(data)
        return data
    }
    catch(er){
        console.log(er)
      
    }


}

