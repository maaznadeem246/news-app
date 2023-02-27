import styled from "@emotion/styled";
import { Button, ButtonProps } from "@mui/material";
import {  ReactNode } from "react";




interface customButtonType extends ButtonProps{
    children: ReactNode
}





const CustomStyledButton = styled(Button)({
    // color: 'darkslategray',
    // backgroundColor: 'aliceblue',
    // padding: 8,
    // borderRadius: 4,
    width:'100%',
    marginTop:'10px',
    marginBottom:'10px',
    aspectRatio:'1/0.13',
    minHeight:'35px',
    maxHeight:'45px',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
  });


const CustomButton  = ({children, ...props}:customButtonType) => {
    return (
        <CustomStyledButton {...props}>
            {children}
        </CustomStyledButton>
    )
  }

export default CustomButton;