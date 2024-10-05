import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setSearchJobByText } from "@/redux/jobSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SearchJob = () => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setSearchJobByText(searchText));
  }, [searchText, dispatch]);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Search your Posted Job</h1>
      <div className="flex flex-col lg:flex-row justify-between items-center mb-8 space-y-4 lg:space-y-0">
        <div className="flex flex-row items-center w-full lg:w-2/3 space-x-2">
          <Input
            type="search"
            placeholder="Enter you job title or rol"
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
    </div>
  );
};

export default SearchJob;
