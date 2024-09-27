import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";

const Hiring = () => {
  return (
    <div className="my-10 md:my-20">
      <div className="flex flex-col lg:flex-row items-center justify-between bg-[#fefefe] shadow-xl p-4 lg:p-8 rounded-lg lg:max-w-6xl mx-auto my-8">
        {/* Left Side Content */}
        <div className="flex items-center space-x-4">
          <div className="hidden lg:block">
            <img
              src="/hiring2.png"
              alt="Hiring Illustration"
              className="w-28 lg:w-32"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-garish font-semibold uppercase">We Are</p>
            <h1 className="text-4xl font-bold text-navy">Hiring</h1>
            <p className="text-garish mt-2">
              Let’s Work Together & Explore Opportunities
            </p>
          </div>
        </div>

        {/* Right Side Content */}
       <div className="flex items-center justify-between pb-4 mt-2">
       <div className="mt-4 lg:mt-0 flex">
          <Button className="flex items-center justify-center px-6 py-5 mr-5">
            <Briefcase className="w-5 h-5 mr-2" />
            Apply Now
          </Button>
        </div>
        <div>
          <img src="/hiring.png" alt="" className="w-32 lg:w-32 " />
        </div>
       </div>
      </div>
    </div>
  );
};

export default Hiring;
