



import { UserDetails, keyable } from "@/types";

import { useRouter } from "next/router";
import { FC, Provider, ProviderProps, ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { Subscription } from "react-hook-form/dist/utils/createSubject";
import { nullable } from "zod";

import {
    useUser as useSupaUser,
    useSessionContext,
    User
  } from '@supabase/auth-helpers-react';

  
interface ProviderType {
    children:ReactNode
}

export const initialData ={

}

export interface ContextType  {
    accessToken: string | null;
    user: User | null;
    userDetails: UserDetails | null;
    isLoading: boolean;
  }
  
  

const UserContext = createContext<ContextType| undefined>(undefined);

export interface Props {
    [propName: string]: any;
  }

export const UserProvider : FC<ProviderType>  = (props: Props) => {

    // const data = useUserProvider()

    // // console.log(data)
    const {
        session,
        isLoading: isLoadingUser,
        supabaseClient: supabase
      } = useSessionContext();
    
      const user = useSupaUser();
      const accessToken = session?.access_token ?? null;
      const [isLoadingData, setIsloadingData] = useState(false);
      const [_user, setUser] = useState<UserDetails | null>(null);
      const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
      const [subscription, setSubscription] = useState<Subscription | null>(null);
    
    
      const getUserDetails = () => supabase.from('users').select('*').single();
    
    
      useEffect(() => {
        console.log(user)
        if (user && !isLoadingData && !userDetails && !subscription) {
          setIsloadingData(true);
         
          Promise.allSettled([getUserDetails()]).then(
            (results) => {
              const userDetailsPromise = results[0];
              // const subscriptionPromise = results[1];
    
              if (userDetailsPromise.status === 'fulfilled')
                setUserDetails(userDetailsPromise.value.data as UserDetails);
                setUser(_user)
    
              setIsloadingData(false);
            }
          );
        } else if (!user && !isLoadingUser && !isLoadingData) {
          setUserDetails(null);
          // setSubscription(null);
        }
        
      }, [user, isLoadingUser]);
    
      const data = {
        accessToken,
        user:_user,
        userDetails,
        isLoading:  isLoadingData,
        subscription
      };
    
    
      // const statusRef = useRef<string|null>(null)
      // // const signInMutaion = useSignIn() 
      // const router = useRouter();
      // const {redirectedFrom} = router.query 
      // const [data, setData] = useState<ContextType>({
      //   user:null,
      //   session:null,
      //   loading:true,
      // })
    
        
    
      // const setUserData = async(session:keyable) => {
      //   setData((props) => ({
      //     ...props,
      //     loading:true,
      //   }))
      //   const userD = await getUserData()
      //   // console.log('userD1')
      //   // console.log(userD)
      //   if(userD != null){
      //     // console.log('userD2')
      //     setData((props) => ({
      //       ...props,
      //       session:session,
      //       ...userD,
      //       loading:false,
      //     }))
      //   }
      // }
    
      // useEffect(()=>{
      //   // setUserData('init')
      //   // if(statusRef.current){
      //   supabase.auth.getSession().then(({data:{session}})=>{
      //     setUserData({session})
      //     if(session){
      //       const maxAge = 100 * 365 * 24 * 60 * 60 // 100 years, never expires
      //       document.cookie = `my-access-token=${session?.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
      //       document.cookie = `my-refresh-token=${session?.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
      //     }
    
      //   });
    
      //   // }
    
    
      // },[statusRef])
    
    //   useEffect(() => {
    
       
    
       
    
    //     const { data: authListener } =  supabase.auth.onAuthStateChange(async (_event, session) => {
        
    //       // // console.log('mounter 1')
    //       // // console.log(_event != UserStatus)
    //       // if(_event != statusRef.current){
    //         // // console.log('mounter 2')
    //         // // console.log(_event)
    //         // // console.log(session)
    
             
    //       console.log(_event)
    //           if (_event === 'SIGNED_OUT' || _event === 'USER_DELETED') {
    //             // delete cookies on sign out
    //             const expires = new Date(0).toUTCString()
    //             document.cookie = `my-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`
    //             document.cookie = `my-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`
    //           } else if ((_event === 'SIGNED_IN' || _event === 'TOKEN_REFRESHED') && session) {
    //             const maxAge = 100 * 365 * 24 * 60 * 60 // 100 years, never expires
    //             document.cookie = `my-access-token=${session.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
    //             document.cookie = `my-refresh-token=${session.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
                
    //             // if(redirectedFrom && typeof redirectedFrom == 'string'){
    
    //             //   router.push(redirectedFrom)        
    //             //     }else{
    //             //       router.push('/')     
    //             //     }
    //           }
    
    //           // setUserData({session})
    
    
    
    //           // statusRef.current = _event
    //          //  await setUserStatus(_event)
            
    //       // }
      
      
    //     })
    
    //     return () => {
    //       authListener?.subscription.unsubscribe();
    //     };
    
    //   }, [])
    
    
      
      // useEffect(()=>{
      //   // console.log(signInMutaion.isLoading)
      // },[signInMutaion.isLoading])
    
        
    
      // useEffect(()=>{
      //   // setUserData('init')
      //   // if(statusRef.current){
      //     setUserData(statusRef.current)
      //   // }
    
    
      // },[statusRef])
    
    
    
        
    
  
     

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