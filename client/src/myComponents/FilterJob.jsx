import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronDown } from "lucide-react";

const filterData = [
  {
    filterType: "Location",
    filterOptions: ["Dhaka", "Chittagong", "Sylhet", "Comilla", "Barisal"],
  },
  {
    filterType: "Industry",
    filterOptions: [
      "Frontend Developer",
      "Backend Developer",
      "Fullstack Developer",
    ],
  },
  {
    filterType: "Job-Type",
    filterOptions: ["Full-time", "Part-time", "Contract"],
  },
];

const FilterJob = () => {
  const [openFilter, setOpenFilter] = useState(null);
  const [selectedJobType, setSelectedJobType] = useState(null);

  const toggleFilter = (filterType) => {
    setOpenFilter(openFilter === filterType ? null : filterType);
  };

  const handleJobTypeChange = (value) => {
    setSelectedJobType(value);
  };

  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="text-center">Filter Jobs</h1>
      <hr className="mt-3" />
      <div className="flex flex-col gap-3 ">
        {filterData.map((filter, index) => (
          <div key={index}>
            <button
              className="flex justify-between items-center w-full text-lg font-semibold mt-2 pb-2 border-b"
              onClick={() => toggleFilter(filter.filterType)}
            >
              {filter.filterType}
              <span
                className={`transition-transform duration-300 ${
                  openFilter === filter.filterType ? "rotate-180" : ""
                }`}
              >
                <ChevronDown />
              </span>
            </button>
            <div
              className={`mt-2 overflow-hidden transition-all duration-500 ease-in-out ${
                openFilter === filter.filterType
                  ? "max-h-max opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <RadioGroup
                className="transition-all duration-500 ease-in-out transform origin-top"
                onValueChange={
                  filter.filterType === "Job-Type"
                    ? handleJobTypeChange
                    : undefined
                }
              >
                {filter.filterOptions.map((option, optionIndex) => (
                  <div
                    className={`flex items-center space-x-2 mb-2 transition-all duration-300 ease-in-out transform ${
                      openFilter === filter.filterType
                        ? "translate-y-0 opacity-100"
                        : "translate-y-[-10px] opacity-0"
                    }`}
                    key={optionIndex}
                    style={{
                      transitionDelay: `${optionIndex * 50}ms`,
                    }}
                  >
                    <RadioGroupItem
                      value={option}
                      id={`${filter.filterType}-${option}`}
                    />
                    <label htmlFor={`${filter.filterType}-${option}`}>
                      {option}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        ))}
      </div>
      {selectedJobType && <p className="mt-4">Job Type: {selectedJobType}</p>}
    </div>
  );
};

export default FilterJob;
