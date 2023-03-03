import theme from "@/styles/theme/theme";
import styled from "@emotion/styled";
import { Button, ButtonProps } from "@mui/material";
import {  ReactNode } from "react";




interface customButtonType extends ButtonProps{
    children: ReactNode
}








const CustomButton  = ({children,sx, ...props}:customButtonType) => {
    return (
        <Button {...props}
         sx={{

          marginTop:'10px',
          marginBottom:'10px',
          width:'auto !important',
          minWidth:'auto !important',
          border:`1px solid ${theme.palette.primary.main}`,
          // aspectRatio:'1/0.13',
          minHeight:'35px',
          maxHeight:'45px',
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          ...sx
        }}
          >
            {children}
        </Button>
    )
  }

export default CustomButton ;