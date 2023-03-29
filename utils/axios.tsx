import { supabase } from '@/lib/supabase';
import axios, { AxiosError } from 'axios';

export const axiosInstance = axios.create({

 });
// For GET requests
axiosInstance.interceptors.request.use(
   (req) => {
      // Add configurations herez
      // supabase.auth.getSession().then((data) => {
      //    console.log(data)         
      // })

      // if(authCookie){
      //    req.headers.set('Cookies',`supabase-auth-token=${authCookie}`)
      // }

      return req;
   },
   (err) => {
      console.log(err)
      return Promise.reject(err);
   }
);

// For POST requests
axiosInstance.interceptors.response.use(
   (res) => {
      // Add configurations here
        if (res.status === 201) {
            //console.log('Posted Successfully');
        }
        if (res.status === 401) {
            //console.log('error 1');
        }
      return res;
   },
   (err:AxiosError) => {
 
    if (err?.response?.status === 401) {
      //   console.log(err);
      window.location.replace('/')
      console.log(err.response?.statusText);
      
      }

      return Promise.reject(err);
   }
);