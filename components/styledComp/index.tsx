import theme from "@/styles/theme/theme"
import styled from "@emotion/styled"
import { Box } from "@mui/material"





export const StyledDataHead = styled(Box)(()=>({
    fontSize:'clamp(1.1rem,2.3vh, 2rem)',
    padding:'2px',
    // paddingLeft:"7px",
    // paddingRight:"7px",
    position:'relative',
    whiteSpace:'nowrap',
    height:'fit-content',
    '&:after':{
        content:'""',
        background:theme.palette.primary.main,
        position:'absolute',
        bottom:0,
        left:0,
        width:'100%',
        height:'3px',
        borderRadius:'5px',

    }
}))


export const StyledDataValue = styled(Box)(()=>({
    fontSize:'clamp(0.8rem,2.1vh,2rem)',
    background:theme.palette.primary.light,
    borderRadius:'7px',
    padding:'2px',
    paddingLeft:"7px",
    paddingRight:"7px",
    
}))

export const StyledDataText = styled(Box)(()=>({

    fontSize:'clamp(0.8rem,2.2vh,1.8rem)',
    lineHeight:'normal',
}))


