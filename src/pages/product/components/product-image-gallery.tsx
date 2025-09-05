import type { Product } from "@/store/useCartStore";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { imageVariants, itemVariants } from "../common/constants";

const ProductImageGallery: React.FC<{ product: Product }> = ({ product }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <motion.div
      className="space-y-4"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Main Image */}
      <div className="relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
        <motion.img
          key={selectedImageIndex}
          src={product.images[selectedImageIndex]}
          alt={product.name}
          className={`w-full h-96 lg:h-[500px] object-cover cursor-zoom-in transition-transform duration-300 ${
            isZoomed ? "scale-150" : "scale-100"
          }`}
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          onClick={() => setIsZoomed(!isZoomed)}
        />

        {/* Sale Badge */}
        <motion.div
          className="absolute top-4 left-4 bg-red-500 dark:bg-red-600 text-white px-3 py-1 rounded-md text-sm font-semibold"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          Sale
        </motion.div>
      </div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-4 gap-3">
        {product.images.map((image, index) => (
          <motion.button
            key={index}
            className={`relative overflow-hidden rounded-lg border-2 transition-all duration-300 ${
              selectedImageIndex === index
                ? "border-blue-500 dark:border-blue-400"
                : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
            }`}
            onClick={() => setSelectedImageIndex(index)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <img
              src={image}
              alt={`${product.name} ${index + 1}`}
              className="w-full h-20 object-cover"
            />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default ProductImageGallery;
