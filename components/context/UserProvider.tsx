import { UserDetails, keyable } from "@/types";
import { Router, useRouter } from "next/router";
import { FC, Provider, ProviderProps, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { createContext } from "react";
import { Subscription } from "react-hook-form/dist/utils/createSubject";


import {
    User,
    Session
  } from '@supabase/auth-helpers-react';
import { getUserProfileData } from "@/modules/services/user";
import { supabaseClient } from "@/modules/supabase";

  
interface ProviderType {
    children:ReactNode
}

export const initialData ={

}

export interface ContextType  {
    session:Session | null;
    accessToken: string | null;
    user: User | null;
    userProfile: UserDetails | null;
    isLoading: boolean;
    isRouteLoading?:boolean;
  }
  
  

const UserContext = createContext<ContextType| undefined>(undefined);

export interface Props {
    [propName: string]: any;
  }

export const UserProvider : FC<ProviderType>  = (props: Props) => {
      const statusRef = useRef<string|null>(null)
    const [state,setState] = useState<ContextType>({
      session:null,
      accessToken:null,
      user:null,
      userProfile:null,
      isLoading:true,
      isRouteLoading:true
    });
    // const data = useUserProvider()


    const router = useRouter()

    useEffect(() => {
      setState((props)=>({
        ...props,
        isLoading:true,
      }))
     supabaseClient.auth.getSession().then(async({data})=>{
   
      if(data.session){
        statusRef.current = 'SIGNED_IN'
        const userDetails = await getUserProfileData(data.session?.user.id);
        setState((props)=>({  
            ...props,
            accessToken:data?.session?.access_token ?? null,
            session:data.session, 
            user: data?.session?.user ?? null ,
            userProfile: userDetails ?? null,
            isLoading:false,
          }))
      }else{
        throw Error("Session Expired")
      }

     }).catch((er)=>{
      console.log(er)
      setState((props)=>({  
        ...props,
        accessToken:null,
        session:null, 
        user: null ,
        userProfile: null,
        isLoading:false,
      }))
     })

  }, [])  


  useEffect(()=>{

        const { data: authListener } =  supabaseClient.auth.onAuthStateChange(async (_event, session) => {
           if(_event != statusRef.current){
            console.log(_event)
            console.log(session)
              if (_event === 'SIGNED_OUT' || _event === 'USER_DELETED') { 

                setState((props)=>({  
                  ...props,
                  accessToken:null,
                  session:null, 
                  user: null ,
                  userProfile: null,
                  isLoading:false,
                }))



              } else if ((_event === 'SIGNED_IN' || _event === 'TOKEN_REFRESHED') && session) {
                // setState((props)=>({  
                //   ...props,
                //   isLoading:true,
                // }))
                const userDetails = await getUserProfileData(session?.user.id);
                setState((props)=>({  
                    ...props,
                    accessToken:session?.access_token ?? null,
                    session:session, 
                    user: session?.user ?? null ,
                    userProfile: userDetails ?? null,
                    isLoading:false,
                  }))
                  router.push('/')
              }
    
     
    
              statusRef.current = _event
             
          }
      
      
        })

        return () => {
          authListener?.subscription.unsubscribe();
        };
  },[])



  // useEffect(()=>{
  //   Router.events.on("routeChangeStart", (url)=>{
  //     console.log('route is changing')
  //     }) 
  //     Router.events.on("routeChangeComplete", (url)=>{
  //       console.log('route is complete')
  //       if(state.isRouteLoading){
  //         setState((props)=>({  
  //           ...props,
  //           isRouteLoading:false,
  //         }))
  //       }     

  //     });
  //     Router.events.on("routeChangeError", (err) =>{
  //       console.log('route is error')
  //     });
  // },[])

    
      const data = {
        // accessToken,
        // user:_user,
        // userDetails,
        // isLoading:  isLoadingData,
        // subscription.
        ...state
      };
    
    
    
        
    
  
     

    const ctxData = {
        ...data
    } 

    return <UserContext.Provider value={ctxData} {...props} />
}




export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
      throw new Error(`useUser must be used within a MyUserContextProvider.`);
    }
    return context;
  };