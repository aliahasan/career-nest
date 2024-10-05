import { useEffect, useState } from "react";
import { secureApi } from "./useSecureApi";
import { setAllRecruiterJobs } from "@/redux/jobSlice";
import { useDispatch } from "react-redux";

const useGetAllRecruitersJob = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const getPostedJobOfRecruiter = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await secureApi.get("/jobs/get-recruiter-jobs");
        if (response.data) {
          dispatch(setAllRecruiterJobs(response?.data?.jobs));
        }
      } catch (error) {
        setError(error.message || "something went wrong");
      } finally {
        setLoading(false);
      }
    };
    getPostedJobOfRecruiter();
  }, [dispatch]);

  return { loading, error };
};

export default useGetAllRecruitersJob;
