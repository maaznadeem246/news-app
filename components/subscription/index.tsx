import { SubscriptionType } from "@/pages/subscription";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import CardComp from "../cards";
import Heading from "../headings";




const Subscription = ({plans}:SubscriptionType) => {

    const [planeState] = useState(plans || [])

    return (
        <>
        <Box>
            <Box>
                <Heading
                    variant="h3"
                    headingStyle={true}
                   
                >
                   Subscription 
                </Heading>
            </Box>
          {/* <pre>{JSON.stringify(planeState,null,2)}</pre> */}
          <Grid container spacing={2}>
                {planeState.map((planV)=>{
                    return (
                        <CardComp>
                            {planV.name}
                        </CardComp>
                    )
                })}
          </Grid>
        </Box>
        </>
    )
}

export default Subscription;