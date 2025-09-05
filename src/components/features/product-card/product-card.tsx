import useCartStore, { type Product } from "@/store/useCartStore";
import useWishlistStore from "@/store/useWishlistStore"; // Your liked products store
import { motion } from "framer-motion";
import { Check, Heart, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  buttonVariants,
  cardVariants,
  heartVariants,
  imageVariants,
  saleTagVariants,
} from "./common/constants";

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const navigate = useNavigate();

  // Cart store hooks
  const addToCart = useCartStore((state) => state.addToCart);
  const isInCart = useCartStore((state) => state.isInCart);
  const getItemQuantity = useCartStore((state) => state.getItemQuantity);

  // Liked products store hooks
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist);

  // Get states
  const itemInCart = isInCart(product.id);
  const quantity = getItemQuantity(product.id);
  const isLiked = isInWishlist(product.id); // Check if product is liked

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation

    setIsLike(true);

    toggleWishlist(product);

    setTimeout(() => {
      setIsLike(false);
    }, 500);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking add to cart

    setIsAdding(true);

    addToCart(product);

    // Add a small delay for better UX
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  const handleCardClick = () => {
    navigate("/product/" + product.id);
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl dark:shadow-gray-900/50 dark:hover:shadow-gray-900/70 transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100 dark:border-gray-700"
      style={{
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      }}
      whileInView={cardVariants.visible}
      viewport={{ once: true, margin: "-50px" }}
      onClick={handleCardClick}
    >
      {/* Image + Like + Sale */}
      <div className="relative overflow-hidden">
        <motion.img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-64 object-cover"
          variants={imageVariants}
          loading="lazy"
        />

        {/* Enhanced Heart Button with Like State */}
        <motion.button
          className={`absolute top-4 right-4 rounded-full p-2 shadow-md transition-all duration-300 border ${
            isLiked
              ? "bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700 scale-105"
              : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
          variants={heartVariants}
          whileTap="tap"
          onClick={handleLikeToggle}
          disabled={isLike}
        >
          <Heart
            className={`h-5 w-5 transition-all duration-300 ${
              isLiked
                ? "text-red-500 fill-current scale-110"
                : "text-gray-600 dark:text-gray-400 hover:text-red-400"
            }`}
          />
        </motion.button>

        <motion.div
          className="absolute top-4 left-4 bg-red-500 dark:bg-red-600 text-white px-2 py-1 rounded-md text-sm font-semibold"
          variants={saleTagVariants}
          initial="hidden"
          animate="visible"
        >
          Sale
        </motion.div>

        {/* Cart quantity badge */}
        {itemInCart && (
          <motion.div
            className="absolute bottom-4 left-4 bg-green-500 dark:bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ShoppingCart className="h-3 w-3" />
            {quantity}
          </motion.div>
        )}

        {/* Liked indicator badge */}
        {isLiked && (
          <motion.div
            className="absolute bottom-4 right-4 bg-red-500 dark:bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
          >
            <Heart className="h-3 w-3 fill-current" />
            Liked
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="p-2 md:p-4 flex flex-col justify-between">
        {/* Title */}
        <motion.h3
          className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100 transition-colors duration-200 truncate"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + index * 0.1 }}
          title={product.name}
        >
          {product.name}
        </motion.h3>

        {/* Rating */}
        <motion.div
          className="flex items-center mb-3"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + index * 0.1 }}
        >
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.6 + index * 0.1 + i * 0.05,
                  type: "spring",
                  stiffness: 300,
                }}
              >
                <Star
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              </motion.div>
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400 ml-2 transition-colors duration-200">
            ({product.reviews})
          </span>
        </motion.div>

        {/* Price + Add to cart */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 + index * 0.1 }}
        >
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 dark:text-gray-400 line-through ml-2 transition-colors duration-200">
              {product.originalPrice}
            </span>
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-200">
              {product.price}
            </span>
          </div>

          <motion.button
            className={`px-4 py-2 rounded-lg flex items-center font-medium transition-all duration-200 min-w-[80px] justify-center ${
              isAdding
                ? "bg-green-500 dark:bg-green-600 text-white"
                : itemInCart
                ? "bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 text-white"
                : "bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white"
            }`}
            variants={buttonVariants}
            whileTap="tap"
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? (
              <motion.div
                className="flex items-center gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Check className="h-4 w-4" />
                <span className="text-sm">Added!</span>
              </motion.div>
            ) : itemInCart ? (
              <motion.div
                className="flex items-center gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="text-sm">Add More</span>
              </motion.div>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add
              </>
            )}
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
