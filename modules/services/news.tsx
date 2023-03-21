import { newsType } from "@/components/news/components/newsCard"
import { articalContentDataSchema } from "@/pages/api/articalcontent"
import { keyable } from "@/types"
import { axiosInstance } from "@/utils/axios"
import { QueryFunctionContext } from "@tanstack/react-query"
import crypto from "crypto"



interface  newsServiceType {
    queries?:string | undefined
}

export const newsService = async (props:newsServiceType & QueryFunctionContext<string[], any>) =>  {
    
        const data = await newsServiceApi(props)
        const  dataTob = data?.data?.articles.map((vl:newsType) => ({...vl, uid: typeof window !== "undefined" ? window.crypto.randomUUID() :   crypto.randomUUID()})) || []
        return dataTob


}

export const newsServiceApi= async (props?:newsServiceType)  => {
    const defaultQueries =  `&pageSize=30`
    const qq = defaultQueries + props?.queries || ''
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
  
    // console.log(dataTob)
    return data?.data?.articles || []
}


export const newsContentService = async ({url}:{url:string}) => {

    const validateData = articalContentDataSchema.safeParse({url});
    // console.log(url)
    // console.log(validateData)
    if(!validateData.success){
        throw new Error('Not Valid Url')
    }

    const repsonseJson = await  axiosInstance.request({
        method:'POST',
        url:`/api/articalcontent`,
        data:{
            "url":url
        }
    })
    // console.log(repsonseJson)
    return repsonseJson.data
    

}

