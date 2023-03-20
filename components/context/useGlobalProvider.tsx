
import { keyable } from "@/types";
import { FC, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { createContext } from "react";



  
interface ProviderType {
    children:ReactNode
}


export interface GlobalContextType1  {
  activeTag:string,
  newsModal:boolean|string,
}
export interface GlobalContextType2  {

  handleTagOption:(opt:string) => void,
  handleNewsModalOpen : (id?:string) => void,
  handleNewsModalClose : () => void,
}

export type GlobalContextTypeForState = GlobalContextType1


export const initialData = {
  activeTag:'Latest News',
  newsModal:false,
  handleNewsModalOpen : () => {},
  handleNewsModalClose : () => {},
  handleTagOption: (opt:string) => {} ,
}


export const GlobalContext = createContext<(GlobalContextType1 &GlobalContextType2) | undefined>(initialData);







export const GlobalProvider : FC<ProviderType>  = (props) => {
   
    const [state,setState] = useState<GlobalContextTypeForState>({
        ...initialData
    });
    // const data = useGlobalStateProvider()
    const [newsModal, setNewsModal] = useState<boolean|string>(false)

    const handleTagOption = (opt:string) => {
      if(state.activeTag != opt){
        setState((props)=>({
          ...props,
          activeTag:opt
        }))
      }
    }


    const handleNewsModalOpen = (id?:string) => {
      document.documentElement.style.overflow = 'hidden ';
      if(id){
        setNewsModal(id)
      }else{
        setNewsModal(true)
      }
      
  }
  const handleNewsModalClose = () => {
    document.documentElement.style.overflow  = 'unset';
    setNewsModal(false)
  }
  const handleToggle = () => {
    setNewsModal((props)=> !props)
  }


    
      const data = {
        // accessToken,
        // user:_user,
        // userDetails,
        // isLoading:  isLoadingData,
        // subscription.
        ...state,
        newsModal,
        handleNewsModalOpen,
        handleNewsModalClose,
        handleTagOption:handleTagOption
      };
    
    
    
        
    
  
     

    const ctxData = {
        ...data
    } 

    return <GlobalContext.Provider value={ctxData} {...props} />
}




