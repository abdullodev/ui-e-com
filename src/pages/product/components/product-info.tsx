import { AddRemoveButton } from "@/components";
import type { Product } from "@/store/useCartStore";
import useCartStore from "@/store/useCartStore";
import useWishlistStore from "@/store/useWishlistStore";
import { motion } from "framer-motion";
import { Heart, RotateCcw, Shield, Star, Truck } from "lucide-react";
import React, { useState } from "react";
import { heartVariants, itemVariants } from "../common/constants";
import ProductShareButton from "./product-share-button";

const ProductInfo: React.FC<{ product: Product }> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);

  // Cart store hooks
  const addToCart = useCartStore((state) => state.addToCart);

  // Wishlist store hooks
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const moveToCart = useWishlistStore((state) => state.moveToCart);

  // Get states
  const itemInCart = useCartStore((state) =>
    state.items.some((item) => item.id === product.id)
  );

  const cartQuantity = useCartStore((state) => {
    const item = state.items.find((item) => item.id === product.id);
    return item ? item.quantity : 0;
  });

  const isLiked = useWishlistStore((state) =>
    state.items.some((item) => item.id === product.id)
  );

  const handleToggleLike = () => {
    toggleWishlist(product);
  };

  const handleMoveToCart = () => {
    if (moveToCart) {
      moveToCart(product.id, addToCart);
    }
  };

  return (
    <motion.div
      className="space-y-6"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <motion.h1
            className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {product.name}
          </motion.h1>

          <motion.p
            className="text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {product.category}
          </motion.p>
        </div>

        <div className="flex space-x-2">
          <motion.button
            className={`rounded-full p-3 shadow-md transition-all duration-300 border ${
              isLiked
                ? "bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700 scale-105"
                : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            variants={heartVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleToggleLike}
          >
            <Heart
              className={`h-6 w-6 transition-all duration-300 ${
                isLiked
                  ? "text-red-500 fill-current scale-110"
                  : "text-gray-600 dark:text-gray-400 hover:text-red-400"
              }`}
            />
          </motion.button>

          <ProductShareButton
            url={`https://ui-e-com.vercel.app/product/${product.id}`}
            key={"share-button"}
          />
        </div>
      </div>

      {/* Rating */}
      <motion.div
        className="flex items-center space-x-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.6 + i * 0.05,
                type: "spring",
                stiffness: 300,
              }}
            >
              <Star
                className={`h-5 w-5 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            </motion.div>
          ))}
        </div>
        <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
          {product.rating}
        </span>
        <span className="text-gray-600 dark:text-gray-400">
          ({product.reviews} reviews)
        </span>
      </motion.div>

      {/* Price */}
      <motion.div
        className="flex items-center space-x-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          {product.price}
        </span>
        <span className="text-xl text-gray-500 dark:text-gray-400 line-through">
          {product.originalPrice}
        </span>
        <span className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-3 py-1 rounded-full text-sm font-semibold">
          Save 25%
        </span>
      </motion.div>

      {/* Description */}
      <motion.p
        className="text-gray-600 dark:text-gray-400 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        {product.description}
      </motion.p>

      {/* Color Selection */}
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
          Color: <span className="font-normal">{selectedColor}</span>
        </h3>
        <div className="flex space-x-3">
          {product.colors.map((color, index) => (
            <motion.button
              key={color.name}
              className={`w-10 h-10 rounded-full border-2 transition-all ${
                selectedColor === color.name
                  ? "border-blue-500 dark:border-blue-400 scale-110"
                  : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
              }`}
              style={{ backgroundColor: color.hex }}
              onClick={() => setSelectedColor(color.name)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: selectedColor === color.name ? 1.1 : 1,
              }}
              transition={{ delay: 0.8 + index * 0.1 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Size Selection */}
      {product.sizes.length > 1 && (
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            Size: <span className="font-normal">{selectedSize}</span>
          </h3>
          <div className="flex space-x-2">
            {product.sizes.map((size, index) => (
              <motion.button
                key={size}
                className={`px-4 py-2 border rounded-md transition-all font-medium ${
                  selectedSize === size
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                    : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setSelectedSize(size)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                {size}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Quantity & Add to Cart */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <div className="flex items-center space-x-4">
          <AddRemoveButton product={product} size="large" />
        </div>

        {/* Wishlist Actions */}
        {isLiked && (
          <motion.div
            className="flex items-center justify-between bg-red-50 dark:bg-red-900/20 p-3 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center space-x-2">
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span className="text-red-600 dark:text-red-400 font-medium">
                Added to your wishlist
              </span>
            </div>

            <motion.button
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMoveToCart}
            >
              Move to Cart
            </motion.button>
          </motion.div>
        )}
      </motion.div>

      {/* Stock Status */}
      <motion.div
        className="flex items-center space-x-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
      >
        <div
          className={`w-3 h-3 rounded-full ${
            product.inStock ? "bg-green-500" : "bg-red-500"
          }`}
        />
        <span
          className={`font-medium ${
            product.inStock
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </span>

        {itemInCart && (
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
            • {cartQuantity} item{cartQuantity > 1 ? "s" : ""} in your cart
          </span>
        )}
      </motion.div>

      {/* Features */}
      <motion.div
        className="space-y-3 border-t border-gray-200 dark:border-gray-700 pt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
            <Truck className="h-5 w-5" />
            <span>Free Shipping</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
            <Shield className="h-5 w-5" />
            <span>2 Year Warranty</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
            <RotateCcw className="h-5 w-5" />
            <span>30-Day Returns</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductInfo;
