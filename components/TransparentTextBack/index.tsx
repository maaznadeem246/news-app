import { SxProps } from "@mui/material";
import { Box } from "@mui/system";
import { ReactNode } from "react";

const TransparentTextBack = ({children,sx}:{children:ReactNode,sx?:SxProps}) =>{

    return (
        <Box
        sx={{                    
            backdropFilter: 'blur(10px) contrast(0.5)',
            lineHeight:'1.3',
            borderRadius:'8px',  
            padding:'5px',
            display:'flex',
            width:'fit-content',
            justifyContent:'flex-start',
            alignItems:'flex-start',
            gap:'5px',
            height:'auto',
            marginTop:'5px',
           
            ...sx
        }}
    >
            {
                children
            }
        </Box>
    )
}

export default TransparentTextBack;