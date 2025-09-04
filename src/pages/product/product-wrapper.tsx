import { PageTransitionWrapper } from "@/components";
import ProductPage from "./product";

const ProductWrapper = () => {
  return (
    <PageTransitionWrapper>
      <ProductPage />
    </PageTransitionWrapper>
  );
};

export default ProductWrapper;
