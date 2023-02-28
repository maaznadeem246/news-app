import { createTheme } from '@mui/material/styles';

// Create a theme instance.
let themebrek = createTheme({});
const theme = createTheme({

    typography: {
        fontFamily:' "Nunito", sans-serif',
        allVariants:{
            color:'#2A2A2A',
            fontWeight:'600',
        },
        h1:{
            //  fontSize:'3rem' 
        }
    },
    palette: {
        primary:{
                
            light:'#DBD1B1',
            main:'#C5BCA1',
            dark:'#B4AC94',
        }
    },
    components:{
        MuiAppBar:{
            styleOverrides:{
                root:{
                    background:'transparent',
                    boxShadow:'none',
                }
            }        
        },
        MuiToolbar:{
            styleOverrides:{
                root:{
                    background:'white',
                    width:'80%',
                    margin:'auto',
                    marginTop:'1rem',
                    marginBottom:'1rem',
                    boxShadow:'rgba(0, 0, 0, 0.1) 0px 8px 8px;',
                    borderRadius:'10px',
                    [themebrek.breakpoints.down('sm')]:{
                        width:'90%',
                    }
                }
            }
        },
        MuiTextField:{
            styleOverrides:{
                root:{
                    width:'100%',
                    maxWidth:'800px',
                    paddingTop:'0px',
                    paddingBottom:'0px',
                    marginTop:'5px',
                    marginBottom:'5px',
                    input:{
                        paddingTop:'12px',
                        paddingBottom:'12px',
                     
                       
                    },
                    '& .MuiFormHelperText-root':{    
                        lineHeight:'normal',
                        minHeight:"16px"
                    }
                   
                    // '&  .MuiOutlinedInput-notchedOutline.Mui-focused':{
                    //     border:'1px solid red',  
                    // }
                },
                
                 
            }
        },
        // MuiInputLabel:{
        //     styleOverrides:{
        //         root:{
        //             display:'none'
        //         }
        //     }
        // },
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
                    [themebrek.breakpoints.down('sm')]:{
                        padding:'5px',
                        margin:5,
                    }
                }
            }
        },
        MuiCardContent:{
           
        }
    }
});
export default theme;