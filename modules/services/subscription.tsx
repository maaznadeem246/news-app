import { keyable } from "@/types"
import { axiosInstance } from "@/utils/axios"
import  { AxiosError } from "axios"





export const subscriptionService = async (planId:string) =>  {
    try{
        const {data} = await axiosInstance.post(`/api/subscription/${planId}`)
        return {
            data,
            error:null
        }
    }
    catch(error){
        //// console.log(error)
        let message : string|undefined = 'Unknown Error'
        let status : number|undefined = undefined

        if (error instanceof AxiosError){ 
            message = error.response?.statusText
            status = error.response?.status
        }
        return {
            error:{
                status,
                message
            },
            data:{id:null},
        }
    }


}



export const changeSubscriptionService = async () =>  {
    try{
        const {data} = await axiosInstance.get(`/api/portal`)
        return {
            data:data.url,
            error:null
        }
    }
    catch(error){
        // console.log(error)
        let message : string|undefined = 'Unknown Error'
        let status : number|undefined = undefined

        if (error instanceof AxiosError){ 
            message = error.response?.statusText
            status = error.response?.status
        }
        return {
            error:{
                status,
                message
            },
            data:null,
        }
    }


}
