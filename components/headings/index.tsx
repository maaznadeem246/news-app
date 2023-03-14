
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


const StyledTypography = styled(Typography)<{customheadstyle:SxProps}>(props => ({
    ...props.customheadstyle,
    
}))


const Heading : FC<HeadingType  >  = memo(({children,headingStyle=false,...props})=>{

   const customheadstyle = {
    position:'relative',
    width:'fit-content',
    textDecorationStyle: 'wavy',
    ':after':{
        content:"''",
        position:'absolute',
        width:'100%',
        margin:'auto',
        height:'45%',
        transform: 'scaleX(1.1)',
        top:'0',
        left:'0',
        backgroundColor:theme.palette.primary.light,
        mixBlendMode: 'multiply',
        borderTopRightRadius:'10px',
        borderTopLeftRadius:'10px',
    }
}

const defaultStyle = {
    textAlign:'center',
    marginLeft:'1.5rem',
    marginRight:'1.5rem'
}

    return (
        <StyledTypography 
            customheadstyle={headingStyle ?{...defaultStyle,...customheadstyle }: {...defaultStyle}}
            
            {...props}
        >
            {children}
        </StyledTypography>
    )
})


export default Heading ;