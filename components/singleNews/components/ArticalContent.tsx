import { StyledDataHead, StyledDataText } from "@/components/styledComp";
import { newsType } from '@/components/news/components/newsCard';
import useArticalContent from "@/modules/hooks/useArticalContent";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";
import DOMPurify from "dompurify";
import { LoadingSkeleton } from "@/components/loadingSkeletons";









const ArticalContent  = ({news}:{news:newsType  }) => {

    const contentQuery = useArticalContent({url:news?.url || '' })

  
    
    // // console.log(contentQuery.data)

    return (
        <>
         <StyledDataHead
            sx={{
            width:'fit-content'
            }}
        >
            Content :
        </StyledDataHead>
        <StyledDataText
            sx={{
                marginTop:'1rem',
                '& > p,pre':{
                    whiteSpace: 'normal',
                }
            }}
        >
  
            {contentQuery.isLoading ? 
                <LoadingSkeleton skOption="one" />
            :
              news?.description  && 
            <ReactMarkdown 
                rehypePlugins={[rehypeRaw]}
            >
                { news?.content  ? DOMPurify.sanitize(contentQuery.data) : news?.content || ''}
            </ReactMarkdown>
        }
            
            
        </StyledDataText>
    </>
    )
}

export default ArticalContent;  