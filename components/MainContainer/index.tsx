

import { Box, Container } from "@mui/material";
import { FC, ReactNode } from "react";
import { useUser } from "../context/UserProvider";


interface MainContainerType{
    children:ReactNode
}

const MainContainer : FC<MainContainerType>= ({children}) => {
    const { isLoading } = useUser()  
  
        return (
            <Container maxWidth="lg"
                sx={{
                    width:['100%','80%','80%', '100%'],
                    // border:'1px solid',
                    marginTop:'3rem',
                }}
            >
                {
                 isLoading ?
                    <Box>Loading</Box>
                 :
                    children
                }
                    {/* {children} */}
            </Container>
        )
}


export default MainContainer;