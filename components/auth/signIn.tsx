import { handleToggle } from ".";
import Heading from "../headings";
import InputField from "../inputs/inputField";
import { z } from "zod";
import useFormHook from "@/modules/hooks/useFormHook";
import CustomButton from "../inputs/customButton";
import { Stack } from "@mui/material";
import { SubmitHandler } from "react-hook-form";
import { memo } from "react";
import { Box } from "@mui/system";

type SignInTypes  = {
    handleToggle: handleToggle 
}

const singInFormSchema = z.object({

    email: z.string().min(1, { message: "Email is required" })
            .email({
                message: "Must be a valid email",
            }),
    password: z.string().min(8, { message: "Password must be atleast 8 characters" }),

    
    })


export type signInForType =  z.infer<typeof singInFormSchema>


const SignIn = memo(({handleToggle}:SignInTypes) => {
    const formData = useFormHook({
        formSchema:singInFormSchema,
       defaulvalues:{
            email:'',
            password:'',
        },
  
      
    })
    

    const handleSubmit : SubmitHandler<signInForType>= (data) => {
        console.log('data')
        console.log(data)        
    }
    // console.log(formData.errors)

    return (
        <Stack
            component="form"
            
            noValidate
            autoComplete="off"
            onSubmit={ formData.handleSubmit(handleSubmit)}
        >
                <Heading 
                    variant="h4"
                    sx={{
                        fontWeight:'600',
                        textAlign:'center',
                        marginBottom:'30px',
                        marginTop:'30px'
                        }}
                    >
                    Sign In
                </Heading>
               
                <InputField 
                    name="email"
                    control={formData.control}
                    variant="outlined"
                    label="Email"
                    sxMainBox={{
                        marginTop:'10px',   
                    }}
                    error={Boolean(formData.errors.email?.message)}
                    helperText={Boolean(formData.errors.email?.message) ? formData.errors.email?.message : ""}
                />
                <InputField 
                    name="password"
                    type="password"
                    control={formData.control}
                    variant="outlined"
                    label="Password"
                    sxMainBox={{
                        marginTop:'10px',   
                    }}
                    error={Boolean(formData.errors.password?.message)}
                    helperText={Boolean(formData.errors.password?.message) ? formData.errors.password?.message : ""}
                />
               
                <CustomButton 
                        variant="contained"
                        sx={{
                            margin:'auto',
                            marginTop:'20px !important',

                            maxWidth:['100%','300px']
                        }}
                        type="submit"

                >
                    Sign In
                </CustomButton>
                <Box
                    sx={{
                        marginTop:'5px',
                        fontSize: ['0.9rem','1rem'],
                        textAlign:'center',
                    }}
                >
                    Want to Register ?
                    <Box 
                        sx={{
                            display:'inline-block',
                            marginLeft:'4px',
                            cursor:'pointer',
                            ':hover':{
                                textDecoration:'underline',
                            }
                        }}
                        onClick={()=>handleToggle()}
                    >
                        Sign Up
                    </Box>
                </Box>

        </Stack>
    )
})


export default SignIn;