import Heading from "@/components/headings";
import CustomButton from "@/components/inputs/customButton";
import { Box } from "@mui/material"
import Link from "next/link";



const SuccessPage = () => {
    return (
        <Box>
            <Box 
            sx={{
                display:'flex',
                justifyContent:'center',
            }}>
                <Heading
                    variant="h3"
                    headingStyle={true}
                   
                >
                    Success
                </Heading>
            </Box>
            <Box
            sx={{
                display:'flex',
                justifyContent:'center',
            }}
            >
                <Link href={'/'}>
                    <CustomButton
                    
                    >
                    News
                    </CustomButton>
                </Link>
            </Box>
            

        </Box>
    )
}


export default SuccessPage;