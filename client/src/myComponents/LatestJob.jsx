import { useSelector } from "react-redux";
import LatestJobCard from "./LatestJobCard";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const LatestJob = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((state) => state.jobs);

  return (
    <div className="">
      <h1 className="text-4xl px-2 md:px-0 text-navy font-bold py-6">
        Latest & <span>Trending Jobs</span>
      </h1>
      {/* multiple jobs cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5  px-2 lg:px-0">
        {allJobs.length > 0 &&
          allJobs
            .slice(0, 6)
            .map((job, index) => <LatestJobCard key={index} job={job} />)}
      </div>
    </div>
  );
};

export default LatestJob;
