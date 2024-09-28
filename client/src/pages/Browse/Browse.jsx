const randomJobs = [1, 2, 3, 4];
const Browse = () => {
  return (
    <div>
      <h1>Search Results{randomJobs.length}</h1>
      <div>
        {randomJobs.map((job, index) => (
          <div key={index}>
            <h1>Job {job}</h1>
          </div>
        ))}
      </div>
     
   
     
    </div>
  );
};

export default Browse;
