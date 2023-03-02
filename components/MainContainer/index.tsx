import { Container } from "@mui/material";
import { FC, ReactNode } from "react";


interface MainContainerType{
    children:ReactNode
}

const MainContainer : FC<MainContainerType>= ({children}) => {
        return (
            <Container maxWidth="lg"
                sx={{
                    // border:'1px solid'
                }}
            >
                {children}
            </Container>
        )
}


export default MainContainer;