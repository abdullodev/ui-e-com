import { PageTransitionWrapper } from "@/components";
import Products from "./products";

const ProductWrapper = () => {
  return (
    <PageTransitionWrapper>
      <Products />
    </PageTransitionWrapper>
  );
};

export default ProductWrapper;
