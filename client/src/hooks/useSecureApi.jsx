import { logout } from "@/redux/firebaseUser";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const secureApi = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});
const useSecureApi = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const interceptor = secureApi.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          dispatch(logout())
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
    return () => secureApi.interceptors.response.eject(interceptor);
  }, [dispatch, navigate]);

  return secureApi;
};
export default useSecureApi;
