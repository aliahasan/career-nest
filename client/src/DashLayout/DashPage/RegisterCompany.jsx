import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { secureApi } from "@/hooks/useSecureApi";
import { useDispatch } from "react-redux";
import { setCompanies } from "@/redux/companySlice";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RegisterCompany = () => {
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    setLoading(true);
    const company = {
      companyName,
      website,
      image,
      location,
      description,
    };
    try {
      const res = await secureApi.post("/company/register", company, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
      dispatch(setCompanies(res.data.newCompany));
      setLoading(false);
      toast.success(res.data?.message || "company created successfully");
      navigate("/user/dashboard/companies");
    } catch (error) {
      console.log(error.message);
      toast.error(
        error.response?.data?.message || error.message || "something went wrong"
      );
    } finally {
      setLoading(false);
      form.reset();
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow p-6 md:p-8 lg:p-12">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 md:mb-8 text-center">
          Register Company
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="companyName"
                className="text-base md:text-lg font-medium text-gray-700"
              >
                Company Name
              </Label>
              <Input
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full"
                placeholder="Enter your company name"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="website"
                className="text-base md:text-lg font-medium text-gray-700"
              >
                Website
              </Label>
              <Input
                id="website"
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full"
                placeholder="www.example.com"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="logo"
                className="text-base md:text-lg font-medium text-gray-700"
              >
                Logo
              </Label>
              <Input
                id="image"
                type="file"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full"
                accept="image/*"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="location"
                className="text-base md:text-lg font-medium text-gray-700"
              >
                Location
              </Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full"
                placeholder="Enter your company location"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label
                htmlFor="description"
                className="text-base md:text-lg font-medium text-gray-700"
              >
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full"
                placeholder="Enter your company description"
                rows={4}
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <Button
              type="button"
              className="w-1/2 bg-gray-300 hover:bg-gray-400 text-gray-800 text-base md:text-lg py-2 md:py-3 rounded-md transition duration-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-base md:text-lg py-2 md:py-3 rounded-md transition duration-300"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  please wait...
                </>
              ) : (
                "Register"
              )}
            </Button>
          </div>
        </form>
        <p className="mt-4 md:mt-6 text-xs md:text-sm text-red-500 text-center">
          * Please note that this information cannot be changed later.
        </p>
      </div>
    </div>
  );
};

export default RegisterCompany;
