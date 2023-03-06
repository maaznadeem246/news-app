import { keyable } from "@/types"
import { axiosInstance } from "@/utils/axios"
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
        const qq = `` //&
        const data = await axiosInstance.request({
            method:'GET',
            // url:`${process.env.NEXT_PUBLIC_NEWS_API_URL}/article-date/01-04-2021`,
            url:`${process.env.NEXT_PUBLIC_NEWS_API_URL}/top-headlines?language=en${qq}&apiKey=${ process.env.NEXT_PUBLIC_NEWS_API_KEY}`,

            // params:{...params},
            // headers: {

            //     'X-RapidAPI-Key': process.env.NEXT_PUBLIC_NEWS_API_KEY,
            //     'X-RapidAPI-Host': 'reuters-business-and-financial-news.p.rapidapi.com'
            //   }
        })
        //console.log(data)
        return data.data
    


}

