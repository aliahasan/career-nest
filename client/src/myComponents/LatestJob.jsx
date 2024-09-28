import LatestJobCard from "./LatestJobCard";

const jobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJob = () => {
  return (
    <div className="">
      <h1 className="text-4xl px-2 md:px-0 text-garish font-bold">
        Latest & <span>Trending Jobs</span>
      </h1>
      {/* multiple jobs cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5  px-2 lg:px-0">
        {jobs?.slice(0, 6).map((job, index) => (
          <LatestJobCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default LatestJob;
