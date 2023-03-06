import CardComp from "@/components/cards"
import theme from "@/styles/theme/theme"
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
    const {title,url,urlToImage,author} = props
    return (
        <CardComp
            sx={{
                margin:'8px',
                padding:'2px',
                // margin:'auto !important',
                // marginBottom:'10px !important',
                position:'relative',
                boxShadow:theme.shadows[13]
                // border:`4px solid ${theme.palette.primary.light}`
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
                    filter: 'blur(3px) contrast(0.9)',
                }}
            >
                <img src={urlToImage || ''} width='100%' height="100%" />
                </Box>
                

 
        <Box 
            sx={{
            
                backdropFilter: 'blur(10px) contrast(0.5)',
                 borderRadius:'8px',  
                 padding:'5px',
                //  border:`2px solid ${theme.palette.primary.light}`
            }}
        >
            <Box
                sx={{
                    
                    // isolation:'isolate',
                    color:theme.palette.primary.light,
                    display: '-webkit-box',   
                    'WebkitLineClamp': '2',   
                    'WebkitBoxOrient': 'vertical',     
                    overflow: 'hidden',
                    fontSize:['1.1rem'],
                }}
            >
            {title}
            </Box>
          
        </Box>
            <Box
                sx={{                    
                    backdropFilter: 'blur(10px) contrast(0.5)',
                    borderRadius:'8px',  
                    padding:'5px',
                    display:'flex',
                    width:'fit-content',
                    justifyContent:'flex-start',
                    alignItems:'flex-start',
                    gap:'5px',
                    height:'auto',
                    marginTop:'5px',
                    '&>*':{
                        fontSize:['0.9rem'],
                    }
                }}
            >
                <Box
                    sx={{
                        color:theme.palette.primary.light,
                        whiteSpace:'nowrap',
                    }}
                >
                    Author :
                </Box>
                <Box
                    sx={{
                         color:theme.palette.primary.light,
                    }}
                >
                    {author}
                </Box>
            </Box>
        </CardComp>
    )
})


export default NewsCard;