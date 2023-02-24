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
        MuiTextField:{
            styleOverrides:{
                root:{
                    width:'100%',
                    maxWidth:'800px',
                    paddingTop:'5px',
                    paddingBottom:'5px'
                }  
            }
        },
        MuiCard:{
            styleOverrides:{
                root:{
                  
                    margin:18,
                    boxShadow:'rgba(0, 0, 0, 0.1) 0px 10px 15px;',
                    borderRadius:'20px',
                    minHeight:'200px',
                    padding:'20px',
                    width:'100%', 
                    maxWidth: '550px', 
                                        
                }
            }
        },
        MuiCardContent:{
           
        }
    }
});
export default theme;