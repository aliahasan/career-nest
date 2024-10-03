import { publicApi } from "@/hooks/usePublicApi";

// Fetch all jobs from the database
export const getAllJobs = async () => {
  const fetchJobs = publicApi.get("/get-jobs");
  return fetchJobs.then((res) => res.data);
};
