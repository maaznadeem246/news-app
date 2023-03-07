import CardComp from "@/components/cards"
import TransparentTextBack from "@/components/TransparentTextBack"
import { useGlobalState } from "@/modules/hooks/useGlobal"
import theme from "@/styles/theme/theme"
import { Box, SxProps } from "@mui/material"


import { memo,ReactNode } from "react"




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
    const {title,url,urlToImage,author,uid,source} = props

    const {handleNewsModalOpen} = useGlobalState()

    const handleHit = () => {
        if(uid){
            handleNewsModalOpen(uid)
        }else{
            handleNewsModalOpen()
        }

    }

    return (
        <CardComp
            onClick={handleHit}
            sx={{
                margin:'8px',
                padding:'2px',
                cursor:'pointer',
                minHeight:'230px',
                // margin:'auto !important',
                // marginBottom:'10px !important',
                position:'relative',
                boxShadow:theme.shadows[13],
                // transition:'top  3s ease',
                // border:`4px solid ${theme.palette.primary.light}`
                // ':hover':{
                //     boxShadow:theme.shadows[23],
                //     top:'-10px'

                // }
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
                

 
        <TransparentTextBack 
            sx={{
            
              
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
          
        </TransparentTextBack>
        <TransparentTextBack
         sx={{
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
                    Source :
                </Box>
                <Box
                    sx={{
                         color:theme.palette.primary.light,
                    }}
                >
                    {source.name}
                </Box>
            </TransparentTextBack>

                <TransparentTextBack
                
                    sx={{
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
                </TransparentTextBack>
        </CardComp>
    )
})


export default NewsCard;