import { UserDetails} from "@/types";
import { Router, useRouter } from "next/router";
import { FC, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { createContext } from "react";

import {
    User,
    Session,
    useSupabaseClient,
    useSession,
    useUser as useUserSup,
  } from '@supabase/auth-helpers-react';
import { getUserProfileData } from "@/modules/services/user";


  
interface ProviderType {
    children:ReactNode
}

export const initialData ={

}

export interface ContextType  {
    session:Session | null,
    user:User | null,
    userProfile: UserDetails | null;
    isLoading: boolean;
    isRouteLoading?:boolean;
  }

  type UserContextState = Omit<ContextType,'session'|'user'>
  

const UserContext = createContext<ContextType| undefined>(undefined);

export interface Props {
    [propName: string]: any;
  }

export const UserProvider : FC<ProviderType>  = (props: Props) => {
      const statusRef = useRef<string|null>(null)
    const [state,setState] = useState<UserContextState>({
      userProfile:null,
      isLoading:true,
      isRouteLoading:false
    });

    const supabaseClient = useSupabaseClient()
    // const data = useUserProvider()

    // supabaseClient.auth.stopAutoRefresh()



    const router = useRouter()
             const {redirectedFrom} = router.query

    const session = useSession()
    const user = useUserSup()
  
    // useEffect(() => {
    //   if(user != null && state.userProfile == null){
    //     // console.log(session)      
       

    //     }
    // },[state.userProfile,user])
    
    // useEffect(()=>{
    //   if(user == null && !(router.pathname.startsWith('/signup') || router.pathname.startsWith('/signin'))){
    //     router.push(router.pathname.startsWith('/signup') ? '/signup' : '/signin')       
    //   }
      
    // },[user])



    useEffect(()=>{

        if( statusRef.current == 'INITIAL_SESSION' || statusRef.current === 'SIGNED_IN'){
          if(session){
            if(state.userProfile == null ){
               getUserProfileData(supabaseClient,session?.user.id).then((async (data) => {
                // console.log(user)
                if(!data){
                 await supabaseClient.auth.refreshSession()
                  router.reload()
                } 
                // if(data== null){
                //   throw Error('Data is null')
                // }
                 setState((props)=>({  
                  ...props,
                  userProfile: data ?? null,
                  isLoading:false,
                }))
                

              })).catch((er)=>{
                // console.log(er)
                router.reload()
              })    
            }
            
            if(redirectedFrom && typeof redirectedFrom == 'string'){
              router.push(redirectedFrom)                  
            }else{
              if(statusRef.current === 'SIGNED_IN' && (router.pathname.startsWith('/signup') || router.pathname.startsWith('/signin'))){
                router.push('/')
              }

            }                  
          }else{
            setState((props)=>({  
              ...props,
              userProfile: null,
              isLoading:false,
            }))
          }

         
    }
    
    if (statusRef.current === 'SIGNED_OUT'){
      
        router.reload()
        // setState((props)=>({  
        //   ...props,
        //   userProfile: null,
        //   isLoading:false,
        // }))
      }

    
    },[statusRef.current])
    


  useEffect(()=>{

        const { data: authListener } =  supabaseClient.auth.onAuthStateChange(async (_event, session) => {
          // console.log(statusRef.current)
          // console.log('_event')
          // console.log(_event)
          // console.log(session)
          // console.log(state)



          statusRef.current = _event;
              

        //       }   
    
      
      
        })

        return () => {
          authListener?.subscription.unsubscribe();
        };
  },[])
  

  useEffect(()=>{
    
    if(user){
      const profileSubs =  supabaseClient
                            .channel('changes')
                            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'users_profile',filter:`id=in.(${user.id})` }, payload => {
                              // // console.log('Change received!', payload)
                              // // console.log(state.userProfile)
                              let  userProfile = state.userProfile
                              if(userProfile){
                                userProfile = {
                                  ...userProfile,
                                  ...payload.new
                                }
                                // // console.log(userProfile)
                                setState((props)=>({  
                                  ...props,
                                  userProfile
                                }))
                              }
  
                                  
                            })
                            .subscribe()
      
      return () =>{  supabaseClient.removeChannel(profileSubs) }
    }               
  },[user])


  const handleRouteChangeStart = () => {
    // // console.log('route is changing')
    setState((props)=>({  
      ...props,
      isRouteLoading:true,
    }))
  }

  
  const handleRouteChangeComplete = () => {
    // // console.log('route is complete')
      
          setState((props)=>({  
            ...props,
            isRouteLoading:false,
          }))
            
  }

  
  const handleRouteChangeError = () => {
    // // console.log('route is error')
   
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
        
        ...state,
        session,
        user,
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
















    // useEffect(()=>{

  //       const { data: authListener } =  supabaseClient.auth.onAuthStateChange(async (_event, session) => {
  //         // console.log(statusRef.current)
  //         // console.log('_event')
  //         // console.log(_event)
  //         // console.log(session)
  //         const {redirectedFrom} = router.query       


  //          if(_event != statusRef.current){
  //           if ((_event === 'SIGNED_IN' || _event == 'INITIAL_SESSION') && session) {
  //             await getUserProfileData(supabaseClient,data.session?.user.id).then((data => {
  //             // console.log(data)
  //             setState((props)=>({  
  //               ...props,
  //               session:session, 
  //               user: session?.user ?? null ,
  //               userProfile: data ?? null,
  //               isLoading:false,
  //             }))
  
  //       }));
  //         // console.log('redirectedFrom')
  //         // console.log(redirectedFrom)
  //         if(_event === 'SIGNED_IN' ){
  //           if(redirectedFrom && typeof redirectedFrom == 'string'){
  //             router.push(redirectedFrom)                  
  //           }else{
  //             router.push('/') 
  //           }
  //         }

  //         } else if (_event === 'SIGNED_OUT' || _event === 'USER_DELETED' || ( _event == 'INITIAL_SESSION' && session == null)) { 
  //           if( _event != 'INITIAL_SESSION'){
  //             router.reload()
  //           }else{
  //             setState((props)=>({  
  //               ...props,
  //               session:null, 
  //               user:  null ,
  //               userProfile: null,
  //               isLoading:false,
  //             }))
              

  //           }


              

  //             }   
    
  //             statusRef.current = _event
             
  //         }
      
      
  //       })

  //       return () => {
  //         authListener?.subscription.unsubscribe();
  //       };
  // },[])