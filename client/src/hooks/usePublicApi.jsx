import axios from "axios";
export const publicApi = axios.create({
  baseURL:`${import.meta.env.VITE_API_URL}/api/v1`,
})
const usePublicApi = () => {
  return publicApi;
}
export default usePublicApi;