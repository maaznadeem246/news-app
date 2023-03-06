import CardComp from "@/components/cards"
import { Box } from "@mui/material"
import Image from "next/image"
import { memo } from "react"




export interface newsType {
    author: string|null,
content: string|null,

description: string|null,
publishedAt:string|null,
source:{
    id:string|null
    name:string |null,    
} ,
title:string |null,
uid:string |null,
url:string |null,  
urlToImage:string|null,
}



const NewsCard = memo((props:newsType) => {
    const {title,url,urlToImage} = props
    return (
        <CardComp
            sx={{
                margin:'8px',
                padding:'8px',
                // margin:'auto !important',
                // marginBottom:'10px !important',
                position:'relative',
            }}
        >           

            
            <Box
                
                sx={{
                    position:'absolute',
                    width:'100%',
                    height:'100%',
                    objectFit:'contain',
                    top:0,
                    left:0,
                    filter: 'blur(70px)',
                }}
            >
                <img src={urlToImage || ''} width='100%' height="100%" />
                </Box>
                

 
        <Box 
            sx={{
                isolation:'isolate',
                // backdropFilter: 'blur(40px)',
            }}
        >
            {title}
        </Box>
        </CardComp>
    )
})


export default NewsCard;