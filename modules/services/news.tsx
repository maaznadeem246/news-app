import { newsType } from "@/components/news/components/newsCard"
import { articalContentDataSchema, articalContentDataType } from "@/pages/api/articalcontent"
import { newSApirResDatatype } from "@/pages/api/news-api"
import { keyable } from "@/types"
import { axiosInstance } from "@/utils/axios"
import { QueryFunctionContext, useQueryClient } from "@tanstack/react-query"
import crypto from "crypto"



interface  newsServiceType {
    queries?:string | undefined
}



export const newsService = async ({pageParam=1}:newsServiceType & QueryFunctionContext<string[], any>) =>  {
    // try{

        const data:newSApirResDatatype = await newsServiceApi({pageParam})
        const  dataTob = data.data?.map((vl:newsType) => ({...vl, uid: typeof window !== "undefined" ? window.crypto.randomUUID() :   crypto.randomUUID()})) || []
        data['data'] = dataTob
        return  data
    

}


export const newsServiceApi = async ({pageParam}:{pageParam:number}) => {
     
        //-TODO- Add this to the axios inspector
        const token = localStorage.getItem('supabase-auth-token')

        const repsonseJson = await  axiosInstance.request({
            method:'GET',
            url:`/api/news-api?page=${pageParam}`,
            
            headers:{
                Authorization:`Bearer ${token}`
            }
    
        })
        return repsonseJson.data
    

}

export const newsContentService = async ({url,publishedAt}:articalContentDataType) => {

    const validateData = articalContentDataSchema.safeParse({url,publishedAt});
    // console.log(publishedAt)
    // console.log(validateData)
    if(!validateData.success){
        throw new Error('Not Valid Url')
    }

    let data = {
        "url":url,
    }

    if(publishedAt){
        data = Object.assign(data,{publishedAt})
    }

    const repsonseJson = await  axiosInstance.request({
        method:'POST',
        url:`/api/articalcontent`,
        data:data
    })
    // // console.log(repsonseJson)
    return repsonseJson.data
    

}


export const newsFetcherApi= async (props?:newsServiceType) :Promise<newsType[]> => {
    const defaultQueries =  `&pageSize=100`
    const qq = defaultQueries + props?.queries || ''
    const data = await axiosInstance.request({
        method:'GET',
        url:`${process.env.NEXT_PUBLIC_NEWS_API_URL}/top-headlines?language=en${qq}&apiKey=${ process.env.NEXT_PUBLIC_NEWS_API_KEY}`,
    })
    const resList = (data?.data?.articles || []).map((vl:newsType) => Object.assign({},{...vl, fullContent:null}) )
    // // console.log(resList)
    return resList
}




