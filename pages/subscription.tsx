import Head from 'next/head'
import { Inter } from '@next/font/google'
import "@fontsource/nunito"
import { GetServerSidePropsContext,} from 'next'
import initStripe from "stripe";
import { keyable } from '@/types'
import Subscription from '@/components/subscription'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';



const inter = Inter({ subsets: ['latin'] })

export interface priceType { 
  id:string,
  name:string,
  price:number,
  interval:string,
  currency:string
}

export interface SubscriptionType {
  plans:Array<priceType>
}

const SubscriptionPage = (props:SubscriptionType) => {
  const {plans} = props

  return (
    <>
      <Head>
        <title>Subscription</title>
        <meta name="description" content="Subscription" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>     
          <Subscription plans={plans} />
      </main>
    </>
  )
}


export const getServerSideProps = async (ctx:GetServerSidePropsContext) => {
 
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session }
  } = await supabase.auth.getSession();
  //console.log(session)
  const {data:users} = await supabase.from("users_profile").select("*").eq('id',session?.user.id).single()
  // console.log(users)
  if (!session || !users?.is_subscribed )
    return {
      redirect: {
        destination: '/signin',
        permanent: false
      }
    };


//@ts-ignore
const stripe = initStripe(process.env.STRIPE_SECRET_KEY)

const {data:prices} = await stripe.prices.list()

 const plans =  await Promise.all(prices.map(async(price:keyable) => {
    // console.log(price)
    const product = await stripe.products.retrieve(price.product)
    return {
      id:price.id,
      name:product.name,
      price:price.unit_amount,
      interval:price.recurring.interval,
      currency:price.currency
    }
  }))

  return {
    props:{plans}
  }
}





export default SubscriptionPage;