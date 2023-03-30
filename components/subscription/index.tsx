import { priceType, SubscriptionType } from "@/pages/subscription";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { memo, useState } from "react";
import CardComp from "../cards";
import Heading from "../headings";
import CustomButton from "../inputs/customButton";
import theme from "@/styles/theme/theme";

import { loadStripe } from "@stripe/stripe-js";

import { keyable, Price, UserDetails } from "@/types";
import { changeSubscriptionService, subscriptionService } from "@/modules/services/subscription";
import { useUser } from "../context/UserProvider";
import Logout from "../auth/logout";
import useSignOut from "@/modules/hooks/useSignOut";
import { useRouter } from "next/router";


type subscriptionPricesTypes =  {
    handleSubscribe:(key:string)=>void,
    showSubscribedButon:boolean
} & SubscriptionType 

const SubscriptionPrices = memo(({plans=[],handleSubscribe,showSubscribedButon}:subscriptionPricesTypes) => {
    return (
        <Grid container spacing={2} justifyContent="center">
                {plans.map((planV,indx)=>{
                    let prTob:number = Number((planV.price).toString().substring(0,(planV.price).toString().length-2))
                    // let prTob = new Intl.NumberFormat("en-RS",{style: 'currency', currency: 'PKR'}).format(pr)
                    return (
                        <Grid key={`subBox-${indx}`} item xs={12} md={6} > 
                            
                                <CardComp>
                                    <Heading variant="h5" sx={{ textAlign:'left'}}>
                                        {planV.name}
                                    </Heading>
                                    <Heading variant="h3" sx={{textTransform:'capitalize',  textAlign:'left'}}>
                                        {/*  */}
                                        {prTob}
                                        <Box sx={{display:'inline-block', fontSize:'clamp(1.8rem, 1vw, 2.8rem)', marginLeft:'0.5rem'}}>{(planV.currency).toUpperCase()} / {planV.interval}</Box>
                                    </Heading>
                                    {!showSubscribedButon && <CustomButton
                                        sx={{
                                            width:'fit-content',
                                            marginLeft:'1.5rem',
                                            backgroundColor:theme.palette.primary.main,
                                            color:theme.typography.body1.color
                                        }}
                                        onClick={()=> handleSubscribe(planV.id)}
                                        disabled={showSubscribedButon}
                                    >
                                        {'Subscribe'}
                                    </CustomButton>}
                                </CardComp>
                            
                        </Grid>

                    )
                })}
          </Grid>
    )
})



const SubscriptionDetails = ({priceDetails,userProfile}:{priceDetails:priceType,userProfile:UserDetails}) => {

    const router = useRouter()

    const handleUpdateSubscription = async() => {
       const {data} =  await changeSubscriptionService()
        // console.log(data)
        if(data){
            router.push(data)
        }

    }
    let prTob:number = Number((priceDetails.price).toString().substring(0,(priceDetails.price).toString().length-2))

    return (
        <Grid container spacing={2} justifyContent="center" >
            <Grid item xs={12} >
                <Heading variant="h6" sx={{textTransform:'capitalize',}} >
                You are Subscribed to our  <Box sx={{display:'inline', fontWeight:'900', fontSize:'1.6rem'}}>{priceDetails.name} </Box> plan
                </Heading>
            </Grid>   
            <Grid item xs={12}>
                <Heading variant="h2" sx={{textTransform:'capitalize'}}>
                        {(prTob)}
                        <Box sx={{display:'inline-block', fontSize:'clamp(1.8rem, 1vw, 2.8rem)', marginLeft:'0.5rem'}}>
                            {(priceDetails.currency).toUpperCase()} / {priceDetails.interval}
                        </Box>
                </Heading>
            </Grid>   
            <Grid item xs={12} mt={3}>
                <CustomButton 
                    sx={{width:'fit-content', margin:'auto'}} 
                    onClick={handleUpdateSubscription}
                >
                    Manage Subscription
                </CustomButton>
            </Grid>
        </Grid>
    )
}



const Subscription = ({plans=[]}:SubscriptionType) => {

    const {userProfile, isLoading} = useUser()
    // const [planeState] = useState(plans || [])
   
    // // console.log(plans)
    // console.log(userProfile)
    const logoutMuation = useSignOut()
    
    const handleSubscribe = async(pId:string) => {
            const {data:{id}, error} = await  subscriptionService(pId)
            //// console.log(error)
            if(process.env.NEXT_PUBLIC_STRIPE_KEY != undefined && id && error == null){
                const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)
                await stripe?.redirectToCheckout({sessionId:id})
            }

            if(error != null){
                logoutMuation.mutate()  
            }

    }


    const showSubscribedButon = !!userProfile?.is_subscribed;
    const priceDetails = plans.find((vl) => vl.interval == userProfile?.interval )
    const subscriptionPricesList = showSubscribedButon ? plans.filter((vl) => vl.interval != userProfile?.interval ) :  plans

    return (
        <>
        <Box>
            <Box 
                sx={{
                    display:'flex',
                    justifyContent:'center',
                    marginTop:'3rem',
                    marginBottom:'3rem',
                }}
            >
                <Heading
                    variant="h3"
                    headingStyle={true}
                    
                >
                   Subscription 
                </Heading>
            </Box>
            {/* <pre>{JSON.stringify(planeState,null,2)}</pre> */}
        {!isLoading && <> 
            {showSubscribedButon && priceDetails &&  <SubscriptionDetails priceDetails={ priceDetails } userProfile={userProfile}/>}

            { showSubscribedButon && 
                <Box 
                sx={{
                    display:'flex',
                    justifyContent:'center',
                    marginTop:'5rem',
                    marginBottom:'2rem',
                }}
            >
                <Heading
                    variant="h3"
                    headingStyle={true}
                    textTransform="capitalize"
                >
                    Our other Plans 
                </Heading>
            </Box> 
            }

          <SubscriptionPrices plans={subscriptionPricesList} handleSubscribe={handleSubscribe}  showSubscribedButon={showSubscribedButon}/>
          </>}
        </Box>
        </>
    )
}

export default Subscription;