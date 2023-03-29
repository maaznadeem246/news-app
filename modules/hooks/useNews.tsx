import {  useQuery, useQueryClient } from "@tanstack/react-query"
import { newsService } from "../services/news"
// import { useRouter } from "next/router"
import { useEffect, useRef } from "react"
// import { newsType } from "@/components/news/components/newsCard"








const useNews = (nprops?:{enabled?:boolean}) => {

    const getRef = useRef(0);


    // const queryClient = useQueryClient()

    // const oldNews:newsType[]|undefined = queryClient.getQueryData(['news'])

    const newsQ =  useQuery({
        queryKey:['news'],
        initialData:[],
        queryFn: (props) => newsService(props),
        staleTime:getRef.current,
        // enabled:true,
        // retryDelay:1000000,
        retry:2,
        // select:(data) => {
        //     const filterList = data.filter(((vl:newsType) => vl?.content != null)) 
        //     return filterList
        // }
        onSuccess:()=>{
            getRef.current = 1000000
        },
        // select:(data) => {
        //     if(oldNews){
        //         console.log(data.filter(vl =>{
        //             // console.log(vl)
        //             console.log(oldNews.findIndex((vl2 => vl2.title != vl.title)))
        //             return Boolean(oldNews.findIndex((vl2 => vl2.url != vl.url)))
        //         } ))
        //        }


        //     return data
        // },
    
         onError:(er)=>{
            console.log(er)

         }
    })

    

    return {
        // data:newsQ.data  
        ...newsQ 
    }
}

export default useNews;