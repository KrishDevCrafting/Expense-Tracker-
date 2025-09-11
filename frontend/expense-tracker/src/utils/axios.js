import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



// Response Interceptor

axiosInstance.interceptors.response.use(    
(response)=>{
    return response
},
(error)=>{
    // Handle common errors globally


if(error.response){
    if(error.response.status === 401 ){
        // Redirect to login page
        window.localStorage.href = "/login"
    }else if (error.response) 
}

}

)
