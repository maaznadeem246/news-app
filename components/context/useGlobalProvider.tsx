
import { keyable } from "@/types";
import { FC, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { createContext } from "react";



  
interface ProviderType {
    children:ReactNode
}

export const initialData = {
  activeTag:'Latest News',
  handleTagOption: (opt:string) => {} ,
}

export interface GlobalContextType  {
    activeTag:string,
    handleTagOption:(opt:string) => void
  }
  
export type GlobalContextTypeForState = Omit<GlobalContextType,'handleTagOption'>  

export const GlobalContext = createContext<GlobalContextType| undefined>(initialData);



export interface Props {
    [propName: string]: any;
  }




export const GlobalProvider : FC<ProviderType>  = (props: Props) => {
   
    const [state,setState] = useState<GlobalContextTypeForState>({
        ...initialData
    });
    // const data = useGlobalStateProvider()


    const handleTagOption = (opt:string) => {
      if(state.activeTag != opt){
        setState((props)=>({
          ...props,
          activeTag:opt
        }))
      }
    }


    
      const data = {
        // accessToken,
        // user:_user,
        // userDetails,
        // isLoading:  isLoadingData,
        // subscription.
        ...state,
        handleTagOption:handleTagOption
      };
    
    
    
        
    
  
     

    const ctxData = {
        ...data
    } 

    return <GlobalContext.Provider value={ctxData} {...props} />
}




