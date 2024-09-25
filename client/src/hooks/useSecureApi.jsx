import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const secureApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
})
const useSecureApi = () => {
  const navigate = useNavigate()
  useEffect(() =>{
    secureApi.interceptors.response.use(
      (response) => response,
      async (error) => {
        if(error.response.status === 401 || error.response.status === 403){
          // await logout();
          navigate("/login")
        }
        return Promise.reject(error);
      }
    )
  }, [navigate,])
  return secureApi;
}
export default useSecureApi;