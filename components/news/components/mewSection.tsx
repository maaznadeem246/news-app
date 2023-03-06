import { Box, Grid } from "@mui/material";
import NewsCard, { newsType } from "./newsCard";
import useNews from "@/modules/hooks/useNews";


interface NewsSectionType{
    newsList?: Array<newsType>
}

const NewsSection = (props:NewsSectionType) => {
    const newQuery = useNews()
    const newsList :  Array<newsType>  = newQuery?.data || []
//     const handleTag = (t:string) => {
//     setSelectedTag(t)
// }
    return (
        <Grid container spacing={1} padding={['20px','0px','0px',]} justifyContent={'center'}>
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
    )
}

export default NewsSection;