import { newsType } from "@/components/news/components/newsCard"
import { articalContentDataSchema } from "@/pages/api/articalcontent"
import { keyable } from "@/types"
import { axiosInstance } from "@/utils/axios"
import { QueryFunctionContext, useQueryClient } from "@tanstack/react-query"
import crypto from "crypto"



interface  newsServiceType {
    queries?:string | undefined
}

export const newsService = async (props:newsServiceType & QueryFunctionContext<string[], any>) =>  {
    // try{

        const data:newsType[] = await newsServiceApi()
        const  dataTob = data?.map((vl:newsType) => ({...vl, uid: typeof window !== "undefined" ? window.crypto.randomUUID() :   crypto.randomUUID()})) || []
        return dataTob
    

}


export const newsServiceApi = async () => {
    // const validateData = articalContentDataSchema.safeParse({url});
    // // // console.log(url)
    // // // console.log(validateData)
    // if(!validateData.success){
    //     throw new Error('Not Valid Url')
    // }
  
        const token = localStorage.getItem('supabase-auth-token')
        const repsonseJson = await  axiosInstance.request({
            method:'GET',
            url:`/api/news-api`,
        
            headers:{
                Authorization:`Bearer ${token}`
            }
            // data:{
            //     "url":url
            // }
        })
        // console.log(repsonseJson)
        return repsonseJson.data
    

}

export const newsContentService = async ({url}:{url:string}) => {

    const validateData = articalContentDataSchema.safeParse({url});
    // // console.log(url)
    // // console.log(validateData)
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
    // // console.log(repsonseJson)
    return repsonseJson.data
    

}


export const newsFetcherApi= async (props?:newsServiceType) :Promise<newsType[]> => {
    const defaultQueries =  `&pageSize=50`
    const qq = defaultQueries + props?.queries || ''
    const data = await axiosInstance.request({
        method:'GET',
        url:`${process.env.NEXT_PUBLIC_NEWS_API_URL}/top-headlines?language=en${qq}&apiKey=${ process.env.NEXT_PUBLIC_NEWS_API_KEY}`,
    })
    const resList = (data?.data?.articles || []).map((vl:newsType) => Object.assign({},{...vl, fullContent:null}) )
    // // console.log(resList)
    return resList
}




