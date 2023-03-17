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
    const router = useRouter()
    const userData = useUser()
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
                <Box>
                <Heading
                    variant="h4"
                    headingStyle={true}
                    sx={{cursor:'pointer'}}
                   
                >
                    <Box   onClick={() => router.push('/')}>News</Box>
                </Heading>
                </Box>
                
                <Box 
                        sx={{display:'flex', gap:'7px'}}
                >
                    {userData?.user &&
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
                    {!userData?.user && 
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
            </Toolbar>
           
        </AppBar>
    )
}


export default Nav