import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
// Create a theme instance.
const theme = createTheme({
    typography: {
        fontFamily:' "Nunito", sans-serif',
        
        h1:{
            //  fontSize:'3rem' 
        }
    },
    palette: {
        
    },
    components:{
        MuiCard:{
            styleOverrides:{
                root:{
                  
                    margin:40,
                    boxShadow:'rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;'
                }
            }
        },
        MuiCardContent:{
           
        }
    }
});
export default theme;