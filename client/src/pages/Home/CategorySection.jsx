import CategorySlide from "@/myComponents/CategorySlide";
import SectionTitle from "@/shared/SectionTitle";

const CategorySection = () => {
  return (
    <div id="category" className="my-10">
      <SectionTitle
        title="Browse by Category"
        subtitle="Find the job that’s perfect for you. about 800+ new jobs everyday"
      />
      <div className="my-10">
      <CategorySlide />
      </div>
    </div>
  );
};

export default CategorySection;
