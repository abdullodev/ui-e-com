import { MainSection, ProductCard } from "@/components";
import { PRODUCTS } from "@/constants/product-constants";
import { motion } from "framer-motion";
import { containerVariants } from "./common/constants";

const Products = () => {
  return (
    <MainSection title="Products">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {PRODUCTS.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </motion.div>
    </MainSection>
  );
};

export default Products;
