import {  useQuery } from "@tanstack/react-query"
import { newsService } from "../services/news"







const useNews = () => {
    return useQuery({
        queryKey:['news'],
        queryFn: (props) => newsService(props),
        staleTime:1100,
        retry:2,
        
    })
}

export default useNews;