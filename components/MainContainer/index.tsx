import { useUser } from "@/modules/hooks/useUser";
import { Box, Container } from "@mui/material";
import { FC, ReactNode } from "react";


interface MainContainerType{
    children:ReactNode
}

const MainContainer : FC<MainContainerType>= ({children}) => {
    const {loading} = useUser()  
  
        return (
            <Container maxWidth="lg"
                sx={{
                    width:['100%','80%','80%', '100%'],
                    // border:'1px solid',
                    marginTop:'3rem',
                }}
            >
                {
                 loading ?
                    <Box>Loading</Box>
                 :
                    children
                }

            </Container>
        )
}


export default MainContainer;