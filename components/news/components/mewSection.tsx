import { Box, Grid } from "@mui/material";
import NewsCard, { newsType } from "./newsCard";
import useNews from "@/modules/hooks/useNews";
import Heading from "@/components/headings";
import { useGlobalState } from "@/modules/hooks/useGlobal";
import { useQueryClient } from "@tanstack/react-query";
import { ReactNode, memo } from "react";
import { LoadingSkeleton } from "@/components/loadingSkeletons";



const NewsHeading = memo(({activeTag,loading}:{activeTag:string,loading:boolean})=>{
return(
    <Box 
    sx={{
        display:'flex',
        justifyContent:'center',
        marginTop:['1.5rem','3rem','3rem'],
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


const AllNews = memo(({newsList}:{newsList:newsType[]})=>{
    // console.log('list')
    return(
    <Grid container spacing={1} padding={['20px','0px','0px',]} marginBottom={'20px'} justifyContent={'center'}>
            {
                newsList.map((val:newsType,ind:number) => {
                    return (
                        <Grid key={`newskye-${ind}-${val.uid}`} item xs={12} sm={6} md={6} lg={4} alignContent={'center'}   >
                                <NewsCard {...val}/>
                        </Grid>
                    )
                })
            }

        </Grid>
    )
})

const NewsSection = () => {
    // const queryClient = useQueryClient()
    const newQuery = useNews()

    // console.log(newQuery.data)
    const {activeTag} = useGlobalState()
    const newsList :  Array<newsType>  = (activeTag).toLowerCase()== 'latest news' ? newQuery?.data  : newQuery?.data.filter((dv:newsType)=> (dv.source.name)?.toLowerCase()== (activeTag)?.toLowerCase()) || []
   
   
    // console.log(newsList)
    return (
        <>
        {/* (newQuery.isFetching && !newQuery.isFetchedAfterMount) */}
        <NewsHeading loading={ (newQuery.isFetching && !newQuery.isFetchedAfterMount)} activeTag={activeTag} />
        <AllNews newsList={newsList} />
        </>
    )
}

export default NewsSection;