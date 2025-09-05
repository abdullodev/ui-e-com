import type { Product } from "@/store/useCartStore";
import { motion } from "framer-motion";
import React from "react";
import { itemVariants } from "../common/constants";

const ProductSpecifications: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
    >
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Specifications
      </h3>
      <div className="space-y-3">
        {Object.entries(product.specifications).map(([key, value], index) => (
          <motion.div
            key={key}
            className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {key}
            </span>
            <span className="text-gray-600 dark:text-gray-400">{value}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProductSpecifications;
