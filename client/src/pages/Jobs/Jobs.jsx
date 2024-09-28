import FilterJob from "@/myComponents/FilterJob";
import AllJob from "./AllJob";

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];
const Jobs = () => {
  return (
    <div className="mt-5 flex flex-col sm:flex-row">
      {/* Filter Section */}
      <div className="w-full sm:w-[20%] lg:w-[20%] mb-4 sm:mb-0 ">
        <FilterJob />
      </div>
      {/* Jobs Section */}
      <div className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-1">
          {jobsArray.map((job, index) => (
            <AllJob key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
