import AllJob from "../Jobs/AllJob";

const randomJobs = [1, 2, 3, 4];
const Browse = () => {
  return (
    <div className="mt-5">
      <div>
        <h1>Search Results : {randomJobs.length}</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-1 my-5">
        {randomJobs?.map((job, index) => (
          <AllJob key={index}></AllJob>
        ))}
      </div>
    </div>
  );
};

export default Browse;
