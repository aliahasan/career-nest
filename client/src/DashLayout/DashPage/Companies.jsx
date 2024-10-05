import { Input } from "@/components/ui/input";
import CompaniesTable from "./DashComponents/CompaniesTable";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { secureApi } from "@/hooks/useSecureApi";
import { useDispatch, useSelector } from "react-redux";
import { setRecruiterCompanies, setSearchCompany } from "@/redux/companySlice";
import { toast } from "react-hot-toast";

const Companies = () => {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    const getCompany = async () => {
      try {
        setIsLoading(true);
        const response = await secureApi.get(
          `/company/get-companies/${user._id}`
        );
        dispatch(setRecruiterCompanies(response.data.companies));
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getCompany();
  }, [user._id, dispatch]);

  useEffect(() => {
    dispatch(setSearchCompany(searchText));
  }, [searchText, dispatch]);
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Search your company</h1>
      <div className="flex flex-col lg:flex-row justify-between items-center mb-8 space-y-4 lg:space-y-0">
      <div className="flex flex-row items-center w-full lg:w-2/3 space-x-2">
          <Input
            type="search"
            placeholder="Enter company name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full py-2 px-3"
          />
        </div>
        <Button
          onClick={() => navigate("/user/dashboard/register-company")}
          className="hidden lg:block"
        >
          Register a company
        </Button>
      </div>
      {isLoading ? <p>Loading...</p> : <CompaniesTable />}
    </div>
  );
};

export default Companies;
