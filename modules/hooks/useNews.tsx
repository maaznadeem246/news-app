import {  useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query"
import { newsService } from "../services/news"
// import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { newsType } from "@/components/news/components/newsCard"
import { useInView } from "react-intersection-observer"
import { useGlobalState } from "./useGlobal"








const useNews = (nprops?:{enabled?:boolean}) => {

    const getRef = useRef(0);
    const {activeTag} = useGlobalState()

    const {ref , inView} = useInView()
    const [showNoMore,setShowNoMore] = useState(false)
    // const queryClient = useQueryClient()

    // const oldNews:newsType[]|undefined = queryClient.getQueryData(['news'])
   

    const newsQ =  useInfiniteQuery({
        queryKey:['news'],
        queryFn: (props) => newsService(props),
        staleTime:getRef.current,
        getNextPageParam: (pageD, pages) => pageD.next?.page ?? undefined,
        retry:2,
        // select:(data) => {
        //     const filterList = data.filter(((vl:newsType) => vl?.content != null)) 
        //     return filterList
        // }
        onSuccess:()=>{
            getRef.current = 1000000
        },
    
         onError:(er)=>{
            console.log(er)

         }
    })

    useEffect(()=>{
        if(!newsQ.hasNextPage && (!newsQ.isInitialLoading && !newsQ.isFetchingNextPage )){
            setShowNoMore(true)
        }
    },[ newsQ.hasNextPage, newsQ.isInitialLoading, newsQ.isFetchingNextPage  ])

    // useEffect(()=>{
    //     if((activeTag).toLowerCase() != 'latest news' && showNoMore){
    //         console.log('in shonowmore false')
    //         setShowNoMore(false)
    //     }
    // },[activeTag])
    
    useEffect(() => {
        if (inView && !newsQ.isInitialLoading) {
            console.log('fetchmore')
            newsQ.fetchNextPage()
        }
      }, [inView])

    return {
        // data:newsQ.data  
        ...newsQ ,
        inViewRef : ref,
        showNoMore,
        activeTag,
    }
}

export default useNews;