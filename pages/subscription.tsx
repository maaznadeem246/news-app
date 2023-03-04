import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/home.module.css'
import "@fontsource/nunito"
import { GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from 'next'
import initStripe from "stripe";
import { keyable } from '@/types'
import { promise } from 'zod'
import Subscription from '@/components/subscription'
import getUserByCookie from '@/utils/getUserByCookie'


const inter = Inter({ subsets: ['latin'] })

export interface SubscriptionType {
  plans: Array<keyable>
}

const SubscriptionPage = (props:SubscriptionType) => {
  const {plans} = props

  return (
    <>
      <Head>
        <title>News App</title>
        <meta name="description" content="Generated by News App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>     
          <Subscription plans={plans} />
      </main>
    </>
  )
}


export const getServerSideProps = async (context:GetServerSidePropsContext) => {
 
  const data = await getUserByCookie(context)

  if(data == null){
    return{
      redirect:{
        permanent:false,
        destination:'/signin'
      },
      props:{}
    }
  }

//@ts-ignore
const stripe = initStripe(process.env.STRIPE_SECRET_KEY)

const {data:prices} = await stripe.prices.list()

 const plans =  await Promise.all(prices.map(async(price:keyable) => {
    const product = await stripe.products.retrieve(price.product)
    return {
      id:price.id,
      name:product.name,
      price:price.unit_amount,
      currency:price.currency
    }
  }))

  return {
    props:{plans}
  }
}





export default SubscriptionPage;