import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const AppliedJobs = () => {
  return (
    <div className="container mx-auto py-10">
      <Table>
        <TableCaption>List of Your Applied Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Loop through your data here */}
          <TableRow>
            <TableCell className="font-medium">2024-03-15</TableCell>
            <TableCell>Frontend Developer</TableCell>
            <TableCell>Tech Solutions Ltd</TableCell>
            <TableCell className="text-right">Under Review</TableCell>
          </TableRow>
          {/* Add more rows as needed */}
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobs