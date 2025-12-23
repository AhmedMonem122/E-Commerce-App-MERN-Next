import BestDeals from "@/components/BestDeals/BestDeals";
import Header from "@/components/Header/Header";
import HomeCategories from "@/components/HomeCategories/HomeCategories";
import OurProducts from "@/components/OurProducts/OurProducts";

export default function Home() {
  return (
    <>
      <Header />
      <BestDeals />
      <HomeCategories />
      <OurProducts />
    </>
  );
}
