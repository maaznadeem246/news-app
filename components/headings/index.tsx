
import { TypographyUtils } from "@mui/material/styles/createTypography";
import { SxProps, typography, TypographyProps } from "@mui/system";
import { FC, memo, ReactNode } from "react";
import { styled, TypographyVariant } from '@mui/material/styles';
import { Typography } from "@mui/material";
import theme from "@/styles/theme/theme";






interface HeadingType extends TypographyProps{
        children: string|ReactNode,
        headingStyle?:Boolean,
        variant?:TypographyVariant,
        sx?:SxProps,
} 


const StyledTypography = styled(Typography)<{customHeadStyle:SxProps}>(props => ({
    ...props.customHeadStyle,

}))


const Heading : FC<HeadingType  >  = memo(({children,headingStyle=false,...props})=>{

   const customHeadStyle = {
    position:'relative',
    width:'fit-content',
    ':after':{
        content:"''",
        position:'absolute',
        width:'100%',
        height:'40%',
        scale:'1.1',
        top:'0',
        left:'0',
        backgroundColor:theme.palette.primary.light,
        mixBlendMode: 'multiply',
        borderTopRightRadius:'10px',
        borderTopLeftRadius:'10px',
    }
}

    return (
        <StyledTypography 
            customHeadStyle={headingStyle ? customHeadStyle : {}}
            
            {...props}
        >
            {children}
        </StyledTypography>
    )
})


export default Heading ;