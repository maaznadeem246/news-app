const Redis = require("ioredis");


const getRedistUrl = () => {
    if(process.env.REDIS_URL){
        return  process.env.REDIS_URL
    }

    throw new Error("Redis_url is not definec")

}


export const redis = new Redis(getRedistUrl(),{
    // lazyConnect:true,
    // reconnectOnError(err) {
       
    //     return true
    //   },
    // maxRetriesPerRequest`:30,
    // reconnectOnError(err:Error) {
    //     console.log("err----------")
    //     console.log(err)
    //     const targetError = "MaxRetriesPerRequestError";
    //     if (err.message.includes(targetError)) {
    //       // Only reconnect when the error contains "READONLY"
    //       return 2; // or `return 1;`
    //     }
    //     return false
    //   },
})