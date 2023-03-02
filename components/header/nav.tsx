import { AppBar, Toolbar } from "@mui/material"
import Heading from "../headings"
import theme from "@/styles/theme/theme"
import { Box } from "@mui/system"
import { useRouter } from "next/router"
import Logout from "../auth/logout"


const Nav = () => {
    const router = useRouter()
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
                    }
                }}
            >
                <Box>
                <Heading
                    variant="h4"
                    headingStyle={true}
                   
                >
                    <Box   onClick={() => router.push('/')}>News</Box>
                </Heading>
                </Box>
                <Box>
                    <Box>
                        <Logout />
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    )
}


export default Nav