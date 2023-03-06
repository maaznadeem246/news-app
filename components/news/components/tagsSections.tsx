import useNews from "@/modules/hooks/useNews"
import theme from "@/styles/theme/theme"
import { Box } from "@mui/material"
import { memo } from "react"
import { newsType } from "./newsCard"
import zIndex from "@mui/material/styles/zIndex"
import { useGlobalState } from "@/modules/hooks/useGlobal"





interface TagsSectionType {
    selectedTag?:string,
    tagsList?: string[],
    handleTag ?: (t:string) => void
}

const TagsSection = memo(({selectedTag="all"}:TagsSectionType) =>{
    const newQuery = useNews()
    const tagsList = newQuery.data.map((newObj:newsType) => newObj.source.name)
    const _tagsList = ['Latest News'].concat(tagsList)
    const {handleTagOption} = useGlobalState()
    const handleTag = (k:string) => {
        handleTagOption(k)
    }
    return (
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
            {_tagsList.map((vl:string) => (
                <Box
                    onClick={() => handleTag(vl)}
                    sx={{
                        background:theme.palette.primary.light,
                        border:`${selectedTag.toLowerCase() == vl.toLowerCase() ? '5' : '2'}px solid ${theme.palette.primary.main}`,                        
                        padding:'7px',
                        borderRadius:'10px',
                        whiteSpace:'nowrap',
                        fontSize:'clamp(0.9rem, 1vh, 1.1rem)',
                        flex:'0 0 auto',
                        scrollSnapAlign:'start',
                        scrollSnapStop:'always',
                        cursor:'pointer'
                    }}
                >{vl}</Box>
            ))}
        </Box>
        <Box 
            sx={{
                width:'100%',
                aspectRatio:['1/0.18','1/0.18','1/0.15','1/0.15'],
                maxHeight:'100px',
                background:'transparent',
            }}
        />
        </>
    )
})


export default TagsSection