import {  useQuery } from "@tanstack/react-query"
import { newsService } from "../services/news"
import { keyable } from "@/types"
import { newsType } from "@/components/news/components/newsCard"







const useNews = () => {
    return useQuery({
        queryKey:['news'],
        queryFn: (props) => newsService(props),
        staleTime:1000000000,
        retryDelay:100000000,
        retry:2,
        select:(data) => {
            const listwithid = data.articles.map((vl:newsType) => ({...vl, uid:window.crypto.randomUUID() }))
            const filterList = listwithid.filter(((vl:newsType) => vl?.content != null)) 
            return filterList
        } 
    })
}

export default useNews;