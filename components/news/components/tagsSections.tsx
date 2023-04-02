import useNews from "@/modules/hooks/useNews"
import theme from "@/styles/theme/theme"
import { Box } from "@mui/material"
import { memo } from "react"
import { newsType } from "./newsCard"
import zIndex from "@mui/material/styles/zIndex"
import { useGlobalState } from "@/modules/hooks/useGlobal"
import { LoadingSkeleton } from "@/components/loadingSkeletons"



type RequiredNotNull<T> = {
    [P in keyof T]: NonNullable<T[P]>
  }

interface TagsSectionType {
   
}

const TagsSection = memo((props:TagsSectionType) =>{
    const newQuery = useNews()

    const val = newQuery?.data?.data.map((newObj:newsType) => newObj?.source?.name ?  newObj.source.name : '').filter(vl => Boolean(vl))        
    const tagsList:(string)[] = (val && newQuery?.data?.data && newQuery?.data?.data.length > 0) ? [...new Set<string>(val)]  : []
    const _tagsList = tagsList?.length > 0 ? ['Latest News'].concat(tagsList) : []
    const {handleTagOption,activeTag} = useGlobalState()
    const handleTag = (k:string) => {
        handleTagOption(k)
    }
    return (
        <>
          
           
            <>
            <Box 
                sx={{
                    borderRadius:'10px',
                    display:'flex',
                    width:['90%','80%','80%'],
                    left:['5%','10%','10%'],
                    margin:'auto',
                    overflow:'auto',
                    gap:'10px',
                    padding:'5px',
                
                    paddingBottom:'10px',
                    scrollPadding:'10px',
                    position:'fixed',
                    backdropFilter: 'blur(20px)',
                    background:'#ffffff78',
                    zIndex:'1',
                    // ':after':{
                    //     position:'fixed',
                    //     content:"' '",

                    //     background: 'linear-gradient(450deg, rgba(250,249,246,0.13489145658263302) 0%, rgba(255,255,255,1) 100%)',
                    //     height:'100%',
                    //     aspectRatio:'0.5/1',
                    //     right:'0',
                    //     top:'0',

                    // }
                }}
            >
            {(newQuery.isInitialLoading) &&
                <LoadingSkeleton skOption="two" skprops={{sx:{width:['100%','100%','100%']}}}/>
            }
              
                { !(newQuery.isInitialLoading) &&_tagsList.length > 0 &&  _tagsList.map((vl:string) => (
                    <Box
                        onClick={() => handleTag(vl)}
                        sx={{
                            background:theme.palette.primary.light,
                            border:`3px solid ${activeTag.toLowerCase() == vl.toLowerCase() ? theme.palette.primary.dark : 'transparent'}`,                        
                            padding:'7px',
                            borderRadius:'10px',
                            whiteSpace:'nowrap',
                            fontSize:'clamp(0.9rem, 1vh, 1.1rem)',
                            flex:'0 0 auto',
                            scrollSnapAlign:'start',
                            scrollSnapStop:'always',
                            cursor:'pointer',
                            webkitTapHighlightColor:'transparent',
                        }}
                    >{vl}</Box>
                ))}
            </Box>
            <Box 
                sx={{
                    width:'100%',
                    aspectRatio:['1/0.18','1/0.18','1/0.10','1/0.07'],
                    maxHeight:'100px',
                    background:'transparent',
                }}
            />
            </>
            
        </>
    )
})


export default TagsSection