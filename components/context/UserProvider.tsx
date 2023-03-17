import { UserDetails} from "@/types";
import { Router, useRouter } from "next/router";
import { FC, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { createContext } from "react";

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
      isRouteLoading:false
    });
    // const data = useUserProvider()


    const router = useRouter()
    const {redirectedFrom} = router.query
    // useEffect(()=>{
    //   supabaseClient.auth.stopAutoRefresh()
    // },[])
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
      //console.log(er)
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
        
              if (_event === 'SIGNED_OUT' || _event === 'USER_DELETED') { 

                const expires = new Date(0).toUTCString()
             
                document.cookie = `my-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`
                document.cookie = `my-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`

                setState((props)=>({  
                  ...props,
                  accessToken:null,
                  session:null, 
                  user: null ,
                  userProfile: null,
                  isLoading:false,
                }))



              } else if ((_event === 'SIGNED_IN' || _event === 'TOKEN_REFRESHED') && session) {
           
                const maxAge = 60 * 60 * 1000
   
                document.cookie = `my-access-token=${session.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
                document.cookie = `my-refresh-token=${session.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`

                const userDetails = await getUserProfileData(session?.user.id);
                setState((props)=>({  
                    ...props,
                    accessToken:session?.access_token ?? null,
                    session:session, 
                    user: session?.user ?? null ,
                    userProfile: userDetails ?? null,
                    isLoading:false,
                  }))

              }

              if(redirectedFrom && typeof redirectedFrom == 'string'){
                router.push(redirectedFrom)                  
              }else{
                router.push('/') 
              }
    
              statusRef.current = _event
             
          }
      
      
        })

        return () => {
          authListener?.subscription.unsubscribe();
        };
  },[])


  useEffect(()=>{
    
    if(state.user){
      const profileSubs =  supabaseClient
                            .channel('changes')
                            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'users_profile',filter:`id=in.(${state.user.id})` }, payload => {
                              // console.log('Change received!', payload)
                              // console.log(state.userProfile)
                              let  userProfile = state.userProfile
                              if(userProfile){
                                userProfile = {
                                  ...userProfile,
                                  ...payload.new
                                }
                                // console.log(userProfile)
                                setState((props)=>({  
                                  ...props,
                                  userProfile
                                }))
                              }
  
                                  
                            })
                            .subscribe()
      
      return () =>{  supabaseClient.removeChannel(profileSubs) }
    }               
  },[state.user])


  const handleRouteChangeStart = () => {
    // console.log('route is changing')
    setState((props)=>({  
      ...props,
      isRouteLoading:true,
    }))
  }

  
  const handleRouteChangeComplete = () => {
    // console.log('route is complete')
      
          setState((props)=>({  
            ...props,
            isRouteLoading:false,
          }))
            
  }

  
  const handleRouteChangeError = () => {
    // console.log('route is error')
   
      setState((props)=>({  
        ...props,
        isRouteLoading:false,
      }))
      
  }
  useEffect(()=>{
    Router.events.on("routeChangeStart", handleRouteChangeStart) 
      Router.events.on("routeChangeComplete", handleRouteChangeComplete);
      Router.events.on("routeChangeError", handleRouteChangeError);

      return () => {
        Router.events.off("routeChangeStart", handleRouteChangeStart) 
        Router.events.off("routeChangeComplete", handleRouteChangeComplete);
        Router.events.off("routeChangeError", handleRouteChangeError);
      }
  },[])

    
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