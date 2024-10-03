import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { publicApi } from "./usePublicApi";
import { setAllJobs } from "@/redux/jobSlice";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getAllJobs = async () => {
      try {
        const response = await publicApi.get("/jobs/get-jobs");
        if (response.data) {
          dispatch(setAllJobs(response.data.jobs));
        }
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      }
    };
    getAllJobs()
  }, [dispatch]);
};

export default useGetAllJobs;
