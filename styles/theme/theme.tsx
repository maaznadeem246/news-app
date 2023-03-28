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
        },
        h3:{
            fontSize:'clamp(2.5rem,3vw, 5rem)'
        }
    },
    palette: {
        primary:{
                
            light:'#DBD1B1',
            main:'#C5BCA1',
            dark:'#a4a092',
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
                  
                    marginTop:'1rem',
                    marginBottom:'1rem',
                    borderRadius:'10px',
                    height:'auto',
                    minHeight:'80px',
                    // paddigTop:'1rem',
                    // paddigBottom:'1rem',
                    
                }
            }
        },
        MuiDialog:{
            styleOverrides:{
                root:{
                    backgroundColor:'var(--background-custom)'
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
                    width:'auto', 
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