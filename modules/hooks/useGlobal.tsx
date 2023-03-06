import { GlobalContext } from "@/components/context/useGlobalProvider";
import { useContext } from "react";







export const useGlobalState = () => {
    const context = useContext(GlobalContext);
    if (context === undefined) {
      throw new Error(`useGlobalState must be used within a MyUserContextProvider.`);
    }
    return context;
  };