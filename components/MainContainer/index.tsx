

import { Box, Container, SxProps } from "@mui/material";
import { FC, ReactNode } from "react";
import { useUser } from "../context/UserProvider";
import Heading from "../headings";


interface MainContainerType{
    children:ReactNode,
    sx?:SxProps
}

const MainContainer : FC<MainContainerType>= ({children,sx={}}) => {
    const { isLoading,isRouteLoading } = useUser()  
  
        return (
            <Container maxWidth="lg"
                sx={{
                    width:['100%','80%','80%', '80%'],
                    // border:'1px solid',
                    marginTop:['2rem','2rem','1rem','1rem'],
                    paddingRight:'0 !important',
                    paddingLeft:'0 !important',
                    ...sx,
                   
                }}
            >
                {
                 isLoading || isRouteLoading ?
                    <Box
                        sx={{
                            marginTop:'5rem'
                        }}
                    >

                <Heading 
                    variant="h2"
                    sx={{
                        fontWeight:'600',
                        textAlign:'center',
                        margin:'auto',
                        marginBottom:'30px',
                        marginTop:'30px'
                        }}
                        headingStyle={true}
                    >
                    Loading
                </Heading>
                    </Box>
                 :
                    children
                }
                    {/* {children} */}
            </Container>
        )
}


export default MainContainer;