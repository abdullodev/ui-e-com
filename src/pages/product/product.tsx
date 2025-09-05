import { PRODUCTS } from "@/constants/product-constants";
import type { Product } from "@/store/useCartStore";
import { motion } from "framer-motion";
import React from "react";
import { useParams } from "react-router-dom";
import { containerVariants } from "./common/constants";
import ProductFeatures from "./components/product-features";
import ProductImageGallery from "./components/product-image-gallery";
import ProductInfo from "./components/product-info";
import ProductSpecifications from "./components/product-specifications";

// Main ProductPage Component
const ProductPage: React.FC = () => {
  const { id } = useParams();

  const product: Product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Product not found
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          <ProductImageGallery product={product} />
          <ProductInfo product={product} />
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProductFeatures product={product} />
          <ProductSpecifications product={product} />
        </div>
      </motion.div>
    </div>
  );
};

export default ProductPage;
