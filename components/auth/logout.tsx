import { Box } from "@mui/material";
import CustomButton from "../inputs/customButton";
import useSignOut from "@/modules/hooks/useSignOut";


const Logout = () => {

    const logoutMuation = useSignOut()

    const handleLogout = () => {
        logoutMuation.mutate()
    }

    return (
    <Box>
    <CustomButton
        sx={{
            borderRadius:'10px',
            background:'transparent',
            border:'1px solid',
            width:'100px !important',
            minWidth:'fit-content !important',
        }}
        onClick={handleLogout}
        disabled={logoutMuation.isLoading}
    >
        Log out
    </CustomButton>
    </Box>

    )
} 

export default Logout;