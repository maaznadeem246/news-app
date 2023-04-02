import {  useQuery, useQueryClient } from "@tanstack/react-query"
import { newsService } from "../services/news"
// import { useRouter } from "next/router"
import { useEffect, useRef } from "react"
import { newsType } from "@/components/news/components/newsCard"








const useNews = (nprops?:{enabled?:boolean}) => {

    const getRef = useRef(0);


    // const queryClient = useQueryClient()

    // const oldNews:newsType[]|undefined = queryClient.getQueryData(['news'])

    const newsQ =  useQuery({
        queryKey:['news'],
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
        //     let dataTobe:newsType[] = []
        //     let dub = [...(data),
        //     //      {
        //     //     author: '',
        //     //     content: '',
        //     //     fullContent:'',
        //     //     description:'',
        //     //     publishedAt:new Date(),
        //     //     source:{
        //     //         id:'',
        //     //         name:'',    
        //     //     } ,
        //     //     title:'',
        //     //     uid:'',
        //     //     url:'testurl',  
        //     //     urlToImage:'',
        //     // }
        // ]
        //     if(oldNews){
        //         console.log('in')
        //         dataTobe = dub.filter(vl1 =>{
        //             console.log(!(oldNews.some((vl2) => vl1.url == vl2.url )))
                    
        //             return !(oldNews.some((vl2) => vl1.url == vl2.url ))
                    
        //         } )

        //        }


        //     console.log(oldNews)
        //     console.log(dub)


        //     return dataTobe
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