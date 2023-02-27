import { handleToggle } from ".";
import Heading from "../headings";
import InputField from "../inputs/inputField";
import { unknown, z } from "zod";
import useFormHook from "@/modules/hooks/useFormHook";
import CustomButton from "../inputs/customButton";
import { Box, Stack } from "@mui/material";
import { SubmitHandler } from "react-hook-form";
import { memo } from "react";
import useSignup from "@/modules/hooks/useSignUp";
import theme from "@/styles/theme/theme";

type SignUpTypes  = {
    handleToggle: handleToggle 
}

const singInFormSchema = z.object({
    fullname: z.string().min(1, { message: "Full Name is required" }),
    email: z.string().min(1, { message: "Email is required" })
            .email({
                message: "Must be a valid email",
            }),
    password: z.string().min(8, { message: "Password must be atleast 8 characters" }),
    confirmPassword: z.string().min(1, { message: "Confirm Password is required" }),
    
    }).refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Password don't match",
    });;


export type signUpForType =  z.infer<typeof singInFormSchema>


const SignUp = memo(({
    handleToggle
}:SignUpTypes) => {
    const formData = useFormHook({
        formSchema:singInFormSchema,
       defaulvalues:{
            fullname:'test1',
            email:'test1@gmail.com',
            password:'123123123',
            confirmPassword:'123123123',
        },
  
      
    })
    
    const signUpMutaion = useSignup()    

    const handleSubmit : SubmitHandler<signUpForType>= async(data) => {
      
       
        signUpMutaion.mutate({
            fullname:data.fullname,
            email:data.email,
            password:data.password,
          })  
        //   console.log('response')
        //   console.log(response)
    }


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
                    Sign Up
                </Heading>
              <Box
                    sx={{
                        fontWeight:'600',
                        color:theme.palette.error.light,
                        textAlign:'center',
                        maringTop:'4px',
                        marginBottom:'4px',
                    }}
                >
                    { signUpMutaion?.isError ?  signUpMutaion?.error?.message : ''}
                </Box>
                <InputField 
                    name="fullname"
                    control={formData.control}
                    variant="outlined"
                    label="Full Name"
                    error={Boolean(formData.errors.fullname?.message)}
                    helperText={Boolean(formData.errors.fullname?.message) ? formData.errors.fullname?.message : ""}
                />
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
                <InputField 
                    name="confirmPassword"
                    type="password"
                    control={formData.control}
                    variant="outlined"
                    label="confirm Password" 
                    sxMainBox={{
                        marginTop:'10px',   
                    }}
                    error={Boolean(formData.errors.confirmPassword?.message)}
                    helperText={Boolean(formData.errors.confirmPassword?.message) ? formData.errors.confirmPassword?.message : ""}
                />

                <CustomButton 
                        variant="contained"
                        sx={{
                            margin:'auto',
                            marginTop:'20px !important',

                            maxWidth:['100%','300px']
                        }}
                        type="submit"
                        disabled={signUpMutaion.isLoading}
                >
                    Sign Up
                </CustomButton>
                <Box
                    sx={{
                        marginTop:'5px',
                        fontSize: ['0.9rem','1rem'],
                        textAlign:'center',
                    }}
                >
                    Want to Login ?
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
                        Sign In
                    </Box>
                </Box>
        </Stack>
    )
})


export default SignUp;