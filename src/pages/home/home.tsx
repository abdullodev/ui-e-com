import { MainSection, PageTransitionWrapper } from "@/components";
import { PRODUCTS } from "@/constants/product-constants";
import FeatureProducts from "./components/feature-products";
import HomeCategories from "./components/home-categories";
import HomeSlider from "./components/home-slider";

const categories = [
  {
    id: "1",
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop",
    itemCount: "2,341 items",
  },
  {
    id: "2",
    name: "Fashion",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop",
    itemCount: "5,678 items",
  },
  {
    id: "3",
    name: "Home & Garden",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
    itemCount: "1,234 items",
  },
  {
    id: "4",
    name: "Sports",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
    itemCount: "987 items",
  },
  {
    id: "5",
    name: "Books",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop",
    itemCount: "3,456 items",
  },
  {
    id: "6",
    name: "Beauty",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=200&fit=crop",
    itemCount: "2,109 items",
  },
];

const Home = () => {
  return (
    <PageTransitionWrapper>
      <MainSection className="pt-4 md:pt-8 pb-6">
        <HomeSlider />
      </MainSection>
      <HomeCategories categories={categories} />
      <FeatureProducts featuredProducts={PRODUCTS.slice(0, 8)} />
    </PageTransitionWrapper>
  );
};

export default Home;
