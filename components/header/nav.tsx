import { AppBar, Toolbar } from "@mui/material"
import Heading from "../headings"
import theme from "@/styles/theme/theme"


const Nav = () => {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Heading
                    variant="h3"
                    sx={{
                        backgroundColor:theme.palette.primary.light,
                        backdropFilter:'blur(10px);'
                    }}
                >
                News
                </Heading>
            </Toolbar>
        </AppBar>
    )
}


export default Nav