import axios, { AxiosError } from 'axios';

export const axiosInstance = axios.create({

 });
// For GET requests
axiosInstance.interceptors.request.use(
   (req) => {
      // Add configurations here
      return req;
   },
   (err) => {
      return Promise.reject(err);
   }
);

// For POST requests
axiosInstance.interceptors.response.use(
   (res) => {
      // Add configurations here
        if (res.status === 201) {
            console.log('Posted Successfully');
        }
        if (res.status === 400) {
            console.log('error 1');
        }
      return res;
   },
   (err:AxiosError) => {
    console.log('error 2 out');
    if (err.status === 400) {
        console.log('error 2');
    }
      return Promise.reject(err);
   }
);