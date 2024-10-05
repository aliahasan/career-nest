import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { secureApi } from "@/hooks/useSecureApi";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

const ApplyJobDialog = ({ jobTitle, jobId, userId }) => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const role = user?.role;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    file: null,
  });
  const [fileError, setFileError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      const file = files[0];
      if (file) {
        const allowedExtensions = ["pdf", "doc", "docx"];
        const fileExtension = file.name.split(".").pop().toLowerCase();
        if (allowedExtensions.includes(fileExtension)) {
          setFormData((prev) => ({ ...prev, file }));
          setFileError("");
        } else {
          setFileError("Please upload only PDF, DOC, or DOCX files.");
        }
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const submitApplication = async (data) => {
    setIsLoading(true);
    const form = new FormData();
    form.append("name", data.name);
    form.append("email", data.email);
    form.append("file", data.file);
    form.append("applicant", userId);
    form.append("job", jobId);

    try {
      const response = await secureApi.post(
        `/application/apply-job/${jobId}`,
        form
      );

      if (response.data?.success) {
        toast.success(response.data.message);
        setOpen(false); 
      } else {
        toast.error(response.data?.message || "Failed to submit application");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while submitting your application"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fileError) submitApplication(formData);
    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full md:w-auto px-6 py-3 text-base font-semibold hover:scale-105"
          disabled={role === "recruiter"}
        >
          Apply Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Apply for {jobTitle}
          </DialogTitle>
          <DialogDescription>
            Fill out the form below to apply for this position.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Your full name"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Your email address"
              />
            </div>
            <div>
              <Label htmlFor="file">Resume</Label>
              <Input
                id="file"
                name="file"
                type="file"
                onChange={handleInputChange}
                required
              />
              {fileError && <p className="text-red-500 text-sm">{fileError}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="w-full sm:w-auto"
              disabled={!!fileError || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting please wait...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyJobDialog;
