
import { Box } from "@mui/material";

import { handleToggle } from ".";

import Heading from "../headings";





type SigninTypes  = {
    handleToggle :  handleToggle
}



const SignIn = ({}:SigninTypes) => {



    return (
        <Box
            component="form"
            
            noValidate
            autoComplete="off"
        >
                <Heading 
                    variant="h4"
                    sx={{
                        fontWeight:'600',
                        textAlign:'center',
                    }}
                >
                    Sign In
                </Heading>

                
        </Box>
             
   )
}


export default SignIn;