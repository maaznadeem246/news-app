import Heading from "@/components/headings";
import CustomButton from "@/components/inputs/customButton";
import { Box } from "@mui/material"
import Link from "next/link";



const CancelledPage = () => {
    return (
        <Box>
        <Box 
        sx={{
            display:'flex',
            justifyContent:'center',
            marginTop:'3rem',
            marginBottom:'3rem',
        }}>
            <Heading
                variant="h3"
                headingStyle={true}
               
            >
               Cancelled
            </Heading>
        </Box>
        <Box
        sx={{
            display:'flex',
            justifyContent:'center',
            marginBottom:'2rem',
        }}
        >
             <Heading variant="h6"  >
                Your Payment is Cancelled. you can use our service till you expiration date. 
             </Heading>
        </Box>
        <Box
        sx={{
            display:'flex',
            justifyContent:'center',
        }}
        >
            <Link href={'/'}>
                <CustomButton  >
                Check Some News
            </CustomButton>
            </Link>
        </Box>
        

    </Box>
    )
}


export default CancelledPage;