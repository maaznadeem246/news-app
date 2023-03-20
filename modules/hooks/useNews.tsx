import {  useQuery } from "@tanstack/react-query"
import { newsService } from "../services/news"
import { keyable } from "@/types"
import { newsType } from "@/components/news/components/newsCard"







const useNews = () => {
    return useQuery({
        queryKey:['news'],
        initialData:[],
        queryFn: (props) => newsService(props),
        staleTime:1000000000,
        retryDelay:100000000,
        retry:2,
        // select:(data) => {
        //     const filterList = data.filter(((vl:newsType) => vl?.content != null)) 
        //     return filterList
        // } 
    })
}

export default useNews;