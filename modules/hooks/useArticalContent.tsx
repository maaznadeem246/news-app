import { useQuery } from "@tanstack/react-query"
import { newsContentService } from "../services/news"



const useArticalContent = ({url}:{url:string}) => {

    return useQuery({
        queryKey:['news','content',url],
        queryFn: () => newsContentService({url}),
        enabled: Boolean(url),
        retry:false,
        staleTime:10000000,
        retryDelay:10000000,
    })    

}

export default useArticalContent