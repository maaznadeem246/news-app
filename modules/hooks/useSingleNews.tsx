import { newsType } from "@/components/news/components/newsCard"
import { useRouter } from "next/dist/client/router"

import { useEffect, useState } from "react"
import { useGlobalState } from "./useGlobal"
import useNews from "./useNews"



type  useSingleNewsType = { 
    news:newsType, 
    open:boolean,
    handleClose:()=>void
}



const useSingleNews = ():useSingleNewsType=>{

    const router = useRouter()
    const {nid} = router.query
    // // console.log(nid)
    const {newsModal,handleNewsModalClose} = useGlobalState()

    const newsData = useNews()


    const [newState,setNewsState] = useState<newsType>({
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
            // // console.log(newsModal)
        if(newsData.data?.length > 0 && typeof newsModal == 'string'){
            
            const singleNewsData : newsType | null = newsData?.data.find((nv:newsType)=>{ 
                    // // console.log(nv.uid == newsModal)
                return nv?.uid == newsModal}) || null
            // // console.log(singleNewsData)
            if(singleNewsData){
                setNewsState((props)=>({
                    ...props,
                    ...singleNewsData,
                }))
            }

        }else{
            setNewsState((props)=>({
                ...props,
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
            }))
        }
    },[newsModal])

    


    const dataToSent ={
        news:newState,
        open:Boolean(newsModal),
        handleClose:handleNewsModalClose,
    }

    return dataToSent
}

export default useSingleNews