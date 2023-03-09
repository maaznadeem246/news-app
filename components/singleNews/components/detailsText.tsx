import { StyledDataHead, StyledDataValue } from "@/components/styledComp";
import theme from "@/styles/theme/theme";
import styled from "@emotion/styled";
import { SxProps } from "@mui/material";
import { Box } from "@mui/system";






interface DetailsText {
    dataHead:string,
    dataValue:string,
    sx?:SxProps
}




const DetailsText = ({dataHead,dataValue,sx={}}:DetailsText) => {
    return (
        <>
        <Box
                sx={{
                    display:'flex',
                    gap:2,
                    flexWrap:['wrap','nowrap'],
                    ...sx
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