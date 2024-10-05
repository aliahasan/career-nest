import { Avatar, AvatarImage } from "@/components/ui/avatar";
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
import { Edit2, MoreHorizontal } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CompaniesTable = () => {
  const { recruiterCompanies, searchCompany } = useSelector(
    (store) => store.companies
  );
  const [filterCompany, setFilterCompany] = useState(recruiterCompanies);

  // here i implement search functionality by company name
  //here useEffect render only when the recruiter companies and search text will change

  useEffect(() => {
    const filteredCompany =
      recruiterCompanies.length > 0 &&
      recruiterCompanies.filter((company) => {
        if (!searchCompany) {
          return true;
        }
        return company?.companyName
          .toLowerCase()
          .includes(searchCompany.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [recruiterCompanies, searchCompany]);

  return (
    <div className="space-y-4">
      {recruiterCompanies.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Company Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterCompany?.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company?.logo}></AvatarImage>
                  </Avatar>
                </TableCell>
                <TableCell>{company?.companyName}</TableCell>
                <TableCell>{company?.location}</TableCell>
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
            You have not registered any company yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default memo(CompaniesTable);
