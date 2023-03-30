import { StyledDataHead, StyledDataText } from "@/components/styledComp";
import { newsType } from '@/components/news/components/newsCard';
import useArticalContent from "@/modules/hooks/useArticalContent";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";
import DOMPurify from "dompurify";
import { LoadingSkeleton } from "@/components/loadingSkeletons";
import { memo } from "react";









const ArticalContent  = memo(({news}:{news:newsType  }) => {

    const contentQuery = useArticalContent({
            url:news?.url || '',publishedAt: 
            news?.publishedAt ? new Date(news?.publishedAt) : null,
            enabled:Boolean(news?.url && !news?.fullContent)
        })

  
    
    // // console.log(contentQuery.data)

    return (
        <>
         <StyledDataHead
            sx={{
            width:'fit-content'
            }}
        >
            News Artical :
        </StyledDataHead>
        <StyledDataText
            sx={{
                marginTop:'1rem',
                '& > p,pre':{
                    whiteSpace: 'normal',
                }
            }}
        >
  
            {!news?.fullContent && contentQuery.isFetching? 
                <LoadingSkeleton skOption="custom" skprops={{sx:{width:['100%','100%','100%'],margin:'auto',aspectRatio:['1/0.6','1/0.45','1/0.35'], transform:'scale(1)' }}} />
            :
             
            <ReactMarkdown 
                rehypePlugins={[rehypeRaw]}
            >
                { !news?.fullContent  ? DOMPurify.sanitize(contentQuery.data) : DOMPurify.sanitize(news?.fullContent) ||  news?.content || 'News will be available Soon'}
            </ReactMarkdown>
            
        }
            
            
        </StyledDataText>
    </>
    )
})

export default ArticalContent;  