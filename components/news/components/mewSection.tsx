import { Box, Grid } from "@mui/material";
import NewsCard, { newsType } from "./newsCard";
import useNews from "@/modules/hooks/useNews";
import Heading from "@/components/headings";
import { useGlobalState } from "@/modules/hooks/useGlobal";
import { useQueryClient } from "@tanstack/react-query";
import { Fragment, ReactNode, Ref, memo } from "react";
import { LoadingSkeleton } from "@/components/loadingSkeletons";
import { newSApirResDatatype } from "@/pages/api/news-api";
import CustomButton from "@/components/inputs/customButton";



const NewsHeading = memo(({activeTag,loading}:{activeTag:string,loading:boolean})=>{
return(
    <Box 
    sx={{
        display:'flex',
        justifyContent:'center',
        marginTop:['2.5rem','3rem','3rem'],
        marginBottom:['1.5rem','3rem','3rem'],
    }}
>
    {
        loading ?
            <Box width={['95vw','60vw','40vw']}>
                <LoadingSkeleton skOption="three" />
            </Box>

        :
        <Heading
            variant="h3"
            headingStyle={true}
            sx={{
                textTransform:'capitalize'
            }}
        >
          {activeTag}
        </Heading>
    }

</Box>
)
})


type allNewsComptype = {
        newsPagesData:newSApirResDatatype[];
        intialLoading:boolean, 
        fetchMore:() => void;
        fetchingNextPage:boolean;
        hasNextPage:boolean;
        showNoMore:boolean;
        fetchMoreRef: (node?: Element | null | undefined) => void,
        isMainTag:boolean;
    }

const AllNews = memo(({newsPagesData,intialLoading,showNoMore,isMainTag,fetchMoreRef,fetchingNextPage,hasNextPage}:allNewsComptype)=>{
    // console.log('list')
    return(
    <Grid container spacing={1} padding={['20px','0px','0px',]} marginBottom={'20px'} justifyContent={'center'}>
            {
              !intialLoading &&  newsPagesData.map((pval:newSApirResDatatype,ind:number) => {
                
                    return (
                        <Fragment key={`news-page-sec-${ind}`}>
                            { pval.data.map((val:newsType)=>{
                                    return (
                                        <Grid key={`newskey-${ind}-${val.uid}`} item xs={12} sm={6} md={6} lg={4} alignContent={'center'}   >
                                                <NewsCard {...val}/>
                                        </Grid>
                                    )
                                })}
                        </Fragment>
                    )

                })
            }
            {
                (intialLoading || fetchingNextPage || (hasNextPage) ) && isMainTag  && [...Array(6)].map((v:number,ind:number) => {
                    
                    return (
                        <Grid  key={`newskey-loading-${ind}`} item xs={12} sm={6} md={6} lg={4} alignContent={'center'}   >
                            <Box ref={ind == 0 && !intialLoading && !fetchingNextPage? fetchMoreRef : null } sx={{width:'inherit', height:'inherit'}}>
                                <LoadingSkeleton  skOption="four" />
                            </Box>
                        </Grid>
                    )
                })
            }
                { showNoMore &&  isMainTag && <Grid key={`newskey-loadnewsec`} item xs={12}  alignContent={'center'}   >
                      <Heading variant="h4" sx={{marginTop:'2rem', marginBottom:'2rem'}} >
                         No more News
                      </Heading>    
                </Grid>}

        </Grid>
    )
})

const NewsSection = () => {
    // const queryClient = useQueryClient()
    const newQuery = useNews()

    // console.log(newQuery.data)

    const newsList  = newQuery.data?.pages  ?  (newQuery.activeTag).toLowerCase()== 'latest news' ? newQuery.data?.pages : newQuery.data?.pages.map(((vl:newSApirResDatatype) => Object.assign({},{...vl, data:vl.data.filter((dv:newsType)=> (dv.source.name)?.toLowerCase()== (newQuery.activeTag)?.toLowerCase())}) )) : []
    
    const fetchMore = () => {
        newQuery.fetchNextPage()
    }
    console.log('newQuery.hasNextPage')
    console.log(newQuery.hasNextPage)
   
    // console.log(newsList)
    return (
        <>
        {/* (newQuery.isFetching && !newQuery.isFetchedAfterMount) */}
        <NewsHeading loading={ (newQuery.isInitialLoading)} activeTag={newQuery.activeTag} />
        <AllNews 
            newsPagesData={newsList || []} 
            intialLoading={(newQuery.isInitialLoading)} 
            isMainTag={ (newQuery.activeTag).toLowerCase()== 'latest news'}
            fetchMore={fetchMore} 
            fetchingNextPage={newQuery.isFetchingNextPage}
            hasNextPage={newQuery.hasNextPage ?? false}
            fetchMoreRef={newQuery.inViewRef}
            showNoMore={newQuery.showNoMore}
        />
        </>
    )
}

export default NewsSection;