import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Badge,
  Bookmark,
  Briefcase,
  Clock,
  DollarSign,
  MapPin,
} from "lucide-react";

const AllJob = ({ job }) => {
  return (
    <div>
      <Card className="w-full max-w-xl mx-auto hover:shadow-md transition-shadow duration-300">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <img
                  src={
                    job?.companyLogo || "/placeholder.svg?height=48&width=48"
                  }
                  alt={`${job?.company} logo`}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Job Title</h3>
                <p className="text-sm text-gray-500">Company Name</p>
              </div>
            </div>
            <Badge
              variant={job?.type === "Full-time" ? "default" : "secondary"}
            >
              Job Type
            </Badge>
          </div>
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="w-4 h-4 mr-2" />
              Bangladesh
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Briefcase className="w-4 h-4 mr-2" />
              {job?.experience}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-2" />
              {job?.postedDate}
            </div>
            <div className="flex items-center text-sm font-medium text-green-600">
              <DollarSign className="w-4 h-4 mr-2" />
              {job?.salary}
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">{job?.description}</p>
          <div className="flex flex-wrap gap-2">
            {job?.skills.map((skill, index) => (
              <Badge key={index} variant="outline" className="bg-blue-50">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center bg-gray-50 py-5">
          <Button
            variant="outline"
            className="text-blue-600 hover:text-blue-800"
          >
            Save Job
          </Button>
          <Button>See details</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AllJob;
