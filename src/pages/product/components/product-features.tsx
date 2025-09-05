import type { Product } from "@/store/useCartStore";
import { motion } from "framer-motion";
import React from "react";
import { itemVariants } from "../common/constants";

const ProductFeatures: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
    >
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Key Features
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {product.features.map((feature, index) => (
          <motion.div
            key={feature}
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProductFeatures;
