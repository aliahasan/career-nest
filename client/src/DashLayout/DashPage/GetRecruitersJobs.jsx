import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetAllRecruitersJob from "@/hooks/useGetAllRecruitersJob";
import Loading from "@/myComponents/Loading";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import SearchJob from "./SearchJob";
import { useEffect, useState } from "react";

const GetRecruitersJobs = () => {
  const { allRecruiterJobs, searchJobByText } = useSelector(
    (store) => store.jobs
  );
  console.log(allRecruiterJobs);
  const { loading, error } = useGetAllRecruitersJob();
  const [filterJob, setFilterJob] = useState(allRecruiterJobs);

  useEffect(() => {
    const filteredJob = allRecruiterJobs.filter((job) => {
      if (!searchJobByText) {
        return true;
      }
      return job?.title
        .toLowerCase()
        .includes(
          searchJobByText.toLowerCase() ||
            job?.company?.companyName.toLowerCase()
        );
    });
    setFilterJob(filteredJob);
  }, [allRecruiterJobs, searchJobByText]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      <SearchJob />
      {filterJob.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Job Role</TableHead>
              <TableHead>Posted Date</TableHead>
              <TableHead>Applicants</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterJob.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job?.company?.companyName || "null"}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>
                  {new Date(job.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{job?.applications?.length}</TableCell>
                <TableCell className="text-right">
                  <Popover className="w-64">
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-24">
                      <div className="flex items-center gap-3 w-fit">
                        <span>Edit</span>
                        <Edit2 className="w-4" />
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-gray-500">
            You have not posted any jobs yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default GetRecruitersJobs;
