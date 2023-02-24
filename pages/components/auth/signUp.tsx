import { Box } from "@mui/system";
import { handleToggle } from ".";
import CardComp from "../cards";
import Heading from "../headings";
import InputField from "../inputs/inputField";
import { z } from "zod";
import useFormHook from "@/modules/hooks/useFormHook";

type SignUpTypes  = {
    handleToggle: handleToggle 
}

const singInFormSchema = z.object({
    fullname:z.string(),
    email:z.string()
});


export  const signForType =  singInFormSchema._type


const SignUp = ({}:SignUpTypes) => {
    const FormProps = useFormHook({
        formSchema:singInFormSchema,
       defaulvalues:{
        fullname:'',
        email:'',
    }
      
    })
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
            Sign Up
        </Heading>
                <InputField 
                    name="fullname"
                    control={FormProps.control}
                    variant="outlined"
                    label="Full Name"
                />
                <InputField 
                    name="email"
                    control={FormProps.control}
                    variant="outlined"
                    label="Email"
                />

        </Box>
    )
}


export default SignUp;