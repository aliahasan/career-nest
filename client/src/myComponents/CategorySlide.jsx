import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Briefcase,
  DollarSign,
  TrendingUp,
  Headphones,
  Code,
  UserCheck,
  ShoppingCart,
  Shield,
} from "lucide-react";

const categories = [
  {
    title: "Management",
    icon: Briefcase,
    jobs: 120,
  },
  {
    title: "Finance",
    icon: DollarSign,
    jobs: 85,
  },
  {
    title: "Marketing & Sales",
    icon: TrendingUp,
    jobs: 150,
  },
  {
    title: "Customer Support",
    icon: Headphones,
    jobs: 200,
  },
  {
    title: "Development",
    icon: Code,
    jobs: 300,
  },
  {
    title: "Human Resource",
    icon: UserCheck,
    jobs: 70,
  },
  {
    title: "Retail & Product",
    icon: ShoppingCart,
    jobs: 90,
  },
  {
    title: "Security Analyst",
    icon: Shield,
    jobs: 45,
  },
];
const CategorySlide = () => {
  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-1 py-5">
        {categories.map((category, index) => (
          <CarouselItem
            key={index}
            className="mx-2 basis-full md:basis-1/2 lg:basis-1/4 px-3 md:px-0"
          >
            <div className="p-1 flex items-center gap-4 shadow-sm rounded-lg bg-white border px-2 py-6 hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">
              <div>
                <category.icon className="w-10 h-10" />
              </div>
              <div className="">
                <p className="text-xl pt-2 text-navy text-wrap font-semibold">{category.title}</p>
                <p className="text-lg text-garish ">{category.jobs} Jobs Available</p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
     <div className="hidden lg:block">
     <CarouselNext  />
     <CarouselPrevious  />
     </div>
    </Carousel>
  );
};

export default CategorySlide;
