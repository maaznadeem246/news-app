import { Box, useMediaQuery, Theme } from "@mui/material";
import CustomButton from "../inputs/customButton";
import useSignOut from "@/modules/hooks/useSignOut";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

const Logout = () => {
    const smResp = useMediaQuery((theme:Theme) => theme.breakpoints.down('sm'));
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
            width:`${smResp ? 'auto' : '100px'} !important`,
            minWidth:'fit-content !important',
        }}
        onClick={handleLogout}
        disabled={logoutMuation.isLoading}
    >
            { smResp ? 

            <LogoutRoundedIcon />

            : '        Log out' }

    </CustomButton>
    </Box>

    )
} 

export default Logout;