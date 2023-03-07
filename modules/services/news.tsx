import { newsType } from "@/components/news/components/newsCard"
import { keyable } from "@/types"
import { axiosInstance } from "@/utils/axios"
import { QueryFunctionContext } from "@tanstack/react-query"
import crypto from "crypto"



interface  newsServiceType {
    queries?:string | undefined
}

export const newsService = async ({queries=''}:newsServiceType & QueryFunctionContext<string[], any>) =>  {
        //  const params = {
        //     q:queries,
        //     topic:'news',
        //     page:'2',
        //     lang: 'en'
        // }//'topic=news&'+ queries
        
        const qq = `&pageSize=50` //&
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
        const  dataTob = data?.data?.articles.map((vl:newsType) => ({...vl, uid:  crypto.randomUUID() })) || []
        // console.log(dataTob)
        return dataTob
    


}

