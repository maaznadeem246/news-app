import styled from "@emotion/styled";
import { Box } from "@mui/system";






interface DetailsText {
    dataHead:string,
    dataValue:string,
}


const StyledDataHead = styled(Box)(()=>({
    fontSize:'clamp(0.8rem,2.3vh, 2rem)',

}))
const StyledDataValue = styled(Box)(()=>({
    fontSize:'clamp(0.8rem,2.3vh,2rem)',

}))

const DetailsText = ({dataHead,dataValue}:DetailsText) => {
    return (
        <>
        <Box
                sx={{
                    display:'flex',
                    gap:2,
                }}
              >
                  <StyledDataHead>
                        {dataHead}
                  </StyledDataHead>
                  <StyledDataValue>
                        {dataValue}
                  </StyledDataValue>
              </Box>
        </>
    )
}

export default DetailsText;