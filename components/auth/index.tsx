import { Container } from "@mui/material";
import { display } from "@mui/system";
import { useState } from "react";
import CardComp from "../cards";
import SignIn from "./signIn";
import SignUp from "./signUp";


export type handleToggle = (val?:boolean | undefined) => void

export default function Auth(){
    const [active,setActive] = useState<boolean>(true)

    const handleToggle:handleToggle= (val) => {
        if(val == undefined){
            setActive((prev)=> !prev)
        }else{
            setActive(val)
        }
     }

    return(
       
        <Container 
            sx={{
                display:'flex',
                justifyContent:'center',
               
            }}
        >
            <CardComp 
                sx={{
                    
                }}
            >
                {
                    active ?
                        <SignIn handleToggle={handleToggle} />   
                    :
                        <SignUp handleToggle={handleToggle} /> 
                }
               
            </CardComp>   
        </Container>
       
    )
} 