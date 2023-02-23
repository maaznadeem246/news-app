
import { TypographyUtils } from "@mui/material/styles/createTypography";
import { typography, TypographyProps } from "@mui/system";
import { FC, memo, ReactNode } from "react";
import { styled } from '@mui/material/styles';
import { Typography } from "@mui/material";






type HeadingType = {
        children: string|ReactNode,
} 



const Heading : FC<HeadingType>  = memo(({children,...props})=>{
    return (
        <Typography 
            {...props}
            
        >
            {children}
        </Typography>
    )
})


export default Heading as typeof Typography;