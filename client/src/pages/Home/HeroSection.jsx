import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const HeroSection = () => {
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [keyword, setKeyword] = useState("");
  const popularSearches = [
    "Designer",
    "Web",
    "iOS",
    "Developer",
    "PHP",
    "Senior",
    "Engineer",
  ];

  return (
    <div className="py-8 px-5">
      <section className="flex flex-col md:flex-row justify-between items-center gap-8">
        {/* left side */}
        <div className="w-full md:w-1/2 space-y-6">
          <main className="mt-3 mx-auto max-w-7xl px-2 sm:mt-8 sm:px-6 md:mt-12 lg:mt-20 lg:px-2 xl:mt-28">
            <div className="text-center md:text-left">
              <h1 className="text-[29px] tracking-tight font-bold text-gray-900 sm:text-2xl md:text-4xl lg:text-4xl xl:text-6xl bg-gradient-to-r from-green-400 to-indigo-400 bg-clip-text text-transparent">
                <span className="block pb-2">The Easiest Way</span>{" "}
                <span className="block ">
                  to Get Your New Job
                </span>
              </h1>
              <p className="mt-3 text-sm text-gray-500 sm:mt-5 sm:text-base md:text-lg lg:text-xl lg:max-w-xl">
                Each month, more than 3 million job seekers turn to our website
                in their search for work, making over 140,000 applications every
                single day.
              </p>
              <div className="mt-5 sm:mt-8 flex flex-col justify-center md:justify-start">
                <div className="rounded-md w-full max-w-xl">
                  <div className="flex flex-col w-full">
                    <div className="flex flex-col sm:flex-row lg:flex-row w-full gap-2 lg:gap-4">
                      <Select onValueChange={(value) => setIndustry(value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tech">Technology</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select onValueChange={(value) => setLocation(value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nyc">New York</SelectItem>
                          <SelectItem value="sf">San Francisco</SelectItem>
                          <SelectItem value="lon">London</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex w-full mt-2 lg:mt-4">
                      <Input
                        type="text"
                        placeholder="Your keyword..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="w-full"
                      />
                      <Button type="submit" className="ml-2 whitespace-nowrap ">
                        <Search className="h-4 w-4 mr-2 " />
                        Search
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <p className="text-sm text-gray-500">Popular Searches: </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {popularSearches.map((search, index) => (
                    <span
                      key={index}
                      className="text-sm text-blue-600 hover:underline cursor-pointer"
                    >
                      {search}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
        {/* right side */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/hero.png"
            alt="Hero"
            className="w-full h-auto"
          />
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
