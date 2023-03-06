import { newsType } from "@/components/news/components/newsCard"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useNews from "./useNews"



type  useSingleNewsType = newsType



const useSingleNews = ():useSingleNewsType=>{

    const router = useRouter()
    const {nid} = router.query
    console.log(nid)
    

    const newsData = useNews()


    const [state,setState] = useState<newsType>({
        author: null,
        content: null,
        description: null,
        publishedAt:null,
        source:{
            id:null,
            name:null,    
        } ,
        title:null,
        uid:null,
        url:null,  
        urlToImage:null,
    })


    useEffect(()=>{
            console.log(newsData.data)
        if(newsData.data?.length > 0){
            
            const singleNewsData : newsType = newsData.data.find((nv:newsType) =>{  nv.uid == nid})
            console.log(singleNewsData)
            if(singleNewsData){
                setState((props)=>({
                    ...props,
                    ...singleNewsData,
                }))
            }else{
                router.push('/')
            }

        }
    },[newsData.data?.length])

    

    const dataToSent ={
        ...state
    }

    return dataToSent
}

export default useSingleNews