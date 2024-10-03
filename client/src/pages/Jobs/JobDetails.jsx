import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { publicApi } from "@/hooks/usePublicApi";
import { setSingleJob } from "@/redux/jobSlice";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Briefcase, DollarSign } from "lucide-react";
import Loading from "@/myComponents/Loading";
import ApplyJobDialog from "@/myComponents/ApplyDialog";
import LoginAlert from "@/myComponents/LoginAlert";

const JobDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  useEffect(() => {
    const getSingleJob = async () => {
      try {
        const response = await publicApi.get(`/jobs/get-job/${id}`);
        dispatch(setSingleJob(response.data));
      } catch (err) {
        setError(err?.message);
      }
    };
    getSingleJob();
  }, [id, dispatch]);

  const { singleJob } = useSelector((state) => state.jobs);
  const job = singleJob?.job;
  // const userId = "66f26527cbdcdf6a5bcc0a6e";
  // const applicant = job?.applications.find((id) => id === userId);

  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!job)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 relative">
          <img
            src={job?.image || "https://via.placeholder.com/1200x400"}
            alt={job?.title}
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
            <h1 className="text-4xl font-bold text-white mb-2">{job?.title}</h1>
            <h2 className="text-2xl text-gray-200">
              {job?.company?.companyName}
            </h2>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start mb-8 space-y-6 md:space-y-0">
          <div className="grid grid-cols-2 gap-6 w-full md:w-auto md:flex-grow">
            <div className="flex items-center">
              <Briefcase className="h-6 w-6 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Job Type</p>
                <p className="font-semibold">{job?.jobType}</p>
              </div>
            </div>
            <div className="flex items-center">
              <MapPin className="h-6 w-6 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-semibold">{job?.location}</p>
              </div>
            </div>
            <div className="flex items-center">
              <DollarSign className="h-6 w-6 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Salary</p>
                <p className="font-semibold">${job?.salary}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="h-6 w-6 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Experience</p>
                <p className="font-semibold">{job?.experienceLevel} years</p>
              </div>
            </div>
          </div>
          {user ? (
            <ApplyJobDialog jobTitle={job?.title} jobId={job._id} />
          ) : (
            <Button onClick={() => setShowLoginAlert(true)}>Apply</Button>
          )}
        </div>

        <Separator className="my-8" />
        <section className="flex flex-col md:flex-row gap-x-5">
          <p className="text-gray-700 leading-relaxed">
            Posted Date : {job?.createdAt.split("T")[0]}
          </p>
        </section>
        <Separator className="my-8" />
        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Job Description</h3>
          <p className="text-gray-700 leading-relaxed">{job?.description}</p>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Requirements</h3>
          <div className="flex flex-wrap gap-3">
            {job?.requirements?.map((req, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-sm py-2 px-4"
              >
                {req}
              </Badge>
            ))}
          </div>
        </section>

        <Separator className="my-8" />

        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">About the Company</h3>
          <p className="text-gray-700 leading-relaxed">
            {job?.company?.description}
          </p>
        </section>
      </div>
      <LoginAlert isOpen={showLoginAlert} setIsOpen={setShowLoginAlert} />
    </div>
  );
};

export default JobDetails;
