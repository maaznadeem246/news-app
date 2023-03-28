import { Box } from "@mui/system"
import LinearProgress from '@mui/material/LinearProgress';
import theme from "@/styles/theme/theme";
import { useUser } from "../context/UserProvider";

const PageLoadingBar = ({}) => {
    const {isRouteLoading} = useUser()
    return(
      <Box sx={{ width: '100%', position:'fixed', top:0, minHeight:'6px' }}>
          {isRouteLoading && <LinearProgress color='primary' /> }
      </Box>
    )
}


export default PageLoadingBar;