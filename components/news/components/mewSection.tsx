import { Box, Grid } from "@mui/material";
import NewsCard, { newsType } from "./newsCard";
import useNews from "@/modules/hooks/useNews";
import Heading from "@/components/headings";
import { useGlobalState } from "@/modules/hooks/useGlobal";


interface NewsSectionType{
    newsList?: Array<newsType>
}

const NewsSection = (props:NewsSectionType) => {
    const newQuery = useNews()
    const {activeTag,handleTagOption} = useGlobalState()
    const newsList :  Array<newsType>  = (activeTag).toLowerCase()== 'latest news' ? newQuery?.data  : newQuery?.data.filter((dv:newsType)=> (dv.source.name)?.toLowerCase()== (activeTag)?.toLowerCase()) || []

   

    return (
        <>
        <Box 
                sx={{
                    display:'flex',
                    justifyContent:'center',
                    marginTop:'3rem',
                    marginBottom:'3rem',
                }}
            >
                <Heading
                    variant="h3"
                    headingStyle={true}
                    sx={{
                        textTransform:'capitalize'
                    }}
                >
                  {activeTag}
                </Heading>
            </Box>
        <Grid container spacing={1} padding={['20px','0px','0px',]} marginBottom={'20px'} justifyContent={'center'}>
            {
                newsList.map((val:newsType) => {
                    return (
                        <Grid key={val.uid} item xs={12} sm={12} md={6} lg={4} alignContent={'center'} >
                                <NewsCard {...val}/>
                        </Grid>
                    )
                })
            }

        </Grid>
        </>
    )
}

export default NewsSection;