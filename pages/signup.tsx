
import Head from 'next/head'
import Image from 'next/image'
// import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import "@fontsource/nunito"
import CardComp from '@/components/cards'
import { Container } from '@mui/material'
import SignUp from '@/components/auth/signUp'


// const inter = Inter({ subsets: ['latin'] })

export default function SignUpPage() {
 

  return (
    <>
      <Head>
        <title>Sig Up</title>
        <meta name="description" content="Generated by News App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        
      <Container 
            sx={{
                display:'flex',
                justifyContent:'center',
               
            }}
        >
            <CardComp 
                sx={{
                  width:'100%'  
                }}
            >

                        <SignUp  /> 

               
            </CardComp>   
        </Container>

      </main>
    </>
  )
}
