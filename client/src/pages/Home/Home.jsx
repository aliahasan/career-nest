import Hiring from "@/myComponents/Hiring";
import CategorySection from "./CategorySection";
import HeroSection from "./HeroSection";
import NewsletterSection from "@/myComponents/NewsLetter";
import LatestJob from "@/myComponents/LatestJob";

const Home = () => {
  return (
    <div>
     <HeroSection/>
     <CategorySection/>
     <LatestJob/>
     <Hiring/>
     <NewsletterSection/>
    </div>
  );
};

export default Home;
