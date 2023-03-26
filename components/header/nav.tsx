import { AppBar, Toolbar } from "@mui/material"
import Heading from "../headings"
import theme from "@/styles/theme/theme"
import { Box } from "@mui/system"
import { useRouter } from "next/router"
import Logout from "../auth/logout"
import Link from "next/link"
import CustomButton from "../inputs/customButton"
import { useUser } from "../context/UserProvider"
import TagsSection from "../news/components/tagsSections"




const Nav = () => {
    const {session,isLoading} = useUser()
    // //console.log(userData)
    return (
        <AppBar component='nav'>
            <Toolbar
                sx={{
                    background:'white',
                    width:'80%',
                    margin:'auto',
                    marginTop:'1rem',
                    marginBottom:'1rem',
                    boxShadow:'rgba(0, 0, 0, 0.1) 0px 8px 8px;',
                    display:'flex',
                    justifyContent:'space-between',

                    // borderRadius:'10px',
                    [theme.breakpoints.down('sm')]:{
                        width:'90%',
                        flexDirection:'column',
                        justifyContent:'space-around',
                        // gap:'10px'
                    }
                }}
            >
                <Link  href='/'>
                <Heading
                    variant="h4"
                    headingStyle={true}
                    sx={{cursor:'pointer'}}
                   
                >
                    <Box >News</Box>
                </Heading>
                </Link>
                
                {!isLoading && 
                    <Box 
                            sx={{display:'flex', gap:'7px'}}
                    >
                        { session&&
                        <>
                            <Box
                            
                            >
                                <Link href={'/subscription'}>
                                    <CustomButton
                                    sx={{
                                        borderRadius:'10px',
                                        background:'transparent',
                                        border:'1px solid',
                                        minWidth:'fit-content !important',
                                    }}
                                    >
                                        Subscription
                                    </CustomButton>
                                </Link>
                            </Box>
                            <Box
                            
                            >
                                <Logout />
                            </Box>
                        
                            </>
                        }
                        {!session && 
                                <Link href="/signin">
                                    <CustomButton
                                    sx={{
                                        borderRadius:'10px',
                                        background:'transparent',
                                        border:'1px solid',
                                        minWidth:'fit-content !important',
                                    }}
                                    >
                                        Signin
                                    </CustomButton>
                                </Link>}
                    </Box>
                }
            </Toolbar>
           
        </AppBar>
    )
}


export default Nav