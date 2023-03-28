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
import useSignIn from "@/modules/hooks/useSignIn";
import theme from "@/styles/theme/theme";
import { useRouter } from "next/router";
import { useUser } from "../context/UserProvider";

type SignInTypes  = {
    handleToggle?: handleToggle 
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
    const router = useRouter()
    const formData = useFormHook({
        formSchema:singInFormSchema,
       defaulvalues:{
            email:'',
            password:'',
        },
  
      
    })

    const {isLoading,isRouteLoading} = useUser();

    const signInMutaion = useSignIn()    

    const handleSubmit : SubmitHandler<signInForType>= async(data) => {
      
       
        signInMutaion.mutate({
            email:data.email,
            password:data.password,
          })  
        //   // //// console.log('response')
        //   // //// console.log(response)
    }
    
        // if (signInMutaion.data?.session){
        //     // console.log(signInMutaion.data)
        //     router.push('/')
        // } 

    // // //// console.log(formData.errors)

    return (
        <Stack
            component="form"
            
            noValidate
            autoComplete="off"
            onSubmit={ formData.handleSubmit(handleSubmit)}
        >
            <Box>
                <Heading 
                    variant="h4"
                    sx={{
                        fontWeight:'600',
                        textAlign:'center',
                        margin:'auto',
                        marginBottom:'30px',
                        marginTop:'30px',

                        }}
                        headingStyle={true}
                    >
                    Sign In
                </Heading>
                </Box>
                <Box
                    sx={{
                        fontWeight:'600',
                        color:theme.palette.error.light,
                        textAlign:'center',
                        maringTop:'4px',
                        marginBottom:'4px',
                    }}
                >
                    { signInMutaion?.isError ?  signInMutaion?.error?.message : ''}
                </Box>
                <InputField 
                    name="email"
                    control={formData.control}
                    variant="outlined"
                    label="Email"
                    sxMainBox={{
                        marginTop:'10px',   
                    }}
                    disabled={signInMutaion.isLoading || isLoading || isRouteLoading}
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
                    disabled={signInMutaion.isLoading || isLoading || isRouteLoading}
                    error={Boolean(formData.errors.password?.message)}
                    helperText={Boolean(formData.errors.password?.message) ? formData.errors.password?.message : ""}
                />
               
                <CustomButton 
                        variant="contained"
                        sx={{
                            margin:'auto',
                            marginTop:'20px !important',
                            width:'100%',
                            maxWidth:['100%','300px']
                        }}
                        type="submit"
                        disabled={signInMutaion.isLoading || isLoading || isRouteLoading}

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
                        onClick={()=>(router.push('/signup'))}
                    >
                        Sign Up
                    </Box>
                </Box>

        </Stack>
    )
})


export default SignIn;