import { useQuery } from "@tanstack/react-query"
import { newsContentService } from "../services/news"
import { articalContentDataType } from "@/pages/api/articalcontent"



const useArticalContent = ({url,publishedAt,enabled=true}:articalContentDataType&{enabled?:boolean}) => {
    console.log(enabled)
    return useQuery({
        queryKey:['news','content',url],
        queryFn: () => newsContentService({url,publishedAt}),
        enabled: enabled,
        retry:false,
        staleTime:10000000,
        retryDelay:10000000,
    })    

}

export default useArticalContent