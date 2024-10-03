import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { timeAgo } from "@/utils/helper";
import { Briefcase, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const AllJob = ({ job }) => {
  console.log(job);
  return (
    <div>
      <Card className="w-full max-w-xl mx-auto hover:shadow-md transition-shadow duration-300">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <img
                  src={
                    job?.company?.companyLogo ||
                    "/placeholder.svg?height=48&width=48"
                  }
                  alt={`${job?.company} logo`}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{job?.title}</h3>
                <p className="text-sm text-gray-500">
                  {job?.company?.companyName}
                </p>
              </div>
            </div>
            <Badge
              variant={job?.type === "Full-time" ? "default" : "secondary"}
            >
              {job.jobType}
            </Badge>
          </div>
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="w-4 h-4 mr-2" />
              {job?.location}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Briefcase className="w-4 h-4 mr-2" /> Experience :
              <span className="px-2">{job?.experienceLevel}</span>
              year
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-2" />
              {timeAgo(job?.createdAt)}
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">{job?.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center bg-gray-50 py-5">
          <Button
            variant="outline"
            className="text-blue-600 hover:text-blue-800"
          >
            Save for later
          </Button>
          <Link to={`/job-details/${job._id}`}>
            <Button>See details</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AllJob;
