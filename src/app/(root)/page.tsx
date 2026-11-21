import Banner from "@/components/home/Banner";
import FeaturedServices from "@/components/home/FeaturedServices";
import Categories from "@/components/home/Categories";
import HowItWorks from "@/components/home/HowItWorks";
import WhyChooseUs from "@/components/home/WhyChooseUs";

// Always show the latest services from the database.
export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Banner />
      <FeaturedServices />
      <Categories />
      <HowItWorks />
      <WhyChooseUs />
    </>
  );
}
