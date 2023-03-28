import {Redis} from 'ioredis'


const getRedistUrl = () => {
    if(process.env.REDIS_URL){
        return  process.env.REDIS_URL
    }

    throw new Error("Redis_url is not definec")

}


export const redis = new Redis(getRedistUrl(),{
    tls: {
    rejectUnauthorized: false
  }}
  )