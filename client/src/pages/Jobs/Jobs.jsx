import FilterJob from "@/myComponents/FilterJob";

import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import AllJob from "./AllJob";

const Jobs = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((state) => state.jobs);
  return (
    <div className="mt-5 flex flex-col sm:flex-row">
      {/* Filter Section */}
      <div className="w-full sm:w-[20%] lg:w-[20%] mb-4 sm:mb-0 ">
        <FilterJob />
      </div>
      {/* Jobs Section */}
      <div className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-1">
          {allJobs &&
            allJobs.map((job, index) => <AllJob key={index} job={job} />)}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
