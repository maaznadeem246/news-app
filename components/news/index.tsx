import useNews from "@/modules/hooks/useNews";
import { keyable } from "@/types";
import { Box } from "@mui/system"
import TagsSection from "./components/tagsSections";
import { useState } from "react";
import NewsSection from "./components/mewSection";
import { newsType } from "./components/newsCard";
import SingleNews from "../singleNews";





    const NewsPage = () => {

        
        // //console.log('newQuery')
        // newQuery.data




        return (
            <Box>

                <NewsSection />
                <SingleNews />
            </Box>
        )
    }

    export default NewsPage;