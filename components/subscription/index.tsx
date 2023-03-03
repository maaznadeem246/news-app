import { SubscriptionType } from "@/pages/subscription";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import CardComp from "../cards";
import Heading from "../headings";
import CustomButton from "../inputs/customButton";
import theme from "@/styles/theme/theme";
import { useUser } from "@/modules/hooks/useUser";
import { loadStripe } from "@stripe/stripe-js";

import { keyable } from "@/types";
import { subscriptionService } from "@/modules/services/subscription";





const Subscription = ({plans}:SubscriptionType) => {

    const {user} = useUser()
    const [planeState] = useState(plans || [])
    const subscribeHandle = useSubscribe()
    console.log(planeState)
    console.log(user)

    const handleSubscrbie = async(pId:string) => {
            const {data, error} = await  subscriptionService(pId)
            console.log(pId)
            if(process.env.NEXT_PUBLIC_STRIPE_KEY != undefined && data && data?.id && error == null){
                const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)
                await stripe?.redirectToCheckout({sessionId:data.id})
            }

    }


    const showSubscribedButon = !!user?.userData?.is_subscribed;
    

    return (
        <>
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
                   Subscription 
                </Heading>
            </Box>
          {/* <pre>{JSON.stringify(planeState,null,2)}</pre> */}
          <Grid container spacing={2}>
                {planeState.map((planV,indx)=>{
                    return (
                        <Grid key={`subBox-${indx}`} item xs={12} md={6}>
                            
                                <CardComp>
                                    <Heading variant="h5">
                                        {planV.name}
                                    </Heading>
                                    <Heading variant="h3">
                                        {planV.price}
                                    </Heading>
                                    <CustomButton
                                        sx={{
                                            width:'fit-content',
                                            backgroundColor:theme.palette.primary.main,
                                            color:theme.typography.body1.color
                                        }}
                                        onClick={()=> handleSubscrbie(planV.id)}
                                        disabled={showSubscribedButon}
                                    >
                                        {showSubscribedButon ? 'Subscribe' : 'Subscribed'}
                                    </CustomButton>
                                </CardComp>
                            
                        </Grid>

                    )
                })}
          </Grid>
        </Box>
        </>
    )
}

export default Subscription;