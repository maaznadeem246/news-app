import { keyable } from "@/types"
import axios from "axios"





export const subscriptionService = async (planId:string) =>  {
    try{
        const {data} = await axios.get(`/api/subscription/${planId}`)
        return {
            data,
            error:null
        }
    }
    catch(er){
        // console.log(er)
        return {
            error:'Error',
            data:{id:null},
        }
    }


}

