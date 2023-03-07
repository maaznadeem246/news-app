import useSingleNews from "@/modules/hooks/useSingleNews";
import { useState } from "react";
import SingleNewsModal from "./components/singleNewsModal";



const SingleNews = () => {

    const {open,handleClose,news} = useSingleNews()
    
    return (
            <>
                <SingleNewsModal open={open} handleClose={handleClose} news={news}/>
            </>
    )
}


export default SingleNews;